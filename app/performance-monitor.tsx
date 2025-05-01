'use client';

import { useWebVitals } from "@/hooks/use-web-vitals";
import { useEffect } from "react";
import { PerformanceMetricType, recordMeasurement } from "@/lib/performance";

/**
 * PerformanceMonitor component to track performance metrics site-wide
 * This is a client component that can be included in the layout
 */
export default function PerformanceMonitor() {
  // Track Web Vitals metrics
  useWebVitals();
  
  // Track page load performance
  useEffect(() => {
    // This will run only in the browser
    if (typeof window !== 'undefined') {
      // Record navigation timing metrics
      window.addEventListener('load', () => {
        // Wait for everything to be fully loaded
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            // DOM Content Loaded
            recordMeasurement(
              'DOMContentLoaded',
              navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
              PerformanceMetricType.PageLoad
            );
            
            // Total page load time
            recordMeasurement(
              'PageLoad',
              navigation.loadEventEnd - navigation.startTime,
              PerformanceMetricType.PageLoad
            );
          }
          
          // Record resource load times
          const resources = performance.getEntriesByType('resource');
          resources.forEach(resource => {
            const { name, initiatorType, duration } = resource;
            
            // Only record resources that took significant time (> 50ms)
            if (duration > 50) {
              recordMeasurement(
                `Resource: ${initiatorType}`,
                duration,
                PerformanceMetricType.ResourceLoad,
                {
                  url: name,
                  type: initiatorType
                }
              );
            }
          });
        }, 0);
      });
      
      // Track long tasks that might cause jank
      if ('PerformanceObserver' in window) {
        try {
          // Track long tasks (tasks blocking the main thread)
          const longTaskObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              const duration = entry.duration;
              if (duration > 50) { // Tasks over 50ms can cause visible jank
                recordMeasurement(
                  'LongTask',
                  duration,
                  PerformanceMetricType.Animation,
                  { detail: JSON.stringify(entry) }
                );
              }
            });
          });
          
          longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch {
          console.warn('PerformanceObserver for longtask not supported');
        }
      }
    }
  }, []);
  
  // This is a monitoring component with no UI
  return null;
}