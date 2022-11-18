import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { useQuery } from '@tanstack/react-query';

const getData = async () => {
  const { data } = await axios.get('https://swapi.dev/api/people/9');
  return data;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getData();
  console.log('abc', data);
  return {
    props: {
      custmers: data
    }
  };
};

export default function ssg({ custmers }: any) {
  const { data, isLoading, isError } = useQuery({
    // cache 名稱
    queryKey: ['axios_ssg'],
    // fn
    queryFn: getData,
    // ssg 預設 data
    initialData: custmers,
    // 快取保留時間 10秒
    staleTime: 10 * 1000,
    // 切回換視窗即時更新
    refetchOnWindowFocus: true
  });

  if (isLoading) {
    return <h1>isLoading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  console.log('custumer', data);
  return (
    <div>
      <main>
        <header>
          <Link href='/'>Home</Link>
          <Link href='/gql'>GQL</Link>
        </header>
        <nav>
          <Link href='/axios'>Axios Static</Link>
          <Link href='/axios/ssr'>Axios SSR</Link>
        </nav>
        <h1>Axios SSG Data</h1>
        <div>{data.name}</div>
      </main>
    </div>
  );
}
