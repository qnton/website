import { NavLink, useStateContext } from '@qnton/components';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface MenuProps {
  isOpen: boolean;
  setIsOpen: any;
}

export const MenuComponent: React.FC<MenuProps> = (props) => {
  const { isOpen, setIsOpen } = props;
  const { activeSectionId } = useStateContext();

  return (
    <nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ type: 'linear' }}
          >
            <div className='fixed top-0 z-20 h-full w-full bg-black'>
              <div className='fixed left-5 top-10 z-10 flex h-full flex-col items-start text-3xl mix-blend-difference md:text-4xl lg:left-10'>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MenuComponent;
