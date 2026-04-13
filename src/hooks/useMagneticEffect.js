import { useRef, useState, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Hook to apply a magnetic pull effect to an element.
 * @param {number} strength - How much the element follows the cursor (default: 0.3)
 * @param {number} range - Range in px within which the effect activates (default: 80)
 */
export default function useMagneticEffect(strength = 0.3, range = 80) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < range) {
        // Apply magnetic pull, max 12px as requested
        const moveX = (deltaX * strength);
        const moveY = (deltaY * strength);
        
        // Clamp to 12px max
        const limit = 12;
        const clampedX = Math.max(-limit, Math.min(limit, moveX));
        const clampedY = Math.max(-limit, Math.min(limit, moveY));
        
        x.set(clampedX);
        y.set(clampedY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    ref.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, range, x, y]);

  return { ref, x: springX, y: springY };
}
