import { NavLinkComponent } from '@qnton/components';
import Link from 'next/link';
import React from 'react';

export const FooterComponent: React.FC = () => (
  <footer className='mx-5 flex items-center justify-center pb-10 text-xl md:mb-0 md:text-2xl lg:mx-0'>
    <div className='w-full grid-cols-3 md:grid md:max-w-4xl'>
      <div>
        <p>Anton Werschinin</p>
        <p>Fullstack developer</p>
      </div>

      <div className='my-4 flex flex-row last:mr-0 md:my-0 md:justify-center'>
        <div>
          <Link
            className='link-underline-reverse link-underline-black mr-6 cursor-ne-resize'
            href='https://github.com/qnton'
            scroll={false}
            target={'_blank'}
          >
            Github
          </Link>
          <Link
            className='link-underline-reverse link-underline-black mr-6 cursor-ne-resize'
            href='https://dev.to/qnton'
            scroll={false}
            target={'_blank'}
          >
            Blog
          </Link>
        </div>
      </div>

      <div>
        <div className='flex flex-row md:justify-end'>
          <NavLinkComponent
            href='/legal-disclosure'
            text='Legal disclosure'
          />
        </div>
        <p className='md:text-right'>© 2023</p>
      </div>
    </div>
  </footer>
);

export default FooterComponent;
