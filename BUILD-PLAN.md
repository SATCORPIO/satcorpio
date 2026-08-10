# SATCORP — "The Concierge of Crime" Web Ecosystem
### Master Build Plan & Developer Guide — v1.0 (August 2026)
**Prepared by: Lead 3D Web Developer / Creative Technologist**

---

## 0. The One-Line Vision

> Six establishments. One concierge. A visitor should feel like they've been handed a different business card in a different city each time they change pages — yet every room smells like the same man was just there.

Raymond Reddington doesn't have *a* brand. He has a **presence** — old-world manners, immaculate tailoring, a ledger of favors, and the quiet certainty that everything is already arranged. That is the design brief. Not "spy theme." **Concierge theme.** Dark luxury, dossier language, and the sense that the visitor has been *granted access*, not merely served a webpage.

Each division page is art-directed as if it were its own standalone website (its own layout system, its own 3D world, its own typographic rhythm), but six "fingerprints" — defined in §2 — appear on every page and make the ecosystem unmistakably one operation.

---

## 1. Site Map & The "Different Website" Doctrine

| Route | Division | Feels like you landed on… | 3D World |
|---|---|---|---|
| `/` | **SATCORP** | A shadow holding company / intelligence agency portal | The Network — a 3D corkboard constellation of divisions |
| `/anu` | **ANU** | A private study. Someone's personal noir website | The Concierge's Desk — an explorable 3D office scene |
| `/kyrax` | **KYRAX** | A classified AI research terminal | The Cognitive Core — a living particle brain |
| `/kira` | **Ki-Ra Studios** | A AAA game studio site (Remedy / Naughty Dog class) | The Screening Room — cinematic project reels & planet |
| `/namtar` | **NAMTAR** | A blockbuster game marketing site (No Man's Sky class) | The Planet — orbit-to-surface scroll journey |
| `/pulse` | **PULSE** | A live broadcast network / creator platform | The Signal — an audio-reactive EKG/waveform world |

**Doctrine:** each route ships its own theme tokens (accent color, type scale, layout grid, cursor behavior, transition style) via CSS custom properties scoped to the route group. Nothing about the *layout* repeats between pages. Only the fingerprints do.

---

## 2. The Six Fingerprints (Global Design System)

These are the only things allowed to repeat. They are non-negotiable and appear on every page.

### 2.1 The Palette Doctrine — "BLK / RED / BONE"
```
--ink:        #0A0A0B   (near-black, the base of every page)
--blood:      #A6192E   (SATCORP red — deep, arterial, never neon on core pages)
--blood-hot:  #FF2B3A   (permitted ONLY on PULSE and live/CTA states)
--bone:       #E9E1D3   (aged-paper cream — all body text on dark)
--gunmetal:   #2A2C30   (panels, cards, dividers)
--brass:      #B08D57   (rare — hover gilding, the wax seal, "premium" markers)
```
Each division may add **one** tinted accent (see per-page sections) but black/red/bone carry 90% of every screen.

### 2.2 Typography — "The Three Voices"
- **The Concierge** — a high-contrast display serif for headlines. Licensed pick: *Saol Display* or *Canela*. Free fallback: *Fraunces* (variable) or *Playfair Display*.
- **The Dossier** — a typewriter/mono for classified copy, labels, stamps, form fields. Pick: *IBM Plex Mono*; stamp/marking overlays in *Special Elite* used sparingly as texture, not body copy.
- **The Operator** — a neutral grotesk for UI chrome and long body copy. Pick: *Neue Haas Grotesk* / free: *Inter* or *Geist*.

Rule: every page uses all three voices, but each page changes the *ratio* (NAMTAR is 70% Concierge-serif cinematic; KYRAX is 70% Dossier-mono terminal).

### 2.3 The Red Thread
The single most important unifying device. A literal **3D red thread** — a glowing bezier ribbon rendered in WebGL — that:
- appears in the page-transition (it "pulls" you from one establishment to the next, like string on an evidence corkboard),
- surfaces once inside each page's 3D world in a form native to that world (network edge on SATCORP, desk-lamp cord on ANU, synapse on KYRAX, orbit line on NAMTAR, EKG trace on PULSE, film-reel leader on Ki-Ra),
- is the loading indicator (the thread draws itself).

Implementation: a shared `<RedThread />` R3F component — `THREE.TubeGeometry` on a CatmullRom curve, additive shader with a traveling pulse (`uProgress` uniform), driven by GSAP on route change.

### 2.4 Dossier Language (UI Vocabulary)
- **Redaction reveals**: headlines load as black redaction bars that wipe away on scroll (GSAP clip-path). Hovering redacted text un-redacts it — the site *decides to trust you*.
- **Stamps**: `EYES ONLY`, `ACTIVE`, `IN DEVELOPMENT`, `[REDACTED]` — rubber-stamp SVGs with slight rotation and ink-bleed texture, used as status chips.
- **File tabs**: global nav is a row of manila file tabs along the top edge; the active division's tab is pulled forward. On mobile it collapses into a single tab labeled `THE INDEX`.
- **Case-file transition**: leaving a page folds the viewport into a manila folder (CSS 3D transform + snapshot), a stamp slams down (`TRANSFERRED`), the red thread pulls, the next folder opens. Target: 900ms, skippable, disabled under `prefers-reduced-motion`.

### 2.5 The Monogram & The Seal
A single "S" monogram (designed once, used everywhere) and a **wax-seal button** — the floating entry point to The Ledger (§9). The seal sits bottom-right on every page, subtly breathing. It is the only UI element that never changes between establishments. *That's the tell.*

### 2.6 The Voice
All copy follows Reddington rules:
- Courteous, unhurried, faintly amused. Never salesy, never exclamation marks.
- Speaks in arrangements, not features: "That can be arranged." / "I know someone." (the someone is us)
- Every CTA is an invitation, not a command: `Request an Audience`, `Open the Ledger`, `Begin the Brief` — never "Sign up now!"
- Micro-copy carries the theme: form validation errors read like a concierge correcting you gently ("I'll need a way to reach you.").

---

## 3. Technology Stack (2026 Senior Picks)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript** | Route groups give each division its own layout/theme shell; RSC keeps non-3D content fast and SEO-clean |
| 3D | **React Three Fiber v9 + drei + three (WebGPU renderer, TSL shaders)** | WebGPU is broadly shipped in 2026; `WebGPURenderer` with automatic WebGL2 fallback. TSL nodes for the thread/atmosphere/particle shaders |
| Animation | **GSAP 3 (ScrollTrigger, Flip, SplitText — all free since the Webflow acquisition)** | Scroll-scrubbed camera rigs, redaction wipes, case-file transitions |
| Smooth scroll | **Lenis** | Syncs with ScrollTrigger; per-page scroll feel (NAMTAR heavy/cinematic, PULSE snappy) |
| Styling | **Tailwind CSS v4** + CSS custom properties per route group | Theme tokens swap per establishment |
| State | **Zustand** (ledger selections, audio toggle, transition state) — persisted to `localStorage` | |
| Forms | **React Hook Form + Zod** → Next server actions → **Resend** (or in-house SMTP) | Secure intake, no third-party form SaaS |
| Scheduling | **Cal.com (self-hosted)** embedded in the Ledger flow | Matches the in-house-infrastructure story |
| Post-processing | pmndrs `postprocessing` — bloom (subtle), film grain, vignette, chromatic aberration on PULSE only | The "35mm noir" finish |
| Assets | **Blender → glTF/GLB**, Draco + Meshopt compression, **KTX2/BasisU** textures | Budgets in §11 |
| Analytics | **Umami (self-hosted)** | Privacy-first, on SATCORP's own iron |
| Hosting | Docker Compose on SATCORP in-house servers, nginx reverse proxy, Cloudflare Tunnel for edge/TLS | The site should *literally* run on the infrastructure the copy brags about |

**Repo shape** (single app, not a monorepo — shared fingerprints argue for one codebase):

```
satcorp-web/
├─ app/
│  ├─ (satcorp)/page.tsx              # /
│  ├─ (anu)/anu/page.tsx
│  ├─ (kyrax)/kyrax/page.tsx
│  ├─ (kira)/kira/page.tsx
│  ├─ (namtar)/namtar/page.tsx
│  ├─ (pulse)/pulse/page.tsx
│  └─ api/intake/route.ts
├─ components/
│  ├─ fingerprints/    # RedThread, Seal, FileTabs, Stamp, Redaction, CaseFileTransition
│  ├─ ledger/          # LedgerModal, SkillCard, EngagementTray, IntakeForm (§9)
│  └─ worlds/          # one folder per division's 3D scene
├─ lib/                # stores, theme tokens, gsap setup, ledger catalog data
├─ public/models/      # .glb (draco+meshopt)
└─ public/textures/    # .ktx2
```

---

## 4. Page 1 — SATCORP `/` — "The Organization"

**Establishment identity:** the front door of a shadow conglomerate. Sober, architectural, quietly enormous. Accent: none — this page is pure BLK/RED/BONE.

### The 3D World: The Network
A dark void with a floating **evidence-board constellation**: five nodes (KYRAX, Ki-Ra, NAMTAR, PULSE, ANU) connected by red threads to a central SATCORP monogram. Nodes are glass-and-brass 3D objects (instanced, one GLB). The board slowly parallaxes with pointer; grabbing and dragging rotates it. Clicking a node pulls its thread taut and offers passage (`Proceed →` triggers the case-file transition to that route).

### Section flow (scroll-driven)
1. **Logo Reveal (Hero/Hook).** Black screen. The monogram assembles from drifting ember particles (GPU particle sim, ~30k points, curl noise), then the wordmark stamps in. Headline, serif, redaction-reveals:
   > **SATCORP.**
   > *Some build products. We operate an ecosystem.*
   Sub: "Intelligent systems. Creative platforms. Digital worlds. Engineered, connected, and run on our own iron."
2. **The Network** (the 3D board above) with one-line dossier cards per division on hover: KYRAX — *the brain* · Ki-Ra — *the creator* · NAMTAR — *the world* · PULSE — *the heartbeat* · ANU — *the architect*.
3. **What SATCORP Does** — two dossier folders that open on scroll:
   - *AI & Cognitive Systems* (KYRAX): adaptive AI, autonomous decision-making, R&D, human-AI interaction, cross-division integration.
   - *Infrastructure & Solutions*: technology services, digital infrastructure, business solutions, future-focused development.
4. **The Iron** (infrastructure trust section). A low-poly 3D server rack breathing with red status LEDs, camera slowly orbiting. Copy verbatim from the brief: *"SATCORP operates on dedicated, in-house server infrastructure, engineered for high availability and rapid deployment across local and remote access pipelines."* Live-style readouts (uptime, clusters online) as terminal ticker.
5. **The Vision.** Full-bleed serif quote: *"To create a connected ecosystem where intelligence, creativity, and technology evolve together."*
6. **Timeline** — horizontal-scroll expansion roadmap; future items rendered as `[REDACTED]` stamps that partially un-redact on hover.
7. **CTA row** — four file tabs: `Explore KYRAX AI` · `Enter NAMTAR` · `Visit Ki-Ra Studios` · `Partner With SATCORP` (last one opens the Intake Brief, §9.4).
8. **Footer / Contact.** *"Whether you need a custom web platform or dedicated server architecture, SATCORP provides the framework."* Secure contact form (name, channel, matter — three fields only), Git links, clean legal line. Footer signature: *"Arranged by SATCORP."*

---

## 5. Page 2 — ANU `/anu` — "The Concierge's Study"

**Establishment identity:** this is the Reddington page. A personal site that feels like being received in a private study at midnight. Accent: `--brass` gets unusual freedom here. Ratio: heavy serif, generous whitespace, slowest scroll on the site.

### The 3D World: The Desk
One meticulously crafted scene (the highest-fidelity GLB on the site, ~4–6MB budget): a leather-topped desk, banker's lamp (the lamp cord is this page's red thread), rotary phone, fountain pen, a stack of dossiers, a globe, two fingers of scotch. Camera is on a scroll-scrubbed dolly rig (GSAP timeline lerping between named camera positions exported from Blender). Each scroll chapter frames a different object; the object *is* the section.

