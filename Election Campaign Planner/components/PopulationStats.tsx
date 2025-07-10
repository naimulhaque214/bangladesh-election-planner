import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Users, TrendingUp, Target, Home } from 'lucide-react';
import { SelectedArea } from '../App';

interface PopulationStatsProps {
  selectedAreas: SelectedArea[];
}

export function PopulationStats({ selectedAreas }: PopulationStatsProps) {
  if (selectedAreas.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="py-12 text-center">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">Select areas to view population statistics</p>
        </CardContent>
      </Card>
    );
  }

  const totalPopulation = selectedAreas.reduce((sum, area) => sum + area.population, 0);
  const avgDensity = selectedAreas.reduce((sum, area) => sum + area.density, 0) / selectedAreas.length;
  const maxPopulationArea = selectedAreas.reduce((max, area) => area.population > max.population ? area : max);
  const highestDensityArea = selectedAreas.reduce((max, area) => area.density > max.density ? area : max);

  // Estimate households (assuming 4.5 people per household on average in Bangladesh)
  const estimatedHouseholds = Math.round(totalPopulation / 4.5);
  const estimatedVoters = Math.round(totalPopulation * 0.65); // Assuming 65% voting age population

  return (
    <div className="space-y-4">
      {/* Overview Stats */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-green-600" />
            Population Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl text-green-600">{totalPopulation.toLocaleString()}</div>
              <div className="text-xs text-green-600">Total Population</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl text-blue-600">{Math.round(avgDensity).toLocaleString()}</div>
              <div className="text-xs text-blue-600">Avg Density/km²</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl text-purple-600">{estimatedHouseholds.toLocaleString()}</div>
              <div className="text-xs text-purple-600">Est. Households</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl text-orange-600">{estimatedVoters.toLocaleString()}</div>
              <div className="text-xs text-orange-600">Est. Voters</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Area Breakdown */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-red-600" />
            Area Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedAreas
            .sort((a, b) => b.population - a.population)
            .map((area) => {
              const populationPercent = (area.population / totalPopulation) * 100;
              const densityPercent = (area.density / Math.max(...selectedAreas.map(a => a.density))) * 100;
              
              return (
                <div key={area.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-800">{area.name}</span>
                        {area.id === maxPopulationArea.id && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Highest Pop
                          </Badge>
                        )}
                        {area.id === highestDensityArea.id && (
                          <Badge className="bg-blue-100 text-blue-700 text-xs">
                            <Home className="w-3 h-3 mr-1" />
                            Densest
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {area.population.toLocaleString()} people • {area.density.toLocaleString()}/km²
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <div className="text-green-600">{populationPercent.toFixed(1)}%</div>
                      <div className="text-gray-500">of total</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Population Distribution</span>
                      <span>{populationPercent.toFixed(1)}%</span>
                    </div>
                    <Progress value={populationPercent} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Density Level</span>
                      <span>{densityPercent.toFixed(0)}%</span>
                    </div>
                    <Progress value={densityPercent} className="h-2 bg-blue-100" />
                  </div>
                </div>
              );
            })}
        </CardContent>
      </Card>
    </div>
  );
}