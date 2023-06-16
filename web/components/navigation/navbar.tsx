import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import NavLink from '~/components/common/navLink';
import { useStateContext } from '~/components/common/stateContext';

interface MenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const MobileMenu: React.FC<MenuProps> = (props) => {
  const { isOpen, setIsOpen } = props;
  const { activeSectionId } = useStateContext();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          animate={{ opacity: 1 }}
          className='fixed top-0 z-50 h-full w-full bg-black'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ type: 'linear' }}
        >
          <div className='fixed left-5 top-10 z-10 flex h-full flex-col items-start text-7xl mix-blend-difference lg:left-10'>
            <div className='text-5xl md:text-6xl'>
              <NavLink
                active={false}
                href='#anchor-hero'
              >
                <p>Anton</p>
                <p>Werschinin</p>
              </NavLink>
            </div>
            <div className='absolute bottom-16 last:mb-0'>
              <div className='mb-4 flex'>
                <NavLink
                  active={activeSectionId === 'work'}
                  href='#anchor-work'
                  text='Work'
                />
              </div>
              <div className='mb-4 flex'>
                <NavLink
                  active={activeSectionId === 'services'}
                  href='#anchor-services'
                  text='Services'
                />
              </div>
              <div className='mb-4 flex'>
                <NavLink
                  active={activeSectionId === 'contact'}
                  href='#anchor-contact'
                  text='Contact'
                />
              </div>
            </div>
          </div>
          <button
            className='link-underline-black link-underline-reverse fixed right-5 top-10 z-10 flex cursor-pointer text-xl mix-blend-difference md:text-2xl lg:right-10'
            onClick={() => setIsOpen(!isOpen)}
          >
            Close
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export const Navbar: React.FC = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSectionId } = useStateContext();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  return (
    <>
      <MobileMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
      />
      <AnimatePresence>
        {!isMenuOpen && (
          <nav>
            <div className='fixed left-10 top-10 z-10 text-3xl text-white mix-blend-difference'>
              <NavLink
                active={false}
                href='#anchor-hero'
                text='Anton Werschinin'
              />
            </div>

            <div className='invisible fixed right-10 top-10 z-10 flex gap-4 text-3xl text-white mix-blend-difference lg:visible'>
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
              className='link-underline-black link-underline-reverse visible fixed right-10 top-10 z-10 flex cursor-pointer text-3xl text-white mix-blend-difference lg:invisible'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Menu
            </button>
          </nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
