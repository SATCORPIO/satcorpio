"use client";

import { motion } from "framer-motion";
import { DossierItem } from "./DossierManual";

interface BentoDossierProps {
  items: DossierItem[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function BentoDossier({ items, sectionTitle, sectionSubtitle }: BentoDossierProps) {
  return (
    <section className="dossier-section bento-section">
      {sectionTitle && (
        <div className="dossier-header">
          <div className="dossier-line" />
          <h2 className="dossier-title">{sectionTitle}</h2>
          {sectionSubtitle && <p className="dossier-subtitle">{sectionSubtitle}</p>}
          <div className="dossier-line" />
        </div>
      )}

      <div className="bento-grid" role="region" aria-label="Division details grid">
        {items.map((node, i) => {
          const Icon = node.icon;
          // By default, if colSpan isn't present in DossierItem, we'll assign one
          const colSpan = (node as any).colSpan || 1;
          
          return (
            <motion.article 
              key={node.id} 
              className="bento-card spatial-panel"
              style={{ gridColumn: `span ${colSpan}` }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              aria-labelledby={`bento-title-${node.id}`}
            >
              <div className="bento-header">
                <div className="bento-icon-wrap" style={{ color: node.color, borderColor: `${node.color}33`, background: `${node.color}0A` }}>
                  <Icon size={20} />
                </div>
                <div className="bento-title-group">
                  <span className="bento-subtitle" style={{ color: node.color }}>{node.subtitle}</span>
                  <h2 className="bento-title" id={`bento-title-${node.id}`}>{node.title}</h2>
                </div>
              </div>
              <ul className="bento-list">
                {node.items.map((item, idx) => (
                  <li key={idx}>
                    <span className="li-bullet" style={{ color: node.color }}>//</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bento-corner" style={{ borderBottomColor: `${node.color}44`, borderRightColor: `${node.color}44` }} />
            </motion.article>
          );
        })}
      </div>
{/* Scoped styles just for bento section modifiers if any */}
      <style jsx>{`
        .bento-section {
          padding-top: 40px;
          background: transparent;
        }
      `}</style>
    </section>
  );
}
