import { useState, useEffect } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useRotatingText(headlines, interval = 3000) {
  const [index, setIndex] = useState(0);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || headlines.length <= 1) return undefined;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, interval);

    return () => clearInterval(timer);
  }, [headlines, interval, reducedMotion]);

  return reducedMotion ? 0 : index;
}
