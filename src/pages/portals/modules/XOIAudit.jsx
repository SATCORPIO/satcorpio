import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Settings, 
  Activity, 
  Database, 
  Terminal, 
  ChevronRight, 
  Cpu, 
  FileText, 
  Layers, 
  Zap, 
  BarChart4,
  Filter,
  Send,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Maximize2,
  HelpCircle
} from 'lucide-react';

const SECTIONS = [
  {
    name: "Work order management",
    features: [
      {id:"wo1", name:"Work order creation", desc:"Create, assign, and dispatch jobs to technicians"},
      {id:"wo2", name:"Work order status tracking", desc:"Real-time status updates: pending, in-progress, complete"},
      {id:"wo3", name:"Job history & audit trail", desc:"Full log of all actions taken on a work order"},
      {id:"wo4", name:"Priority & urgency flagging", desc:"Set urgency levels and escalation triggers"},
      {id:"wo5", name:"Recurring work orders", desc:"Scheduled recurring maintenance jobs"},
      {id:"wo6", name:"Work order templates", desc:"Pre-built templates for common job types"},
    ]
  },
  {
    name: "Video & photo documentation",
    features: [
      {id:"vp1", name:"In-field video capture", desc:"Technicians record video during job execution"},
      {id:"vp2", name:"Photo documentation", desc:"Capture before/after photos tied to work orders"},
      {id:"vp3", name:"Annotated media", desc:"Draw, mark, and annotate photos/video frames"},
      {id:"vp4", name:"AI video analysis", desc:"Auto-detect equipment, issues, and actions from video"},
      {id:"vp5", name:"Media library", desc:"Organized repository of all job media by asset/location"},
      {id:"vp6", name:"Customer-facing media sharing", desc:"Share job documentation videos with customers"},
    ]
  },
  {
    name: "AI & intelligence",
    features: [
      {id:"ai1", name:"AI job summaries", desc:"Auto-generated plain-language summaries of completed jobs"},
      {id:"ai2", name:"Predictive issue detection", desc:"Flag potential equipment failures from job data"},
      {id:"ai3", name:"Part & repair recognition", desc:"AI identifies parts and repair types from video/photos"},
      {id:"ai4", name:"Smart search", desc:"Natural language search across all job records and media"},
      {id:"ai5", name:"Compliance verification", desc:"AI checks if jobs followed required procedures"},
      {id:"ai6", name:"Performance scoring", desc:"AI-generated technician quality scores per job"},
    ]
  },
  {
    name: "Knowledge base & training",
    features: [
      {id:"kb1", name:"Equipment manuals library", desc:"Searchable repository of OEM manuals and guides"},
      {id:"kb2", name:"Step-by-step guided workflows", desc:"In-app guided procedures for common repairs"},
      {id:"kb3", name:"Video training content", desc:"Training videos accessible in the field"},
      {id:"kb4", name:"SOP management", desc:"Create, version, and enforce standard operating procedures"},
      {id:"kb5", name:"QR code equipment lookup", desc:"Scan QR/barcode to instantly pull up equipment info"},
      {id:"kb6", name:"Expert knowledge capture", desc:"Record senior tech knowledge as reusable content"},
    ]
  },
  {
    name: "Asset & equipment management",
    features: [
      {id:"as1", name:"Asset registry", desc:"Database of all customer equipment with full history"},
      {id:"as2", name:"Asset health tracking", desc:"Condition scores and maintenance history per asset"},
      {id:"as3", name:"Install & commissioning records", desc:"Document new equipment installs with media"},
      {id:"as4", name:"Warranty tracking", desc:"Track warranty status and expiry per asset"},
      {id:"as5", name:"Asset location mapping", desc:"Map view of assets across customer sites"},
      {id:"as6", name:"Equipment lifecycle tracking", desc:"Track age, repair frequency, replacement recommendations"},
    ]
  },
  {
    name: "Customer experience",
    features: [
      {id:"cx1", name:"Customer job portal", desc:"Customer-facing portal to view job status and history"},
      {id:"cx2", name:"Job completion reports", desc:"Auto-generated PDF reports sent to customers post-job"},
      {id:"cx3", name:"Customer approval flows", desc:"Customers approve estimates or scope changes in-app"},
      {id:"cx4", name:"Customer notifications", desc:"SMS/email updates on technician arrival and job status"},
      {id:"cx5", name:"Customer feedback & ratings", desc:"Post-job customer satisfaction surveys"},
      {id:"cx6", name:"Transparency documentation", desc:"Show customers exactly what was done with media proof"},
    ]
  },
  {
    name: "Technician mobile app",
    features: [
      {id:"tm1", name:"iOS & Android app", desc:"Native mobile app for field technicians"},
      {id:"tm2", name:"Offline mode", desc:"Full functionality without internet connection"},
      {id:"tm3", name:"GPS & location tracking", desc:"Real-time technician location for dispatch visibility"},
      {id:"tm4", name:"Clock in / clock out", desc:"Time tracking tied to jobs and locations"},
      {id:"tm5", name:"Parts lookup & request", desc:"Search parts catalog and request from warehouse"},
      {id:"tm6", name:"Digital forms & checklists", desc:"Replace paper forms with digital inspection checklists"},
    ]
  },
  {
    name: "Dispatch & scheduling",
    features: [
      {id:"ds1", name:"Dispatch board", desc:"Visual board for managing and assigning open jobs"},
      {id:"ds2", name:"Technician availability view", desc:"See who is available, in transit, or on-job"},
      {id:"ds3", name:"Skill-based routing", desc:"Assign jobs based on technician certifications and skills"},
      {id:"ds4", name:"Scheduling calendar", desc:"Calendar view of all scheduled jobs by team"},
      {id:"ds5", name:"SLA tracking", desc:"Monitor response time commitments per customer/contract"},
      {id:"ds6", name:"Route optimization", desc:"Optimal routing for multi-stop technician days"},
    ]
  },
  {
    name: "Estimating & invoicing",
    features: [
      {id:"ei1", name:"In-field estimates", desc:"Technicians generate estimates on-site from the app"},
      {id:"ei2", name:"Quote approval workflow", desc:"Customer approves estimates digitally before work begins"},
      {id:"ei3", name:"Parts & labor pricing", desc:"Price catalog with flat-rate and time-and-material options"},
      {id:"ei4", name:"Invoice generation", desc:"Auto-generate invoices from completed work orders"},
      {id:"ei5", name:"Payment collection", desc:"Accept payments in the field via card/digital wallet"},
      {id:"ei6", name:"Financing options", desc:"Offer customer financing on larger jobs"},
    ]
  },
  {
    name: "Analytics & reporting",
    features: [
      {id:"ar1", name:"Operations dashboard", desc:"Real-time KPIs: jobs completed, revenue, SLA compliance"},
      {id:"ar2", name:"Technician performance reports", desc:"Individual and team productivity metrics"},
      {id:"ar3", name:"First-time fix rate tracking", desc:"Track how often jobs are resolved on first visit"},
      {id:"ar4", name:"Equipment failure analytics", desc:"Identify high-failure assets and failure patterns"},
      {id:"ar5", name:"Revenue analytics", desc:"Revenue by technician, job type, customer, and region"},
      {id:"ar6", name:"Custom report builder", desc:"Build and schedule custom reports for any data set"},
    ]
  },
  {
    name: "Integrations & platform",
    features: [
      {id:"int1", name:"ServiceTitan integration", desc:"Bi-directional sync with ServiceTitan FSM"},
      {id:"int2", name:"Generic FSM API", desc:"Connect to any FSM via open API (ServiceMax, FieldEdge, etc.)"},
      {id:"int3", name:"ERP integration", desc:"Sync with QuickBooks, SAP, NetSuite"},
      {id:"int4", name:"CRM integration", desc:"Push customer and job data to Salesforce, HubSpot"},
      {id:"int5", name:"Webhook & API access", desc:"Developer API for custom integrations and automation"},
      {id:"int6", name:"SSO & identity management", desc:"SAML/OAuth SSO with enterprise identity providers"},
    ]
  },
  {
    name: "Admin & settings",
    features: [
      {id:"adm1", name:"Role-based access control", desc:"Granular permissions by role: admin, dispatcher, tech, viewer"},
      {id:"adm2", name:"Multi-location / branch management", desc:"Manage multiple service regions or branches"},
      {id:"adm3", name:"Branding & white-label", desc:"Custom logo, colors, and domain for customer-facing views"},
      {id:"adm4", name:"Notification & alert configuration", desc:"Configure who gets notified for what events"},
      {id:"adm5", name:"Data retention & compliance", desc:"Configure data retention, HIPAA/SOC2 compliance settings"},
      {id:"adm6", name:"Audit logs", desc:"Full system audit log for security and compliance"},
    ]
  }
];

