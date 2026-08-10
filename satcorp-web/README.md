# SATCORP   Web Ecosystem

The "Concierge of Crime" build. Six establishments that each look like a
different company, tied together by six fingerprints and one red thread.

Full creative and technical direction lives in [`../BUILD-PLAN.md`](../BUILD-PLAN.md).
This file covers what exists in the repo today and how to work on it.

---

## Status   through Phase 6

The site is a functioning business site: it presents the ecosystem, it sells,
and it takes enquiries end to end.

| Phase | Scope | State |
|---|---|---|
| 0 | Shell, theme tokens, fingerprints, scroll rig, tiering, ledger data | **Done** |
| 1 | SATCORP `/`   particle logo reveal, network, ecosystem sections | **Done** |
| 2 | The Ledger in leather + the engagement brief and the partner intake | **Done** |
| 3 | ANU   the study modelled in Blender, scroll-scrubbed camera dolly | **Done** |
| 4 | KYRAX   The Registry, an archive of index cards | **Done** |
| 5 | Ki-Ra   The Screening Room, a projection with dust in the beam | **Done** |
| 6 | NAMTAR   the planet, orbit-to-surface scroll journey | **Done** |
| 7 | PULSE   The Signal, an EKG trace that reacts to the reader | **Done** |
| 8 | Hardening, a11y audit, deploy to SATCORP iron | Next |

All six establishments are built. Slots still awaiting real artwork ship as
designed placeholder frames, so dropping assets in costs no layout work.

---

## Running it

```bash
npm run dev
```

```bash
npm run build
```

Lint and typecheck (`next lint` no longer exists in Next 16):

```bash
npx eslint . && npx tsc --noEmit
```

If you add or move a route, regenerate the route types:

```bash
npx next typegen
```

---

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 ·
React Three Fiber 9 + drei + three · GSAP 3 (ScrollTrigger, Flip) · Lenis ·
Zustand.

---

## Layout

```
app/
  layout.tsx            root shell   fonts, chrome, all six fingerprints
  (satcorp)/            /            the organization
  (anu)/anu/            /anu         the architect
  (kyrax)/kyrax/        /kyrax       the brain
  (kira)/kira/          /kira        the creator
  (namtar)/namtar/      /namtar      the world
  (pulse)/pulse/        /pulse       the heartbeat
  (engage)/engage/      /engage      the engagement brief   clients
  (partner)/partner/    /partner     the approach   collaborators
  not-found.tsx         the burned dossier

components/
  fingerprints/         the six things allowed to repeat
  ledger/               the skill-deck commerce layer
  partner/              the branching partnership intake
  system/               Stage, DivisionShell, SmoothScroll, Placeholder
  worlds/               one folder per division's 3D scene

lib/
  divisions.ts          the six establishments + engagement model
  ledger-catalog.ts     everything SATCORP sells   single source of truth
  intake-schema.ts      the engagement brief's shape and rules
  partner-schema.ts     the partner branches   one question set per division
  rate-limit.ts         per-pipeline sliding window
  store.ts              engagement (persisted) + UI state (not)
  tier.ts               capability detection and performance tiering
  gsap.ts               single plugin registration point
```

---

## How the system works

### Theming

Each route group wraps its pages in `<DivisionShell theme="…">`, which sets
`data-division` on a wrapper. `globals.css` scopes accent, page ground and
grain weight to that attribute, so the theme is in the server-rendered HTML
and never flashes. `ThemeSync` mirrors it onto `<html>` for the fixed chrome
(tab bar, seal, cursor) that lives outside the wrapper.

**Adding an establishment:** add it to `DIVISIONS` in `lib/divisions.ts`, add a
`[data-division="id"]` block in `globals.css`, create the route group with a
layout that calls `DivisionShell`.

### Navigation

Do not use `<Link>`. Use `<ThreadLink>` from `components/fingerprints/CaseFileTransition`,
which renders a real anchor (middle-click, keyboard and crawlers all behave)
but routes through the case-file transition so the animation and the router
stay in step. Both halves of the transition carry a safety timer, because
requestAnimationFrame stalls in a backgrounded tab and would otherwise suspend
the navigation it triggers.

### 3D

Every canvas goes through `<Stage>`   the only place a WebGL context is
created. It handles client-only mounting, tier gating with a real fallback,
and an adaptive pixel-ratio ceiling.

Tiers come from `lib/tier.ts`: `full` (WebGPU, discrete GPU), `standard`
(WebGL2), `lite` (reduced motion, software rendering, or a weak device  
gets stills and video instead). Content is identical at all three.

Ambient backdrops must pass `interactive={false}`: R3F puts `pointer-events: auto`
on its own container, which silently overrides a `pointer-events-none` class
on any wrapper.

Scene wrappers must not hardcode `relative`. Tailwind emits `.relative` after
`.absolute`, so a baked-in `relative` beats whatever positioning the caller
passes and collapses the canvas to content size. The caller owns layout.

Anything random in a scene goes through `mulberry32` from `lib/rng.ts` rather
than `Math.random`. Layouts become reproducible, and generating them stays pure
so it is safe during render   the React Compiler lint enforces this.

