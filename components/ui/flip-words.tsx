/* eslint-disable react/display-name */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

// Using React.memo to prevent unnecessary re-renders
export const FlipWords = React.memo(({
  words,
  duration = 2500, // Reduced from 3000ms to 2500ms for faster animations
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  // Store the maximum height of all words to maintain consistent space
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!isAnimating) {
      timeoutId = setTimeout(() => {
        startAnimation();
      }, duration);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAnimating, duration, startAnimation]);

  // Calculate maximum word length to estimate height (runs once)
  useEffect(() => {
    if (maxHeight === null) {
      // Default height in pixels (adjust based on your font size)
      setMaxHeight(40);
    }
  }, [words, maxHeight]);

  return (
    <div 
      className={cn(
        "inline-block relative overflow-visible mt-5 mb-1 w-full", // Added my-8 (2rem) margin and w-full
        className
      )}
      style={{ 
        height: maxHeight ? `${maxHeight}px` : 'auto',
        minWidth: '100px' // Adjust based on your content
      }}
    >
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200, // Increased from 100 for faster spring motion
            damping: 15, // Increased from 10 for less oscillation
            duration: 0.25, // Added explicit duration
          }}
          exit={{
            opacity: 0,
            y: -30, // Reduced from -40 for subtler exit
            x: 30, // Reduced from 40 for subtler exit 
            filter: "blur(6px)", // Reduced from 8px
            scale: 1.5, // Reduced from 2 for less dramatic exit
            position: "absolute",
          }}
          className={cn(
            "z-10 inline-flex flex-nowrap text-left text-2xl text-neutral-900 dark:text-neutral-100 px-2 will-change-transform absolute whitespace-nowrap"
          )}
          key={currentWord}
        >
          {/* Using a simpler animation approach for better performance */}
          {currentWord.split(" ").map((word, wordIndex) => (
            <motion.span
              key={word + wordIndex}
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }} // Reduced values
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: wordIndex * 0.15, // Reduced from 0.3
                duration: 0.2, // Reduced from 0.3
              }}
              className="inline-block whitespace-nowrap will-change-transform text-2xl"
            >
              {word}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
