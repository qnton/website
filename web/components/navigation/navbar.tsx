import { MenuComponent, NavLinkComponent } from '@qnton/components';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const NavbarComponent: React.FC = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ type: 'linear' }}
            >
              <div className='fixed left-5 top-10 z-10 text-xl text-white mix-blend-difference md:text-2xl lg:left-10'>
                <Link
                  className='link-underline-black link-underline-reverse cursor-pointer'
                  href='/'
                  scroll={false}
                >
                  Anton Werschinin
                </Link>
              </div>

              <div className='invisible fixed top-10 right-10 z-10 flex gap-4 text-white mix-blend-difference md:text-2xl lg:visible'>
                <NavLinkComponent
                  href='/about'
                  text='About'
                />
                <NavLinkComponent
                  href='mailto:hello@qnt.one'
                  text='Contact'
                />
              </div>

              <button
                className='link-underline-black link-underline-reverse visible fixed top-10 right-5 z-10 flex cursor-pointer text-xl text-white mix-blend-difference md:text-2xl lg:invisible lg:right-10'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Menu
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default NavbarComponent;
