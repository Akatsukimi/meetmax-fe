import { useEffect, useRef, DependencyList } from 'react';

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList = [],
) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    const t = setTimeout(() => {
      fnRef.current();
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitTime, ...deps]);
}
