import { Vector3 } from 'three';

export const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Namtar's radius in scene units. Every camera clamp, orbit radius, shadow
   frustum and the ALT readout is expressed against this, so it is the anchor
   the NAMTAR assets are scaled to rather than the other way round. */
export const PR = 30;

/* The Blender scene works at 1 unit = 1000 km with a planet radius of 8.25
   (16,500 km diameter, spec sec.2). Everything imported from it — ring radii,
   shell altitudes, moon sizes — is authored in those units and converted here. */
export const BU = PR / 8.25;

/* Cloud shell altitude, straight from blender_rebuild.py. The atmosphere's
   1.032 is deliberately not mirrored here — that column is only ~1 scene unit
   thick and would be invisible on screen, so atmosphere.js derives its own
   shell from an exaggerated scale height and documents why. */
export const CLOUD_TOP = 1.0105;

/* A distant sun off-frame is the key light: it gives Namtar a terminator and a
   lit limb, which is what makes the planet read as a sphere rather than a disc. */
export const SUNDIR = new Vector3(1, 0.3, 0.55).normalize();

/* The cyan rim light separates craft from the void, but pointed at a planet it
   fills the night side with light that has no business being there. Confining it
   to its own layer keeps the rim on the hardware and off Namtar. */
export const RIM_LAYER = 2;

/* id, orbit radius, inclination, starting phase, angular speed. */
export const CRAFT_ORBITS = [
  ['kira', 46, 0.2, 0.0, 0.052],
  ['pulse', 62, -0.3, 1.9, 0.038],
  ['kyrax', 80, 0.36, 3.4, 0.029],
  ['anu', 100, -0.16, 5.1, 0.022],
];

/* Debris ring, 13.0–17.6 BU in the Blender scene (build_rings). That maps to
   47.3–64.0 here, which straddles the kira (46) and pulse (62) orbits. The craft
   radii are tuned interface distances and stay put; the ring plane is tilted off
   the mean orbital plane instead, so craft cross a broken arc at a visible angle
   rather than swimming inside it. */
export const RING_IN = 13.0 * BU;
export const RING_OUT = 17.6 * BU;
export const RING_TILT = 0.135;          // ~7.7° off the craft mean plane
export const RING_SPIN = (170 * Math.PI) / 180;

/* Moon orbits are invented: the Blender scene places both bodies off-axis for a
   single still (place_off_axis) rather than on real orbits. Radii sit outside
   ANU's 100-unit orbit and inside the 430 zoom-out clamp. */
export const MOONS = {
  talos: { radius: 0.695 * BU, orbit: 150, inc: 0.1, phase: 2.1, speed: 0.0075 },
  veyra: { radius: 0.125 * BU, orbit: 205, inc: -0.14, phase: 4.4, speed: 0.0045 },
};

/* Two texture tiers. Anything absent from the mobile set falls back to desktop —
   talos_normal is 0.19 MB and has no cheaper version worth cutting. */
export const MOBILE = matchMedia('(max-width: 900px)').matches;
export const TEX_DIR = import.meta.env.BASE_URL + 'tex/';
export const TEX_TIER = MOBILE ? TEX_DIR + '2k/' : TEX_DIR;
export const TEX_ONLY_DESKTOP = new Set(['talos_normal']);

/* Touch, as opposed to small: a phone needs bigger hit targets and a pinch
   gesture whatever its viewport reports, and a narrow desktop window needs
   neither. Kept separate from MOBILE, which is about GPU budget. */
export const COARSE = matchMedia('(pointer: coarse)').matches;

/* Tessellation budget. The planet and its two shells are the heaviest geometry
   on screen and are drawn every frame at full-disc size, so this is where a
   phone gets its milliseconds back. At the default 225-unit range the mobile
   planet silhouette is still smooth — the segments only start to show if you
   zoom past ~110, which the camera clamp does not allow on the limb. */
export const SEG = MOBILE
  ? { planet: [96, 64], shell: [64, 44], ring: 256 }
  : { planet: [128, 96], shell: [96, 64], ring: 512 };

/* Device pixel ratio ceiling. A modern phone reports 3, which means nine times
   the fragments of a CSS pixel for a full-screen shader chain — far past the
   point where anyone can see the difference on a 6-inch panel. The renderer
   starts here and the frame-time governor in main.js may lower it further. */
export const MAX_DPR = MOBILE ? 1.25 : 1.6;
export const MIN_DPR = MOBILE ? 0.75 : 1;
