import { useEffect } from 'react';
import { PerformanceMetricType, recordMeasurement } from '@/lib/performance';

/**
 * Web Vitals metrics types
 */
type WebVitalsMetric = {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
};

/**
 * Hook to track Core Web Vitals metrics
 * @param reportCallback Optional callback to report metrics to an external service
 */
export function useWebVitals(reportCallback?: (metric: WebVitalsMetric) => void) {
  useEffect(() => {
    // Only run in production or when explicitly enabled for development
    if (process.env.NODE_ENV !== 'production' && !process.env.ENABLE_VITALS_DEV) {
      return;
    }

    const reportWebVitals = async (metric: WebVitalsMetric) => {
      // Map web vitals to our performance metric types
      let metricType = PerformanceMetricType.PageLoad;
      
      switch (metric.name) {
        case 'FCP': // First Contentful Paint
        case 'LCP': // Largest Contentful Paint
          metricType = PerformanceMetricType.PageLoad;
          break;
        case 'FID': // First Input Delay
        case 'CLS': // Cumulative Layout Shift
          metricType = PerformanceMetricType.Animation;
          break;
        case 'TTFB': // Time To First Byte
          metricType = PerformanceMetricType.ApiCall;
          break;
      }
      
      // Record measurement in our performance system
      recordMeasurement(
        metric.name, 
        metric.value, 
        metricType, 
        { id: metric.id, rating: metric.rating }
      );

      // If custom callback provided, report there too
      if (typeof reportCallback === 'function') {
        reportCallback(metric);
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.debug(
          `Web Vitals: ${metric.name} - ${metric.value} (${metric.rating})`
        );
      }
    };

    // Dynamic import of web-vitals library to reduce bundle size
    import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onFCP }) => {
      // Core Web Vitals
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onLCP(reportWebVitals);
      
      // Additional metrics
      onTTFB(reportWebVitals);
      onFCP(reportWebVitals);
    });
  }, [reportCallback]);
}