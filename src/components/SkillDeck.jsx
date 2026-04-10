import { useState } from 'react'
import OrderModal from './OrderModal'

export default function SkillDeck({ card, onClose }) {
  const [orderOpen, setOrderOpen] = useState(false)

  return (
    <>
      <div
        className="modal-overlay"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        role="dialog"
        aria-modal="true"
        aria-label={`${card.title} skill deck`}
      >
        <div className="skill-deck-panel">
          <div className="skill-deck-head">
            <div className="sdh-left">
              <div className="sdh-label">// SKILL DECK — SATCORP OPERATIONS</div>
              <h2 className="sdh-title">{card.title}</h2>
            </div>
            <button
              id={`skill-deck-close-${card.id}`}
              className="modal-x"
              onClick={onClose}
              aria-label="Close skill deck"
            >
              ✕
            </button>
          </div>

          <div className="skill-deck-body">
            {card.sections.map((section, i) => (
              <div key={i} className="skill-section">
                <div className="skill-section-head">{section.heading}</div>
                <ul className="skill-list">
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="skill-deck-foot">
            <button
              id={`order-services-btn-${card.id}`}
              className="btn-primary"
              onClick={() => setOrderOpen(true)}
            >
              Order Services
            </button>
          </div>
        </div>
      </div>

      {orderOpen && (
        <OrderModal
          card={card}
          onClose={() => { setOrderOpen(false); onClose() }}
        />
      )}
    </>
  )
}
