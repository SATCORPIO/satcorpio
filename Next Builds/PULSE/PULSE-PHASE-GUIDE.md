# PULSE — Phase Development Guide
### Execution companion to the build plan — v1.0 (September 2026)
**Prepared by: Lead Systems / Web Developer**

The plan says *what* and *why*: [`PULSE-BUILD-PLAN.md`](./PULSE-BUILD-PLAN.md).
This says **how** — in what order, with which tools, and how you know a phase is
actually finished rather than merely merged.

Section references in the form §7.4, §9.3.2 are to the build plan.
Everything here is grounded in the repository as it stands today
(`satcorp-web`, Next 16.3.0, React 19.2.8, Node 24, npm 11), and where the
repository is *missing* something the guide says so rather than assuming it.

---

# PART 0 — House rules for every phase

## 0.1 Read before you write

Two obligations, in this order, before the first line of any phase:

1. **`satcorp-web/AGENTS.md`.** Next 16 is not the Next.js in anybody's
   training data. The relevant guide lives in
   `satcorp-web/node_modules/next/dist/docs/01-app/…` and is versioned to the
   installed release. Read the page for whatever you are about to touch —
   metadata, file conventions, server actions, caching — before touching it.
   This block is re-added by `next dev`; commit it with your work.
2. **`satcorp-web/README.md`, "How the system works."** It documents the
   decisions that already cost someone a day: `ThreadLink` instead of `<Link>`,
   `useSyncExternalStore` instead of `useSearchParams`, `getTotalLength()`
   instead of a guessed dash array, never gating state on a GSAP callback.

## 0.2 The quality gate that exists today

```bash
cd satcorp-web && npx eslint . && npx tsc --noEmit
```

```bash
cd satcorp-web && npm run build
```

If a route was added or moved, regenerate route types — `LayoutProps<"/">` and
friends come from here:

```bash
cd satcorp-web && npx next typegen
```

`next lint` does not exist in Next 16. Do not add it back.

## 0.3 The toolchain to add, and exactly when

**The repository currently has no tests and no CI.** That is survivable for a
brochure site with one author. It is not survivable from A3 onward, because A3
accepts user input, and it is negligent from Track B onward, because Track B
accepts user *content*. Add tooling at the phase where it starts earning:

| Add | At phase | Why then |
|---|---|---|
| **Vitest** + Testing Library + jsdom | **A3** | Handle normalisation (§6.3) is pure, table-driven logic with security consequences. It is the first thing in this repo that is cheaper to test than to re-reason about |
| **Playwright** | **A3** | The doctrine tests (§0.5) and the intake paths. Next's own testing guide notes Vitest cannot render `async` Server Components — E2E is the supported route for those |
| **GitHub Actions** | **A3** | Remote is `SATCORPIO/satcorpio`. One workflow: lint, typecheck, build, test |
| **`@next/bundle-analyzer`** + a size assertion | **A5** | BUILD-PLAN §11 sets ≤300KB gz route JS and nothing checks it |
| **`@axe-core/playwright`** | **A5** | Automates the floor of the a11y audit; it does not replace the keyboard walkthrough |
| **Lighthouse CI** | **A5** | LCP ≤2.5s on mid-tier mobile, also unenforced today |
| **Sentry (or self-hosted GlitchTip)** | **B0** | The moment there is a server holding other people's data |
| **OpenTelemetry + Grafana/Loki** | **B0** | Same |
| **Dependabot / Renovate** | **A3** | Cheap, and this repo has already seen one dependency-shaped surprise (§0.7) |

Vitest install, per Next 16's bundled guide
(`node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md`):

```bash
cd satcorp-web && npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

```bash
cd satcorp-web && npm i -D @playwright/test && npx playwright install --with-deps chromium
```

Add to `package.json` scripts, and nothing more clever than this:

```json
"test": "vitest run",
"test:watch": "vitest",
"e2e": "playwright test",
"check": "eslint . && tsc --noEmit && vitest run"
```

## 0.4 Branches, commits, review

The repository has a strong, unusual, and *good* commit convention. Match it.

- **Branch:** `pulse/a1-structure`, `pulse/a3-reservation`. Never commit to
  `main` directly.
- **Subject:** imperative, sentence case, no prefix, no scope, no emoji, ≤72
  chars. *"Wire PULSE to a heartbeat"*, not `feat(pulse): add heartbeat`.
- **Body:** prose that explains **why**, what was rejected, and what was
  discovered by running it. The existing log is the reference; read
  `git log -3` before writing one. A body that only restates the diff is a
  wasted commit message.
- **Trailer:** `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` when
  applicable.
- **PR body:** the phase's exit criteria as a checklist, ticked, plus screenshots
  of any visual change in **both** normal and `prefers-reduced-motion` states.

## 0.5 The doctrine tests — the plan's rules, as CI

This is the highest-leverage thing in this guide. The build plan's honesty
rules (§7) and theme rules (§3.3) are the parts most likely to erode, because
they erode one reasonable-looking edit at a time. Three cheap tests hold them.

**1. Every section is wired to the trace** (§3.3 rule 1).

```ts
// tests/e2e/doctrine.spec.ts
import { test, expect } from "@playwright/test";

