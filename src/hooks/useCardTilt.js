import { useState, useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Hook to apply a 3D tilt effect and gloss overlay to a card.
 * @param {number} rotationRange - Max rotation in degrees (default: 6)
 */
export default function useCardTilt(rotationRange = 6) {
  const ref = useRef(null);
  
  const x = useMotionValue(0.5); // 0 to 1
  const y = useMotionValue(0.5); // 0 to 1

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Transform normalized x,y to rotation values
  const rotateX = useTransform(springY, [0, 1], [rotationRange, -rotationRange]);
  const rotateY = useTransform(springX, [0, 1], [-rotationRange, rotationRange]);

  // For gloss overlay
  const glossX = useTransform(springX, [0, 1], ['0%', '100%']);
  const glossY = useTransform(springY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Normalize cursor position within the card to 0..1
    const mouseX = (e.clientX - left) / width;
    const mouseY = (e.clientY - top) / height;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return {
    ref,
    rotateX,
    rotateY,
    glossX,
    glossY,
    handleMouseMove,
    handleMouseLeave
  };
}
