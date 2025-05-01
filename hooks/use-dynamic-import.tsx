import { useEffect, useState } from 'react';

/**
 * A hook that dynamically imports a component when needed
 * This helps with code splitting and reduces initial bundle size
 * 
 * @param importFn - Dynamic import function (e.g., () => import('@/components/HeavyComponent'))
 * @param options - Additional options like loading state delays
 * @returns An object with the dynamically loaded component and loading state
 */
export function useDynamicImport<T>(
  importFn: () => Promise<{ default: T }>,
  options: {
    loadingDelay?: number; // Delay before showing loading state (prevents flickering for fast loads)
    immediate?: boolean; // Whether to load immediately or defer
  } = { loadingDelay: 200, immediate: true }
) {
  const [component, setComponent] = useState<T | null>(null);
  const [loading, setLoading] = useState(options.immediate);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!options.immediate) return;
    
    let isMounted = true;
    let loadingTimeout: NodeJS.Timeout | undefined;

    // Set loading state after a small delay to prevent flickering
    if (options.loadingDelay) {
      loadingTimeout = setTimeout(() => {
        if (isMounted) setLoading(true);
      }, options.loadingDelay);
    }

    // Import the component
    importFn()
      .then((module) => {
        if (isMounted) {
          setComponent(module.default);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
          console.error('Error dynamically importing component:', err);
        }
      });

    return () => {
      isMounted = false;
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };
  }, [importFn, options.immediate, options.loadingDelay]);

  // Manually trigger loading
  const load = () => {
    if (component) return; // Already loaded

    setLoading(true);
    importFn()
      .then((module) => {
        setComponent(module.default);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error('Error dynamically importing component:', err);
      });
  };

  return { component, loading, error, load };
}