"use client";

import { motion } from "motion/react";
import { SeasonalSectionDecorator } from "./ui/section-seasonal-decorator";
// import { useSectionTheme } from "./ui/section-theme-transition/theme-context";

interface SectionHeaderProps {
  title: string;
  number: string;
  showViewToggle?: boolean;
  viewMode?: "timeline" | "simple";
  onViewModeChange?: (mode: "timeline" | "simple") => void;
}

export default function SectionHeader({ 
  title, 
  number, 
  showViewToggle = false, 
  viewMode = "timeline", 
  onViewModeChange 
}: SectionHeaderProps) {
  
  // const { currentTheme } = useSectionTheme();
  
  const toggleViewMode = () => {
    if (onViewModeChange) {
      onViewModeChange(viewMode === "timeline" ? "simple" : "timeline");
    }
  };

  return (
    <div className="flex items-baseline mb-12 relative justify-between">
      <div className="flex items-baseline">
        <motion.h2
          className="text-5xl font-bold relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {title}
          {title === "About Me" && <span className="text-2xl ml-2 opacity-80">🌸</span>}
          {title === "Career" && <span className="text-2xl ml-2 opacity-80">☀️</span>}
          {title === "Projects" && <span className="text-2xl ml-2 opacity-80">🍂</span>}
          {title === "Skills" && <span className="text-2xl ml-2 opacity-80">❄️</span>}
        </motion.h2>
        
        <motion.span
          className="text-lg text-neutral-500 dark:text-neutral-400 ml-4 opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {number}
        </motion.span>
      </div>
      
      {/* Seasonal decorations */}
      <SeasonalSectionDecorator />
      
      {/* View mode toggle */}
      {showViewToggle && onViewModeChange && (
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${viewMode === 'simple' ? 'font-semibold text-black dark:text-white' : 'text-neutral-500'}`}>
            Simple
          </span>
          <button
            onClick={toggleViewMode}
            className="relative inline-flex h-6 w-12 items-center rounded-full bg-neutral-300 dark:bg-neutral-700 transition-colors duration-300"
          >
            <span
              className={`${
                viewMode === "timeline" ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white dark:bg-black transition-transform duration-300`}
            />
          </button>
          <span className={`text-sm ${viewMode === 'timeline' ? 'font-semibold text-black dark:text-white' : 'text-neutral-500'}`}>
            Timeline
          </span>
        </div>
      )}
      
      <motion.div
        className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r"
        style={{ 
          backgroundImage: `linear-gradient(to right, ${
            title === "About Me" ? "var(--pink-500), var(--rose-500)" :
            title === "Career" ? "var(--amber-500), var(--yellow-500)" :
            title === "Projects" ? "var(--orange-500), var(--red-500)" :
            "var(--sky-500), var(--blue-500)"
          })`
        }}
        initial={{ width: 0 }}
        whileInView={{ width: "4rem" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
    </div>
  );
}