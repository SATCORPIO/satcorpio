import LorePage from './LorePage'

export default function NamtarArk() {
  return (
    <LorePage
      config={{
        headerTitle: 'NAMTAR ARK',
        bgImage: '/assets/namtarark_bg.png',
        overlayGradient: 'linear-gradient(135deg, rgba(0,8,2,0.9) 0%, rgba(0,18,6,0.76) 50%, rgba(0,0,0,0.93) 100%)',
        accent: '#22c55e',
        accentGlow: 'rgba(34,197,94,0.4)',
        badgeLabel: 'SURVIVAL SECTOR · ARK PROTOCOL · STANDBY',
        badgeDotColor: '#22c55e',
        sectorName: 'NAMTAR ARK',
        designation: '// PRESERVATION CONTINGENCY · SURVIVAL CLASS · PROTOCOL ARMED',
        lore: `NAMTAR ARK is the survival contingency — a living preservation system designed to persist through any collapse. Where NAMTAR is the memory of what was, the ARK is the vessel carrying what must survive into what comes next. This sector maintains SATCORP's continuity protocols: the redundancies, the fallback networks, the seeds of reconstruction. If everything burns, NAMTAR ARK endures.`,
        pills: [
          { label: 'STATUS', value: 'PROTOCOL: ARMED', color: '#22c55e', status: 'on' },
          { label: 'CONTINGENCY', value: 'ACTIVE · MONITORING', color: '#22c55e', status: 'on' },
          { label: 'PAYLOAD', value: 'SEALED · CLASSIFIED', color: '#16a34a', status: 'wait' },
          { label: 'THRESHOLD', value: 'COLLAPSE-RATED', color: '#15803d', status: 'on' },
        ],
      }}
    />
  )
}
