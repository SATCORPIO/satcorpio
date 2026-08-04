/* Value noise on a 3D position, quintic-smoothed the same construction
   namtar_lib.value_noise3 uses offline, so procedural detail added in a shader
   sits in the same visual family as the baked maps. */
export const VALUE_NOISE_3D = /* glsl */ `
float nhash(vec3 p){
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
}
float vnoise(vec3 p){
  vec3 i = floor(p), f = fract(p);
  vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(
    mix(mix(nhash(i + vec3(0,0,0)), nhash(i + vec3(1,0,0)), u.x),
        mix(nhash(i + vec3(0,1,0)), nhash(i + vec3(1,1,0)), u.x), u.y),
    mix(mix(nhash(i + vec3(0,0,1)), nhash(i + vec3(1,0,1)), u.x),
        mix(nhash(i + vec3(0,1,1)), nhash(i + vec3(1,1,1)), u.x), u.y), u.z);
}
float fbm3(vec3 p, int octaves){
  float s = 0.0, a = 0.5, n = 0.0;
  for (int i = 0; i < 6; i++){
    if (i >= octaves) break;
    s += a * vnoise(p);
    n += a;
    a *= 0.5;
    p *= 2.0;
  }
  return s / n;
}
`;
