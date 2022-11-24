import React, { useState, useRef, useCallback } from 'react';
import useBookSearch from '../../hooks/intersection/useBookSearch';

export default function Intersection01() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { books, hasMore, loading, error } = useBookSearch(query, pageNumber);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && hasMore) {
          console.log('Visible');
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [loading, hasMore]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <>
      <input type='text' value={query} onChange={handleSearch} />
      <div className='list'>
        {books.map((book, idx) => {
          if (books.length === idx + 1) {
            return (
              <div ref={lastBookElementRef} className='list_item' key={idx}>
                {book}
              </div>
            );
          } else {
            return (
              <div className='list_item' key={idx}>
                {book}
              </div>
            );
          }
        })}
      </div>
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}
