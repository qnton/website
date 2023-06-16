import Link from 'next/link';
import React from 'react';

export const ErrorComponent: React.FC = () => (
  <section className='flex min-h-screen flex-col items-center justify-center text-center'>
    <h1 className='mb-4 text-6xl leading-tight md:text-8xl lg:text-9xl'>404</h1>

    <Link
      className='link-underline link-underline-black lg:link-underline cursor-pointer text-xl md:text-2xl'
      href='/about'
      scroll={false}
    >
      TAKE ME HOME
    </Link>
  </section>
);

export default ErrorComponent;
