import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useBookSearch(query: any, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
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

  return { loading, error, books, hasMore };
}
