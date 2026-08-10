/**
 * One noise field for the whole planet.
 *
 * The orbit view, the cloud deck and the terrain tile you fly over all sample
 * the same value-noise fbm. That is the point: they have to read as one world
 * seen from three distances, and a second noise function would have made the
 * surface look like somewhere else.
 *
 * Value noise rather than simplex — cheaper, and at these frequencies the
 * difference is invisible under a biome ramp.
 */
export const NOISE_GLSL = /* glsl */ `
  float nmHash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float nmNoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(nmHash(i + vec3(0,0,0)), nmHash(i + vec3(1,0,0)), f.x),
          mix(nmHash(i + vec3(0,1,0)), nmHash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(nmHash(i + vec3(0,0,1)), nmHash(i + vec3(1,0,1)), f.x),
          mix(nmHash(i + vec3(0,1,1)), nmHash(i + vec3(1,1,1)), f.x), f.y),
      f.z);
  }

  float nmFbm(vec3 p, int octaves) {
    float sum = 0.0;
    float amp = 0.5;
    float norm = 0.0;
    for (int i = 0; i < 8; i++) {
      if (i >= octaves) break;
      sum += amp * nmNoise(p);
      norm += amp;
      p *= 2.03;
      amp *= 0.5;
    }
    return sum / max(norm, 0.0001);
  }

  /**
   * Aerial perspective. Everything standing on the ground has to use the same
   * curve or the monoliths detach from the landscape they are standing in —
   * and it is the haze, more than anything else, that sells the scale.
   */
  vec3 nmHaze(vec3 color, vec3 haze, float dist) {
    float f = 1.0 - exp(-pow(dist * 0.0072, 2.1));
    return mix(color, haze, clamp(f, 0.0, 1.0));
  }

  /** Ridged variant — what turns rolling hills into mountain chains. */
  float nmRidge(vec3 p, int octaves) {
    float sum = 0.0;
    float amp = 0.5;
    float norm = 0.0;
    for (int i = 0; i < 8; i++) {
      if (i >= octaves) break;
      float n = 1.0 - abs(nmNoise(p) * 2.0 - 1.0);
      sum += amp * n * n;
      norm += amp;
      p *= 2.11;
      amp *= 0.5;
    }
    return sum / max(norm, 0.0001);
  }
`;