test("every section on /pulse is wired to the trace", async ({ page }) => {
  await page.goto("/pulse");
  const sections = page.locator("main section");
  const count = await sections.count();
  expect(count).toBeGreaterThan(8);
  for (let i = 0; i < count; i++) {
    await expect(sections.nth(i)).toHaveAttribute("data-signal", /^\d+(\.\d+)?$/);
  }
});
```

**2. Nothing claims to be live that is not live** (§7.1).

```ts
test("the roadmap carries no live stamps", async ({ page }) => {
  await page.goto("/pulse");
  // Scoped to the roadmap deliberately. The hero's ON AIR stamp is the
  // establishment's identity — the network is on air, the page is the
  // broadcast — and it is exempt. Product *state* claims are not.
  await expect(page.locator("[data-roadmap] .stamp", { hasText: /LIVE/ })).toHaveCount(0);
});
```

Give the schedule `<ol data-roadmap>` in A1 so this test has something to bind
to. Documenting the hero carve-out inside the test is what stops the test being
deleted in frustration six months from now.

**3. The copy claims conduct, never topology** (§7.6). A source scan, so it
runs in milliseconds and fails in the editor:

```ts
// tests/doctrine/copy.test.ts
import { describe, it, expect } from "vitest";
import { readFileSync, globSync } from "node:fs"; // globSync: Node 22+

const BANNED = [
  /never leaves our (own )?servers/i,
  /fully self[- ]hosted/i,
  /no third[- ]part(y|ies)/i,
  /we (host|store) everything (ourselves|in[- ]house)/i,
  /your data (is|stays) (only )?ours/i,
];

describe("privacy copy claims conduct, not topology", () => {
  const files = globSync("{app,components,lib}/**/*.{ts,tsx}");
  for (const file of files) {
    it(file, () => {
      const source = readFileSync(file, "utf8");
      for (const pattern of BANNED) expect(source).not.toMatch(pattern);
    });
  }
});
```

Extend `BANNED` whenever someone writes a new way of saying it. The list is
permanently incomplete, the same way `SERVICE_ALIASES` is, and for the same
reason.

**These three run on every PR from A3 onward.** They are the cheapest insurance
in the whole programme: each one prevents a class of mistake that is invisible
in review and expensive in public.

## 0.6 Definition of Ready / Definition of Done

**Ready** — a phase does not start until:
- [ ] Its entry criteria below are met.
- [ ] Any decision it depends on (plan §13) is answered, or an explicit
      assumption is written into the PR description.
- [ ] Copy is written and approved. Not lorem, not "TBD" — the voice is a
      deliverable, not a garnish, and half this work *is* the copy.

**Done** — every phase, in addition to its own exit criteria:
- [ ] `npx eslint . && npx tsc --noEmit` clean.
- [ ] `npm run build` clean.
- [ ] Doctrine tests pass (from A3 onward).
- [ ] Reduced-motion pass: content parity, verified by toggling the OS setting,
      not by reading the code.
- [ ] Lite-tier pass: verified with WebGL disabled in the browser
      (`chrome://flags` → disable WebGL, or launch with `--disable-webgl`).
- [ ] Keyboard-only walkthrough of anything interactive that was touched.
- [ ] README updated if the system's shape changed. The README is load-bearing
      documentation in this repo, not a formality.

## 0.7 Local friction worth knowing before you hit it

- **The repo lives in OneDrive.** `node_modules` is gitignored but still synced,
  which is slow and intermittently locks files mid-install. Symptoms are
  `EBUSY` / `EPERM` on `npm i` and phantom rebuild loops in `next dev`. Fix
  properly by excluding `satcorp-web/node_modules` from sync, or move the repo
  out of OneDrive. This will cost time in every phase until it is done — do it
  in A1.
