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
        designation: '// THE ANCIENT ARCHIVE · LORE KEEPER · SEALED VAULT',
        lore: `NAMTAR is the ancient archive — keeper of SATCORP's canon, operational lore, and deep institutional memory. Named for the ancient deity of fate and the underworld, NAMTAR maintains the records that others cannot access. Every classified datum, every historical operation, every precedent that shapes current action — it lives here, in the dark, preserved against entropy. What NAMTAR locks away, only NAMTAR can release.`,
        pills: [
          { label: 'STATUS', value: 'ARCHIVE: SEALED', color: '#d97706', status: 'on' },
          { label: 'RECORDS', value: 'CLASSIFIED', color: '#b45309', status: 'on' },
          { label: 'ACCESS', value: 'KEEPER ONLY', color: '#d97706', status: 'wait' },
          { label: 'DEPTH', value: 'EPOCH CLASS', color: '#92400e', status: 'on' },
        ],
      }}
    />
  )
}