### Each world's relationship to the page

Deliberately different on every route, so the establishments don't converge:

- **ANU**   a fixed room the camera moves *around*, scrubbed by scroll.
- **KYRAX**   a fixed field the camera flies *through*, scrubbed by scroll.
- **Ki-Ra**   a hero-only canvas you sit in *once*; the lights come up and the
  rest of the page is ordinary.
- **NAMTAR**   a journey the camera *descends*: orbit, dive, surface, orbit
  again. The page is the descent.
- **PULSE**   a monitor you are *wired to*. The only world that does not move
  with the scroll but *reacts* to it: the trace is level and unhurried until a
  section arrives, and then the heart quickens.

Each of those routes owns its own red thread in-scene (lamp cord,
cross-reference, film leader, orbit line, EKG trace) and is listed in
`OWNS_ITS_THREAD` in `ThreadBackdrop`, which suppresses the ambient pass so
there is never a second WebGL context on the page. Only SATCORP   and the
intake and legal routes that resolve to it   still gets the ambient pass.

Volumetric light lessons, learned building the projection room: never shoot
down the beam axis (it renders as fog, not a shaft); keep the cone geometry
faint and let the dust describe the beam; give unlit motes almost no alpha or
thousands of additive sprites pile into haze; and give the screen a hard bright
edge, because that rectangle is what reads as "a film".

Placeholder grids stay multi-column at every width. Stacked full-bleed, three
empty frames become three screens of nothing to scroll past.

### The ANU study and its camera rig

Source of truth is `assets/blender/anu-study.blend`. The build script inside it
is idempotent   it wipes and rebuilds, so it can be re-run while iterating.
Export with modifiers applied, extras on, cameras and lights off; at ~8.5k
triangles the GLB lands around 400KB, so no Draco or Meshopt decoder is needed.

Camera art direction lives in Blender as empties named `cam_01…cam_n`, each
carrying a `look_at` custom property. `readCameraStops` reads them in name
order and the dolly runs the camera along them from scroll position. To
re-frame a chapter, move the empty and re-export   do not edit numbers in code.

**The rotations on those empties are deliberately ignored.** Blender's glTF
exporter converts node translations to Y-up but the empties' rotations come out
a consistent 90° off; aiming from the `look_at` point avoids the whole
convention problem, and interpolating the target keeps the subject centred
through a move instead of drifting as two quaternions slerp past each other.
`look_at` is raw Blender Z-up, so it is converted with `(x, y, z) → (x, z, -y)`.

The lite-tier fallback (`public/images/anu-study-still.jpg`) is rendered from
the same blend at the same camera stop, so the art direction is identical.

### NAMTAR's descent

Every band of the journey is declared once, in
`components/worlds/namtar/journey.ts`, as fractions of document scroll: which
act the reader is in, how much of the frame belongs to the surface rather than
to orbit, how far the ground has flowed past, and where the veil sits. The
camera rig, the terrain and the altitude readout all derive what they need from
those functions, so retuning the pacing is one file.

Those fractions are matched to where the copy actually lands. **Adding or
resizing a section on `/namtar` moves the descent under it**   re-measure the
section mid-points against total scroll and retune `ACTS` and the functions
below it, or the dive will happen in the wrong place.

The camera never flies a sphere down to a landing. The planet fades out and a
terrain tile fades in while an amber veil is at full strength, and the same
crossfade runs backwards for the closing ascent. Both worlds exist at once,
`SURFACE_Y` apart, and each hides itself when its half of the blend is over.

On the ground the camera holds still and the *landscape flows past it*, which
makes the flyover unbounded on a tile small enough to tessellate and exactly
reversible when the reader scrolls back up. The flow all but stops through the
flyover so the ground settles under the camera rather than tearing past at
descent speed.

The five monoliths that used to stand on the terrain are gone, and with them the
camera's lateral swing onto a chosen pillar. The Pillars section is now a plain
list   which is what its copy always was on its own.

Nothing is textured. One value-noise fbm in `noise.ts` feeds the planet
surface, the cloud deck and the terrain, so the world you leave in orbit and the
ground you arrive on are the same place. Terrain normals
are sampled from the height field in the vertex shader rather than taken from
screen-space derivatives   derivatives were cheaper and shaded every quad flat,
which turned the ground into glass shards.

The lite tier gets a two-gradient still. The build plan calls for a
pre-rendered scroll-scrub video of the same journey; that asset does not exist
yet, and `OrbitStill` in `PlanetScene` is where it drops in.

### PULSE's trace

`components/worlds/pulse/Signal.tsx` deliberately does **not** reuse
`<RedThread>`. That component sweeps a TubeGeometry along a curve, and a tube
displaced vertically keeps its cross-section perpendicular to X   so its
apparent thickness falls off as the slope steepens, and the R spike is very
nearly vertical. The trace would have thinned to nothing at exactly the point
the shape exists for.

So it is a ribbon: two vertices per sample, offset along the *normal* of the
curve, which the vertex shader derives from the waveform's own slope by
sampling one step along and taking the perpendicular. Constant thickness at any
gradient, and a third of the vertices of a tube.

