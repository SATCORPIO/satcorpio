import LorePage from './LorePage'

export default function Frostheim() {
  return (
    <LorePage
      config={{
        headerTitle: 'FROSTHEIM',
        bgImage: '/assets/frostheim_bg.png',
        overlayGradient: 'linear-gradient(135deg, rgba(0,4,15,0.9) 0%, rgba(0,10,30,0.76) 50%, rgba(0,0,0,0.93) 100%)',
        accent: '#bae6fd',
        accentGlow: 'rgba(186,230,253,0.35)',
        badgeLabel: 'NORTHERN OPS · IRON TIER · FROZEN STANDBY',
        badgeDotColor: '#bae6fd',
        sectorName: 'FROSTHEIM',
        designation: '// NORTHERN OPERATIONS · IRON WILL DOCTRINE · CALCULATED',
        lore: `FROSTHEIM is the northern operations sector — cold-blooded, calculated, and unbreakable. Named for the frozen realm where strategy hardens into iron, this sector embodies precision under pressure. No operation runs warm here. Every move is calculated to the decimal, executed without waste, and held to a standard that does not bend under adversity. Frostheim does not rush. Frostheim does not miss.`,
        pills: [
          { label: 'STATUS', value: 'STANDBY — COLD', color: '#bae6fd', status: 'on' },
          { label: 'DOCTRINE', value: 'IRON WILL', color: '#93c5fd', status: 'on' },
          { label: 'TEMP', value: 'BELOW ZERO', color: '#7dd3fc', status: 'wait' },
          { label: 'READINESS', value: '100%', color: '#bae6fd', status: 'on' },
        ],
      }}
    />
  )
}
