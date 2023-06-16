import React from 'react';

export const AboutAboutComponent: React.FC = () => (
  <section
    className='mx-5 lg:mx-0'
    data-persistent
    id='about'
  >
    <div className='inset-x-0 mx-auto md:max-w-4xl lg:absolute'>
      <div
        className='lg:w-1/2'
        data-scroll
        data-scroll-sticky
        data-scroll-target='#about'
      >
        <p className='mb-8 pr-0 text-4xl md:text-6xl lg:mb-0 lg:py-40 lg:pr-8'>
          Mastering the Art of Web Development
        </p>
      </div>
    </div>
    <div className='mx-auto max-w-4xl'>
      <div className='ml-auto flex flex-col justify-center text-xl text-gray-300 md:text-2xl lg:w-1/2 lg:py-40'>
        <p className='mb-4'>
          I have been interested in coding since a young age and have since
          become a skilled web developer. I have a passion for creating visually
          stunning and functional websites, and I enjoy using my skills to help
          my clients achieve their goals. I specialize in design, development,
          and optimization, and I am always striving to learn and improve my
          skills in these areas.
        </p>
        <p className=''>
          With my extensive experience in coding, I am confident in my ability
          to deliver high-quality results for my clients.
        </p>
      </div>
    </div>
  </section>
);
export default AboutAboutComponent;
