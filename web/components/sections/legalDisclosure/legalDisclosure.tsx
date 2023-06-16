import Link from 'next/link';
import React from 'react';

export const LegalDisclosure: React.FC = () => (
  <section
    className='mx-10 flex flex-col items-center justify-center last:mb-0 lg:mx-0'
    data-scroll
    data-scroll-repeat
    id='legal-disclosure'
  >
    <div className='w-full md:max-w-7xl'>
      <p className='mb-8 text-7xl md:text-8xl'>Legal Disclosure</p>
      <p className='mb-4 text-5xl'>
        Information provided according to Sec. 5 German Telemedia Act (TMG):
      </p>
      <div className='mb-10 text-4xl text-gray-300'>
        <p>qnton</p>
        <p>Hinterm Wall 28a</p>
        <p>49681 Garrel</p>
        <p>GERMANY</p>
      </div>

      <p className='mb-4 text-5xl'>Contact:</p>
      <div className='text-4xl text-gray-300'>
        <p>
          E-Mail:{' '}
          <Link
            className='cursor-pointer'
            href='mailto:hello@qnt.one'
            scroll={false}
          >
            hello@qnt.one
          </Link>
        </p>
      </div>
    </div>
  </section>
);

export default LegalDisclosure;
