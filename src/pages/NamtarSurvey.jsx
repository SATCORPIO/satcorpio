import React, { useState, useEffect, useRef } from 'react';
import ModuleExitButton from '../components/ModuleExitButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './NamtarSurvey.css';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1475195439254081768/O4YNOHNGYV1Z6UjWDW660ZwGPh2IWcHqeuni2guMHJnLDoDKj62g_kpSV00g5_G7Ypmf';

const BOOT_LINES = [
  { text: '[ SATCORP SYSTEMS INITIALIZE ]', cls: 'white', delay: 0 },
  { text: '-------------------------------------------', cls: 'dim', delay: 200 },
  { text: 'KERNEL BUILD: SC-NAMTAR-7.4.1 ... OK', cls: 'green', delay: 500 },
  { text: 'LOADING CALIBRATION SUBSYSTEM ... OK', cls: 'green', delay: 900 },
  { text: 'MOUNTING SURVIVOR DATABASE ... OK', cls: 'green', delay: 1300 },
  { text: 'INTEGRITY CHECK: PASSED [SHA256 VERIFIED]', cls: 'green', delay: 1700 },
  { text: 'AUTH LAYER: ACTIVE — TIER 3 CLEARANCE REQUIRED', cls: 'yellow', delay: 2100 },
  { text: 'LOADING QUESTION MATRIX ...', cls: 'green', delay: 2600 },
  { text: '  > MODULE 01: IDENTITY CALIBRATION ........', cls: 'dim', delay: 3000 },
  { text: '  > MODULE 02: BEHAVIORAL MAPPING ..........', cls: 'dim', delay: 3300 },
  { text: '  > MODULE 03: THREAT ASSESSMENT ...........', cls: 'dim', delay: 3600 },
  { text: '  > MODULE 04: SURVIVABILITY SCORE .........', cls: 'dim', delay: 3900 },
  { text: '', cls: 'dim', delay: 4200 },
  { text: 'REDIRECTING TO CALIBRATION INTERFACE ...', cls: 'yellow', delay: 4500 },
  { text: '-------------------------------------------', cls: 'dim', delay: 4800 },
];

const BOOT_TOTAL_MS = 5200;

export default function NamtarSurvey() {
  const [bootVisible, setBootVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);


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

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setBootVisible(false), 800);
    }, BOOT_TOTAL_MS);

    return () => clearTimeout(fadeTimer);
  }, []);


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
      <ModuleExitButton />
      <div className="phone-container">
        <div className="phone-screen">

          {bootVisible && (
            <div id="survey-boot-screen" className={`survey-boot${fadeOut ? ' fade-out' : ''}`}>
              <div id="boot-content">
                <div id="boot-terminal">
                  {BOOT_LINES.map((line, i) => (
                    visibleLines.includes(i) && (
                      <div key={i} className={`boot-line ${line.cls}`} style={{ animationDelay: '0ms' }}>
                        {line.text}
                        {i === visibleLines[visibleLines.length - 1] && i < BOOT_LINES.length - 1 && (
                          <span className="boot-cursor" />
                        )}
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}

          <div id="content" className="device-content" style={{ display: bootVisible ? 'none' : 'block' }}>
            {!submitted ? (
              <>
                <header className="survey-page-header">
                  <div className="studio-badge">KI-RA STUDIOS PRESENTS</div>
                  <div className="namtar-logo">NAMTAR</div>
                  <div className="ark-subtitle">ARK: SURVIVAL ASCENDED</div>
                  <div className="divider" theme="phone" />
                  <div className="studio-badge" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#c8e8f0', opacity: 0.6, marginTop: '8px' }}>
                    SURVIVOR REGISTRATION & CALIBRATION
                  </div>
                </header>

                <div id="kyrax-panel">
                  <div className="kyrax-container">
                    <div className="kyrax-text">
                      <div className="kyrax-name">KYRAX</div>
                      <div className="kyrax-msg">
                        Greetings, Survivor. I am <span className="highlight">KYRAX</span>. Complete this calibration carefully. <span className="highlight">Every answer matters.</span>
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
  </div>
</div>
);
}
