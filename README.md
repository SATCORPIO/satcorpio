# SATCORP Namtar Orbital

An interactive orbital view of the NAMTAR planetary system, used as the navigation
surface for SATCORP's four divisions. Drag to orbit, click a craft to open its
division, click a surface feature to read about it, click Namtar itself for the
briefing on the game set there.

Built with Vite and three.js. The planet, clouds, atmosphere, debris ring and
moons all come from the NAMTAR Blender project; the spacecraft, HUD and telemetry
are the mission-control frame built around them.

> The NAMTAR project (the `.blend` scene, its Python generators and 283 MB of 8K
> source maps) is a **separate local project and is not part of this repo**
> paths to it below are from the machine this was authored on. Everything needed
> to build and deploy the site is committed here; you only need that project to
> regenerate textures from scratch.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
```

The previous version the whole site as one 1,292-line HTML file on three.js
r128 is kept at [`reference/legacy-index.html`](reference/legacy-index.html).
It is not built or served; it is there because the HUD, content model, camera rig
and craft geometry in this project were ported from it, and it is the thing to
diff against when something behaves differently than it used to.

## How the Blender project reaches the browser

Nothing is exported as geometry. Every body in the Blender scene is a parametric
UV sphere or an annulus, so exporting them would ship megabytes of vertices that
describe shapes three.js can generate in a line of code. What actually crosses
over is the **maps** and the **shader parameters**.

`blender_rebuild.py` is the source of truth for the look. Its node graphs were
translated by hand into GLSL, keeping the same constants the roughness split
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
- Emits a small height map for Veyra. Its relief is 1.2× its own radius it is a
  captured fragment, not a sphere so a normal map cannot fake its silhouette
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

About 1.9 MB over the wire on desktop (1.76 MB of textures, 150 KB of gzipped
JS) and roughly 640 KB on mobile, which loads a half-resolution tier from
`public/tex/2k/`. Roughly 150 draw calls.

Everything animated is gated behind `prefers-reduced-motion`, including planetary
rotation, cloud drift, the survey sweep, and both craft and moon orbits.

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
| Grain overlay, `backdrop-filter` | on | off |

Two of those are not about the GPU's shader budget at all. A full-screen
`mix-blend-mode: overlay` layer and a `backdrop-filter` over a live canvas both
force the *compositor* to keep and re-read a copy of everything beneath them,
every frame — on a phone that is the most expensive non-WebGL work on the page,
and it is spent on film grain and a blur nobody can see over a moving scene.

Width is only a guess at what a device can do, so `main.js` also runs a
resolution governor: a second of frame times, and if the device cannot hold 40
fps the framebuffer drops a quarter step, to a floor of 0.75. It only ever steps
down — a ratio that walks both ways oscillates, because lowering the resolution
creates exactly the conditions for raising it again.

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
