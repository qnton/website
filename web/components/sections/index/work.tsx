import { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

import Image from '~/components/common/image';
import hankens from '~/images/hankens.webp';
import hm from '~/images/hm-med.webp';
import schnelltest from '~/images/schnelltest.webp';

const WorkComponent = ({
  title,
  description,
  role,
  year,
  image,
  link,
  stack,
}: {
  title: string;
  description: string;
  role: string;
  year: string;
  image: StaticImageData;
  link: string;
  stack: string;
}) => {
  return (
    <section
      className='mx-10 mb-10v flex flex-col items-center justify-center last:mb-0'
      data-scroll
      data-scroll-call='work'
      data-scroll-repeat
    >
      <div className='relative grid overflow-hidden'>
        <div className='inset-x-0 mx-auto h-full md:max-w-7xl lg:absolute'>
          <div className='flex h-full flex-col justify-between py-0 text-4xl lg:w-1/2 lg:pr-10'>
            <div className='mb-8'>
              <p className='mb-8 text-7xl md:text-8xl'>{title}</p>
              <p className='text-gray-300'>{description}</p>
            </div>
            <div className='mb-4 lg:mb-0'>
              <div className='flex justify-between'>
                <p>Stack</p>
                <p>{stack}</p>
              </div>
              <hr className='my-4' />
              <div className='flex justify-between'>
                <p>Role</p>
                <p>{role}</p>
              </div>
              <hr className='my-4' />
              <div className='flex justify-between'>
                <p>Year</p>
                <p>{year}</p>
              </div>
              <hr className='mt-4' />
            </div>
          </div>
        </div>
        <div className='flex justify-center px-0 pb-0 lg:justify-end'>
          <div className='overflow-hidden shadow-2xl lg:w-1/2 lg:max-w-none'>
            <Link
              className='cursor-pointer'
              href={link}
              scroll={false}
              target='_blank'
            >
              <Image
                alt=''
                className='h-60v max-h-80 min-h-50'
                image={image}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Work: React.FC = () => {
  return (
    <>
      <WorkComponent
        description='Design and development were done for Covid-19 testing centers in Cloppenburg and Sandkrug, both cities in lower saxony, Germany.'
        image={schnelltest}
        link='https://schnelltest-clp.de'
        role='Design & Development'
        stack='Laravel, TailwindCSS'
        title='Schnelltest'
        year='2020'
      />
      <WorkComponent
        description='A cutting-edge website, showcasing their advanced solutions in prosthetics rental to revolutionize the healthcare industry.'
        image={hm}
        link='https://hm-medizintechnik.de'
        role='Consulting & Development'
        stack='Next.js, TailwindCSS'
        title='HM-Medizintechnik'
        year='2023'
      />
      <WorkComponent
        description='Hankens Testzentrum is a website that allows users to find nearby COVID-19 testing centers and make appointments for testing.'
        image={hankens}
        link='https://hankens-testzentrum.de'
        role='Design & Development'
        stack='React, TailwindCSS'
        title='Hankens'
        year='2022'
      />
    </>
  );
};

export default Work;
