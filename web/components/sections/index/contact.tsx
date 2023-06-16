import Link from 'next/link';
import React from 'react';

export const Contact: React.FC = () => (
  <section
    className='mx-10 flex flex-col items-center justify-center text-center'
    data-scroll
    data-scroll-call='contact'
    data-scroll-repeat
  >
    <div className='w-full text-left md:w-auto'>
      <h2 className='mb-4 text-4xl text-gray-300'>Let{"'"}s get in touch</h2>

      <h1 className='text-9xl leading-tight'>
        <Link
          className='link-underline-medium link-underline-black cursor-pointer'
          href='mailto:hello@qnt.one'
          scroll={false}
        >
          HELLO@&#8203;QNT.ONE
        </Link>
      </h1>
    </div>
  </section>
);

export default Contact;