- **`origin/vercel/react-server-components-cve-vu-pounzv` is not a security
  patch for this tree.** It is an older, different project (`satcorp-io-v4`,
  Next **15.1.11**) that deletes `satcorp-web/` entirely and replaces it with a
  small `src/` scaffold. Merging it would remove the site and downgrade the
  framework. Delete the branch or rename it to something that cannot be
  mistaken for a fix, and if there is a genuine advisory against React Server
  Components, patch it **forward** on `main` — where the installed Next is
  already newer. Do this before A1; a branch named for a CVE is exactly the
  branch someone merges in a hurry.
- **Windows line endings.** The tree is CRLF. Add a `.gitattributes` with
  `* text=auto` in A1 rather than discovering it in a 900-line diff.

---

# PART 1 — TRACK A, PHASE BY PHASE

Every phase below is shaped: **Objective · Entry · Work · Assets · Tools ·
Verify · Exit · Failure modes.**

---

## A1 — Structure and honesty

> *The page stops making claims it cannot support, and publishes the roadmap.*
> Independently shippable. Ship it alone if nothing else in this document ever
> gets built.

**Entry:** none. This phase depends on no decision in §13 and no new tooling.

### Work

1. **Repo hygiene first** (§0.7): OneDrive exclusion, `.gitattributes`, deal
   with the CVE-named branch. Ten minutes, and it stops taxing every later
   phase.
2. **`lib/pulse-platform.ts`** — the single data module from plan §5. Write it
   whole, including the parts A2 consumes; the file is the specification and
   splitting it across phases is how the two halves drift.
   - Follow `lib/ledger-catalog.ts` for shape: exported `const` arrays of typed
     objects, an `…_BY_ID` lookup built with `Object.fromEntries`, and a header
     comment saying what the module is the source of truth *for*.
   - `ROADMAP` entries carry a `state: RoadmapState` union
     (`"in-development" | "queued" | "planned" | "later"`), never a display
     string. The stamp label is derived. A union is what lets the doctrine test
     and the renderer agree.
3. **Rewrite `app/(pulse)/pulse/page.tsx`** sections I, II, VI, VII, X, XI from
   that module. The page stays a **server component** — nothing here needs
   state. If a section reaches for `useState`, extract that section, do not
   convert the page.
4. **`<ol data-roadmap>`** on the schedule (§0.5 test 2).
5. **Stamp vocabulary.** `Stamp` already has `StampTone`. Add nothing to the
   component; map roadmap states to existing tones in the page:
   `in-development → "blood"`, everything else → `"bone"`. Resist adding a new
   tone — the palette doctrine allows one accent per division and the stamp
   component is shared by six.
6. **`Dashboard.tsx`**: `SPECIMEN` stamp in the header;
   `STREAMING` → `SPECIMEN — NOT LIVE DATA`. Leave the animation and the
   `getTotalLength()` measurement alone; both are correct and one of them was
   already fixed once.
7. **`Community Fabric`** folds into the module as module descriptions (plan
   §4). Do not delete the copy — it is good and A2 needs it.

### Assets
None. PULSE's world is procedural; this phase is text and data.

### Tools
Existing only. No new dependencies.

### Verify
```bash
cd satcorp-web && npx eslint . && npx tsc --noEmit && npm run build
```
Then read the page top to bottom, out loud, against plan §7.1–§7.3. Reading it
aloud catches the sentences that overclaim; scanning it does not.

### Exit
- [ ] No `● LIVE` anywhere outside the hero's establishment stamp.
- [ ] Every roadmap row's state comes from `ROADMAP`, not from JSX.
- [ ] The dashboard is visibly a specimen at a glance, not in a tooltip.
- [ ] Nothing in `page.tsx` is a second copy of anything in
      `pulse-platform.ts`.

### Failure modes
- **Turning the page into a client component** to render a tab or a stamp. The
  cost is the whole page's JS. Extract the interactive part instead.
- **Writing display strings into the data module.** `state: "SCHEDULED"` reads
  fine and defeats every check built on top of it.

---

## A2 — The new sections

> *The page starts explaining the product instead of describing a mood.*

**Entry:** A1 merged. Decision §13.4 answered (is `/pulse/specification`
public?) — recommendation is yes, and the work is the same either way; only the
`robots` directive changes.

### Work

