import React from 'react';

interface DividerProps {
  title: string;
  id?: string;
}

export const DividerComponent: React.FC<DividerProps> = (props) => {
  const { title, id } = props;

  return (
    <div
      className='flex items-center pb-5v pt-15v lg:pb-10v lg:pt-20v'
      id={`anchor-${id || ''}`}
    >
      <div className='h-0.5 w-8 bg-white' />
      <div className='ml-2'>{title}</div>
    </div>
  );
};

export default DividerComponent;
