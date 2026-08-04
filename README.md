# SATCORP — Namtar Orbital

An interactive orbital view of the NAMTAR planetary system, used as the front
door to SATCORP's divisions. Drag to orbit; click a craft — or Namtar itself —
and the camera dives at it before handing over to that section's own page. Click
a surface feature to read about it. The section list on the left does the same
thing for anyone who would rather not hunt for a spacecraft, and can be dismissed
if it is in the way.

Built with Vite and three.js. The planet, clouds, atmosphere, debris ring and
moons all come from the NAMTAR Blender project; the spacecraft, HUD and telemetry
are the mission-control frame built around them.

## Site structure

A multi-page build, not a single-page app. The orbital view is the home page and
carries the whole three.js payload; each division is a separate static document
that loads none of it.

| URL | Entry | Identity |
|---|---|---|
| `/` | `index.html` → `src/main.js` | The orbital scene |
| `/namtar/` | `namtar/index.html` | The game — crimson, condensed, image-led |
| `/kira/` | `kira/index.html` | Ki-Ra Studios — cinematic, cyan |
| `/kyrax/` | `kyrax/index.html` | KYRAX — obsidian and electric blue, holographic |
| `/pulse/` | `pulse/index.html` | PULSE — broadcast control room |
| `/anu/` | `anu/index.html` | ANU — terminal, monospace throughout |

Each section page is meant to read as its own site. The only thing they share is
`src/pages/shared/base.css`, which deliberately contains no colour and no type
choice of its own: it defines a custom-property contract (`--bg --surface --ink
--muted --accent --line --display --body --mono`) and the shared furniture styles
itself exclusively from that. A page redefines those properties and every
component follows. The one constant across all five is the return-to-orbit link,
in the same place and the same words.

`vite.config.js` lists every document in `rollupOptions.input`. The HTML lives in
folders at the repo root rather than under `src/`, because Vite mirrors an entry's
source position into `dist/` — that is what produces `dist/kyrax/index.html`, and
therefore the clean `/kyrax/` URL, on any host with directory-index behaviour.

`base` is `'/'`, not `'./'`. Section pages sit one directory deep, and a relative
base resolves runtime URLs — `TEX_DIR`, the landmarks fetch, the departure
navigation — against whichever page is open rather than against the site root.
Deploying anywhere other than a domain root means changing it.

### The departure transition

Choosing a division is a journey rather than a state change. `depart(id)` in
`src/main.js` sets the camera's target to arm's length from the object and
roughly doubles the approach rate, then at +330 ms fades in `#warp` — a wash of
that object's own colour over its section's exact background — and navigates at
+890 ms, while the wash is fully opaque. Every section page then fades in from
the same colour the wash ended on, so the navigation lands mid-fade and the whole
thing reads as one continuous move into the object.

`DATA[id].pageBg` in `src/content/data.js` is what makes that seamless, and it
has to match the `--bg` the section's stylesheet sets or the cut flashes.

The section pages are prefetched from `src/hud/menu.js` while the visitor is
still orbiting, so the page behind the warp is normally already in cache. (They
are built as `<link>` elements from script rather than written into the document
head: Vite resolves `link[href]` in HTML as a build asset, and these point at
directories.)

`src/hud/legacy.js` redirects the old `#/kyrax` hash routes to `/kyrax/`. It is
imported first in `main.js` so it runs before three.js is even evaluated.

## Deployment

Vercel, at the domain root. `vercel.json` carries the security headers and cache
policy; there is **no SPA rewrite**, and adding one would shadow every section
page.

The Content-Security-Policy is strict on scripts (`script-src 'self'`), which
holds because every script on the site is an external module — no inline
`<script>`, no `onclick` attributes. Adding an inline script anywhere breaks it;
put the code in a file, or add its hash to the header. `style-src` does allow
`'unsafe-inline'`, for the inline `<style>` block on the orbital page and the
handful of inline style attributes on the section pages.

Being static, the site has no endpoint to rate-limit in code, so it is done at
the edge. Vercel's DDoS mitigation is automatic on every plan; beyond that, in
the project's **Firewall** settings, enable Attack Challenge Mode as an incident
control and — on Pro — add an IP rate-limit rule (roughly 100 requests / 10 s →
challenge). Keep preview deployments behind Vercel authentication and leave
bypass links off. If DNS ever moves to Cloudflare, its free rate-limiting rule
and bot-fight mode cover the same ground.

`public/` also carries `robots.txt`, `sitemap.xml` and `.well-known/security.txt`.
The contact address is assembled at runtime in `src/pages/shared/page.js` rather
than sitting in the markup as a harvestable `mailto:`.