### Section flow
1. **Hero — framed on the empty chair.** The lamp flickers on.
   > **ANU** — *Lead Systems Architect & Technical Concierge*
   > Engineering the SATCORP ecosystem. Full-stack development, enterprise-grade infrastructure, and bespoke digital solutions.
   Then one Reddington line, typed in Dossier-mono: *"You didn't find this page by accident. Nothing here is by accident."*
2. **The Philosophy** (camera: the fountain pen). ANU as the strategic core — *design systems that are intelligent, scalable, and interconnected.* Ecosystem-not-applications copy from the brief.
3. **What ANU Oversees** (camera: the dossier stack). Six dossiers; scrolling lifts each folder, opens it, reveals its brief:
   - Systems Architecture — how platforms communicate, share data, and grow together
   - Artificial Intelligence — assistants and automation across every SATCORP product
   - Research & Development — emerging tech into practical solutions
   - Digital Infrastructure — secure, scalable foundations for millions of users
   - Innovation Strategy — future opportunities, ecosystem evolution
   - User Experience Philosophy — intuitive, consistent, purposeful interaction
4. **The Vision** (camera: the globe, slowly spinning, cities pin-lit in red). Ecosystem cohesion copy: ANU keeps the network *cohesive, adaptable, forward-looking.*
5. **The Engagement Model** (camera: the rotary phone). Three brass plaques:
   - **Clarity** — Discovery & Truth Extraction
   - **Scope** — Architecture & Solution Design
   - **Execution** — Development & Deployment
   Each expands into 2–3 lines on hover. This is the sales spine of the entire site — it reappears inside the intake form (§9.4).
