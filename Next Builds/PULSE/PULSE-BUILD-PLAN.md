# PULSE — Platform Build Plan
### From establishment page to the ecosystem's identity layer — v1.0 (September 2026)
**Prepared by: Lead Systems / Web Developer**

Source note: [`Future Builds`](./Future%20Builds).
Parent doctrine: [`../../BUILD-PLAN.md`](../../BUILD-PLAN.md) §2 (the six fingerprints), §9 (PULSE as built).
Repo conventions: [`../../satcorp-web/README.md`](../../satcorp-web/README.md).

---

## 0. The one judgment that shapes everything below

The source note describes **a product**: identity, feed, chat, communities,
creator tooling, memberships, a storefront, an API, bots, and a mobile client.
The ask is to implement it **on the website's PULSE page**.

Those are not the same object, and pretending they are is how this goes wrong.
A marketing page cannot contain a social network, and a social network is not
a web page you write in an afternoon. What a page *can* do — and what nothing
else in the ecosystem currently does — is **state the specification publicly,
in the house voice, and start collecting the one asset the platform cannot be
launched without: names.**

So this plan is two tracks that share one theme and one seam.

| | **Track A — The Page** | **Track B — The Platform** |
|---|---|---|
| Where | `satcorp.io/pulse` (+ `/pulse/specification`) | `pulse.satcorp.io`, a separate application |
| What | The platform's front door, public spec, and handle queue | The thing the page describes |
| Repo | `satcorp-web/` (existing) | `pulse-app/` (new) |
| Scale | Weeks. One developer. | A funded product programme. Years, with a team. |
| Ships | Now | Phase by phase, behind the page |
| Theme | Literal — the six fingerprints, unchanged | Adapted — §3.4 |

**Track A is what "implement the plan to the PULSE page" actually means, and it
is the whole of §4–§8.** Track B is specified here (§9–§12) because Track A
must not promise anything Track B cannot deliver, and because the seam between
them — PULSE ID — has to be designed once, at the start, by the same person.

If only one thing gets built from this document, build §6: the handle
reservation. It is the only part of Track A that compounds.

---

## 1. What the source note actually asks for

Stripped of the pitch, the note makes five claims. Each has a different
implementation cost, and only three of them are the page's business.

| # | Claim | Where it lands |
|---|---|---|
| 1 | PULSE is the **connective layer**, not a sixth product sitting beside the others | Track A §4.III — the page has never drawn this |
| 2 | **One PULSE ID** carries a person across PULSE, Ki-Ra, NAMTAR and (later) KYRAX | Track A §4.IV + §6, Track B §11 |
| 3 | PULSE = **Discord + Patreon + Linktree**, plus persistent identity | Track B, phases 2–4 |
| 4 | **KYRAX intelligence** on top of all of it | Explicitly deferred — the note says so twice. §7.3 |
| 5 | The positioning is **"you pay for the platform, not with your privacy"** | Track A §4.IX — and it is load-bearing legally. §7.4 |

Two things in the note are **conceptual and must not ship as commitments**:
the subscription prices (note §23) and the revenue split (note §24). See §7.5.

---

## 2. Why the page is being rebuilt rather than extended

The PULSE page today is an *establishment* page. It says what PULSE is inside
the ecosystem, in five sections of atmosphere, and it is good at that.

It is not a *product* page, and three things break the moment it becomes one:

1. **The schedule lies.** `SCHEDULE` in `app/(pulse)/pulse/page.tsx` ships two
   `● LIVE` stamps and three `SCHEDULED` ones over things that do not exist.
   As mood on an ecosystem-role page that reads as art direction. On a page
   with a signup form under it, it reads as a claim — and the first person who
   joins the Discord looking for tonight's broadcast finds nothing.
2. **The dashboard is a mock labelled `STREAMING`.** `Dashboard.tsx` says so in
   its own comments. Same problem, larger.
3. **There is nothing to convert into.** Every CTA on the page currently exits
   to Discord or to `/partner`. A platform page whose only door is someone
   else's chat server is a platform page working for someone else.

The rebuild fixes all three by replacing atmosphere-with-implied-state with
**stated state**: a real roadmap in the page's own idiom, a specimen-stamped
dashboard, and a handle queue that belongs to SATCORP.

---

## 3. Theme doctrine — what carries across the whole build

This is the section the brief hangs on: *keep the same theme across the build.*
Theme continuity is not "use red." It is a set of rules, and most of them are
mechanical rather than aesthetic, which is what makes them survivable.

### 3.1 The fingerprints, unchanged (`BUILD-PLAN.md` §2)

Every new surface in Track A and Track B inherits all six without exception:

- **Palette.** `--ink #0A0A0B` ground, `--bone #E9E1D3` type, `--blood #A6192E`.
  `--blood-hot #FF2B3A` is PULSE's accent and stays the accent.
- **Three voices.** Concierge (Playfair) for headlines, Dossier (IBM Plex Mono)
  for labels/stamps/fields, Operator (Inter) for body and chrome. Every surface
  uses all three; only the ratio moves.
- **The red thread.** On PULSE it is the EKG trace, and it stays the EKG trace.
  Nothing new gets its own thread.
- **Dossier language.** Status is a `<Stamp>`, never a coloured pill. CTAs are
  invitations, never commands. `RESERVE YOUR HANDLE`, not `SIGN UP NOW`.
- **The monogram and seal.** Untouched; they are chrome.
- **The voice.** Understated, certain, faintly amused. PULSE is the one page
  allowed energy — energy, not enthusiasm.

### 3.2 PULSE's own tokens — do not touch these

Already declared, already correct. New work reads them, never redefines them.

