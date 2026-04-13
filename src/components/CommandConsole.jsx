import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { commands } from '../lib/commands';
import './CommandConsole.css';

export default function CommandConsole({ isOpen, onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [booting, setBooting] = useState(false);
  const [bootText, setBootText] = useState('');
  const fullBootText = '// SATCORP COMMAND INTERFACE ONLINE';

  // Boot sequence logic
  useEffect(() => {
    if (isOpen) {
      const alreadyBooted = sessionStorage.getItem('console-booted') === 'true';
      if (!alreadyBooted) {
        setBooting(true);
        let currentPos = 0;
        const interval = setInterval(() => {
          setBootText(fullBootText.slice(0, currentPos + 1));
          currentPos++;
          if (currentPos >= fullBootText.length) {
            clearInterval(interval);
            setTimeout(() => {
              setBooting(false);
              sessionStorage.setItem('console-booted', 'true');
            }, 300);
          }
        }, 30);
        return () => clearInterval(interval);
      } else {
        setBooting(false);
      }
    }
  }, [isOpen]);

  // Reset focus when opened
  useEffect(() => {
    if (isOpen && !booting) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, booting]);

  // Filter logic
  const filtered = useMemo(() => {
    const results = query
      ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
      : commands;
    return results;
  }, [query]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Navigation execution
  const executeCommand = (cmd) => {
    if (!cmd) return;
    if (cmd.href) {
      if (cmd.href.includes('#')) {
        const [path, hash] = cmd.href.split('#');
        if (path && path !== '/') navigate(path);
        
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        navigate(cmd.href);
      }
    }
    if (cmd.url) window.open(cmd.url, '_blank');
    if (cmd.action) cmd.action();
    onClose();
    setQuery('');
  };

  // Keyboard controls
  useEffect(() => {
    if (!isOpen || booting) return;

    const handler = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand(filtered[activeIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, booting, filtered, activeIndex]);

  if (!isOpen) return null;

  return (
    <div className="console-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="console-panel" onClick={e => e.stopPropagation()}>
        <div className="console-content">
          <div className="console-header">
            <span>SATCORP // COMMAND INTERFACE</span>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</span>
          </div>

          {booting ? (
            <div className="console-boot-line">
              <div className="scan-line"></div>
              {bootText}<span className="boot-cursor">_</span>
            </div>
          ) : (
            <>
              <div className="console-input-wrapper">
                <span className="console-prompt">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="console-input"
                  placeholder="SEARCH COMMANDS..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="console-results">
                {filtered.length === 0 ? (
                  <div className="console-empty">// NO SIGNAL</div>
                ) : (
                  <>
                    <CommandGroup
                      title="NAVIGATION"
                      items={filtered.filter(c => c.category === 'NAVIGATION')}
                      globalItems={filtered}
                      activeIndex={activeIndex}
                      onSelect={executeCommand}
                    />
                    <CommandGroup
                      title="ACTIONS"
                      items={filtered.filter(c => c.category === 'ACTIONS')}
                      globalItems={filtered}
                      activeIndex={activeIndex}
                      onSelect={executeCommand}
                    />
                  </>
                )}
              </div>

              <div className="console-footer">
                <span><b>ESC</b> CLOSE</span>
                <span><b>↑↓</b> NAVIGATE</span>
                <span><b>ENTER</b> EXECUTE</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CommandGroup({ title, items, globalItems, activeIndex, onSelect }) {
  if (items.length === 0) return null;

  return (
    <>
      <div className="console-category">{title}</div>
      {items.map(cmd => {
        const globalIdx = globalItems.indexOf(cmd);
        const isActive = globalIdx === activeIndex;

        return (
          <div
            key={cmd.id}
            className={`console-row ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(cmd)}
            onMouseEnter={() => {}} 
          >
            <div className="console-row-left">
              <span className="console-row-icon">[→]</span>
              <span className="console-row-label">{cmd.label}</span>
            </div>
            {cmd.href && <span className="console-row-href">{cmd.href}</span>}
          </div>
        );
      })}
    </>
  );
}
