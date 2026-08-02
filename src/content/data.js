/* Division content. Each division is a craft whose payload describes the work.
   This is the only place site copy lives — the router, nav and panel all read
   from here. */
export const DATA = {
  satcorp: {
    call: 'STATION', name: 'SATCORP', color: '#9FE0F5',
    title: 'Four divisions in a shared orbit.',
    lede: 'A creative and technology operation. Brand systems, live community platforms, automation, and the architecture that ties them together — run as one practice instead of four vendors.',
    groups: [
      { h: 'Method — CFCM', rows: [
        ['01', 'Clarity', 'What the work is, what it is not, what it costs.'],
        ['02', 'Focus', 'Scope narrowed to the phase that moves the business first.'],
        ['03', 'Execution', 'Build against a signed SOW, reported weekly.'],
        ['04', 'Polish', 'Handoff, documentation, and the thing actually shipping.']] },
      { h: 'Divisions', rows: [
        ['KR', 'Ki-Ra Studios', 'Brand identity and visual systems.'],
        ['PL', 'PULSE', 'Community and live platform infrastructure.'],
        ['KX', 'KYRAX', 'Tactical AI operator and automation.'],
        ['AN', 'ANU', 'Consulting and systems architecture.']] }],
    chips: ['MSA / SOW / DPA', 'Phase-gated delivery', 'Weekly reporting'],
    cta: 'START AN ENGAGEMENT',
  },

  kira: {
    call: 'KR-01', name: 'Ki-Ra Studios', color: '#00E5FF', payload: 'optical',
    title: 'Identity that survives contact with production.',
    lede: 'Naming, visual systems, and the documentation that keeps a brand consistent after the launch deck is closed. Built to be used by other people, not just admired.',
    groups: [{ h: 'Work', rows: [
      ['01', 'Naming and positioning', 'Name, domain, and the sentence the business leads with.'],
      ['02', 'Visual system', 'Type scale, palette, motion rules, component behavior.'],
      ['03', 'Market intelligence', 'Competitor pricing and positioning, written down.'],
      ['04', 'Delivery kit', 'Guidelines, source files, and templates for the client team.']] }],
    chips: ['Orbitron / Chakra Petch / Share Tech Mono', 'HUD system', 'Brand guidelines'],
    cta: 'REQUEST A BRAND REVIEW',
  },

  pulse: {
    call: 'PL-02', name: 'PULSE', color: '#FFA500', payload: 'array',
    title: 'Infrastructure for communities that are actually live.',
    lede: 'Platform and event infrastructure for rooms where people show up at the same time — servers, roles, onboarding, and the systems that keep it running without an admin awake at 3am.',
    groups: [{ h: 'Work', rows: [
      ['01', 'Server architecture', 'Channel structure, roles, and permissions that scale.'],
      ['02', 'Onboarding', 'Members land, get oriented, and stay.'],
      ['03', 'Live operations', 'Events, announcements, and moderation tooling.'],
      ['04', 'Multi-tenant', 'One platform, many communities, separate data.']] }],
    chips: ['Discord platform builds', 'Dual-track servers', 'Live event ops'],
    cta: 'SCOPE A COMMUNITY BUILD',
  },

  kyrax: {
    call: 'KX-03', name: 'KYRAX', color: '#FF6A1F', payload: 'antenna',
    title: 'The operator layer.',
    lede: 'A bot ecosystem with a shared identity spine: one account, one wallet, one permission model across every service. Multi-tenant from the first table.',
    groups: [{ h: 'Ecosystem', rows: [
      ['ID', 'Identity', 'The spine. Accounts, permissions, Zova balance.'],
      ['CR', 'Core', 'Moderation, roles, and server operations.'],
      ['CS', 'Casino', 'Discord-native economy and games.'],
      ['AO', 'ARK OS', 'Game server ops, breeding, and taming systems.'],
      ['PL', 'PULSE bot', 'Community and event automation.']] }],
    chips: ['Identity ships first', 'Zova — single currency', 'guild_id multi-tenant'],
    cta: 'REQUEST THE ARCHITECTURE BRIEF',
  },

  anu: {
    call: 'AN-04', name: 'ANU', color: '#EDE7DA', payload: 'lab',
    title: 'A second architect on your side of the table.',
    lede: 'Direct consulting. Systems architecture, technical strategy, and the unglamorous work of turning a vague ambition into a scope, a sequence, and a number.',
    groups: [{ h: 'Engagements', rows: [
      ['01', 'Systems architecture', 'How the pieces fit and what gets built first.'],
      ['02', 'Technical strategy', 'Buy, build, or drop — with the reasoning attached.'],
      ['03', 'Advisory', 'Standing access for teams making infrastructure calls.'],
      ['04', 'Infrastructure', 'Homelab and self-hosted stacks, specified and deployed.']] }],
    chips: ['Fixed scope', 'Phase-gated', 'anu@satcorp.io'],
    cta: 'BOOK A CLARITY SESSION',
  },
};

export const ORDER = ['satcorp', 'kira', 'pulse', 'kyrax', 'anu'];

export const CONTACT = 'anu@satcorp.io';

/* Surface features, from NAMTAR_Planetary_Design_Document sec.10. Coordinates
   come from textures/namtar_landmarks.json at load; only `ring` is positioned
   here, since it is not a surface feature and has no entry in that file.
   The JSON's `belt` key duplicates `black_rift` exactly — the belt is the
   orogenic system the rift runs through, not a separate site — so it is not
   shown as its own pin. */
export const LANDMARKS = [
  {
    id: 'black_rift', key: 'black_rift', label: 'THE BLACK RIFT',
    kind: 'VOLCANIC FRACTURE',
    text: 'A continent-scale fracture running through the northern mountain belt. Active along most of its length, and the only feature that stays visible after the terminator passes — the rift floor glows through the dark.',
    stats: [['CLASS', 'Tectonic scar'], ['STATE', 'Active'], ['SIGNATURE', 'Thermal + haze']],
  },
  {
    id: 'emerald_basin', key: 'emerald_basin', label: 'THE EMERALD BASIN',
    kind: 'INLAND ECOSYSTEM',
    text: 'A basin ringed by mountains on every side, holding the densest vegetation signal on the planet. River networks branch across it in lines wide enough to resolve from orbit.',
    stats: [['CLASS', 'Closed basin'], ['COVER', 'Dense vegetation'], ['SIGNATURE', 'Chlorophyll']],
  },
  {
    id: 'crimson_expanse', key: 'crimson_expanse', label: 'THE CRIMSON EXPANSE',
    kind: 'DESERT CONTINENT',
    text: 'An ancient desert continent, rust-red from oxidised mineral deposits and cut by canyon systems that run for thousands of kilometres. No surface water, and no cloud above it for most of the year.',
    stats: [['CLASS', 'Arid continent'], ['SURFACE', 'Iron oxides'], ['CLOUD', 'Persistent clear']],
  },
  {
    id: 'ring', label: 'DEBRIS ARC',
    kind: 'RING FRAGMENT',
    text: 'What is left of a moon that came apart. The debris never closed into a full ring — it holds a broken arc of ice and rock, bright on the sunward side and invisible everywhere else.',
    stats: [['ORIGIN', 'Moon breakup'], ['SPAN', 'Partial arc'], ['COMPOSITION', 'Ice + rock']],
  },
];
