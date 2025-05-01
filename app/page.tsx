'use client';
/* eslint-disable react/no-unescaped-entities */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { ModeToggle } from "@/components/themeToggle";
import { SectionThemeProvider } from "@/components/ui/section-theme-transition/theme-context";
import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/Hero/HeroSection";
import About from "@/components/sections/About/About";

// Lazy load components that aren't immediately visible
const Career = lazy(() => import("@/components/sections/About/Career"));
const Projects = lazy(() => import("@/components/sections/Projects/Projects"));
const Contact = lazy(() => import("@/components/sections/Contact/Contact"));
const Footer = lazy(() => import("@/components/sections/Footer"));

// Simple loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-8 h-8 border-4 border-neutral-300 border-t-neutral-800 rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  // Track which components are in viewport to optimize rendering
  const [visibleSections, setVisibleSections] = useState({
    career: false,
    projects: false,
    contact: false,
    footer: false
  });

  // Set up intersection observer to detect when sections come into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '100px 0px', // Start loading when within 100px of viewport
      threshold: 0.1, // Trigger when 10% of element is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
          // Once visible, no need to observe anymore
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe each section container
    ['career', 'projects', 'contact', 'footer'].forEach(id => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* Theme Toggle */}
      <div className="fixed top-5 right-5 z-50">
        <ModeToggle />
      </div>

      <SectionThemeProvider>
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Hero Section - Left 50% with enhanced highlight effect */}
          <HeroSection />

          {/* Scrollable Content - Right 50% */}
          <div className="w-full lg:w-1/2 relative">
            <div
              className="relative z-10 min-h-screen divide-y divide-neutral-200 dark:divide-neutral-800"
            >
              {/* About Section - Always render (above the fold) */}
              <About />

              {/* Career Section - Timeline View */}
              <div id="career">
                {visibleSections.career ? (
                  <Suspense fallback={<SectionLoader />}>
                    <Career />
                  </Suspense>
                ) : <SectionLoader />}
              </div>

              {/* Projects Section */}
              <div id="projects">
                {visibleSections.projects ? (
                  <Suspense fallback={<SectionLoader />}>
                    <Projects />
                  </Suspense>
                ) : <SectionLoader />}
              </div>

              {/* Contact Section */}
              <div id="contact">
                {visibleSections.contact ? (
                  <Suspense fallback={<SectionLoader />}>
                    <Contact />
                  </Suspense>
                ) : <SectionLoader />}
              </div>

              {/* Footer */}
              <div id="footer">
                {visibleSections.footer ? (
                  <Suspense fallback={<SectionLoader />}>
                    <Footer />
                  </Suspense>
                ) : <SectionLoader />}
              </div>
            </div>
          </div>
        </div>
      </SectionThemeProvider>
    </div>
  );
}
