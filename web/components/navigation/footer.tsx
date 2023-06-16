import Link from 'next/link';
import React from 'react';

import NavLink from '~/components/common/navLink';

export const Footer: React.FC = () => (
  <footer className='flex items-center justify-center text-3xl md:mb-0 lg:mx-0 '>
    <div className='m-10 mt-0 w-full grid-cols-3 md:grid'>
      <div>
        <p>Anton Werschinin</p>
        <p>Fullstack developer</p>
      </div>

      <div className='my-4 flex flex-row md:my-0 md:justify-center'>
        <div>
          <Link
            className='link-underline-reverse link-underline-black mr-4 cursor-pointer'
            href='https://github.com/qnton'
            scroll={false}
            target={'_blank'}
          >
            Github
          </Link>
          <Link
            className='link-underline-reverse link-underline-black mr-4 cursor-pointer'
            href='https://www.linkedin.com/in/qnton'
            scroll={false}
            target={'_blank'}
          >
            LinkedIn
          </Link>
          <Link
            className='link-underline-reverse link-underline-black cursor-pointer'
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
          <NavLink
            href='/legal-disclosure'
            text='Legal disclosure'
          />
        </div>
        <p className='md:text-right'>© 2023</p>
      </div>
    </div>
  </footer>
);

export default Footer;
