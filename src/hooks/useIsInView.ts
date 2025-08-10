import { useEffect, useState, RefObject } from 'react';

export function useIsInView(ref: RefObject<Element>, rootMargin = '0px') {
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || isInView) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin, isInView]);

  return isInView;
}
