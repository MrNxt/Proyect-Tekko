import { useEffect } from 'react';
import Lenis from 'lenis'

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
     autoRaf: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};