const XOIAudit = () => {
  const [decisions, setDecisions] = useState({});
  const [filter, setFilter] = useState('ALL');
  const [submitting, setSubmitting] = useState(false);

  const stats = {
    total: SECTIONS.flatMap(s => s.features).length,
    future: Object.values(decisions).filter(v => v === 'FUTURE').length,
    cut: Object.values(decisions).filter(v => v === 'CUT').length,
    add: Object.values(decisions).filter(v => v === 'ADD').length,
    none: SECTIONS.flatMap(s => s.features).length - Object.values(decisions).filter(Boolean).length
  };

  const handleDecide = (id, action) => {
    setDecisions(prev => ({
      ...prev,
      [id]: prev[id] === action ? null : action
    }));
  };

  const exportDecisions = async () => {
    setSubmitting(true);
    const timestamp = new Date().toLocaleString();
    
    // Group decisions
    const groups = { 'FUTURE FEATURE': [], ADD: [], CUT: [] };
    SECTIONS.forEach(sec => {
      sec.features.forEach(f => {
        const d = decisions[f.id];
        if (d === 'FUTURE') groups['FUTURE FEATURE'].push(`${sec.name} → ${f.name}`);
        else if (d) groups[d].push(`${sec.name} → ${f.name}`);
      });
    });

    const embeds = [
      {
        title: "🎯 XOi Feature Audit Decisions",
        color: 0x06b6d4,
        description: `Audit submission from SATCORP Terminal\n**Timestamp:** ${timestamp}`,
        fields: [
          ...Object.entries(groups).filter(([_, items]) => items.length > 0).map(([key, items]) => ({
            name: `${key} (${items.length})`,
            value: items.map(i => `• ${i}`).join('\n').substring(0, 1024)
          }))
        ],
        footer: { text: "KYRAX AI System // Feature Audit Module" }
      }
    ];

    if (stats.none > 0) {
      embeds[0].fields.push({
        name: "PENDING REVIEW",
        value: `${stats.none} features remain unmarked.`
      });
    }

    try {
      const response = await fetch('https://discord.com/api/webhooks/1491959357221634211/uldYeelaRmSbirVgoPgx-OpV1TqbxUa5OTJB6ul1ntMb4NyzIQgtajOkmzR8tz7SkTbP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: "KYRAX // AUDIT TERMINAL",
          content: "📁 **Strategic Feature Audit Transmission Received**",
          embeds
        })
      });

      if (response.ok) {
        alert('TRANSMISSION SUCCESSFUL. Feature audit data synchronized with central command.');
      } else {
        throw new Error('Transmission failed');
      }
    } catch (err) {
      console.error(err);
      alert('TRANSMISSION ERROR. Relay failed. Check system logs.');
    } finally {
      setSubmitting(false);
    }
  };

  const ExportButton = ({ className = "" }) => (
    <button 
      onClick={exportDecisions}
      disabled={submitting}
      className={`submit-btn ${className}`}
    >
      {submitting ? 'TRANSMITTING...' : 'EXPORT DECISIONS'}
    </button>
  );

  return (
    <div className="xoi-client-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

        :root {
          --bg-primary: #020202;
          --bg-secondary: #0d0d0d;
          --bg-tertiary: #141414;
          --surface: rgba(20, 20, 20, 0.7);
          --border: #1c1c1c;
          --border-active: #333333;
          --text-primary: #ffffff;
          --text-secondary: #a1a1aa;
          --text-dim: #52525b;
          --accent-red: #e11d48;
          --accent-cyan: #06b6d4;
          --accent-amber: #f59e0b;
          --accent-blue: #3b82f6;
          --mono: 'JetBrains Mono', monospace;
          --sans: 'Inter', sans-serif;
          --glass: rgba(2, 2, 2, 0.8);
        }

        @media (max-width: 768px) {
          :root {
            --text-secondary: #d4d4d8;
            --text-dim: #a1a1aa;
          }
        }

        .xoi-client-wrapper {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--sans);
          font-weight: 300;
          line-height: 1.6;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          background-image: 
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0);
          background-size: 40px 40px;
        }

        .page {
          max-width: 840px;
          margin: 0 auto;
          padding: 80px 40px 100px;
        }

        /* HEADER */
        .doc-header {
          padding-top: 24px;
          padding-bottom: 24px;
          margin-bottom: 56px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--glass);
          backdrop-filter: blur(10px);
        }

        .doc-header::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 80px;
          height: 1px;
          background: var(--accent-red);
          box-shadow: 0 0 10px var(--accent-red);
        }

        .doc-eyebrow {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--accent-cyan);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .doc-eyebrow::before {
          content: '';
          width: 12px;
          height: 12px;
          border-left: 1px solid var(--accent-cyan);
          border-top: 1px solid var(--accent-cyan);
        }

        h1 {
          font-size: clamp(32px, 5vw, 48px);
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          max-width: 600px;
          margin: 0;
          font-weight: 900;
          text-transform: uppercase;
          font-style: italic;
        }

        h1 em {
          font-style: italic;
          color: var(--accent-red);
          text-shadow: 0 0 20px rgba(225, 29, 72, 0.3);
        }

        .doc-header-right {
          text-align: right;
          flex-shrink: 0;
        }

        .doc-meta {
          font-family: var(--mono);
          font-size: 10px;
          line-height: 2.2;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .doc-meta strong {
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* INTRO */
        .intro {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          padding: 40px;
          margin-bottom: 64px;
          position: relative;
          backdrop-filter: blur(10px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .intro::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, transparent 100%);
          pointer-events: none;
        }

        .intro p {
          font-size: 14px;
          line-height: 1.8;
          color: var(--text-secondary);
          position: relative;
          z-index: 1;
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 24px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-family: var(--mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-dim);
        }

        .stat-value {
          font-size: 24px;
          font-weight: 900;
          color: var(--text-primary);
        }

        .filter-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .filter-label {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-right: 12px;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-dim);
          padding: 8px 16px;
          font-family: var(--mono);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: var(--border-active);
          color: var(--text-primary);
        }

        .filter-btn.active {
          background: rgba(255,255,255,0.1);
          border-color: var(--text-primary);
          color: var(--text-primary);
        }

        /* SECTIONS */
        .section {
          margin-bottom: 72px;
          animation: fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .section-num {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--accent-cyan);
          letter-spacing: 0.2em;
          background: rgba(6,182,212,0.1);
          padding: 4px 10px;
          border: 1px solid var(--accent-cyan);
        }

        .section-title {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .section-desc {
          font-size: 10px;
          color: var(--text-dim);
          margin-left: auto;
          font-family: var(--mono);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .features-grid { grid-template-columns: 1fr 1fr; }
        }

        /* QUESTION BLOCKS */
        .question-block {
          padding: 24px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .question-block::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 2px; height: 100%;
          background: var(--border);
          transition: background 0.3s;
        }

        .question-block:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-active);
        }

        .question-block[data-status="FUTURE"]::before { background: var(--accent-blue); }
        .question-block[data-status="ADD"]::before { background: var(--accent-amber); }
        .question-block[data-status="CUT"]::before { background: var(--accent-red); }

        .question-block[data-status="FUTURE"] { background: rgba(59, 130, 246, 0.05); border-color: rgba(59, 130, 246, 0.2); }
        .question-block[data-status="ADD"] { background: rgba(245, 158, 11, 0.05); border-color: rgba(245, 158, 11, 0.2); }
        .question-block[data-status="CUT"] { background: rgba(225, 29, 72, 0.05); border-color: rgba(225, 29, 72, 0.2); }

        .q-num {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--text-dim);
          letter-spacing: 0.3em;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .q-text {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .q-hint {
          font-size: 12px;
          color: var(--text-dim);
          margin-bottom: 24px;
          line-height: 1.6;
          font-weight: 300;
        }

        .action-row {
          display: flex;
          gap: 8px;
          margin-top: auto;
          flex-wrap: wrap;
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          background: transparent;
          border: 1px solid var(--border);
          font-family: var(--mono);
          font-size: 9px;
          font-weight: 700;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-primary);
        }

        .action-btn[data-type="FUTURE"].active {
          background: var(--accent-blue);
          border-color: var(--accent-blue);
          color: #000;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .action-btn[data-type="ADD"].active {
          background: var(--accent-amber);
          border-color: var(--accent-amber);
          color: #000;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
        }

        .action-btn[data-type="CUT"].active {
          background: var(--accent-red);
          border-color: var(--accent-red);
          color: #000;
          box-shadow: 0 0 20px rgba(225, 29, 72, 0.3);
        }

        /* SUBMIT BUTTON */
        .submit-btn {
          background: var(--accent-red);
          color: white;
          border: none;
          padding: 20px 48px;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          box-shadow: 0 0 30px rgba(225, 29, 72, 0.2);
          width: 100%;
          margin-top: 40px;
        }

        .submit-btn:hover:not(:disabled) { 
          background: #ff1f54; 
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(225, 29, 72, 0.4);
        }
        
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-btn::after { 
          content: '>>'; 
          font-family: var(--mono);
          font-size: 14px; 
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .page { padding: 40px 20px 80px; }
          .doc-header { flex-direction: column; align-items: flex-start; }
          .doc-header-right { text-align: left; }
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .action-btn { flex: 1 1 100%; }
        }
      `}</style>

      <div className="page">
        {/* HEADER */}
        <div className="doc-header">
          <div className="doc-header-left">
            <div className="doc-eyebrow"><Shield className="w-3 h-3" /> Strategic Appraisal // Vector XOi</div>
            <h1>XOi<br /><em>Feature</em> Audit</h1>
          </div>
          <div className="doc-header-right">
             <div className="doc-meta">
              <div><strong>Document</strong> · XOI-AUDIT-001</div>
              <div><strong>Version</strong> · 1.0</div>
            </div>
          </div>
        </div>

        {/* INTRO & STATS */}
        <div className="intro">
          <p>Determine operational viability for subsequent integration phases. Review each feature below and assign it to the appropriate development track.</p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Assets</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label" style={{color: 'var(--accent-blue)'}}>Future</span>
              <span className="stat-value">{stats.future}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label" style={{color: 'var(--accent-amber)'}}>Add</span>
              <span className="stat-value">{stats.add}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label" style={{color: 'var(--accent-red)'}}>Cut</span>
              <span className="stat-value">{stats.cut}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Unmarked</span>
              <span className="stat-value">{stats.none}</span>
            </div>
          </div>

          <div className="filter-controls">
            <div className="filter-label"><Filter className="w-3 h-3" /> Filter Vector</div>
            {['ALL', 'FUTURE', 'ADD', 'CUT', 'NONE'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
              >
                {f === 'FUTURE' ? 'Future Feature' : f}
              </button>
            ))}
          </div>
        </div>

        {/* FEATURE SECTIONS */}
        <div>
          {SECTIONS.map((section, sidx) => {
            const visibleFeatures = section.features.filter(f => {
              if (filter === 'ALL') return true;
              if (filter === 'NONE') return !decisions[f.id];
              return decisions[f.id] === filter;
            });

            if (visibleFeatures.length === 0) return null;

            return (
              <div key={section.name} className="section" style={{ animationDelay: `${sidx * 0.05}s` }}>
                <div className="section-header">
                  <div className="section-num">{String(sidx + 1).padStart(2, '0')}</div>
                  <div className="section-title">{section.name}</div>
                  <div className="section-desc"><Layers className="w-3 h-3 inline mr-2" /> Sector // {section.features.length} Features</div>
                </div>

                <div className="features-grid">
                  {visibleFeatures.map(feat => {
                    const status = decisions[feat.id];
                    return (
                      <div 
                        key={feat.id}
                        className="question-block"
                        style={{ display: 'flex', flexDirection: 'column' }}
                        data-status={status || ''}
                      >
                        <div className="q-num">{feat.id}</div>
                        <div className="q-text">{feat.name}</div>
                        <div className="q-hint">{feat.desc}</div>

                        <div className="action-row">
                            <button
                              onClick={() => handleDecide(feat.id, 'FUTURE')}
                              className={`action-btn ${status === 'FUTURE' ? 'active' : ''}`}
                              data-type="FUTURE"
                            >
                              <Maximize2 className="w-3 h-3" /> Future Feature
                            </button>
                            <button
                              onClick={() => handleDecide(feat.id, 'ADD')}
                              className={`action-btn ${status === 'ADD' ? 'active' : ''}`}
                              data-type="ADD"
                            >
                              <PlusCircle className="w-3 h-3" /> Add
                            </button>
                            <button
                              onClick={() => handleDecide(feat.id, 'CUT')}
                              className={`action-btn ${status === 'CUT' ? 'active' : ''}`}
                              data-type="CUT"
                            >
                              <XCircle className="w-3 h-3" /> Cut
                            </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        <ExportButton />
      </div>
    </div>
  );
};

export default XOIAudit;
