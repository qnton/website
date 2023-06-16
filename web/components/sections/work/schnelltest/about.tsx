import Link from 'next/link';
import React from 'react';

export const WorkAboutSchnelltestComponent: React.FC = () => (
  <section className='mx-5 flex items-center justify-center lg:mx-0'>
    <div className='text-xl md:max-w-4xl md:text-2xl'>
      <p className='mb-4 text-4xl md:text-6xl'>
        Schnelltest is a frontend page for some COVID-19 testing centers
      </p>
      <p className='mb-4 text-gray-300'>
        Schnelltest is a frontend page for a COVID-19 testing center that allows
        users to view all testing products, and make appointments for testing.
        The project was assigned as soon as possible after the outbreak of the
        COVID-19 pandemic. An admin portal was developed to allow employes to
        view all the appointments in one place. Later on, the project was
        switched to a different booking portal, and a simple responsive and high
        performance frontend website was created, redirecting users to the new
        portal.
      </p>
      <p className='mb-4 text-gray-300'>
        The website was developed using the Laravel framework and the PayloadCMS
        content management system. The website&apos;s modular design allows for
        easy reuse in other testing centers.
      </p>
      <Link
        className='link-underline link-underline-black cursor-pointer'
        href='https://schnelltest-clp.de'
      >
        Visit Schnelltest (CLP)
      </Link>
    </div>
  </section>
);

export default WorkAboutSchnelltestComponent;
