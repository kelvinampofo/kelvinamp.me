'use client';

import { useEffect, useState } from 'react';

export default function usePointerDeviceDetector() {
  const [isPointerDevice, setIsPointerDevice] = useState(true);

  useEffect(() => {
    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches); // update the state based on the media query result
    };

    const pointerMediaQuery = window.matchMedia('(pointer: fine)');

    // set the initial state based on the media query result
    setIsPointerDevice(pointerMediaQuery.matches);

    pointerMediaQuery.addEventListener('change', handlePointerChange);

    // cleanup function to remove the event listener when the component unmounts
    return () => {
      pointerMediaQuery.removeEventListener('change', handlePointerChange);
    };
  }, []);

  return isPointerDevice;
}
