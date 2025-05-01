/* eslint-disable react/no-unescaped-entities */
"use client";

import SectionHeader from "@/components/SectionHeader";
import React from "react";
import { ThemedSection } from "@/components/ui/section-theme-transition/themed-section";
import { Bike, Book, ChartBarIncreasing, Cloud, Code, CookieIcon, Dumbbell, FilmIcon, FlaskConical, MapPin, Paintbrush } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

// Memoize the component to prevent unnecessary re-renders
export default React.memo(function About() {
  return (
    <ThemedSection id="about">
      <div className="max-w-6xl mx-auto pb-20">
        <div className="max-w-3xl mx-auto mb-12">
          <SectionHeader title="About Me" number="01" />
        </div>

        <div className="bg-white dark:bg-black backdrop-blur-sm rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Bio Content - left side */}
            <div className="p-10 relative z-10 overflow-visible">
              <div className="mb-4 text-neutral-700 dark:text-neutral-300">
                Just your average tech-obsessed <span className="font-semibold text-purple-600 dark:text-purple-400">90s Kid</span> who watched the internet evolve from dial-up screeches to whatever TikTok is today—all from a tiny village in{" "}
                <span className="inline-block relative z-20">
                    <LinkPreview
                      url="https://en.wikipedia.org/wiki/Kerala"
                      isStatic={true}
                      imageSrc="/KERALA.jpg"
                      width={300}
                      height={200}
                      className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline decoration-dotted underline-offset-2 decoration-emerald-400/50 hover:decoration-emerald-500 inline"
                    >
                      <span className="inline">Kerala</span>
                    </LinkPreview>
                </span>{" "}
                (that's God's own country, if you didn't know). Armed with an Engineering degree and enough diplomas in Computer Applications, AI, and ML to wallpaper a small room.
              </div>

              <p className="mb-6 text-neutral-700 dark:text-neutral-300">
                Spent 4 years as a <span className="font-semibold text-purple-600 dark:text-purple-400">Software Developer</span> bouncing between corporate giants and startups—basically I've seen both organized chaos and just plain chaos. Currently freezing my keyboard fingers off in the Great White North ({" "}
                <span className="inline-block relative z-20">
                    <LinkPreview
                      url="https://en.wikipedia.org/wiki/Canada"
                      isStatic={true}
                      imageSrc="/canadian-flag-day-1200x834.jpg"
                      width={300}
                      height={200}
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-dotted underline-offset-2 decoration-blue-400/50 hover:decoration-blue-500 inline"
                    >
                      <span className="inline">Canada</span>
                    </LinkPreview>
                </span>{" "}
                ), where the maple syrup flows and so does my code. On a mission to build cool tech while secretly hoping it doesn't become sentient.
              </p>

              {/* Location chip with optimized hover effect */}
              <div className="mb-4 flex items-center">
                <LinkPreview
                  url="https://en.wikipedia.org/wiki/Waterloo,_Ontario"
                  isStatic={true}
                  imageSrc="/waterloo-strategic-location-map-layout.jpg"
                  width={300}
                  height={200}
                >
                  <div 
                    className="group relative px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full overflow-hidden transition-all duration-200 hover:shadow-md dark:shadow-md"
                  >
                    <div className="relative z-10 flex items-center gap-1.5">
                      <span className="text-blue-800 dark:text-blue-300 group-hover:text-white dark:group-hover:text-white transition-colors duration-200">
                        <MapPin size={16} />
                      </span>
                      <span className="text-sm font-medium group-hover:text-white dark:group-hover:text-white transition-colors duration-200">
                        Waterloo, Ontario
                      </span>
                    </div>
                    {/* Optimized gradient with reduced transition time */}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="absolute inset-0 bg-black opacity-0 dark:opacity-100 group-hover:opacity-0 transition-opacity duration-200"></span>
                  </div>
                </LinkPreview>
              </div>

              {/* Technical Expertise with optimized hover effects */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Technical Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {React.useMemo(() => [
                    { name: "Software Development", icon: <Code size={16} />, color: "from-violet-500 to-purple-500", bgLight: "bg-violet-100", textLight: "text-violet-800", bgDark: "dark:bg-violet-900/30", textDark: "dark:text-violet-300" },
                    { name: "UI/UX Design", icon: <Paintbrush size={16} />, color: "from-pink-500 to-rose-500", bgLight: "bg-pink-100", textLight: "text-pink-800", bgDark: "dark:bg-pink-900/30", textDark: "dark:text-pink-300" },
                    { name: "Software Testing", icon: <FlaskConical size={16} />, color: "from-amber-500 to-orange-500", bgLight: "bg-amber-100", textLight: "text-amber-800", bgDark: "dark:bg-amber-900/30", textDark: "dark:text-amber-300" },
                    { name: "Cloud", icon: <Cloud size={16} />, color: "from-cyan-500 to-blue-500", bgLight: "bg-cyan-100", textLight: "text-cyan-800", bgDark: "dark:bg-cyan-900/30", textDark: "dark:text-cyan-300" },
                    { name: "Finance", icon: <ChartBarIncreasing size={16} />, color: "from-emerald-500 to-green-500", bgLight: "bg-emerald-100", textLight: "text-emerald-800", bgDark: "dark:bg-emerald-900/30", textDark: "dark:text-emerald-300" }
                  ], []).map((expertise, i) => (
                    <div 
                      key={i} 
                      className={`group relative px-3 py-1 ${expertise.bgLight} ${expertise.bgDark} ${expertise.textLight} ${expertise.textDark} rounded-full overflow-hidden transition-colors duration-200 hover:shadow-md dark:shadow-md`}
                    >
                      <div className="relative z-10 flex items-center gap-1.5">
                        <span className={`${expertise.textLight} ${expertise.textDark} group-hover:text-white dark:group-hover:text-white transition-colors duration-200`}>
                          {expertise.icon}
                        </span>
                        <span className="text-sm font-medium group-hover:text-white dark:group-hover:text-white transition-colors duration-200">
                          {expertise.name}
                        </span>
                      </div>
                      {/* Simplified gradient transition */}
                      <span className={`absolute inset-0 bg-gradient-to-r ${expertise.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></span>
                      <span className="absolute inset-0 bg-black opacity-0 dark:opacity-100 group-hover:opacity-0 transition-opacity duration-200"></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hobbies with optimized hover effects */}
              <h4 className="text-lg font-semibold mb-3">When I&apos;m Not Coding</h4>
              <div className="flex flex-wrap gap-2">
                {React.useMemo(() => [
                  { name: "Movies", icon: <FilmIcon size={16} />, color: "from-red-500 to-pink-500", bgLight: "bg-red-100", textLight: "text-red-800", bgDark: "dark:bg-red-900/30", textDark: "dark:text-red-300" },
                  { name: "Cooking", icon: <CookieIcon size={16} />, color: "from-amber-500 to-yellow-500", bgLight: "bg-amber-100", textLight: "text-amber-800", bgDark: "dark:bg-amber-900/30", textDark: "dark:text-amber-300" },
                  { name: "Gym", icon: <Dumbbell size={16} />, color: "from-indigo-500 to-blue-500", bgLight: "bg-indigo-100", textLight: "text-indigo-800", bgDark: "dark:bg-indigo-900/30", textDark: "dark:text-indigo-300" },
                  { name: "Cycling", icon: <Bike size={16} />, color: "from-teal-500 to-cyan-500", bgLight: "bg-teal-100", textLight: "text-teal-800", bgDark: "dark:bg-teal-900/30", textDark: "dark:text-teal-300" },
                  { name: "Reading", icon: <Book size={16} />, color: "from-purple-500 to-violet-500", bgLight: "bg-purple-100", textLight: "text-purple-800", bgDark: "dark:bg-purple-900/30", textDark: "dark:text-purple-300" }
                ], []).map((hobby, i) => (
                  <div 
                    key={i} 
                    className={`group relative px-3 py-1 ${hobby.bgLight} ${hobby.bgDark} rounded-full overflow-hidden ${hobby.textLight} ${hobby.textDark} transition-colors duration-200 hover:shadow-md dark:shadow-md`}>
                    <div className="relative z-10 flex items-center gap-1.5">
                      <span className={`${hobby.textLight} ${hobby.textDark} group-hover:text-white dark:group-hover:text-white transition-colors duration-200`}>
                        {hobby.icon}
                      </span>
                      <span className="text-sm font-medium group-hover:text-white dark:group-hover:text-white transition-colors duration-200">
                        {hobby.name}
                      </span>
                    </div>
                    {/* Simplified gradient transition */}
                    <span className={`absolute inset-0 bg-gradient-to-r ${hobby.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></span>
                    <span className="absolute inset-0 bg-black opacity-0 dark:opacity-100 group-hover:opacity-0 transition-opacity duration-200"></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemedSection>
  );
})