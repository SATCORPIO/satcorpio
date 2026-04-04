import { useEffect } from 'react';

interface UseBootSequenceOptions {
  delay?: number;
}

export function useBootSequence(elementRef: HTMLElement | null, options: UseBootSequenceOptions = {}) {
  const { delay = 0 } = options;

  useEffect(() => {
    if (!elementRef) return;

    const triggerAnimation = () => {
      elementRef.classList.add('boot-animate');
    };

    // Use IntersectionObserver to detect when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(triggerAnimation, delay);
            observer.disconnect(); // Stop observing after animation triggered
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px',
      }
    );

    observer.observe(elementRef);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, delay]);
}