
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Globe, 
  BarChart3, 
  Wind, 
  Trophy, 
  Menu, 
  X,
  AlertTriangle,
  AlertCircle
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isHomepage = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navItems = [
    { name: "Disasters", path: "/disasters", icon: <AlertTriangle className="w-5 h-5" /> },
    { name: "Prediction", path: "/prediction", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "AQI", path: "/aqi", icon: <Wind className="w-5 h-5" /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <Trophy className="w-5 h-5" /> },
  ];
  
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    })
  };
  
  const shouldShowBackground = scrollPosition > 50 || !isHomepage;
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowBackground 
          ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm border-b border-white/20 dark:border-slate-800/50"
          : ""
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold tracking-tight"
          >
            <AlertCircle className="w-7 h-7 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              EcoDisasterScan
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={variants}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-6 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-primary/5"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
