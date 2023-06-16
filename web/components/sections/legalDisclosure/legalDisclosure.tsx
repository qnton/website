import Link from 'next/link';
import React from 'react';

export const LegalDisclosureLegalDisclosureComponent: React.FC = () => (
  <section
    className='mx-5 flex flex-col items-center justify-center last:mb-0 lg:mx-0'
    data-scroll
    data-scroll-repeat
    id='legal-disclosure'
  >
    <div className='w-full md:max-w-6xl'>
      <p className='mb-8 text-4xl md:text-6xl'>Legal Disclosure</p>
      <p className='mb-4 text-3xl md:text-4xl'>
        Information provided according to Sec. 5 German Telemedia Act (TMG):
      </p>
      <div className='mb-8 text-xl text-gray-300 md:text-2xl'>
        <p>qnton</p>
        <p>Hinterm Wall 28a</p>
        <p>49681 Garrel</p>
        <p>GERMANY</p>
      </div>

      <p className='mb-4 text-3xl md:text-4xl'>Contact:</p>
      <div className='text-xl text-gray-300 md:text-2xl'>
        <p>
          E-Mail:{' '}
          <Link
            className='cursor-ne-resize'
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
export default LegalDisclosureLegalDisclosureComponent;
