import LorePage from './LorePage'

export default function KiraStudios() {
  return (
    <LorePage
      config={{
        headerTitle: 'K-RA STUDIOS',
        bgImage: '/assets/kirastudios_bg.png',
        overlayGradient: 'linear-gradient(135deg, rgba(15,0,20,0.88) 0%, rgba(30,0,40,0.72) 50%, rgba(0,0,0,0.93) 100%)',
        accent: '#d946ef',
        accentGlow: 'rgba(217,70,239,0.4)',
        badgeLabel: 'CREATIVE SANCTUM · ARTISAN TIER',
        badgeDotColor: '#d946ef',
        sectorName: 'KI-RA STUDIOS',
        designation: '// THE CREATIVE FORGE · VISION TO ARTIFACT · ACTIVE',
        lore: `Ki-Ra Studios is SATCORP's creative sanctum — where raw vision is forged into artifact. The birthplace of brand identity, motion, and visual consciousness within the SATCORP ecosystem. Here, aesthetics are not decoration — they are weaponized. Every design that leaves Ki-Ra is precision-crafted to communicate authority, elegance, and intent. Beauty as strategy. Art as intelligence.`,
        pills: [
          { label: 'STATUS', value: 'CREATING', color: '#d946ef', status: 'on' },
          { label: 'OUTPUT', value: 'BRAND · MOTION · VISUAL', color: '#d946ef', status: 'on' },
          { label: 'TIER', value: 'ARTISAN CLASS', color: '#a21caf', status: 'wait' },
          { label: 'STYLE', value: 'LUXURY PRECISION', color: '#e879f9', status: 'on' },
        ],
      }}
    />
  )
}
