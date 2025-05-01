/**
 * Image optimization utilities
 * These functions help optimize image loading and rendering performance
 */

/**
 * Determines if an image should be lazy loaded based on priority
 * Critical images (above the fold) should not be lazy loaded
 */
export function getShouldLazyLoad(priority: boolean = false): boolean {
  return !priority;
}

/**
 * Generates image loading priority attributes
 * For critical images, we use fetchPriority="high" and loading="eager"
 * For non-critical images, we use loading="lazy"
 */
export function getImageLoadingProps(priority: boolean = false) {
  return {
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : 'auto',
    decoding: 'async',
  } as const;
}

/**
 * Calculates optimal image size based on viewport and container size
 * This helps avoid loading larger images than necessary
 */
export function getOptimalImageSize(
  containerWidth: number, 
  devicePixelRatio: number = 1,
  maxSize: number = 1920
): number {
  // Calculate size based on device pixel ratio (for retina displays)
  const size = containerWidth * Math.min(devicePixelRatio, 2);
  
  // Ensure the size is within reasonable bounds
  return Math.min(Math.max(size, 320), maxSize);
}

/**
 * Generate appropriate srcset for responsive images
 * @param baseSrc The base image source URL
 * @param widths Array of widths to include in the srcset
 * @returns A srcset string for use with img elements
 */
export function generateSrcSet(
  baseSrc: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920]
): string {
  // If the image is hosted on a CDN or service that supports size parameters
  if (baseSrc.includes('api.microlink.io')) {
    return widths
      .map((width) => `${baseSrc}&width=${width} ${width}w`)
      .join(', ');
  }
  
  // Return empty string for images we can't create srcset for
  return '';
}

/**
 * Checks if an element is in the viewport
 * Useful for implementing IntersectionObserver-based lazy loading
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom >= 0 &&
    rect.right >= 0
  );
}