```
[data-division="pulse"]  --accent: var(--color-blood-hot)   globals.css
                         --page-bg: #0a0708
                         --texture-opacity: 0.06
lib/divisions.ts         scrollLerp 0.12   the quickest scroll in the building
                         cursor "pulse"
                         stamp "● LIVE"
```

### 3.3 The mechanical rules for new sections

These are what keep a doubled page on-theme without anyone exercising taste:

1. **Every new `<section>` carries `data-signal="<weight>"`.** That attribute is
   the page's relationship to its world — `SignalTriggers` wires it and the
   trace quickens. A section without it is a section the page does not
   acknowledge. Weights in §4.
2. **New copy blocks use `<Reveal>`; new panels use the existing card
   treatment**: `border border-bone/10 bg-ink-raised/70 p-7 backdrop-blur-sm`.
3. **Internal navigation is `<ThreadLink>`, never `<Link>`.** No exceptions.
4. **Any slot awaiting art is a `<Placeholder>`** with a file number, not an
   empty div and not a stock image.
5. **Reduced motion has full content parity.** If a value counts up, it starts
   at its final value under `prefers-reduced-motion`.
6. **Lite tier draws the same thing, still.** `tracePath()` already does this
   for the trace; anything new that animates needs its own still.
7. **No new `localStorage` key without a matching line in the privacy policy.**
   `satcorp.engagement` is currently the only key the site writes and the policy
   says so. See §7.4.

### 3.4 How the theme adapts for Track B (and why it must)

The page's treatment does not survive contact with an application. Three
specific adaptations, decided now so the app never drifts:

| | Page (`/pulse`) | Application (`pulse.satcorp.io`) |
|---|---|---|
| `--blood-hot` | The accent. Large surfaces, hero CTA, chips | **Live and CTA states only.** A feed and a chat client saturated in `#FF2B3A` is unreadable after twenty minutes and unusable after an hour |
| Voice ratio | ~40% Concierge headline | **~15% Concierge / 60% Operator / 25% Dossier.** Long sessions are set in Inter. Playfair titles rooms, not messages |
| Grain / vignette | `0.06` / on | `0.02` / **off**. An animated grain layer over a scrolling virtualised feed is a battery cost and a legibility cost, and the vignette fights a three-column app shell |
| Density | Editorial. Generous | Operational. Tighter scale, real 44px touch targets |
| Motion | Scroll-driven, GSAP | State-driven, CSS. **No ScrollTrigger in the app** |

Everything else carries: ink ground, bone type, gunmetal panels, stamps for
status, dossier labels, the red-thread focus ring, and the same three fonts.

**Mechanism.** Publish `satcorp-web/app/globals.css`'s `@theme` block as a
standalone `tokens.css` in the web repo and have the app import it verbatim.
Do **not** build a shared npm package for two consumers — it buys a version
skew problem and nothing else. One file, copied by a script, reviewed on change.

---

## 4. Track A — the PULSE page, section by section

`/pulse` carries the **story**. The deep specification — the full module list,
the role matrix, verification classes, the API surface — goes to
`/pulse/specification`, a long-form dossier reusing the `.legal` type treatment
that Terms and Privacy already use. Two routes, because thirteen scrolling
sections on one page is a worse answer than nine plus a document.

### The flow

| § | Section | State | `data-signal` |
|---|---|---|---|
| I | **Hero** — reframed | rewrite | `1.2` |
| II | **What PULSE Is** — the five pillars | rewrite | `0.7` |
| III | **The Position** — the ecosystem diagram | **new** | `1.0` |
| IV | **PULSE ID** — the identity claim + the queue | **new** | `1.4` |
| V | **Spaces** — one structure, four shapes | **new** | `0.9` |
| VI | **The Creator Hub** — from Creator Network | rewrite | `0.8` |
| VII | **Transmission Schedule** — the real roadmap | rewrite of `SCHEDULE` | `0.9` |
| VIII | **Growth Intelligence** — specimen-stamped | amend | `1.0` |
| IX | **The Doctrine** — the privacy position | **new** | `1.1` |
| X | **Core Statement** | rewrite | `1.5` |
| XI | **CTA** | amend | `0.9` |

`Community Fabric` folds into V and VI. Its five lines are good copy and should
survive as module descriptions, not as a sixth grid of cards.

### I. Hero

Keep the wordmark, the `ON AIR` stamp and the scale. Replace the sub-headline
with the note's positioning, which is stronger than what is there:

> **PULSE**
> *Your audience. Your community. Your identity. One place.*
>
> PULSE is SATCORP's engagement and community platform — the connective layer
> between creators, audiences, communities, and the experiences they build.

**Do not** use "SATCORP's social media platform." The note is right that it
sizes the thing down.

CTAs, in order: `RESERVE YOUR HANDLE` (primary, `bg-blood-hot`, anchors to §IV)
· `JOIN THE SIGNAL` (Discord, secondary) · `BROADCAST WITH US`
(`/partner?division=pulse`, tertiary).

### II. What PULSE Is — the five pillars

The current `POWERS` chip row is the right treatment for the wrong list. It
currently names *services*; the platform has *pillars*. Five chips, each one
word plus a line, still as broadcast lower-thirds:

`IDENTITY` · `COMMUNITY` · `CREATOR` · `DISTRIBUTION` · `INTELLIGENCE`

`INTELLIGENCE` ships with a `LATER PHASE` stamp. See §7.3.

### III. The Position — the ecosystem diagram *(new)*

The note's central architectural claim, which the page has never drawn:
PULSE sits between people and every experience SATCORP operates, and the data
runs back up to KYRAX later.

**Build:** `components/worlds/pulse/Position.tsx`. An inline SVG, not WebGL —
there is already one WebGL context on this page and the trace owns it. Nodes
are the five division marks; edges are thread-red hairlines that draw on
arrival with a stroke-dash tween (the same technique `Dashboard.tsx` already
uses, including the `getTotalLength()` measurement — do not guess the path
length, that bug is already documented in the README).

