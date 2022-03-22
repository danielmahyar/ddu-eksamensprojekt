/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

const useEventListener = (
  eventType: string,
  callback: any,
  element = window
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: any) => callback.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
};

export default useEventListener;
