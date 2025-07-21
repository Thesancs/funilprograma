"use client";

import { useState, useEffect, useCallback } from 'react';

export function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  const tick = useCallback(() => {
    setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  useEffect(() => {
    const timer = setInterval(tick, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        // To be accurate, we should ideally calculate the time passed
        // while the tab was hidden, but for this use case, restarting is fine.
        const newTimer = setInterval(tick, 1000);
        (window as any).timer = newTimer;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    (window as any).timer = timer;

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tick]);

  const minutos = Math.floor(secondsLeft / 60);
  const segundos = secondsLeft % 60;
  const acabou = secondsLeft === 0;

  return { minutos, segundos, acabou };
}
