import React from 'react';
import { motion, useMotionTemplate } from 'framer-motion';
import useCardTilt from '../hooks/useCardTilt';

/**
 * TacticalCardWrapper applies consistent 3D tilt and tactical gloss effects.
 */
export default function TacticalCardWrapper({ children, className, style, onClick }) {
  const { 
    ref, rotateX, rotateY, glossX, glossY, 
    handleMouseMove, handleMouseLeave 
  } = useCardTilt(6);

  const background = useMotionTemplate`radial-gradient(circle at ${glossX} ${glossY}, rgba(255,255,255,0.06), transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      style={{ 
        ...style, 
        rotateX, rotateY, 
        transformStyle: 'preserve-3d', 
        perspective: '1000px',
        position: 'relative'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
    >
      {children}
      <motion.div 
        className="tactical-gloss-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          background,
          pointerEvents: 'none',
          borderRadius: 'inherit'
        }}
      />
    </motion.div>
  );
}
