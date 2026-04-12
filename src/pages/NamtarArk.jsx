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
        designation: '// IN DEVELOPMENT',
        lore: 'Ark Survival Ascended Cluster Coming Soon',
        pills: [
          { label: 'STATUS', value: 'COMING SOON', color: '#22c55e', status: 'wait' },
        ],
        discordLink: 'https://discord.gg/UkWzc8FvZT',
        footerCopy: '2026 Ki-Ra Studios'
      }}
    />
  )
}
