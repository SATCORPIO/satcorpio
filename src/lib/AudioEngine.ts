import * as Tone from 'tone';

let isInitialized = false;
let globalMute = false; // System-wide mute control

let ambientSynth: Tone.NoiseSynth | null = null;
let clickSynth: Tone.MembraneSynth | null = null;
let hoverSynth: Tone.MetalSynth | null = null;
let uplinkSynth: Tone.PolySynth | null = null;
let filter: Tone.Filter | null = null;

export const AudioEngine = {
  async init() {
    if (isInitialized || globalMute) return;
    
    await Tone.start();
    console.log("Audio Context Started");

    // Master Volume & Effects
    const dist = new Tone.Distortion(0.2).toDestination();
    dist.wet.value = 0.1;
    
    const reverb = new Tone.Reverb({
      decay: 4,
      preDelay: 0.1
    }).connect(dist);
    
    // Low pass filter to keep sounds "ambient" and "underwater/muffled"
    filter = new Tone.Filter(800, "lowpass").connect(reverb);
    filter.Q.value = 1;

    Tone.getDestination().volume.value = -12; // Master volume down

    // ============================================
    // SYNTHESIZERS
    // ============================================

    // Ambient Noise (Low Hum)
    ambientSynth = new Tone.NoiseSynth({
      noise: { type: "brown" },
      envelope: {
        attack: 2,
        decay: 0.1,
        sustain: 1,
        release: 3,
      }
    }).connect(filter);

    // Hover UI blip (High tech click)
    hoverSynth = new Tone.MetalSynth({
      envelope: {
        attack: 0.001,
        decay: 0.05,
        release: 0.01,
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
      volume: -20
    }).connect(reverb);
    hoverSynth.frequency.value = 200;

    // Deep Click (Tactical Confirm)
    clickSynth = new Tone.MembraneSynth({
      pitchDecay: 0.02,
      octaves: 2,
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0,
        release: 0.1,
      },
      volume: -10
    }).connect(reverb);

    // Mechanical Uplink Sound
    uplinkSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "square" },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
      volume: -15
    }).connect(reverb);

    isInitialized = true;
  },

  setMute(mute: boolean) {
    globalMute = mute;
    if (mute) this.stopHum();
    else this.startHum();
  },

  startHum() {
    if (!isInitialized || !ambientSynth || globalMute) return;
    ambientSynth.triggerAttack();
  },

  stopHum() {
    if (!isInitialized || !ambientSynth) return;
    ambientSynth.triggerRelease();
  },

  playHover() {
    if (!isInitialized || !hoverSynth || globalMute) return;
    hoverSynth.triggerAttackRelease("32n", Tone.now());
  },

  playClick() {
    if (!isInitialized || !clickSynth || globalMute) return;
    clickSynth.triggerAttackRelease("C2", "8n");
  },

  playUplink() {
    if (!isInitialized || !uplinkSynth || globalMute) return;
    const now = Tone.now();
    uplinkSynth.triggerAttackRelease(["C4", "E4", "G4"], "16n", now);
    uplinkSynth.triggerAttackRelease(["C5", "E5", "G5"], "16n", now + 0.1);
  }
};
