"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { useSectionTheme, SectionObserver } from './theme-context';
import { motion } from 'motion/react';

interface ThemedSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const ThemedSection = ({ id, className, children }: ThemedSectionProps) => {
  const { activeSection, currentTheme } = useSectionTheme();
  const isActive = activeSection === id;

  return (
    <>
      <SectionObserver sectionId={id} />
      <motion.section
        id={id}
        className={cn(
          "min-h-screen transition-all duration-700 ease-in-out px-8 py-16 flex items-center relative",
          isActive ? currentTheme.backgroundColor : "bg-transparent",
          className
        )}
        initial={{ opacity: 0.8, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
      >
        <div className={cn(
          "relative z-10 w-full transition-colors duration-700",
          isActive ? currentTheme.textColor : ""
        )}>
          {children}
        </div>
      </motion.section>
    </>
  );
};