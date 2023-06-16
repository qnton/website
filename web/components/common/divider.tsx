import React from 'react';

interface DividerProps {
  children?: string | React.ReactNode | React.ReactNode[];
  id?: string;
}

export const Divider: React.FC<DividerProps> = (props) => {
  const { children, id } = props;

  return (
    <div
      className='flex items-center pb-5v pt-15v lg:pb-10v lg:pt-20v'
      id={id ? `anchor-${id}` : undefined}
    >
      <div className='h-0.5 w-8 bg-white' />
      {children && <div className='ml-2'>{children}</div>}
    </div>
  );
};

export default Divider;
