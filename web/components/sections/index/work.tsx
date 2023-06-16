import Link from 'next/link';
import React from 'react';

import { ImageComponent } from 'components/image';

import hankens from '../../../images/hankens.webp';
import hm from '../../../images/hm-med.webp';
import schnelltest from '../../../images/schnelltest.webp';

const WorkComponent = ({
  title,
  description,
  role,
  year,
  image,
  link,
  classNameImage,
}: any) => {
  return (
    <section
      className='mx-5 mb-10v flex flex-col items-center justify-center last:mb-0'
      data-scroll
      data-scroll-call='work'
      data-scroll-repeat
    >
      <div className='relative grid overflow-hidden'>
        <div className='inset-x-0 mx-auto h-full md:max-w-6xl lg:absolute'>
          <div className='flex h-full flex-col justify-between py-0 text-xl md:text-2xl lg:w-1/2 lg:pr-10'>
            <div className='mb-8'>
              <p className='mb-4 text-4xl md:text-6xl'>{title}</p>
              <p className='text-gray-300'>{description}</p>
            </div>
            <div className='mb-4 lg:mb-0'>
              <div className='flex justify-between'>
                <p>Link</p>
                <Link
                  className='link-underline-reverse link-underline-black cursor-ne-resize'
                  href={link}
                  scroll={false}
                  target='_blank'
                >
                  {link.replace('https://', '')}
                </Link>
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
        <div className='flex justify-center px-0 pb-0 lg:justify-end lg:px-5'>
          <div
            className={
              `overflow-hidden shadow-2xl lg:w-1/2 lg:max-w-none ` +
              classNameImage
            }
          >
            <ImageComponent
              alt=''
              className='h-40'
              image={image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const IndexWorkComponent: React.FC = () => {
  return (
    <div>
      <WorkComponent
        classNameImage='shadow-stone-500/25'
        description='Design and development were done for Covid-19 testing centers in Cloppenburg and Sandkrug, both cities in lower saxony, Germany.'
        image={schnelltest}
        link='https://schnelltest-clp.de'
        role='Design & Development'
        title='Schnelltest'
        year='2020'
      />
      <WorkComponent
        classNameImage='shadow-neutral-300/25'
        description='A cutting-edge website, showcasing their advanced solutions in prosthetics rental to revolutionize the healthcare industry.'
        image={hm}
        link='https://hm-medizintechnik.de'
        role='Consulting & Development'
        title='HM-Medizintechnik'
        year='2023'
      />
      <WorkComponent
        classNameImage='shadow-stone-500/25'
        description='Hankens Testzentrum is a website that allows users to find nearby COVID-19 testing centers and make appointments for testing.'
        image={hankens}
        link='https://hankens-testzentrum.de'
        role='Design & Development'
        title='Hankens'
        year='2022'
      />
    </div>
  );
};

export default IndexWorkComponent;
