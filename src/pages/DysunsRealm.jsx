import LorePage from './LorePage'

export default function DysunsRealm() {
  return (
    <LorePage
      config={{
        headerTitle: "DYSUN'S REALM",
        bgImage: '/assets/dysunsrealm_bg.png',
        overlayGradient: 'linear-gradient(135deg, rgba(5,0,15,0.9) 0%, rgba(15,0,40,0.76) 50%, rgba(0,0,0,0.93) 100%)',
        accent: '#a855f7',
        accentGlow: 'rgba(168,85,247,0.45)',
        badgeLabel: "SOVEREIGN DOMAIN · DYSUN'S AUTHORITY · UNREACHABLE",
        badgeDotColor: '#a855f7',
        sectorName: "DYSUN'S REALM",
        designation: '// SOVEREIGN COSMIC DOMAIN · APEX AUTHORITY · BEYOND MEASURE',
        lore: `DYSUN'S REALM is the sovereign domain — a cosmic jurisdiction beyond conventional authority. This is the seat of absolute power within the SATCORP hierarchy, where the rules of the operational world do not apply in the way they do elsewhere. The Realm exists at a level that most assets will never interface with directly. It is the reason SATCORP operates with the certainty it does: because at its core, the Realm has already seen the outcome.`,
        pills: [
          { label: 'STATUS', value: 'SOVEREIGN — ABSOLUTE', color: '#a855f7', status: 'on' },
          { label: 'JURISDICTION', value: 'UNRESTRICTED', color: '#9333ea', status: 'on' },
          { label: 'ACCESS', value: 'SOVEREIGN ONLY', color: '#7c3aed', status: 'wait' },
          { label: 'DIMENSION', value: 'BEYOND STANDARD', color: '#c084fc', status: 'on' },
        ],
        discordLink: 'https://discord.gg/nTCBH8Qac7'
      }}
    />
  )
}
