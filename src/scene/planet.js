import { Mesh, SphereGeometry, MeshStandardMaterial, Vector3, ShaderChunk } from 'three';
import { PR, SEG } from '../core/config.js';
import { VALUE_NOISE_3D } from '../shaders/noise.js';

/* String surgery on three's shaders is silent when it misses: the material
   still compiles, it just renders without the change. Every patch goes through
   here so a three upgrade that renames a chunk fails at startup instead of
   quietly shipping a planet with no night side. */
function patch(source, find, replace, what) {
  if (!source.includes(find)) {
    throw new Error(`planet surface: could not find "${find}" to patch ${what}. ` +
      'three\'s shader chunks have changed   check meshphysical_frag.');
  }
  return source.replace(find, replace);
}

/**
 * Namtar's surface.
 *
 * Cycles drives this from a node graph (blender_rebuild.build_surface): a
 * water/land roughness split, terrain normals that fade out over the sea, and
 * two night-side emission layers. None of that survives an export, so the same
 * three behaviours are injected into MeshStandardMaterial instead   which keeps
 * three's PBR lighting, shadows and env map rather than rebuilding them.
 *
 * Injection order matters: roughnessmap_fragment runs before
 * normal_fragment_maps, which runs before emissivemap_fragment, so the mask is
 * sampled once in the first patch and the later two reuse it.
 */
export function createSurface(tex) {
  const material = new MeshStandardMaterial({
    map: tex.albedo,
    normalMap: tex.normal,
    roughness: 1,
    metalness: 0,
    // the planet is lit by its star, not by the environment: a high value here
    // washes out the terminator that makes it read as a sphere
    envMapIntensity: 0.14,
  });

  const uniforms = {
    uMask: { value: tex.mask },
    uNight: { value: tex.night },
    /* Sun direction in the planet's own frame. The planet rotates, so a world
       or view-space vector would drag the terminator across the surface. */
    uSunLocal: { value: new Vector3(1, 0, 0) },
    uTime: { value: 0 },
  };

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    /* The planet is a sphere centred on its own origin, so the normalised
       object-space position is the local vertical   the same quantity
       night_mask() uses in Blender, and immune to bump detail chewing up the
       terminator. */
    let vert = shader.vertexShader;
    vert = patch(vert, '#include <common>', '#include <common>\nvarying vec3 vUpLocal;', 'vertex varying');
    vert = patch(vert, '#include <begin_vertex>',
      '#include <begin_vertex>\nvUpLocal = normalize(position);', 'local vertical');
    shader.vertexShader = vert;

    let frag = shader.fragmentShader;

    frag = patch(frag, '#include <common>',
      `#include <common>
       uniform sampler2D uMask;
       uniform sampler2D uNight;
       uniform vec3 uSunLocal;
       uniform float uTime;
       varying vec3 vUpLocal;
       ${VALUE_NOISE_3D}`,
      'fragment uniforms');

    /* Roughness. Open water is glassy and wind-roughened (0.038–0.135 in
       Blender), land is matte and slightly smoothed by vegetation (0.90 →
       0.74). The specular glint this produces on the sea is the single biggest
       realism win on the whole planet. */
    frag = patch(frag, '#include <roughnessmap_fragment>',
      `vec3 nMask = texture2D(uMask, vMapUv).rgb;
       float water = nMask.r;
       float iceMask = nMask.g;
       float veg = nMask.b;
       float wind = fbm3(vUpLocal * 3.4 + vec3(0.0, uTime * 0.006, 0.0), 4);
       /* Blender's 0.038–0.135 assumes a sun with real angular size, which
          spreads the reflection into a glitter path. three's directional light
          is a delta light, so the same roughness collapses to one blown-out
          pixel   widening the range restores a broad highlight instead. */
       float waterRough = mix(0.090, 0.230, smoothstep(0.15, 0.85, wind));
       float landRough = mix(0.90, 0.74, veg);
       float roughnessFactor = mix(landRough, waterRough, water);
       // sea ice is neither: rough enough to kill the glint, not as matte as land
       roughnessFactor = mix(roughnessFactor, 0.62, iceMask * water);`,
      'water/land roughness');

    /* Terrain relief has no business showing up on the sea surface, where the
       height field is only bathymetry. Blender ramps normal strength 1.25 → 0
       with the water mask. The chunk has to be expanded by hand: onBeforeCompile
       runs before three resolves #include, so patching a line inside it would
       hit nothing. */
    frag = patch(frag, '#include <normal_fragment_maps>',
      patch(ShaderChunk.normal_fragment_maps,
        'mapN.xy *= normalScale;',
        'mapN.xy *= normalScale * mix(1.25, 0.0, water);',
        'normal strength over water'),
      'normal map chunk');

    /* Night side. An emissive map alone glows straight through the daylit
       hemisphere, which is the biggest tell that a planet is fake   both
       layers are gated on the sun angle with a soft terminator. */
    frag = patch(frag, '#include <emissivemap_fragment>',
      `float night = smoothstep(0.10, -0.14, dot(normalize(vUpLocal), uSunLocal));
       vec2 nightTex = texture2D(uNight, vMapUv).rg;
       vec3 settlements = nightTex.r * 0.42 * vec3(1.0, 0.76, 0.50);
       vec3 rift = pow(nightTex.g, 1.6) * 3.2 * vec3(1.0, 0.245, 0.038);
       totalEmissiveRadiance += night * (settlements + rift);`,
      'night-side emission');

    shader.fragmentShader = frag;
  };

  const mesh = new Mesh(new SphereGeometry(PR, ...SEG.planet), material);
  mesh.receiveShadow = true;
  mesh.userData.uniforms = uniforms;
  return mesh;
}
