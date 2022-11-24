import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

export default function useBookSearch(query: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  // before data fetch
  useEffect(() => {
    setBooks([]);
  }, [query]);

  // data
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber, limit: 20 },
      cancelToken: new axios.CancelToken((c) => (cancel = c))
    })
      .then((res) => {
        const newBooks = [...res.data.docs.map((b: any) => b.title)];
        setBooks((prevBooks): any => [...prevBooks, ...newBooks]);
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [query, pageNumber]);

  // observer Ref
  const observer = useRef<IntersectionObserver | null>(null);

  // lastDom Ref
  const lastBookRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && hasMore) {
          console.log('Visible');
          setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  );

  return { loading, error, books, lastBookRef, pageNumber, setPageNumber };
}
