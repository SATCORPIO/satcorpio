import React from 'react';

interface DossierProps {
  division: 'kira' | 'pulse' | 'anu' | 'kyrax';
  classification: string;
  entries: { index: string; text: string }[];
  tabs: { label: string; content: string[] }[];
}

const DossierSection: React.FC<DossierProps> = ({ 
  division, 
  classification, 
  entries, 
  tabs 
}) => {
  const accentColor = `var(--color-${division})`;

  return (
    <section className="dossier">
      <div className="dossier-header">
        <h2 className="dossier-title">CORE IDENTITY</h2>
        <div className="dossier-classification">{classification}</div>
      </div>
      
      <div className="dossier-entries">
        {entries.map((entry, index) => (
          <div key={index} className="dossier-entry">
            <span className="dossier-index">{entry.index}</span>
            <span className="dossier-text">{entry.text}</span>
          </div>
        ))}
      </div>
      
      <div className="dossier-tabs">
        {tabs.map((tab, index) => (
          <div key={index} className="dossier-tab">
            <h3 className="dossier-tab-label">{tab.label}</h3>
            <div className="dossier-tab-content">
              {tab.content.map((item, idx) => (
                <p key={idx} className="dossier-tab-item">{item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DossierSection;