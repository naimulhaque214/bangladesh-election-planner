import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import {
  Route,
  MapPin,
  Zap,
  Settings,
  Dna,
} from "lucide-react";
import { SelectedArea } from "../App";
import {
  optimizeRoute,
  OptimizationResult,
  calculateRouteDistance,
} from "../utils/geneticAlgorithm";

interface RouteOptimizerProps {
  selectedAreas: SelectedArea[];
}

interface OptimizationSettings {
  populationSize: number;
  generations: number;
  mutationRate: number;
}

export function RouteOptimizer({
  selectedAreas,
}: RouteOptimizerProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] =
    useState<OptimizationResult | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] =
    useState(false);
  const [optimizationProgress, setOptimizationProgress] =
    useState(0);

  const [settings, setSettings] =
    useState<OptimizationSettings>({
      populationSize: 50,
      generations: 100,
      mutationRate: 0.02,
    });

  if (selectedAreas.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="py-12 text-center">
          <Route className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">
            Select areas to optimize routes
          </p>
        </CardContent>
      </Card>
    );
  }

  const optimizeRouteWithGA = async () => {
    if (selectedAreas.length < 2) return;

    setIsOptimizing(true);
    setOptimizationProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setOptimizationProgress((prev) =>
          Math.min(prev + Math.random() * 15, 90),
        );
      }, 200);

      const result = await optimizeRoute(selectedAreas, {
        populationSize: settings.populationSize,
        generations: settings.generations,
        mutationRate: settings.mutationRate,
      });

      clearInterval(progressInterval);
      setOptimizationProgress(100);

      setOptimizedRoute(result);
    } catch (error) {
      console.error("Optimization failed:", error);
    } finally {
      setTimeout(() => {
        setIsOptimizing(false);
        setOptimizationProgress(0);
      }, 500);
    }
  };

  // Get the total distance - use bestDistance from the optimization result
  const getTotalDistance = () => {
    if (!optimizedRoute) return 0;
    return optimizedRoute.bestDistance || 0;
  };

  return (
    <div className="space-y-6">
      {/* Route Optimization Settings */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Dna className="w-5 h-5 text-purple-600" />
              Route Optimizer
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setShowAdvancedSettings(!showAdvancedSettings)
              }
              className="text-purple-600 hover:text-purple-700"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="p-4 bg-white/50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Selected Areas</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {selectedAreas.length} areas
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              Using genetic algorithm to find the shortest route between all selected constituencies
            </div>
          </div>

          {/* Advanced Settings */}
          {showAdvancedSettings && (
            <div className="space-y-4 pt-4 border-t border-purple-200">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Population Size: {settings.populationSize}
                </label>
                <Slider
                  value={[settings.populationSize]}
                  onValueChange={([value]) =>
                    setSettings((prev) => ({
                      ...prev,
                      populationSize: value,
                    }))
                  }
                  min={20}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Larger population = better solutions, slower
                  optimization
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Generations: {settings.generations}
                </label>
                <Slider
                  value={[settings.generations]}
                  onValueChange={([value]) =>
                    setSettings((prev) => ({
                      ...prev,
                      generations: value,
                    }))
                  }
                  min={50}
                  max={500}
                  step={25}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  More generations = better optimization, longer
                  time
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Mutation Rate:{" "}
                  {(settings.mutationRate * 100).toFixed(1)}%
                </label>
                <Slider
                  value={[settings.mutationRate * 100]}
                  onValueChange={([value]) =>
                    setSettings((prev) => ({
                      ...prev,
                      mutationRate: value / 100,
                    }))
                  }
                  min={1}
                  max={10}
                  step={0.5}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Controls genetic diversity and exploration
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={optimizeRouteWithGA}
            disabled={isOptimizing || selectedAreas.length < 2}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            {isOptimizing ? (
              <>
                <Dna className="w-4 h-4 mr-2 animate-spin" />
                Optimizing Route...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Optimize Route
              </>
            )}
          </Button>

          {selectedAreas.length < 2 && (
            <div className="text-center text-sm text-gray-500 mt-2">
              Select at least 2 areas to optimize the route
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optimization Progress */}
      {isOptimizing && (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="py-6">
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <Dna className="w-8 h-8 mx-auto text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">
                  Genetic Algorithm Evolution in Progress...
                </div>
                <Progress
                  value={optimizationProgress}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-2">
                  Generation{" "}
                  {Math.floor(
                    (optimizationProgress / 100) *
                      settings.generations,
                  )}{" "}
                  / {settings.generations}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Using population of {settings.populationSize}{" "}
                routes with{" "}
                {(settings.mutationRate * 100).toFixed(1)}%
                mutation rate
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Optimization Results */}
      {optimizedRoute && !isOptimizing && (
        <div className="space-y-4">
          {/* Route Summary */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl text-green-600">
                    {getTotalDistance().toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Total Distance (km)</div>
                </div>
                <div>
                  <div className="text-2xl text-blue-600">
                    {optimizedRoute.bestRoute?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Constituencies</div>
                </div>
                <div>
                  <div className="text-2xl text-purple-600">
                    {Math.round(getTotalDistance() * 2.4)}
                  </div>
                  <div className="text-sm text-gray-600">Est. Time (min)</div>
                </div>
              </div>
              
              {/* Show improvement percentage if available */}
              {optimizedRoute.improvementPercentage && optimizedRoute.improvementPercentage > 0 && (
                <div className="mt-4 text-center">
                  <Badge className="bg-green-100 text-green-700 px-3 py-1">
                    {optimizedRoute.improvementPercentage.toFixed(1)}% improvement
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Optimized Route Sequence */}
          {optimizedRoute.bestRoute && optimizedRoute.bestRoute.length > 0 && (
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Optimal Route Sequence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {optimizedRoute.bestRoute.map((area, index) => (
                  <div
                    key={area.id}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm shadow-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-800 font-medium">
                        {area.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {area.population.toLocaleString()} people
                        • {area.density.toLocaleString()}/km²
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          index === 0
                            ? "bg-green-100 text-green-700"
                            : index ===
                                optimizedRoute.bestRoute.length -
                                  1
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {index === 0
                          ? "START"
                          : index ===
                              optimizedRoute.bestRoute.length - 1
                            ? "END"
                            : `STOP ${index}`}
                      </Badge>
                      {index <
                        optimizedRoute.bestRoute.length - 1 && (
                        <div className="text-xs text-gray-500 mt-1">
                          ↓{" "}
                          {calculateRouteDistance([
                            area,
                            optimizedRoute.bestRoute[index + 1],
                          ]).toFixed(1)}
                          km
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Generation History Chart (if available) */}
          {optimizedRoute.generationHistory && optimizedRoute.generationHistory.length > 0 && (
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Dna className="w-5 h-5 text-purple-600" />
                  Optimization Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-2">
                  Final generation: {optimizedRoute.generationHistory[optimizedRoute.generationHistory.length - 1]?.generation || 0}
                </div>
                <div className="text-xs text-gray-500">
                  Best distance improved from {optimizedRoute.generationHistory[0]?.bestDistance?.toFixed(1) || 'N/A'} km 
                  to {optimizedRoute.generationHistory[optimizedRoute.generationHistory.length - 1]?.bestDistance?.toFixed(1) || 'N/A'} km
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}