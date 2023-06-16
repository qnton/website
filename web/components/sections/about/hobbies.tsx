import React from 'react';

export const AboutHobbiesComponent: React.FC = () => (
  <section
    className='mx-5 flex flex-col items-center justify-center text-center lg:mx-0'
    data-scroll
  >
    <div className='text-left text-xl md:max-w-4xl md:text-2xl'>
      <p className='mb-4 text-4xl md:text-6xl'>MUSIC, SPORTS AND NATURE</p>
      <p className='mb-4 text-gray-300'>
        Music is a big part of my life and I am always on the lookout for new
        artists and genres to add to my playlist. I am particularly drawn to
        indie pop, rap, and hip hop. According to my Spotify Wrapped for 2022, I
        listened to 202,992 minutes of music.
      </p>

      <p className='mb-4 text-gray-300'>
        Working out is also important to me as it helps to improve my physical
        and mental health. I find that regular exercise helps me to feel
        energized and focused, and it also has a positive impact on my overall
        well-being.
      </p>
      <p className='text-gray-300'>
        Nature is something that brings me a sense of peace and helps me to
        relax and recharge. I try to spend time in nature as often as I can, as
        it allows me to clear my mind and find calm.
      </p>
    </div>
  </section>
);

export default AboutHobbiesComponent;
