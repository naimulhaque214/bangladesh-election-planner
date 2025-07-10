import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, MapPin, Target, TrendingUp, Map, Filter, X } from 'lucide-react';
import { SelectedArea } from '../App';
import { BANGLADESH_CONSTITUENCIES, DIVISIONS, getConstituenciesByDivision } from '../data/bangladeshConstituencies';

interface AreaSelectorProps {
  selectedElectionArea: string;
  selectedSubAreas: SelectedArea[];
  onElectionAreaChange: (area: string) => void;
  onSubAreaToggle: (area: SelectedArea) => void;
}

export function AreaSelector({ selectedElectionArea, selectedSubAreas, onElectionAreaChange, onSubAreaToggle }: AreaSelectorProps) {
  const [selectedDivision, setSelectedDivision] = useState<string>('');

  // Filter constituencies based on division
  const filteredConstituencies = useMemo(() => {
    let constituencies = Object.values(BANGLADESH_CONSTITUENCIES);
    
    if (selectedDivision) {
      constituencies = getConstituenciesByDivision(selectedDivision);
    }
    
    return constituencies;
  }, [selectedDivision]);

  const currentSubAreas = selectedElectionArea ? 
    BANGLADESH_CONSTITUENCIES[selectedElectionArea]?.subAreas || [] : [];

  const clearFilters = () => {
    setSelectedDivision('');
    onElectionAreaChange('');
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-gray-800">Strategic Area Selection</div>
            <div className="text-sm text-gray-500">300 Bangladesh Constituencies</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Division Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-600 mb-3 font-medium">
            <Filter className="w-4 h-4 text-blue-500" />
            Filter by Division
          </label>
          <div className="flex gap-2">
            <Select value={selectedDivision} onValueChange={setSelectedDivision}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-2xl h-12 bg-white/50 backdrop-blur-sm shadow-lg transition-all duration-200 hover:shadow-xl flex-1">
                <SelectValue placeholder="🏛️ All Divisions" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-lg">
                {DIVISIONS.map((division) => (
                  <SelectItem key={division} value={division} className="rounded-xl my-1 p-4 hover:bg-blue-50 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <Map className="w-4 h-4 text-blue-500" />
                      {division} Division
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDivision && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="h-12 px-4 rounded-2xl border-2 hover:bg-red-50 hover:border-red-300"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {filteredConstituencies.length} constituencies available
            {selectedDivision && ` in ${selectedDivision}`}
          </span>
          {selectedElectionArea && (
            <Badge className="bg-blue-100 text-blue-700">
              {BANGLADESH_CONSTITUENCIES[selectedElectionArea]?.name}
            </Badge>
          )}
        </div>

        {/* Constituency Selection */}
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-600 mb-3 font-medium">
            <MapPin className="w-4 h-4 text-green-500" />
            Election Constituency
          </label>
          <Select value={selectedElectionArea} onValueChange={onElectionAreaChange}>
            <SelectTrigger className="border-2 border-gray-200 focus:border-green-500 rounded-2xl h-14 bg-white/50 backdrop-blur-sm shadow-lg transition-all duration-200 hover:shadow-xl">
              <SelectValue placeholder="🗳️ Choose your constituency..." />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-lg max-h-80">
              {filteredConstituencies.map((constituency) => (
                <SelectItem key={constituency.id} value={constituency.id} className="rounded-xl my-1 p-4 hover:bg-green-50 transition-all duration-200">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <div>
                        <div className="font-medium">{constituency.name}</div>
                        <div className="text-xs text-gray-500">{constituency.district}, {constituency.division}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {constituency.subAreas.length} areas
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sub-area Selection */}
        {selectedElectionArea && (
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-4 font-medium">
              <Target className="w-4 h-4 text-purple-500" />
              Target Areas ({currentSubAreas.length} available)
            </label>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {currentSubAreas.map((area) => {
                const isSelected = selectedSubAreas.some(a => a.id === area.id);
                
                return (
                  <div
                    key={area.id}
                    className={`group relative overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'border-green-400 bg-green-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-lg'
                    }`}
                    onClick={() => onSubAreaToggle(area)}
                  >
                    <div className="flex items-start gap-4 p-5">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onSubAreaToggle(area)}
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 w-5 h-5 rounded-md mt-0.5 flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="mb-3">
                          <h3 className="font-medium text-gray-900 text-base leading-tight">{area.name}</h3>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="bg-orange-100 p-1.5 rounded-md flex-shrink-0">
                              <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
                            </div>
                            <div className="text-orange-700 font-medium">{area.density.toLocaleString()}/km²</div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 p-1.5 rounded-md flex-shrink-0">
                              <Users className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <div className="text-blue-700 font-medium">{area.population.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}