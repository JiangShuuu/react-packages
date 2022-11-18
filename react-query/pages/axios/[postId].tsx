import axios from 'axios';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useQuery, dehydrate, QueryClient } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

interface IParams extends ParsedUrlQuery {
  postId: string;
}

const getData = async (id?: string) => {
  const { data } = await axios.get(`https://swapi.dev/api/people/${id}`);
  return data;
};

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
  const queryClient = new QueryClient();

  const { postId } = context.params as IParams;

  if (!postId) {
    return {
      notFound: true
    };
  }

  const data = await queryClient.fetchQuery(['axios_ssg_path', postId], () => getData(postId));

  return {
    props: {
      custmers: data
    }
  };
};

export default function path({ custmers }: any) {
  const router = useRouter();
  const { postId } = router.query as IParams;

  const { data, isLoading, isError } = useQuery({
    // cache 名稱
    queryKey: ['axios_ssg_path', postId],
    // fn
    queryFn: () => getData(postId),

    /* 預設 data. 傳入props給的值 (不用hydrate的話要開啟)*/
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

        <div>{JSON.stringify(data)}</div>
      </main>
    </div>
  );
}
