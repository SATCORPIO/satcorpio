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
        designation: '// IN DEVELOPMENT',
        lore: 'Ark Survival Ascended Servers Coming Soon to NAMTAR ASA Clusters',
        pills: [
          { label: 'STATUS', value: 'COMING SOON', color: '#bae6fd', status: 'wait' },
        ],
        discordLink: 'https://discord.gg/UkWzc8FvZT',
        footerCopy: '2026 Ki-Ra Studios'
      }}
    />
  )
}
