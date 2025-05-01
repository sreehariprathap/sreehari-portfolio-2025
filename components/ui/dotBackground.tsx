import { cn } from "@/lib/utils";
import React from "react";

// Memoize the component to prevent re-renders
export const DotBackground = React.memo(function DotBackground({ 
  className,
  dotSize = 20,
  dotColor,
}: { 
  className?: string;
  dotSize?: number;
  dotColor?: string;
}) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0 will-change-auto", // will-change-auto tells browser to optimize according to its own heuristics
          className
        )}
        style={{
          backgroundSize: `${dotSize}px ${dotSize}px`,
          backgroundImage: dotColor 
            ? `radial-gradient(${dotColor} 1px, transparent 1px)` 
            : undefined,
          // Using CSS variables for theme colors to avoid repaints on theme changes
          // The browser only needs to update CSS variables, not repaint all elements
          '--dot-light': '#d4d4d4',
          '--dot-dark': '#404040',
        }}
      />
      {/* Add dedicated theme-specific styling that uses CSS variables to avoid style recalculations */}
      <style jsx>{`
        .absolute {
          background-image: radial-gradient(var(--dot-light) 1px, transparent 1px);
        }
        :global(.dark) .absolute {
          background-image: radial-gradient(var(--dot-dark) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
});
