import { MenuComponent, NavLink, useStateContext } from '@qnton/components';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const NavbarComponent: React.FC = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSectionId } = useStateContext();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  return (
    <>
      <MenuComponent
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
      />
      <nav>
        <AnimatePresence>
          {!isMenuOpen && (
            <>
              <div className='fixed left-5 top-10 z-10 text-xl text-white mix-blend-difference md:text-2xl lg:left-10'>
                <NavLink
                  active={false}
                  href='#anchor-hero'
                  text='Anton Werschinin'
                />
              </div>

              <div className='invisible fixed right-10 top-10 z-10 flex gap-4 text-white mix-blend-difference md:text-2xl lg:visible'>
                <NavLink
                  active={activeSectionId === 'work'}
                  href='#anchor-work'
                  text='Work'
                />
                <NavLink
                  active={activeSectionId === 'services'}
                  href='#anchor-services'
                  text='Services'
                />
                <NavLink
                  active={activeSectionId === 'contact'}
                  href='#anchor-contact'
                  text='Contact'
                />
              </div>

              <button
                className='link-underline-black link-underline-reverse visible fixed right-5 top-10 z-10 flex cursor-pointer text-xl text-white mix-blend-difference md:text-2xl lg:invisible lg:right-10'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Menu
              </button>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default NavbarComponent;
