import React from 'react';

const SatcorpSignature = ({ size = 120, color = '#e8b422' }) => {
  return (
    <div className="satcorp-signature" style={{ width: size, height: 'auto' }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `drop-shadow(0 0 10px ${color}44)` }}
      >
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="2" />
        
        {/* Inner Decorative Elements */}
        <path d="M100 25 V45 M100 155 V175 M25 100 H45 M155 100 H175" stroke={color} strokeWidth="2" strokeLinecap="round" />
        
        {/* Center Diamond */}
        <rect x="75" y="75" width="50" height="50" transform="rotate(45 100 100)" stroke={color} strokeWidth="3" fill={`${color}11`} />
        
        {/* Text Arc */}
        <defs>
          <path id="circlePath" d="M 40, 100 A 60,60 0 0,1 160,100" />
          <path id="circlePathBottom" d="M 40, 100 A 60,60 0 0,0 160,100" />
        </defs>
        
        <text fill={color} style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
          <textPath xlinkHref="#circlePath" startOffset="50%" textAnchor="middle">
            SATCORP SIGNATURE
          </textPath>
        </text>
        
        <text fill={color} style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
          <textPath xlinkHref="#circlePathBottom" startOffset="50%" textAnchor="middle">
            ELITE CERTIFICATION
          </textPath>
        </text>

        {/* Center Text */}
        <text x="100" y="115" fill={color} textAnchor="middle" style={{ fontSize: '24px', fontWeight: '900', fontFamily: 'serif' }}>
          S
        </text>
      </svg>
      <style>{`
        .satcorp-signature {
          display: inline-block;
          animation: signatureFloat 6s ease-in-out infinite;
        }
        @keyframes signatureFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default SatcorpSignature;
