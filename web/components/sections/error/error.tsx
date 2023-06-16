import Link from 'next/link';
import React from 'react';

export const Error: React.FC = () => (
  <section className='flex min-h-screen flex-col items-center justify-center text-center'>
    <h1 className='mb-4 text-9xl leading-tight'>404</h1>

    <Link
      className='link-underline link-underline-black lg:link-underline cursor-pointer text-3xl'
      href='/'
      scroll={false}
    >
      TAKE ME HOME
    </Link>
  </section>
);

export default Error;
