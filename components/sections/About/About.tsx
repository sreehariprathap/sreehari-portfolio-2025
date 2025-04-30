"use client";

import SectionHeader from "@/components/SectionHeader";
import React from "react";
import { ThemedSection } from "@/components/ui/section-theme-transition/themed-section";

export default function About() {
  return (
    <ThemedSection id="about">
      <div className="max-w-6xl mx-auto pb-20">
        <div className="max-w-3xl mx-auto mb-12">
          <SectionHeader title="About Me" number="01" />
        </div>

        <div className="bg-white dark:bg-black backdrop-blur-sm rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Bio Content - left side */}
            <div className="p-10">
              <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                Just your average tech-obsessed <span className="font-semibold text-purple-600 dark:text-purple-400">90s Kid</span> who watched the internet evolve from dial-up screeches to whatever TikTok is today—all from a tiny village in Kerala (that's God's own country, if you didn't know). Armed with an Engineering degree and enough diplomas in Computer Applications, AI, and ML to wallpaper a small room.
              </p>

              <p className="mb-6 text-neutral-700 dark:text-neutral-300">
                Spent 4 years as a <span className="font-semibold text-purple-600 dark:text-purple-400">Software Developer</span> bouncing between corporate giants and startups—basically I've seen both organized chaos and just plain chaos. Currently freezing my keyboard fingers off in the Great White North (<span className="font-semibold text-blue-600 dark:text-blue-400">Canada</span>), where the maple syrup flows and so does my code. On a mission to build cool tech while secretly hoping it doesn't become sentient.
              </p>

              {/* Location chip with hover effect */}
              <div className="mb-4 flex items-center">
                <div className="group relative inline-flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:shadow-md cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">Waterloo, Ontario</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </div>
              </div>

              {/* Technical Expertise with updated hover effect */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Technical Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Software Development", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    ), color: "from-violet-500 to-purple-500", bgLight: "bg-violet-100", textLight: "text-violet-800", bgDark: "dark:bg-violet-900/30", textDark: "dark:text-violet-300", intensity: "high" },
                    { name: "UI/UX Design", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    ), color: "from-pink-500 to-rose-500", bgLight: "bg-pink-100", textLight: "text-pink-800", bgDark: "dark:bg-pink-900/30", textDark: "dark:text-pink-300", intensity: "high" },
                    { name: "Software Testing", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    ), color: "from-amber-500 to-orange-500", bgLight: "bg-amber-100", textLight: "text-amber-800", bgDark: "dark:bg-amber-900/30", textDark: "dark:text-amber-300", intensity: "medium" },
                    { name: "Cloud", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    ), color: "from-cyan-500 to-blue-500", bgLight: "bg-cyan-100", textLight: "text-cyan-800", bgDark: "dark:bg-cyan-900/30", textDark: "dark:text-cyan-300", intensity: "medium" },
                    { name: "Finance", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    ), color: "from-emerald-500 to-green-500", bgLight: "bg-emerald-100", textLight: "text-emerald-800", bgDark: "dark:bg-emerald-900/30", textDark: "dark:text-emerald-300", intensity: "low" }
                  ].map((expertise, i) => (
                    <div 
                      key={i} 
                      className={`group relative px-3 py-1 ${expertise.bgLight} ${expertise.bgDark} ${expertise.textLight} ${expertise.textDark} rounded-full overflow-hidden transition-all duration-300 hover:shadow-md dark:shadow-md`}
                    >
                      <div className="relative z-10 flex items-center gap-1.5">
                        <span className="group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                          {expertise.icon}
                        </span>
                        <span className={`text-sm font-medium group-hover:text-white dark:group-hover:text-white transition-colors duration-300`}>
                          {expertise.name}
                        </span>
                      </div>
                      {/* Light mode: show shadow by default, show color on hover */}
                      <span className={`absolute inset-0 bg-gradient-to-r ${expertise.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md`}></span>
                      {/* Dark mode: solid black by default, show color on hover */}
                      <span className="absolute inset-0 bg-black opacity-0 dark:opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hobbies with updated hover effect */}
              <h4 className="text-lg font-semibold mb-3">When I&apos;m Not Coding</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Movies", icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  ), color: "from-red-500 to-pink-500", bgLight: "bg-red-100", textLight: "text-red-800", bgDark: "dark:bg-red-900/30", textDark: "dark:text-red-300", intensity: "high" },
                  { name: "Cooking", icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a4 4 0 00-4-4H8.8M12 8l-2.388-2.388M12 8l3.6-3.6M12 8a4 4 0 013.6 6.8M6.8 19.4A4 4 0 1012 16m0 0c-3.6-1.2-6-4.8-6-8.8 0-.6 0-1.2.1-1.6M12 16L8.8 19.4" />
                    </svg>
                  ), color: "from-amber-500 to-yellow-500", bgLight: "bg-amber-100", textLight: "text-amber-800", bgDark: "dark:bg-amber-900/30", textDark: "dark:text-amber-300", intensity: "high" },
                  { name: "Gym", icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  ), color: "from-indigo-500 to-blue-500", bgLight: "bg-indigo-100", textLight: "text-indigo-800", bgDark: "dark:bg-indigo-900/30", textDark: "dark:text-indigo-300", intensity: "medium" },
                  { name: "Cycling", icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  ), color: "from-teal-500 to-cyan-500", bgLight: "bg-teal-100", textLight: "text-teal-800", bgDark: "dark:bg-teal-900/30", textDark: "dark:text-teal-300", intensity: "medium" },
                  { name: "Reading", icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ), color: "from-purple-500 to-violet-500", bgLight: "bg-purple-100", textLight: "text-purple-800", bgDark: "dark:bg-purple-900/30", textDark: "dark:text-purple-300", intensity: "low" }
                ].map((hobby, i) => (
                  <div key={i} className={`group relative px-3 py-1 ${hobby.bgLight} ${hobby.bgDark} rounded-full overflow-hidden ${hobby.textLight} ${hobby.textDark} transition-all duration-300 hover:shadow-md dark:shadow-md`}>
                    <div className="relative z-10 flex items-center gap-1.5">
                      <span className="group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                        {hobby.icon}
                      </span>
                      <span className="text-sm font-medium group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                        {hobby.name}
                      </span>
                    </div>
                    {/* Light mode: show shadow by default, show color on hover */}
                    <span className={`absolute inset-0 bg-gradient-to-r ${hobby.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>
                    {/* Dark mode: solid black by default, show color on hover */}
                    <span className="absolute inset-0 bg-black opacity-0 dark:opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}