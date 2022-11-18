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
  // const { data, isLoading, isError } = useQuery(['axios_ssg'], getData || custmers, {
  //   refetchOnWindowFocus: false,
  //   staleTime: 60 * 60 * 1000
  // });

  // if (isLoading) {
  //   return <h1>isLoading</h1>;
  // }

  // if (isError) {
  //   return <h1>Error</h1>;
  // }

  // console.log('custumer', data);
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
        <div>{custmers.name}</div>
      </main>
    </div>
  );
}
