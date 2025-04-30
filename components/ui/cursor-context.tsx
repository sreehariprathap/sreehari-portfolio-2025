"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available sections and their cursor colors
export type SectionType = "default" | "about" | "career" | "projects" | "contact";

export interface SectionColor {
  sectionId: SectionType;
  color: string;
}

// Define section colors
export const sectionColors: SectionColor[] = [
  { sectionId: "default", color: "#0ea5e9" },  // Default blue
  { sectionId: "about", color: "#22c55e" },    // Green
  { sectionId: "career", color: "#8b5cf6" },   // Purple
  { sectionId: "projects", color: "#f59e0b" }, // Amber
  { sectionId: "contact", color: "#ef4444" }   // Red
];

interface CursorContextType {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  cursorColor: string;
}

const CursorContext = createContext<CursorContextType>({
  activeSection: "default",
  setActiveSection: () => {},
  cursorColor: sectionColors[0].color
});

export const useCursorContext = () => useContext(CursorContext);

export const CursorContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<SectionType>("default");
  const [cursorColor, setCursorColor] = useState<string>(sectionColors[0].color);

  // Set up intersection observer to detect which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id as SectionType;
            setActiveSection(sectionId);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Consider element in view when it's in the middle of the viewport
        threshold: 0.1
      }
    );

    // Observe all section elements
    const sections = document.querySelectorAll("section[id], div[id='about'], div[id='career'], div[id='projects'], div[id='contact']");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Update cursor color when active section changes
  useEffect(() => {
    const sectionColor = sectionColors.find((sc) => sc.sectionId === activeSection);
    if (sectionColor) {
      setCursorColor(sectionColor.color);
    } else {
      setCursorColor(sectionColors[0].color); // Default color
    }
  }, [activeSection]);

  return (
    <CursorContext.Provider value={{ activeSection, setActiveSection, cursorColor }}>
      {children}
    </CursorContext.Provider>
  );
};