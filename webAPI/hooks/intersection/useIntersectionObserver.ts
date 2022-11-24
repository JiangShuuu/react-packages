import { useEffect, useRef } from "react";

export function useIntersectionObserver(cb: IntersectionObserverCallback, options?:any)  {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    if (window) {
      observerRef.current = new IntersectionObserver(cb, {
        ...options,
        root: options.root.current || null
      });
      if (targetRef.current) {
        observerRef.current.observe(targetRef.current);
      }
    }

    return () => {
      if (observerRef.current === null || targetRef.current === null) return
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observerRef.current.unobserve(targetRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return targetRef;
}
