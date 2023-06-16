import Link from 'next/link';
import React from 'react';

export const ContactComponent: React.FC = () => (
  <section
    className='mx-5 flex flex-col items-center justify-center text-center'
    data-scroll
    data-scroll-call='contact'
    data-scroll-repeat
  >
    <div className='w-full text-left md:w-auto'>
      <h2 className='mb-4 text-xl text-gray-300 md:text-2xl'>
        Let{"'"}s get in touch
      </h2>

      <h1 className='text-7xl leading-tight md:text-8xl lg:text-9xl'>
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

export default ContactComponent;
