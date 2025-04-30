"use client";

import SectionHeader from "@/components/SectionHeader";
import { ThemedSection } from "@/components/ui/section-theme-transition/themed-section";
import { projects } from "@/app/constants/constants";
import React from "react";

export default function Projects() {
  return (
    <ThemedSection id="projects">
      <div className="max-w-6xl mx-auto pb-20">
        <div className="max-w-3xl mx-auto mb-12">
          <SectionHeader title="Projects" number="03" />
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">{project.name}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Skills used */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      +{project.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex space-x-3">
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.isBuilding && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ThemedSection>
  );
}