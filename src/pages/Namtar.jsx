import LorePage from './LorePage'

export default function Namtar() {
  return (
    <LorePage
      config={{
        headerTitle: 'NAMTAR',
        bgImage: '/assets/namtar_bg.png',
        overlayGradient: 'linear-gradient(135deg, rgba(5,3,0,0.92) 0%, rgba(15,8,0,0.78) 50%, rgba(0,0,0,0.94) 100%)',
        accent: '#d97706',
        accentGlow: 'rgba(217,119,6,0.4)',
        badgeLabel: 'ANCIENT ARCHIVE · KEEPER TIER · SEALED',
        badgeDotColor: '#d97706',
        sectorName: 'NAMTAR',
        designation: '// IN DEVELOPMENT',
        lore: 'NAMTAR “Open World Survival Game” Coming Soon',
        pills: [
          { label: 'STATUS', value: 'COMING SOON', color: '#d97706', status: 'wait' },
        ],
        footerCopy: '2026 · Ki-Ra Studios'
      }}
    />
  )
}
