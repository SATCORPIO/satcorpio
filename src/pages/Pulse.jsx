import LorePage from './LorePage'

export default function Pulse() {
  return (
    <LorePage
      config={{
        headerTitle: 'PULSE',
        bgImage: '/assets/pulse_bg.png',
        overlayGradient: 'linear-gradient(135deg, rgba(0,10,15,0.9) 0%, rgba(0,25,35,0.75) 50%, rgba(0,0,0,0.93) 100%)',
        accent: '#06b6d4',
        accentGlow: 'rgba(6,182,212,0.4)',
        badgeLabel: 'SIGNAL INTELLIGENCE · BROADCAST TIER',
        badgeDotColor: '#06b6d4',
        sectorName: 'PULSE',
        designation: '// BROADCAST & SIGNAL DIVISION · FREQUENCY OPEN · LIVE',
        lore: `PULSE is SATCORP's broadcast and signal intelligence arm — the frequency that carries SATCORP's voice, message, and data across all channels simultaneously. Operating at the intersection of sound, signal, and strategy, PULSE monitors, analyzes, and transmits. Every broadcast is calculated. Every signal has intent. The world listens because PULSE decides when to speak.`,
        pills: [
          { label: 'STATUS', value: 'BROADCASTING', color: '#06b6d4', status: 'on' },
          { label: 'SIGNAL', value: 'CLEAR · STRONG', color: '#06b6d4', status: 'on' },
          { label: 'FREQUENCY', value: 'CLASSIFIED', color: '#0891b2', status: 'wait' },
          { label: 'REACH', value: 'GLOBAL', color: '#22d3ee', status: 'on' },
        ],
      }}
    />
  )
}
