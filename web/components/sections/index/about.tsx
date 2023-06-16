import Link from 'next/link';
import React from 'react';

export const IndexAboutComponent: React.FC = () => (
  <section className='mx-5 flex items-center justify-center lg:mx-0'>
    <div className='text-xl md:max-w-4xl md:text-2xl'>
      <p className='mb-4 text-4xl md:text-6xl'>
        Hey 👋, im Anton, designer, developer and music&shy;ian.
      </p>

      <p className='mb-4 text-gray-300'>
        I am a web developer and designer specializing in creating visually
        stunning and functional websites. My services include design,
        development, and optimization. I strive to create websites that meet the
        unique needs of my clients.
      </p>

      <Link
        className='link-underline link-underline-black cursor-pointer'
        href='/about'
        scroll={false}
      >
        More about me and services
      </Link>
    </div>
  </section>
);

export default IndexAboutComponent;
