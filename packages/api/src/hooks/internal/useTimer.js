import { useEffect } from 'react';

export default function useTimer(at, fn) {
  useEffect(() => {
    if (typeof at === 'number') {
      const ms = Math.max(0, at - Date.now());

      // useEffect() is running after yielding to sync code via setImmediate (IE), MessageChannel (4ms), or setTimeout.
      // Thus, when calling setTimeout(..., 0), under Lolex, it will be waited for another loop.
      // In other words, setTimeout(..., 0) won't fire right away. It will be fired after clock.tick(<any number>).
      if (ms) {
        const timeout = setTimeout(fn, ms);

        return () => clearTimeout(timeout);
      }

      fn();
    }
  }, [at, fn]);
}
