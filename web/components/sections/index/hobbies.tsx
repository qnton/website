import Link from 'next/link';
import React from 'react';

export const IndexHobbiesComponent: React.FC = () => (
  <section
    className='mx-5 flex items-center justify-center lg:mx-0'
    data-scroll
  >
    <div className='text-left text-xl md:max-w-4xl md:text-2xl'>
      <p className='mb-4 text-4xl md:text-6xl'>MUSIC, SPORTS AND NATURE</p>
      <p className='mb-4 text-gray-300'>
        I have a passion for music and sports. When I am not creating visually
        stunning and functional websites, you can find me working out or
        enjoying the beauty of nature.
      </p>
      <Link
        className='link-underline link-underline-black cursor-pointer'
        href='/about'
        scroll={false}
      >
        More about myself
      </Link>
    </div>
  </section>
);

export default IndexHobbiesComponent;
