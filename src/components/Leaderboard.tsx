
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Search, 
  ArrowUpDown, 
  ArrowDown, 
  ArrowUp, 
  SlidersHorizontal,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';
import { fetchLeaderboardData } from '@/utils/api';

interface CityAQI {
  id: number;
  name: string;
  state: string;
  aqi: number;
  category: string;
  change: number;
  rank: number;
  previousRank: number;
}

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'rank' | 'aqi' | 'name'>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboardData,
  });
  
  const handleSort = (field: 'rank' | 'aqi' | 'name') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Mock data for preview
  const mockCities: CityAQI[] = [
    { id: 1, name: 'Delhi', state: 'Delhi', aqi: 185, category: 'Unhealthy', change: 15, rank: 1, previousRank: 1 },
    { id: 2, name: 'Mumbai', state: 'Maharashtra', aqi: 142, category: 'Unhealthy for Sensitive Groups', change: -8, rank: 2, previousRank: 3 },
    { id: 3, name: 'Kolkata', state: 'West Bengal', aqi: 135, category: 'Unhealthy for Sensitive Groups', change: 5, rank: 3, previousRank: 2 },
    { id: 4, name: 'Chennai', state: 'Tamil Nadu', aqi: 82, category: 'Moderate', change: -3, rank: 4, previousRank: 4 },
    { id: 5, name: 'Bangalore', state: 'Karnataka', aqi: 68, category: 'Moderate', change: -12, rank: 5, previousRank: 6 },
    { id: 6, name: 'Hyderabad', state: 'Telangana', aqi: 75, category: 'Moderate', change: 3, rank: 6, previousRank: 5 },
    { id: 7, name: 'Pune', state: 'Maharashtra', aqi: 95, category: 'Moderate', change: 10, rank: 7, previousRank: 9 },
    { id: 8, name: 'Jaipur', state: 'Rajasthan', aqi: 110, category: 'Unhealthy for Sensitive Groups', change: -5, rank: 8, previousRank: 7 },
    { id: 9, name: 'Lucknow', state: 'Uttar Pradesh', aqi: 120, category: 'Unhealthy for Sensitive Groups', change: 8, rank: 9, previousRank: 10 },
    { id: 10, name: 'Ahmedabad', state: 'Gujarat', aqi: 105, category: 'Unhealthy for Sensitive Groups', change: -10, rank: 10, previousRank: 8 },
    { id: 11, name: 'Bhopal', state: 'Madhya Pradesh', aqi: 88, category: 'Moderate', change: -2, rank: 11, previousRank: 11 },
    { id: 12, name: 'Patna', state: 'Bihar', aqi: 158, category: 'Unhealthy', change: 20, rank: 12, previousRank: 15 },
    { id: 13, name: 'Chandigarh', state: 'Chandigarh', aqi: 66, category: 'Moderate', change: -15, rank: 13, previousRank: 12 },
    { id: 14, name: 'Indore', state: 'Madhya Pradesh', aqi: 72, category: 'Moderate', change: -5, rank: 14, previousRank: 14 },
    { id: 15, name: 'Surat', state: 'Gujarat', aqi: 85, category: 'Moderate', change: 8, rank: 15, previousRank: 18 },
  ];
  
  const cities = data || mockCities;
  
  // Filter cities based on search term
  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort cities based on sort field and direction
  const sortedCities = [...filteredCities].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortField === 'aqi') {
      return sortDirection === 'asc' 
        ? a.aqi - b.aqi 
        : b.aqi - a.aqi;
    } else {
      return sortDirection === 'asc' 
        ? a.rank - b.rank 
        : b.rank - a.rank;
    }
  });
  
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-aqi-good';
    if (aqi <= 100) return 'bg-aqi-moderate';
    if (aqi <= 150) return 'bg-aqi-unhealthy';
    if (aqi <= 200) return 'bg-aqi-veryUnhealthy';
    return 'bg-aqi-hazardous';
  };
  
  const getRankChangeIcon = (change: number) => {
    if (change === 0) return null;
    if (change > 0) {
      return <ArrowUp className="w-4 h-4 text-red-500" />;
    } else {
      return <ArrowDown className="w-4 h-4 text-green-500" />;
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Indian Cities AQI Leaderboard</h2>
            <p className="text-muted-foreground">Ranking of major Indian cities by Air Quality Index</p>
          </div>
          
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search city or state..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2">Loading leaderboard data...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-16 text-red-500">
            <AlertTriangle className="w-6 h-6 mr-2" />
            <span>Failed to load leaderboard data</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('rank')}
                      >
                        Rank
                        <ArrowUpDown className={`ml-1 w-4 h-4 ${sortField === 'rank' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('name')}
                      >
                        City
                        <ArrowUpDown className={`ml-1 w-4 h-4 ${sortField === 'name' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">State</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('aqi')}
                      >
                        AQI
                        <ArrowUpDown className={`ml-1 w-4 h-4 ${sortField === 'aqi' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sortedCities.map((city, index) => (
                    <motion.tr
                      key={city.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {city.rank <= 3 && (
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                              city.rank === 1 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : city.rank === 2 
                                ? 'bg-slate-100 text-slate-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              <Trophy className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <span className={city.rank <= 3 ? 'font-semibold' : ''}>
                            {city.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-medium">{city.name}</td>
                      <td className="px-4 py-4 text-muted-foreground">{city.state}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getAQIColor(city.aqi)} mr-2`}></div>
                          <span className="font-mono">{city.aqi}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          city.category === 'Good' 
                            ? 'bg-green-100 text-green-800' 
                            : city.category === 'Moderate' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : city.category === 'Unhealthy for Sensitive Groups' 
                            ? 'bg-orange-100 text-orange-800' 
                            : city.category === 'Unhealthy' 
                            ? 'bg-red-100 text-red-800' 
                            : city.category === 'Very Unhealthy' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-slate-900 text-white'
                        }`}>
                          {city.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {getRankChangeIcon(city.change)}
                          <span className={`ml-1 ${
                            city.change > 0 
                              ? 'text-red-500' 
                              : city.change < 0 
                              ? 'text-green-500' 
                              : ''
                          }`}>
                            {Math.abs(city.change)}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
              <div>
                Showing {filteredCities.length} of {cities.length} cities
              </div>
              <div className="flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <span>Updated daily</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">About the AQI Leaderboard</h3>
        <p className="text-muted-foreground mb-4">
          This leaderboard ranks major Indian cities based on their Air Quality Index (AQI).
          The ranking is updated daily using data from various air quality monitoring stations across India.
        </p>
        
        <h4 className="font-medium mb-2">AQI Categories</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="rounded-lg bg-white/50 dark:bg-slate-900/50 p-3 text-center">
            <div className="w-full h-2 bg-aqi-good rounded-full mb-2"></div>
            <div className="text-sm font-medium">Good</div>
            <div className="text-xs text-muted-foreground">0-50</div>
          </div>
          <div className="rounded-lg bg-white/50 dark:bg-slate-900/50 p-3 text-center">
            <div className="w-full h-2 bg-aqi-moderate rounded-full mb-2"></div>
            <div className="text-sm font-medium">Moderate</div>
            <div className="text-xs text-muted-foreground">51-100</div>
          </div>
          <div className="rounded-lg bg-white/50 dark:bg-slate-900/50 p-3 text-center">
            <div className="w-full h-2 bg-aqi-unhealthy rounded-full mb-2"></div>
            <div className="text-sm font-medium">Unhealthy for Sensitive Groups</div>
            <div className="text-xs text-muted-foreground">101-150</div>
          </div>
          <div className="rounded-lg bg-white/50 dark:bg-slate-900/50 p-3 text-center">
            <div className="w-full h-2 bg-aqi-veryUnhealthy rounded-full mb-2"></div>
            <div className="text-sm font-medium">Unhealthy</div>
            <div className="text-xs text-muted-foreground">151-200</div>
          </div>
          <div className="rounded-lg bg-white/50 dark:bg-slate-900/50 p-3 text-center">
            <div className="w-full h-2 bg-aqi-hazardous rounded-full mb-2"></div>
            <div className="text-sm font-medium">Very Unhealthy</div>
            <div className="text-xs text-muted-foreground">201-300</div>
          </div>
          <div className="rounded-lg bg-white/50 dark:bg-slate-900/50 p-3 text-center">
            <div className="w-full h-2 bg-purple-900 rounded-full mb-2"></div>
            <div className="text-sm font-medium">Hazardous</div>
            <div className="text-xs text-muted-foreground">301+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
