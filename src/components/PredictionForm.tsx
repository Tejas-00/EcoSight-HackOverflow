
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Search, 
  CloudRain, 
  Droplets, 
  Mountain, 
  Tornado, 
  AlertTriangle,
  Flame,
  Loader2
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { predictDisasters } from '@/utils/api';

interface PredictionResult {
  location: string;
  predictions: {
    drought: number;
    flood: number;
    wildfire: number;
    earthquake: number;
    tornado: number;
  };
  historicalData: {
    year: number;
    drought: number;
    flood: number;
    wildfire: number;
  }[];
  riskFactors: {
    factor: string;
    score: number;
    description: string;
  }[];
  recommendations: string[];
}

const PredictionForm = () => {
  const [location, setLocation] = useState('');
  const [searchedLocation, setSearchedLocation] = useState('');
  
  const { data: predictionResult, isLoading, error, refetch } = useQuery({
    queryKey: ['predictions', searchedLocation],
    queryFn: () => predictDisasters(searchedLocation),
    enabled: !!searchedLocation,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      setSearchedLocation(location.trim());
    }
  };
  
  // Mock prediction data for preview
  const mockPrediction: PredictionResult = {
    location: 'Mumbai, India',
    predictions: {
      drought: 0.15,
      flood: 0.65,
      wildfire: 0.1,
      earthquake: 0.05,
      tornado: 0.05,
    },
    historicalData: [
      { year: 2018, drought: 10, flood: 45, wildfire: 5 },
      { year: 2019, drought: 15, flood: 50, wildfire: 10 },
      { year: 2020, drought: 20, flood: 55, wildfire: 8 },
      { year: 2021, drought: 18, flood: 60, wildfire: 12 },
      { year: 2022, drought: 12, flood: 58, wildfire: 15 },
    ],
    riskFactors: [
      { 
        factor: 'Coastal Location', 
        score: 0.9, 
        description: 'Proximity to the Arabian Sea increases flood risks during monsoon season.'
      },
      { 
        factor: 'Urban Development', 
        score: 0.75, 
        description: 'Dense urban development with inadequate drainage systems.'
      },
      { 
        factor: 'Monsoon Patterns', 
        score: 0.8, 
        description: 'Regular heavy monsoon rains can lead to urban flooding.'
      },
    ],
    recommendations: [
      'Improve urban drainage systems in low-lying areas',
      'Develop early warning systems for heavy rainfall events',
      'Create flood-resistant infrastructure in high-risk zones',
      'Implement regular maintenance of existing drainage systems',
    ],
  };
  
  const result = predictionResult || mockPrediction;
  
  const COLORS = {
    drought: '#8B4513',
    flood: '#2196F3',
    wildfire: '#FF9800',
    earthquake: '#FF4A4A',
    tornado: '#9C27B0',
  };
  
  const pieData = result ? [
    { name: 'Drought', value: result.predictions.drought, color: COLORS.drought },
    { name: 'Flood', value: result.predictions.flood, color: COLORS.flood },
    { name: 'Wildfire', value: result.predictions.wildfire, color: COLORS.wildfire },
    { name: 'Earthquake', value: result.predictions.earthquake, color: COLORS.earthquake },
    { name: 'Tornado', value: result.predictions.tornado, color: COLORS.tornado },
  ] : [];
  
  const getDisasterIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'drought':
        return <Mountain className="w-5 h-5" />;
      case 'flood':
        return <Droplets className="w-5 h-5" />;
      case 'wildfire':
        return <Flame className="w-5 h-5" />;
      case 'earthquake':
        return <AlertTriangle className="w-5 h-5" />;
      case 'tornado':
        return <Tornado className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Disaster Prediction</h2>
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
                'Predict'
              )}
            </button>
          </form>
        </div>
        
        {error ? (
          <div className="glass-card rounded-xl p-6 mb-8 border border-red-300 bg-red-50 text-red-800">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span>Error fetching prediction data. Please try again.</span>
            </div>
          </div>
        ) : result && searchedLocation ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <span className="text-sm text-muted-foreground">Prediction for</span>
                  <h3 className="text-xl font-bold">{result.location}</h3>
                </div>
                <div className="mt-2 sm:mt-0 px-3 py-1.5 bg-secondary rounded-full text-xs font-medium">
                  Based on historical data and ML analysis
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Disaster Probability
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [`${(value * 100).toFixed(0)}%`, 'Probability']} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {pieData.sort((a, b) => b.value - a.value).slice(0, 4).map((item) => (
                      <div key={item.name} className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <div className="text-sm">
                          <div className="flex items-center">
                            {getDisasterIcon(item.name)}
                            <span className="ml-1.5 font-medium">{item.name}</span>
                          </div>
                          <div className="text-muted-foreground">
                            {(item.value * 100).toFixed(0)}% probability
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Historical Trend
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={result.historicalData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="drought" fill={COLORS.drought} name="Drought" />
                        <Bar dataKey="flood" fill={COLORS.flood} name="Flood" />
                        <Bar dataKey="wildfire" fill={COLORS.wildfire} name="Wildfire" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-xl p-6">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Risk Factors
                </h4>
                <div className="space-y-4">
                  {result.riskFactors.map((factor, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-medium">{factor.factor}</h5>
                        <span 
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            factor.score > 0.7 
                              ? 'bg-red-100 text-red-800' 
                              : factor.score > 0.4 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          Risk: {factor.score.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{factor.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Recommendations
                </h4>
                <ul className="space-y-3">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        {index + 1}
                      </div>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default PredictionForm;
