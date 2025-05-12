"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useSectionTheme } from './section-theme-transition/theme-context';

// Spring decoration - cherry blossoms and spring elements
export const SpringDecorator = () => (
  <div className="absolute right-0 -top-10 pointer-events-none opacity-70">
    <motion.div 
      className="relative w-32 h-32"
      animate={{ rotate: [0, 5, -3, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute top-4 right-8 w-6 h-6 rounded-full bg-pink-200"></div>
      <div className="absolute top-10 right-12 w-4 h-4 rounded-full bg-pink-300"></div>
      <div className="absolute top-6 right-16 w-5 h-5 rounded-full bg-pink-100"></div>
      <div className="absolute top-14 right-8 w-3 h-3 rounded-full bg-pink-200"></div>
      <div className="absolute top-8 right-5 w-2 h-8 bg-green-500 rounded-b-full"></div>
      <div className="absolute top-16 right-14 w-2 h-6 bg-green-500 rounded-b-full"></div>
    </motion.div>
  </div>
);

// Summer decoration - sun and beach elements
export const SummerDecorator = () => (
  <div className="absolute right-0 -top-10 pointer-events-none opacity-70">
    <motion.div 
      className="relative w-32 h-32"
      animate={{ 
        boxShadow: [
          '0 0 20px 10px rgba(251, 191, 36, 0.3)',
          '0 0 30px 15px rgba(251, 191, 36, 0.3)',
          '0 0 20px 10px rgba(251, 191, 36, 0.3)'
        ]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute top-4 right-10 w-14 h-14 rounded-full bg-yellow-400"></div>
      <motion.div 
        className="absolute top-8 right-16 w-24 h-2 bg-yellow-200 rounded-full"
        animate={{ width: ['6rem', '5rem', '6rem'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div 
        className="absolute top-14 right-12 w-16 h-2 bg-yellow-200 rounded-full" 
        animate={{ width: ['4rem', '3.5rem', '4rem'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      ></motion.div>
    </motion.div>
  </div>
);

// Fall decoration - autumn leaves
export const FallDecorator = () => (
  <div className="absolute right-0 -top-10 pointer-events-none opacity-70">
    <motion.div 
      className="relative w-32 h-32"
      animate={{ rotate: [0, 3, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute top-6 right-8 w-6 h-6 bg-red-500" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
      <div className="absolute top-12 right-14 w-8 h-8 bg-orange-500" style={{ borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%' }}></div>
      <div className="absolute top-4 right-16 w-5 h-5 bg-amber-500" style={{ borderRadius: '60% 40% 40% 60% / 60% 40% 60% 40%' }}></div>
      <div className="absolute top-16 right-10 w-4 h-4 bg-yellow-600" style={{ borderRadius: '40% 60% 60% 40% / 40% 60% 40% 60%' }}></div>
      <div className="absolute top-10 right-6 w-3 h-10 bg-amber-900/50 rounded-sm transform rotate-12"></div>
    </motion.div>
  </div>
);

// Winter decoration - snowflakes and frost
export const WinterDecorator = () => (
  <div className="absolute right-0 -top-10 pointer-events-none opacity-70">
    <motion.div 
      className="relative w-32 h-32"
    >
      <motion.div 
        className="absolute top-4 right-10 w-6 h-6 bg-white"
        style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <motion.div 
        className="absolute top-12 right-18 w-4 h-4 bg-white" 
        style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }}
      ></motion.div>
      <motion.div 
        className="absolute top-14 right-10 w-5 h-5 bg-white" 
        style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 2 }}
      ></motion.div>
      <div className="absolute top-6 right-16 w-8 h-8 rounded-full bg-gradient-to-b from-white/20 to-transparent"></div>
    </motion.div>
  </div>
);

// Container component that renders the appropriate seasonal decoration based on the section
export const SeasonalSectionDecorator = () => {
  const { activeSection } = useSectionTheme();
  
  return (
    <>
      {activeSection === 'about' && <SpringDecorator />}
      {activeSection === 'career' && <SummerDecorator />}
      {activeSection === 'projects' && <FallDecorator />}
      {activeSection === 'skills' && <WinterDecorator />}
    </>
  );
};