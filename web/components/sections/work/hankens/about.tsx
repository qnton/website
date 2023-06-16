import Link from 'next/link';
import React from 'react';

export const WorkAboutHankensComponent: React.FC = () => (
  <section className='mx-5 flex items-center justify-center lg:mx-0'>
    <div className='text-xl md:max-w-4xl md:text-2xl'>
      <p className='mb-4 text-4xl md:text-6xl'>
        Efficient and User-Friendly COVID-19 Testing with Hankens-Testzentrum
      </p>

      <p className='mb-4 text-gray-300'>
        Hankens-Testzentrum is a website built using the React framework and
        designed with the TailwindCSS framework. It provides users with a
        convenient way to find nearby COVID-19 testing centers from the
        Hankens-Pharmacy to make appointments for testing.
      </p>
      <Link
        className='link-underline link-underline-black cursor-pointer'
        href='https://hankens-testzentrum.de'
      >
        Visit Hankens-Testzentrum
      </Link>
    </div>
  </section>
);

export default WorkAboutHankensComponent;