Under reduced motion the diagram is simply finished. Lite tier: identical SVG,
no tween. This section is cheap and it is the single clearest thing on the page.

### IV. PULSE ID — the identity claim *(new; the centre of the page)*

Two halves.

**Left — what one identity carries.** Seven identity levels as stamps, which is
exactly what `<Stamp>` exists for:

`MEMBER` · `CREATOR` · `COMMUNITY` · `ORGANIZATION` · `DEVELOPER` · `BUSINESS` · `OFFICIAL`

Below them, the four verification classes with one line each (`PULSE VERIFIED`,
`CREATOR VERIFIED`, `ORGANIZATION VERIFIED`, `OFFICIAL`), and the line the note
gets right:

> One account. One identity. Multiple experiences.
> Your PULSE identity travels with you — into Ki-Ra's communities, into
> NAMTAR's world, into anything SATCORP opens next.

**Right — the reservation.** The handle form. Full mechanics in §6.

The form's copy must be precise about what it is: **a place in the queue, not
an allocation.** "Reserved" is a promise; "filed" is the truth, and the truth is
also more in voice.

> `pulse.satcorp.io/@`  [ __________ ]  `FILE THE CLAIM`
>
> A claim is a place in the queue, not a deed. Handles are allocated when the
> network opens, in the order they were filed, subject to review.

### V. Spaces — one structure, four shapes *(new)*

The note's best structural idea, and the thing that makes PULSE explicable in
one screen: a Space is a complete digital home, and a creator, a community, a
business and a game all get the same one with different modules switched on.

**Build:** `components/worlds/pulse/SpaceBoard.tsx`. Four tabs
(`CREATOR` · `COMMUNITY` · `BUSINESS` · `GAME`) in the `FileTabs` idiom;
switching a tab lights the modules that Space kind uses and dims the rest.
Fourteen modules from `lib/pulse-platform.ts` — Feed, Chat, Voice, Events,
Announcements, Media, Forums, Support, Store, Memberships, Leaderboards, Polls,
Applications, Documentation.

Client component, no network, no store. Tab state is `useState`. It reads as
interactive and costs nothing.

### VI. The Creator Hub — rewrite of Creator Network

Keep the card grid and its hover treatment exactly. Replace the five surfaces
with the Creator Studio's, from the note §7:
Content · Audience · Memberships · Products · Events · Analytics · Payouts.

Keep the dashed "the network is small on purpose" card. It is the best line on
the current page and it is still true of an invite-phase platform.

### VII. Transmission Schedule — the roadmap, in the page's own idiom

`SCHEDULE`'s slot / name / note / state layout is already a roadmap table
wearing a broadcast schedule's clothes. Point it at the real phases and the
honesty problem in §2 solves itself:

| Slot | Phase | State stamp |
|---|---|---|
| 01 | **PULSE Core** — identity, profiles, follow, feed, posts, notifications | `IN DEVELOPMENT` |
| 02 | **Community** — chat, voice, threads, events, roles, moderation | `QUEUED` |
| 03 | **Creator** — memberships, paid content, products, payouts | `QUEUED` |
| 04 | **Distribution** — PULSE pages, custom domains, business pages | `PLANNED` |
| 05 | **Ecosystem** — Continue with PULSE across Ki-Ra and NAMTAR | `PLANNED` |
| 06 | **Intelligence** — KYRAX audience and community analytics | `LATER PHASE` |

`tone="live"` stays reserved for things that are actually live. Add
`PLANNED` / `QUEUED` on `tone="bone"` and `IN DEVELOPMENT` on `tone="blood"`.
**Nothing on this page carries `tone="live"` until something is live.**

### VIII. Growth Intelligence — keep, and stamp it

The dashboard is good work and should stay. Two amendments:

1. A `SPECIMEN` stamp in the panel header, and the `STREAMING` indicator becomes
   `SPECIMEN — NOT LIVE DATA`. The component's own comments already say the
   numbers are a mock; the page should say it too.
2. The KYRAX line gains one clause: the analytics are KYRAX, **in a later
   phase**. Keep the `ThreadLink` — the cross-link is doing real work.

When real telemetry exists the component takes the same shape of props and
nothing in the page changes. That was already designed for; do not disturb it.

### IX. The Doctrine — the privacy position *(new, short)*

One panel, one claim, one link:

> You pay for the platform. Not with your privacy.
> No advertising. No behavioural tracking. No sale of personal information.
> That is not a feature we added. It is the only way we were willing to build it.

Links to `/privacy`. **This section may not ship until §7.4 is resolved**, and
its wording is the wording of the policy, not a paraphrase of it.

**The wording constraint, because this is cheap now and expensive later.** The
doctrine makes a claim about *conduct* — what SATCORP does with data. It must
not drift into a claim about *infrastructure* — where the data physically sits.
Track B stores user media with a third party (§9.2), so any sentence implying
otherwise becomes false the day the platform opens, and it will be quoted back.

| Ships | Never ships |
|---|---|
| "No advertising." | "Your data never leaves our servers." |
| "No behavioural tracking." | "We run our own iron, so your data is ours alone." |
| "No sale of personal information." | "Nobody else ever touches it." |
| "We are not funded by your attention." | "Fully self-hosted." / "No third parties." |

Copy review for §IX is a two-minute check against that right-hand column, and
it belongs in the Definition of Done (§8). The same test applies to any
future SATCORP page that reaches for the same line.

### X. Core Statement

Replace the current quote with the note's sharper line, same full-bleed
treatment, same `data-signal="1.5"` swell:

