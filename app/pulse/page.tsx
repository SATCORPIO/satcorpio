import React from 'react';
import DossierSection from '@/components/DossierSection';

const PulsePage: React.FC = () => {
  const dossierEntries = [
    { index: '[01]', text: 'Continuous broadcast — 47 episodes, zero gaps in transmission since inception.' },
    { index: '[02]', text: 'Synthesized sound design: original compositions, no licensed tracks, 100% generative.' },
    { index: '[03]', text: 'Audience: night-shift operators, deep-work sessions, the chronically online.' },
    { index: '[04]', text: 'Signal format: ~45min episodes, cyberpunk/industrial/ambient genre spectrum.' }
  ];

  const dossierTabs = [
    {
      label: 'EPISODES',
      content: Array.from({ length: 47 }, (_, i) => 
        `E${String(i + 1).padStart(2, '0')} - ${generateEpisodeTitle(i + 1)} - ${Math.floor(Math.random() * 15) + 30}min`
      )
    },
    {
      label: 'FREQUENCY',
      content: [
        'Pure generative synthesis: every sound created from oscillators, noise, and filters.',
        'No samples, no loops, no licensed material - 100% procedural audio generation.',
        'Modular patching system inspired by Buchla and Eurorack traditions.',
        'Algorithmic composition rules ensuring harmonic coherence within genre constraints.'
      ]
    },
    {
      label: 'UPLINK',
      content: [
        'Primary: Discord pulse.hub/satcorp (invite: discord.gg/pulse-satcorp)',
        'Secondary: Matrix #pulse:satcorp.io (end-to-end encrypted)',
        'Tertiary: IRC pulse.satcorp.net:6697 (SSL/TLS required)',
        'Broadcast schedule: 24/7 continuous with scheduled maintenance windows.'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background pulse-page relative overflow-hidden">
      {/* Noise grain overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="inset-0 bg-[url('/noise.png')] bg-[length:200px_200px] opacity-4" 
             aria-hidden="true"></div>
      </div>
      
      {/* NOW BROADCASTING waveform visualizer */}
      <div className="absolute bottom-4 left-4 flex items-space gap-2 pulse-waveform">
        <span className="text-xs text-pulse/60">NOW BROADCASTING</span>
        <svg className="h-4 w-32" aria-hidden="true">
          {[...Array(32)].map((_, i) => (
            <rect 
              key={i} 
              x={i * 10} 
              y={16} 
              width="4" 
              height={0} 
              fill="currentColor"
              className="waveform-bar"
              style={{ 
                animation: `pulse-bar ${3 + Math.random() * 2}s ease-in-out ${i * 0.05}s infinite alternate`,
                transformOrigin: 'bottom'
              }}
            />
          ))}
        </svg>
        <style jsx>{`
          @keyframes pulse-bar {
            to { height: 16; }
          }
          .waveform-bar {
            transition: height 0.1s ease;
          }
        `}</style>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <DossierSection 
          division="pulse"
          classification="CLASSIFIED LEVEL 1: RESTRICTED ACCESS"
          entries={dossierEntries}
          tabs={dossierTabs}
        />
      </div>
    </main>
  );
};

// Helper function to generate episode titles
function generateEpisodeTitle(episodeNumber: number): string {
  const prefixes = ['NEON', 'GRID', 'VOID', 'SYNTH', 'PULSE', 'WAVE', 'GHOST', 'STATIC'];
  const suffixes = ['RUN', 'SCAN', 'FLOW', 'DROP', 'SPIKE', 'DRIFT', 'PULSE', 'BEAT'];
  
  const prefix = prefixes[episodeNumber % prefixes.length];
  const suffix = suffixes[(episodeNumber * 3) % suffixes.length];
  
  return `${prefix}-${suffix}`;
}

export default PulsePage;