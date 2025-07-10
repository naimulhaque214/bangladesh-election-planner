import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Users, FileText, Calculator, Clock, DollarSign } from 'lucide-react';
import { SelectedArea } from '../App';

interface CampaignPlannerProps {
  selectedAreas: SelectedArea[];
}

interface CampaignPlan {
  manpower: {
    teams: number;
    volunteersPerTeam: number;
    totalVolunteers: number;
    supervisors: number;
  };
  materials: {
    leaflets: number;
    posters: number;
    banners: number;
    stickers: number;
  };
  timeline: {
    totalDays: number;
    hoursPerDay: number;
    householdsPerHour: number;
  };
  budget: {
    materials: number;
    transportation: number;
    refreshments: number;
    total: number;
  };
}

export function CampaignPlanner({ selectedAreas }: CampaignPlannerProps) {
  const [campaignDays, setCampaignDays] = useState<number>(7);
  const [hoursPerDay, setHoursPerDay] = useState<number>(6);
  const [leafletsPerHouse, setLeafletsPerHouse] = useState<number>(2);
  const [campaignPlan, setCampaignPlan] = useState<CampaignPlan | null>(null);

  if (selectedAreas.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="py-12 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">Select areas to create campaign plan</p>
        </CardContent>
      </Card>
    );
  }

  const generatePlan = () => {
    const totalPopulation = selectedAreas.reduce((sum, area) => sum + area.population, 0);
    const estimatedHouseholds = Math.round(totalPopulation / 4.5);
    const householdsPerHour = 8; // Realistic door-to-door rate
    const totalWorkHours = campaignDays * hoursPerDay;
    const householdsPerVolunteer = householdsPerHour * totalWorkHours;
    const volunteersNeeded = Math.ceil(estimatedHouseholds / householdsPerVolunteer);
    const teamsNeeded = Math.ceil(volunteersNeeded / 4); // 4 volunteers per team
    const supervisorsNeeded = Math.ceil(teamsNeeded / 3); // 1 supervisor per 3 teams

    const plan: CampaignPlan = {
      manpower: {
        teams: teamsNeeded,
        volunteersPerTeam: 4,
        totalVolunteers: volunteersNeeded,
        supervisors: supervisorsNeeded
      },
      materials: {
        leaflets: estimatedHouseholds * leafletsPerHouse,
        posters: Math.ceil(selectedAreas.length * 10), // 10 posters per area
        banners: selectedAreas.length * 2, // 2 banners per area
        stickers: Math.round(totalPopulation * 0.3) // 30% of population
      },
      timeline: {
        totalDays: campaignDays,
        hoursPerDay: hoursPerDay,
        householdsPerHour: householdsPerHour
      },
      budget: {
        materials: (estimatedHouseholds * leafletsPerHouse * 2) + (selectedAreas.length * 10 * 50) + (selectedAreas.length * 2 * 200),
        transportation: volunteersNeeded * campaignDays * 100,
        refreshments: volunteersNeeded * campaignDays * 150,
        total: 0
      }
    };

    plan.budget.total = plan.budget.materials + plan.budget.transportation + plan.budget.refreshments;
    setCampaignPlan(plan);
  };

  return (
    <div className="space-y-4">
      {/* Campaign Parameters */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="w-5 h-5 text-purple-600" />
            Campaign Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="days" className="text-sm text-gray-600">Campaign Days</Label>
              <Input
                id="days"
                type="number"
                value={campaignDays}
                onChange={(e) => setCampaignDays(Number(e.target.value))}
                min="1"
                max="30"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="hours" className="text-sm text-gray-600">Hours/Day</Label>
              <Input
                id="hours"
                type="number"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                min="1"
                max="12"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="leaflets" className="text-sm text-gray-600">Leaflets per Household</Label>
            <Input
              id="leaflets"
              type="number"
              value={leafletsPerHouse}
              onChange={(e) => setLeafletsPerHouse(Number(e.target.value))}
              min="1"
              max="10"
              className="mt-1"
            />
          </div>

          <Button
            onClick={generatePlan}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Generate Campaign Plan
          </Button>
        </CardContent>
      </Card>

      {/* Campaign Plan Results */}
      {campaignPlan && (
        <Tabs defaultValue="manpower" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="manpower" className="flex flex-col items-center py-2 text-xs">
              <Users className="w-4 h-4 mb-1" />
              Manpower
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex flex-col items-center py-2 text-xs">
              <FileText className="w-4 h-4 mb-1" />
              Materials
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex flex-col items-center py-2 text-xs">
              <Clock className="w-4 h-4 mb-1" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex flex-col items-center py-2 text-xs">
              <DollarSign className="w-4 h-4 mb-1" />
              Budget
            </TabsTrigger>
          </TabsList>

          {/* Manpower Tab */}
          <TabsContent value="manpower">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  Manpower Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl text-blue-600">{campaignPlan.manpower.teams}</div>
                    <div className="text-sm text-blue-600">Teams Needed</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {campaignPlan.manpower.volunteersPerTeam} volunteers each
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl text-green-600">{campaignPlan.manpower.totalVolunteers}</div>
                    <div className="text-sm text-green-600">Total Volunteers</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Door-to-door workers
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm col-span-2">
                    <div className="text-2xl text-purple-600">{campaignPlan.manpower.supervisors}</div>
                    <div className="text-sm text-purple-600">Supervisors Required</div>
                    <div className="text-xs text-gray-500 mt-1">
                      1 supervisor per 3 teams
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="text-sm text-gray-800 mb-2">Team Structure Recommendation</h4>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>• Team Leader (experienced volunteer)</span>
                      <Badge variant="secondary">1 per team</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>• Door-to-door volunteers</span>
                      <Badge variant="secondary">3 per team</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>• Area supervisor</span>
                      <Badge variant="secondary">1 per 3 teams</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                  Material Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl text-green-600">{campaignPlan.materials.leaflets.toLocaleString()}</div>
                    <div className="text-sm text-green-600">Leaflets</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {leafletsPerHouse} per household
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl text-blue-600">{campaignPlan.materials.posters}</div>
                    <div className="text-sm text-blue-600">Posters</div>
                    <div className="text-xs text-gray-500 mt-1">
                      10 per area
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl text-purple-600">{campaignPlan.materials.banners}</div>
                    <div className="text-sm text-purple-600">Banners</div>
                    <div className="text-xs text-gray-500 mt-1">
                      2 per area
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl text-orange-600">{campaignPlan.materials.stickers.toLocaleString()}</div>
                    <div className="text-sm text-orange-600">Stickers</div>
                    <div className="text-xs text-gray-500 mt-1">
                      For supporters
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="text-sm text-gray-800 mb-2">Additional Materials</h4>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div>• Clipboards and pens for volunteers</div>
                    <div>• Volunteer ID badges</div>
                    <div>• Contact collection forms</div>
                    <div>• Campaign t-shirts/caps</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Campaign Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl text-orange-600">{campaignPlan.timeline.totalDays}</div>
                    <div className="text-sm text-orange-600">Total Days</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl text-red-600">{campaignPlan.timeline.hoursPerDay}</div>
                    <div className="text-sm text-red-600">Hours/Day</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl text-green-600">{campaignPlan.timeline.householdsPerHour}</div>
                    <div className="text-sm text-green-600">Houses/Hour</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h4 className="text-sm text-gray-800 mb-3">Daily Schedule Recommendation</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 bg-orange-50 rounded">
                      <span className="text-gray-700">Morning Shift</span>
                      <span className="text-orange-600">9:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-50 rounded">
                      <span className="text-gray-700">Evening Shift</span>
                      <span className="text-red-600">4:00 PM - 7:00 PM</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Best times when people are typically at home
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  Budget Estimation (BDT)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <div>
                      <div className="text-sm text-gray-800">Materials</div>
                      <div className="text-xs text-gray-500">Leaflets, posters, banners</div>
                    </div>
                    <div className="text-lg text-green-600">
                      ৳{campaignPlan.budget.materials.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <div>
                      <div className="text-sm text-gray-800">Transportation</div>
                      <div className="text-xs text-gray-500">Daily travel allowance</div>
                    </div>
                    <div className="text-lg text-blue-600">
                      ৳{campaignPlan.budget.transportation.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <div>
                      <div className="text-sm text-gray-800">Refreshments</div>
                      <div className="text-xs text-gray-500">Volunteer meals & snacks</div>
                    </div>
                    <div className="text-lg text-orange-600">
                      ৳{campaignPlan.budget.refreshments.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg">Total Budget</div>
                      <div className="text-sm opacity-90">Complete campaign cost</div>
                    </div>
                    <div className="text-2xl">
                      ৳{campaignPlan.budget.total.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  * Costs are estimated. Actual prices may vary by location and vendor.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}