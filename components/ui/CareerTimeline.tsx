/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useScroll,
  useTransform,
  motion
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { timelineData, getCombinedTimelineData } from "@/app/constants/constants";
import SectionHeader from "@/components/SectionHeader";

// Define types for timeline events
interface TimelineEvent {
  title: string;
  period: string;
  image?: string;
  description: string;
  skills?: string[];
  clients?: string[];
  isKeyEvent?: boolean;
  isLifeEvent?: boolean;
}


type ViewMode = "timeline" | "simple";
type SectionType = "experience" | "education";

export const CareerTimeline = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [activeSection, setActiveSection] = useState<SectionType>("experience");
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Get data based on view mode and section
  const combinedTimelineData = getCombinedTimelineData();
  const separatedData = timelineData[activeSection];

  // Use the appropriate data source based on view mode
  const currentData = viewMode === "timeline"
    ? combinedTimelineData
    : separatedData;

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, viewMode, activeSection, currentData]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);


  const getEventClassName = (event: TimelineEvent) => {
    if (event.isLifeEvent) {
      return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/50";
    }
    return "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800";
  };

  return (
    <div className="w-full bg-transparent font-sans" ref={containerRef}>
      <div className="relative max-w-7xl mx-auto pb-20">
        <SectionHeader
          title="Career"
          number="02"
          showViewToggle={true}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Section tabs only visible in Simple view */}
        {viewMode === "simple" && (
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => setActiveSection("experience")}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${activeSection === "experience"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-medium"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveSection("education")}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${activeSection === "education"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-medium"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                }`}
            >
              Education
            </button>
          </div>
        )}

        {/* Timeline/Simple View Content */}
        <div ref={ref} className="relative">
          {/* Year groups */}
          {currentData.map((yearGroup, yearIndex) => (
            <div key={yearIndex} className="mb-16 last:mb-0">
              <div className="flex">
                {/* Year marker on the left */}
                <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-24 md:w-32 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
                  </div>
                  <h3 className="mt-2 md:mt-0 md:pl-2 text-xl md:text-2xl font-bold text-neutral-500 dark:text-neutral-500">
                    {yearGroup.year}
                  </h3>
                </div>

                {/* Events for this year */}
                <div className="flex-grow">
                  {yearGroup.events.map((event: TimelineEvent, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`rounded-lg border p-5 shadow-sm hover:shadow-md transition-all duration-300 mb-8 last:mb-0 ${getEventClassName(event)}`}
                    >
                      <div className={`flex flex-col ${event.isKeyEvent && event.image ? "md:flex-row gap-6" : ""}`}>
                        {/* Event details */}
                        <div className={`flex-grow ${event.isKeyEvent && event.image ? "md:w-3/5" : "w-full"}`}>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-semibold text-black dark:text-white">
                                {event.title}
                              </h4>
                              <p className="text-sm font-medium text-neutral-500 mt-1 md:mt-0">
                                {event.period}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                            {event.description}
                          </p>

                          {event.clients && event.clients.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                Clients:
                              </p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {event.clients.map((client: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                  >
                                    {client}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {event.skills && event.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {event.skills.slice(0, 5).map((skill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                                >
                                  {skill}
                                </span>
                              ))}
                              {event.skills.length > 5 && (
                                <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                                  +{event.skills.length - 5} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Image on the right (only for key events) */}
                        {event.isKeyEvent && event.image && (
                          <div className="md:w-2/5 flex-shrink-0 h-40 md:h-48 mt-4 md:mt-0">
                            <div className="h-full w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                              <img
                                src={event.image}
                                alt={event.title}
                                className="h-full w-full object-contain p-4"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Timeline vertical line */}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute left-5 md:left-5 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};