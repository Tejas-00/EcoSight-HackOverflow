
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Search, 
  Wind, 
  Loader2, 
  AlertTriangle,
  Lungs,
  Activity,
  Droplets,
  CloudRain,
  Thermometer
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { fetchAQIData } from '@/utils/api';

interface AQIData {
  location: string;
  current: {
    aqi: number;
    category: string;
    pollutants: {
      pm25: number;
      pm10: number;
      o3: number;
      no2: number;
      so2: number;
      co: number;
    };
    timestamp: string;
  };
  forecast: {
    timestamp: string;
    aqi: number;
  }[];
  health: {
    generalPopulation: string;
    sensitiveGroups: string;
    healthRisks: {
      respiratory: 'low' | 'moderate' | 'high' | 'very high';
      cardiovascular: 'low' | 'moderate' | 'high' | 'very high';
      eyeIrritation: 'low' | 'moderate' | 'high' | 'very high';
    };
  };
  recommendations: {
    outdoor: string[];
    indoor: string[];
    protection: string[];
  };
  weather: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    conditions: string;
  };
}

const AQIMonitor = () => {
  const [location, setLocation] = useState('');
  const [searchedLocation, setSearchedLocation] = useState('');
  
  const { data: aqiData, isLoading, error, refetch } = useQuery({
    queryKey: ['aqi', searchedLocation],
    queryFn: () => fetchAQIData(searchedLocation),
    enabled: !!searchedLocation,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      setSearchedLocation(location.trim());
    }
  };
  
  // Mock AQI data for preview
  const mockAQIData: AQIData = {
    location: 'Delhi, India',
    current: {
      aqi: 185,
      category: 'Unhealthy',
      pollutants: {
        pm25: 103,
        pm10: 165,
        o3: 48,
        no2: 38,
        so2: 15,
        co: 10,
      },
      timestamp: '2023-09-15T10:30:00Z',
    },
    forecast: [
      { timestamp: '2023-09-15T12:00:00Z', aqi: 190 },
      { timestamp: '2023-09-15T15:00:00Z', aqi: 200 },
      { timestamp: '2023-09-15T18:00:00Z', aqi: 178 },
      { timestamp: '2023-09-15T21:00:00Z', aqi: 168 },
      { timestamp: '2023-09-16T00:00:00Z', aqi: 155 },
      { timestamp: '2023-09-16T03:00:00Z', aqi: 145 },
      { timestamp: '2023-09-16T06:00:00Z', aqi: 160 },
    ],
    health: {
      generalPopulation: 'May experience health effects; members of sensitive groups may experience more serious health effects.',
      sensitiveGroups: 'People with respiratory or heart disease, the elderly and children should limit prolonged outdoor exertion.',
      healthRisks: {
        respiratory: 'high',
        cardiovascular: 'moderate',
        eyeIrritation: 'high',
      },
    },
    recommendations: {
      outdoor: [
        'Limit outdoor activities, especially during peak pollution hours',
        'If you must go outside, wear a proper N95 mask',
        'Avoid exercising outdoors, especially near high-traffic areas',
      ],
      indoor: [
        'Keep windows and doors closed',
        'Use air purifiers with HEPA filters',
        'Clean your home regularly to reduce particulate matter',
      ],
      protection: [
        'Stay hydrated to help your body clear out toxins',
        'Consider taking antioxidant supplements after consulting with a doctor',
        'Monitor symptoms like coughing, wheezing, or shortness of breath',
      ],
    },
    weather: {
      temperature: 32,
      humidity: 65,
      windSpeed: 8,
      windDirection: 'NW',
      conditions: 'Partly Cloudy',
    },
  };
  
  const data = aqiData || mockAQIData;
  
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-aqi-good';
    if (aqi <= 100) return 'bg-aqi-moderate';
    if (aqi <= 150) return 'bg-aqi-unhealthy';
    if (aqi <= 200) return 'bg-aqi-veryUnhealthy';
    return 'bg-aqi-hazardous';
  };
  
  const getAQITextColor = (aqi: number) => {
    if (aqi <= 50) return 'text-aqi-good';
    if (aqi <= 100) return 'text-aqi-moderate';
    if (aqi <= 150) return 'text-aqi-unhealthy';
    if (aqi <= 200) return 'text-aqi-veryUnhealthy';
    return 'text-aqi-hazardous';
  };
  
  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };
  
  const getAQIGradient = (aqi: number) => {
    if (aqi <= 50) return 'from-green-500/20 to-green-500/5';
    if (aqi <= 100) return 'from-yellow-500/20 to-yellow-500/5';
    if (aqi <= 150) return 'from-orange-500/20 to-orange-500/5';
    if (aqi <= 200) return 'from-red-500/20 to-red-500/5';
    if (aqi <= 300) return 'from-purple-500/20 to-purple-500/5';
    return 'from-purple-900/20 to-purple-900/5';
  };
  
  const getRiskColor = (level: 'low' | 'moderate' | 'high' | 'very high') => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'very high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  const pollutants = data ? [
    { name: 'PM2.5', value: data.current.pollutants.pm25, unit: 'μg/m³', icon: <Droplets className="w-4 h-4" /> },
    { name: 'PM10', value: data.current.pollutants.pm10, unit: 'μg/m³', icon: <CloudRain className="w-4 h-4" /> },
    { name: 'O3', value: data.current.pollutants.o3, unit: 'ppb', icon: <Wind className="w-4 h-4" /> },
    { name: 'NO2', value: data.current.pollutants.no2, unit: 'ppb', icon: <Wind className="w-4 h-4" /> },
    { name: 'SO2', value: data.current.pollutants.so2, unit: 'ppb', icon: <Wind className="w-4 h-4" /> },
    { name: 'CO', value: data.current.pollutants.co, unit: 'ppm', icon: <Wind className="w-4 h-4" /> },
  ] : [];
  
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Air Quality Index Monitor</h2>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter a location (city, region, country)"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !location.trim()}
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Check AQI'
              )}
            </button>
          </form>
        </div>
        
        {error ? (
          <div className="glass-card rounded-xl p-6 mb-8 border border-red-300 bg-red-50 text-red-800">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span>Error fetching AQI data. Please try again.</span>
            </div>
          </div>
        ) : data && searchedLocation ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <span className="text-sm text-muted-foreground">Air Quality in</span>
                  <h3 className="text-xl font-bold">{data.location}</h3>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                  <span className="text-sm">Updated: {formatTime(data.current.timestamp)}</span>
                  <div className="px-3 py-1.5 bg-secondary rounded-full text-xs font-medium">
                    {formatDate(data.current.timestamp)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-b rounded-xl border border-white/10 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Current AQI</div>
                    <div className={`text-5xl font-bold mb-2 ${getAQITextColor(data.current.aqi)}`}>
                      {data.current.aqi}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white mb-4 ${getAQIColor(data.current.aqi)}`}>
                      {getAQICategory(data.current.aqi)}
                    </div>
                    
                    <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden mb-4">
                      <div 
                        className={`h-full rounded-full ${getAQIColor(data.current.aqi)}`}
                        style={{ width: `${Math.min(100, (data.current.aqi / 500) * 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-sm text-center">
                      <div className="font-medium mb-1">Weather Conditions</div>
                      <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                        <div className="flex items-center">
                          <Thermometer className="w-4 h-4 mr-1" />
                          {data.weather.temperature}°C
                        </div>
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 mr-1" />
                          {data.weather.humidity}%
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-4 h-4 mr-1" />
                          {data.weather.windSpeed} km/h
                        </div>
                        <div>
                          {data.weather.conditions}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                      24-Hour Forecast
                    </h4>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={data.forecast}
                          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                          <XAxis 
                            dataKey="timestamp" 
                            tickFormatter={formatTime}
                            minTickGap={30}
                          />
                          <YAxis domain={[0, 'dataMax']} />
                          <Tooltip
                            labelFormatter={(label) => formatTime(label)}
                            formatter={(value: any) => [value, 'AQI']}
                          />
                          <Area
                            type="monotone"
                            dataKey="aqi"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#aqiGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="glass-card rounded-xl p-6">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Pollutant Levels
                </h4>
                <div className="space-y-4">
                  {pollutants.map((pollutant) => (
                    <div key={pollutant.name} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          {pollutant.icon}
                          <h5 className="font-medium ml-2">{pollutant.name}</h5>
                        </div>
                        <span className="font-mono">
                          {pollutant.value} {pollutant.unit}
                        </span>
                      </div>
                      <div className="w-full bg-secondary/50 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ 
                            width: `${pollutant.name === 'PM2.5' 
                              ? Math.min(100, (pollutant.value / 150) * 100) 
                              : Math.min(100, (pollutant.value / 200) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Health Impacts
                </h4>
                <div className="mb-4">
                  <h5 className="font-medium mb-2">General Population</h5>
                  <p className="text-sm text-muted-foreground mb-4">{data.health.generalPopulation}</p>
                  
                  <h5 className="font-medium mb-2">Sensitive Groups</h5>
                  <p className="text-sm text-muted-foreground">{data.health.sensitiveGroups}</p>
                </div>
                
                <h5 className="font-medium mb-3 mt-6">Health Risk Levels</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex flex-col items-center">
                    <div className="mb-2">
                      <Lungs className="w-7 h-7 text-muted-foreground mb-1" />
                      <div className="text-xs text-center font-medium">Respiratory</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(data.health.healthRisks.respiratory)}`}>
                      {data.health.healthRisks.respiratory}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2">
                      <Activity className="w-7 h-7 text-muted-foreground mb-1" />
                      <div className="text-xs text-center font-medium">Cardiovascular</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(data.health.healthRisks.cardiovascular)}`}>
                      {data.health.healthRisks.cardiovascular}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2">
                      <svg className="w-7 h-7 text-muted-foreground mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="4"/>
                      </svg>
                      <div className="text-xs text-center font-medium">Eye Irritation</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(data.health.healthRisks.eyeIrritation)}`}>
                      {data.health.healthRisks.eyeIrritation}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Recommendations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="flex items-center font-medium mb-3">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 9A7 7 0 1 0 5 9a7 7 0 0 0 14 0Z"/>
                      <path d="M5 9a7 7 0 0 0 7 7"/>
                      <path d="M19 9a7 7 0 0 1-7 7"/>
                      <path d="M12 16v6"/>
                      <path d="m8 22 4-3 4 3"/>
                    </svg>
                    Outdoor Activities
                  </h5>
                  <ul className="space-y-2">
                    {data.recommendations.outdoor.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="flex items-center font-medium mb-3">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    Indoor Measures
                  </h5>
                  <ul className="space-y-2">
                    {data.recommendations.indoor.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="flex items-center font-medium mb-3">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Health Protection
                  </h5>
                  <ul className="space-y-2">
                    {data.recommendations.protection.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default AQIMonitor;
