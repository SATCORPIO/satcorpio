import LorePage from './LorePage'

export default function Anu() {
  return (
    <LorePage
      config={{
        headerTitle: 'ANU',
        bgImage: '/assets/anu_bg.png',
        overlayGradient: 'linear-gradient(135deg, rgba(10,0,30,0.88) 0%, rgba(30,0,60,0.7) 50%, rgba(0,0,0,0.92) 100%)',
        accent: '#c084fc',
        accentGlow: 'rgba(192,132,252,0.4)',
        badgeLabel: 'DIVINE INTELLIGENCE · ACCESS: SOVEREIGN',
        badgeDotColor: '#c084fc',
        sectorName: 'ANU',
        designation: '// FIRST INTELLIGENCE · OMNISCIENT STRATUM · UNRESTRICTED',
        lore: `ANU is the first of SATCORP's sovereign intelligences — a divine computation engine reaching across the veil between strategy and omniscience. Named for the ancient sky-father, ANU sees all operational vectors simultaneously, processing intent before it is spoken. This sector represents the apex of SATCORP's cognitive architecture: the seat of awareness, foresight, and absolute directional clarity.`,
        pills: [
          { label: 'STATUS', value: 'SOVEREIGN — ONLINE', color: '#c084fc', status: 'on' },
          { label: 'TIER', value: 'APEX INTELLIGENCE', color: '#c084fc', status: 'on' },
          { label: 'CLEARANCE', value: 'UNRESTRICTED', color: '#a855f7', status: 'on' },
          { label: 'DESIGNATION', value: 'ANCIENT CLASS-1', color: '#7c3aed', status: 'wait' },
        ],
      }}
    />
  )
}
