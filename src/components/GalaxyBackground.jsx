import React, { useMemo } from 'react';

export default function GalaxyBackground() {
  const generateStars = (count, size) => {
    let result = [];
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        const colorVal = Math.random();
        let color = '#FFF';
        if (colorVal > 0.85) color = '#b3d4ff'; 
        else if (colorVal > 0.7) color = '#ffdfb3'; 
        
        result.push(`${x}px ${y}px ${size}px ${color}`);
    }
    return result.join(', ');
  }

  const { starsSmall, starsMedium, starsLarge } = useMemo(() => {
    return {
      starsSmall: generateStars(700, 0),
      starsMedium: generateStars(200, 1),
      starsLarge: generateStars(50, 2)
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .galaxy-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: transparent;
          z-index: 1;
          pointer-events: none;
        }

        .stars-small, .stars-medium, .stars-large {
           position: absolute;
           top: 0; left: 0;
           width: 1px; height: 1px;
           background: transparent;
        }

        .stars-small {
           box-shadow: ${starsSmall};
           animation: animStar 50s linear infinite;
        }
        .stars-small:after {
           content: " ";
           position: absolute;
           top: 2000px;
           width: 1px; height: 1px;
           background: transparent;
           box-shadow: ${starsSmall};
        }

        .stars-medium {
           width: 2px; height: 2px;
           box-shadow: ${starsMedium};
           animation: animStar 100s linear infinite;
        }
        .stars-medium:after {
           content: " ";
           position: absolute;
           top: 2000px;
           width: 2px; height: 2px;
           background: transparent;
           box-shadow: ${starsMedium};
        }

        .stars-large {
           width: 3px; height: 3px;
           box-shadow: ${starsLarge};
           animation: animStar 150s linear infinite;
        }
        .stars-large:after {
           content: " ";
           position: absolute;
           top: 2000px;
           width: 3px; height: 3px;
           background: transparent;
           box-shadow: ${starsLarge};
        }

        @keyframes animStar {
          from { transform: translateY(0px) }
          to   { transform: translateY(-2000px) }
        }
      `}} />
      <div className="galaxy-wrap">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
      </div>
    </>
  );
}
