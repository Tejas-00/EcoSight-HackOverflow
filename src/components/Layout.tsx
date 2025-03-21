
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add initial loading animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const isHomepage = location.pathname === "/";
  
  return (
    <div className={`min-h-screen w-full transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Navigation />
      <main className={`w-full ${!isHomepage ? 'pt-16 h-[calc(100vh-64px)]' : 'h-screen'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
