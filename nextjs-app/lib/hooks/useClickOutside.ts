import useEventListener from './useEventListener';

export default function useClickOutside(ref: any, cb: any) {
  if(typeof window === "undefined") return
  useEventListener('click', (e: any) => {
    if (ref.current == null || ref.current.contains(e.target)) return;
    cb();
  });
}
