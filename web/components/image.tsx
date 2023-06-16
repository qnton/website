import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ImageProps {
  image: StaticImageData;
  alt: string;
  className: string;
}

export const ImageComponent: React.FC<ImageProps> = (props) => {
  const { image, alt, className } = props;

  return (
    <Image
      alt={alt}
      className={`${className} -my-16 object-cover`}
      data-scroll
      data-scroll-speed='-0.5'
      src={image}
    />
  );
};

export default ImageComponent;