> *"KYRAX is the brain. PULSE is the heartbeat.
> PULSE is where the SATCORP ecosystem becomes social."*

### XI. CTA

Three doors, not four: `RESERVE YOUR HANDLE` · `JOIN THE SIGNAL` ·
`BROADCAST WITH US →`. `BEGIN THE BRIEF` moves off this page — someone
commissioning agency work is not the audience of a platform page, and the
Colophon and the Ledger seal both reach `/engage` from every page anyway.

---

## 5. The data model, and the seam into KYRAX

Everything in §4 that is a list becomes typed data in **one new module**:

```
lib/pulse-platform.ts
  PILLARS            5   §II
  IDENTITY_LEVELS    7   §IV   { id, name, line, stamp }
  VERIFICATION       4   §IV
  SPACE_KINDS        4   §V    { id, name, line, modules: ModuleId[] }
  SPACE_MODULES     14   §V    { id, name, line }
  CREATOR_SURFACES   7   §VI
  ROADMAP            6   §VII  { slot, phase, scope, state }
  DOCTRINE               §IX
```

Both routes read it, and so does the third thing:

**The registry seam.** `lib/registry-index.ts` derives KYRAX's holdings from
the data the site already runs on, and it is explicit that nothing in it is a
second copy of anything. Add a `platform` entry kind sourced from
`pulse-platform.ts` and **KYRAX can answer "what is PULSE ID" the same
afternoon PULSE ID is written**, with no second copy and no new answers file.

That is a real cross-division payoff for about thirty lines, and it is exactly
the pattern the codebase already rewards. Add `pulse id`, `handle`, `@username`,
`space`, `membership` and `creator` to `SERVICE_ALIASES` while you are there.

---

## 6. PULSE ID reservation — the third intake pipeline

The one part of Track A that compounds. Build it exactly like the two doors
that already exist, because that pattern is tested and the reviewer already
knows how to read it.

### 6.1 Shape

| | Value |
|---|---|
| Route | inline on `/pulse` §IV — no separate page; the extra click is where this loses people |
| Schema | `lib/pulse-schema.ts` |
| Action | `app/actions/reserve.ts` → `reserveHandle` |
| Reference | `PR-YYMMDD-XXXX` |
| Record | `.reservations/<ref>.json` |
| Webhook | `PULSE_WEBHOOK_URL`, falling back to `DISCORD_WEBHOOK_URL` |
| Email | `PULSE_TO_EMAIL`, falling back to `INTAKE_TO_EMAIL` |
| Limiter | its own `createRateLimit({ windowMs: 60_000, max: 2 })` |

Same screening as the other two: honeypot plus a four-second time-trap, both
failing silently, plus per-IP rate limiting. Same durability rule: on an
ephemeral filesystem at least one transport must succeed or the submission is
refused rather than sealed over.

### 6.2 Fields — deliberately three

`handle` · `contact` (email) · `intent` (choice: Member / Creator / Community /
Business / Developer). Nothing else. Every field added here costs conversions on
the only conversion the page has.

### 6.3 Handle normalisation — get this right once

A handle is an identity, so the validation is a security control, not a
formatting nicety. `lib/pulse-schema.ts` normalises before it validates:

1. Unicode **NFKC**, then casefold to lower.
2. Strip zero-width characters (`U+200B`–`U+200D`, `U+FEFF`) outright.
3. **ASCII only** for phase one: `^[a-z0-9_]{3,24}$`. Not because Unicode
   handles are wrong, but because confusable-character defence across full
   Unicode is a project, and shipping it half-done is worse than deferring it.
4. Fold confusables on the *comparison* key only, never the stored value:
   `0→o`, `1→l`, `_→''`. `@satc0rp` and `@satcorp` must collide.
5. Reject a **reserved word list**: every division id, plus `satcorp`, `pulse`,
   `kyrax`, `anu`, `namtar`, `kira`, `official`, `support`, `help`, `admin`,
   `mod`, `staff`, `system`, `api`, `www`, `mail`, `security`, `billing`.
6. Reject handles that are only digits, or that begin with `_`.

The comparison key is stored alongside the raw handle, and it is what a later
uniqueness index runs on.

### 6.4 What the queue is, and what it is not

**It is a filed claim, in order, reviewed before allocation.** It is not a
first-come allocation, and the UI must not say it is. Three reasons, all of
which otherwise arrive later as problems:

- **Squatting.** A public handle queue for a platform tied to a game world is
  exactly the surface that gets farmed. One handle per contact address, rate
  limited, reviewed.
- **Impersonation.** `@nintendo` sitting in the queue is a legal problem the day
  the platform opens, not the day it was filed.
- **Durability.** These land as JSON records and webhook messages, not in a
  database with a unique index. Two identical claims *can* both be filed;
  review is what resolves them. Promising otherwise writes a cheque the storage
  layer cannot cash until Track B phase 1.

The confirmation, in voice:

> *"Your claim is filed under `PR-260907-4A1C`. The name is held in the queue,
> not in your hand. We will be in touch when the network opens."*

### 6.5 What this changes elsewhere

- `.env.example` and `.env.local` gain `PULSE_WEBHOOK_URL` and `PULSE_TO_EMAIL`.
- `.gitignore` gains `.reservations/`.
- The privacy policy gains the third pipeline: what is collected (a handle, an
  email, an intent), why, where it goes, how long it is kept. **The policy is
  not optional here and it is not boilerplate** — the site's whole positioning
  is that it means what it says about data.
- README's "two intake pipelines" table becomes three.

---

## 7. Honesty rules — the things this page may not do

The PULSE page is about to start collecting email addresses on the strength of
claims about a product that does not exist. Five rules follow from that, and
they are acceptance criteria, not suggestions.

