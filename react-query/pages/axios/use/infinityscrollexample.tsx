import React, { Fragment, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const fetchData = ({ pageParam = 1 }) => {
  return axios.get(`http://openlibrary.org/search.json?q=tests&limit=10&page=${pageParam}`);
};

export default function InfinityScrollexample() {
  const { ref, inView } = useInView();

  const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(['books'], fetchData, {
    staleTime: 10 * 1000,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      // 資料長度 return pageParam
      if (pages[pages.length - 1].data.docs.length >= 5) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    }
  });

  const books = data?.pages;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // // observer Ref
  // const observer = useRef<IntersectionObserver | null>(null);

  // // lastDom Ref
  // const lastBookRef = useCallback(
  //   (node: any) => {
  //     if (isFetching) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((enteries) => {
  //       if (enteries[0].isIntersecting && hasNextPage) {
  //         console.log('Visible');
  //         fetchNextPage();
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [isFetching, hasNextPage]
  // );

  return (
    <Infinity>
      <main className='mains'>
        <h2>Axios useInfinityQuery ScrollBar</h2>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/axios/use/infinityquery'>infinityButton</Link>
        </nav>
      </main>
      <div className='content'>
        <div className='box-1'>
          {isLoading && <h2>Loading...</h2>}

          {isError && <h2>Error...</h2>}
          {books &&
            books.map((item: any, idx: number) => {
              const docs = item.data.docs;
              return (
                <Fragment key={idx}>
                  {docs.map((book: any, idx: number) => {
                    if (docs.length === idx + 1) {
                      return (
                        <p key={idx} ref={ref} className='123'>
                          {book.title}
                        </p>
                      );
                    } else {
                      return <p key={idx}>{book.title}</p>;
                    }
                  })}
                </Fragment>
              );
            })}
        </div>
        {isFetching && isFetchingNextPage && <div>FetchingMore...</div>}
      </div>
    </Infinity>
  );
}

const Infinity = styled.div`
  .mains {
    all: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 2rem 0;
    border-bottom: 1px solid;
  }
  .content {
    .box-1 {
      width: 100%;
      height: 300px;
      overflow-y: scroll;
      border: 1px solid;
    }
    .btn {
      display: flex;
    }
  }
`;
