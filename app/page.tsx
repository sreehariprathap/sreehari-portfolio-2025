import Hero from "@/components/Hero";
import { ModeToggle } from "@/components/themeToggle";
import SectionHeader from "@/components/SectionHeader";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { projects, skillsCategories } from "./constants/constants";
import { SectionThemeProvider } from "@/components/ui/section-theme-transition/theme-context";
import { ThemedSection } from "@/components/ui/section-theme-transition/themed-section";
import { CareerTimeline } from "@/components/ui/CareerTimeline";
import { DotBackground } from "@/components/ui/dotBackground";

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
          <div className="lg:w-1/2 h-screen lg:sticky top-0 left-0 overflow-hidden">
            <HeroHighlight>
              <Hero />
            </HeroHighlight>
          </div>
          
          {/* Scrollable Content - Right 50% */}
          <div className="w-full lg:w-1/2 relative">
            <div 
              className="relative z-10 min-h-screen divide-y divide-neutral-200 dark:divide-neutral-800"
            >
              {/* About Section */}
              <ThemedSection id="about">
                <div className="max-w-6xl mx-auto pb-20">
                  <div className="max-w-3xl mx-auto mb-12">
                    <SectionHeader title="About Me" number="01" />
                  </div>
                  
                  <div className="bg-white dark:bg-black backdrop-blur-sm rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Bio Content - left side */}
                      <div className="md:w-2/3 p-6 md:p-8 lg:p-10">
                        <h3 className="text-2xl font-bold mb-4">Hi there, I'm Sreehari Prathap</h3>
                        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                          I'm a full-stack developer based in Canada, passionate about building beautiful, 
                          functional, and user-friendly applications. With experience in 
                          various technologies, I love solving complex problems and turning ideas into reality.
                        </p>
                        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
                          I'm currently pursuing AI and Machine Learning at Conestoga College, 
                          exploring the exciting intersection of traditional web development and artificial intelligence.
                          My goal is to create intelligent applications that not only look good but also learn and adapt.
                        </p>
                        
                        {/* Skills Categories */}
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3">My Expertise</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skillsCategories.slice(0, 4).map((category, idx) => (
                              <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-4 border border-neutral-100 dark:border-neutral-800">
                                <h5 className="font-medium mb-2 text-neutral-800 dark:text-neutral-200">{category.category}</h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {category.skills.slice(0, 3).map((skill, i) => (
                                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-purple-100/50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                                      {skill.name}
                                    </span>
                                  ))}
                                  {category.skills.length > 3 && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                                      +{category.skills.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-semibold mb-3">When I&apos;m Not Coding</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100/50 dark:bg-blue-900/30 rounded-full text-sm text-blue-800 dark:text-blue-200">AI/ML</span>
                          <span className="px-3 py-1 bg-purple-100/50 dark:bg-purple-900/30 rounded-full text-sm text-purple-800 dark:text-purple-200">UI/UX</span>
                          <span className="px-3 py-1 bg-green-100/50 dark:bg-green-900/30 rounded-full text-sm text-green-800 dark:text-green-200">Web Dev</span>
                          <span className="px-3 py-1 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-full text-sm text-yellow-800 dark:text-yellow-200">Cloud</span>
                          <span className="px-3 py-1 bg-red-100/50 dark:bg-red-900/30 rounded-full text-sm text-red-800 dark:text-red-200">Photography</span>
                          <span className="px-3 py-1 bg-indigo-100/50 dark:bg-indigo-900/30 rounded-full text-sm text-indigo-800 dark:text-indigo-200">Travel</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ThemedSection>
              
              {/* Career Section - Timeline View */}
              <ThemedSection id="career">
                <div className="max-w-6xl mx-auto">
                  <div className="max-w-3xl mx-auto mb-6">
                    {/* <SectionHeader title="Career Journey" number="02" /> */}
                  <CareerTimeline />
                  </div>
                </div>
              </ThemedSection>
              
              {/* Projects Section */}
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
              
              {/* Contact Section */}
              <ThemedSection id="contact">
                <div className="max-w-6xl mx-auto pb-20">
                  <div className="max-w-3xl mx-auto mb-12">
                    <SectionHeader title="Get In Touch" number="04" />
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 lg:p-10">
                    <h3 className="text-2xl font-bold mb-6 text-center">Let's Connect!</h3>
                    <p className="text-center mb-8 max-w-lg mx-auto text-neutral-700 dark:text-neutral-300">
                      I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                      <a 
                        href="mailto:sreehariprathap@gmail.com"
                        className="flex items-center gap-2 px-5 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email Me
                      </a>
                      <a 
                        href="https://linkedin.com/in/sreehari-prathap"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                      </a>
                      <a 
                        href="https://github.com/sreehariprathap"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </ThemedSection>
              
              {/* Footer */}
              <footer className="py-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
                <p>© {new Date().getFullYear()} Sreehari Prathap. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </div>
      </SectionThemeProvider>
    </div>
  );
}
