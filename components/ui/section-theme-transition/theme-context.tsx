"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

type SectionTheme = {
  id: string;
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
    backgroundColor: 'bg-indigo-50/90 dark:bg-indigo-950/90',
    textColor: 'text-indigo-900 dark:text-indigo-100',
    accentColor: 'bg-indigo-500',
    heroAccent: 'from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-900',
    lightPattern: 'radial-gradient(circle at 10% 20%, rgba(199, 210, 254, 0.6) 0%, rgba(224, 231, 255, 0.8) 90%)',
    darkPattern: 'radial-gradient(circle at 10% 20%, rgba(49, 46, 129, 0.6) 0%, rgba(79, 70, 229, 0.3) 90%)',
  },
  career: {
    id: 'career',
    backgroundColor: 'bg-blue-50/90 dark:bg-blue-950/90',
    textColor: 'text-blue-900 dark:text-blue-100',
    accentColor: 'bg-blue-500',
    heroAccent: 'from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900',
    lightPattern: 'radial-gradient(circle at 10% 20%, rgba(191, 219, 254, 0.6) 0%, rgba(219, 234, 254, 0.8) 90%)',
    darkPattern: 'radial-gradient(circle at 10% 20%, rgba(30, 58, 138, 0.6) 0%, rgba(29, 78, 216, 0.3) 90%)',
  },
  education: {
    id: 'education',
    backgroundColor: 'bg-purple-50/90 dark:bg-purple-950/90',
    textColor: 'text-purple-900 dark:text-purple-100',
    accentColor: 'bg-purple-500',
    heroAccent: 'from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-900',
    lightPattern: 'radial-gradient(circle at 10% 20%, rgba(233, 213, 255, 0.6) 0%, rgba(243, 232, 255, 0.8) 90%)',
    darkPattern: 'radial-gradient(circle at 10% 20%, rgba(88, 28, 135, 0.6) 0%, rgba(107, 33, 168, 0.3) 90%)',
  },
  projects: {
    id: 'projects',
    backgroundColor: 'bg-green-50/90 dark:bg-green-950/90',
    textColor: 'text-green-900 dark:text-green-100',
    accentColor: 'bg-green-500',
    heroAccent: 'from-green-500 to-green-700 dark:from-green-600 dark:to-green-900',
    lightPattern: 'radial-gradient(circle at 10% 20%, rgba(187, 247, 208, 0.6) 0%, rgba(220, 252, 231, 0.8) 90%)',
    darkPattern: 'radial-gradient(circle at 10% 20%, rgba(6, 78, 59, 0.6) 0%, rgba(20, 83, 45, 0.3) 90%)',
  },
  skills: {
    id: 'skills',
    backgroundColor: 'bg-amber-50/90 dark:bg-amber-950/90',
    textColor: 'text-amber-900 dark:text-amber-100',
    accentColor: 'bg-amber-500',
    heroAccent: 'from-amber-500 to-amber-700 dark:from-amber-600 dark:to-amber-900',
    lightPattern: 'radial-gradient(circle at 10% 20%, rgba(254, 243, 199, 0.6) 0%, rgba(254, 249, 195, 0.8) 90%)',
    darkPattern: 'radial-gradient(circle at 10% 20%, rgba(146, 64, 14, 0.6) 0%, rgba(120, 53, 15, 0.3) 90%)',
  },
};

type ThemeContextType = {
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentTheme: SectionTheme;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
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
      
      // Notify any observers about theme change (for hero section)
      const event = new CustomEvent('themechange', { 
        detail: { 
          section: activeSection,
          theme: theme,
          isDarkMode
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