1. **`components/worlds/pulse/Position.tsx`** (plan §4.III) — inline SVG, client
   component only because it animates.
   - **Not WebGL.** The trace already owns this page's only context; browsers
     cap contexts per document and a second one is how the page starts losing
     the first on mobile.
   - Stroke-dash draw-on, measured with `getTotalLength()` in the effect —
     the pattern `Dashboard.tsx` already uses. **Do not hardcode the length.**
     That exact bug has already been fixed once in this repo and the commit
     explaining why is `a2bc8aa`.
   - `gsap.context()` scoped to the root ref, reverted on unmount. Copy
     `Dashboard.tsx`'s structure; it is the house pattern.
   - Reduced motion: the diagram renders finished. Same `useReducedMotion()`
     early-return shape as `Dashboard`.
2. **`components/worlds/pulse/SpaceBoard.tsx`** (plan §4.V) — four tabs,
   `useState`, no store, no network. Keyboard support is not optional:
   arrow-key roving tabindex, `role="tablist"`, `aria-selected`,
   `aria-controls`. Follow `FileTabs.tsx` for the visual idiom.
3. **Section IX, The Doctrine** — copy only, and **gated on plan §7.4 being
   resolved.** Ships with A3's privacy amendment or later, never before.
4. **`app/(pulse)/pulse/specification/page.tsx`** — long-form, reusing the
   `.legal` treatment from `globals.css` and `components/system/LegalDocument.tsx`.
   Renders from `pulse-platform.ts`. This is where the fourteen modules, the
   role matrix, the verification classes and the API sketch live in full.
5. `npx next typegen` after adding the route. Add it to `sitemap.ts`.

### Assets
An OG card for `/pulse/specification` (see Part 4). A `<Placeholder>` frame if
any illustration is wanted before it exists — never a stock image, never an
empty div.

### Tools
Existing. GSAP and its ScrollTrigger registration go through `lib/gsap.ts` —
the single registration point. Do not import from `gsap/ScrollTrigger` directly.

### Verify
- Both new components with the OS reduced-motion setting **on** and **off**.
- `SpaceBoard` driven entirely from the keyboard, no mouse.
- WebGL disabled: the page must still be complete and legible.

### Exit
- [ ] `Position` and `SpaceBoard` both carry a reduced-motion path with content
      parity.
- [ ] No second WebGL context — confirm with
      `document.querySelectorAll("canvas").length === 1` in the console.
- [ ] `/pulse/specification` renders wholly from `pulse-platform.ts`.
- [ ] Route types regenerated; `npm run build` clean.

### Failure modes
- **A hardcoded dash length.** See above. Measure it.
- **Tab state in Zustand.** The store is for state that must survive
  navigation. A tab is not that, and `satcorp.engagement` is deliberately the
  only key the site writes.
- **A specification page that duplicates the module.** If it is not derived, it
  will drift, and the drift will be discovered by a reader rather than by you.

---

## A3 — The reservation

> *The only part of Track A that compounds. Also the first phase that accepts
> input from strangers, which changes the standard of care.*

**Entry:** A1 merged. Decisions §13.1 (domain) and §13.2 (open vs. invite)
answered — both are printed on the page. Privacy policy amendment drafted.

### Work

1. **Tooling, now** (§0.3): Vitest, Playwright, GitHub Actions, Dependabot.
   This is the phase where they earn their place.
2. **`lib/pulse-schema.ts`** — Zod, mirroring `lib/intake-schema.ts`. Shared by
   client and server; the server never trusts the client's copy of the rules,
   it re-runs them.
   - Normalisation is a **separate exported pure function**,
     `normaliseHandle(input): { handle: string; key: string } | null`, so it is
     unit-testable without a request. Implement plan §6.3 exactly: NFKC,
     casefold, strip zero-width, `^[a-z0-9_]{3,24}$`, confusable folding on the
     comparison key only, reserved-word rejection, no all-digits, no leading
     underscore.
3. **`app/actions/reserve.ts`** — modelled line for line on
   `app/actions/intake.ts`:
   - `"use server"`, honeypot + `MIN_ELAPSED_MS` time-trap (both fail silently),
     own limiter `createRateLimit({ windowMs: 60_000, max: 2 })`.
   - `PR-YYMMDD-XXXX` reference, `.reservations/<ref>.json`,
     `PULSE_WEBHOOK_URL` → `DISCORD_WEBHOOK_URL`, `PULSE_TO_EMAIL` →
     `INTAKE_TO_EMAIL`.
   - **The durability rule.** Extract the decision into a pure
     `deliverability(env): "durable" | "transport-only" | "none"` so the refusal
     path is testable without a request. `intake.ts` inlines this; the third
     copy is the point at which it should be shared — put it in
     `lib/delivery.ts` and refactor the other two in the same PR.
