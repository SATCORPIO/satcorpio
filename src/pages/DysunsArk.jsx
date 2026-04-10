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
        badgeLabel: "MOBILE COMMAND · DYSUN'S VESSEL · TRAVERSING",
        badgeDotColor: '#14b8a6',
        sectorName: "DYSUN'S ARK",
        designation: '// MOBILE COMMAND INFRASTRUCTURE · SELF-SUSTAINING · EN ROUTE',
        lore: `DYSUN'S ARK is the mobile command infrastructure — a self-sustaining operational vessel traversing the frontier on a permanent vector. Unlike fixed sectors, the ARK moves. It cannot be pinned, surrounded, or cut off. Every critical command function is mirrored aboard the ARK, making it the most resilient single asset in the SATCORP fleet. Where the Realm sets direction, the ARK carries it forward — indefinitely, across any terrain.`,
        pills: [
          { label: 'STATUS', value: 'TRAVERSING', color: '#14b8a6', status: 'on' },
          { label: 'SYSTEMS', value: 'ALL NOMINAL', color: '#0d9488', status: 'on' },
          { label: 'VECTOR', value: 'CLASSIFIED', color: '#0f766e', status: 'wait' },
          { label: 'RANGE', value: 'UNLIMITED', color: '#2dd4bf', status: 'on' },
        ],
      }}
    />
  )
}
