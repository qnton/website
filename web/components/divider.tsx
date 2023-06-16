import React from 'react';

interface DividerProps {
  title: string;
}

export const DividerComponent: React.FC<DividerProps> = (props) => {
  const { title } = props;

  return (
    <div className='flex items-center pb-8 pt-32 lg:pb-32 lg:pt-64'>
      <div className='h-0.5 w-8 bg-white' />

      <div className='ml-2'>{title}</div>
    </div>
  );
};

export default DividerComponent;
