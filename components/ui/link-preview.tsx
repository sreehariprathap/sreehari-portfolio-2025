/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 150, // Reduced to 75% from 200px
  height = 94, // Reduced to 75% from 125px
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  // Load image only when needed (on hover)
  const [shouldLoadImage, setShouldLoadImage] = React.useState(false);

  // Use faster spring configuration
  const springConfig = { stiffness: 200, damping: 20 }; // Increased stiffness, slightly higher damping
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Subtle effect
    x.set(offsetFromCenter);
  };

  // Load image when hovering is about to start
  React.useEffect(() => {
    if (isOpen) {
      setShouldLoadImage(true);
    }
  }, [isOpen]);

  return (
    <HoverCardPrimitive.Root
      openDelay={75} // Slightly higher delay to avoid unintentional triggers
      closeDelay={50} // Faster closing
      onOpenChange={(open) => {
        setOpen(open);
        if (open) {
          setShouldLoadImage(true);
        }
      }}
    >
      <HoverCardPrimitive.Trigger
        onMouseMove={handleMouseMove}
        className={cn("text-black dark:text-white inline", className)}
        href={url}
        asChild={false}
      >
        {children}
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          className="z-[999] [transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
          forceMount={isOpen ? true : undefined}
          collisionPadding={16}
          avoidCollisions={true}
        >
          <AnimatePresence>
            {isOpen && shouldLoadImage && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300, // Faster animation
                    damping: 20,
                    duration: 0.2, // Faster overall duration
                  },
                }}
                exit={{ 
                  opacity: 0, 
                  y: 10, 
                  scale: 0.6, 
                  transition: { 
                    duration: 0.15 // Faster exit
                  } 
                }}
                className="shadow-xl rounded-xl pointer-events-auto"
                style={{
                  x: translateX,
                  position: "relative",
                  willChange: "transform", // Performance hint for browsers
                }}
              >
                <a
                  href={url}
                  className="block p-1 bg-white dark:bg-neutral-900 border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isStatic ? (
                    <img
                      src={imageSrc}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt="preview"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <img
                      src={src}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt="preview"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};
