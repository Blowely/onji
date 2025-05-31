import { useCallback, useEffect, useRef } from 'react';

export function useOptimizedScroll(callback, deps = []) {
  const timeoutRef = useRef();
  const lastScrollTime = useRef(0);

  const throttledCallback = useCallback((...args) => {
    const now = Date.now();
    const THROTTLE_MS = 50; // 50ms throttle for smooth scrolling
    
    if (now - lastScrollTime.current > THROTTLE_MS) {
      lastScrollTime.current = now;
      callback(...args);
    }
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
      timeoutRef.current = requestAnimationFrame(throttledCallback);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [throttledCallback]);
}
