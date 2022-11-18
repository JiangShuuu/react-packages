import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { useQuery, dehydrate, QueryClient } from '@tanstack/react-query';

const getData = async () => {
  const { data } = await axios.get('https://swapi.dev/api/people/9');
  return data;
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  // 自訂 data, 丟出後要在下方自訂props接住
  // const data = await queryClient.fetchQuery(['axios_ssg'], getData);

  // hydrate, 省去 props 步驟
  await queryClient.fetchQuery(['axios_ssg'], getData);

  return {
    props: {
      // custmers: data,
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default function ssg({ custmers }: any) {
  const { data, isLoading, isError } = useQuery({
    // cache 名稱
    queryKey: ['axios_ssg'],
    // fn
    queryFn: getData,

    /* 預設 data. 傳入props給的值 (不用hydrate的話要開啟)
    initialData: custmers, */

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
          <Link href='/axios/1'>Axios SSG & Path</Link>
        </nav>
        <h1>Axios SSG Data</h1>
        <div>{data.name}</div>
      </main>
    </div>
  );
}
