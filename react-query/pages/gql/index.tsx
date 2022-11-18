import Head from 'next/head';
import { gql } from 'graphql-request';
import { useGQLQuery } from '../useGQLQuery';
import Link from 'next/link';

const GQL_EXAMPLE = gql`
  query {
    program(id: 76) {
      cooperate
    }
  }
`;

export default function GQL() {
  const { data, isLoading, isError } = useGQLQuery(['index'], GQL_EXAMPLE, null, {
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
          <Link href='/gql/ssr'>SSR</Link>
          <Link href='/gql/ssg'>SSG</Link>
        </nav>
        <h1>GQL Static Data</h1>
        <div>{data.program.cooperate}</div>
      </main>
    </div>
  );
}
