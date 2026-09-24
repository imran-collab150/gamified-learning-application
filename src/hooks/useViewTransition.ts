import { useCallback, useRef } from 'react';

export function useViewTransition() {
  const ref = useRef<boolean>(false);

  const navigate = useCallback((callback: () => void) => {
    if (document.startViewTransition && !ref.current) {
      ref.current = true;
      document.startViewTransition(() => {
        callback();
        requestAnimationFrame(() => {
          ref.current = false;
        });
      });
    } else {
      callback();
    }
  }, []);

  return { navigate };
}

export function withViewTransition(callback: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
}