6. **CTA.** The phone receiver lifts. `Request an Audience` → intake form with "ANU / architecture" pre-selected.

---

## 6. Page 3 — KYRAX `/kyrax` — "The Registry" *(revised — see note)*

> **Revision note.** This page originally specified a classified terminal with a boot sequence and a particle brain. That was cut: it is the default costume every AI product site wears, and it broke the doctrine — it read as *machine* rather than as a room the Concierge operates in. Reddington's advantage was never technology. It was that he had already been told. KYRAX is now the archive.

**Establishment identity:** a private intelligence registry. Old-world archive furniture behaving in ways paper cannot — index cards suspended in the cold, sorting themselves. Accent: cold index-card white `#D6E4E5` against near-black; red is reserved for flagged files. Ratio: display serif for statements, mono confined to card metadata (file numbers, classifications). **No boot sequence, no terminal.**

### The 3D World: The Registry
Thousands of instanced index cards filling a void with no floor and no far wall. Where ANU's camera moves around a room you are visiting, this one travels *forward* through something endless — scroll flies the reader deeper into the index. All motion is per-instance in the vertex shader; the CPU never touches a matrix after setup.

Three behaviours make it read as intelligent rather than decorative:
1. **A sorting wave** travelling the depth of the field, as if something is being looked up.
2. **Flagged cards** — roughly one in twenty-five, in blood red. The ones that matter.
3. **Attention.** Cards near the pointer turn to square up with the viewer. The archive notices you, which is considerably more unsettling than a glowing brain.

