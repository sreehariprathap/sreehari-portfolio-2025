"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImageLoadingProps } from "@/lib/image-utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  quality?: number;
  onLoad?: () => void;
}

/**
 * A performance-optimized image component that implements modern best practices
 * for fast loading, lazy loading, and progressive enhancement
 */
export default function OptimizedImage({
  src,
  alt,
  width = 0,
  height = 0,
  className,
  priority = false,
  style,
  objectFit = "cover",
  placeholder = "empty",
  blurDataURL,
  quality = 75,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Generate a blur placeholder for images without one
  const defaultBlurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZGRkZGRkIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgLz48L3N2Zz4=";

  // Set image loading attributes based on priority
  const loadingProps = getImageLoadingProps(priority);
  
  // Fall back to a placeholder image if the main image fails to load
  const handleError = () => {
    setError(true);
    // You could set a fallback image here
    console.error(`Failed to load image: ${src}`);
  };
  
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Add intersectionObserver for non-priority images
  useEffect(() => {
    if (priority) return;

    const imgElement = document.getElementById(`image-${src.replace(/\W/g, '')}`);
    
    if (!imgElement || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Preload the image when it's about to enter viewport
            const img = new window.Image();
            img.src = src;
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' } // Start loading when within 200px of viewport
    );

    observer.observe(imgElement);
    return () => observer.disconnect();
  }, [src, priority]);

  return (
    <div 
      className={cn(
        "overflow-hidden relative", 
        isLoaded ? "animate-none" : "animate-pulse",
        className
      )}
      style={style}
      id={`image-${src.replace(/\W/g, '')}`}
    >
      <Image
        src={error ? defaultBlurDataURL : src}
        alt={alt}
        width={width || undefined}
        height={height || undefined}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down"
        )}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={loadingProps.loading as "lazy" | "eager"}
        fetchPriority={loadingProps.fetchPriority as "high" | "auto" | "low"}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
        }}
      />
    </div>
  );
}