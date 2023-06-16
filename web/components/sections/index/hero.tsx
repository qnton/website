import Link from 'next/link';
import React from 'react';

export const IndexHeroComponent: React.FC = () => (
  <section className='flex min-h-screen flex-col items-center justify-center text-center'>
    <h2 className='mb-4 text-xl text-gray-300 md:text-2xl'>
      WANT TO WORK TOGETHER?
    </h2>

    <h1 className='text-6xl leading-tight md:text-8xl lg:text-9xl'>
      <Link
        className='link-underline-medium link-underline-black lg:link-underline-semi cursor-ne-resize'
        href='mailto:hello@qnt.one'
        scroll={false}
      >
        HELLO@&#8203;QNT.ONE
      </Link>
    </h1>
  </section>
);

export default IndexHeroComponent;
