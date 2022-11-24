import { useEffect, useRef, useCallback, useState} from "react";

export function useIntersectionObserver(cb: IntersectionObserverCallback, options?:any)  {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<Element | null>(null);

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
      if (observerRef.current === null || targetRef.current === null) return
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observerRef.current.unobserve(targetRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return targetRef;
}

export function useIntersectionInfinity(loading:boolean, hasMore:boolean) {
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBook = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && hasMore) {
          console.log('Visible');
          setPageNumber((prevPageNumber:number) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  )

  return lastBook
}
