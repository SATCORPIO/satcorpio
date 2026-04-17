import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const ModuleExitButton = ({ color = 'white', onClick }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <style>{`
        .module-exit-button {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          color: ${color};
          font-family: 'JetBrains Mono', 'Rajdhani', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
          user-select: none;
        }

        .module-exit-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
          color: #fff;
        }

        .module-exit-button:active {
          transform: translateY(0) scale(0.95);
        }

        .module-exit-icon {
          width: 16px;
          height: 16px;
          stroke-width: 2.5px;
        }

        @media (max-width: 768px) {
          .module-exit-button {
            top: 16px;
            right: 16px;
            padding: 12px 20px;
            font-size: 10px;
            background: rgba(0, 0, 0, 0.6);
            border-color: rgba(255, 255, 255, 0.25);
          }
          
          .module-exit-text {
            display: inline-block;
          }
        }
      `}</style>
      <button 
        className="module-exit-button" 
        onClick={handleExit}
        aria-label="Exit Module"
      >
        <X className="module-exit-icon" />
        <span className="module-exit-text">EXIT</span>
      </button>
    </>
  );
};

export default ModuleExitButton;
