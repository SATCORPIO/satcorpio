import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './NamtarSurvey.css';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1475195439254081768/O4YNOHNGYV1Z6UjWDW660ZwGPh2IWcHqeuni2guMHJnLDoDKj62g_kpSV00g5_G7Ypmf';

const BOOT_LINES = [
  { text: '> SATCORP MAINFRAME ONLINE', cls: 'ok', delay: 700, ch: 26 },
  { text: '> KYRAX v4.2.1 — LOADING AI CORE...', cls: '', delay: 1400, ch: 36 },
  { text: '> NAMTAR ENVIRONMENT: LOADED', cls: 'ok', delay: 2200, ch: 28 },
  { text: '> SURVIVOR DATABASE: INITIALIZING', cls: '', delay: 2900, ch: 33 },
  { text: '> SERVER CALIBRATION MODULE: ACTIVE', cls: 'ok', delay: 3600, ch: 35 },
  { text: '> DISCORD RELAY: CONNECTED', cls: 'ok', delay: 4300, ch: 26 },
];

const BOOT_TOTAL_MS = 5000;

function RainCanvas({ className, style, id }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', handleResize);

    const drops = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: 8 + Math.random() * 20,
      speed: 7 + Math.random() * 10,
      op: 0.1 + Math.random() * 0.4
    }));

    let animationId;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      drops.forEach(d => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * 0.1, d.y + d.len);
        ctx.strokeStyle = `rgba(150,220,255,${d.op})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        d.y += d.speed;
        d.x -= 0.5;
        if (d.y > h) {
          d.y = -20;
          d.x = Math.random() * w;
        }
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} id={id} className={className} style={style} />;
}

export default function NamtarSurvey() {
  const [bootVisible, setBootVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [bootPct, setBootPct] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const [showEnter, setShowEnter] = useState(false);
  const [lightningOpacity, setLightningOpacity] = useState(0);

  const [answers, setAnswers] = useState({
    q1: '', q2: '', q3: '', q4: [], q5: '', q6: '', q7: '', q8: '', q8maps: [], 'q8-custom-map': '',
    q9: '', 'q9-other': '', q10: '', 'q10-custom': '', q11: '', q12: '', q13: '', q14: [],
    q15: '', q16: [], 'q16-open': '', q17: '', q18: [], 'q18-open': '', q19: [], q20: [],
    q21: '', q22: '', q23: '', q24: '', q25: '7', q26: '', q27: '', 'q-bonus': []
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Multi select handler
  const toggleMulti = (key, val) => {
    setAnswers(prev => {
      const arr = prev[key] || [];
      if (arr.includes(val)) return { ...prev, [key]: arr.filter(v => v !== val) };
      return { ...prev, [key]: [...arr, val] };
    });
  };

  // Single select handler
  const setSingle = (key, val) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  // Boot sequence
  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
    });

    const startTime = Date.now();
    let animId;
    const animatePct = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / BOOT_TOTAL_MS) * 100));
      setBootPct(pct);
      if (pct < 100) {
        animId = requestAnimationFrame(animatePct);
      } else {
        setTimeout(() => setShowEnter(true), 400);
      }
    };
    animId = requestAnimationFrame(animatePct);

    return () => cancelAnimationFrame(animId);
  }, []);

  // Lightning effect
  useEffect(() => {
    let timeoutIds = [];
    const doLightning = () => {
      if (!bootVisible) return;
      setLightningOpacity(1);
      timeoutIds.push(setTimeout(() => setLightningOpacity(0), 70));
      timeoutIds.push(setTimeout(() => {
        setLightningOpacity(0.5);
        timeoutIds.push(setTimeout(() => setLightningOpacity(0), 60));
      }, 110));
      timeoutIds.push(setTimeout(doLightning, 4000 + Math.random() * 12000));
    };
    timeoutIds.push(setTimeout(doLightning, 2500));
    return () => timeoutIds.forEach(clearTimeout);
  }, [bootVisible]);

  // General lightning when boot is done
  const [generalFlash, setGeneralFlash] = useState(0);
  useEffect(() => {
    if (bootVisible) return;
    let tId;
    const doFlash = () => {
      setGeneralFlash(1);
      setTimeout(() => setGeneralFlash(0), 80);
      setTimeout(() => setGeneralFlash(0.7), 120);
      setTimeout(() => setGeneralFlash(0), 200);
      tId = setTimeout(doFlash, 5000 + Math.random() * 20000);
    };
    tId = setTimeout(doFlash, 4000);
    return () => clearTimeout(tId);
  }, [bootVisible]);

  // Parallax Scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const t = (id, mul) => {
        const el = document.getElementById(id);
        if (el) el.style.transform = `translateZ(0) translateY(${y * mul}px)`;
      };
      t('jungle-far', 0.05); t('jungle-mid', 0.08); t('fog1', 0.04); t('fog2', 0.06);
      
      const elTrex = document.getElementById('trex');
      if (elTrex) elTrex.style.transform = `translateZ(0) translateX(0) translateY(${y * 0.07}px)`;
      
      const elBar = document.getElementById('progress-bar');
      if (elBar) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        elBar.style.width = total > 0 ? (y / total * 100) + '%' : '0%';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const enterSite = () => {
    setFadeOut(true);
    setTimeout(() => setBootVisible(false), 1200);
  };

  const OptionBtn = ({ qKey, val, multi, pvp }) => {
    const isSelected = multi ? answers[qKey]?.includes(val) : answers[qKey] === val;
    return (
      <button 
        type="button" 
        className={`opt-btn ${isSelected ? 'selected' : ''} ${pvp ? 'pvp-style' : ''}`}
        onClick={() => multi ? toggleMulti(qKey, val) : setSingle(qKey, val)}
      >
        {val}
      </button>
    );
  };

  const buildDiscordMessages = () => {
    const gamertag = answers.q1 || 'Unknown Survivor';
    const timestamp = new Date().toLocaleString('en-US', {dateStyle:'long', timeStyle:'short'});

    const sectionMap1 = {
      'q1':'Survivor Name','q2':'Platform','q3':'Play Time/Week','q4':'Playstyle',
      'q5':'Server Mode','q6':'ORP Preference','q7':'Wipe Schedule','q8':'Map Setup',
      'q8maps':'Cluster Maps','q8-custom-map':'Custom Map Suggestion',
      'q9':'Starting Map','q9-other':'Starting Map (Other)',
      'q10':'Harvest Rates','q10-custom':'Harvest Custom','q11':'Taming Speed',
      'q12':'Breeding','q13':'XP Rate','q14':'Imprint Settings','q15':'Dino Difficulty'
    };

    const sectionMap2 = {
      'q16':'QoL Features','q16-open':'QoL Mandatory',
      'q17':'Mod Volume','q18':'Mod Categories','q18-open':'Specific Mods',
      'q19':'Economy Participation','q20':'World Events',
      'q21':'Community Size','q22':'Rule Strictness',
      'q23':'Stays Long-Term For','q24':'Leaves Server For',
      'q25':'Interest Rating (1–10)','q26':'Join At Launch?',
      'q27':'Additional Comments','q-bonus':'Elite Credentials'
    };

    const buildFields = (map) => {
      return Object.entries(map)
        .map(([key, label]) => {
          let val = answers[key];
          if (Array.isArray(val)) val = val.join(', ');
          if (!val) return null;
          return { name: label, value: val.substring(0, 512), inline: false };
        })
        .filter(Boolean);
    };

    const msg1 = {
      username: 'KYRAX SATCORP AI',
      embeds: [{
        title: `⚡ NAMTAR SURVEY — ${gamertag} [1/2]`,
        description: `New survivor registration received.\n**Submitted:** ${timestamp}`,
        color: 0x00E5CC,
        fields: buildFields(sectionMap1),
        footer: { text: 'Ki-Ra Studios | NAMTAR Survey — Profile & Prefs' }
      }]
    };

    const msg2 = {
      username: 'KYRAX SATCORP AI',
      embeds: [{
        title: `⚡ NAMTAR SURVEY — ${gamertag} [2/2]`,
        color: 0xFF6B1A,
        fields: buildFields(sectionMap2),
        footer: { text: 'Ki-Ra Studios | NAMTAR Survey — QoL, Mods, Vision & Final' }
      }]
    };

    return [msg1, msg2];
  };

  const submitSurvey = async () => {
    setSubmitting(true);
    const messages = buildDiscordMessages();
    try {
      for (const payload of messages) {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok && res.status !== 204) {
          throw new Error('Server responded with default discord webhook error');
        }
        await new Promise(r => setTimeout(r, 600)); // Rate limit pause
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(err) {
      alert(`Transmission failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="namtar-survey-page">
      {bootVisible && (
        <div id="boot-screen" style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: '#000', display: 'flex',
          flexDirection: 'column', overflow: 'hidden', transition: 'opacity 1.2s ease',
          opacity: fadeOut ? 0 : 1
        }}>
          <div id="boot-bg" style={{position:'absolute', inset:0, background:'linear-gradient(180deg, #000305 0%, #010a06 40%, #021208 70%, #010803 100%)'}} />
          
          <svg id="boot-jungle" viewBox="0 0 1400 320" preserveAspectRatio="none" style={{position:'absolute', bottom:0, left:0, width:'100%', height:'45vh', animation:'boot-jungle-rise 2s ease 1s forwards'}}>
            <path d="M0 320 L0 200 Q40 140 80 180 Q120 110 170 165 Q210 90 260 150 Q310 70 360 135 Q400 60 450 125 Q500 45 555 115 Q600 50 655 120 Q700 55 755 122 Q800 65 855 128 Q900 75 950 135 Q1000 90 1050 148 Q1100 105 1155 162 Q1200 125 1255 178 Q1300 148 1360 188 Q1385 172 1400 195 L1400 320 Z" fill="#010c05"/>
            <path d="M0 320 L0 235 Q50 195 100 220 Q160 180 215 210 Q270 165 325 200 Q380 155 440 192 Q495 150 555 188 Q610 148 670 185 Q725 150 785 186 Q840 155 900 190 Q955 158 1015 192 Q1070 160 1130 194 Q1185 165 1245 198 Q1300 170 1360 200 Q1385 190 1400 205 L1400 320 Z" fill="#000a04"/>
            <path d="M0 320 L0 275 Q100 255 200 270 Q300 250 400 268 Q500 248 600 266 Q700 248 800 265 Q900 248 1000 264 Q1100 250 1200 265 Q1300 252 1400 265 L1400 320 Z" fill="#000703"/>
            <g transform="translate(1080, 80)" opacity="0.35">
              <ellipse cx="80" cy="110" rx="45" ry="30"/>
              <path d="M105 85 Q118 65 145 62 Q155 60 158 68 Q162 76 153 82 Q143 87 140 97 Q135 107 126 105 Q112 102 105 85Z"/>
              <path d="M138 64 Q152 58 161 62 Q158 67 144 69Z"/>
              <circle cx="144" cy="68" r="3" fill="#001006"/>
              <path d="M100 100 Q105 85 112 90 Q116 105 108 113Z"/>
              <path d="M38 118 Q20 126 5 142 Q-2 150 2 154 Q8 153 18 143 Q34 130 46 126"/>
              <path d="M65 142 Q63 166 58 182 Q55 190 60 191 Q64 191 67 180 Q70 168 74 150"/>
              <path d="M92 140 Q92 165 88 180 Q85 189 91 190 Q97 189 96 176 Q95 162 96 143"/>
              <path d="M53 186 Q45 196 47 200 Q53 199 60 192"/>
              <path d="M84 184 Q77 194 79 198 Q85 197 93 188"/>
            </g>
          </svg>

          <RainCanvas style={{position:'absolute', inset:0, pointerEvents:'none', opacity:0.25, zIndex:6}} />
          <div id="boot-lightning" style={{position:'absolute', inset:0, background:'rgba(80,200,255,0.06)', pointerEvents:'none', zIndex:5, opacity: lightningOpacity, transition: 'opacity 0.05s'}} />

          <div className="boot-corner boot-corner-tl" />
          <div className="boot-corner boot-corner-tr" />
          <div className="boot-corner boot-corner-bl" />
          <div className="boot-corner boot-corner-br" />

          <div id="boot-content">
            <div className="boot-satcorp">SATCORP SYSTEMS // KI-RA STUDIOS</div>
            <div id="boot-kyrax">
              <img src="/assets/kyrax-wolf.png" alt="KYRAX" />
            </div>
            <div className="boot-namtar">NAMTAR</div>
            <div className="boot-ark-sub">ARK: SURVIVAL ASCENDED // SURVIVOR REGISTRATION</div>

            <div id="boot-terminal">
              {BOOT_LINES.map((line, idx) => visibleLines.includes(idx) && (
                <div key={idx} className={`boot-log-line ${line.cls}`} style={{
                  animation: `typingBoot ${line.dur || 600}ms steps(${line.ch || 30}, end) forwards`
                }}>
                  {line.text}
                </div>
              ))}
            </div>

            <div className="boot-bar-wrap">
              <div className="boot-bar-label">
                <span>CALIBRATING SYSTEMS</span>
                <span>{bootPct}%</span>
              </div>
              <div className="boot-bar-track">
                <div className="boot-bar-fill" style={{width: `${bootPct}%`}} />
              </div>
            </div>

            {showEnter && (
              <button id="boot-enter" style={{display:'block'}} onClick={enterSite}>
                ▶ ENTER NAMTAR
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Survey Setup */}
      {!bootVisible && (
        <div id="scene">
          <div id="sky" />
          <div id="stars">
            {Array.from({length: 120}).map((_, i) => (
              <div key={i} className="star" style={{
                width: `${Math.random()*2+0.5}px`, height: `${Math.random()*2+0.5}px`,
                left: `${Math.random()*100}%`, top: `${Math.random()*60}%`,
                '--d': `${2+Math.random()*4}s`, animationDelay: `${Math.random()*5}s`,
                opacity: 0.1+Math.random()*0.5
              }} />
            ))}
          </div>
          <div id="light-rays">
            <div className="ray" /><div className="ray" /><div className="ray" /><div className="ray" />
          </div>
          <RainCanvas style={{position:'absolute', inset:0, pointerEvents:'none', opacity:0.35}} />
          <div id="jungle-far" className="jungle-layer parallax-el" />
          <div id="fog1" className="fog parallax-el" />
          <div id="jungle-mid" className="jungle-layer parallax-el" />
          <div id="fog2" className="fog parallax-el" />
          <div id="trex">
            <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="#001508">
              <ellipse cx="110" cy="140" rx="50" ry="35"/>
              <path d="M130 100 Q145 80 175 75 Q185 72 190 80 Q195 88 185 95 Q175 100 170 110 Q165 120 155 118 Q140 115 130 100Z"/>
              <path d="M165 78 Q180 70 192 75 Q188 80 175 82 Q168 82 165 78Z"/>
              <circle cx="175" cy="82" r="4" fill="#002010"/>
              <path d="M125 115 Q130 100 140 105 Q145 120 135 130 Q127 128 125 115Z"/>
              <path d="M62 145 Q40 155 20 175 Q10 185 15 190 Q22 190 35 178 Q55 162 70 158"/>
              <path d="M140 120 Q150 130 148 142 Q143 145 138 138 Q135 128 140 120Z"/>
              <path d="M90 170 Q88 200 82 220 Q78 230 85 232 Q90 232 92 220 Q96 205 100 180"/>
              <path d="M120 168 Q120 200 116 218 Q113 228 120 230 Q127 228 126 215 Q124 200 125 172"/>
              <path d="M78 228 Q68 240 70 245 Q78 244 85 235"/>
              <path d="M115 226 Q106 238 108 244 Q116 243 124 232"/>
            </svg>
          </div>
          <div id="fog3" className="fog parallax-el" />
          <div id="jungle-near" className="jungle-layer parallax-el" />
        </div>
      )}

      {/* Main Content */}
      <div id="content" style={{display: bootVisible ? 'none' : 'block'}}>
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />
        <div id="progress-bar" />
        <div id="lightning-flash" style={{opacity: generalFlash}}/>

        {!submitted ? (
          <>
            <header className="survey-page-header">
              <div className="studio-badge">KI-RA STUDIOS PRESENTS</div>
              <div className="namtar-logo">NAMTAR</div>
              <div className="ark-subtitle">ARK: SURVIVAL ASCENDED</div>
              <div className="divider" />
              <div className="studio-badge" style={{fontSize: '0.75rem', letterSpacing: '0.3em', color: '#c8e8f0', opacity: 0.6, marginTop: '8px'}}>
                SURVIVOR REGISTRATION & SERVER CALIBRATION SURVEY
              </div>
            </header>

            <div id="kyrax-panel">
              <div className="kyrax-container">
                <div className="kyrax-avatar">
                  <img src="/assets/kyrax-wolf.png" alt="KYRAX" />
                  <div className="kyrax-ring" />
                </div>
                <div className="kyrax-text">
                  <div className="kyrax-name">KYRAX</div>
                  <div className="kyrax-role">SATCORP // SURVEY LEAD</div>
                  <div className="kyrax-msg">
                    Greetings, Survivor. I am <span className="highlight">KYRAX</span>, SATCORP's artificial intelligence — your guide through the NAMTAR calibration process.<br/><br/>
                    Before the gates open, <span className="highlight">Ki-Ra Studios</span> needs to understand your playstyle, preferences, and ambitions. Your input will directly shape the server's rates, systems, and world design.<br/><br/>
                    Complete this survey carefully. <span className="highlight">Every answer matters.</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="survey-wrap">
              <form id="survey-form" onSubmit={(e) => e.preventDefault()}>
                
                {/* SECTION I */}
                <div className="section-header">
                  <div className="section-num">SECTION I</div>
                  <div className="section-line" />
                  <div className="section-title">Survivor Profile</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 01</div>
                  <div className="q-text">Survivor Name (Gamertag):</div>
                  <input className="ark-input" type="text" name="q1" value={answers.q1} onChange={handleChange} placeholder="Enter your gamertag..." />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 02</div>
                  <div className="q-text">Platform:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q2" val="PC" />
                    <OptionBtn qKey="q2" val="Xbox" />
                    <OptionBtn qKey="q2" val="PlayStation" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 03</div>
                  <div className="q-text">Average Play Time Per Week:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q3" val="1–5 hrs" />
                    <OptionBtn qKey="q3" val="5–15 hrs" />
                    <OptionBtn qKey="q3" val="15–30 hrs" />
                    <OptionBtn qKey="q3" val="30+ hrs" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 04</div>
                  <div className="q-text">Playstyle:</div>
                  <div className="q-note">Select all that apply</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q4" val="Solo" multi />
                    <OptionBtn qKey="q4" val="Small Tribe (2–5)" multi />
                    <OptionBtn qKey="q4" val="Large Tribe (6+)" multi />
                    <OptionBtn qKey="q4" val="PvE" multi />
                    <OptionBtn qKey="q4" val="PvP" multi pvp />
                    <OptionBtn qKey="q4" val="Breeder" multi />
                    <OptionBtn qKey="q4" val="Explorer" multi />
                    <OptionBtn qKey="q4" val="Hybrid" multi />
                  </div>
                </div>

                {/* SECTION II */}
                <div className="section-header">
                  <div className="section-num">SECTION II</div>
                  <div className="section-line" />
                  <div className="section-title">Server Type Preference</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 05</div>
                  <div className="q-text">Server Mode Preference:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q5" val="PvE" />
                    <OptionBtn qKey="q5" val="PvP" pvp />
                    <OptionBtn qKey="q5" val="PvPvE Zones" pvp />
                    <OptionBtn qKey="q5" val="Seasonal Wipe PvP" pvp />
                    <OptionBtn qKey="q5" val="Long-Term Persistent" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 06</div>
                  <div className="q-text">Offline Raid Protection (ORP)? <em style={{opacity:0.5, fontSize:'0.8em'}}>(If PvP)</em></div>
                  <div className="options-grid">
                    <OptionBtn qKey="q6" val="None" />
                    <OptionBtn qKey="q6" val="1 hour offline" />
                    <OptionBtn qKey="q6" val="4 hours offline" />
                    <OptionBtn qKey="q6" val="12 hours offline" />
                    <OptionBtn qKey="q6" val="24 hours offline" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 07</div>
                  <div className="q-text">Wipe Schedule Preference <em style={{opacity:0.5, fontSize:'0.8em'}}>(if PvP)</em>:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q7" val="No Wipes" />
                    <OptionBtn qKey="q7" val="3 Months" />
                    <OptionBtn qKey="q7" val="6 Months" />
                    <OptionBtn qKey="q7" val="1 Year" />
                    <OptionBtn qKey="q7" val="Seasonal Campaign Format" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 08</div>
                  <div className="q-text">Single map or cluster?</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q8" val="Single map" />
                    <OptionBtn qKey="q8" val="Cluster" />
                  </div>
                  {answers.q8 === 'Cluster' && (
                    <div id="cluster-opts" className="conditional visible" style={{marginTop: '16px'}}>
                      <div className="q-text" style={{fontSize: '0.85rem', marginBottom: '10px'}}>If cluster, which maps to include?</div>
                      <div className="q-note">Multi-select</div>
                      <div className="options-grid">
                        <OptionBtn qKey="q8maps" val="The Island" multi />
                        <OptionBtn qKey="q8maps" val="Scorched Earth" multi />
                        <OptionBtn qKey="q8maps" val="Aberration" multi />
                        <OptionBtn qKey="q8maps" val="Extinction" multi />
                        <OptionBtn qKey="q8maps" val="The Center" multi />
                        <OptionBtn qKey="q8maps" val="Ragnarok" multi />
                      </div>
                      <input className="ark-input" type="text" name="q8-custom-map" value={answers['q8-custom-map']} onChange={handleChange} placeholder="Custom mod map suggestion..." style={{marginTop: '10px'}}/>
                    </div>
                  )}
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 09</div>
                  <div className="q-text">Preferred Starting Map:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q9" val="The Island" />
                    <OptionBtn qKey="q9" val="Scorched Earth" />
                    <OptionBtn qKey="q9" val="The Center" />
                    <OptionBtn qKey="q9" val="Other" />
                  </div>
                  {answers.q9 === 'Other' && (
                    <input className="ark-input" type="text" name="q9-other" value={answers['q9-other']} onChange={handleChange} placeholder="Specify other map..." style={{marginTop: '10px'}}/>
                  )}
                </div>

                {/* SECTION III */}
                <div className="section-header">
                  <div className="section-num">SECTION III</div>
                  <div className="section-line" />
                  <div className="section-title">Rate Preferences</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 10</div>
                  <div className="q-text">Harvest Rates:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q10" val="Official (1x)" />
                    <OptionBtn qKey="q10" val="2x" />
                    <OptionBtn qKey="q10" val="3x" />
                    <OptionBtn qKey="q10" val="5x" />
                    <OptionBtn qKey="q10" val="10x" />
                    <OptionBtn qKey="q10" val="Custom" />
                  </div>
                  {answers.q10 === 'Custom' && (
                    <input className="ark-input" type="text" name="q10-custom" value={answers['q10-custom']} onChange={handleChange} placeholder="Custom harvest rate suggestion..." style={{marginTop: '10px'}}/>
                  )}
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 11</div>
                  <div className="q-text">Taming Speed:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q11" val="Official (1x)" />
                    <OptionBtn qKey="q11" val="2x" />
                    <OptionBtn qKey="q11" val="3x" />
                    <OptionBtn qKey="q11" val="5x" />
                    <OptionBtn qKey="q11" val="10x" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 12</div>
                  <div className="q-text">Breeding:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q12" val="Official (1x)" />
                    <OptionBtn qKey="q12" val="5x" />
                    <OptionBtn qKey="q12" val="10x" />
                    <OptionBtn qKey="q12" val="20x" />
                    <OptionBtn qKey="q12" val="Fast but Balanced" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 13</div>
                  <div className="q-text">XP Rate:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q13" val="Official (1x)" />
                    <OptionBtn qKey="q13" val="2x" />
                    <OptionBtn qKey="q13" val="3x" />
                    <OptionBtn qKey="q13" val="5x" />
                    <OptionBtn qKey="q13" val="Fast Progression" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 14</div>
                  <div className="q-text">Imprint Settings Preference:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q14" val="Full imprint achievable solo" multi />
                    <OptionBtn qKey="q14" val="Fast maturation" multi />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 15</div>
                  <div className="q-text">Difficulty (Wild Dino Levels):</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q15" val="Official (150)" />
                    <OptionBtn qKey="q15" val="180" />
                    <OptionBtn qKey="q15" val="200+" />
                    <OptionBtn qKey="q15" val="Custom" />
                  </div>
                </div>

                {/* SECTION IV */}
                <div className="section-header">
                  <div className="section-num">SECTION IV</div>
                  <div className="section-line" />
                  <div className="section-title">Quality of Life (QoL)</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 16</div>
                  <div className="q-text">Which QoL features do you prefer?</div>
                  <div className="q-note">Select all that apply</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q16" val="Stack Size (larger stacks)" multi />
                    <OptionBtn qKey="q16" val="Auto Engram Unlock" multi />
                    <OptionBtn qKey="q16" val="Auto Learn Engrams Per Level" multi />
                    <OptionBtn qKey="q16" val="Death Recovery Token" multi />
                    <OptionBtn qKey="q16" val="Cryopods Adjusted" multi />
                    <OptionBtn qKey="q16" val="Custom Drops" multi />
                    <OptionBtn qKey="q16" val="Boosted Weight" multi />
                    <OptionBtn qKey="q16" val="Offline Raid Protection (PvP)" multi pvp />
                    <OptionBtn qKey="q16" val="Structure Pickup Anytime" multi />
                    <OptionBtn qKey="q16" val="Element Transfer Enabled" multi />
                    <OptionBtn qKey="q16" val="Infinite Respecs" multi />
                    <OptionBtn qKey="q16" val="Faster Crop Growth (5x+)" multi />
                    <OptionBtn qKey="q16" val="No Diseases" multi />
                  </div>
                  <textarea className="ark-input" name="q16-open" value={answers['q16-open']} onChange={handleChange} placeholder="What QoL features are mandatory for you?" style={{marginTop: '14px', minHeight: '70px'}} />
                </div>

                {/* SECTION V */}
                <div className="section-header">
                  <div className="section-num">SECTION V</div>
                  <div className="section-line" />
                  <div className="section-title">Mods (ASA Compatible)</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 17</div>
                  <div className="q-text">Do you prefer:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q17" val="Light Modded (5–10 mods)" />
                    <OptionBtn qKey="q17" val="Medium Modded (10–20 mods)" />
                    <OptionBtn qKey="q17" val="Heavily Modded (20+ mods)" />
                    <OptionBtn qKey="q17" val="Vanilla+ (minimal changes)" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 18</div>
                  <div className="q-text">Mod Interest Categories:</div>
                  <div className="q-note">Select all that apply</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q18" val="Building Expansion Mods" multi />
                    <OptionBtn qKey="q18" val="Dino Expansion Mods" multi />
                    <OptionBtn qKey="q18" val="Cosmetic Armor/Skins" multi />
                    <OptionBtn qKey="q18" val="Advanced Tek Mods" multi />
                    <OptionBtn qKey="q18" val="Automation Mods" multi />
                    <OptionBtn qKey="q18" val="Economy/Trading System" multi />
                    <OptionBtn qKey="q18" val="Custom Bosses" multi />
                    <OptionBtn qKey="q18" val="Map Additions" multi />
                  </div>
                  <textarea className="ark-input" name="q18-open" value={answers['q18-open']} onChange={handleChange} placeholder="List specific mods you'd like to see..." style={{marginTop: '14px', minHeight: '70px'}} />
                </div>

                {/* SECTION VI */}
                <div className="section-header">
                  <div className="section-num">SECTION VI</div>
                  <div className="section-line" />
                  <div className="section-title">Economy & Systems</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 19</div>
                  <div className="q-text">Would you participate in:</div>
                  <div className="q-note">Select all that apply</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q19" val="Player-driven economy" multi />
                    <OptionBtn qKey="q19" val="Server currency" multi />
                    <OptionBtn qKey="q19" val="Admin shop" multi />
                    <OptionBtn qKey="q19" val="Black Market events" multi />
                    <OptionBtn qKey="q19" val="Arena tournaments" multi pvp />
                    <OptionBtn qKey="q19" val="Bounty system" multi pvp />
                  </div>
                </div>

                {/* SECTION VII */}
                <div className="section-header">
                  <div className="section-num">SECTION VII</div>
                  <div className="section-line" />
                  <div className="section-title">NAMTAR World Design</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 20</div>
                  <div className="q-text">Would you enjoy:</div>
                  <div className="q-note">Select all that apply</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q20" val="Lore-based world events" multi />
                    <OptionBtn qKey="q20" val="Server-wide invasion events" multi />
                    <OptionBtn qKey="q20" val="Structured factions aligned with NAMTAR lore" multi />
                  </div>
                </div>

                {/* SECTION VIII */}
                <div className="section-header">
                  <div className="section-num">SECTION VIII</div>
                  <div className="section-line" />
                  <div className="section-title">Community Standards</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 21</div>
                  <div className="q-text">Preferred Community Size:</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q21" val="20–30 players" />
                    <OptionBtn qKey="q21" val="50 players" />
                    <OptionBtn qKey="q21" val="100+ players" />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 22</div>
                  <div className="q-text">How strict should rules be?</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q22" val="Competitive but clean" pvp />
                    <OptionBtn qKey="q22" val="Moderate enforcement" />
                    <OptionBtn qKey="q22" val="Hardcore enforcement" />
                  </div>
                </div>

                {/* SECTION IX */}
                <div className="section-header">
                  <div className="section-num">SECTION IX</div>
                  <div className="section-line" />
                  <div className="section-title">Long-Term Vision</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 23</div>
                  <div className="q-text">What keeps you on a server long-term?</div>
                  <textarea className="ark-input" name="q23" value={answers.q23} onChange={handleChange} placeholder="Share your thoughts..." style={{minHeight: '90px'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 24</div>
                  <div className="q-text">What makes you leave a server?</div>
                  <textarea className="ark-input" name="q24" value={answers.q24} onChange={handleChange} placeholder="Be honest — this helps us improve..." style={{minHeight: '90px'}} />
                </div>

                {/* SECTION X */}
                <div className="section-header">
                  <div className="section-num">SECTION X</div>
                  <div className="section-line" />
                  <div className="section-title">Final Calibration</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.3))'}} />
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 25</div>
                  <div className="q-text">Rate your interest in the NAMTAR Ark server (1–10):</div>
                  <div className="range-wrap">
                    <span style={{fontSize: '0.7rem', color: 'rgba(0,229,204,0.5)'}}>1</span>
                    <input 
                      type="range" 
                      className="ark-range" 
                      name="q25" 
                      min="1" 
                      max="10" 
                      value={answers.q25} 
                      onChange={handleChange}
                      style={{ background: `linear-gradient(90deg, var(--ark-teal) ${(answers.q25 - 1) / 9 * 100}%, rgba(0,229,204,0.2) ${(answers.q25 - 1) / 9 * 100}%)` }}
                    />
                    <span style={{fontSize: '0.7rem', color: 'rgba(0,229,204,0.5)'}}>10</span>
                    <div className="range-val">{answers.q25}</div>
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 26</div>
                  <div className="q-text">Would you join at launch?</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q26" val="Yes" />
                    <OptionBtn qKey="q26" val="Maybe" />
                    <OptionBtn qKey="q26" val="No" pvp />
                  </div>
                </div>

                <div className="question-card">
                  <div className="q-label">QUESTION 27</div>
                  <div className="q-text">Anything else you want Ki-Ra Studios to know?</div>
                  <textarea className="ark-input" name="q27" value={answers.q27} onChange={handleChange} placeholder="Final transmission..." style={{minHeight: '90px'}} />
                </div>

                {/* BONUS SECTION */}
                <div className="section-header">
                  <div className="section-num">BONUS</div>
                  <div className="section-line" />
                  <div className="section-title">Elite Application (Optional)</div>
                  <div className="section-line" style={{background: 'linear-gradient(90deg, transparent, rgba(255,107,26,0.3))'}} />
                </div>

                <div className="question-card" style={{borderLeftColor: 'var(--ark-orange)'}}>
                  <div className="q-label" style={{color: 'var(--ark-amber)'}}>BONUS SECTION — OPTIONAL</div>
                  <div className="q-text">If you plan to run elite tribes, check your credentials:</div>
                  <div className="q-note">Select all that apply</div>
                  <div className="options-grid">
                    <OptionBtn qKey="q-bonus" val="Leadership Experience" multi />
                    <OptionBtn qKey="q-bonus" val="Competitive PvP Experience" multi pvp />
                    <OptionBtn qKey="q-bonus" val="Comprehensive PvE Knowledge" multi />
                    <OptionBtn qKey="q-bonus" val="Builder Portfolio" multi />
                    <OptionBtn qKey="q-bonus" val="Content Creator (Twitch/YouTube)" multi />
                  </div>
                </div>

                {/* SUBMIT */}
                <div id="submit-area">
                  <div className="kyrax-closing">
                    Transmission channels standing by. Your answers will be encrypted and delivered directly to the Ki-Ra Studios command relay. Once submitted, your Survivor profile will be logged in the NAMTAR registry. The gates are watching.
                  </div>
                  <button type="button" id="submit-btn" onClick={submitSurvey} disabled={submitting}>
                    {submitting ? '⟳ TRANSMITTING...' : '▶ TRANSMIT TO NAMTAR'}
                  </button>
                  <div className="submit-note">KYRAX // SATCORP SECURE CHANNEL // TRANSMISSION ENCRYPTED</div>
                </div>

              </form>
            </div>
          </>
        ) : (
          <div id="thank-you" style={{display: 'block'}}>
            <div className="ty-header">
              <div className="ty-studio">KI-RA STUDIOS</div>
              <div className="ty-namtar">NAMTAR</div>
              <div className="ty-ark">ARK SURVIVAL ASCENDED</div>
            </div>

            <div className="ty-transmission">
              <h2>Survivor Transmission Received.</h2>
              <p>Thank you for filling out our survey — your input will be a great help to the Ki-Ra Studios team as we calibrate the upcoming <strong>NAMTAR</strong> server experience.</p>
              <p>Your voice directly shapes:</p>
              <div className="ty-shapes">
                <div className="ty-shape">Server Rates</div>
                <div className="ty-shape">Mods & World Systems</div>
                <div className="ty-shape">PvP / PvE Balance</div>
                <div className="ty-shape">Events & Long-Term Progression</div>
              </div>
            </div>

            <div className="ty-reward">
              <h3>⚡ SURVIVOR REWARD CONFIRMED</h3>
              <p>With the completion of this survey, you will receive a complimentary <strong>Starter Kit</strong> after launch. Details will be announced inside the community channels prior to deployment.</p>
            </div>

            <div className="ty-discord-panel">
              <h3>📡 STAY CONNECTED</h3>
              <p style={{color: '#a8c0d8', fontSize: '0.88rem', marginBottom: '12px'}}>To receive launch updates, event announcements, lore drops, and early access information — join the NAMTAR community:</p>
              <ul>
                <li>Launch countdown begins</li>
                <li>Event schedules are posted</li>
                <li>Factions begin forming</li>
                <li>Community votes happen</li>
              </ul>
              <div style={{marginTop: '16px'}}>
                <a href="https://discord.gg/x3eYkTb68X" target="_blank" rel="noreferrer" className="discord-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                  NAMTAR COMMUNITY
                </a>
              </div>
            </div>

            <div className="ty-discord-panel" style={{borderColor: 'rgba(255,107,26,0.3)'}}>
              <h3 style={{color: 'var(--ark-amber)'}}>🌐 EXPAND BEYOND NAMTAR</h3>
              <p style={{color: '#a8c0d8', fontSize: '0.88rem', marginBottom: '12px'}}>For Ki-Ra Studios mods, custom worlds, and ongoing game development projects — join the SATCORP Community:</p>
              <div>
                <a href="https://discord.gg/KqphHMq6vS" target="_blank" rel="noreferrer" className="discord-link" style={{borderColor: 'rgba(255,107,26,0.4)', color: '#ffb060'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                  SATCORP COMMUNITY
                </a>
              </div>
            </div>

            <div className="ty-tagline">
              <div className="divider" />
              <p>The gates to NAMTAR will open soon.</p>
              <p>Prepare.</p>
              <p>Recruit.</p>
              <p>Survive.</p>
              <div className="sig">— KI-RA STUDIOS DEVELOPMENT TEAM</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
