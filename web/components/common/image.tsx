import NextImage, { StaticImageData } from 'next/image';
import React from 'react';

interface ImageProps {
  image: StaticImageData;
  alt: string;
  className: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  const { image, alt, className } = props;

  return (
    <NextImage
      alt={alt}
      className={`${className} -my-16 object-cover`}
      data-scroll
      data-scroll-speed='-0.5'
      draggable='false'
      src={image}
      width={100000}
    />
  );
};

export default Image;

/*

import NextImage, { StaticImageData } from 'next/image';
import React from 'react';

interface ImageProps {
  image: StaticImageData;
  alt: string;
  className: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  const { image, alt, className } = props;

  const linkStyles = {
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  const hoverLinkStyles = {
    opacity: 1,
  };

  return (
    <div className='relative'>
      <NextImage
        alt={alt}
        className={`${className} -my-16 object-cover`}
        data-scroll
        data-scroll-speed='-0.5'
        draggable='false'
        src={image}
        width={100000}
      />
      <a
        className='absolute inset-0 my-16 flex items-center justify-center p-2 text-4xl'
        href='#'
        id='open-website'
        style={linkStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = hoverLinkStyles.opacity;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = linkStyles.opacity;
        }}
      >
        Open Schnelltest
      </a>
    </div>
  );
};

export default Image;

*/
