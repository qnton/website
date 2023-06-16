import React, { useState } from 'react';

const Accordion = ({ sections }: any) => {
  const [activeSectionId, setActiveSectionId] = useState(0);

  const handleClick = (id: React.SetStateAction<number>) => {
    setActiveSectionId(activeSectionId === id ? null : id);
  };

  return (
    <ul>
      {sections.map(
        (
          section: {
            title: string;
            content: string;
          },
          index: number,
        ) => (
          <li
            className='relative border-b border-gray-200'
            key={index}
          >
            <button
              className='w-full py-8 text-left'
              type='button'
              onClick={() => handleClick(index)}
            >
              <div className='flex items-center justify-between'>
                <span>{section.title}</span>
                <span
                  className={`${
                    activeSectionId === index ? 'rotate-0' : 'rotate-45'
                  } text-lg transition-all duration-100`}
                >
                  &#9587;
                </span>
              </div>
            </button>

            <div
              className={`${
                activeSectionId === index ? 'max-h-96' : 'max-h-0'
              } relative overflow-hidden transition-all duration-700`}
            >
              <div className='mb-8 text-gray-300'>
                <p className='md:max-w-4xl'>{section.content}</p>
              </div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};

export const Services: React.FC = () => {
  const sections = [
    {
      title: 'Front-end development',
      content:
        'I specialize in the design and development of website user interfaces using modern frameworks and libraries.',
    },
    {
      title: 'Back-end development',
      content:
        'I am experienced in the development on the server-side of websites, as well as database technologies.',
    },
    {
      title: 'Consulting',
      content:
        'I provide technology and design guidance to help businesses achieve their goals. My expertise in both areas allows me to offer comprehensive solutions for your needs.',
    },
  ];

  return (
    <section
      className='mx-5 flex items-center justify-center'
      data-scroll
      data-scroll-call='services'
      data-scroll-repeat
    >
      <div className='w-full text-left text-xl md:max-w-6xl md:text-2xl'>
        <p className='mb-6 text-4xl md:text-7xl'>Services</p>
        <p className='mb-4 text-gray-300 md:max-w-4xl'>
          Elevating your web presence with expert services in frontend and
          backend development, as well as strategic consulting.
        </p>
        <Accordion sections={sections} />
      </div>
    </section>
  );
};

export default Services;