4. **The form component** — client, three fields (plan §6.2). `aria-live` on
   the result region. Live validation of the handle against `normaliseHandle`
   so the rejection is immediate and in voice, never a server round-trip for a
   character class.
5. **`.env.example`**, **`.gitignore`** (`/.reservations/`), **README** (two
   pipelines becomes three).
6. **The privacy policy amendment**, in the same PR. Not the next one.

### Tests — this is the phase that gets real ones

```ts
// tests/unit/handle.test.ts
import { describe, it, expect } from "vitest";
import { normaliseHandle } from "@/lib/pulse-schema";

const REJECT = [
  ["", "empty"], ["ab", "too short"], ["a".repeat(25), "too long"],
  ["_lead", "leading underscore"], ["123456", "all digits"],
  ["admin", "reserved"], ["satcorp", "reserved"], ["pulse", "reserved"],
  ["hi there", "space"], ["hé", "non-ascii"], ["ab​cd", "zero width"],
];

const COLLIDE = [
  ["satcorp", "satc0rp"], ["satcorp", "SATCORP"],
  ["satcorp", "sat_corp"], ["lima", "1ima"],
];

describe("normaliseHandle", () => {
  for (const [input, why] of REJECT)
    it(`rejects ${JSON.stringify(input)} — ${why}`, () =>
      expect(normaliseHandle(input)).toBeNull());

  for (const [a, b] of COLLIDE)
    it(`${a} and ${b} share a comparison key`, () =>
      expect(normaliseHandle(a)!.key).toBe(normaliseHandle(b)!.key));
});
```

Plus:
- **Transport refusal:** `deliverability({})` is `"none"` on an ephemeral
  filesystem, and the action refuses. Assert the *refusal*, not a thrown error.
- **Rate limiter:** the limiter is an in-process `Map`. Use `vi.resetModules()`
  between cases or the third test in a file inherits the second's window.
- **E2E (Playwright):** fill and submit the real form against `next start`;
  assert the reference appears and `aria-live` announces it. Assert the
  honeypot path returns the same UI as success — a bot must learn nothing from
  the response, and a test that asserts a *different* response would enshrine
  the leak.

### CI — the first workflow

`.github/workflows/ci.yml`: Node 24, `npm ci`, `eslint .`, `tsc --noEmit`,
`vitest run`, `next build`, `playwright test`. Cache `~/.npm` and Playwright
browsers. Required on `main`.

### Exit
- [ ] Handle normalisation covered by table-driven tests including confusables
      and reserved words.
- [ ] Submitting with no transport configured **refuses**, verified by running
      it with the env unset — not by reading the code.
- [ ] Honeypot and time-trap responses are indistinguishable from success.
- [ ] The privacy policy names the third pipeline and shipped in this PR.
- [ ] Copy says *filed claim*, never *reserved* or *yours* (plan §6.4).
- [ ] CI green and required.

### Failure modes
- **Promising the handle.** The storage layer is JSON files and a webhook.
  There is no unique index and there cannot be one until Track B phase 1. The
  copy must match the machinery.
- **Shipping the form ahead of the policy.** Collecting an email address for an
  undisclosed purpose is the one mistake this whole positioning cannot absorb.
- **Adding a fourth field.** Every field costs conversions on the only
  conversion the page has. If someone wants "how did you hear about us", the
  answer is no.

---

## A4 — The registry seam

> *Thirty lines, and KYRAX starts answering questions about PULSE.*

**Entry:** A1 merged (needs `pulse-platform.ts`).

### Work
1. Add a `platform` `EntryKind` to `lib/registry-index.ts`, built from
   `pulse-platform.ts` at module load alongside the existing derivations.
2. **Nothing is a second copy.** If an entry needs a summary the module does not
   have, add the field to the module — never write it into the index.
3. Extend `SERVICE_ALIASES`: `pulse id`, `handle`, `@username`, `space`,
   `membership`, `creator`, `community`, `verification`.
4. The holdings count is *counted*, not written down. It already is; keep it
   that way when the new kind lands.

### Verify
Ask the Registry, by hand, in the browser: "what is pulse id", "can I have a
handle", "what is a space", "does pulse cost money". Then ask three questions it
should *decline* and confirm the decline reads as a boundary rather than a
failure. The README's three recorded defects — substring matching, the `-es`
rule, per-section caps — are the failure modes; re-read that section before
touching the scorer.

