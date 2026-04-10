import LorePage from './LorePage'

export default function Kyrax() {
  return (
    <LorePage
      config={{
        headerTitle: 'KYRAX',
        bgImage: '/assets/kyrax_bg.png',
        overlayGradient: 'linear-gradient(135deg, rgba(0,0,20,0.9) 0%, rgba(0,10,40,0.75) 50%, rgba(0,0,0,0.94) 100%)',
        accent: '#3b82f6',
        accentGlow: 'rgba(59,130,246,0.45)',
        badgeLabel: 'TACTICAL WARFARE · ACCESS: RESTRICTED',
        badgeDotColor: '#ef4444',
        sectorName: 'KYRAX',
        designation: '// COMBAT OPERATIONS WING · STRIKE TIER · CLASSIFIED',
        lore: `KYRAX is SATCORP's tactical warfare division — hardened, precise, and lethal. Built for execution at every level of engagement, KYRAX bridges the gap between intelligence and action. Every system engineered here is designed to deploy on contact: no hesitation, no redundancy, no failure tolerance. This sector represents SATCORP's operational fist — the force that turns strategy into impact.`,
        pills: [
          { label: 'STATUS', value: 'COMBAT READY', color: '#3b82f6', status: 'on' },
          { label: 'TIER', value: 'STRIKE CLASS', color: '#3b82f6', status: 'on' },
          { label: 'CLEARANCE', value: 'RESTRICTED', color: '#ef4444', status: 'on' },
          { label: 'ALERT', value: 'WEAPON HOT', color: '#ef4444', status: 'wait' },
        ],
      }}
    />
  )
}
