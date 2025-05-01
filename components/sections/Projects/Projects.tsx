"use client";

import SectionHeader from "@/components/SectionHeader";
import { ThemedSection } from "@/components/ui/section-theme-transition/themed-section";
import { projects } from "@/app/constants/constants";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ExternalLink, Code, X } from "lucide-react";

export default function Projects() {
  // Filter and reorder projects to show only the 4 specific ones in the requested order
  const displayedProjects = React.useMemo(() => {
    // Find each specific project by name
    const burnlog = projects.find(p => p.name.includes("Burnlog"));
    const fluffnest = projects.find(p => p.name.includes("Fluffnest"));
    const lanify = projects.find(p => p.name.includes("Lanify"));
    const romedyflix = projects.find(p => p.name.includes("RomedyFlix"));
    
    // Return them in the specified order (filter out undefined in case any weren't found)
    return [burnlog, fluffnest, lanify, romedyflix].filter(Boolean);
  }, []);

  const [active, setActive] = useState<(typeof projects)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <ThemedSection id="projects">
      <div className="max-w-6xl mx-auto pb-20">
        <div className="max-w-3xl mx-auto mb-12">
          <SectionHeader title="Projects" number="03" />
        </div>

        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.button
                key={`button-close-${active.name}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.05 },
                }}
                className="flex absolute top-4 right-4 items-center justify-center bg-white dark:bg-neutral-800 rounded-full h-10 w-10 shadow-md"
                onClick={() => setActive(null)}
              >
                <X size={20} className="text-neutral-800 dark:text-neutral-200" />
              </motion.button>
              
              <motion.div
                layoutId={`card-${active.name}-${id}`}
                ref={ref}
                className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-xl"
              >
                <motion.div layoutId={`image-${active.name}-${id}`}>
                  <img
                    src={active.image}
                    alt={active.name}
                    className="w-full h-64 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                  />
                </motion.div>

                <div className="flex flex-col flex-1 overflow-hidden">
                  <div className="flex justify-between items-start p-4 md:p-6">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.name}-${id}`}
                        className="font-bold text-xl text-neutral-900 dark:text-neutral-100"
                      >
                        {active.name.split(' - ')[0]}
                      </motion.h3>
                      <motion.p
                        layoutId={`subtitle-${active.name}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-sm mt-1"
                      >
                        {active.name.split(' - ')[1] || ""}
                      </motion.p>
                    </div>

                    <div className="flex gap-2">
                      {active.code && (
                        <motion.a
                          layoutId={`code-${active.name}-${id}`}
                          href={active.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm rounded-full font-medium flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-800 hover:text-white text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors shadow-sm"
                        >
                          <Code size={14} />
                          Code
                        </motion.a>
                      )}
                      
                      {active.live && (
                        <motion.a
                          layoutId={`live-${active.name}-${id}`}
                          href={active.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm rounded-full font-medium flex items-center gap-1.5 bg-purple-100 hover:bg-purple-600 hover:text-white text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800 dark:hover:text-white transition-colors shadow-sm"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  <div className="px-4 md:px-6 pb-4 flex-1 overflow-hidden">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 overflow-y-auto max-h-[calc(100vh-400px)] md:max-h-[40vh] pr-2 pb-4 hide-scrollbar"
                    >
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
                        {active.description}
                      </p>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {active.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {active.isBuilding && (
                        <div className="mt-4 py-2 px-4 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-lg">
                          <p className="text-yellow-800 dark:text-yellow-300 text-sm flex items-center gap-2">
                            <span className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></span>
                            This project is currently in development
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-black/20 backdrop-blur-sm rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {displayedProjects.map((project) => {
              const projectName = project.name.split(' - ')[0];
              const projectTagline = project.name.split(' - ')[1] || "";
              
              return (
                <motion.li
                  layoutId={`card-${project.name}-${id}`}
                  key={`card-${project.name}-${id}`}
                  onClick={() => setActive(project)}
                  className="p-4 md:p-5 flex flex-col md:flex-row gap-4 md:gap-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer transition-colors"
                >
                  <motion.div 
                    layoutId={`image-${project.name}-${id}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-40 w-full md:w-40 md:h-28 rounded-lg object-cover object-center shadow-sm"
                    />
                  </motion.div>
                  
                  <div className="flex flex-col flex-1 justify-between">
                    <div className="mb-3 md:mb-0">
                      <motion.h3
                        layoutId={`title-${project.name}-${id}`}
                        className="font-bold text-lg text-neutral-900 dark:text-neutral-100"
                      >
                        {projectName}
                      </motion.h3>
                      <motion.p
                        layoutId={`subtitle-${project.name}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-sm mt-0.5"
                      >
                        {projectTagline}
                      </motion.p>
                      
                      <p className="text-neutral-700 dark:text-neutral-400 text-sm mt-2 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.skills.slice(0, 4).map((skill, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 4 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            +{project.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3 md:mt-0 md:justify-end">
                      {project.code && (
                        <motion.span
                          layoutId={`code-${project.name}-${id}`}
                          className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 flex items-center gap-1"
                        >
                          <Code size={12} />
                          Code
                        </motion.span>
                      )}
                      
                      {project.live && (
                        <motion.span
                          layoutId={`live-${project.name}-${id}`}
                          className="text-xs px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 flex items-center gap-1"
                        >
                          <ExternalLink size={12} />
                          Demo
                        </motion.span>
                      )}
                      
                      {project.isBuilding && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </ThemedSection>
  );
}