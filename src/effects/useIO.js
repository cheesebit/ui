import React, { useEffect} from 'react';

export function useIO(el) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const found = entries.find(entry => {
          const { target } = entry;
          
          return target === el.current;
        });
        
        if (!found) {
          return;
        }
        
        const { isIntersecting } = found;
        if (isIntersecting) {
          el.current.src = src;
          observer.disconnect();
        }
      }
    );
    
    observer.observe(el.current);
    
    return function cleanup() {
      observer.disconnect();
    };
  }, [el]);
  
  
}