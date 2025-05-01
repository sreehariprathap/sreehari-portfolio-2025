/* eslint-disable @typescript-eslint/no-explicit-any */
// Core component that receives mouse positions and renders pointer and content

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

// Memoize the FollowPointer component to prevent unnecessary renders
const MemoizedFollowPointer = React.memo(({
  x,
  y,
  title,
}: {
  x: any;
  y: any;
  title?: string | React.ReactNode;
}) => {
  // Pre-calculate colors to avoid recalculation on each render
  const colors = useMemo(() => [
    "#0ea5e9",
    "#737373",
    "#14b8a6",
    "#22c55e",
    "#3b82f6",
    "#ef4444",
    "#eab308",
  ], []);

  // Pick a color once, not on every render
  const color = useMemo(() => 
    colors[Math.floor(Math.random() * colors.length)],
  [colors]);

  return (
    <motion.div
      className="absolute z-50 h-4 w-4 rounded-full"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
        willChange: "transform", // Hint to browser for optimization
      }}
      initial={{
        scale: 0.8,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          mass: 0.5, // Lighter mass for faster movement
          stiffness: 200, // Higher stiffness for snappier animations
          damping: 15, // Appropriate damping
          duration: 0.15, // Shorter duration
        }
      }}
      exit={{
        scale: 0,
        opacity: 0,
        transition: { duration: 0.1 } // Faster exit
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform stroke-sky-600 text-sky-500"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: color,
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.15 } // Shorter duration
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
          transition: { duration: 0.1 } // Faster exit
        }}
        className={
          "min-w-max rounded-full bg-neutral-200 px-2 py-2 text-xs whitespace-nowrap text-white"
        }
      >
        {title || `William Shakespeare`}
      </motion.div>
    </motion.div>
  );
});

MemoizedFollowPointer.displayName = "MemoizedFollowPointer";

// Helper function for debouncing mouse events
function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Main component with optimizations
export const FollowerPointerCard = React.memo(({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false);

  // Recalculate rect on resize to ensure accurate positioning
  useEffect(() => {
    if (!ref.current) return;
    
    setRect(ref.current.getBoundingClientRect());
    
    const handleResize = () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    };

    // Use passive events for better performance
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Debounced mouse move handler for performance
  const debouncedMouseMove = React.useCallback(
    debounce((e: React.MouseEvent<HTMLDivElement>) => {
      if (rect) {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        x.set(e.clientX - rect.left + scrollX);
        y.set(e.clientY - rect.top + scrollY);
      }
    }, 5), // 5ms debounce - hardly noticeable but reduces calculations
    [rect, x, y]
  );

  // These don't need debouncing as they're not called frequently
  const handleMouseLeave = React.useCallback(() => setIsInside(false), []);
  const handleMouseEnter = React.useCallback(() => setIsInside(true), []);

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={debouncedMouseMove}
      style={{
        cursor: "none",
      }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence mode="wait">
        {isInside && <MemoizedFollowPointer x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
});

FollowerPointerCard.displayName = "FollowerPointerCard";

// Export the follow pointer component for direct use
export const FollowPointer = MemoizedFollowPointer;