### Exit
- [ ] New entries answer plausible questions and lose to better matches when
      they should.
- [ ] No hand-written answer text anywhere in the diff.
- [ ] Questions that return `FILE NIL` are noted for the alias list.

---

## A5 — Hardening

> *The phase that is always deferred and always the reason a launch slips.*

**Entry:** A1–A4 merged.

### Work
1. **Performance.** `@next/bundle-analyzer`; measure `/pulse` route JS against
   the ≤300KB gz budget. If over: the 3D is already dynamic-imported — look at
   GSAP plugin surface and anything pulled into the client boundary by accident.
   Add a size assertion to CI so the budget is enforced rather than admired.
2. **Accessibility.** `@axe-core/playwright` on `/pulse` and
   `/pulse/specification` for the automated floor; then by hand — keyboard-only
   traversal, focus visible at every stop (the red-thread ring), `SpaceBoard`
   with a screen reader, contrast on every new use of `#FF2B3A`. **It passes as
   an accent on ink and fails as body text**; if it is on text, it is wrong.
3. **Metadata.** `opengraph-image` for both routes (Part 4), `sitemap.ts`,
   `robots.ts`, structured data.
4. **Lite tier.** Whole page with WebGL disabled, on a throttled connection.
5. **Real devices.** A mid-tier Android and an iPhone, not DevTools emulation.
   The scroll rig (Lenis at lerp 0.12, the quickest on the site) and a
   full-viewport shader are exactly what mobile Safari punishes.

### Exit
- [ ] Route JS within budget, enforced in CI.
- [ ] Lighthouse ≥90 performance on the lite tier.
- [ ] Zero axe violations; keyboard walkthrough signed off by a human.
- [ ] OG cards render correctly in a real preview (Slack and Discord unfurl
      differently — check both, since Discord is where this audience lives).

---

## A6 — The `@name` page *(optional; recommended)*

> *Pull the cheapest slice of Track B phase 4 forward. A claimed handle that
> already resolves to a page is a far better artefact than one that resolves to
> nothing.*

**Entry:** A3 merged and receiving claims. Decision: does a filed claim get a
public page automatically, or only on request? **Recommend on request**, with a
confirmation step — an auto-published page for every claim is a spam surface
and a moderation queue you did not ask for.

### Work
A statically generated route rendering name, one line, and links, from the
reservation record. No feed, no follow, no comments — the moment it accepts
input it is Track B and needs everything in plan §12.

### Exit
- [ ] Static, cacheable, no user input.
- [ ] `noindex` until a human has reviewed the claim.
- [ ] The URL shape is the one Track B will keep: `pulse.satcorp.io/@name`.

---

# PART 2 — TRACK B, PHASE BY PHASE

Lower resolution deliberately: phase 1 is a team-quarter, and a task list
written a year ahead is fiction. What is fixed here is **order**, the
**non-negotiables**, and the **things that are ruinous to retrofit**.

## B0 — Foundation *(the phase the source note does not have, and needs)*

Nothing user-facing. Everything after it is cheaper.

- **Repo:** `pulse-app/`, separate from `satcorp-web`. Next 16, TypeScript
  strict, same ESLint config, same commit convention.
- **Tokens:** `tokens.css` copied from the web repo by a script, imported
  verbatim (plan §3.4). Not an npm package — two consumers do not justify a
  version-skew problem.
- **Theme adaptation** applied once, at the shell: blood-hot demoted to live and
  CTA states, Operator voice dominant, grain to 0.02, vignette off, tighter
  density, 44px touch targets.
- **Data:** Postgres + Drizzle, migrations in the repo, seeded local database,
  `docker compose` for Postgres/Redis/MinIO so a new machine is one command.
- **Environments:** local → staging → production, each with its own database and
  its own secrets. Staging never points at production data.
- **Observability from the first commit:** structured logs, error tracking,
  traces. Retro-fitting observability during an incident is how incidents get
  long.
- **CI:** lint, typecheck, test, migration check (does the migration apply to a
  fresh database *and* to a copy of staging), build.
- **Secrets:** a real manager (1Password/Doppler/Vault). Not `.env` in a chat
  message.

**Exit:** a developer clones, runs one command, and has a working app with a
seeded database. If that is not true, B1 will pay for it every single day.

## B1 — Core

Auth, PULSE ID, profiles, follow graph, feed, posts, comments, reactions,
notifications, basic DMs, communities, roles, search.

