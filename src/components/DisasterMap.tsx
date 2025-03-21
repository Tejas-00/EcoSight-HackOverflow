
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  AlertTriangle, 
  Droplets, 
  Flame, 
  CloudRain, 
  CloudLightning, 
  Mountain, 
  Wind, 
  Filter, 
  List,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Info
} from 'lucide-react';
import { fetchDisasters } from '@/utils/api';

// Types
export type DisasterType = 
  | 'earthquake'
  | 'flood' 
  | 'wildfire' 
  | 'drought' 
  | 'volcano' 
  | 'storm'
  | 'other';

interface Disaster {
  id: string;
  title: string;
  description: string;
  category: DisasterType;
  date: string;
  coordinates: [number, number];
  source: string;
  severity?: 'low' | 'medium' | 'high';
}

const DisasterMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [selectedDisaster, setSelectedDisaster] = useState<Disaster | null>(null);
  const [filters, setFilters] = useState<DisasterType[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Fetch disasters data
  const { data: disasters, isLoading, error } = useQuery({
    queryKey: ['disasters'],
    queryFn: fetchDisasters,
  });
  
  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // For demo purposes, we'll mock the map initialization
    // In a real implementation, you would use Leaflet or Mapbox
    console.log('Initializing map...');
    
    const mockMap = {
      id: 'disaster-map',
      initialized: true,
      center: [0, 0],
      zoom: 2,
      markers: [],
    };
    
    setMap(mockMap);
    
    return () => {
      // Cleanup
      console.log('Cleaning up map...');
      setMap(null);
    };
  }, []);
  
  // Update map when disasters data changes
  useEffect(() => {
    if (!map || !disasters) return;
    
    console.log('Updating map with disasters:', disasters.length);
    
    // In a real implementation, you would update the map with markers
    // For demo purposes, we're just logging the data
  }, [map, disasters]);
  
  const getDisasterIcon = (type: DisasterType) => {
    switch (type) {
      case 'earthquake':
        return <AlertTriangle className="w-5 h-5 text-white" />;
      case 'flood':
        return <Droplets className="w-5 h-5 text-white" />;
      case 'wildfire':
        return <Flame className="w-5 h-5 text-white" />;
      case 'drought':
        return <Mountain className="w-5 h-5 text-white" />;
      case 'volcano':
        return <Mountain className="w-5 h-5 text-white" />;
      case 'storm':
        return <CloudLightning className="w-5 h-5 text-white" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-white" />;
    }
  };
  
  const getDisasterColor = (type: DisasterType) => {
    switch (type) {
      case 'earthquake':
        return 'bg-disaster-earthquake';
      case 'flood':
        return 'bg-disaster-flood';
      case 'wildfire':
        return 'bg-disaster-wildfire';
      case 'drought':
        return 'bg-disaster-drought';
      case 'volcano':
        return 'bg-disaster-volcano';
      case 'storm':
        return 'bg-disaster-storm';
      default:
        return 'bg-disaster-default';
    }
  };
  
  const toggleFilter = (type: DisasterType) => {
    if (filters.includes(type)) {
      setFilters(filters.filter(f => f !== type));
    } else {
      setFilters([...filters, type]);
    }
  };
  
  const filteredDisasters = disasters
    ? filters.length > 0
      ? disasters.filter(d => filters.includes(d.category))
      : disasters
    : [];
  
  // Mock disaster data for preview
  const mockDisasters: Disaster[] = [
    {
      id: '1',
      title: 'California Wildfire',
      description: 'Major wildfire spreading across Northern California forests',
      category: 'wildfire',
      date: '2023-07-15',
      coordinates: [38.5816, -121.4944],
      source: 'NASA EONET',
      severity: 'high',
    },
    {
      id: '2',
      title: 'Southern India Flooding',
      description: 'Severe flooding affecting coastal regions in Southern India',
      category: 'flood',
      date: '2023-06-20',
      coordinates: [13.0827, 80.2707],
      source: 'NASA EONET',
      severity: 'medium',
    },
    {
      id: '3',
      title: 'Japan Earthquake',
      description: 'Magnitude 6.2 earthquake near the coast of Japan',
      category: 'earthquake',
      date: '2023-08-01',
      coordinates: [35.6762, 139.6503],
      source: 'NASA EONET',
      severity: 'high',
    },
    {
      id: '4',
      title: 'East Africa Drought',
      description: 'Prolonged drought affecting agricultural regions in East Africa',
      category: 'drought',
      date: '2023-05-10',
      coordinates: [9.145, 40.4897],
      source: 'NASA EONET',
      severity: 'medium',
    },
    {
      id: '5',
      title: 'Hurricane Atlantic',
      description: 'Category 3 hurricane moving westward in the Atlantic Ocean',
      category: 'storm',
      date: '2023-09-05',
      coordinates: [25.7617, -80.1918],
      source: 'NASA EONET',
      severity: 'high',
    },
  ];
  
  return (
    <div className="w-full h-full flex">
      {/* Sidebar */}
      <motion.div 
        className={`h-full bg-white dark:bg-slate-900 border-r border-border z-10 flex flex-col`}
        initial={{ width: sidebarOpen ? '350px' : '0px' }}
        animate={{ width: sidebarOpen ? '350px' : '0px' }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold">Disaster Events</h2>
          <div className="flex gap-2">
            <button
              className="p-1.5 rounded-md hover:bg-secondary"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center mb-3">
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Filter by type</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['earthquake', 'flood', 'wildfire', 'drought', 'volcano', 'storm'] as DisasterType[]).map((type) => (
              <button
                key={type}
                className={`px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 transition-colors ${
                  filters.includes(type)
                    ? `${getDisasterColor(type)} text-white`
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
                onClick={() => toggleFilter(type)}
              >
                {getDisasterIcon(type)}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Disaster list */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2">Loading disasters...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500">
              <AlertTriangle className="w-6 h-6 mr-2" />
              <span>Failed to load disaster data</span>
            </div>
          ) : filteredDisasters.length === 0 && mockDisasters.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <Info className="w-6 h-6 mr-2" />
              <span>No disasters found</span>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {(disasters || mockDisasters).map((disaster) => (
                <button
                  key={disaster.id}
                  className={`w-full p-4 text-left transition-colors hover:bg-muted/30 ${
                    selectedDisaster?.id === disaster.id ? 'bg-muted/50' : ''
                  }`}
                  onClick={() => setSelectedDisaster(disaster)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getDisasterColor(disaster.category)}`}>
                      {getDisasterIcon(disaster.category)}
                    </div>
                    <div>
                      <h3 className="font-medium">{disaster.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {disaster.description}
                      </p>
                      <div className="flex items-center mt-2 gap-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(disaster.date).toLocaleDateString()}
                        </span>
                        {disaster.severity && (
                          <span 
                            className={`status-chip text-white ${
                              disaster.severity === 'high' 
                                ? 'bg-red-500' 
                                : disaster.severity === 'medium' 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                            }`}
                          >
                            {disaster.severity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Map */}
      <div className="flex-1 relative">
        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 bg-slate-100 dark:bg-slate-800"
          style={{
            backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/0,20,1,0/1200x800?access_token=pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2p0ZXhhbTR5MGJreTN5cGRqNnpnaGl1aCJ9.9e5-J_2tQxXQCcgGjOOPow')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="glass-card p-2 rounded-lg shadow-sm flex flex-col gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
            </button>
          </div>
          <div className="glass-card p-2 rounded-lg shadow-sm">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            </button>
          </div>
        </div>
        
        {/* Toggle sidebar button (mobile) */}
        <button
          className="md:hidden absolute top-4 left-4 glass-card p-2 rounded-lg shadow-sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <List className="w-5 h-5" />
        </button>
        
        {/* Selected disaster info */}
        {selectedDisaster && (
          <div className="absolute bottom-4 left-4 right-4 max-w-md glass-card p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">{selectedDisaster.title}</h3>
              <button 
                className="p-1 rounded-full hover:bg-muted/50"
                onClick={() => setSelectedDisaster(null)}
              >
                ×
              </button>
            </div>
            <p className="mt-2 text-sm">{selectedDisaster.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <div className="flex items-center mt-1">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-1.5 ${getDisasterColor(selectedDisaster.category)}`}>
                    {getDisasterIcon(selectedDisaster.category)}
                  </div>
                  <span>{selectedDisaster.category.charAt(0).toUpperCase() + selectedDisaster.category.slice(1)}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <div className="mt-1">
                  {new Date(selectedDisaster.date).toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Coordinates:</span>
                <div className="mt-1">
                  {selectedDisaster.coordinates[0].toFixed(2)}, {selectedDisaster.coordinates[1].toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Source:</span>
                <div className="mt-1">{selectedDisaster.source}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterMap;
