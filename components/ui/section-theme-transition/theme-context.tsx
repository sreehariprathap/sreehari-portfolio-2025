"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

type SectionTheme = {
  id: string;
  name: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  heroAccent: string;
  lightPattern: string;
  darkPattern: string;
};

const sectionThemes: Record<string, SectionTheme> = {
  about: {
    id: 'about',
    name: 'Spring',
    season: 'spring',
    backgroundColor: 'bg-pink-50/90 dark:bg-pink-950/90',
    textColor: 'text-pink-900 dark:text-pink-100',
    accentColor: 'bg-pink-500',
    heroAccent: 'from-pink-400 to-rose-600 dark:from-pink-600 dark:to-rose-800',
    lightPattern: 'radial-gradient(circle at 10% 20%, rgba(251, 207, 232, 0.6) 0%, rgba(253, 242, 248, 0.8) 90%)',
    darkPattern: 'radial-gradient(circle at 10% 20%, rgba(157, 23, 77, 0.6) 0%, rgba(131, 24, 67, 0.3) 90%)',
  },
  career: {
    id: 'career',
    name: 'Summer',
    season: 'summer',
    backgroundColor: 'bg-yellow-50/90 dark:bg-yellow-950/90',
    textColor: 'text-yellow-900 dark:text-yellow-100',
    accentColor: 'bg-yellow-500',
    heroAccent: 'from-yellow-400 to-amber-600 dark:from-yellow-600 dark:to-amber-700',
    lightPattern: 'radial-gradient(circle at 10% 20%, rgba(254, 240, 138, 0.6) 0%, rgba(253, 246, 178, 0.8) 90%)',
    darkPattern: 'radial-gradient(circle at 10% 20%, rgba(161, 98, 7, 0.6) 0%, rgba(133, 77, 14, 0.3) 90%)',
  },
  projects: {
    id: 'projects',
    name: 'Fall',
    season: 'fall',
    backgroundColor: 'bg-orange-50/90 dark:bg-orange-950/90',
    textColor: 'text-orange-900 dark:text-orange-100',
    accentColor: 'bg-orange-500',
    heroAccent: 'from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700',
    lightPattern: 'radial-gradient(circle at 10% 20%, rgba(253, 230, 138, 0.6) 0%, rgba(251, 211, 141, 0.8) 90%)',
    darkPattern: 'radial-gradient(circle at 10% 20%, rgba(154, 52, 18, 0.6) 0%, rgba(124, 45, 18, 0.3) 90%)',
  },
  skills: {
    id: 'skills',
    name: 'Winter',
    season: 'winter',
    backgroundColor: 'bg-sky-50/90 dark:bg-sky-950/90',
    textColor: 'text-sky-900 dark:text-sky-100',
    accentColor: 'bg-sky-500',
    heroAccent: 'from-sky-400 to-blue-600 dark:from-sky-600 dark:to-blue-800',
    lightPattern: 'radial-gradient(circle at 10% 20%, rgba(224, 242, 254, 0.6) 0%, rgba(240, 249, 255, 0.9) 95%)',
    darkPattern: 'radial-gradient(circle at 10% 20%, rgba(7, 89, 133, 0.6) 0%, rgba(12, 74, 110, 0.3) 90%)',
  },
};

type ThemeContextType = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentTheme: SectionTheme;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
};

const ThemeContext = createContext<ThemeContextType>({
  activeSection: 'about',
  setActiveSection: () => {},
  currentTheme: sectionThemes.about,
  scrollContainerRef: { current: null },
  progress: 0,
});

export const useSectionTheme = () => useContext(ThemeContext);

export const SectionThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [currentTheme, setCurrentTheme] = useState<SectionTheme>(sectionThemes.about);
  const [progress, setProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  // Update the theme when the active section changes
  useEffect(() => {
    const theme = sectionThemes[activeSection] || sectionThemes.about;
    
    // Add a smooth transition effect
    document.documentElement.classList.add('transition-all', 'duration-700');
    
    // Apply the theme
    setCurrentTheme(theme);
    
    // Apply theme to the hero section and adjust dot pattern based on dark/light mode
    const applyTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      const pattern = isDarkMode ? theme.darkPattern : theme.lightPattern;
      
      // Body background pattern
      document.body.style.backgroundImage = pattern;
      
      // Update data attributes for seasonal styling
      document.documentElement.setAttribute('data-season', theme.season);
      
      // Notify any observers about theme change (for hero section)
      const event = new CustomEvent('themechange', { 
        detail: { 
          section: activeSection,
          theme: theme,
          isDarkMode,
          season: theme.season
        } 
      });
      document.dispatchEvent(event);
    };
    
    applyTheme();
    
    // Re-apply theme when dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          applyTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, [activeSection]);

  return (
    <ThemeContext.Provider value={{ 
      activeSection, 
      setActiveSection, 
      currentTheme,
      scrollContainerRef,
      progress 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const SectionObserver = ({ sectionId }: { sectionId: string }) => {
  const { setActiveSection } = useSectionTheme();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      },
      { threshold: 0.4 } // When 40% of the section is visible
    );
    
    const section = document.getElementById(sectionId);
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [sectionId, setActiveSection]);
  
  return null;
};