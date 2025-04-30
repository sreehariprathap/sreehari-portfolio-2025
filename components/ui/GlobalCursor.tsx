"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useCursorContext } from "./cursor-context";

export const GlobalCursor = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isPointer, setIsPointer] = useState(false);
  const { cursorColor } = useCursorContext();

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    // Check for pointer cursor elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      const cursor = computedStyle.getPropertyValue("cursor");
      setIsPointer(cursor === "pointer");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [x, y]);

  return (
    <>
      {/* Base cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x,
          y,
          translateX: "-50%", 
          translateY: "-50%"
        }}
      >
        <svg
          stroke="currentColor"
          fill={cursorColor}
          strokeWidth="1"
          viewBox="0 0 16 16"
          className={cn(
            "h-6 w-6 transform -rotate-[70deg]",
            isPointer ? "scale-110 translate-x-[2px] translate-y-[2px]" : "scale-100 translate-x-[3px] translate-y-[3px]"
          )}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
        </svg>
        
        {/* Ring effect that appears on hover */}
        {isPointer && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{
              backgroundColor: cursorColor,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-20"
          />
        )}
      </motion.div>
    </>
  );
};

export default GlobalCursor;