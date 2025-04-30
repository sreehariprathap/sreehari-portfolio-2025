"use client";

import { FollowerPointerCard } from "./ui/following-pointer";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  items: string[];
}

export default function PortfolioNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const sections: Section[] = [
    {
      id: "about",
      title: "About Me",
      icon: "👨‍💻",
      color: "from-blue-400 to-blue-600",
      description: "Get to know me and my journey in tech",
      items: ["Background", "Interests", "Hobbies", "Life Philosophy"]
    },
    {
      id: "career",
      title: "Career",
      icon: "💼",
      color: "from-purple-400 to-purple-600",
      description: "My professional journey and experiences",
      items: ["Work Experience", "Achievements", "Positions", "Companies"]
    },
    {
      id: "education",
      title: "Education",
      icon: "🎓",
      color: "from-green-400 to-green-600",
      description: "Academic qualifications and learning path",
      items: ["Degrees", "Certifications", "Courses", "Self-Learning"]
    },
    {
      id: "projects",
      title: "Projects",
      icon: "🚀",
      color: "from-yellow-400 to-yellow-600",
      description: "Showcasing my key technical projects",
      items: ["Web Apps", "Mobile Apps", "Backend Systems", "Open Source"]
    },
    {
      id: "skills",
      title: "Skills",
      icon: "⚡",
      color: "from-red-400 to-red-600",
      description: "Technical and soft skills in my toolkit",
      items: ["Languages", "Frameworks", "Tools", "Soft Skills"]
    },
  ];

  const handleSectionHover = (id: string) => {
    setActiveSection(id);
  };

  const handleSectionLeave = () => {
    setActiveSection(null);
  };
  
  const handleSectionClick = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="w-full md:max-w-md lg:max-w-lg">
      <motion.h3 
        className="text-2xl font-bold mb-4 dark:text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Portfolio
      </motion.h3>
      <div className="grid grid-cols-1 gap-4">
        {sections.map((section, index) => (
          <SectionCard
            key={section.id}
            section={section}
            isActive={activeSection === section.id}
            isExpanded={expandedSection === section.id}
            onHover={handleSectionHover}
            onLeave={handleSectionLeave}
            onClick={handleSectionClick}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

const SectionCard = ({
  section,
  isActive,
  isExpanded,
  onHover,
  onLeave,
  onClick,
  index,
}: {
  section: Section;
  isActive: boolean;
  isExpanded: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onClick: (id: string) => void;
  index: number;
}) => {
  return (
    <FollowerPointerCard title={`View ${section.title}`}>
      <motion.div
        className={cn(
          "group relative rounded-xl border border-neutral-200 bg-white shadow-lg transition-all dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden",
          isActive && "border-transparent",
          isExpanded ? "p-5" : "p-4"
        )}
        onMouseEnter={() => onHover(section.id)}
        onMouseLeave={onLeave}
        onClick={() => onClick(section.id)}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: index * 0.1 
        }}
      >
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-3">
            <motion.div 
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white",
                section.color
              )}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <span className="text-xl">{section.icon}</span>
            </motion.div>
            <div>
              <h4 className="text-xl font-medium text-neutral-900 dark:text-white">
                {section.title}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {section.description}
              </p>
            </div>
          </div>
          <motion.div
            className="rounded-full bg-neutral-100 p-2 dark:bg-neutral-800 cursor-pointer"
            whileHover={{ rotate: isExpanded ? -90 : 90 }}
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-600 dark:text-neutral-300"
            >
              {isExpanded ? (
                <>
                  <path d="M18 15l-6-6-6 6"/>
                </>
              ) : (
                <>
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </>
              )}
            </svg>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {section.items.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "p-2 rounded bg-opacity-10 flex items-center gap-2",
                      `bg-gradient-to-r ${section.color} bg-opacity-10`
                    )}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      section.color.split(' ')[1]
                    )}></div>
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button 
                className={cn(
                  "mt-4 px-4 py-2 rounded-lg text-white w-full text-center font-medium",
                  `bg-gradient-to-r ${section.color}`
                )}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View {section.title}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className={cn(
            "absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity bg-gradient-to-br",
            section.color
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.15 : 0 }}
        />
      </motion.div>
    </FollowerPointerCard>
  );
};