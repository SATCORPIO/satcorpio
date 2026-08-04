/* ==========================================================================
   NAMTAR — THE DESCENT

   The planet itself, live, behind the whole page. Not the orbital view's
   planet: that one carries a ring, two moons, a shadow-casting sun, a post
   chain and a HUD, because it is a navigator. This is a backdrop that the page
   descends through, so it is four meshes and one custom shader, and it drops
   everything the orbital view needs in order to be clicked.

   Textures are the same URLs the orbital page loads. A visitor who arrived
   through the warp already has every one of them in cache, which is the whole
   reason this page can put a live planet behind it and still feel instant.

   Scroll is the camera rig: the page falls from high orbit to low, the sun
   swings around to put the night side and the Black Rift on screen, and the
   surface pins are real projected anchors rather than decorations.
   ========================================================================== */

import { clamp, damp, lerp, scrollTracker, pointerTracker, disposeTree } from '../shared/stage.js';

const PR = 30;                       // planet radius, the orbital view's unit
const CLOUD = 1.0105;                // cloud shell altitude, blender_rebuild.py
const TEX = import.meta.env.BASE_URL + 'tex/';

/* Longitude/latitude to a direction in the planet's local frame. Must agree
   with three's SphereGeometry, which is what the equirect maps are wrapped
   onto: u=0 sits at longitude -180 and v=0 at the north pole. Same derivation
   as src/hud/landmarks.js — duplicated rather than imported, because that
   module pulls the orbital HUD in behind it. */
function lonLatToDir(THREE, lonDeg, latDeg) {
  const lon = (lonDeg * Math.PI) / 180;
  const lat = (latDeg * Math.PI) / 180;
  return new THREE.Vector3(
    Math.cos(lat) * Math.cos(lon),
    Math.sin(lat),
    -Math.cos(lat) * Math.sin(lon)
  );
}

/* The three features the page actually talks about. Keyed to the coordinates
   the texture generators already ship in namtar_landmarks.json. */
const FEATURES = [
  { key: 'black_rift', label: 'THE BLACK RIFT', sub: 'Volcanic fracture · night side' },
  { key: 'emerald_basin', label: 'EMERALD BASIN', sub: 'Densest life signal on the planet' },
  { key: 'crimson_expanse', label: 'CRIMSON EXPANSE', sub: 'Desert continent · no surface water' },
];

