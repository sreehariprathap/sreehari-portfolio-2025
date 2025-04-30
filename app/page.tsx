import Hero from "@/components/Hero";
import { ModeToggle } from "@/components/themeToggle";
import SectionHeader from "@/components/SectionHeader";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { projects, skillsCategories, experienceData, educationData } from "./constants/constants";
import { SectionThemeProvider } from "@/components/ui/section-theme-transition/theme-context";
import { ThemedSection } from "@/components/ui/section-theme-transition/themed-section";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Theme Toggle */}
      <div className="fixed top-5 right-5 z-50">
        <ModeToggle />
      </div>
      
      <SectionThemeProvider>
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Hero Section - Left 50% with HeroHighlight - Sticky */}
          <div className="lg:w-1/2 h-screen lg:sticky top-0 left-0">
            <HeroHighlight containerClassName="w-full h-full">
              <Hero />
            </HeroHighlight>
          </div>
          
          {/* Scrollable Content - Right 50% with HeroHighlight */}
          <div className="w-full lg:w-1/2 relative">
            <HeroHighlight containerClassName="w-full h-full">
              <div 
                className="relative z-10 min-h-screen divide-y divide-neutral-200 dark:divide-neutral-800"
              >
                {/* About Section */}
                <ThemedSection id="about">
                  <div className="max-w-3xl mx-auto">
                    <SectionHeader title="About" number="01" />
                    
                    <div className="space-y-8">
                      <div>
                        <div>
                          <p className="text-xl leading-relaxed mb-6">
                            I&apos;m a passionate software developer and UI/UX designer with expertise in modern web technologies and AI integration. With a keen eye for detail and a commitment to creating elegant solutions, I enjoy tackling complex problems that make a real difference in people&apos;s lives.
                          </p>
                          <p className="text-lg leading-relaxed">
                            When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through articles and tutorials.
                          </p>
                        </div>
                        <div 
                          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
                        >
                          <div>
                            <h3 className="text-xl font-bold mb-3">Personal Info</h3>
                            <ul className="space-y-2">
                              <li className="flex justify-between">
                                <span className="text-neutral-500 dark:text-neutral-400">Location</span>
                                <span>Kitchener, Ontario</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-neutral-500 dark:text-neutral-400">Experience</span>
                                <span>5+ Years</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-neutral-500 dark:text-neutral-400">Availability</span>
                                <span className="text-green-600 dark:text-green-400">Open to Work</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-sm dark:bg-black/10 p-6 rounded-lg mt-6 border border-neutral-200 dark:border-neutral-800">
                          <h3 className="text-xl font-bold mb-3">Interests</h3>
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
                
                {/* Career Section */}
                <ThemedSection id="career">
                  <div className="max-w-3xl mx-auto">
                    <SectionHeader title="Career" number="02" />
                    
                    <div className="space-y-8">
                      {experienceData.map((experience, index) => (
                        <div 
                          key={index}
                          className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-neutral-200/70 dark:border-neutral-800/70 shadow-sm hover:shadow-md transition-all duration-300"
                          data-animate-on-view="true"
                        >
                          <div className="flex items-center p-6 border-b border-neutral-200/70 dark:border-neutral-800/70">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold">{experience.title}</h3>
                              <div className="flex flex-col md:flex-row md:justify-between text-neutral-600 dark:text-neutral-400 mb-1">
                                <span className="font-medium">{experience.company}</span>
                                <span>{experience.period} · {experience.duration}</span>
                              </div>
                              <div className="text-neutral-500 dark:text-neutral-500">
                                <span>{experience.location} · {experience.type}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            {experience.description && (
                              <p className="mb-4 text-neutral-700 dark:text-neutral-300">{experience.description}</p>
                            )}
                            
                            {experience.skills && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {experience.skills.map((skill, skillIndex) => (
                                  <span 
                                    key={skillIndex} 
                                    className="px-3 py-1 text-xs bg-blue-100/50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ThemedSection>
                
                {/* Education Section */}
                <ThemedSection id="education">
                  <div className="max-w-3xl mx-auto">
                    <SectionHeader title="Education" number="03" />
                    
                    <div className="grid grid-cols-1 gap-8">
                      {educationData.map((edu, index) => (
                        <div 
                          key={index}
                          className="bg-gradient-to-br from-purple-400/80 to-purple-600/80 dark:from-purple-500/40 dark:to-purple-800/40 p-1 rounded-lg"
                          data-animate-on-view="true"
                        >
                          <div className="bg-white/80 backdrop-blur-sm dark:bg-black/60 h-full p-5 rounded-[7px]">
                            <h3 className="text-xl font-bold">{edu.degree}</h3>
                            <h4 className="text-lg">{edu.field}</h4>
                            <div className="text-neutral-600 dark:text-neutral-400 mt-2">
                              <p className="font-medium">{edu.school}</p>
                              <p>{edu.period}</p>
                              <p className="text-sm mt-1">{edu.location}</p>
                              {edu.activities && (
                                <p className="text-sm italic mt-1">Activities: {edu.activities}</p>
                              )}
                            </div>
                            {edu.skills && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {edu.skills.slice(0, 6).map((skill, skillIndex) => (
                                  <span 
                                    key={skillIndex} 
                                    className="px-3 py-1 text-xs bg-purple-100/50 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {edu.skills.length > 6 && (
                                  <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-300 rounded-full">
                                    +{edu.skills.length - 6} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </ThemedSection>
                
                {/* Projects Section */}
                <ThemedSection id="projects">
                  <div className="max-w-3xl mx-auto">
                    <SectionHeader title="Projects" number="04" />
                    
                    <div className="space-y-12">
                      {projects.slice(0, 3).map((project, index) => (
                        <div 
                          key={index}
                          className="bg-white/20 backdrop-blur-sm dark:bg-black/20 rounded-lg overflow-hidden border border-neutral-200/70 dark:border-neutral-800/70 shadow-sm hover:shadow-md transition-all duration-300"
                          data-animate-on-view="true"
                        >
                          <div className="relative h-48 w-full bg-neutral-200/50 dark:bg-neutral-800/50 overflow-hidden">
                            {project.image ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <img 
                                  src={project.image} 
                                  alt={project.name}
                                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                              </div>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">Project Image</span>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {project.skills.slice(0, 4).map((skill, tagIndex) => (
                                <span 
                                  key={tagIndex} 
                                  className="px-3 py-1 bg-green-100/50 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-4 mt-4">
                              {project.code && (
                                <a 
                                  href={project.code}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  View Code
                                </a>
                              )}
                              {project.live && (
                                <a 
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer" 
                                  className="text-green-600 dark:text-green-400 hover:underline"
                                >
                                  Live Demo
                                </a>
                              )}
                              {project.isBuilding && (
                                <span className="text-yellow-600 dark:text-yellow-400">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </ThemedSection>
                
                {/* Skills Section */}
                <ThemedSection id="skills">
                  <div className="max-w-3xl mx-auto">
                    <SectionHeader title="Skills" number="05" />
                    
                    <div className="space-y-12">
                      {skillsCategories.slice(0, 4).map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                          <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {category.skills.map((skill, skillIndex) => (
                              <div
                                key={skillIndex}
                                className="bg-white/20 backdrop-blur-sm dark:bg-black/20 rounded-lg p-4 text-center border border-neutral-200/70 dark:border-neutral-800/70 hover:shadow-md transition-all duration-300"
                                data-animate-on-view="true"
                              >
                                {skill.icon && (
                                  <div className="flex justify-center mb-2">
                                    <img 
                                      src={skill.icon} 
                                      alt={skill.name} 
                                      className="h-10 w-10 object-contain"
                                    />
                                  </div>
                                )}
                                {skill.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ThemedSection>
                
                {/* Footer */}
                <footer className="py-12 px-8 text-center text-neutral-600 dark:text-neutral-400 bg-white/20 dark:bg-black/20 backdrop-blur-sm">
                  <p>&copy; {new Date().getFullYear()} Sreehari Prathap. All rights reserved.</p>
                </footer>
              </div>
            </HeroHighlight>
          </div>
        </div>
      </SectionThemeProvider>
    </div>
  );
}
