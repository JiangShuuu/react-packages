import axios from 'axios';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useQuery, dehydrate, QueryClient } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
  postId: string;
}

// const getData = async (id?: number) => {
//   const { data } = await axios.get(`https://swapi.dev/api/people/${id}`);
//   return data;
// };

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { postId: '1' }
      },
      {
        params: { postId: '2' }
      },
      {
        params: { postId: '3' }
      }
    ],
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { postId } = context.params as IParams;
  console.log('aaa', postId);

  if (!postId) {
    return {
      notFound: true
    };
  }

  const { data } = await axios.get(`https://swapi.dev/api/people/${postId}`);

  return {
    props: {
      custmers: data
    }
  };
};

export default function path({ custmers }: any) {
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
          <Link href='/axios/ssg'>Axios SSG</Link>
        </nav>
        <nav>
          <Link href='/axios/1'>01</Link>
          <Link href='/axios/2'>02</Link>
          <Link href='/axios/3'>03</Link>
          <Link href='/axios/4'>04</Link>
        </nav>
        <h1>Axios SSG & Paths Data</h1>

        <div>{JSON.stringify(custmers)}</div>
      </main>
    </div>
  );
}