Near/far depth fade is mandatory, not decorative: cards drifting against the lens become white slabs that shout over the writing. The page scrim is **left-weighted**, not a radial vignette — the writing runs down the left, so a centre-transparent vignette would be darkest exactly where the text isn't.

### Section flow
1. **Hero.** > **KYRAX** — *Tactical intelligence. Connected systems.*
   The hook, redaction-revealed: *"Everyone assumes I'm well informed. I'm not. I'm well indexed."*
   Then the intelligence-architecture description from the brief.
2. **What it knows** *(the cognitive core, in archive language)* — five index cards, each with a file number and a hand-filed tilt: **Inference** · **Intake** · **Recognition** · **Counsel** · **Memory**. Closed with a dashed card: *"Drawers six through forty-one are not indexed for visitors."*
3. **Who it talks to** *(the integration layer, as a network of sources)* — *One intelligence. Six sources. Nothing filed twice.* SATCORP · NAMTAR · Ki-Ra · PULSE marked `REPORTING →` and linked; business platforms and tactical clusters marked `INTERNAL`.
4. **What it does with it** — *Gaming intelligence.* Four cards: NPC intelligence · procedural world systems · player behaviour analysis · AI-driven ecosystems. Cross-link: `See it running in NAMTAR →`.
5. **Ask the Registry.** A single input that answers a handful of questions in character and declines the rest, pleasantly — *"I don't discuss terms. I file them."* The refusal is the point: the archive knows a great deal and volunteers almost none of it. Ends by handing you to the Concierge → opens the Ledger.

### The thread here
A **cross-reference**: one length of red thread running the full depth of the index, tying together files nobody else thought to connect. The ambient backdrop pass is suppressed on this route (as on ANU) so there is one thread and one WebGL context.

---

## 7. Page 4 — Ki-Ra Studios `/kira` — "The Screening Room" *(revised — see note)*

> **Revision note.** The brief here was the hardest synthesis on the site: a AAA games studio that still feels like the same man was just there. The bridge turned out to be the studio's own line. *"Building Worlds Worth Living In"* is witness-protection copy — Ki-Ra builds worlds, the Concierge builds places to disappear into. So every section is reframed as **a fixer's catalogue of destinations**, and the games content is kept whole inside it. Server clusters become safe houses with house rules; the studio timeline becomes provenance; the gallery becomes a contact sheet; the community becomes known associates.

**Establishment identity:** a private screening room. The Concierge has arranged a viewing. Accent: deep teal-cyan `#1F6F6B` against black (games get colour). Ratio: big serif titles, grotesk body, mono in the margins. Layout unit is a **line in a screening programme** — running number, title, note.

### The 3D World: The Projection Room
Not a fixed backdrop. Ki-Ra's world is **the hero and only the hero** — the lights go down for the screening, then they come up and you read the programme. Three pages, three different relationships between the writing and the room (ANU: a room you move around; KYRAX: a space you fly through; Ki-Ra: a room you sit in once).

A projector beam crossing a dark room to a screen, dust turning in the light, and film **gate weave** on the whole rig — a few thousandths of drift, which the eye reads as celluloid long before it notices why. The screen is deliberately still waiting: *the reel has not been cut*. That is the honest state of the studio and a far better look than a placeholder apologising for itself.

Three things learned building it, all the hard way:
- **Never shoot down the beam axis.** Head-on from the audience, a light shaft is just haze; it renders as a ball of fog. The iconic image is three-quarter from the side, slightly under the beam — which also clears the left of frame for text.
- **The dust describes the beam, not the cone.** Keep the cone geometry faint (alpha ~0.03) and let motes brighten sharply inside the shaft. Unlit air must be nearly invisible (~0.004) or thousands of faint additive sprites pile into fog.
- **The screen needs a hard edge.** A bright rectangle with a visible frame border is what tells the eye it is watching a film; a soft glow reads as nothing.

### Section flow
1. **The screening** — *Building Worlds Worth Living In.* Hook: *"Everybody needs somewhere to go. We build the somewhere."*
2. **This evening's programme** — the seven things the studio creates, as a running order (I–VII) with a category in the margin.
3. **Feature presentation: NAMTAR** — a **world dossier**: designation, standing, terrain, threat. Placeholder frames for hero art, planet render and trailer (`REEL NOT CUT`). CTA: `Arrange passage to NAMTAR →`.
4. **The safe houses** — the ARK clusters as what they actually are: three addresses with non-negotiable house rules. NAMTAR (PvP · Fibercraft · No-Wipe), HYPERION (PvP · 15× · No-Wipe), FROSTHEIM (PvE · 15× · No-Wipe), each with a line of character. `Self-hosted on SATCORP iron.` CTA: `Request the address →`.
5. **Not yet issued** — Project [REDACTED] · Coming Soon · R&D, sealed. *"The studio is busier than this page suggests. That is deliberate."*
6. **Philosophy** — full-bleed quote.
7. **The apparatus** — the technology list, as the equipment in the projection booth.
8. **Provenance** — the studio timeline as an object's chain of custody.
9. **Contact sheet** — the gallery. *"Reconnaissance from a world that does not exist yet."*
10. **Known associates** — Discord, dev updates, events, patch notes, dev program, feedback portal. Closing statement.

