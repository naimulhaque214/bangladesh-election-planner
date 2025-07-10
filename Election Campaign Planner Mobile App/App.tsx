import React, { useState } from "react";
import { MapView } from "./components/MapView";
import { AreaSelector } from "./components/AreaSelector";
import { PopulationStats } from "./components/PopulationStats";
import { RouteOptimizer } from "./components/RouteOptimizer";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  MapPin,
  Users,
  Route,
  Zap,
  Sparkles,
  Settings,
} from "lucide-react";

export interface SelectedArea {
  id: string;
  name: string;
  population: number;
  density: number;
  coordinates: [number, number];
}

export default function App() {
  const [selectedElectionArea, setSelectedElectionArea] =
    useState<string>("");
  const [selectedSubAreas, setSelectedSubAreas] = useState<
    SelectedArea[]
  >([]);
  const [activeTab, setActiveTab] = useState("map");

  const handleElectionAreaChange = (area: string) => {
    setSelectedElectionArea(area);
    setSelectedSubAreas([]);
  };

  const handleSubAreaToggle = (area: SelectedArea) => {
    setSelectedSubAreas((prev) => {
      const exists = prev.find((a) => a.id === area.id);
      if (exists) {
        return prev.filter((a) => a.id !== area.id);
      } else {
        return [...prev, area];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Fancy Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-t from-blue-200/30 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-indigo-400/20 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header with Blue Gradient - Web Version */}
      <div className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl">Campaign Planner</h1>
                <p className="text-blue-100 text-lg">
                  {" "}
                  Bangladesh Election Strategy Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-4 py-2 rounded-xl text-sm"></Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-xl p-3"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Web Layout */}
      <div className="max-w-7xl mx-auto p-8 relative z-10 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 max-h-[calc(100vh-8rem)] overflow-hidden">
              {/* Area Selector */}
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden h-full flex flex-col">
                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-gray-100 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl text-gray-800">
                        Area Selection
                      </h2>
                      <p className="text-sm text-gray-500">
                        Choose your campaign areas
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 overflow-hidden">
                  <AreaSelector
                    selectedElectionArea={selectedElectionArea}
                    selectedSubAreas={selectedSubAreas}
                    onElectionAreaChange={
                      handleElectionAreaChange
                    }
                    onSubAreaToggle={handleSubAreaToggle}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs for different views */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-lg shadow-2xl border-0 rounded-2xl p-2 mb-6">
                <TabsTrigger
                  value="map"
                  className="flex items-center gap-2 py-4 text-sm rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-blue-50"
                >
                  <MapPin className="w-4 h-4" />
                  Interactive Map
                </TabsTrigger>
                <TabsTrigger
                  value="stats"
                  className="flex items-center gap-2 py-4 text-sm rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-blue-50"
                >
                  <Users className="w-4 h-4" />
                  Statistics
                </TabsTrigger>
                <TabsTrigger
                  value="route"
                  className="flex items-center gap-2 py-4 text-sm rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-blue-50"
                >
                  <Route className="w-4 h-4" />
                  Route Optimizer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="mt-0">
                <MapView selectedAreas={selectedSubAreas} />
              </TabsContent>

              <TabsContent value="stats" className="mt-0">
                <PopulationStats
                  selectedAreas={selectedSubAreas}
                />
              </TabsContent>

              <TabsContent value="route" className="mt-0">
                <RouteOptimizer
                  selectedAreas={selectedSubAreas}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Floating Action Button - Web Version */}
      <div className="fixed bottom-8 right-8 z-20">
        <Button
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          disabled={selectedSubAreas.length === 0}
        >
          <Zap className="w-7 h-7" />
        </Button>
      </div>
    </div>
  );
}