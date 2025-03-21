
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme") as Theme;
    
    // Then check system preference
    if (!savedTheme) {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemPreference ? "dark" : "light";
    }
    
    return savedTheme;
  });
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Save theme to localStorage
    localStorage.setItem("theme", theme);
    
    // Remove the old theme class and add the new one
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
