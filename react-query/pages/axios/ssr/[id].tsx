import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useQuery, dehydrate, QueryClient } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSideProps } from 'next';

const getData = async (id?: any) => {
  const { data } = await axios.get(`https://swapi.dev/api/people/${id}`);
  return data;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const id = Number(params && params.id);

  // 自訂 data, 丟出後要在下方自訂props接住
  // const data = await queryClient.fetchQuery(['axios_ssr_id'], getData(id));

  // hydrate, 省去 props 步驟
  await queryClient.fetchQuery(['axios_ssr_id'], () => getData(id));

  return {
    props: {
      // custmers: data
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default function SSRID() {
  const [follow, setFollow] = useState(false);
  const { data, isLoading, isError } = useQuery({
    // cache 名稱
    queryKey: ['axios_ssr_id'],
    // fn
    queryFn: getData,

    /* 預設 data. 傳入props給的值 (不用hydrate的話要開啟)
    initialData: custmers, */

    // 快取保留時間 20秒
    staleTime: 20 * 1000,
    // 切回換視窗,頁面即時更新
    refetchOnWindowFocus: false,
    // 定義輸出資料
    select: (data) => {
      return {
        id: data.name,
        num: data.height
      };
    }
  });

  if (isLoading) {
    return <h1>isLoading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <main>
        <header>
          <Link href='/'>Home</Link>
          <Link href='/gql'>GQL</Link>
        </header>
        <nav>
          <Link href='/axios'>Axios Static</Link>
          <Link href='/axios/ssg'>Axios SSG</Link>
          <Link href='/axios/1'>Axios SSG & Path</Link>
        </nav>
        {follow ? <p>follow</p> : <p>unFollow</p>}
        <button onClick={() => setFollow(!follow)}>按我</button>
        <h1>Axios SSR Data</h1>
        <div>{data.id}</div>
        <div>{data.num}</div>
        <div>
          <p>{JSON.stringify(data)}</p>
        </div>
      </main>
    </div>
  );
}