### 7.1 Every state stamp maps to a real state
`● LIVE` means live. Nothing on the page carries it until something is.
`IN DEVELOPMENT`, `QUEUED`, `PLANNED`, `LATER PHASE` are the vocabulary.

### 7.2 Every mock is stamped as a mock
The dashboard is a `SPECIMEN`. Any illustrative profile, feed or count added
later is too.

### 7.3 KYRAX stays deferred, visibly
The source note defers it twice, in its own words. The page names the
capability, stamps it `LATER PHASE`, and describes it in the future tense
throughout. No screenshot, no sample insight, no "KYRAX tells you…" in the
present tense. The `ThreadLink` to `/kyrax` stays — the relationship is real,
the feature is not yet.

### 7.4 Privacy is a legal claim, and Track B breaks the current one
`lib/legal.ts` currently states no advertising, no analytics, no tracking, no
sale or sharing of personal information, and one localStorage key.
**A platform with accounts collects personal data by definition.** Four
consequences, in the order they bite:

1. **Track A** adds one processing purpose (the reservation queue). That is a
   policy amendment, and it must land in the same change as the form.
2. **Track B** needs its own privacy policy and terms at `pulse.satcorp.io`,
   covering accounts, user content, sessions, retention, deletion, and — once
   payments exist — everything in §12.
3. **The doctrine section (§4.IX) may not overstate either.** "No advertising,
   no behavioural tracking, no sale of personal information" is defensible and
   is a genuine differentiator. "We collect nothing" would not be, and neither
   would any claim about where the bytes live (§4.IX, the wording constraint).
4. **Every third party that touches user data has to be named.** Storage,
   email, payments, and any CDN that terminates TLS on our behalf. That is a
   published sub-processor register, not a sentence — spec in §9.3.1.

### 7.5 Pricing does not ship as a number
The note's `$9.99` / `$19.99` tiers and the 90–95% creator split are
conceptual — its own §24 says the real split depends on processing costs, tax,
chargebacks and competitive analysis. Publish the **shape** (a free tier that
includes real communication; a creator tier; a business tier; the creator keeps
the large majority) and hold the figures until Track B has a payments
integration and someone has modelled it. If a number must appear, it appears
under a `PROVISIONAL` stamp.

**Never paywall basic communication.** The note is right, and it is also the
difference between a community platform and a toll booth.

### 7.6 Infrastructure is not a privacy claim
The site's credibility rests on the policy being literally true, so the pages
describe **conduct**, never **topology**. No page claims where data is stored,
who does or does not host it, or that no third party is involved. When those
facts matter to a reader they belong in the sub-processor register (§9.3.1),
which is the one surface that can be kept accurate as the infrastructure moves
— and it will move twice: once when the platform launches on outsourced
storage, and again when it comes home (§9.2).

---

## 8. Track A — phases, manifest, and definition of done

### A1 — Structure and honesty *(no new pipelines; ship first)*
- `lib/pulse-platform.ts` — the full data module (§5).
- Rewrite `app/(pulse)/pulse/page.tsx` sections I, II, VI, VII, X, XI from it.
- `Dashboard.tsx`: `SPECIMEN` stamp, `STREAMING` → `SPECIMEN — NOT LIVE DATA`.
- Stamp vocabulary for `QUEUED` / `PLANNED` / `LATER PHASE`.
- **Outcome:** the page tells the truth and the roadmap is public. Independently
  shippable, and worth shipping alone.

### A2 — The new sections
- `components/worlds/pulse/Position.tsx` (§III), `SpaceBoard.tsx` (§V).
- Sections III, V and IX into the page.
- `app/(pulse)/pulse/specification/page.tsx` — the long-form spec, reusing the
  `.legal` treatment; add it to the sitemap and regenerate route types
  (`npx next typegen`).

### A3 — The reservation *(the one that compounds)*
- `lib/pulse-schema.ts`, `app/actions/reserve.ts`, the §IV form component.
- Env, gitignore, privacy policy amendment, README table.
- **Gate:** does not ship until the policy amendment ships with it.

### A4 — The registry seam
- `platform` entry kind in `lib/registry-index.ts`, derived from
  `pulse-platform.ts`. New aliases. No new hand-written answers.

### A5 — Hardening
- Keyboard path through the handle form; `aria-live` on the result.
- Reduced-motion pass on `Position` and `SpaceBoard`.
- Lite-tier pass — the page must be complete with WebGL disabled.
- Per-route OG cards for `/pulse` and `/pulse/specification`.
- Re-check against the perf budget: **route JS ≤ 300KB gz**. Two new client
  components on the heaviest-motion page on the site is exactly how that budget
  goes.

### Definition of done — Track A

- [ ] `npx eslint . && npx tsc --noEmit` clean.
- [ ] Every new section carries `data-signal`.
- [ ] Every state stamp corresponds to a real state (§7.1).
- [ ] Every mock is stamped (§7.2).
- [ ] Full content parity under `prefers-reduced-motion` and on lite tier.
- [ ] No new `localStorage` key; or one, declared in the privacy policy.
- [ ] The reservation refuses rather than silently drops when no transport is
      configured — verified by unsetting the env vars and submitting.
- [ ] Keyboard-only walkthrough of the whole page, including the form.
- [ ] Contrast check on `#FF2B3A` for any new text use. It passes as an accent
      on ink; it does **not** pass as body text.
- [ ] No pricing figure without a `PROVISIONAL` stamp (§7.5).
- [ ] **The doctrine copy claims conduct, never topology** — checked against the
      "never ships" column in §4.IX. No sentence on the page says where data
      lives, who hosts it, or that no third party is involved (§7.6).

---

## 9. Track B — the platform, and the 2026 stack picks

Specified so Track A does not promise into a vacuum. This is a product
programme; nothing below is a weekend.

