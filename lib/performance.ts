/**
 * Performance monitoring utilities
 * Used to measure and report key performance metrics
 */

// Enum for different performance metric types
export enum PerformanceMetricType {
  PageLoad = 'page_load',
  ComponentRender = 'component_render',
  Animation = 'animation',
  ApiCall = 'api_call',
  ResourceLoad = 'resource_load'
}

// Interface for performance measurement results
interface PerformanceResult {
  name: string;
  duration: number;
  type: PerformanceMetricType;
  timestamp: number;
  additionalInfo?: Record<string, unknown>;
}

// Store measurements for analysis
const measurements: PerformanceResult[] = [];

/**
 * Measures the execution time of a function
 * @param name Name of the operation being measured
 * @param fn Function to measure
 * @param type Type of performance metric
 * @returns The result of the measured function
 */
export function measurePerformance<T>(
  name: string, 
  fn: () => T, 
  type: PerformanceMetricType
): T {
  const startTime = performance.now();
  try {
    return fn();
  } finally {
    const endTime = performance.now();
    recordMeasurement(name, endTime - startTime, type);
  }
}

/**
 * Creates a performance measurement wrapper for async functions
 * @param name Name of the operation being measured
 * @param type Type of performance metric
 * @returns A decorator function that measures performance
 */
export function measureAsyncPerformance(
  name: string,
  type: PerformanceMetricType = PerformanceMetricType.ApiCall
) {
  return async (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: unknown[]) {
      const startTime = performance.now();
      try {
        return await originalMethod.apply(this, args);
      } finally {
        const endTime = performance.now();
        recordMeasurement(name, endTime - startTime, type);
      }
    };

    return descriptor;
  };
}

/**
 * Record a performance measurement
 */
export function recordMeasurement(
  name: string, 
  duration: number, 
  type: PerformanceMetricType, 
  additionalInfo?: Record<string, unknown>
) {
  const measurement: PerformanceResult = {
    name,
    duration,
    type,
    timestamp: Date.now(),
    additionalInfo
  };
  
  measurements.push(measurement);
  
  // Log if development environment
  if (process.env.NODE_ENV === 'development') {
    console.debug(`Performance [${type}]: ${name} took ${duration.toFixed(2)}ms`);
  }
  
  // Report slow operations
  if (duration > getThresholdForType(type)) {
    console.warn(`Slow performance detected [${type}]: ${name} took ${duration.toFixed(2)}ms`);
  }
}

/**
 * Get performance threshold for different operation types
 */
function getThresholdForType(type: PerformanceMetricType): number {
  switch(type) {
    case PerformanceMetricType.PageLoad:
      return 1000; // 1 second
    case PerformanceMetricType.ComponentRender:
      return 100; // 100ms
    case PerformanceMetricType.Animation:
      return 16; // ~60fps
    case PerformanceMetricType.ApiCall:
      return 500; // 500ms
    case PerformanceMetricType.ResourceLoad:
      return 300; // 300ms
    default:
      return 200;
  }
}

/**
 * Get all recorded performance measurements
 */
export function getAllMeasurements(): PerformanceResult[] {
  return [...measurements];
}

/**
 * Get performance measurements by type
 */
export function getMeasurementsByType(type: PerformanceMetricType): PerformanceResult[] {
  return measurements.filter(m => m.type === type);
}

/**
 * Analyze performance and return key metrics
 */
export function analyzePerformance() {
  if (measurements.length === 0) return null;
  
  const metricsByType = {} as Record<PerformanceMetricType, {
    count: number;
    totalDuration: number;
    averageDuration: number;
    minDuration: number;
    maxDuration: number;
  }>;
  
  // Initialize metrics
  Object.values(PerformanceMetricType).forEach(type => {
    metricsByType[type] = {
      count: 0,
      totalDuration: 0,
      averageDuration: 0,
      minDuration: Infinity,
      maxDuration: -Infinity
    };
  });
  
  // Calculate metrics
  measurements.forEach(m => {
    const metrics = metricsByType[m.type];
    metrics.count++;
    metrics.totalDuration += m.duration;
    metrics.minDuration = Math.min(metrics.minDuration, m.duration);
    metrics.maxDuration = Math.max(metrics.maxDuration, m.duration);
  });
  
  // Calculate averages
  Object.values(PerformanceMetricType).forEach(type => {
    const metrics = metricsByType[type];
    if (metrics.count > 0) {
      metrics.averageDuration = metrics.totalDuration / metrics.count;
    }
  });
  
  return metricsByType;
}

/**
 * Clear all performance measurements
 */
export function clearMeasurements() {
  measurements.length = 0;
}