import { useEffect, useState } from 'react';

export interface PerformanceMetrics {
  fcpMs: number | null;
  lcpMs: number | null;
  ttfbMs: number | null;
  domInteractiveMs: number | null;
}

export function usePerformance(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcpMs: null,
    lcpMs: null,
    ttfbMs: null,
    domInteractiveMs: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof performance === 'undefined') return;

    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const nav = navEntries[0];
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find((e) => e.name === 'first-contentful-paint');

    setMetrics((prev) => ({
      ...prev,
      fcpMs: fcpEntry ? Math.round(fcpEntry.startTime) : prev.fcpMs,
      ttfbMs: nav ? Math.round(nav.responseStart - nav.requestStart) : prev.ttfbMs,
      domInteractiveMs: nav ? Math.round(nav.domInteractive) : prev.domInteractiveMs,
    }));

    if (typeof PerformanceObserver !== 'undefined') {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const last = entries[entries.length - 1];
          if (last) {
            setMetrics((prev) => ({ ...prev, lcpMs: Math.round(last.startTime) }));
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        return () => lcpObserver.disconnect();
      } catch {
        // Ignore observer unsupported
      }
    }
  }, []);

  return metrics;
}

export default usePerformance;
