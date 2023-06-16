import React from 'react';

interface TitleProps {
  title: string;
}

export const TitleComponent: React.FC<TitleProps> = (props) => {
  const { title } = props;

  return (
    <div>
      <h1 className='absolute top-10 left-60 hidden text-2xl lg:block'>
        {title}
      </h1>
    </div>
  );
};

export default TitleComponent;
