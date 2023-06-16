import Link from 'next/link';
import React from 'react';

export const AboutContactComponent: React.FC = () => (
  <section className='mx-5 flex flex-col items-center justify-center text-center lg:mx-0'>
    <div className='w-full text-left md:max-w-4xl'>
      <h2 className='mb-4 text-xl text-gray-300 md:text-2xl'>
        LETS GET IN TOUCH
      </h2>

      <h1 className='text-6xl leading-tight lg:text-8xl'>
        <Link
          className='link-underline-medium link-underline-black lg:link-underline-semi cursor-ne-resize'
          href='mailto:hello@qnt.one'
          scroll={false}
        >
          HELLO@&#8203;QNT.ONE
        </Link>
      </h1>
    </div>
  </section>
);

export default AboutContactComponent;
