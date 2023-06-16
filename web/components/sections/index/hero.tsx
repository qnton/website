import Link from 'next/link';
import React from 'react';

export const IndexHeroComponent: React.FC = () => {
  return (
    <section
      className='mx-5 flex items-center justify-center pt-30v lg:pt-40v'
      data-scroll
      data-scroll-call='hero'
      data-scroll-repeat
      id='anchor-hero'
    >
      <div className='w-full text-xl md:max-w-6xl md:text-2xl'>
        <p className='mb-6 text-4xl md:text-7xl'>
          Hey 👋, im Anton, designer, developer and music&shy;ian.
        </p>

        <p className='mb-4 text-gray-300 md:max-w-4xl'>
          I am a web developer and designer specializing in creating visually
          stunning and functional websites. My services include design,
          development, and optimization. I strive to create websites that meet
          the unique needs of my clients.
        </p>

        <Link
          className='link-underline link-underline-black cursor-pointer'
          href='/#contact'
          scroll={false}
        >
          Reach out to me
        </Link>
      </div>
    </section>
  );
};

export default IndexHeroComponent;
