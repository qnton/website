import { ImageComponent } from '@qnton/components*';
import React from 'react';

import schnelltest from '../../../../images/schnelltest.avif';

export const WorkHeroSchnelltestComponent: React.FC = () => (
  <section className='mx-5 flex flex-col items-center justify-center pb-8 pt-32 lg:mx-0 lg:pb-32 lg:pt-64'>
    <div className='relative grid'>
      <div className='inset-x-0 mx-auto h-full md:max-w-4xl lg:absolute'>
        <div className='flex h-full flex-col justify-between py-0 text-xl md:text-2xl lg:w-1/2 lg:pr-10'>
          <div className='mb-8'>
            <p className='mb-4 text-4xl md:text-6xl'>schnelltest</p>
            <p className='text-gray-300'>
              Design and development were done for Covid-19 testing centers in
              Cloppenburg and Sandkrug, both cities in lower saxony, Germany.
            </p>
          </div>
          <div className='mb-16 lg:mb-0'>
            <div className='flex justify-between'>
              <p>Role</p>
              <p>Design & Development</p>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between'>
              <p>Year</p>
              <p>2020</p>
            </div>
            <hr className='mt-4' />
          </div>
        </div>
      </div>
      <div className='flex justify-center px-0 pb-0 lg:justify-end lg:px-10'>
        <div className='overflow-hidden md:max-w-4xl lg:w-1/2 lg:max-w-none'>
          <ImageComponent
            alt=''
            className='h-35'
            image={schnelltest}
          />
        </div>
      </div>
    </div>
  </section>
);

export default WorkHeroSchnelltestComponent;
