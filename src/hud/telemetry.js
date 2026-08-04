import { PR, REDUCED } from '../core/config.js';

/* Readouts are derived from the real camera rig rather than faked, so the
   numbers move with what the viewer is actually doing. Only the link-quality
   meters are invented   there is no downlink to measure. */
export function createTelemetry() {
  const lnkEl = document.getElementById('s-lnk');
  const sigEl = document.getElementById('t-sig');
  for (let i = 0; i < 4; i++) lnkEl.appendChild(document.createElement('b'));
  for (let i = 0; i < 5; i++) sigEl.appendChild(document.createElement('b'));

  const upEl = document.getElementById('t-up');
  const upBar = document.getElementById('t-upb');
  const pwrEl = document.getElementById('t-pwr');
  const sCoord = document.getElementById('s-coord');
  const sRng = document.getElementById('s-rng');
  const lnkBars = [...lnkEl.children];
  const sigBars = [...sigEl.children];
  let meterT = 0;

  return function update(t, cam, camera) {
    sCoord.textContent =
      `AZ ${(((cam.theta * 57.2958) % 360 + 360) % 360).toFixed(1).padStart(5, '0')}` +
      ` · EL ${(90 - cam.phi * 57.2958).toFixed(1)}`;
    // 1 scene unit = 8250/30 km, rounded to the 14x the legacy readout used
    sRng.textContent = `ALT ${Math.round(Math.max(0, camera.position.length() - PR) * 14)
      .toString().padStart(4, '0')} KM`;

    /* Roughly two updates a second rather than four. The readouts are meant to
       read as a live link, and a panel that twitches faster than the eye can
       follow reads as broken instead. */
    if (t - meterT < 0.55) return;
    meterT = t;
    const up = 6.2 + Math.sin(t * 0.7) * 1.9 + Math.random() * 0.5;
    upEl.textContent = up.toFixed(2);
    upBar.style.width = `${Math.min(100, up * 10)}%`;
    pwrEl.textContent = (96.4 + Math.sin(t * 0.31) * 2.4).toFixed(1);
    const bars = Math.round(3.4 + Math.sin(t * 1.1) * 1.3);
    sigBars.forEach((b, i) => b.classList.toggle('on', i < bars));
    /* The LINK meter used to drop a bar three times a second, which is fast
       enough to be a strobe in the corner of the eye rather than an indicator.
       Slowed to about one dropout a second   and left steady altogether when
       motion is not wanted. */
    lnkBars.forEach((b, i) => b.classList.toggle(
      'on', REDUCED || (((t * 1.2) | 0) + i) % 5 !== 0
    ));
  };
}
