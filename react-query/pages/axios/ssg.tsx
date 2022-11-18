import React from 'react';
import Link from 'next/link';

export default function ssg() {
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
        <div></div>
      </main>
    </div>
  );
}
