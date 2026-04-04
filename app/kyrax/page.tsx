'use client';

import React, { useEffect, useRef } from 'react';
import DossierSection from '@/components/DossierSection';

const KyraxPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match parent
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヲギジジビピウウクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゾドボポッヴァ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    // Animation frame
    const drawMatrix = () => {
      // Semi-transparent black background for trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = '#0f0'; // Matrix green
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop if it goes off screen or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop position
        drops[i]++;
      }

      requestAnimationFrame(drawMatrix);
    };

    // Start animation
    const animationId = requestAnimationFrame(drawMatrix);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const dossierEntries = [
    { index: '[01]', text: 'Multi-agent orchestration: autonomous pipelines that plan, execute, and self-correct.' },
    { index: '[02]', text: 'Generative video pipeline: prompt → storyboard → render → delivery, end-to-end.' },
    { index: '[03]', text: 'Predictive intelligence units: pattern recognition, anomaly detection, signal processing.' },
    { index: '[04]', text: 'Built on: LLM orchestration frameworks, ComfyUI, custom inference stacks, real-time APIs.' }
  ];

  const dossierTabs = [
    {
      label: 'CAPABILITIES',
      content: [
        'AUTONOMOUS ORCHESTRATION: Self-healing pipelines with LLM-based planning and correction.',
        'GENERATIVE VIDEO: End-to-end creation from text prompts to broadcast-ready output.',
        'PREDICTIVE INTELLIGENCE: Real-time pattern recognition across multimodal data streams.'
      ]
    },
    {
      label: 'PIPELINE',
      content: [
        '1. PROMPT ENGINEERING: Structured input parsing and enhancement.',
        '2. STORYBOARD GENERATION: AI-driven scene planning and asset selection.',
        '3. RENDERING: Distributed processing across GPU clusters with caching.',
        '4. POST-PRODUCTION: Automated editing, color grading, and delivery formatting.',
        '5. QUALITY GATES: Automated validation checkpoints at each stage.'
      ]
    },
    {
      label: 'DEPLOY',
      content: [
        'API ENDPOINT: https://kyrax.satcorp.io/api/v1/generate (REST/WebSocket)',
        'AUTHENTICATION: JWT tokens with refresh rotation and rate limiting.',
        'FORMATS: MP4/H.264, WebM/VP9, ProRes, DNxHD (selectable per job).',
        'SUPPORT: 24/7 SLA with dedicated technical account manager.'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background kyrax-page relative overflow-hidden">
      {/* Matrix background canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <canvas ref={canvasRef} className="inset-0" aria-hidden="true" />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <DossierSection 
          division="kyrax"
          classification="CLASSIFIED LEVEL 4: TOP SECRET"
          entries={dossierEntries}
          tabs={dossierTabs}
        />
      </div>
    </main>
  );
};

export default KyraxPage;