### The thread here
**Film leader**, running out of the gate and away along the bottom of frame. The ambient backdrop pass is suppressed on this route, as on ANU and KYRAX.

**Responsive note:** placeholder grids must stay multi-column at every width. Stacked full-bleed, three empty frames become three screens of nothing to scroll past.

### Section flow
1. **Hero.** > **Ki-Ra Studios** — *Building Worlds Worth Living In.*
   Sub: SATCORP's interactive entertainment division — immersive games, persistent online worlds, next-generation digital experiences. Player freedom, long-term progression, tech that evolves with its community.
2. **What We Create** — seven capability tiles (open-world survival · multiplayer online · original sci-fi universes · AI-driven gameplay · dynamic ecosystems · cross-platform · community-driven live services), each with an animated glyph.
3. **Flagship: NAMTAR** — the largest card in the room. Hero artwork (placeholder frame with `AWAITING CLEARANCE` stamp), planet render slot, key features, dev status stamp, roadmap strip, screenshot rail, trailer slot — all placeholder-structured so real assets drop in without layout work. CTA: `Enter NAMTAR →` (full case-file transition; this is the site's best transition moment).
4. **ARK: Survival Ascended Clusters** — three server dossiers styled like tactical spec sheets, each with a live status LED (green pulse; wire to real query API later):
   - **NAMTAR** — PvP · Fibercraft · No-Wipe
   - **HYPERION** — PvP · 15x · No-Wipe
   - **FROSTHEIM** — PvE · 15x · No-Wipe
   Footer line: `Self-hosted on SATCORP iron.` + `Join via Discord` button.
5. **Future Titles** — a shelf of sealed canisters: `PROJECT [REDACTED]` · `COMING SOON` · `RESEARCH & DEVELOPMENT`. They rattle slightly on hover but never open. *The studio is active; the future is classified.*
6. **Powered by SATCORP** — small band: every Ki-Ra experience is built on technologies from across the SATCORP ecosystem (thread links to KYRAX and SATCORP infra).
7. **Philosophy** — full-bleed serif: *"We believe players deserve worlds that continue growing long after launch."*
8. **Technology** — animated icon row: AI Systems · Procedural Generation · Dynamic Weather · Cross-Platform · Multiplayer · Dedicated Servers · Persistent Worlds.
9. **Studio Timeline** — horizontal reel, per-project beads: Founded → First Prototype → First Public Reveal → Alpha → Beta → Launch → Continuous Evolution. Future beads redacted.
10. **Gallery** — masonry lightbox with category film-tabs (Environments · Creatures · Vehicles · Architecture · Characters · Weapons · Space · Planetary renders). All placeholder frames with stamps for now.
11. **Community** — Discord (https://discord.gg/Fh5qy6tCTc), dev updates, events, patch notes, dev program, feedback portal. Community stat counters (players / servers / milestones) that count up in view — structured to read real numbers later.
12. **Closing.** *"At Ki-Ra Studios, we're building worlds players will call home for years to come. Every adventure begins with a single idea, and every idea is crafted to become something worth exploring."*

---

## 8. Page 5 — NAMTAR `/namtar` — "The World"

**Establishment identity:** a AAA game landing page. The most 3D-ambitious route — this page should be shareable on its own. Accent: alien amber `#D97E2F` + biome greens in imagery. Ratio: giant serif, minimal chrome, HUD-mono for stats.

### The 3D World: Orbit-to-Surface
One continuous scroll journey around and down to a full 3D planet:
- **Planet:** 2–3k-triangle sphere, 4k KTX2 color/normal/roughness maps, custom **atmosphere rim shader** (TSL fresnel scatter), animated cloud layer (second sphere, alpha scroll), two moons, night-side city lights emissive map.
- **Scroll journey:** orbit view → descend through cloud deck (volumetric-fake: layered alpha planes + fog color lerp) → low flyover of a stylized terrain tile (displaced plane, aggressive LOD) → settle at the horizon for the content sections. Camera path authored in Blender, exported as curve, scrubbed by ScrollTrigger.
- **Fallback tier** (mobile/low GPU): pre-rendered 8s video scroll-scrub of the same journey (render it from Blender — identical art, 1/50th the cost).

### Section flow
1. **Hero (orbit).** > **NAMTAR** — *Survive. Adapt. Concore.*
   Sub: a next-generation open-world survival experience — exploration, technology, AI, and player freedom redefine what survival means.
   CTAs: `Wishlist` · `Join Discord` · `Learn More` (scroll cue).
2. **What is NAMTAR?** (descending) — *"A seamless open-world survival game built around one idea: every decision changes your future."* Explore an enormous planet, build thriving settlements, uncover lost civilizations, research advanced technologies, transfer your consciousness, command robotic companions — survive the planet and the universe.
3. **Show the World** — full-bleed cinematic rail (placeholder frames): orbit view · forests · oceans · mountains · deserts · cave systems · ruined megastructures · dynamic weather · night sky with moons.
4. **The Pillars** — five interactive monoliths that rise from the terrain as you scroll; clicking one focuses the camera:
   - **Explore** — a seamless planet of ecosystems, hidden technologies, ancient ruins
   - **Build** — shelters to sprawling industrial cities
   - **Evolve** — research, schematics, consciousness transfer into new human or robotic bodies
   - **Survive** — wildlife, environments, scarcity, other survivors
   - **Command** — drones, automated factories, robots, submarines, aircraft, military vehicles
5. **Living Planet** — systems grid over a slowly cycling day/night on the 3D terrain: dynamic weather · day/night · ocean ecosystems · wildlife behavior · seasons · environmental hazards · realistic terrain · deep oceans · massive atmosphere · air combat · naval warfare.
6. **Research & Progression** — *No levels. Discoveries.* Artifact cards (ancient technology · blueprints · schematics · alien artifacts · research projects) that flip from `UNKNOWN SIGNAL` to revealed on scroll. *"Every discovery expands what is possible."*
7. **Consciousness System** — the signature section. A wireframe human silhouette dissolves into particles and reassembles as a robotic frame (morph between two point-cloud targets — high impact, cheap to run):
   > *Death is not always the end.* Transfer your consciousness into new cloned bodies or synchronized robotic frames — your journey continues, and entirely new gameplay opens.
8. **Multiplayer** — co-op survival · PvE expeditions · PvP conflict · massive player settlements · trading · exploration · naval fleets · air combat · alliances.
9. **Massive Scale** — HUD-mono stat wall over the orbit view: fully seamless world · vast landmass and oceans · massive vertical airspace · submarine-deep oceans · hundreds of kilometers · dynamic ecosystems.
10. **Gallery** — scrolling rail: creatures · vehicles · bases · oceans · mountains · ruins · technology · combat · exploration (placeholders).
11. **Call to Action (back to orbit).**
    > *The future of survival begins on NAMTAR. Every expedition uncovers new mysteries. Every discovery changes the world. Every choice shapes your evolution.*
    > **Will you merely survive… or become something more?**
    `Wishlist` · `Join the Community` · `Follow Development`.

---

## 9. Page 6 — PULSE `/pulse` — "The Signal" *(plus the Ledger & Intake, §9.3–9.4)*

**Establishment identity:** a live media network. The one page allowed energy — motion, hot red, glow. Accent: `--blood-hot #FF2B3A`. Ratio: bold grotesk, broadcast lower-thirds, `● LIVE` chips.

### 9.1 The 3D World: The EKG
A continuous **audio-reactive red waveform ribbon** running the full height of the page — it *is* this page's red thread, rendered as this establishment's native object: a heartbeat. Idle it beats at 60bpm; it spikes as sections enter; if ambient audio is enabled it reacts to the score. Built on the shared RedThread shader with a displacement uniform — one codebase, two personalities.

### 9.2 Section flow
1. **Hero.** > **PULSE** — *The Digital Frontline of SATCORP.*
   Sub: connecting creators, communities, audiences, and experiences through a unified platform built for engagement, interaction, and growth. Where communities gather, events happen, creators meet audiences, and digital experiences come alive.
2. **What Pulse Is** — SATCORP's community and media ecosystem. Powers: creator experiences · live events · community hubs · broadcast systems · digital campaigns · audience engagement · sponsorships · growth analytics — as broadcast lower-third chips sliding in on the beat.
3. **Creator Network** — profile/channel/feed/community/collab-space cards in a broadcast-wall grid, subtle screen-glow.
4. **Live Experiences** — event cards with `● LIVE` / `SCHEDULED` states: live events, broadcasts, digital gatherings, interactive experiences, community moments.
5. **Growth Intelligence** — animated dashboard mock (engagement, campaign performance, community analytics, revenue tracking, sponsorship metrics) — charts draw on scroll. Note KYRAX powers the analytics (thread link).
6. **Community Fabric** — groups, discussions, events, shared experiences, creator-to-community connections.
7. **Core Statement.** Full-bleed, waveform swelling behind: *"Pulse is where people connect with ideas, creators, and experiences. It is the heartbeat of SATCORP's digital communities."*
8. **CTA.** `Join the Signal` (Discord) · `Broadcast With Us` (intake, PULSE services pre-selected).

---

### 9.3 THE LEDGER — the skill-deck commerce layer

This is the clever mechanism requested: **Reddington keeps a list. So does SATCORP.**

**Entry point:** the wax-seal button (§2.5), present on all six pages. Label on hover: `Open the Ledger`. Optional second entries in-context (e.g., ANU's engagement section, SATCORP's Partner CTA).

**The popup:** a full-screen modal styled as a **black leather ledger** that opens with a page-turn (GSAP Flip + CSS 3D). Inside:
- **Left page — the index:** service categories as file tabs (below). Reddington intro line at the top: *"Everything on these pages can be arranged. Some of it quickly."*
- **Right page — the entries:** each sellable skill is a ledger line-item: name in serif, one-line scope in mono, deliverables note, tier chips (`Basic · Standard · Premium`), and a **`Add to Engagement`** control that stamps the line with a small red `ENGAGED` mark.
- **The Engagement Tray:** a docked strip along the ledger's spine showing selected items (Zustand store, persisted to localStorage — selections survive navigation and return visits).
- **Two exits:** `Schedule a Consultation` (Cal.com embed with selections passed as booking metadata) and `Begin the Brief` (routes into the intake form with selections pre-checked).

**Curated catalog — what we actually sell** (only market-facing, deliverable services from the skill deck; internal identity, ideal-client lists, and differentiators become *copy*, not products):

| Ledger tab | Line items (sellable) |
|---|---|
| **Brand & Identity** | Full identity systems · wordmark/logotype design · color doctrine & typography systems · brand guideline books (editable/print-ready) · visual identity extensions (favicons/social formats) · social platform asset kits (IG grids & stories, TikTok covers) · presentation decks, pitch slides, banners, print collateral · editable template systems (Canva etc.) |
| **Web & Interactive** | Landing pages · portfolios · business sites · dashboards & portals · responsive UI/UX systems · interactive/animated UI (GSAP, 3D) · dark/light modes, custom cursors · hosting & deployment strategy (local → VPS → scalable) · SEO-ready structure & performance tuning |
| **Systems & Automation** | Workflow mapping & SOP creation · client intake / file / asset organization · AI-assisted production pipelines · toolchain optimization · process documentation · scalable service/business system design · advisory: brand clarity & positioning, scope definition, creative direction, scalability planning |
| **Broadcast & Streaming** | OBS scene architecture & overlay design · alert/HUD-style UI · full stream branding packages · TikTok/live-broadcast visual kits · animated overlays & scene layouts |
| **AI-Enhanced Creative** | Prompt engineering & reusable prompt frameworks · brand-consistent, style-locked AI visual pipelines · rapid concept iteration · task automation with AI tools · custom AI personas / operational agents |
| **Game Development & 3D** | Game-ready asset creation & optimization (Blender → engine) · environment blockouts & level prototyping · interactive prototypes & vertical slices · mobile game prototyping · gameplay/systems/QOL mods · UI/HUD kits for games & interactive apps · worldbuilding & canon documentation, lore bibles · poster/cinematic key art |
| **Documentation & Delivery** *(offered as add-ons across tabs)* | Long-form guides & databases · versioned documentation · professional file structuring · print-/web-ready export packages · version control & revision handling |

Catalog lives as typed data (`lib/ledger-catalog.ts`) — one source of truth feeds the modal, the intake form, and future Fiverr/package pages. Package-tier and upsell logic from the skill deck maps to the tier chips + "frequently arranged together" suggestions at the bottom of each tab.

### 9.4 THE ENGAGEMENT BRIEF — the big intake form

Route: `/engage` (also reachable as the final Ledger step and from every division CTA). Styled as an official SATCORP dossier being filled in — typewriter form fields on aged-paper panels, progress shown as stamps accumulating on the folder's cover.

**Steps mirror the Concierge Engagement Model** — the sales process *is* the theme:

1. **CLARITY — Discovery & Truth Extraction.** Who are you, what are you trying to become, what's actually broken. Fields: name/org · channel of contact · "describe the matter" textarea · how they found us.
2. **SCOPE — Architecture & Solution Design.** The skill selection step: the full Ledger catalog rendered as grouped checklists — anything already `ENGAGED` from the Ledger arrives pre-checked (shared Zustand store). Plus: budget band (styled as `RETAINER CLASS I–IV`) · timeline · existing assets.
3. **EXECUTION — Development & Deployment.** Preferences: communication cadence, review checkpoints, delivery format; optional Cal.com slot picker for the opening consultation.
4. **THE SEAL.** Review screen as a completed dossier; submitting presses the wax seal onto it (satisfying 800ms animation), fires the server action (Zod-validated → Resend/SMTP → optional Discord webhook to your ops channel), and returns a confirmation in voice:
   > *"Your file has been opened. Expect contact within 24 hours. In the meantime — don't do anything I wouldn't do."*

Anti-spam: honeypot + time-trap + server-side rate limit (no CAPTCHAs — they break the fiction).

---

## 10. Motion, Audio & Interaction Standards

- **Cursor:** custom per establishment (SATCORP: crosshair-dot · ANU: none/native — the study is analog · KYRAX: terminal block · Ki-Ra/NAMTAR: reticle · PULSE: pulse-dot). Falls back to native on touch.
- **Scroll feel:** Lenis lerp tuned per route (ANU 0.06 slow-luxury → PULSE 0.12 snappy).
- **Ambient audio (opt-in, off by default):** one toggle in the file-tab bar, state persisted. Per-page beds: low cello + vinyl crackle (SATCORP/ANU), sub-bass hum (KYRAX), orchestral pad (Ki-Ra/NAMTAR), heartbeat + room tone (PULSE). All ≤ 200KB looped OGG/Opus.
- **`prefers-reduced-motion`:** case-file transition → 200ms crossfade; scroll-scrub cameras → static keyframed sections; particle worlds → pre-rendered stills. Full content parity, zero exceptions.
- **Accessibility:** redaction reveals are presentation-only (real text always in DOM for SR/SEO) · full keyboard paths through Ledger and Brief · focus-visible styled as a red-thread underline · WCAG AA contrast (bone-on-ink passes; test brass and blood-hot).

## 11. Performance Budgets (hard limits, enforced in CI)

| Metric | Budget |
|---|---|
| Route JS (initial, pre-3D) | ≤ 300KB gz — 3D worlds are dynamic-imported after LCP |
| GLB per page | SATCORP ≤ 2MB · ANU ≤ 6MB · KYRAX ≤ 1MB (procedural) · NAMTAR ≤ 8MB · others ≤ 2MB |
| Textures | KTX2 only; 4k max on NAMTAR planet, 2k elsewhere |
| LCP | ≤ 2.5s on mid-tier mobile (hero is HTML/video, never WebGL-gated) |
| Frame budget | 60fps desktop / 30fps floor mobile — adaptive DPR (drei `PerformanceMonitor`), instancing everywhere, single directional + env lighting, no realtime shadows except ANU's desk |
| Tiering | GPU detect on load → **Full** (WebGPU) / **Standard** (WebGL2, reduced counts) / **Lite** (video & stills — identical content) |

## 12. Asset Production Pipeline (Blender → Web)

1. Model in Blender (real-world scale, -Z forward), single 2–4k atlas per hero asset.
2. Bake AO/lighting into textures where static (ANU desk especially — baked lighting is the noir look *and* the perf win).
3. Name camera-path empties `cam_01…cam_n` per page; export paths with the GLB — the web camera rig reads them (art direction stays in Blender, not code).
4. Export glTF → `gltf-transform` pipeline: prune, weld, Draco/Meshopt, KTX2 (script in `tools/optimize.mjs`).
5. Placeholder discipline: every placeholder slot ships as a designed "classified" frame (stamp + file number) — the site looks intentional before final art exists.

*The heavy assets to produce, in order: ANU desk set → NAMTAR planet + terrain tile → SATCORP network nodes → Ki-Ra canisters. (I can build these with you in Blender directly.)*

## 13. Build Roadmap

| Phase | Scope | Est. |
|---|---|---|
| **0 — Foundation** | Next.js shell, route groups + theme tokens, fingerprints (FileTabs, Seal, Stamp, Redaction, RedThread, CaseFileTransition), Lenis+GSAP rig, tiering/perf harness | 1.5 wks |
| **1 — SATCORP `/`** | Logo particle reveal, Network board, all sections, footer/contact | 1.5 wks |
| **2 — The Ledger + Brief** | Catalog data, ledger modal, engagement tray, 4-step intake, server action + email/webhook, Cal.com | 1.5 wks |
| **3 — ANU** | Desk GLB + baked lighting, camera dolly, dossier sections | 2 wks |
| **4 — KYRAX** | Particle core (TSL), unfold-to-map, terminal moments | 1.5 wks |
| **5 — Ki-Ra** | Screening room, canisters, ARK status cards, timeline, gallery system | 1.5 wks |
| **6 — NAMTAR** | Planet + atmosphere, orbit-to-surface scrub + video fallback, pillars, consciousness morph, stat wall | 2.5 wks |
| **7 — PULSE** | EKG ribbon, broadcast grid, dashboard animation | 1 wk |
| **8 — Hardening** | Perf passes on real devices, a11y audit, SEO/OG (per-division OG cards styled as dossier covers), analytics, Docker deploy on SATCORP iron | 1 wk |

**~14 weeks solo** at senior pace. Phases 1+2 ship first as a functioning business site (hub + commerce); each later phase is an independent release — the site earns while it grows, which is very much in character.

---

## 14. Launch Checklist (abbreviated)

- [ ] Domain + Cloudflare Tunnel → in-house Docker stack (nginx, Next standalone, Umami, Cal.com)
- [ ] Per-route metadata, OG dossier-cover images, sitemap, structured data (Organization + per-division)
- [ ] Intake pipeline test: form → email + Discord webhook → Cal.com booking round-trip
- [ ] Lighthouse ≥ 90 perf on Lite tier, AA contrast audit, keyboard-only walkthrough
- [ ] 404 page: a burned dossier — *"That file never existed."* (best page on the site; people will screenshot it)

---

*"The site, like the man, should feel inevitable — as if it were always going to be built exactly this way."*
**— End of brief. Arranged by SATCORP.**
