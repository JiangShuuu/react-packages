import React from 'react';
import { gql, request } from 'graphql-request';
import Link from 'next/link';
import { useGQLQuery, graphQLClient } from '../../plugin/useGQLQuery';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { GetServerSidePropsContext } from 'next';

const GQL_EXAMPLE = gql`
  query {
    audiobook(id: 130) {
      title
    }
  }
`;

const getPast = async () => {
  const data = await graphQLClient.request(GQL_EXAMPLE);
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

export default function ssr() {
  const { data, isLoading, isError } = useGQLQuery(['abc'], GQL_EXAMPLE, null, {
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000
  });

  if (isLoading || isError) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <main>
        <header>
          <Link href='/'>Home</Link>
          <Link href='/axios'>Axios</Link>
        </header>
        <nav>
          <Link href='/gql'>GQL static Data</Link>
          <Link href='/gql/ssr'>GQL SSR</Link>
        </nav>
        <h1>GQL SSG Data</h1>
        <div>{data.audiobook.title}</div>
      </main>
    </div>
  );
}
