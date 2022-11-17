import React from 'react';
import { gql, request } from 'graphql-request';
import Link from 'next/link';
import { useGQLQuery } from './useGQLQuery';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import styles from '../styles/Home.module.css';
import { GetServerSidePropsContext } from 'next';

const GQL_EXAMPLE = gql`
  query {
    audiobook(id: 130) {
      title
    }
  }
`;
const endpoint = process.env.NEXT_PUBLIC_API_GQL;

const getPast = async () => {
  const data = await request(`${endpoint}`, GQL_EXAMPLE);
  return data;
};

export async function getServerSideProps({}: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['abc'], getPast);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default function Audiobook({ props }: any) {
  console.log('111', props);
  const { data, isLoading, isError } = useGQLQuery(['abc'], GQL_EXAMPLE, null, {
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000
  });

  if (isLoading || isError) {
    return <div>Loading</div>;
  }

  return (
    <main className={styles.main}>
      <button>
        <Link href='/'>index</Link>
      </button>
      <div>audiobook</div>
      <div>{data.audiobook.title}</div>
    </main>
  );
}
