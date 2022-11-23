import { useEffect, useRef } from "react";

export function useIntersectionObserver(cb:any, options:any) {
  const observerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (window) {
      observerRef.current = new IntersectionObserver(cb, {
        ...options,
        root: options?.root?.current || null
      });
      if (targetRef.current) {
        observerRef.current.observe(targetRef.current);
      }
    }

    return () => {
      observerRef.current.unobserve(targetRef.current);
    };
  }, []);

  return targetRef;
}
