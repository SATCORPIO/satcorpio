import React from 'react';
import DossierSection from '@/components/DossierSection';

const KiraStudiosPage: React.FC = () => {
  const dossierEntries = [
    { index: '[01]', text: 'Three active UE5 projects: NAMTAR, FROSTHEIM, DYSUN\'S REALM — each at distinct production stages.' },
    { index: '[02]', text: 'Specialization in environmental storytelling, survival mechanics, and procedural world systems.' },
    { index: '[03]', text: 'RTX-accelerated Lumen/Nanite workflows — cinematic quality at interactive framerates.' },
    { index: '[04]', text: 'Full vertical ownership: concept art → greybox → asset production → shipping build.' }
  ];

  const dossierTabs = [
    {
      label: 'ACTIVE PROJECTS',
      content: [
        'NAMTAR: Open-world survival epic set in post-apocalyptic tundra. Genre: Survival/Adventure. Status: Pre-alpha.',
        'FROSTHEIM: Nordic mythology-inspired action RPG. Genre: Action/RPG. Status: Vertical slice.',
        'DYSUN\'S REALM: Procedural generation sandbox with persistent world. Genre: Simulation/Sandbox. Status: Prototype.'
      ]
    },
    {
      label: 'VISUAL SYSTEMS',
      content: [
        'Hybrid rendering pipeline combining Lumen global illumination with Nanite virtualized geometry.',
        'Custom material system optimized for RTX acceleration and DLSS 3.0 frame generation.',
        'Procedural generation tools for terrain, vegetation, and architectural variations.',
        'Cinematic post-processing pipeline with filmic tone mapping and chromatic aberration controls.'
      ]
    },
    {
      label: 'TECH STACK',
      content: [
        'Unreal Engine 5.3 (source license)',
        'Lumen for global illumination and reflections',
        'Nanite for virtualized micropolygon geometry',
        'Houdini Engine for procedural asset generation',
        'Quixel Megascans library integration',
        'NVIDIA RTX IO for accelerated asset streaming',
        'DLSS 3.0 for frame generation and performance'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background kirastudios-page relative overflow-hidden">
      {/* Subtle purple vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="inset-0 bg-gradient-radial from-transparent via-black/80 to-black" 
             style={{ mixBlendMode: 'multiply' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <DossierSection 
          division="kira"
          classification="CLASSIFIED LEVEL 2: INTERNAL USE ONLY"
          entries={dossierEntries}
          tabs={dossierTabs}
        />
      </div>
    </main>
  );
};

export default KiraStudiosPage;