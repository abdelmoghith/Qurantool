import { useState, useEffect } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold }
    );

    // Observe all elements with data-animate-on-scroll attribute
    const elements = document.querySelectorAll('[data-animate-on-scroll]');
    elements.forEach((el) => {
      if (el.id) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return animatedElements;
};