The PQRST waveform is written twice   once in GLSL in `Signal.tsx`, once in
TypeScript in `heartbeat.ts`. The shader cannot call the TypeScript and the
lite-tier SVG still cannot call the shader, so the alternative to duplicating
five gaussians is a fallback that draws a *different* waveform to the one
everyone else sees. **If either copy changes, change both.**

That file is `heartbeat.ts` rather than the obvious `signal.ts` because
`Signal.tsx` sits beside it, and two modules differing only in case break
outright on a case-insensitive filesystem.

Sections quicken the trace by carrying `data-signal="<weight>"`.
`SignalTriggers` wires every marked section from one place, so the page stays a
server component and marking a section costs an attribute rather than an
import.

### The Ledger and the brief

`lib/ledger-catalog.ts` is the single source of truth for everything sold. It
feeds the ledger modal, the Scope step of the brief, and later the package
pages. Selections live in a persisted Zustand store, so they survive
navigation and return visits, and arrive pre-checked on the brief.

`satcorp.engagement` is now the only key the site writes. The UI store used to
be persisted for the ambient-audio preference; that toggle is gone, so the store
is plain and `store.ts` clears the orphaned `satcorp.ui` key on load   the
privacy policy declares one key and has to stay true for returning visitors.

Anything reading persisted state must gate on `useHydrated()` or the server
HTML and the restored client state will disagree.

Never gate state on an animation callback. GSAP runs on requestAnimationFrame,
which stalls in a backgrounded tab   if a `setState` lives in `onComplete`, the
UI strands. Change state first and animate as a consequence.

### The two intake pipelines

There are two doors, deliberately separate rather than one form with a flag on
it. They are read by different people on different timescales, so they deliver
to different channels and file under different reference series.

| | `/engage` | `/partner` |
|---|---|---|
| For | a client commissioning work | an organisation, studio, creator or operator proposing to work alongside a division |
| Action | `submitBrief` | `submitApproach` |
| Shape | fixed, `lib/intake-schema.ts` | branching, `lib/partner-schema.ts` |
| Reference | `SC-…` | `SP-…` |
| Record | `.intake/<ref>.json` | `.partner/<ref>.json` |
| Webhook | `DISCORD_WEBHOOK_URL` | `PARTNER_WEBHOOK_URL` |
| Email | `INTAKE_TO_EMAIL` | `PARTNER_TO_EMAIL` |

Both validate server-side against the same schema module the client uses, screen
with a honeypot and a four-second time-trap (both fail silently, so a bot learns
nothing from the response), and rate limit per IP. Each takes its own limiter
from `lib/rate-limit.ts`, so a burst of partner enquiries cannot lock a client
out of the brief. The limiters are in-process maps, honest for a single
instance   behind replicas they need Redis.

The file write is the source of truth on a box with a real disk: transports
fail, a disk does not. On a platform with an ephemeral filesystem a write proves
nothing, so at least one transport must succeed or the form refuses the
submission rather than sealing over a message that went nowhere.

The partner webhook and inbox each fall back to the brief's if unset, so a fresh
deployment never silently drops approaches   but in production both should be
set, or partnership traffic lands in the client channel.

**The partner form branches.** Pick a division and that division's question set
is what renders. Answers are collected as a map keyed by field id, and the
server re-derives the field list from the division that was actually chosen, so
a payload carrying another branch's fields gains nothing. Adding a question is a
line in `PARTNER_DIVISIONS`   the form, the review screen, the Discord embed and
the email all read from it.

`/partner?division=<id>` opens straight on that branch, which is how PULSE's
`Broadcast With Us` arrives. That query is read with `useSyncExternalStore`, not
`useSearchParams`: the hook turns the form's subtree into a client-side-
rendering bailout, so the server would ship a Suspense fallback instead of the
form and *every* visitor would wait on hydration to see a single field. An
effect would work but has to `setState` to do it   a cascading render for
something knowable on the first client pass. Reading it as an external store
keeps the form server-rendered and costs one re-render when the server and
client snapshots disagree.

---

## Conventions

  marks. CTAs are invitations (`Request an Audience`), never commands.
- Status is a `<Stamp>`, never a coloured pill.
- Slots awaiting art ship as `<Placeholder>`   a designed classified frame
  with a stamp and file number, so the site reads as intentional before the
  renders exist and dropping real assets in costs no layout work.
- Redaction is presentation only. The real text is always in the DOM.
- Everything must survive `prefers-reduced-motion` with full content parity.

---

## Known notes

- The project sits inside a OneDrive folder. `node_modules` is gitignored but
  OneDrive still syncs it, which is slow and occasionally locks files. Consider
  excluding `satcorp-web/node_modules` from sync, or moving the repo outside
  OneDrive.
- Fonts are the free stand-ins from the build plan (Playfair Display, IBM Plex
  Mono, Inter). Swapping in the licensed picks (Saol/Canela, Neue Haas Grotesk)
  is a change to three lines in `app/layout.tsx`.
