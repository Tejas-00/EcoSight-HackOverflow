
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, BarChart3, Wind, Trophy } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      heroRef.current.style.setProperty('--mouse-x', `${x * 20}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y * 20}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const features = [
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Real-time Disaster Tracking",
      description: "Monitor ongoing natural disasters worldwide with an interactive map.",
      link: "/disasters",
      color: "from-red-500 to-amber-500",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Disaster Prediction",
      description: "Forecast potential disasters based on historical data and ML models.",
      link: "/prediction",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Wind className="w-5 h-5" />,
      title: "Air Quality Monitoring",
      description: "Check real-time air quality data and health recommendations.",
      link: "/aqi",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: "City AQI Leaderboard",
      description: "See how Indian cities rank based on their air quality index.",
      link: "/leaderboard",
      color: "from-purple-500 to-pink-500",
    },
  ];
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-20"
      style={{
        backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-primary mb-4"
          >
            Advanced Ecological Monitoring System
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Track & Predict
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Environmental Disasters
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Monitor real-time disasters, predict environmental risks, and stay informed about air quality with our cutting-edge platform.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/disasters"
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-11 px-8 py-3 bg-primary text-white shadow-md hover:bg-primary/90 transition-all duration-200"
            >
              Explore Disasters
            </Link>
            <Link
              to="/prediction"
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-11 px-8 py-3 bg-white/90 border border-slate-200 shadow-sm hover:bg-white transition-all duration-200"
            >
              Try Prediction
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Link 
                to={feature.link}
                className="block h-full glass-card rounded-xl p-6 hover:shadow-elevated transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