const PLANET_VERT = /* glsl */`
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* One pass, three of the surface behaviours the Blender graph describes: the
   water/land split (as a specular glint rather than a roughness value, since
   there is no PBR pipeline here to feed), the soft terminator, and the two
   night-side emission layers. The constants are the orbital page's. */
const PLANET_FRAG = /* glsl */`
  uniform sampler2D uAlbedo;
  uniform sampler2D uNight;
  uniform sampler2D uMask;
  uniform vec3 uSun;        // sun direction, planet-local
  uniform vec3 uCam;        // camera position, planet-local
  uniform float uFade;
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vec3 N = normalize(vPos);
    vec3 V = normalize(uCam - vPos);
    float ndl = dot(N, uSun);

    vec3 alb  = texture2D(uAlbedo, vUv).rgb;
    vec3 mask = texture2D(uMask, vUv).rgb;      // r water  g ice  b vegetation

    // Soft terminator. A hard one is the single biggest tell that a planet is
    // a textured ball rather than an atmosphere over rock.
    float day = smoothstep(-0.14, 0.30, ndl);

    vec3 col = alb * (0.045 + 0.955 * day);

    // Ocean glint. Ice kills it; a delta light needs a wide lobe or the
    // highlight collapses to one blown-out pixel.
    vec3 H = normalize(uSun + V);
    float spec = pow(max(dot(N, H), 0.0), 74.0);
    col += spec * mask.r * (1.0 - mask.g) * day * vec3(1.35, 1.22, 0.98);

    // Night side: settlement glow and rift heat, both gated on the sun angle
    // so neither bleeds through the daylit hemisphere.
    float night = smoothstep(0.10, -0.16, ndl);
    vec2 nt = texture2D(uNight, vUv).rg;
    vec3 settle = nt.r * 0.46 * vec3(1.0, 0.76, 0.50);
    vec3 rift = pow(nt.g, 1.6) * 3.1 * vec3(1.0, 0.245, 0.038);
    col += night * (settle + rift);

    // Atmospheric haze over the disc, thickening toward the limb.
    float rim = 1.0 - abs(dot(N, V));
    col += pow(rim, 3.4) * day * vec3(0.10, 0.26, 0.42) * 1.5;

    gl_FragColor = vec4(col * uFade, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const CLOUD_FRAG = /* glsl */`
  uniform sampler2D uClouds;
  uniform vec3 uSun;
  uniform float uFade;
  uniform float uDrift;
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vec3 N = normalize(vPos);
    float ndl = dot(N, uSun);
    float day = smoothstep(-0.14, 0.30, ndl);

    // The cloud map drifts in longitude only — a shell that rotated as geometry
    // would carry its own terminator with it.
    vec3 c = texture2D(uClouds, vec2(vUv.x + uDrift, vUv.y)).rgb;
    float cover = smoothstep(0.34, 0.66, c.r);
    if (cover < 0.004) discard;

    vec3 lit = mix(vec3(0.05, 0.06, 0.10), vec3(1.0, 0.98, 0.95), day);
    gl_FragColor = vec4(lit, cover * (0.16 + 0.84 * day) * uFade);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/* The limb. Deliberately thicker than the real ~35 km column, for the reason
   the orbital atmosphere documents: at this scale the true scale height is
   about a pixel. */
const ATMO_FRAG = /* glsl */`
  uniform vec3 uSun;
  uniform vec3 uCam;
  uniform float uFade;
  varying vec3 vPos;

  void main() {
    vec3 N = normalize(vPos);
    vec3 V = normalize(uCam - vPos);
    float fres = pow(1.0 - abs(dot(N, V)), 2.6);
    float sun = smoothstep(-0.55, 0.62, dot(N, uSun));

    // Blue-green away from the star, a tight warm arc toward it — the Rayleigh
    // and Mie ends of the same limb, kept distinguishable.
    vec3 tint = mix(vec3(0.16, 0.42, 0.95), vec3(1.0, 0.62, 0.34),
                    smoothstep(0.35, 1.0, dot(N, uSun)));
    gl_FragColor = vec4(tint * fres * (0.10 + 1.35 * sun) * uFade, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function create({ THREE, renderer, host, mobile }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 1, 4000);

  const seg = mobile ? [96, 64] : [128, 96];
  const shellSeg = mobile ? [64, 44] : [96, 64];

  /* ------------------------------------------------------------ textures */
  const tier = mobile ? `${TEX}2k/` : TEX;
  const loader = new THREE.TextureLoader();
  const aniso = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
  const load = (name, srgb) => {
    const t = loader.load(`${tier}${name}.webp`, () => { pending--; });
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;   // repeating V folds the poles together
    t.anisotropy = aniso;
    return t;
  };
  let pending = 4;
  const texAlbedo = load('albedo', true);
  const texNight = load('night');
  const texMask = load('mask');
  const texClouds = load('clouds');
  const texSky = load('milkyway', true);

  /* --------------------------------------------------------------- rig */
  /* The planet spins inside a rig that never does, so the sun direction can be
     expressed once in world space and converted into the planet's frame each
     frame — the alternative drags the terminator across the surface. */
  const rig = new THREE.Group();
  scene.add(rig);
  const planetGroup = new THREE.Group();
  rig.add(planetGroup);

  const uSun = new THREE.Vector3();
  const uCam = new THREE.Vector3();
  const shared = {
    uSun: { value: uSun },
    uCam: { value: uCam },
    uFade: { value: 0 },
  };

  const surface = new THREE.Mesh(
    new THREE.SphereGeometry(PR, ...seg),
    new THREE.ShaderMaterial({
      vertexShader: PLANET_VERT,
      fragmentShader: PLANET_FRAG,
      uniforms: {
        uAlbedo: { value: texAlbedo },
        uNight: { value: texNight },
        uMask: { value: texMask },
        ...shared,
      },
    })
  );
  planetGroup.add(surface);

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(PR * CLOUD, ...shellSeg),
    new THREE.ShaderMaterial({
      vertexShader: PLANET_VERT,
      fragmentShader: CLOUD_FRAG,
      uniforms: {
        uClouds: { value: texClouds },
        uDrift: { value: 0 },
        ...shared,
      },
      transparent: true,
      depthWrite: false,
    })
  );
  planetGroup.add(clouds);

  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(PR * 1.055, ...shellSeg),
    new THREE.ShaderMaterial({
      vertexShader: PLANET_VERT,
      fragmentShader: ATMO_FRAG,
      uniforms: shared,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    })
  );
  /* Parented to the spinning group, not the rig. It carries no texture so the
     rotation is invisible, and it puts the shell's object space in the same
     frame as uSun/uCam — which are planet-local, because that is the frame the
     surface needs them in. A shell in world space would be lit from the wrong
     side by exactly the planet's rotation. */
  planetGroup.add(atmo);

  /* The sky is a sphere rather than a scene background so it can be tumbled
     slightly off the ecliptic and darkened without touching tone mapping. */
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(1800, 48, 32),
    new THREE.MeshBasicMaterial({ map: texSky, side: THREE.BackSide, depthWrite: false })
  );
  sky.rotation.z = 0.4;
  sky.material.color.setScalar(0.55);
  scene.add(sky);

  /* Foreground star field. The milky way map is a band, not stars; regenerating
     the points costs nothing and gains parallax as the camera descends. */
  const starCount = mobile ? 1200 : 2600;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const u = Math.random() * 2 - 1;
    const th = Math.random() * Math.PI * 2;
    const r = 900 + Math.random() * 500;
    const s = Math.sqrt(1 - u * u);
    starPos.set([Math.cos(th) * s * r, u * r, Math.sin(th) * s * r], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ size: 2.2, sizeAttenuation: false, color: 0xbfd6ff, transparent: true, opacity: 0.85 })
  );
  scene.add(stars);

  /* ------------------------------------------------------------- feature pins */
  const pinRoot = document.getElementById('nm-pins');
  const pins = [];
  const anchors = [];

  fetch(`${TEX}namtar_landmarks.json`)
    .then((r) => r.json())
    .then((coords) => {
      if (!pinRoot) return;
      for (const f of FEATURES) {
        const ll = coords[f.key];
        if (!ll) continue;
        const anchor = new THREE.Object3D();
        anchor.position.copy(lonLatToDir(THREE, ll[0], ll[1])).multiplyScalar(PR * 1.004);
        planetGroup.add(anchor);

        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'nm-pin';
        el.innerHTML = `<i aria-hidden="true"></i><span><b>${f.label}</b><em>${f.sub}</em></span>`;
        el.addEventListener('click', () => {
          focus = anchor;
          for (const p of pins) p.el.classList.toggle('on', p.anchor === anchor);
        });
        pinRoot.appendChild(el);
        pins.push({ el, anchor, dir: anchor.position.clone().normalize() });
        anchors.push(anchor);
      }
    })
    .catch(() => { /* no coordinates, no pins — the page reads the same */ });

  /* --------------------------------------------------------------- input */
  const pointer = pointerTracker(host);
  const scroll = scrollTracker([...document.querySelectorAll('[data-stage]')]);

  /* Camera state. az/el are the orbit angles; r is altitude. Targets are what
     scroll and clicks set, values are what is drawn — everything eases. */
  let az = 0.6, el = 0.22, r = 150;
  let tAz = 0.6, tEl = 0.22, tR = 150;
  let spin = 0;
  let focus = null;
  let fade = 0;

  const camDir = new THREE.Vector3();
  const worldDir = new THREE.Vector3();
  const project = new THREE.Vector3();
  const invRot = new THREE.Matrix4();

  function resize(w, h) {
    camera.aspect = w / h;
    /* A tall phone viewport crops a fixed-fov frame horizontally, which puts
       the planet's limb off screen exactly where the copy sits. Widening the
       fov below 1:1 keeps the whole disc in frame. */
    camera.fov = h > w ? 52 : 38;
    camera.updateProjectionMatrix();
  }
  resize(host.clientWidth || 1, host.clientHeight || 1);

  function update(dt, t) {
    /* Fade in only once every map has decoded — a planet that pops in one
       texture at a time looks broken rather than progressive. */
    if (pending <= 0) fade = damp(fade, 1, 2.2, dt);
    shared.uFade.value = fade;

    /* ------------------------------------------------ scroll → camera rig */
    const p = scroll.p;
    /* High orbit to low. Eased rather than linear so the first screen of
       scrolling reads as a commitment to descend, not a nudge. */
    const ease = p * p * (3 - 2 * p);
    tR = lerp(150, 52, ease);
    tEl = lerp(0.22, -0.10, ease) + pointer.sy * 0.10;

    if (focus) {
      /* Lock onto a surface feature and orbit with it as the planet turns,
         rather than freezing the spin — a stopped planet reads as a paused
         video. */
      focus.getWorldPosition(worldDir).normalize();
      tAz = Math.atan2(worldDir.x, worldDir.z);
      tEl = Math.asin(clamp(worldDir.y, -1, 1)) * 0.82;
      tR = lerp(tR, 62, 0.6);
    } else {
      tAz += dt * 0.035 + pointer.sx * dt * 0.35;
    }

    const [dx, dy] = pointer.takeDrag();
    if (dx || dy) {
      focus = null;
      for (const pin of pins) pin.el.classList.remove('on');
      tAz -= dx * 0.005;
      tEl = clamp(tEl + dy * 0.004, -1.15, 1.15);
    }

    az = damp(az, tAz, focus ? 2.6 : 3.4, dt);
    el = damp(el, tEl, 3.0, dt);
    r = damp(r, tR, 2.4, dt);
    pointer.smooth(dt);

    camera.position.set(
      r * Math.cos(el) * Math.sin(az),
      r * Math.sin(el),
      r * Math.cos(el) * Math.cos(az)
    );
    camera.lookAt(0, 0, 0);

    /* ------------------------------------------------------- planet state */
    spin += dt * 0.018;
    planetGroup.rotation.y = spin;
    clouds.material.uniforms.uDrift.value = t * 0.0016;

    /* The sun swings through the descent, so the page starts on a lit disc and
       ends on the night side with the rift burning — which is what the copy
       under it is talking about by then. */
    const sunAng = -0.5 + p * 2.5;
    const sunWorld = new THREE.Vector3(Math.sin(sunAng), 0.26, Math.cos(sunAng)).normalize();

    /* Both shader vectors live in the planet's rotating frame. */
    invRot.makeRotationY(-spin);
    uSun.copy(sunWorld).applyMatrix4(invRot);
    uCam.copy(camera.position).applyMatrix4(invRot);

    sky.rotation.y = t * 0.002;
    stars.rotation.y = t * 0.002;

    renderer.render(scene, camera);

    /* --------------------------------------------------------- pin layout */
    /* Placed with translate rather than left/top: these run on every pin on
       every frame, and only translate is composited. */
    if (pins.length) {
      camera.getWorldDirection(camDir);
      const w = host.clientWidth, h = host.clientHeight;
      for (const pin of pins) {
        pin.anchor.getWorldPosition(project);
        /* Facing test before projection: a point on the far side of the globe
           still projects into the frame. */
        const facing = worldDir.copy(project).normalize().dot(camDir);
        project.project(camera);
        const on = facing < -0.15 && Math.abs(project.x) < 1.1 && Math.abs(project.y) < 1.1;
        pin.el.style.opacity = on ? String(clamp((-facing - 0.15) * 4, 0, 1) * fade) : '0';
        pin.el.style.pointerEvents = on ? 'auto' : 'none';
        if (on) {
          pin.el.style.translate =
            `${(project.x * 0.5 + 0.5) * w}px ${(-project.y * 0.5 + 0.5) * h}px`;
        }
      }
    }
  }

  /* Same handle the orbital view exposes, for the same reason: the shader
     constants above were arrived at by parking the camera and comparing. */
  if (import.meta.env.DEV) {
    window.__namtar = {
      scene, camera, surface, clouds, atmo, shared,
      get state() { return { az, el, r, spin, fade, pending, p: scroll.p }; },
    };
  }

  function dispose() {
    pointer.dispose();
    scroll.dispose();
    for (const pin of pins) pin.el.remove();
    disposeTree(scene);
  }

  return { update, resize, dispose };
}
