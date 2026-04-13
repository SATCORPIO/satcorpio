import LorePage from './LorePage'

export default function DysunsArk() {
  return (
    <LorePage
      config={{
        headerTitle: "DYSUN'S ARK",
        bgImage: '/assets/dysunsark_bg.png',
        overlayGradient: 'linear-gradient(135deg, rgba(0,8,6,0.9) 0%, rgba(0,20,16,0.76) 50%, rgba(0,0,0,0.93) 100%)',
        accent: '#14b8a6',
        accentGlow: 'rgba(20,184,166,0.4)',
        badgeLabel: "ASA COMMAND · DYSUN'S VESSEL · TRAVERSING",
        badgeDotColor: '#14b8a6',
        sectorName: "DYSUN'S ARK",
        designation: '// IN DEVELOPMENT',
        lore: 'Dysun’s Realm Ark Survival Ascended Servers Comin Soon to NAMTAR ASA Clusters',
        pills: [
          { label: 'STATUS', value: 'COMING SOON', color: '#14b8a6', status: 'wait' },
        ],
        discordLink: 'https://discord.gg/nTCBH8Qac7',
        footerCopy: '2026 Ki-Ra Studios'
      }}
    />
  )
}
