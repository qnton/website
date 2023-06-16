import React from 'react';

export const AboutServicesComponent: React.FC = () => (
  <section
    className='mx-5 flex flex-col items-center justify-center text-center lg:mx-0'
    data-scroll
  >
    <div className='text-left text-xl md:max-w-4xl md:text-2xl'>
      <>
        <p className='mb-4 text-3xl'>Front-end development</p>

        <p className='text-gray-300'>
          I specialize in the design and development of website user interfaces
          using modern frameworks and libraries such as Next.js and TailwindCSS.
        </p>

        <hr className='my-8' />
      </>
      <>
        <p className='mb-4 text-3xl'>Back-end development</p>

        <p className='text-gray-300'>
          I am experienced in the development of server-side of websites using
          server-side languages like PHP, Typescript and C#, as well as database
          technologies such as MongoDB and MySQL.
        </p>

        <hr className='my-8' />
      </>

      <>
        <p className='mb-4 text-3xl'>Consulting</p>

        <p className='text-gray-300'>
          I provide technology and design guidance to help businesses achieve
          their goals. My expertise in both areas allows me to offer
          comprehensive solutions for your needs.
        </p>

        <hr className='my-8' />
      </>
    </div>
  </section>
);

export default AboutServicesComponent;
