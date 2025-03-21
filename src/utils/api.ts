
import { DisasterType } from '@/components/DisasterMap';

// Mock API functions for demo purposes
// In a real app, these would make actual API calls to the respective services

export const fetchDisasters = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock disaster data
  const mockDisasters = [
    {
      id: '1',
      title: 'California Wildfire',
      description: 'Major wildfire spreading across Northern California forests',
      category: 'wildfire' as DisasterType,
      date: '2023-07-15',
      coordinates: [38.5816, -121.4944] as [number, number],
      source: 'NASA EONET',
      severity: 'high' as 'low' | 'medium' | 'high',
    },
    {
      id: '2',
      title: 'Southern India Flooding',
      description: 'Severe flooding affecting coastal regions in Southern India',
      category: 'flood' as DisasterType,
      date: '2023-06-20',
      coordinates: [13.0827, 80.2707] as [number, number],
      source: 'NASA EONET',
      severity: 'medium' as 'low' | 'medium' | 'high',
    },
    {
      id: '3',
      title: 'Japan Earthquake',
      description: 'Magnitude 6.2 earthquake near the coast of Japan',
      category: 'earthquake' as DisasterType,
      date: '2023-08-01',
      coordinates: [35.6762, 139.6503] as [number, number],
      source: 'NASA EONET',
      severity: 'high' as 'low' | 'medium' | 'high',
    },
    {
      id: '4',
      title: 'East Africa Drought',
      description: 'Prolonged drought affecting agricultural regions in East Africa',
      category: 'drought' as DisasterType,
      date: '2023-05-10',
      coordinates: [9.145, 40.4897] as [number, number],
      source: 'NASA EONET',
      severity: 'medium' as 'low' | 'medium' | 'high',
    },
    {
      id: '5',
      title: 'Hurricane Atlantic',
      description: 'Category 3 hurricane moving westward in the Atlantic Ocean',
      category: 'storm' as DisasterType,
      date: '2023-09-05',
      coordinates: [25.7617, -80.1918] as [number, number],
      source: 'NASA EONET',
      severity: 'high' as 'low' | 'medium' | 'high',
    },
  ];
  
  return mockDisasters;
};