> The NAMTAR project (the `.blend` scene, its Python generators and 283 MB of 8K
> source maps) is a **separate local project and is not part of this repo** —
> paths to it below are from the machine this was authored on. Everything needed
> to build and deploy the site is committed here; you only need that project to
> regenerate textures from scratch.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # -> dist/
npm run preview      # serve the build on http://localhost:4173
npm run textures     # NAMTAR source maps -> public/tex   (needs the Blender project)
npm run page-assets  # NAMTAR renders -> public/img       (needs the Blender project)
```

The previous version — the whole site as one 1,292-line HTML file on three.js
r128 — is kept at [`reference/legacy-index.html`](reference/legacy-index.html).
It is not built or served; it is there because the HUD, content model, camera rig
and craft geometry in this project were ported from it, and it is the thing to
diff against when something behaves differently than it used to.

## How the Blender project reaches the browser

Nothing is exported as geometry. Every body in the Blender scene is a parametric
UV sphere or an annulus, so exporting them would ship megabytes of vertices that
describe shapes three.js can generate in a line of code. What actually crosses
over is the **maps** and the **shader parameters**.

`blender_rebuild.py` is the source of truth for the look. Its node graphs were
translated by hand into GLSL, keeping the same constants — the roughness split
between land and water, the night-side terminator falloff, the ring's density
ramps, the atmosphere's limb tint. When something looks wrong, that file is the
reference to check against, along with the stills in the NAMTAR project's
`renders/` folder.

### Regenerating the textures

Three generator stages run offline, in order. Only the last two normally need
re-running; the first takes about 12 minutes.

```bash
cd "D:/NAMTAR Planet/tools"
python gen_planet_maps.py        # surface: albedo, height, normal, masks, lights
python gen_cloud_moon_maps.py    # cloud system + Talos/Veyra height and albedo
python gen_web_maps.py           # web-only bakes and repacks (see below)
```

```bash
cd D:/sattest/satcorp
npm run textures                 # 283 MB of source PNG -> 1.8 MB of WebP
node scripts/verify-textures.mjs # checks no channel came out empty
```

`gen_web_maps.py` does three things the Blender scene does not need:

- Bakes Talos' Displace modifier into a normal map, so the moon ships as a smooth
  48×32 sphere instead of a displaced 384×192 one.
- Emits a small height map for Veyra. Its relief is 1.2× its own radius — it is a
  captured fragment, not a sphere — so a normal map cannot fake its silhouette
  and the vertices are displaced on the CPU at load instead.
- Re-projects the Milky Way band from `build_starfield`'s flat compositor
  backdrop into an equirect image that can sit on a sky sphere. The 14,000 stars
  themselves are regenerated as GPU points at runtime, which replaces a 100 MB
  EXR with nothing at all and gains parallax as the camera orbits.

It also **repacks the surface masks to remove the alpha channel**, and that is
load-bearing rather than cosmetic. `namtar_mask.png` stores four independent
coverage masks as RGBA, with rift heat in alpha — and rift heat is zero across
98% of the globe. Any image pipeline that premultiplies on resize (libvips, and
therefore sharp) will silently multiply water, ice and vegetation by ~0 and write
out black maps that still look like valid files. They are split into
`namtar_mask_rgb.png` (water/ice/vegetation) and `namtar_night.png`
(settlement glow / rift heat) so the ambiguity cannot arise. `build-textures.mjs`
refuses any source with an alpha channel for the same reason, and
`verify-textures.mjs` checks the water channel still covers roughly the 58% of
the surface the design document calls for.

## Where the look is decided

Most of the visual tuning lives in a handful of constants, all commented where
they sit:

| What | Where |
|---|---|
| Ocean glint, night lights, rift glow | `src/scene/planet.js` |
| Cloud coverage threshold and softness | `src/scene/clouds.js` |
| Limb colour, haze over the disc, aurora | `src/scene/atmosphere.js` |
| Ring gaps, arc break, backlighting | `src/scene/ring.js` |
| Bloom, grain, aberration, tone mapping | `src/post/composer.js`, `src/scene/renderer.js` |

Two of these deserve a note, because the physically correct value is the wrong
one here:

**The atmosphere is deliberately too thick.** Blender's Rayleigh scale height of
0.0042 planet radii is the real ~35 km column, which at this scene's scale is
about a pixel. `EXAGGERATION` in `atmosphere.js` stretches it until the limb is
visible, keeping the Rayleigh:Mie ratio intact so the blue-green limb and the
tight white sunward arc stay distinguishable. The disc haze and the limb glow are
tuned as separate coefficients (`uDisc`, `uLimb`) because their physical ratio,
about 20:1, leaves whichever end you tune for correct and the other one either
invisible or blown out.

**Water is rougher than Blender's value.** Cycles renders a sun with real angular
size, which spreads the ocean's reflection into a glitter path. three's
directional light is a delta light, so the same 0.038 roughness collapses to one
blown-out pixel; the range is widened until the highlight has width again.

## Scale

The scene keeps the legacy site's units: Namtar's radius is 30, and every camera
clamp, orbit radius, shadow frustum and the ALT readout is tuned against that.
The Blender project works at 1 unit = 1000 km with a radius of 8.25 (16,500 km
diameter, spec sec.2), so everything imported from it is multiplied by
`BU = 30 / 8.25` in `src/core/config.js`.

Craft orbits are interface distances, not astronomy — the spacecraft are drawn
far too large so they stay readable as tracking targets. The debris ring's real
radii land on top of the kira and pulse orbits, so the ring plane is tilted off
the orbital plane rather than moving either.

## Performance

The orbital page is about 1.9 MB over the wire on desktop (1.76 MB of textures,
150 KB of gzipped JS) and roughly 640 KB on mobile, which loads a half-resolution
tier from `public/tex/2k/`. Roughly 150 draw calls.

**The section pages are a different order of thing entirely**: 5–8 KB gzipped
each, plus a hero image around 13–27 KB. They import no three.js, so the cut from
a live WebGL scene to a page that has finished loading before the wash clears is
what makes the transition feel deliberate rather than slow. `npm run page-assets`
emits each hero at 960/1600/2560 and each gallery frame at two widths, all WebP;
every image carries explicit dimensions so nothing shifts as it decodes.

Everything animated is gated behind `prefers-reduced-motion`, including planetary
rotation, cloud drift, the survey sweep, both craft and moon orbits, storm
lightning, the HUD's link meters, and every looping decoration on the section
pages. The departure wash is the deliberate exception — it is the navigation
itself, not decoration, so it shortens to 260 ms rather than disappearing.

### Flicker

Three things on the page flash, and all three are tuned down from where they
started, because at close range they read as a fault in the display rather than
as atmosphere:

- **Storm lightning** (`src/scene/clouds.js`) fires at roughly half the old rate
  and half the amplitude, and a `gate` term retires about 45% of convective cells
  permanently — the even carpet of flashes across the night side was what made it
  shimmer. The `pow(…, 220.0)` sharpness is kept: that is the whole character of
  a lightning strike, and softening it gives a pulsing glow instead.
- **The LINK meter** (`src/hud/telemetry.js`) updates about twice a second rather
  than four times, and drops a bar about once a second rather than three times.
- **Looping CSS decoration** on the orbital page is collected under a single
  `prefers-reduced-motion: no-preference` block, so the setting removes the whole
  ambient layer at once instead of being fought element by element.

### The mobile tier

`MOBILE` in `src/core/config.js` is one media query, evaluated once at load, and
everything below keys off it:

| | Desktop | Mobile |
|---|---|---|
| Planet / shell / ring segments (`SEG`) | 128×96, 96×64, 512 | 96×64, 64×44, 256 |
| Pixel ratio ceiling (`MAX_DPR`) | 1.6 | 1.25 |
| Shadow map, filter | 2048, PCF soft | 512, PCF |
| Bloom chain resolution | full | half |
| Composer MSAA | 4× | off |
| Stars | 6,500 | 3,500 |
| `backdrop-filter` | on | off |

That last one is not about the GPU's shader budget at all: a `backdrop-filter`
over a live canvas forces the *compositor* to keep and re-read a copy of
everything beneath it, every frame, for a blur nobody can see over a moving
scene. Film grain used to be a second instance of the same problem — a
full-screen `mix-blend-mode: overlay` element sitting on top of the canvas. It
is gone; the final shader pass was already producing grain one pass earlier, so
`uGrain` simply went up a little.

### The quality governor

Width is only a guess at what a device can do, so `main.js` measures instead: a
second of frame times, and if the device cannot hold 40 fps it gives something
up. *What* it gives up, and in what order, is the design:

1. **Bloom resolution** — bloom is already a blur, so halving its five-tap
   pyramid is the largest saving available for the least visible cost. Spent
   first; on mobile it is already spent at startup.
2. **Framebuffer** — a quarter step at a time, to a floor of 0.75. This softens
   everything including type, so it comes second.
3. **Frame rate** — at the resolution floor there is nothing left to sharpen
   away, so the draw runs every other frame. The loop still updates every frame
   on the real delta, so nothing animates at half speed; a steady 30 beats a 45
   that stutters, and on a phone it is battery rather than pixels.

Every step is one-way. A ratio that walks both ways oscillates, because lowering
quality creates exactly the conditions for raising it again, and a scene that
visibly resamples itself once a second is worse than one that is simply a little
soft.

Separately, every HUD callout that moves — the target lock, the Namtar limb
label, the surface pins — is placed with the `translate`/`rotate`/`scale`
properties rather than `left`/`top`/`width`. Those are composited; the layout
properties are not, and these run on every pin on every frame. Keeping them off
`transform` leaves it free for the centring offsets and hover states that need
to transition independently of position.

Resize is debounced by 140 ms. Mobile browsers fire it on every pixel of URL-bar
travel, and each one otherwise reallocates the composer's half-float target plus
five bloom mips.

### Touch

There is no hover on a phone, so `pointerdown` runs the pick that a mouse would
have done on its way in — without it a tap lands with nothing under the cursor
and selects nothing. Two pointers are a pinch (the wheel event has no touch
equivalent); one is a drag. Surface-feature pins carry an invisible 40px pad
because the visible dot is 7px.

## Dev handle

In dev builds `window.__satcorp` exposes the scene, camera, materials and
composer, plus `__satcorp.view(radius, theta, phi)` to park the camera at a
known angle. Comparing against `renders/NAMTAR_hero_v002_crimson.png` at a
matched angle is how the shader constants above were arrived at.
