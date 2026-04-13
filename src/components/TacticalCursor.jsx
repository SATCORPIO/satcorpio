import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * TacticalCursor component replaces the default OS cursor with a precision dot.
 * The dot color automatically matches the theme of each sector.
 */
export default function TacticalCursor() {
  const innerRef = useRef(null);
  const location = useLocation();
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Map routes to sector colors
  const accentColor = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/anu')) return '#ffca28'; // Gold
    if (path.includes('/kyrax')) return '#3b82f6'; // Blue
    if (path.includes('/pulse') || path.includes('/kirastudios')) return '#d946ef'; // Magenta
    return '#00ff41'; // SATCORP Tactical Green (Default)
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update inner dot immediately
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check for hover attribute
      const target = e.target;
      const isHoverable = target.closest('[data-cursor="hover"]') || 
                        target.tagName === 'BUTTON' || 
                        target.tagName === 'A';
      setIsHovering(!!isHoverable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="tactical-cursor-container" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 99999 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          body { cursor: none !important; }
          a, button, [data-cursor="hover"] { cursor: none !important; }
        }
        @media (pointer: coarse) {
          .tactical-cursor-container { display: none !important; }
        }
        
        .tactical-cursor-inner {
          position: fixed; top: 0; left: 0;
          width: 6px; height: 6px;
          background: ${accentColor};
          border-radius: 50%;
          margin-left: -3px; margin-top: -3px;
          transition: transform 0.05s linear, opacity 0.2s ease, width 0.2s ease, height 0.2s ease, background 0.3s ease;
          z-index: 100000;
        }
        
        .cursor-hovering .tactical-cursor-inner {
          opacity: 0.5;
          width: 8px; height: 8px;
          margin-left: -4px; margin-top: -4px;
        }
        
        .cursor-clicked .tactical-cursor-inner {
          animation: cursorPulse 0.4s ease-out;
        }
        
        @keyframes cursorPulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3.5); opacity: 0; }
        }
      `}} />
      <div 
        ref={innerRef} 
        className={`tactical-cursor-inner ${isHovering ? 'cursor-hovering' : ''} ${isClicked ? 'cursor-clicked' : ''}`} 
      />
    </div>
  );
}
