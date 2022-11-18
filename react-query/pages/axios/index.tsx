import React from 'react';
import Link from 'next/link';

export default function index() {
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
        </nav>
        <h1>Axios Static Data</h1>
        <div></div>
      </main>
    </div>
  );
}
