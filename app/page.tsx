/* eslint-disable react/no-unescaped-entities */
import { ModeToggle } from "@/components/themeToggle";
import { SectionThemeProvider } from "@/components/ui/section-theme-transition/theme-context";
import HeroSection from "@/components/sections/Hero/HeroSection";
import About from "@/components/sections/About/About";
import Career from "@/components/sections/About/Career";
import Projects from "@/components/sections/Projects/Projects";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
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
              {/* About Section */}
              <About />

              {/* Career Section - Timeline View */}
              <Career />

              {/* Projects Section */}
              <Projects />

              {/* Contact Section */}
              <Contact />

              {/* Footer */}
              <Footer />
            </div>
          </div>
        </div>
      </SectionThemeProvider>
    </div>
  );
}
