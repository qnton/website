import { NavbarComponent, SmoothScrollProvider } from '@qnton/components';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProps } from 'next/app';
import React from 'react';

import '../styles/style.css';

export default function NextApp({ Component, pageProps, router }: AppProps) {
  return (
    <main>
      <AnimatePresence
        mode='wait'
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.header
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ type: 'linear', delay: 0.1 }}
        >
          <NavbarComponent />
        </motion.header>
      </AnimatePresence>
      <AnimatePresence
        mode='wait'
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          animate={{ opacity: 1 }}
          data-scroll-container
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key={router.pathname}
          transition={{ type: 'linear', delay: 0.1 }}
        >
          <SmoothScrollProvider>
            <div data-scroll-section>
              <Component {...pageProps} />
            </div>
          </SmoothScrollProvider>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
