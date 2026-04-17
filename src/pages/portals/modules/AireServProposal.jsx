import React from 'react';
import ModuleExitButton from "../../../components/ModuleExitButton";
import { 
  Shield, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  X, 
  Smartphone, 
  Zap, 
  Mic, 
  Search, 
  Layout, 
  WifiOff, 
  Database, 
  Clock, 
  BarChart4, 
  ChevronRight,
  Target,
  ArrowRight
} from 'lucide-react';
import GalaxyBackground from '../../../components/GalaxyBackground';

const AireServProposal = () => {
  return (
    <div className="aire-serv-wrapper min-height-100vh relative overflow-hidden bg-void text-primary font-body">
      <ModuleExitButton />
      <GalaxyBackground />
      
      <style>{`
        .aire-serv-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 24px;
          position: relative;
          z-index: 10;
        }

        /* HERO */
        .hero {
          padding: 64px 0 56px;
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 24px;
        }
        
        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: var(--accent);
        }

        .hero h1 {
          font-family: var(--font-tactical);
          font-size: clamp(32px, 7vw, 64px);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        .hero h1 .dim { color: var(--text-muted); font-weight: 300; }
        .hero h1 .hi { color: var(--accent); text-shadow: 0 0 20px var(--accent-glow); }

        .hero-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 32px;
          margin-bottom: 32px;
        }

        .hero-meta-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .hero-meta-val {
          font-family: var(--font-body);
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--text-primary);
        }

        .hero-summary {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 680px;
          border-left: 2px solid var(--accent);
          padding-left: 24px;
          background: rgba(0, 255, 65, 0.02);
          padding-top: 20px;
          padding-bottom: 20px;
        }

        /* SECTION */
        .section {
          padding: 64px 0;
          border-bottom: 1px solid var(--border);
        }

        .section-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .section-title {
          font-family: var(--font-tactical);
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 40px;
          color: #fff;
        }

        /* INTEL CARDS */
        .intel-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          margin-bottom: 32px;
        }

        .intel-card {
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(10px);
          padding: 24px;
          position: relative;
        }

        .intel-card.span2 {
          grid-column: span 2;
        }

        .intel-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 10px;
        }

        .intel-val {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .intel-val strong {
          color: white;
          font-weight: 600;
        }

        .intel-val.big {
          font-family: var(--font-tactical);
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.02em;
        }

        .flag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 9px;
          padding: 4px 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 2px;
          border: 1px solid currentColor;
        }

        .flag-blue { color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
        .flag-green { color: var(--accent); background: var(--accent-faint); }
        .flag-orange { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .flag-red { color: #ef4444; background: rgba(239, 68, 68, 0.1); }

        /* PRIORITY MATRIX */
        .priority-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .priority-row {
          display: grid;
          grid-template-columns: 1fr 140px 180px;
          align-items: center;
          gap: 20px;
          padding: 16px 24px;
          background: rgba(15, 15, 15, 0.4);
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }

        .priority-row:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(0, 255, 65, 0.2);
        }

        .priority-row.critical { border-left: 3px solid var(--accent); }
        .priority-row.high { border-left: 3px solid #3b82f6; }
        .priority-row.medium { border-left: 3px solid #f59e0b; }
        .priority-row.low { border-left: 3px solid var(--text-muted); }
        .priority-row.excluded { border-left: 3px solid #ef4444; opacity: 0.4; }

        .p-name { font-size: 14px; color: var(--text-primary); font-weight: 500; }
        
        .p-bar { height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 2px; }
        .p-bar-fill { height: 100%; border-radius: 2px; transition: width 1s ease; }

        /* SCOPE GRID */
        .scope-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .scope-item {
          background: rgba(10, 10, 10, 0.5);
          border: 1px solid var(--border);
          padding: 28px;
          transition: all 0.3s ease;
        }

        .scope-item:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          background: rgba(0, 255, 65, 0.02);
        }

        .scope-icon {
          color: var(--accent);
          margin-bottom: 16px;
        }

        .scope-name {
          font-family: var(--font-tactical);
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          color: #fff;
        }

        .scope-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .scope-item.out {
          opacity: 0.35;
          border-style: dashed;
        }

        .scope-item.out:hover { transform: none; border-color: var(--border); }

        /* TIMELINE */
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tl-row {
          display: grid;
          grid-template-columns: 100px 220px 1fr 100px;
          align-items: center;
          gap: 24px;
          background: rgba(10, 10, 10, 0.4);
          border: 1px solid var(--border);
          padding: 20px 28px;
        }

        .tl-phase {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.2em;
          line-height: 1.4;
        }

        .tl-name {
          font-family: var(--font-tactical);
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tl-items {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .tl-cost {
          font-family: var(--font-mono);
          font-size: 14px;
          text-align: right;
          font-weight: 700;
        }

        /* INSIGHT BOX */
        .insight {
          background: rgba(245, 158, 11, 0.03);
          border: 1px solid rgba(245, 158, 11, 0.1);
          border-left: 3px solid #f59e0b;
          padding: 24px 32px;
          margin: 32px 0;
        }

        .insight-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #f59e0b;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .insight p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .insight p strong {
          color: #fff;
        }

        /* PRICING */
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .price-card {
          background: rgba(10, 10, 10, 0.5);
          padding: 40px 32px;
          border: 1px solid var(--border);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .price-card.featured {
          background: rgba(0, 255, 65, 0.02);
          border-color: var(--accent);
          box-shadow: 0 0 30px rgba(0, 255, 65, 0.05);
        }

        .price-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .price-tag.featured { color: var(--accent); }

        .price-name {
          font-family: var(--font-tactical);
          font-size: 24px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          color: #fff;
        }

        .price-amount {
          font-family: var(--font-tactical);
          font-size: 48px;
          font-weight: 900;
          line-height: 1;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .price-sub {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          margin-bottom: 32px;
          text-transform: uppercase;
        }

        .price-features {
          list-style: none;
          margin-top: auto;
        }

        .price-features li {
          font-size: 13px;
          color: var(--text-secondary);
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .price-features li:last-child { border-bottom: none; }

        .price-features li svg {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .price-features li.no { opacity: 0.4; }
        .price-features li.no svg { color: #ef4444; }

        /* STEPS */
        .step {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 24px;
          padding: 24px 32px;
          background: rgba(10, 10, 10, 0.4);
          border: 1px solid var(--border);
          margin-bottom: 4px;
          transition: all 0.2s ease;
        }

        .step:hover {
          border-color: var(--accent);
          background: rgba(0, 255, 65, 0.02);
        }

        .step-num {
          font-family: var(--font-tactical);
          font-size: 42px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.05);
          line-height: 1;
        }

        .step-title {
          font-family: var(--font-tactical);
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          color: #fff;
        }

        .step-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* FOOTER */
        .doc-footer {
          padding: 64px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
        }

        .footer-note {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 2;
          max-width: 480px;
        }

        .footer-total {
          text-align: right;
        }

        .footer-total-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .footer-total-val {
          font-family: var(--font-tactical);
          font-size: 56px;
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          text-shadow: 0 0 30px var(--accent-glow);
        }

        @media (max-width: 768px) {
          .intel-grid, .scope-grid, .pricing-grid, .tl-row, .priority-row {
            grid-template-columns: 1fr;
          }
          .intel-card.span2 { grid-column: span 1; }
          .tl-cost { text-align: left; margin-top: 12px; }
          .doc-footer { flex-direction: column; align-items: flex-start; }
          .footer-total { text-align: left; }
        }
      `}</style>

      <div className="aire-serv-container">
        
        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">
            <Shield className="w-3 h-3" /> Confidential Proposal Transmission // SATCORP
          </div>
          <h1>
            <span className="dim">Field Service</span><br />
            <span className="hi">Platform</span><br />
            <span className="dim">for</span> Aire Serv
          </h1>
          
          <div className="hero-meta">
            <div>
              <div className="hero-meta-label">Designation</div>
              <div className="hero-meta-val">Scott Aten · Aire Serv</div>
            </div>
            <div>
              <div className="hero-meta-label">Temporal Record</div>
              <div className="hero-meta-val">April 2026</div>
            </div>
            <div>
              <div className="hero-meta-label">Vector ID</div>
              <div className="hero-meta-val">ASP-001</div>
            </div>
            <div>
              <div className="hero-meta-label">Protocol Status</div>
              <div className="hero-meta-val"><span className="flag flag-blue">Draft // Initial Review</span></div>
            </div>
          </div>
          
          <p className="hero-summary">
            Synthesizing discovery intelligence: We've engineered a precision-built platform for Aire Serv. Objective: <strong>Streamline field-to-customer documentation</strong>. Philosophy: Eliminate bloat, maximize operational velocity.
          </p>
        </div>

        {/* 01 DISCOVERY */}
        <div className="section">
          <div className="section-label">01 // Discovery Intelligence</div>
          <div className="section-title">Operational Intel: Sector Aire Serv</div>

          <div className="intel-grid">
            <div className="intel-card">
              <div className="intel-label">Force Size</div>
              <div className="intel-val big">~22</div>
              <div className="intel-val">Operations/mo · <strong>1–10 Tacticians</strong></div>
            </div>
            <div className="intel-card">
              <div className="intel-label">Existing Stack</div>
              <div className="intel-val"><strong>ServiceTitan</strong> Job Control<br />XOi Tier: Legacy/Expired</div>
            </div>
            <div className="intel-card">
              <div className="intel-label">Hardware Interface</div>
              <div className="intel-val"><strong>Multi-Device Architecture</strong><br />iOS · Android · Tablet</div>
            </div>
            <div className="intel-card">
              <div className="intel-label">Signal Environment</div>
              <div className="intel-val"><strong>Intermittent Connectivity</strong><br />Offline Protocols Critical</div>
            </div>
            <div className="intel-card span2">
              <div className="intel-label">Core Objective // Critical Pain Point</div>
              <div className="intel-val" style={{fontSize: '16px'}}>
                <span style={{color: 'var(--accent)'}}>"</span>Not being able to send information to the customer due to upload times.<span style={{color: 'var(--accent)'}}>"</span>
                <div style={{marginTop: '16px', fontSize: '13px', opacity: 0.7}}>
                  Analysis: System failure occurring at the final delivery stage. Our solution optimizes the <strong>Field-to-Customer pipeline</strong> through edge-compression and asynchronous queuing.
                </div>
              </div>
            </div>
          </div>

          <div className="insight">
            <div className="insight-label">
              <Zap className="w-3 h-3" /> Strategic Appraisal
            </div>
            <p>Aire Serv requires a <strong>precision instrument</strong>, not a generic software suite. The architecture centers on a heavy-lift media engine capable of operating in signal-denied environments. No excess features—only high-velocity documentation and intelligent equipment profiling.</p>
          </div>
        </div>

        {/* 02 PRIORITY */}
        <div className="section">
          <div className="section-label">02 // Capability Priority</div>
          <div className="section-title">Vector Analysis Matrix</div>

          <div className="priority-list">
            <div className="priority-row critical">
              <div className="p-name">Customer Transparency & Rapid Reporting</div>
              <div><span className="flag flag-green">Lvl 5 // Critical</span></div>
              <div className="p-bar"><div className="p-bar-fill" style={{width: '100%', background: 'var(--accent)'}}></div></div>
            </div>
            <div className="priority-row critical">
              <div className="p-name">Hands-Free Documentation (Voice-to-Text)</div>
              <div><span className="flag flag-green">Lvl 5 // Critical</span></div>
              <div className="p-bar"><div className="p-bar-fill" style={{width: '100%', background: 'var(--accent)'}}></div></div>
            </div>
            <div className="priority-row high">
              <div className="p-name">High-Density Media Capture (4K/HD)</div>
              <div><span className="flag flag-blue">Lvl 4 // High</span></div>
              <div className="p-bar"><div className="p-bar-fill" style={{width: '80%', background: '#3b82f6'}}></div></div>
            </div>
            <div className="priority-row high">
              <div className="p-name">Equipment Identity OCR (Dataplate Intel)</div>
              <div><span className="flag flag-blue">Lvl 4 // High</span></div>
              <div className="p-bar"><div className="p-bar-fill" style={{width: '80%', background: '#3b82f6'}}></div></div>
            </div>
            <div className="priority-row medium">
              <div className="p-name">Advanced Operations Dashboard</div>
              <div><span className="flag flag-orange">Lvl 3 // Medium</span></div>
              <div className="p-bar"><div className="p-bar-fill" style={{width: '60%', background: '#f59e0b'}}></div></div>
            </div>
            <div className="priority-row excluded">
              <div className="p-name">AI Narrative Summaries</div>
              <div><span className="flag flag-red">De-Scoped</span></div>
              <div className="p-bar"><div className="p-bar-fill" style={{width: '0%'}}></div></div>
            </div>
          </div>
        </div>

        {/* 03 SCOPE */}
        <div className="section">
          <div className="section-label">03 // Build Scope</div>
          <div className="section-title">Platform Architecture</div>

          <div className="scope-grid">
            <div className="scope-item">
              <Smartphone className="scope-icon" />
              <div className="scope-name">Media Core</div>
              <div className="scope-desc">Industrial-grade capture engine. Background compression, upload retry logic, and local caching. Eliminates upload-hang failures.</div>
            </div>
            <div className="scope-item">
              <Target className="scope-icon" />
              <div className="scope-name">Report Forge</div>
              <div className="scope-desc">Automated, branded PDF and Link delivery. Instant transmission upon technician sign-off. Secure client-side viewing portal.</div>
            </div>
            <div className="scope-item">
              <Mic className="scope-icon" />
              <div className="scope-name">Command Voice</div>
              <div className="scope-desc">Real-time transcription for tactical notes. Optimized for active service environments (noisy HVAC/Mechanical rooms).</div>
            </div>
            <div className="scope-item">
              <Database className="scope-icon" />
              <div className="scope-name">ServiceTitan Sync</div>
              <div className="scope-desc">Bi-directional data flow. Jobs in, documentation out. Zero manual redundancy required for back-office teams.</div>
            </div>
            <div className="scope-item">
              <WifiOff className="scope-icon" />
              <div className="scope-name">Offline Mesh</div>
              <div className="scope-desc">Persistent state management. The platform remains fully operational regardless of cellular signal strength.</div>
            </div>
            <div className="scope-item">
              <Layout className="scope-icon" />
              <div className="scope-name">Admin Terminal</div>
              <div className="scope-desc">Centralized command for Scott and team. Manage technician performance, asset history, and reporting oversight.</div>
            </div>
            <div className="scope-item out">
              <div className="scope-name">AI Logic</div>
              <div className="scope-desc">Summarization and predictive layers removed per directive. Available for Phase 2 implementation.</div>
            </div>
          </div>
        </div>

        {/* 04 TIMELINE */}
        <div className="section">
          <div className="section-label">04 // Mobilization</div>
          <div className="section-title">Deployment Phasing</div>

          <div className="timeline">
            <div className="tl-row">
              <div className="tl-phase">PROTOCOL 01<br />Wk 1–4</div>
              <div className="tl-name" style={{color: '#3b82f6'}}>Cyber Foundation</div>
              <div className="tl-items">Auth · ServiceTitan Integrations · Data Schema · Media Pipeline Setup</div>
              <div className="tl-cost" style={{color: '#3b82f6'}}>$8,000</div>
            </div>
            <div className="tl-row">
              <div className="tl-phase">PROTOCOL 02<br />Wk 3–10</div>
              <div className="tl-name" style={{color: 'var(--accent)'}}>Tactical Mobile</div>
              <div className="tl-items">Core App Build · Photo/Video Logic · Voice-2-Text · Offline Encryption</div>
              <div className="tl-cost" style={{color: 'var(--accent)'}}>$18,000</div>
            </div>
            <div className="tl-row">
              <div className="tl-phase">PROTOCOL 03<br />Wk 9–14</div>
              <div className="tl-name" style={{color: '#f59e0b'}}>Forge Delivery</div>
              <div className="tl-items">Customer Report Engine · SMS/Email Integration · UX Polish · Branded Portal</div>
              <div className="tl-cost" style={{color: '#f59e0b'}}>$10,000</div>
            </div>
          </div>
        </div>

        {/* 05 INVESTMENT */}
        <div className="section">
          <div className="section-label">05 // Resource Allocation</div>
          <div className="section-title">Sustainment Options</div>

          <div className="pricing-grid">
            <div className="price-card featured">
              <div className="price-tag featured">✦ Recommended Path</div>
              <div className="price-name">SATCORP License</div>
              <div className="price-amount">$4,500</div>
              <div className="price-sub">Initial Build + $499/mo Operations Fee</div>
              <ul className="price-features">
                <li><CheckCircle2 size={14} /> Full Platform Deployment</li>
                <li><CheckCircle2 size={14} /> Continuous Security Patches</li>
                <li><CheckCircle2 size={14} /> Unlimited Tactician Seats (up to 10)</li>
                <li><CheckCircle2 size={14} /> Feature Evolution Path</li>
                <li><CheckCircle2 size={14} /> 24/7 Priority Support</li>
              </ul>
            </div>
            <div className="price-card">
              <div className="price-tag">Standard Path</div>
              <div className="price-name">Asset Buyout</div>
              <div className="price-amount" style={{color: 'white'}}>$28,000</div>
              <div className="price-sub">One-Time Acquisition Fee</div>
              <ul className="price-features">
                <li><CheckCircle2 size={14} /> Source Code Transmission</li>
                <li><CheckCircle2 size={14} /> 12mo Sustainment Period</li>
                <li><CheckCircle2 size={14} /> Independent Hosting Mode</li>
                <li className="no"><X size={14} /> Post-Yr 1 Evolution Excluded</li>
                <li className="no"><X size={14} /> Infrastructure Management Required</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 06 NEXT STEPS */}
        <div className="section">
          <div className="section-label">06 // Next Protocols</div>
          <div className="section-title">Activation Chain</div>

          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <div>
                <div className="step-title">Review Transmission</div>
                <div className="step-desc">Coordinate a strategic review with Scott to finalize scope and sustainment model. Prototype demo requested.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div>
                <div className="step-title">Kickoff Sequence</div>
                <div className="step-desc">Execute Service Agreement and deposit. SATCORP engineering response within 120 hours.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div>
                <div className="step-title">Operational Beta</div>
                <div className="step-desc">Deploy to 2 field tacticians by Week 10. Rapid iteration based on real-world HVAC environments.</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="doc-footer">
          <div className="footer-note">
            Transmission valid for 30 solar cycles from date of issue.<br />
            Origin: SATCORP Tactical Systems // satcorp.io<br />
            Security: CONFIDENTIAL // ADM ACCESS ONLY<br /><br />
            <span style={{opacity: 0.5}}>All assets in USD. Deployment begins upon protocol activation.</span>
          </div>
          <div className="footer-total">
            <div className="footer-total-label">Projected Investment</div>
            <div className="footer-total-val">$4,500</div>
            <div className="footer-total-label">+ $499/mo Operational Protocol</div>
            <button className="btn-primary" style={{marginTop: '24px', width: '100%'}}>
              Authorize Protocols <ArrowRight size={14} className="inline ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AireServProposal;
