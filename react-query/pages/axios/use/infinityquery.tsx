import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export default function infinityquery() {
  return (
    <Infinity>
      <main className='mains'>
        <h2>Axios useInfinityQuery</h2>
        <nav>
          <Link href='/'>Home</Link>
        </nav>
      </main>
      <div className='content'>
        <div className='box-1'>123</div>
        <div className='box-2'>456</div>
      </div>
    </Infinity>
  );
}

const Infinity = styled.div`
  .mains {
    all: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 2rem 0;
    border-bottom: 1px solid;
  }
  .content {
    display: flex;
    border: 1px solid;
    .box-1 {
      flex-basis: 50%;
    }
    .box-2 {
      flex-basis: 50%;
    }
  }
`;
