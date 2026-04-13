export default function SkillCard({ card, onSelect }) {
  const { 
    ref, rotateX, rotateY, glossX, glossY, 
    handleMouseMove, handleMouseLeave 
  } = useCardTilt(6)

  const background = useMotionTemplate`radial-gradient(circle at ${glossX} ${glossY}, rgba(255,255,255,0.06), transparent 70%)`

  const bgStyle = card.image
    ? { backgroundImage: `url(${card.image})` }
    : { background: card.gradient }

  return (
    <motion.button
      ref={ref}
      id={`skill-card-${card.id}`}
      className="skill-card"
      onClick={() => onSelect(card)}
      aria-label={`Open ${card.title} requisition hub`}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="skill-card-bg" style={bgStyle} />
      
      {/* Gloss Overlay */}
      <motion.div 
        className="card-gloss-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background,
          pointerEvents: 'none'
        }}
      />
      
      <div className="skill-card-glass" />
      <div className="skill-card-content">
        <span className="skill-card-sub">// CAPABILITY</span>
        <h3 className="skill-card-title">{card.title}</h3>
        <p className="skill-card-desc">{card.shortDesc}</p>
      </div>
      <span className="skill-card-cta">INQUIRE â–¸</span>
    </motion.button>
  )
}
