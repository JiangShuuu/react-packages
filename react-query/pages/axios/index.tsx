import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getData = async () => {
  const { data } = await axios.get('https://swapi.dev/api/people/9');
  return data;
};

export default function index() {
  const { data, isLoading, isError } = useQuery(['static_axios'], getData);
  console.log(data);

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
          <Link href='/axios/ssr'>Axios SSR</Link>
          <Link href='/axios/ssg'>Axios SSG</Link>
          <Link href='/axios/1'>Axios SSG & Path</Link>
        </nav>
        <h1>Axios Static Data</h1>
        <div>{data.name}</div>
      </main>
    </div>
  );
}
