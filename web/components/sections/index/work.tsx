import Link from 'next/link';
import React from 'react';

import { ImageComponent } from 'components/image';

import hankens from '../../../images/hankens.avif';
import schnelltest from '../../../images/schnelltest.avif';

export const IndexWorkComponent: React.FC = () => (
  <section>
    <div
      className='relative mx-5 mb-16 lg:mx-0 lg:mb-0'
      id='fixed-elements'
    >
      <div className='inset-x-0 mx-auto md:max-w-4xl lg:absolute'>
        <div
          className='py-0 text-xl md:text-2xl lg:w-1/2 lg:pt-10 lg:pr-10'
          data-scroll
          data-scroll-sticky
          data-scroll-target='#fixed-elements'
        >
          <p className='mb-4 text-4xl md:text-6xl'>schnelltest</p>

          <p className='mb-4 text-gray-300'>
            A frontend page for some COVID-19 testing centers.
          </p>

          <div className='mb-8 lg:mb-0'>
            <Link
              className='link-underline link-underline-black cursor-pointer'
              href='/work/schnelltest'
              scroll={false}
            >
              More about schnelltest
            </Link>
          </div>
        </div>
      </div>
      <div className='flex justify-center px-0 pb-0 lg:justify-end lg:px-10 lg:pt-10'>
        <div className='overflow-hidden md:max-w-4xl lg:w-1/2 lg:max-w-none'>
          <ImageComponent
            alt=''
            className='h-35'
            image={schnelltest}
          />
        </div>
      </div>
    </div>
    <div
      className='relative mx-5 lg:mx-0'
      id='fixed-elements2'
    >
      <div className='inset-x-0 mx-auto md:max-w-4xl lg:absolute'>
        <div
          className='py-0 text-xl md:text-2xl lg:w-1/2 lg:py-10 lg:pr-10'
          data-scroll
          data-scroll-sticky
          data-scroll-target='#fixed-elements2'
        >
          <p className='mb-4 text-4xl md:text-6xl'>hankens</p>

          <p className='mb-4 text-gray-300'>
            A website that allows users to find nearby COVID-19 testing centers.
          </p>

          <div className='mb-8 lg:mb-0'>
            <Link
              className='link-underline link-underline-black cursor-pointer'
              href='/work/hankens'
              scroll={false}
            >
              More about hankens
            </Link>
          </div>
        </div>
      </div>
      <div className='flex justify-center px-0 lg:justify-end lg:p-10'>
        <div className='overflow-hidden md:max-w-4xl lg:w-1/2 lg:max-w-none'>
          <ImageComponent
            alt=''
            className='h-35'
            image={hankens}
          />
        </div>
      </div>
    </div>
  </section>
);

export default IndexWorkComponent;
