import { useState } from 'react'
import SkillDeck from './SkillDeck'

export default function SkillCard({ card }) {
  const [deckOpen, setDeckOpen] = useState(false)

  const bgStyle = card.image
    ? { backgroundImage: `url(${card.image})` }
    : { background: card.gradient }

  return (
    <>
      <button
        id={`skill-card-${card.id}`}
        className="skill-card"
        onClick={() => setDeckOpen(true)}
        aria-label={`Open ${card.title} skill deck`}
      >
        <div className="skill-card-bg" style={bgStyle} />
        <div className="skill-card-glass" />
        <div className="skill-card-content">
          <span className="skill-card-sub">// CAPABILITY</span>
          <h3 className="skill-card-title">{card.title}</h3>
          <p className="skill-card-desc">{card.shortDesc}</p>
        </div>
        <span className="skill-card-cta">VIEW DECK ▸</span>
      </button>

      {deckOpen && (
        <SkillDeck card={card} onClose={() => setDeckOpen(false)} />
      )}
    </>
  )
}