| Layer | Pick | Why this one |
|---|---|---|
| App | **Next.js 16, App Router** | Same as the site. One mental model, shared tokens, shared conventions |
| Data | **Postgres + Drizzle** | Relational from day one. A social graph in a document store is a migration you pay for later, with interest |
| **Identity** | **Own it. Postgres-backed, OIDC-capable** | Load-bearing — see below |
| Realtime | **Postgres as the durable log + Redis pub/sub + a dedicated WS tier** (Centrifugo, or Node/uWS if the team is JS-only) | Phase 2. Never inside the Next server |
| Voice / video | **LiveKit, self-hosted** | Do not build an SFU. This is not a place to be clever |
| Object storage | **Outsourced to an S3-compatible provider (Cloudflare R2), behind our own URL** | Until SATCORP iron is upgraded to carry it. §9.2 — the exit is designed in from day one |
| Search | **Postgres FTS**, then Meilisearch when it hurts | Phase 1 does not need a search cluster |
| Feed | **Fan-out on read, Postgres** | A distributed timeline is a scale problem you should be lucky enough to have |
| Payments | **Stripe Connect (Express)** | Phase 3. See §12 |
| Jobs | **pg-boss or River, on the same Postgres** | One durable store beats two |
| Client | **Responsive PWA** | Native mobile is phase 7+, after retention is proven. The note puts it at its §30 and that is correct |

### 9.1 Identity — the one decision that cannot be walked back

Phase 5 of the source note requires PULSE to be an *identity provider* — "Continue with PULSE"
into Ki-Ra and NAMTAR. You cannot cleanly be an OIDC provider on top of a
third-party identity service whose schema you do not control. So the auth core
is owned from the first commit: Postgres-backed sessions, your own user table,
your own handle table with a unique index on the comparison key from §6.3. Use
a library for the plumbing (Better Auth, or Auth.js with a Postgres adapter);
own the schema.

### 9.2 Object storage — outsourced until the iron is ready

**Decided: user media does not live on SATCORP hardware in phases 1–3.** The
current servers cannot carry a UGC platform's upload and egress volume, and the
failure mode of discovering that in production is losing other people's
photographs. Outsourcing here is the correct answer, not a compromise — the
mistake would be outsourcing it *without designing the way back*.

**The pick: Cloudflare R2.** S3-compatible API, and zero egress fees, which is
the number that actually matters. A media platform's storage bill is not
storage — it is egress. Every avatar, every image in a feed, every video
thumbnail is served repeatedly and forever, so on a provider that charges for
egress that line grows in direct proportion to engagement, which is the one
thing the platform exists to increase. Backblaze B2 is the credible
alternative; raw AWS S3 is not, at this shape.

Four rules that make the eventual move home a config change rather than a
rewrite:

1. **The S3 API is the only interface.** No provider SDK anywhere above the
   storage adapter and no R2-specific features in the upload path. One
   `lib/storage.ts` exposing `put` / `get` / `signUrl` / `delete`, with the
   endpoint from an env var. MinIO speaks the same API, so bringing it home
   becomes a new endpoint and a copy.
2. **Media is served from our own hostname** — `media.pulse.satcorp.io`,
   CNAME'd to the provider — never from a provider-branded URL. Every URL
   written into the database, every embed, every cached page and every
   screenshot then survives the migration. A `*.r2.dev` URL in the database is
   a migration you can never finish.
3. **Keys are ours and opaque.** Content-addressed or UUID paths generated by
   us and recorded in Postgres. Postgres is the index of what exists; the
   bucket is a dumb blob store. Never enumerate the bucket to answer a question.
4. **Uploads go direct to storage via presigned PUT**, never through the Next
   server. The app authorises and records; it does not carry bytes. That rule
   is what keeps the application tier small enough to run on our own iron even
   while the media does not.

**Three obligations follow, and none of them are optional.** They are specified
as work in §9.3 rather than left as observations, because each one is the kind
of thing that is trivial to build in and ruinous to retrofit:

- The provider is a **sub-processor** and has to be named — §9.3.1.
- **Deletion has to reach the provider** — §9.3.2.
- **Hash-matching happens on ingest**, whoever owns the disk — §9.3.3.

**When it comes home.** Write the trigger down now, so it is a threshold rather
than an argument later. Bring storage in-house when the iron has (a) redundant
disks with a *tested* restore, (b) headroom for twelve months of projected
media at then-current growth, and (c) upstream bandwidth for peak egress with
the CDN cold. Until all three are true, it stays outsourced. Re-check at the end
of each Track B phase.

### 9.3 The three obligations, as work

Each is scoped, assigned to a phase, and given a test. An obligation without a
test is a sentence in a document, and a sentence in a document has never
deleted an object.

#### 9.3.1 The sub-processor register — *Track A copy rule, Track B phase 1 deliverable*

**Deliverable:** a published register at `pulse.satcorp.io/privacy/sub-processors`,
linked from the policy, listing for each third party: name, what it processes,
why, and where. Storage, transactional email, payments (phase 3), and any CDN
that terminates TLS on our behalf. A table, not prose — prose rots silently.

**Source of truth:** `lib/sub-processors.ts`, typed data, in the same pattern as
`ledger-catalog.ts`. The policy page and the register both render from it, so
adding a vendor is one edit and cannot be half-done. **This is also the thing
that makes the KYRAX registry able to answer "who touches my data"** — same
derived-index seam as §5.

**Process, which is the part people skip:**
- No vendor reaches production before it is in the register and has a signed DPA.
- A change to the register is a change to the policy, dated in the policy's
  revision history.
- Review the register at the end of every Track B phase, and on any
  infrastructure move — including the move home (§9.2), which *removes* an
  entry and is exactly as much a change as adding one.

