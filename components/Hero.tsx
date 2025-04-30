"use client";

import { FlipWords } from "./ui/flip-words";
import SocialConnect from "./SocialConnect";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
    const words = ["Software Developer", "UI/UX Designer", "AI/ML Engineer"];
    const [activeSection, setActiveSection] = useState<string>("about");
    const [accentGradient, setAccentGradient] = useState<string>("from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-900");
    
    const sections = [
        { id: "about", label: "About", number: "01" },
        { id: "career", label: "Career", number: "02" },
        { id: "education", label: "Education", number: "03" },
        { id: "projects", label: "Projects", number: "04" },
        { id: "skills", label: "Skills", number: "05" }
    ];

    useEffect(() => {
        // Listen for theme change events from the section theme context
        const handleThemeChange = (event: CustomEvent) => {
            const { section, theme } = event.detail;
            setActiveSection(section);
            
            // Update the hero accent gradient based on the current section
            if (theme && theme.heroAccent) {
                setAccentGradient(theme.heroAccent);
            }
        };

        document.addEventListener('themechange', handleThemeChange as EventListener);
        
        return () => {
            document.removeEventListener('themechange', handleThemeChange as EventListener);
        };
    }, []);

    const handleSetActive = (id: string) => {
        setActiveSection(id);
        // Scroll to section when clicking navigation
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <div className={cn(
            "flex flex-col justify-between h-screen p-8 transition-all duration-700",
            "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-20 before:transition-all before:duration-700",
            `before:${accentGradient}`
        )}>
            <div className="flex flex-col justify-start gap-3 relative z-10">
                <motion.h1 
                    className="text-7xl font-bold ml-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Sreehari <span className="font-normal">Prathap</span>.
                </motion.h1>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <FlipWords words={words} />
                </motion.div>
                
                <motion.p 
                    className="ml-2 text-xl pt-3 max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    &quot;Fueled by a passion for learning and building, I create impactful solutions for people through programming and AI.&quot;
                </motion.p>
            </div>
            
            {/* Navigation Menu */}
            <motion.div 
                className="mt-12 mb-12 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
            >
                <h3 className="text-sm font-medium ml-2 mb-4">Navigation</h3>
                <ul className="space-y-2">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <Link 
                                href={`#${section.id}`}
                                onClick={() => handleSetActive(section.id)}
                                className={cn(
                                    "flex items-baseline group transition-all duration-300 hover:pl-4",
                                    activeSection === section.id ? "text-black dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400"
                                )}
                            >
                                <span className={cn(
                                    "text-sm mr-4 opacity-70 transition-all duration-300",
                                    activeSection === section.id && "opacity-100"
                                )}>{section.number}</span>
                                <span className="text-md">{section.label}</span>
                                <span className={cn(
                                    "ml-2 h-[1px] bg-current transition-all duration-300",
                                    activeSection === section.id ? "w-12" : "w-0 group-hover:w-12"
                                )}></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.div>
            
            {/* Social Connect */}
            <motion.div
                className="relative z-10 pb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                <SocialConnect 
                    linkedinUrl="https://linkedin.com/in/sreehariprathap" 
                    githubUrl="https://github.com/sreehariprathap"
                    twitterUrl="https://twitter.com/sreehariprathap"
                    email="mailto:mail@sreehariprathap.com"
                />
            </motion.div>
        </div>
    );
};

export default Hero;