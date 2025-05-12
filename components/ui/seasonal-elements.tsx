"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useSectionTheme } from './section-theme-transition/theme-context';

// Spring element - Floating flowers and petals
export const SpringElements = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`flower-${i}`}
          className="absolute w-4 h-4 rounded-full bg-pink-200"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
          }}
          animate={{
            top: '100%',
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0.8, 0]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear"
          }}
        >
          <div className="absolute inset-0 rounded-full bg-pink-300 opacity-70 blur-sm"></div>
        </motion.div>
      ))}
      
      {/* Cherry blossom petals */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-3 h-3 bg-pink-100"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10px`,
            borderRadius: '100% 0 100% 0',
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            top: '100%',
            x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            rotate: [0, 360, 720],
            opacity: [0, 0.9, 0.7, 0]
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Green leaves */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute w-2 h-4 bg-green-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-15px`,
            borderRadius: '50% 50% 0 50%',
          }}
          animate={{
            top: '100%',
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Summer element - Sun rays and light flares
export const SummerElements = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Sun in the top right */}
      <div className="absolute top-10 right-10 w-32 h-32">
        <motion.div 
          className="absolute inset-0 rounded-full bg-yellow-400"
          animate={{ 
            boxShadow: [
              '0 0 40px 20px rgba(250, 204, 21, 0.5)',
              '0 0 70px 30px rgba(250, 204, 21, 0.5)',
              '0 0 40px 20px rgba(250, 204, 21, 0.5)'
            ]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Light flares */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`flare-${i}`}
          className="absolute bg-yellow-100 opacity-20 rounded-full"
          style={{
            width: 100 + Math.random() * 200,
            height: 100 + Math.random() * 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Heat waves */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute bottom-0 left-0 right-0 h-12 bg-transparent"
          style={{
            bottom: 50 + i * 50,
          }}
          animate={{
            backgroundImage: [
              'linear-gradient(transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
              'linear-gradient(transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
              'linear-gradient(transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Fall element - Falling leaves in autumn colors
export const FallElements = () => {
  const fallColors = [
    "bg-amber-600", "bg-orange-500", "bg-red-500", 
    "bg-yellow-600", "bg-amber-700", "bg-red-600"
  ];
  
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Falling leaves */}
      {[...Array(30)].map((_, i) => {
        const colorClass = fallColors[Math.floor(Math.random() * fallColors.length)];
        const size = 5 + Math.random() * 10;
        
        return (
          <motion.div
            key={`leaf-${i}`}
            className={`absolute ${colorClass}`}
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
            }}
            animate={{
              top: '100%',
              x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
              rotate: [0, 180, 360, 720],
              opacity: [0, 0.9, 0.9, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        );
      })}
      
      {/* Swirling leaves cluster */}
      <motion.div 
        className="absolute opacity-60"
        style={{
          width: 300,
          height: 300,
          top: '40%',
          left: '10%',
        }}
        animate={{
          left: ['10%', '80%', '10%'],
          top: ['40%', '20%', '40%'],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {[...Array(10)].map((_, i) => {
          const colorClass = fallColors[Math.floor(Math.random() * fallColors.length)];
          const size = 4 + Math.random() * 8;
          
          return (
            <motion.div
              key={`swirl-${i}`}
              className={`absolute ${colorClass}`}
              style={{
                width: size,
                height: size,
                left: 150,
                top: 150,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              }}
              animate={{
                x: [0, Math.cos(i * 36) * 100, 0],
                y: [0, Math.sin(i * 36) * 100, 0],
                rotate: [0, 360],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

// Winter element - Falling snow
export const WinterElements = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Snowflakes - small */}
      {[...Array(40)].map((_, i) => {
        const size = 2 + Math.random() * 4;
        
        return (
          <motion.div
            key={`snow-small-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `-10px`,
              opacity: 0.7 + Math.random() * 0.3,
              filter: 'blur(0.5px)',
            }}
            animate={{
              top: '100%',
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear"
            }}
          />
        );
      })}
      
      {/* Snowflakes - medium with crystal structure */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`snow-medium-${i}`}
          className="absolute"
          style={{
            width: 8,
            height: 8,
            left: `${Math.random() * 100}%`,
            top: `-15px`,
          }}
          animate={{
            top: '100%',
            x: [0, Math.random() * 150 - 75, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        >
          <div className="absolute inset-0 bg-white opacity-90" style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}></div>
        </motion.div>
      ))}
      
      {/* Snow on ground effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/20 to-transparent dark:from-white/5 dark:to-transparent"></div>
      
      {/* Frost patterns on corners */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-20 dark:opacity-10" 
        style={{ 
          background: 'radial-gradient(circle at 0 0, transparent 50%, rgba(255,255,255,0.8) 100%)' 
        }}>
      </div>
      <div className="absolute top-0 right-0 w-40 h-40 opacity-20 dark:opacity-10" 
        style={{ 
          background: 'radial-gradient(circle at 100% 0, transparent 50%, rgba(255,255,255,0.8) 100%)' 
        }}>
      </div>
    </div>
  );
};

// Container component that renders the appropriate seasonal elements based on active section
export const SeasonalElementsContainer = () => {
  const { activeSection } = useSectionTheme();
  
  return (
    <>
      {activeSection === 'about' && <SpringElements />}
      {activeSection === 'career' && <SummerElements />}
      {activeSection === 'projects' && <FallElements />}
      {activeSection === 'skills' && <WinterElements />}
    </>
  );
};