**Carries the three obligations, and its estimate is not an estimate without
them** (plan §10):
- **§9.3.1** sub-processor register — `lib/sub-processors.ts` + the published
  page + the egress-allow-list CI check.
- **§9.3.2** deletion pipeline — tombstones, durable jobs, cascade to
  derivatives, CDN invalidation, weekly reconciliation, `legal_hold`.
- **§9.3.3** quarantine-first ingest — nothing publicly addressable between
  upload and clearance.

**Identity is owned** (plan §9.1): own user table, own handle table, unique
index on the comparison key from §6.3, opaque `sub` distinct from the handle.
Library for plumbing; the schema is yours.

**Migrate the A3 reservations** into the handle table as part of this phase, in
filed order, with the review step. That is the whole reason the queue exists.

**Do not build in phase 1:** a distributed timeline, a recommendation system, a
mobile app, or anything KYRAX.

## B2 — Community
Chat, threads, voice, events, moderation tooling. Realtime is a **separate
tier** — Postgres as the durable log, Redis pub/sub, a dedicated WebSocket
service. Never in the Next server. Voice is LiveKit; do not build an SFU.

## B3 — Creator
Memberships, paid content, products, analytics, payouts. **Payments dominate
this phase**, and most of the work is not code: Stripe Connect Express, creator
KYC, tax handling, the creator agreement, chargeback and refund policy. Budget
legal time explicitly.

## B4 — Distribution
`@name` pages, link blocks, custom domains, business pages, SEO. Cheapest phase,
best marketing. A6 is its beachhead.

## B5 — Ecosystem
PULSE as OIDC provider. Scopes from the start; scoped roles, never global
(plan §11).

## B6 — Intelligence
KYRAX. Worth nothing before B1 has produced data, and nothing on the public page
may describe it in the present tense until it exists (plan §7.3).

## B7 — Platform
Public API, OAuth apps, bots. Version the API from its first public byte.

---

# PART 3 — TOOLCHAIN REFERENCE, 2026

Pinned to what this repository actually runs.

| Concern | Tool | Note |
|---|---|---|
| Runtime | **Node 24 LTS**, npm 11 | Pin in CI with `actions/setup-node` and in `engines` |
| Framework | **Next 16.3.0**, App Router, Turbopack | Read the bundled docs, not memory |
| UI | **React 19.2.8** | Server components by default; client only where state lives |
| Styling | **Tailwind v4** via `@tailwindcss/postcss` | Tokens in `@theme`, division overrides on `[data-division]` |
| Motion | **GSAP 3.15** + ScrollTrigger, **Lenis 1.3** | Register only in `lib/gsap.ts` |
| 3D | **three 0.185** + R3F 9 + drei | One context per page. Always |
| State | **Zustand 5** | One persisted key, `satcorp.engagement` |
| Validation | **Zod 4** | One schema module per pipeline, shared client/server |
| Unit tests | **Vitest** + Testing Library + jsdom | Cannot render `async` Server Components — use E2E |
| E2E | **Playwright** (chromium first) | Doctrine tests, intake paths, reduced motion |
| a11y | **@axe-core/playwright** + manual | Automated finds a floor, not a ceiling |
| Bundle | **@next/bundle-analyzer** + size assertion | ≤300KB gz route JS |
| Perf | **Lighthouse CI** | LCP ≤2.5s mid-tier mobile |
| CI | **GitHub Actions** (`SATCORPIO/satcorpio`) | lint · typecheck · test · build · e2e |
| Deps | **Dependabot** or Renovate | Grouped weekly PRs |
| Errors | **Sentry** or self-hosted GlitchTip | From B0 |
| Traces/logs | **OpenTelemetry** → Grafana/Loki/Tempo | From B0 |
| DB *(B)* | **Postgres 17** + Drizzle | Migrations in-repo, checked in CI |
| Jobs *(B)* | **pg-boss** or River | Same Postgres. One durable store |
| Realtime *(B)* | Postgres + Redis + Centrifugo | Separate tier |
| Voice *(B)* | **LiveKit**, self-hosted | Not an SFU you wrote |
| Storage *(B)* | **Cloudflare R2** behind `media.pulse.satcorp.io` | S3 API only (plan §9.2) |
| Payments *(B)* | **Stripe Connect Express** | Phase 3 |
| Secrets | 1Password / Doppler / Vault | Never `.env` in chat |