**Test:** a scripted check that every outbound host in the app's egress
allow-list has a matching register entry. A vendor reachable from production
and absent from the register fails the build.

**Track A's share of this is one paragraph of copy discipline** — §4.IX's
wording constraint. No register is needed until accounts exist, but the
sentence that would contradict it later gets written *now*, on the page, unless
someone stops it.

#### 9.3.2 Deletion that reaches the provider — *Track B phase 1*

**The failure this prevents:** a user deletes a post, the Postgres row goes, the
object stays at a public URL forever. The row is what the UI reads, so the
system looks correct from every angle except the one that matters. §12.7 is the
brand promise and this is the only thing that makes it true.

**Design:**

1. **Deletion is a state, not an event.** A `deleted_at` on the row and a
   tombstone row in `media_deletions` (`key`, `requested_at`, `reason`,
   `legal_hold`, `attempts`, `completed_at`). The tombstone is the work item.
2. **A durable job does the removal** (pg-boss/River, §9), with exponential
   backoff and a dead-letter queue. The provider being down must delay a
   deletion, never lose it.
3. **The job is idempotent.** S3 `DELETE` on a missing key succeeds; treat 404
   as done. Retries must be free.
4. **Cascade covers derivatives.** Thumbnails, transcodes, and any variant are
   registered against the parent key at creation, so deleting the parent
   deletes the set. An orphaned 200px thumbnail of a deleted photograph is the
   same violation at a smaller resolution.
5. **CDN cache invalidation is part of the job**, not a follow-up. Not
   invalidating leaves the object served from the edge for the full TTL after
   it is gone from origin.
6. **Reconciliation sweeper**, weekly: list the bucket, diff against Postgres,
   and report objects with no live row and no open tombstone. Objects can leak
   through crashed uploads and aborted multipart writes, and nothing else will
   ever find them.
7. **Account deletion is the same machinery at scale** — enumerate, tombstone,
   queue. Publish the completion window (30 days is defensible) and mean it.
8. **Audit log**, append-only: who requested, what key, when queued, when
   confirmed by the provider. This is what answers a DSAR or a regulator, and
   it is worthless if written after the fact.

**The collision worth designing for now (§9.3.3 interacts here).** Content
reported under §12.1 is subject to a **preservation obligation** — US law
requires reported material to be retained for a statutory period, and a user
must not be able to erase it by deleting their account. So the tombstone
carries `legal_hold`, and a held tombstone is *suppressed, never dropped*:
removed from public serving immediately, retained in a restricted bucket
prefix, and released to the delete job only when the hold lifts. Build the flag
in phase 1. Retrofitting a legal hold into a deletion pipeline that has already
run means discovering, mid-incident, that the evidence is gone.

**Test:** an integration test that uploads, derives a thumbnail, deletes,
drains the queue, and then asserts a 404 from the public URL for *both* keys —
plus a scheduled canary doing the same in production weekly.

#### 9.3.3 Hash-matching on ingest — *Track B phase 1, before any public signup*

**The rule:** an uploaded image is scanned **before it is durable and before it
is reachable**, on every path, regardless of whose disk it lands on.
Outsourcing storage outsources the hardware, not the obligation.

**Pipeline:** presigned PUT lands the object in a **quarantine prefix** that is
not served and has no public route. A worker hashes it (PhotoDNA or the
equivalent available under licence; perceptual hashing for known-bad reuse),
and only a clear result promotes the key into the served prefix and marks the
row visible. Nothing is publicly addressable between upload and clearance — the
one-line summary of the whole design.

**On a match:** block the promotion, freeze the account, preserve the object
under `legal_hold` (§9.3.2), and route to the named human in §12.2 for the
NCMEC report. The reporting path is a runbook with a name on it, not a ticket
queue.

**Why this shape:** any design where "scan" is a step *after* the object is
publicly readable has a window, and the window is the entire problem. A direct
presigned upload straight into the served bucket — the obvious performance
choice — is exactly that mistake, which is why the quarantine prefix is
specified here rather than discovered in review.

**Test:** upload a known test vector (industry test hashes exist for precisely
this) through the real path and assert it never becomes publicly reachable, the
account freezes, and the alert fires. Run it as a production canary.

---

## 10. Track B — phases, from the source note

| Phase | Scope | Goal | Weight |
|---|---|---|---|
| **1 — Core** | Auth, PULSE ID, profiles, follow graph, feed, posts, comments, reactions, notifications, basic DMs, communities, roles, search | Build the social graph | **XL** |
| **2 — Community** | Community chat, threads, voice, events, moderation tooling, member management, media | Become a credible Discord alternative | **XL** |
| **3 — Creator** | Creator profiles and studio, memberships, paid content, digital products, creator analytics, payouts | Attack Patreon | **XL** — payments dominate |
| **4 — Distribution** | `pulse.satcorp.io/@name` pages, link blocks, custom domains, business pages, SEO | Attack Linktree | **M** — the cheapest phase and the best marketing |
| **5 — Ecosystem** | PULSE as OIDC provider; Continue with PULSE in Ki-Ra and NAMTAR; scoped role sync | The differentiator nothing else can copy | **L** |
| **6 — Intelligence** | KYRAX: audience analytics, community health, recommendations, assisted moderation | Make it smarter than the field | **L**, and worth nothing before phase 1 has data |
| **7 — Platform** | Public API, OAuth apps, PULSE apps and bots | Developer ecosystem | **L** |

**Reorder one thing from the note.** Phase 4 (Distribution) is the cheapest
phase, the most linkable, and the only one that produces public URLs people
share before the network has a network. Consider pulling a minimal version of
it — the `@name` page, rendered from the reservation record — forward into
Track A as a phase A6. A claimed handle that already resolves to a page is a far
better artefact than a claimed handle that resolves to nothing.

