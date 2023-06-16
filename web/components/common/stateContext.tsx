import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext({
  activeSectionId: '',
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setActiveSectionId: (_activeSectionId: string) => {},
});

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeSectionId, setActiveSectionId] = useState('');

  const router = useRouter();

  useEffect(() => {
    setActiveSectionId('');
  }, [router.asPath]);

  return (
    <StateContext.Provider value={{ activeSectionId, setActiveSectionId }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('useStateContext must be used within StateContextProvider');
  }

  return context;
};
