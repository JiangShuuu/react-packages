import React, { useState } from 'react';
import useBookSearch from '../../hooks/intersection/useBookSearch';

export default function Intersection01() {
  const [query, setQuery] = useState('test');
  const { books, setPageNumber, loading, error, lastBookRef } = useBookSearch(query);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <>
      <h1>Infinity Loop</h1>
      <input type='text' value={query} onChange={handleSearch} />
      <div className='list'>
        {books.map((book, idx) => {
          if (books.length === idx + 1) {
            return (
              <div ref={lastBookRef} className='list_item' key={idx}>
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
