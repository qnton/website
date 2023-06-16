import React from 'react';

interface TitleProps {
  children: React.ReactNode | React.ReactNode[] | string;
}

export const Title: React.FC<TitleProps> = (props) => {
  const { children } = props;

  return (
    <div>
      <h1 className='absolute left-72 top-10 hidden text-3xl lg:block'>
        {children}
      </h1>
    </div>
  );
};

export default Title;