**Phase 1 carries three things that are not features**, and its XL weight
assumes them: the sub-processor register (§9.3.1), the deletion pipeline with
its legal hold (§9.3.2), and quarantine-first ingest with hash-matching
(§9.3.3). None can be moved to a later phase — each is either load-bearing for
a legal obligation or ruinous to retrofit — so a phase 1 estimate that omits
them is not a phase 1 estimate. If schedule pressure arrives, it comes out of
*features*: fewer feed surfaces, no search, DMs deferred to phase 2. Not out of
these.

---

## 11. The seam — Continue with PULSE

Designed now, built in phase 5, so nothing in phases 1–4 makes it harder:

- Handles are **immutable identifiers with a mutable display name**. The `@` is
  the join key across NAMTAR, Ki-Ra and KYRAX. Renaming a handle is an account
  operation with a redirect and a cooldown, never a free-text edit.
- **Every user has a stable opaque `sub`** that is not the handle. Downstream
  systems key on `sub`. A system that keyed on `@name` breaks the first time
  someone renames.
- **Roles are scoped, never global.** A NAMTAR faction rank is a NAMTAR claim
  carried in the token, not a PULSE-wide standing. The note flags the same risk
  about reputation and is right: contextual, never a single score.
- **Scopes from the start**, even with one consumer: `profile`, `communities`,
  `memberships`, `events`.

---

## 12. What actually kills UGC platforms

Not the feed. These — and phase 1 is not "done" without the first four:

1. **CSAM detection and reporting.** A US platform hosting user-uploaded images
   has non-negotiable obligations, including NCMEC reporting. Hash-matching on
   upload and a reporting path are day-one infrastructure, not phase 6.
   **Specified as work in §9.3.3**, including the quarantine-prefix ingest that
   closes the window between upload and clearance.
2. **A report and appeal path, with a named human behind it.** Before public
   signups. That name is also the escalation point for §9.3.3.
3. **DMCA.** Register a designated agent with the Copyright Office and publish
   the notice-and-takedown procedure. It is cheap, and it is the difference
   between a safe harbour and a lawsuit.
4. **Minimum age 13 (COPPA)**, stated at signup and enforced in the schema.
5. **Payments (phase 3)** brings creator KYC, 1099-K thresholds, sales tax on
   digital goods across US states, and VAT/OSS if anyone in the EU buys. Stripe
   Connect handles much of this. It does not handle the platform's own
   liability, and the creator agreement is a lawyer's document, not a template.
6. **Moderation is human-first and KYRAX-assisted, never KYRAX-decided.** The
   note says this, and it is both the ethical answer and the defensible one.
7. **Data deletion that actually deletes.** The privacy positioning is the
   brand. The first credible accusation that it is decorative costs more than
   the platform earns. **Specified as work in §9.3.2**, including the
   `legal_hold` flag that keeps deletion from erasing evidence preserved under
   item 1.
8. **Every third party that touches user data, named and kept current.**
   §9.3.1. Cheap while there is one vendor; a forensic exercise once there are
   six.

---

## 13. Decisions waiting on you

Matching the format of `BUILD-PLAN.md` §13a — most load-bearing first.

1. **Is `pulse.satcorp.io` the platform domain, or `pulse.me`?** The note uses
   both. Track A §IV prints whichever is chosen, in front of everyone. Pick
   once. Recommendation: `pulse.satcorp.io` — it inherits the ecosystem's
   credibility and costs nothing.
2. **Does the reservation queue open publicly, or by invitation?** The current
   page's best line is that the network is small on purpose. An open queue
   contradicts it. Recommendation: open the queue, gate the allocation, keep the
   line.
3. **Pricing — publish the shape now, or say nothing?** §7.5 recommends the
   shape without figures.
4. **`/pulse/specification` — public, or behind the `CLASSIFIED` treatment?** A
   published spec is a recruiting document for creators and developers.
   Recommendation: public. The idea is not the moat.
5. **Who owns Trust & Safety?** §12 needs a name before public signups, not a
   process diagram. This is the question most likely to be deferred and the most
   expensive to defer.
6. **Is Track B funded and staffed?** If not, Track A still ships and is still
   worth shipping — but §VII's roadmap stamps then need to be honest about pace,
   and `IN DEVELOPMENT` on slot 01 is a claim someone will check.
7. **Do we commit to advance notice before adding a sub-processor?** (§9.3.1.)
   Thirty days' notice with a right to object is the strong version and the one
   that matches the doctrine; "we will keep the register current" is the weak
   version and is what most platforms do. The strong version constrains
   procurement later, which is the point of it. Recommendation: commit to it,
   because the register is the only load-bearing infrastructure claim the
   platform makes and a promise nobody else keeps is worth more than a page of
   copy.
8. **Who holds the NCMEC reporting runbook?** (§9.3.3, §12.2.) Same person as
   decision 5, in all likelihood — but it needs to be written down as a name
   and a phone number before the first public upload, not sourced during the
   first incident.

---

## 14. What I would build first

1. **A1** — the page tells the truth and publishes the roadmap. Small, safe,
   independently valuable, and it removes the liability in §2.
2. **A3** — the reservation. Nothing else on this page compounds.
3. **A2** — Position and Spaces. This is where the page starts explaining the
   product rather than describing a mood.
4. **A4** — the registry seam. Thirty lines, and KYRAX starts answering
   questions about PULSE.
5. **A6** — the `@name` page rendered from a filed claim (§10). The cheapest
   thing on this list that makes a stranger want one.

Then Track B phase 1, with §12 items 1–4 inside the same phase, or not at all.

---

*"KYRAX is the brain. PULSE is the heartbeat. The heartbeat is the one everyone
can hear from outside the room — so it had better be telling the truth."*
