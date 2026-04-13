import React from 'react';
import { motion } from 'framer-motion';
import useMagneticEffect from '../hooks/useMagneticEffect';

/**
 * MagneticWrapper wraps any component to give it a tactical magnetic pull effect.
 */
export default function MagneticWrapper({ children, strength = 0.3, range = 80, className = "" }) {
  const { ref, x, y } = useMagneticEffect(strength, range);
  
  return (
    <motion.div 
      ref={ref} 
      style={{ x, y }} 
      className={className}
      data-cursor="hover"
    >
      {children}
    </motion.div>
  );
}
