import React from 'react';
import DossierSection from '@/components/DossierSection';

const AnuPage: React.FC = () => {
  const dossierEntries = [
    { index: '[01]', text: 'Client lifecycle management — from acquisition through contract close, zero gaps.' },
    { index: '[02]', text: 'Financial operations: invoicing architecture, payment routing, dispute resolution.' },
    { index: '[03]', text: 'Legal workflow automation — NDA generation, SOW templating, clause tracking.' },
    { index: '[04]', text: 'Concierge model: one point of contact, full-stack delivery, no handoffs.' }
  ];

  const dossierTabs = [
    {
      label: 'SERVICES',
      content: [
        'TIER 1 - ESSENTIAL: Contract admin, invoicing, payment processing, basic legal docs.',
        'TIER 2 - PROFESSIONAL: Full lifecycle management, custom workflows, priority support.',
        'TIER 3 - ENTERPRISE: Dedicated success manager, SLA guarantees, custom integrations.',
        'TIER 4 - WHITE GLOVE: Executive concierge, 24/7 availability, bespoke solutions.'
      ]
    },
    {
      label: 'WORKFLOW',
      content: [
        'INTAKE → Client discovery, needs assessment, scope definition.',
        'SCOPE → Proposal generation, resource allocation, timeline establishment.',
        'EXECUTE → Project kickoff, milestone tracking, quality assurance.',
        'REVIEW → Performance analysis, client feedback, optimization recommendations.',
        'CLOSE → Final delivery, documentation transfer, relationship transition.'
      ]
    },
    {
      label: 'ENGAGE',
      content: [
        'Discord: discord.gg/anuhub-satcorp (primary engagement channel)',
        'Email: concierge@anu.satcorp.io (for formal proposals and contracts)',
        'Phone: +1-800-ANU-HELP (business hours: 8AM-8PM EST)',
        'In-person: By appointment only at SatCorp Headquarters, Sector 7.'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background anu-page relative overflow-hidden">
      {/* Subtle grid overlay background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,255,255,0.02)_1px,rgba(0,255,255,0.02)_2px)]" 
             aria-hidden="true"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <DossierSection 
          division="anu"
          classification="CLASSIFIED LEVEL 3: CONFIDENTIAL"
          entries={dossierEntries}
          tabs={dossierTabs}
        />
      </div>
    </main>
  );
};

export default AnuPage;