"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FlipWords } from "./ui/flip-words";
import SocialConnect from "./SocialConnect";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Memoize the Hero component to prevent unnecessary re-renders
const Hero = React.memo(() => {
    const words = useMemo(() => ["Software Developer", "UI/UX Designer", "AI/ML Engineer"], []);
    const [activeSection, setActiveSection] = useState<string>("about");
    const [accentGradient, setAccentGradient] = useState<string>("from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-900");
    
    // Memoize sections to prevent recreation on each render
    const sections = useMemo(() => [
        { id: "about", label: "About", number: "01" },
        { id: "career", label: "Career", number: "02" },
        { id: "education", label: "Education", number: "03" },
        { id: "projects", label: "Projects", number: "04" },
        { id: "skills", label: "Skills", number: "05" }
    ], []);

    // Optimized event listener with useCallback to avoid recreating functions
    const handleThemeChange = useCallback((event: CustomEvent) => {
        const { section, theme } = event.detail;
        setActiveSection(section);
        
        // Update the hero accent gradient based on the current section
        if (theme && theme.heroAccent) {
            setAccentGradient(theme.heroAccent);
        }
    }, []);

    useEffect(() => {
        // Listen for theme change events from the section theme context
        document.addEventListener('themechange', handleThemeChange as EventListener);
        
        return () => {
            document.removeEventListener('themechange', handleThemeChange as EventListener);
        };
    }, [handleThemeChange]);

    const handleSetActive = useCallback((id: string) => {
        setActiveSection(id);
        // Scroll to section when clicking navigation
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    
    // Animation variants for consistent and optimized animations
    const containerVariants = useMemo(() => ({
        initial: { opacity: 0 },
        animate: { 
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    }), []);
    
    const itemVariants = useMemo(() => ({
        initial: { opacity: 0, y: 10 },
        animate: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                duration: 0.3 // Faster animation
            } 
        }
    }), []);
    
    // Use will-change-transform hint for optimized rendering
    return (
        <div className={cn(
            "flex flex-col justify-between h-screen p-8 transition-all duration-300", // Reduce transition time from 700ms to 300ms
            "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-20 before:transition-all before:duration-300", // Faster transition
            `before:${accentGradient}`
        )}>
            <motion.div 
                className="flex flex-col justify-start gap-3 relative z-10"
                initial="initial"
                animate="animate"
                variants={containerVariants}
            >
                <motion.h1 
                    className="text-7xl font-bold ml-2 will-change-transform"
                    variants={itemVariants}
                >
                    Sreehari <span className="font-normal">Prathap</span>.
                </motion.h1>
                
                <motion.div
                    variants={itemVariants}
                >
                    <FlipWords words={words} duration={2500} /> {/* Use the optimized FlipWords component */}
                </motion.div>
                
                <motion.p 
                    className="ml-2 text-xl pt-3 max-w-md"
                    variants={itemVariants}
                >
                    &quot;Fueled by a passion for learning and building, I create impactful solutions for people through programming and AI.&quot;
                </motion.p>
            </motion.div>
            
            {/* Navigation Menu */}
            <motion.div 
                className="mt-12 mb-12 relative z-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3, type: "spring", stiffness: 260, damping: 20 }} // Faster animation with spring physics
            >
                <h3 className="text-sm font-medium ml-2 mb-4">Navigation</h3>
                <ul className="space-y-2">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <Link 
                                href={`#${section.id}`}
                                onClick={() => handleSetActive(section.id)}
                                className={cn(
                                    "flex items-baseline group transition-all duration-200", // Faster transition 
                                    activeSection === section.id ? "text-black dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400"
                                )}
                            >
                                <span className={cn(
                                    "text-sm mr-4 opacity-70 transition-all duration-200", // Faster transition
                                    activeSection === section.id && "opacity-100"
                                )}>{section.number}</span>
                                <span className="text-md">{section.label}</span>
                                <span className={cn(
                                    "ml-2 h-[1px] bg-current transition-all duration-200", // Faster transition 
                                    activeSection === section.id ? "w-12" : "w-0 group-hover:w-6 group-hover:w-12"
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
                transition={{ delay: 0.7, duration: 0.3 }} // Faster animation
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
});

Hero.displayName = "Hero";

export default Hero;