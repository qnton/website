import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';

import { useStateContext } from './stateContext';

export const SmoothScrollContext = createContext({
  scroll: null,
});

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scroll, setScroll] = useState(null);
  const { setActiveSectionId } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if (scroll) {
      scroll.on('call', (callValue, way) => {
        if (way === 'enter') {
          setActiveSectionId(callValue);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll]);

  useEffect(() => {
    if (scroll) {
      if (router.asPath.includes('#')) {
        const id = router.asPath.split('#')[1];

        const section = document.querySelector(`#anchor-${id}`);

        scroll.scrollTo(section);
      }
    }
  }, [router, scroll]);

  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          const LocomotiveScroll = (await require('locomotive-scroll')).default;

          scroll && scroll.destroy();

          const newScroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]') ?? undefined,
            smooth: true,
            reloadOnContextChange: true,
          });

          setScroll(newScroll);
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    return () => {
      scroll && scroll.destroy();
    };
  }, [scroll]);

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

SmoothScrollContext.displayName = 'SmoothScrollContext';
SmoothScrollProvider.displayName = 'SmoothScrollProvider';
