import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Navigation, Plus, Minus, Target, Users, TrendingUp, Zap, Layers, Maximize2 } from 'lucide-react';
import { SelectedArea } from '../App';

// OpenLayers imports
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { fromLonLat } from 'ol/proj';
import { Style, Icon, Stroke, Fill, Circle } from 'ol/style';
import Overlay from 'ol/Overlay';
import { getCenter } from 'ol/extent';

interface MapViewProps {
  selectedAreas: SelectedArea[];
}

export function MapView({ selectedAreas }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [hoveredArea, setHoveredArea] = useState<SelectedArea | null>(null);
  const [mapStyle, setMapStyle] = useState<'osm' | 'satellite'>('osm');

  // Real coordinates for Dhaka areas
  const areaCoordinates = {
    'mohakhali': [90.4078, 23.7756],
    'niketon': [90.4153, 23.7847],
    'gulshan-1': [90.4156, 23.7947],
    'gulshan-2': [90.4206, 23.7889],
    'banani': [90.4067, 23.7936],
    'dhanmondi-32': [90.3742, 23.7461],
    'dhanmondi-27': [90.3781, 23.7506],
    'lalmatia': [90.3689, 23.7578],
    'panchlaish': [91.7978, 22.3569],
    'khulshi': [91.8106, 22.3447],
    'uttara': [90.3742, 23.8759],
    'ramna': [90.4125, 23.7465],
    'old-dhaka': [90.4072, 23.7104],
    'tejgaon': [90.3938, 23.7639],
    'mirpur': [90.3648, 23.8223],
    // Add more coordinates from the comprehensive database
    'tejgaon-ind': [90.3938, 23.7639],
    'karwan-bazar': [90.3912, 23.7511],
    'farmgate': [90.3889, 23.7567],
    'panthapath': [90.3756, 23.7456],
    'kawran-bazar': [90.3923, 23.7523],
    'tejgaon-college': [90.3945, 23.7612],
    'katabon': [90.3834, 23.7489],
    'indira-road': [90.3867, 23.7534],
    'shukrabad': [90.3723, 23.7445],
    'mohammadpur': [90.3656, 23.7689],
    'dhanmondi-15': [90.3834, 23.7489],
    'jigatola': [90.3712, 23.7534],
    'dhanmondi-lake': [90.3789, 23.7456],
    'kalabagan': [90.3812, 23.7423],
    'elephant-road': [90.3756, 23.7389],
    'new-market': [90.3823, 23.7356],
    'azimpur': [90.3789, 23.7334],
    'baridhara': [90.4289, 23.7978],
    'baridhara-dohs': [90.4323, 23.8023],
    'wireless': [90.4234, 23.7823],
    'tejkunipara': [90.4267, 23.7856],
    'banani-chairmanbari': [90.4034, 23.7889]
  };

  useEffect(() => {
    if (!mapRef.current) return;

    try {
      // Create popup overlay
      const popup = new Overlay({
        element: overlayRef.current!,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

      // Create base map
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([90.4125, 23.7465]), // Dhaka center
          zoom: 12,
        }),
        overlays: [popup],
      });

      setMap(initialMap);

      return () => {
        initialMap.setTarget(undefined);
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, []);

  useEffect(() => {
    if (!map) return;

    try {
      // Clear existing vector layers
      const vectorLayers = map.getLayers().getArray().filter(layer => layer instanceof VectorLayer);
      vectorLayers.forEach(layer => map.removeLayer(layer));

      if (selectedAreas.length === 0) return;

      // Create markers for selected areas
      const markerFeatures = [];
      
      for (const area of selectedAreas) {
        const coords = areaCoordinates[area.id as keyof typeof areaCoordinates];
        if (!coords || coords.length !== 2 || !isFinite(coords[0]) || !isFinite(coords[1])) {
          console.warn(`Invalid coordinates for area ${area.id}:`, coords);
          continue;
        }

        try {
          const feature = new Feature({
            geometry: new Point(fromLonLat(coords)),
            area: area,
          });

          feature.setStyle(new Style({
            image: new Circle({
              radius: 12,
              fill: new Fill({
                color: 'rgba(59, 130, 246, 0.8)',
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 3,
              }),
            }),
          }));

          markerFeatures.push(feature);
        } catch (error) {
          console.error(`Error creating feature for area ${area.id}:`, error);
        }
      }

      // Create route lines
      const routeFeatures = [];
      if (selectedAreas.length > 1) {
        for (let i = 0; i < selectedAreas.length - 1; i++) {
          const currentCoords = areaCoordinates[selectedAreas[i].id as keyof typeof areaCoordinates];
          const nextCoords = areaCoordinates[selectedAreas[i + 1].id as keyof typeof areaCoordinates];
          
          if (currentCoords && nextCoords && 
              currentCoords.length === 2 && nextCoords.length === 2 &&
              isFinite(currentCoords[0]) && isFinite(currentCoords[1]) &&
              isFinite(nextCoords[0]) && isFinite(nextCoords[1])) {
            
            try {
              const routeFeature = new Feature({
                geometry: new LineString([
                  fromLonLat(currentCoords),
                  fromLonLat(nextCoords)
                ]),
              });

              routeFeature.setStyle(new Style({
                stroke: new Stroke({
                  color: 'rgba(59, 130, 246, 0.8)',
                  width: 4,
                  lineDash: [10, 5],
                }),
              }));

              routeFeatures.push(routeFeature);
            } catch (error) {
              console.error(`Error creating route feature:`, error);
            }
          }
        }
      }

      // Only proceed if we have valid features
      if (markerFeatures.length === 0 && routeFeatures.length === 0) {
        console.warn('No valid features to display');
        return;
      }

      // Add vector layer with markers and routes
      const vectorSource = new VectorSource({
        features: [...markerFeatures, ...routeFeatures],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      map.addLayer(vectorLayer);

      // Add click handler for markers
      const popup = map.getOverlays().getArray()[0];
      
      map.on('click', (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
        
        if (feature && feature.get('area')) {
          const area = feature.get('area') as SelectedArea;
          setHoveredArea(area);
          popup.setPosition(event.coordinate);
        } else {
          setHoveredArea(null);
          popup.setPosition(undefined);
        }
      });

      // Add hover effect
      map.on('pointermove', (event) => {
        const pixel = map.getEventPixel(event.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        const target = map.getTarget() as HTMLElement;
        if (target) {
          target.style.cursor = hit ? 'pointer' : '';
        }
      });

      // Fit view to selected areas with proper error handling
      if (markerFeatures.length > 0) {
        try {
          const extent = vectorSource.getExtent();
          // Check if extent is valid (not empty/infinite)
          if (extent && isFinite(extent[0]) && isFinite(extent[1]) && 
              isFinite(extent[2]) && isFinite(extent[3]) && 
              extent[0] !== extent[2] && extent[1] !== extent[3]) {
            map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 16 });
          } else {
            // Fallback: center on the first valid feature
            const firstFeature = markerFeatures[0];
            if (firstFeature) {
              const geometry = firstFeature.getGeometry();
              if (geometry && geometry instanceof Point) {
                const center = geometry.getCoordinates();
                map.getView().setCenter(center);
                map.getView().setZoom(14);
              }
            }
          }
        } catch (error) {
          console.error('Error fitting view to extent:', error);
          // Fallback to default Dhaka view
          map.getView().setCenter(fromLonLat([90.4125, 23.7465]));
          map.getView().setZoom(12);
        }
      }

    } catch (error) {
      console.error('Error updating map features:', error);
    }

  }, [map, selectedAreas]);

  const handleZoomIn = () => {
    if (map) {
      try {
        const view = map.getView();
        const currentZoom = view.getZoom();
        if (currentZoom !== undefined) {
          view.setZoom(Math.min(18, currentZoom + 1));
        }
      } catch (error) {
        console.error('Error zooming in:', error);
      }
    }
  };

  const handleZoomOut = () => {
    if (map) {
      try {
        const view = map.getView();
        const currentZoom = view.getZoom();
        if (currentZoom !== undefined) {
          view.setZoom(Math.max(8, currentZoom - 1));
        }
      } catch (error) {
        console.error('Error zooming out:', error);
      }
    }
  };

  const handleFitView = () => {
    if (!map) return;

    try {
      if (selectedAreas.length > 0) {
        const vectorLayers = map.getLayers().getArray().filter(layer => layer instanceof VectorLayer);
        if (vectorLayers.length > 0) {
          const vectorLayer = vectorLayers[0] as VectorLayer;
          const source = vectorLayer.getSource();
          if (source) {
            const extent = source.getExtent();
            if (extent && isFinite(extent[0]) && isFinite(extent[1]) && 
                isFinite(extent[2]) && isFinite(extent[3]) && 
                extent[0] !== extent[2] && extent[1] !== extent[3]) {
              map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 16 });
            } else {
              // Fallback to default Dhaka view
              map.getView().setCenter(fromLonLat([90.4125, 23.7465]));
              map.getView().setZoom(12);
            }
          }
        }
      } else {
        map.getView().setCenter(fromLonLat([90.4125, 23.7465]));
        map.getView().setZoom(12);
      }
    } catch (error) {
      console.error('Error fitting view:', error);
      // Always fallback to default view
      if (map) {
        map.getView().setCenter(fromLonLat([90.4125, 23.7465]));
        map.getView().setZoom(12);
      }
    }
  };

  const toggleMapStyle = () => {
    if (!map) return;
    
    try {
      const newStyle = mapStyle === 'osm' ? 'satellite' : 'osm';
      setMapStyle(newStyle);
      
      // Remove existing base layer
      const baseLayers = map.getLayers().getArray().filter(layer => layer instanceof TileLayer);
      baseLayers.forEach(layer => {
        if (layer.getSource() instanceof OSM) {
          map.removeLayer(layer);
        }
      });
      
      // Add new base layer
      map.addLayer(new TileLayer({
        source: new OSM(),
      }));
    } catch (error) {
      console.error('Error toggling map style:', error);
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden h-full">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg flex-shrink-0">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl text-gray-800 truncate">
                Interactive Campaign Map
              </CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Real-time Bangladesh Visualization
              </div>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-3 py-1 rounded-xl shadow-lg text-xs flex-shrink-0">
            🗺️ OpenLayers
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Map Container */}
        <div className="relative h-[600px] overflow-hidden">
          <div ref={mapRef} className="w-full h-full"></div>
          
          {/* Popup Overlay */}
          <div ref={overlayRef} className="absolute pointer-events-none">
            {hoveredArea && (
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-5 min-w-60 border border-white/20 transform -translate-x-1/2 -translate-y-full -mt-2">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-lg text-gray-800">{hoveredArea.name}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Population</span>
                    </div>
                    <span className="text-sm text-blue-600">{hoveredArea.population.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm text-gray-600">Density</span>
                    </div>
                    <span className="text-sm text-indigo-600">{hoveredArea.density.toLocaleString()}/km²</span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-3 py-1">
                      🎯 Selected Area
                    </Badge>
                  </div>
                </div>
                
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-white/95"></div>
              </div>
            )}
          </div>

          {/* Map Controls */}
          <div className="absolute top-6 right-6 space-y-3 z-20">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                className="rounded-none border-b border-gray-200/50 p-4 h-14 w-14 hover:bg-blue-50 transition-all duration-200"
              >
                <Plus className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                className="rounded-none p-4 h-14 w-14 hover:bg-blue-50 transition-all duration-200"
              >
                <Minus className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFitView}
                className="bg-white/90 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl p-4 h-14 w-14 hover:bg-blue-50 transition-all duration-200 hover:scale-110"
              >
                <Maximize2 className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMapStyle}
                className="bg-white/90 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl p-4 h-14 w-14 hover:bg-blue-50 transition-all duration-200 hover:scale-110"
              >
                <Layers className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 max-w-72 z-20">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg text-gray-800">Map Legend</span>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                <span className="text-gray-700">Campaign Areas</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-2 bg-blue-500 rounded-full shadow-sm" style={{
                  background: 'repeating-linear-gradient(to right, #3b82f6 0px, #3b82f6 10px, transparent 10px, transparent 15px)'
                }}></div>
                <span className="text-gray-700">Optimized Routes</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1">
                  OpenStreetMap
                </Badge>
                <span className="text-gray-700">Current View</span>
              </div>
            </div>
          </div>

          {/* Active Campaign Indicator */}
          {selectedAreas.length > 0 && (
            <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl px-6 py-4 shadow-2xl border border-white/20 backdrop-blur-lg z-20">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6" />
                <div>
                  <div className="text-lg">🎯 Active Campaign</div>
                  <div className="text-sm opacity-90">{selectedAreas.length} locations mapped</div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {selectedAreas.length === 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border-2 border-dashed border-blue-300 text-center max-w-lg">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-2xl mx-auto mb-5 w-fit">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div className="text-2xl text-gray-800 mb-3">Real Map Ready</div>
                <div className="text-base text-gray-600 mb-5">Select areas to see them on the interactive Bangladesh map</div>
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm">
                  🗺️ OpenLayers Powered
                </Badge>
              </div>
            </div>
          )}
        </div>


      </CardContent>
    </Card>
  );
}