**Tools deliberately not adopted:** a component library (the design system is
the product), a CSS-in-JS runtime (Tailwind v4 plus tokens is the whole system),
a state library beyond Zustand, an ORM heavier than Drizzle, and any LLM in the
request path of a public input — see the Ask the Registry rebuild for the
standing argument.

---

# PART 4 — ASSETS

PULSE is **the one division whose page ships with no placeholder frames**,
because its world is procedural. So the asset list is short, and it is mostly
metadata.

| Asset | Spec | Phase |
|---|---|---|
| OG card, `/pulse` | 1200×630, dossier-cover treatment, ink ground, blood-hot rule | A5 |
| OG card, `/pulse/specification` | as above, `SPECIFICATION` stamp | A5 |
| OG card, `@name` pages | templated, generated per handle | A6 / B4 |
| Favicon / app icons | existing `app/icon.svg` carries; check the maskable variant | A5 |
| `Position` diagram | inline SVG, authored in code, no external file | A2 |

**Generate OG cards in code**, via Next's `opengraph-image` file convention
(`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md`)
rather than exporting PNGs by hand. Six divisions plus the spec plus every
future handle is more cards than anyone will keep in sync manually, and a
templated card inherits the fonts and tokens automatically.

**If real imagery is ever wanted** — a creator portrait, an event still —
it ships as `<Placeholder>` with a file number until the real asset exists. That
discipline is why this site reads as intentional before its art arrives, and it
costs no layout work to swap.

**Blender pipeline** (BUILD-PLAN §12) is not needed by PULSE. If that changes:
real-world scale, single 2–4k atlas, bake what is static, glTF →
`gltf-transform` → Draco/Meshopt + KTX2, ≤2MB for this division.

---

# PART 5 — ENVIRONMENTS, SECRETS, DEPLOY

### Environment matrix after A3

| Variable | Purpose | Required |
|---|---|---|
| `DISCORD_WEBHOOK_URL` | engagement briefs | production |
| `PARTNER_WEBHOOK_URL` | partnership approaches | production (falls back) |
| `PULSE_WEBHOOK_URL` | **handle claims** | production (falls back) |
| `RESEND_API_KEY` | email transport | if email used |
| `INTAKE_TO_EMAIL` / `PARTNER_TO_EMAIL` / `PULSE_TO_EMAIL` | inboxes | as above |
| `INTAKE_FROM_EMAIL` | verified sender domain | if email used |
| `INTAKE_DIR` / `PARTNER_DIR` / `PULSE_DIR` | record overrides | optional |

**The rule that keeps biting:** environment changes reach only a *new*
deployment. Setting a variable does nothing until the next build. This has
already been recorded once in the build plan against `PARTNER_WEBHOOK_URL`;
expect it again with `PULSE_WEBHOOK_URL`.

**On Vercel the filesystem is ephemeral**, so the JSON record proves nothing and
at least one transport must be configured or the form refuses. On SATCORP iron
the disk is the record. The code already distinguishes these; keep it that way
when you copy `intake.ts`.

### Deploy path
Today: Vercel (`vercel.json`, framework `nextjs`). Planned: Docker standalone
behind nginx on SATCORP iron, with a Cloudflare Tunnel (BUILD-PLAN §14).

**When that move happens**, three things change and all three are easy to
forget: the ephemeral-filesystem branch stops applying (records become durable),
the in-process rate limiter becomes honest for a single instance and dishonest
the moment there are two, and the sub-processor register (§9.3.1) loses an entry
— which is a policy change, dated, like any other.

---

# PART 6 — SEQUENCING

```
A1 ──► A2 ──┐
     └► A3 ──┴─► A4 ──► A5 ──► A6 ──► B0 ──► B1 ──► B2 …
```

- **A1 gates everything**; it is also the smallest.
- **A2 and A3 are independent** and can run in parallel with two people. With
  one person, do **A3 first** — it is the one that compounds, and A2 is
  presentation.
- **A4 needs only A1.** Slot it into any gap; it is an afternoon.
- **A5 is not optional and is not a phase you compress.** Everything it catches
  is something a visitor would have caught instead.
- **B0 before B1, always.** The temptation to start on features and add the
  foundation later is the single most expensive mistake available here.

**Rough shape, one experienced developer:** A1 days · A2 a week · A3 a week ·
A4 an afternoon · A5 a week · A6 days. Track B is a different unit of
measurement entirely, with a team, and any number offered before B0 is complete
is a guess wearing a suit.

---

*"Build it in the order that makes the next thing cheaper, and stamp everything
you have not built yet."*