export const predictDisasters = async (location: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock prediction data
  if (location.toLowerCase().includes('mumbai')) {
    return {
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
  } else if (location.toLowerCase().includes('california')) {
    return {
      location: 'California, USA',
      predictions: {
        drought: 0.25,
        flood: 0.1,
        wildfire: 0.55,
        earthquake: 0.08,
        tornado: 0.02,
      },
      historicalData: [
        { year: 2018, drought: 35, flood: 10, wildfire: 45 },
        { year: 2019, drought: 40, flood: 8, wildfire: 50 },
        { year: 2020, drought: 45, flood: 12, wildfire: 48 },
        { year: 2021, drought: 48, flood: 15, wildfire: 55 },
        { year: 2022, drought: 42, flood: 10, wildfire: 60 },
      ],
      riskFactors: [
        { 
          factor: 'Prolonged Drought', 
          score: 0.85, 
          description: 'Extended periods of low precipitation creating dry vegetation.'
        },
        { 
          factor: 'Climate Warming', 
          score: 0.8, 
          description: 'Rising temperatures increasing wildfire frequency and intensity.'
        },
        { 
          factor: 'Forest Management', 
          score: 0.65, 
          description: 'Challenges in managing vast forest areas for fire prevention.'
        },
      ],
      recommendations: [
        'Implement more frequent controlled burns to reduce fuel loads',
        'Create and maintain larger firebreaks near residential areas',
        'Increase water conservation efforts to mitigate drought effects',
        'Develop community wildfire preparedness plans',
      ],
    };
  } else {
    // Default prediction data
    return {
      location: location || 'Unknown Location',
      predictions: {
        drought: 0.2,
        flood: 0.2,
        wildfire: 0.2,
        earthquake: 0.2,
        tornado: 0.2,
      },
      historicalData: [
        { year: 2018, drought: 20, flood: 20, wildfire: 20 },
        { year: 2019, drought: 22, flood: 18, wildfire: 22 },
        { year: 2020, drought: 25, flood: 15, wildfire: 25 },
        { year: 2021, drought: 23, flood: 17, wildfire: 23 },
        { year: 2022, drought: 20, flood: 20, wildfire: 20 },
      ],
      riskFactors: [
        { 
          factor: 'Generic Risk Factor 1', 
          score: 0.5, 
          description: 'Description of risk factor 1.'
        },
        { 
          factor: 'Generic Risk Factor 2', 
          score: 0.5, 
          description: 'Description of risk factor 2.'
        },
        { 
          factor: 'Generic Risk Factor 3', 
          score: 0.5, 
          description: 'Description of risk factor 3.'
        },
      ],
      recommendations: [
        'Generic recommendation 1',
        'Generic recommendation 2',
        'Generic recommendation 3',
        'Generic recommendation 4',
      ],
    };
  }
};

export const fetchAQIData = async (location: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Mock AQI data based on location
  if (location.toLowerCase().includes('delhi')) {
    return {
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
        timestamp: new Date().toISOString(),
      },
      forecast: [
        { timestamp: new Date(Date.now() + 3600000 * 0).toISOString(), aqi: 185 },
        { timestamp: new Date(Date.now() + 3600000 * 3).toISOString(), aqi: 190 },
        { timestamp: new Date(Date.now() + 3600000 * 6).toISOString(), aqi: 200 },
        { timestamp: new Date(Date.now() + 3600000 * 9).toISOString(), aqi: 178 },
        { timestamp: new Date(Date.now() + 3600000 * 12).toISOString(), aqi: 168 },
        { timestamp: new Date(Date.now() + 3600000 * 15).toISOString(), aqi: 155 },
        { timestamp: new Date(Date.now() + 3600000 * 18).toISOString(), aqi: 145 },
        { timestamp: new Date(Date.now() + 3600000 * 21).toISOString(), aqi: 160 },
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
  } else if (location.toLowerCase().includes('bangalore') || location.toLowerCase().includes('bengaluru')) {
    return {
      location: 'Bangalore, India',
      current: {
        aqi: 68,
        category: 'Moderate',
        pollutants: {
          pm25: 35,
          pm10: 68,
          o3: 30,
          no2: 22,
          so2: 8,
          co: 6,
        },
        timestamp: new Date().toISOString(),
      },
      forecast: [
        { timestamp: new Date(Date.now() + 3600000 * 0).toISOString(), aqi: 68 },
        { timestamp: new Date(Date.now() + 3600000 * 3).toISOString(), aqi: 72 },
        { timestamp: new Date(Date.now() + 3600000 * 6).toISOString(), aqi: 75 },
        { timestamp: new Date(Date.now() + 3600000 * 9).toISOString(), aqi: 70 },
        { timestamp: new Date(Date.now() + 3600000 * 12).toISOString(), aqi: 65 },
        { timestamp: new Date(Date.now() + 3600000 * 15).toISOString(), aqi: 60 },
        { timestamp: new Date(Date.now() + 3600000 * 18).toISOString(), aqi: 58 },
        { timestamp: new Date(Date.now() + 3600000 * 21).toISOString(), aqi: 62 },
      ],
      health: {
        generalPopulation: 'Air quality is acceptable, but there may be a health concern for a small number of people who are unusually sensitive to air pollution.',
        sensitiveGroups: 'People with respiratory or heart conditions should consider reducing prolonged or heavy exertion.',
        healthRisks: {
          respiratory: 'moderate',
          cardiovascular: 'low',
          eyeIrritation: 'low',
        },
      },
      recommendations: {
        outdoor: [
          'Most people can continue outdoor activities normally',
          'Consider reducing prolonged or heavy exertion if you experience symptoms',
          'Morning walks and outdoor exercises are generally safe',
        ],
        indoor: [
          'Regular ventilation is recommended',
          'Using air purifiers can help further improve indoor air quality',
          'Regular cleaning helps reduce dust accumulation',
        ],
        protection: [
          'Usually no special precautions needed for most people',
          'Sensitive individuals should keep any necessary medication handy',
          'Monitor your body's response during outdoor activities',
        ],
      },
      weather: {
        temperature: 24,
        humidity: 70,
        windSpeed: 12,
        windDirection: 'SW',
        conditions: 'Mostly Sunny',
      },
    };
  } else {
    // Default AQI data
    return {
      location: location || 'Unknown Location',
      current: {
        aqi: 100,
        category: 'Moderate',
        pollutants: {
          pm25: 50,
          pm10: 80,
          o3: 35,
          no2: 30,
          so2: 10,
          co: 8,
        },
        timestamp: new Date().toISOString(),
      },
      forecast: [
        { timestamp: new Date(Date.now() + 3600000 * 0).toISOString(), aqi: 100 },
        { timestamp: new Date(Date.now() + 3600000 * 3).toISOString(), aqi: 105 },
        { timestamp: new Date(Date.now() + 3600000 * 6).toISOString(), aqi: 110 },
        { timestamp: new Date(Date.now() + 3600000 * 9).toISOString(), aqi: 102 },
        { timestamp: new Date(Date.now() + 3600000 * 12).toISOString(), aqi: 95 },
        { timestamp: new Date(Date.now() + 3600000 * 15).toISOString(), aqi: 90 },
        { timestamp: new Date(Date.now() + 3600000 * 18).toISOString(), aqi: 88 },
        { timestamp: new Date(Date.now() + 3600000 * 21).toISOString(), aqi: 93 },
      ],
      health: {
        generalPopulation: 'Air quality is acceptable, but there may be a health concern for a small number of people who are unusually sensitive to air pollution.',
        sensitiveGroups: 'People with respiratory or heart conditions should consider reducing prolonged or heavy exertion.',
        healthRisks: {
          respiratory: 'moderate',
          cardiovascular: 'low',
          eyeIrritation: 'moderate',
        },
      },
      recommendations: {
        outdoor: [
          'Most people can continue outdoor activities normally',
          'Consider reducing prolonged or heavy exertion if you experience symptoms',
          'Avoid heavily polluted or high-traffic areas when possible',
        ],
        indoor: [
          'Regular ventilation is recommended',
          'Using air purifiers can help further improve indoor air quality',
          'Regular cleaning helps reduce dust accumulation',
        ],
        protection: [
          'Usually no special precautions needed for most people',
          'Sensitive individuals should keep any necessary medication handy',
          'Monitor your body's response during outdoor activities',
        ],
      },
      weather: {
        temperature: 28,
        humidity: 60,
        windSpeed: 10,
        windDirection: 'NE',
        conditions: 'Partly Cloudy',
      },
    };
  }
};

export const fetchLeaderboardData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock leaderboard data
  const mockCities = [
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
  
  return mockCities;
};
