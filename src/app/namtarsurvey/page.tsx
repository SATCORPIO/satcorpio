"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";


/* ─── HELPER COMPONENTS ─────────────────────────── */

function KyraxAvatar({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <img src="/wolf.png" alt="KYRAX" className={className} style={style} />
  );
}

const BOOT_LOG_LINES = [
    {text:'> SATCORP MAINFRAME ONLINE', cls:'ok', delay:700, dur:600, ch:26},
    {text:'> KYRAX v4.2.1 — LOADING AI CORE...', cls:'', delay:1400, dur:700, ch:36},
    {text:'> NAMTAR ENVIRONMENT: LOADED', cls:'ok', delay:2200, dur:600, ch:28},
    {text:'> SURVIVOR DATABASE: INITIALIZING', cls:'', delay:2900, dur:700, ch:33},
    {text:'> SERVER CALIBRATION MODULE: ACTIVE', cls:'ok', delay:3600, dur:750, ch:35},
    {text:'> DISCORD RELAY: CONNECTED', cls:'ok', delay:4300, dur:600, ch:26},
    {text:'> [ ALERT ] NAMTAR ASCENSION DETECTED', cls:'warn', delay:5200, dur:800, ch:37},
    {text:'> SYSTEM CALIBRATION: READY', cls:'ok', delay:6200, dur:700, ch:27},
];

/* ─── MAIN COMPONENT ───────────────────────────── */

export default function NamtarSurveyPage() {
    const [isBooting, setIsBooting] = useState(true);
    const [bootPct, setBootPct] = useState(0);
    const [bootLogs, setBootLogs] = useState<any[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<any>({ q25: 7 });
    const [submitErr, setSubmitErr] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const rainCanvasRef = useRef<HTMLCanvasElement>(null);
    const bootRainRef = useRef<HTMLCanvasElement>(null);
    const lightningRef = useRef<HTMLDivElement>(null);

    // Booting Sequence
    useEffect(() => {
        if (!isBooting) return;
        
        let startTime = Date.now();
        let bootDuration = 8400;
        
        const pctInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min(100, Math.floor((elapsed / bootDuration) * 100));
            setBootPct(pct);
            if (pct >= 100) clearInterval(pctInterval);
        }, 50);

        BOOT_LOG_LINES.forEach(l => {
            setTimeout(() => {
                setBootLogs(prev => [...prev, l]);
            }, l.delay);
        });

        // Rain for Boot Screen
        const bc = bootRainRef.current;
        if (bc) {
            const bctx = bc.getContext('2d');
            if (bctx) {
                bc.width = window.innerWidth;
                bc.height = window.innerHeight;
                let bdrops = Array.from({length:150},()=>({
                    x:Math.random()*bc.width, y:Math.random()*bc.height,
                    len:8+Math.random()*18, speed:7+Math.random()*9, op:0.1+Math.random()*0.35
                }));
                let req: number;
                const draw = () => {
                    bctx.clearRect(0,0,bc.width,bc.height);
                    bdrops.forEach(d=>{
                        bctx.beginPath(); bctx.moveTo(d.x,d.y); bctx.lineTo(d.x-d.len*0.1,d.y+d.len);
                        bctx.strokeStyle='rgba(150,220,255,'+d.op+')'; bctx.lineWidth=0.5; bctx.stroke();
                        d.y+=d.speed; d.x-=0.4;
                        if(d.y>bc.height){d.y=-20;d.x=Math.random()*bc.width;}
                    });
                    req = requestAnimationFrame(draw);
                };
                draw();
                return () => cancelAnimationFrame(req);
            }
        }
    }, [isBooting]);

    // Parallax Scene Rain & Stars
    useEffect(() => {
        if (isBooting) return;
        
        const starsEl = document.getElementById('stars');
        if (starsEl && starsEl.children.length === 0) {
            for(let i=0;i<120;i++){
                const s = document.createElement('div');
                s.className = 'star';
                const size = Math.random()*2+0.5;
                s.style.cssText = `
                    width:${size}px;height:${size}px;
                    left:${Math.random()*100}%;
                    top:${Math.random()*60}%;
                    --d:${2+Math.random()*4}s;
                    animation-delay:${Math.random()*5}s;
                    position: absolute; border-radius: 50%; background: white;
                    opacity:${0.1+Math.random()*0.5};
                `;
                starsEl.appendChild(s);
            }
        }

        const canvas = rainCanvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
                resize();
                window.addEventListener('resize', resize);
                
                let drops = Array.from({length:200}, () => ({
                    x: Math.random()*window.innerWidth,
                    y: Math.random()*window.innerHeight,
                    len: 8+Math.random()*20,
                    speed: 8+Math.random()*10,
                    opacity: 0.1+Math.random()*0.4
                }));

                let req: number;
                const drawRain = () => {
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    drops.forEach(d=>{
                        ctx.beginPath();
                        ctx.moveTo(d.x, d.y);
                        ctx.lineTo(d.x - d.len*0.1, d.y + d.len);
                        ctx.strokeStyle = `rgba(150,220,255,${d.opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                        d.y += d.speed;
                        d.x -= 0.5;
                        if(d.y > canvas.height){
                            d.y = -20;
                            d.x = Math.random()*canvas.width;
                        }
                    });
                    req = requestAnimationFrame(drawRain);
                };
                drawRain();
                return () => { cancelAnimationFrame(req); window.removeEventListener('resize', resize); };
            }
        }
    }, [isBooting]);

    // Parallax Scroll logic
    useEffect(() => {
        if (isBooting) return;
        const handleScroll = () => {
            const y = window.scrollY;
            const f1 = document.getElementById('fog1');
            const f2 = document.getElementById('fog2');
            const f3 = document.getElementById('fog3');
            
            if (f1) f1.style.transform = `translateY(${y*0.04}px)`;
            if (f2) f2.style.transform = `translateY(${y*0.06}px)`;
            if (f3) f3.style.transform = `translateY(${y*0.08}px)`;

            const total = document.documentElement.scrollHeight - window.innerHeight;
            const prog = document.getElementById('progress-bar');
            if (prog) prog.style.width = (y/total*100)+'%';
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isBooting]);

    // Lightning Flash
    useEffect(() => {
        if (isBooting) return;
        const doLightning = () => {
            const f = lightningRef.current;
            if (!f) return;
            f.style.opacity = '1';
            setTimeout(() => { f.style.opacity = '0'; }, 80);
            setTimeout(() => { f.style.opacity = '0.7'; }, 120);
            setTimeout(() => { f.style.opacity = '0'; }, 200);
            setTimeout(doLightning, 5000 + Math.random()*20000);
        };
        const timeout = setTimeout(doLightning, 4000);
        return () => clearTimeout(timeout);
    }, [isBooting]);

    const handleBtnToggle = (group: string, val: string, multi = false) => {
        setFormData((prev: any) => {
            const current = prev[group];
            if (!multi) return { ...prev, [group]: val };
            
            const list = Array.isArray(current) ? [...current] : current ? [current] : [];
            if (list.includes(val)) return { ...prev, [group]: list.filter((m: string) => m !== val) };
            return { ...prev, [group]: [...list, val] };
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitErr("");

        const sectionMap1: any = {
            'q1':'Survivor Name','q2':'Platform','q3':'Play Time/Week','q4':'Playstyle',
            'q5':'Server Mode','q6':'ORP Preference','q7':'Wipe Schedule','q8':'Map Setup',
            'q8-maps':'Cluster Maps','q8-custom-map':'Custom Map Suggestion',
            'q9':'Starting Map','q9-other':'Starting Map (Other)',
            'q10':'Harvest Rates','q10-custom':'Harvest Custom','q11':'Taming Speed',
            'q12':'Breeding','q13':'XP Rate','q14':'Imprint Settings','q15':'Dino Difficulty'
        };

        const sectionMap2: any = {
            'q16':'QoL Features','q16-open':'QoL Mandatory',
            'q17':'Mod Volume','q18':'Mod Categories','q18-open':'Specific Mods',
            'q19':'Economy Participation','q20':'World Events',
            'q21':'Community Size','q22':'Rule Strictness',
            'q23':'Stays Long-Term For','q24':'Leaves Server For',
            'q25':'Interest Rating (1–10)','q26':'Join At Launch?',
            'q27':'Additional Comments','q-bonus':'Elite Credentials'
        };

        const buildFields = (map: any) => {
            return Object.entries(map)
                .filter(([key]) => formData[key])
                .map(([key, label]) => {
                    let val = formData[key];
                    if (Array.isArray(val)) val = val.join(', ');
                    return {
                        name: label as string,
                        value: String(val).substring(0, 1024),
                        inline: false
                    };
                });
        };

        const payloads = [
            {
                username: 'KYRAX // SATCORP AI',
                embeds: [{
                    title: `⚡ NAMTAR SURVEY — ${formData.q1 || 'Survivor'} [1/2]`,
                    description: `New survivor registration received.\n**Submitted:** ${new Date().toLocaleString()}`,
                    color: 0x00E5CC,
                    fields: buildFields(sectionMap1),
                    footer: { text: 'Ki-Ra Studios | NAMTAR Calibration - Profile' }
                }]
            },
            {
                username: 'KYRAX // SATCORP AI',
                embeds: [{
                    title: `⚡ NAMTAR SURVEY — ${formData.q1 || 'Survivor'} [2/2]`,
                    color: 0xFF6B1A,
                    fields: buildFields(sectionMap2),
                    footer: { text: 'Ki-Ra Studios | NAMTAR Calibration - Systems' }
                }]
            }
        ];

        try {
            const res = await fetch('/api/namtarsurvey', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(payloads) 
            });
            
            if (res.ok) {
                setIsSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setSubmitErr("Transmission failed. Please try again later.");
            }
        } catch (err) {
            setSubmitErr("Connection error. Please check your uplink.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="namtar-ark">
            <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
            
            <div id="progress-bar"></div>
            <div id="lightning-flash" ref={lightningRef}></div>

            {/* ─── BOOT SCREEN ────────────────────────── */}
            {isBooting && (
                <div style={{
                    position:'fixed', inset:0, background:'url(/namtar_trex_background_1775227097997.png) no-repeat center/cover', zIndex:9999,
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    padding:'20px', fontFamily:'"Share Tech Mono", monospace'
                }}>
                    <canvas ref={bootRainRef} style={{position:'absolute', inset:0}} />
                    
                    <div className="boot-corner boot-corner-tl"></div>
                    <div className="boot-corner boot-corner-tr"></div>
                    <div className="boot-corner boot-corner-bl"></div>
                    <div className="boot-corner boot-corner-br"></div>

                    <div style={{position:'relative', zIndex:10, width:'100%', maxWidth:'600px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <KyraxAvatar className="boot-kyrax-img" style={{width:'80px', height:'80px', marginBottom:'20px'}} />
                        <div style={{fontSize:'3.5rem', fontWeight:900, color:'#ffb347', textAlign:'center', letterSpacing:'0.2em', marginBottom:'10px', filter:'drop-shadow(0 0 20px #ff6b1a)', fontFamily:'Orbitron, sans-serif'}}>NAMTAR</div>
                        <div style={{fontSize:'0.8rem', color:'#00e5cc', textAlign:'center', letterSpacing:'0.4em', marginBottom:'40px', fontFamily:'Orbitron, sans-serif'}}>SYSTEM CALIBRATION INITIALIZED</div>
                        
                        <div style={{background:'rgba(0,255,200,0.05)', border:'1px solid rgba(0,255,200,0.2)', padding:'20px', height:'220px', overflow:'hidden', marginBottom:'20px', borderRadius:'2px'}}>
                            {bootLogs.map((log, i) => (
                                <div key={i} style={{
                                    color: log.cls === 'ok' ? '#39ff14' : log.cls === 'warn' ? '#ffb347' : '#00e5cc',
                                    marginBottom:'6px', fontSize:'0.85rem'
                                }}>{log.text}</div>
                            ))}
                        </div>
                        
                        <div style={{width:'100%', height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'10px', overflow:'hidden'}}>
                            <div style={{width:`${bootPct}%`, height:'100%', background:'linear-gradient(90deg, #00e5cc, #ff6b1a)', boxShadow:'0 0 15px #00e5cc', transition:'width 0.1s linear'}}></div>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between', marginTop:'10px', color:'rgba(0,229,204,0.5)', fontSize:'0.7rem', letterSpacing:'0.1em'}}>
                            <span>UPLINK DENSITY: {(bootPct * 1.2).toFixed(1)} GB/S</span>
                            <span>{bootPct}%</span>
                        </div>
                        
                        {bootPct === 100 && (
                            <button 
                                onClick={() => setIsBooting(false)}
                                style={{
                                    width:'100%', marginTop:'40px', padding:'15px', background:'transparent', 
                                    border:'1px solid #00e5cc', color:'#00e5cc', fontFamily:'inherit',
                                    cursor:'pointer', letterSpacing:'0.3em', fontSize:'0.9rem',
                                    transition:'all 0.3s'
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0,229,204,0.1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,204,0.3)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                [ ACCESS INTERFACE ]
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* ─── PARALLAX SCENE ─────────────────────── */}
            <div id="scene">
                <div id="sky"></div>
                <div id="stars"></div>
                <div id="fog1" className="fog"></div>
                <div id="fog2" className="fog"></div>
                <div id="fog3" className="fog"></div>
                <canvas ref={rainCanvasRef} id="rain-canvas"></canvas>
                <div className="vignette-overlay" style={{position:'absolute', inset:0, background:'radial-gradient(circle, transparent 40%, rgba(0,5,10,0.8) 100%)', pointerEvents:'none'}}></div>
            </div>

            {/* ─── MAIN CONTENT ────────────────────────── */}
            <main id="content">
                {isSubmitted ? (
                    <div id="thank-you">
                        <div className="ty-header">
                            <div className="ty-studio">KI-RA STUDIOS PRESENTS</div>
                            <h1 className="ty-namtar">NAMTAR</h1>
                            <div className="ty-ark">ARK: SURVIVAL ASCENDED</div>
                        </div>
                        <div className="panel ty-transmission">
                            <h2>TRANSMISSION SUCCESSFUL</h2>
                            <p>Survivor, your data has been integrated into the <span className="highlight">NAMTAR Calibration Matrix</span>. We are analyzing your preferences to ensure the ultimate ARK experience.</p>
                            <p>The dawn of a new era is approaching. Stay tuned to the Satcorp transmissions for launch window announcements.</p>
                            
                            <div className="ty-shapes">
                                <div className="ty-shape">⌬ SYNC_COMPLETE</div>
                                <div className="ty-shape">⌬ NODE_ACTIVE</div>
                                <div className="ty-shape">⌬ SIGNAL_STABLE</div>
                            </div>

                            <div className="ty-reward">
                                <h3>REGISTRATION REWARD: [PENDING]</h3>
                                <p style={{fontSize:'0.8rem', opacity:0.7, margin:0}}>As an early registrant, your profile has been flagged for exclusive "First Wave" starting equipment and cosmetic data-packs.</p>
                            </div>

                            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                 <Link href="/" style={{ 
                                     color: 'var(--ark-teal)', 
                                     textDecoration: 'none', 
                                     fontFamily: 'Orbitron, sans-serif',
                                     fontSize: '0.8rem',
                                     letterSpacing: '0.2em'
                                 }}>
                                     [ RETURN TO SATCORP HUB ]
                                 </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <header>
                            <div className="studio-badge">KI-RA STUDIOS PRESENTS</div>
                            <h1 className="namtar-logo">NAMTAR</h1>
                            <div className="ark-subtitle">ARK: SURVIVAL ASCENDED</div>
                            <div className="divider"></div>
                            <div className="tag-line">SERVER CALIBRATION & SURVIVOR REGISTRATION</div>
                        </header>

                        <div className="panel">
                            <div className="kyrax-container">
                                <div className="kyrax-avatar">
                                    <img src="/wolf.png" alt="Kyrax AI" />
                                </div>
                                <div>
                                    <div className="kyrax-name">KYRAX v4.2</div>
                                    <div className="kyrax-role">SYSTEM OVERSEER</div>
                                    <div className="kyrax-msg">
                                        Greetings, Survivor. I am <span className="highlight">KYRAX</span>. To optimize the NAMTAR Ascension protocols, I requires your tactical input. Every response calibrates the final parameters of the server you will call home. <span className="highlight">Respond accurately.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 1: IDENTITY */}
                        <div className="section-header">
                            <div className="section-num">S-01</div>
                            <div className="section-title">Survivor Identity</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 01</div>
                            <div className="q-text">What is your primary handle (Survivor Name)?</div>
                            <input type="text" name="q1" className="ark-input" placeholder="Enter name..." onChange={handleInputChange} />
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 02</div>
                            <div className="q-text">Which platform will you be utilizing for the NAMTAR transmission?</div>
                            <div className="options-grid">
                                {['PC (Steam)', 'PlayStation 5', 'Xbox Series X/S', 'PC (Windows/Gamepass)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q2 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q2', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 2: COMMITMENT */}
                        <div className="section-header">
                            <div className="section-num">S-02</div>
                            <div className="section-title">Temporal Commitment</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 03</div>
                            <div className="q-text">Estimated weekly engagement (Hours)?</div>
                            <div className="options-grid">
                                {['1-10 Hours', '10-30 Hours', '30-60 Hours', '60+ Hours (Hardcore)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q3 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q3', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 3: PLAYSTYLE */}
                        <div className="section-header">
                            <div className="section-num">S-03</div>
                            <div className="section-title">Tactical Doctrine</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 04</div>
                            <div className="q-text">Select your primary gameplay focus:</div>
                            <div className="options-grid">
                                {['Aggressive PVP', 'Competitive Building', 'PVE/Exploration Focus', 'Balanced (PVPVE)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q4 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q4', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 05</div>
                            <div className="q-text">Preferred server mode for this calibration?</div>
                            <div className="options-grid">
                                {['Pure PVP (No Rules)', 'Moderate PVP (Rules Apply)', 'PVE (Zero Combat)', 'Roleplay (RP)'].map(o => (
                                    <button key={o} className={`opt-btn pvp-style ${formData.q5 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q5', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 4: SERVER STRUCTURE */}
                        <div className="section-header">
                            <div className="section-num">S-04</div>
                            <div className="section-title">Environmental Protocols</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 06</div>
                            <div className="q-text">Offline Raid Protection (ORP) preference:</div>
                            <div className="options-grid">
                                {['Strict (Full Protection)', 'Delayed (Small Window)', 'Tactical (Turret/Dino Buffs Only)', 'None (Absolute Chaos)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q6 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q6', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 07</div>
                            <div className="q-text">Wipe frequency preference?</div>
                            <div className="options-grid">
                                {['Never (Permanent Home)', 'Long Cycles (6+ Months)', 'Seasonal (2-3 Months)', 'Fast (Monthly)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q7 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q7', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 08</div>
                            <div className="q-text">Map Architecture preference:</div>
                            <div className="options-grid">
                                {['Cluster (All Ark Maps)', 'Island Only', 'The Center Only', 'Custom/Modded Map Focus'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q8 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q8', o)}>{o}</button>
                                ))}
                            </div>
                            <div className={`conditional ${formData.q8 === 'Cluster (All Ark Maps)' ? 'visible' : ''}`}>
                                <div className="q-note">SELECT PREFERRED MAPS FOR THE CLUSTER:</div>
                                <div className="options-grid">
                                    {['The Island', 'The Center', 'Scorched Earth', 'Aberration', 'Ragnarok', 'Extinction'].map(m => (
                                        <button key={m} className={`opt-btn ${formData['q8-maps']?.includes(m) ? 'selected' : ''}`} onClick={() => handleBtnToggle('q8-maps', m, true)}>{m}</button>
                                    ))}
                                </div>
                            </div>
                            <div className={`conditional ${formData.q8 === 'Custom/Modded Map Focus' ? 'visible' : ''}`}>
                                <input type="text" name="q8-custom-map" className="ark-input" placeholder="Suggest a custom map..." onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 09</div>
                            <div className="q-text">Where should your journey begin?</div>
                            <div className="options-grid">
                                {['The Island', 'Scorched Earth', 'The Center', 'Other'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q9 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q9', o)}>{o}</button>
                                ))}
                            </div>
                            <div className={`conditional ${formData.q9 === 'Other' ? 'visible' : ''}`}>
                                <input type="text" name="q9-other" className="ark-input" placeholder="Specifiy starting location..." onChange={handleInputChange} />
                            </div>
                        </div>

                        {/* SECTION 5: RATES */}
                        <div className="section-header">
                            <div className="section-num">S-05</div>
                            <div className="section-title">Resource & Biological Rates</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 10</div>
                            <div className="q-text">Harvest Yield parameters:</div>
                            <div className="options-grid">
                                {['Classic (1x-2x)', 'Boosted (3x-5x)', 'Heavy (10x+)', 'Custom'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q10 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q10', o)}>{o}</button>
                                ))}
                            </div>
                            <div className={`conditional ${formData.q10 === 'Custom' ? 'visible' : ''}`}>
                                <input type="text" name="q10-custom" className="ark-input" placeholder="Describe preferred harvest settings..." onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 11</div>
                            <div className="q-text">Biological Taming velocity:</div>
                            <div className="options-grid">
                                {['Official (1x)', 'Enhanced (3x-5x)', 'Fast (10x)', 'Instant'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q11 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q11', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 12</div>
                            <div className="q-text">Breeding & Maturation rates:</div>
                            <div className="options-grid">
                                {['Official', 'Competitive Fast', 'Hyper-Speed'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q12 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q12', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 13</div>
                            <div className="q-text">Ascension XP Growth:</div>
                            <div className="options-grid">
                                {['1x Experience', '2.5x Experience', '5x Experience', 'High (10x+)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q13 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q13', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 6: ADVANCED SYSTEMS */}
                        <div className="section-header">
                            <div className="section-num">S-06</div>
                            <div className="section-title">Advanced Mechanics</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 14</div>
                            <div className="q-text">Imprint scaling preference:</div>
                            <div className="options-grid">
                                {['1-Cuddle 100%', 'Official Multi-Cuddle', 'None (Manual Only)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q14 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q14', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 15</div>
                            <div className="q-text">Wild Creature Resistance/Difficulty:</div>
                            <div className="options-grid">
                                {['Standard (Lvl 150)', 'Advanced (Lvl 300)', 'Hardcore (Lvl 600+)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q15 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q15', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 16</div>
                            <div className="q-text">Essential Quality of Life (QoL) features:</div>
                            <div className="options-grid">
                                {['Stacking Mods', 'Better Spyglass', 'Cryopod Enhancements', 'Automated Collection'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q16?.includes(o) ? 'selected' : ''}`} onClick={() => handleBtnToggle('q16', o, true)}>{o}</button>
                                ))}
                            </div>
                            <div style={{marginTop:'12px'}}>
                                <input type="text" name="q16-open" className="ark-input" placeholder="List any other MUST-HAVE QoL features..." onChange={handleInputChange} />
                            </div>
                        </div>

                        {/* SECTION 7: MODIFICATION */}
                        <div className="section-header">
                            <div className="section-num">S-07</div>
                            <div className="section-title">Structural Modifications</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 17</div>
                            <div className="q-text">Preferred Modification volume?</div>
                            <div className="options-grid">
                                {['Vanilla (No Mods)', 'Vanilla+ (Essential Only)', 'Modded (Balanced Additions)', 'Heavy (Transformation)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q17 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q17', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 18</div>
                            <div className="q-text">Primary Mod Categories of interest:</div>
                            <div className="options-grid">
                                {['New Creatures', 'Building Structures', 'New Technology/Armor', 'Visual Enhancements'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q18?.includes(o) ? 'selected' : ''}`} onClick={() => handleBtnToggle('q18', o, true)}>{o}</button>
                                ))}
                            </div>
                            <div style={{marginTop:'12px'}}>
                                <input type="text" name="q18-open" className="ark-input" placeholder="Specific mod suggestions?" onChange={handleInputChange} />
                            </div>
                        </div>

                        {/* SECTION 8: ECONOMY */}
                        <div className="section-header">
                            <div className="section-num">S-08</div>
                            <div className="section-title">Economic Protocols</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 19</div>
                            <div className="q-text">Preferred participation in Server Economy?</div>
                            <div className="options-grid">
                                {['Trading (Player-to-Player)', 'Admin Shop (In-game Currency)', 'None (Barter Only)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q19 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q19', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 20</div>
                            <div className="q-text">World Event preference:</div>
                            <div className="options-grid">
                                {['Dynamic Boss Spawns', 'Dino Racing/Tournaments', 'Raid Events (Admin Bases)', 'Scavenger Hunts'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q20?.includes(o) ? 'selected' : ''}`} onClick={() => handleBtnToggle('q20', o, true)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 9: PHILOSOPHY */}
                        <div className="section-header">
                            <div className="section-num">S-09</div>
                            <div className="section-title">Survivor Philosophy</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 21</div>
                            <div className="q-text">The Ideal Community Size?</div>
                            <div className="options-grid">
                                {['Intimate (20-30 Active)', 'Busy (50-70 Active)', 'Populated (100+ Active)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q21 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q21', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 22</div>
                            <div className="q-text">Rule Enforcement strictness?</div>
                            <div className="options-grid">
                                {['Strict (High Moderation)', 'Fair (Community Policed)', 'Loose (Wild West)'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q22 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q22', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 23</div>
                            <div className="q-text">What factors encourage your long-term engagement?</div>
                            <textarea name="q23" className="ark-input" rows={3} placeholder="Examples: Friendly community, stable updates, active admins..." onChange={handleInputChange}></textarea>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 24</div>
                            <div className="q-text">What factors would cause you to leave?</div>
                            <textarea name="q24" className="ark-input" rows={3} placeholder="Examples: Lag, bad admins, toxicity..." onChange={handleInputChange}></textarea>
                        </div>

                        {/* SECTION 10: RATING */}
                        <div className="section-header">
                            <div className="section-num">S-10</div>
                            <div className="section-title">Final Calibration</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 25</div>
                            <div className="q-text">Interest in the NAMTAR Ascension? (1–10)</div>
                            <div className="range-wrap">
                                <input type="range" name="q25" min="1" max="100" className="ark-range" value={formData.q25 * 10} onChange={(e) => setFormData({...formData, q25: Math.ceil(parseInt(e.target.value)/10)})} />
                                <div className="range-val">{formData.q25}</div>
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 26</div>
                            <div className="q-text">Do you plan to join the NAMTAR transmission at launch?</div>
                            <div className="options-grid">
                                {['YES — AT LAUNCH', 'LATER — POST-ALPHA', 'MAYBE — UNDECIDED'].map(o => (
                                    <button key={o} className={`opt-btn ${formData.q26 === o ? 'selected' : ''}`} onClick={() => handleBtnToggle('q26', o)}>{o}</button>
                                ))}
                            </div>
                        </div>

                        <div className="panel question-card">
                            <div className="q-label">QUESTION 27</div>
                            <div className="q-text">Any additional data for KYRAX?</div>
                            <textarea name="q27" className="ark-input" rows={4} placeholder="Suggestions, concerns, or greetings..." onChange={handleInputChange}></textarea>
                        </div>

                        {/* BONUS SECTION */}
                        <div className="section-header">
                            <div className="section-num">S-X</div>
                            <div className="section-title">Bonus: Elite Application</div>
                            <div className="section-line"></div>
                        </div>

                        <div className="panel" style={{borderStyle:'dashed', borderColor:'var(--ark-amber)'}}>
                            <div className="q-label" style={{color:'var(--ark-amber)'}}>OPTIONAL: THE ASCENDED PATH</div>
                            <div className="q-text">Do you have extensive ARK expertise or relevant technical skills (Admin, Dev, Community Lead)? Mention it here for consideration in the ELITE survivor cohort.</div>
                            <textarea name="q-bonus" className="ark-input" rows={3} placeholder="Detail your credentials..." onChange={handleInputChange}></textarea>
                        </div>

                        {submitErr && <div style={{color:'var(--ark-red)', textAlign:'center', marginBottom:'15px', fontWeight:600}}>{submitErr}</div>}

                        <button id="submit-btn" disabled={isSubmitting} onClick={handleSubmit}>
                            {isSubmitting ? 'TRANSMITTING...' : '[ SUBMIT SURVEY ]'}
                        </button>

                        <footer style={{marginTop:'40px', opacity:0.4, textAlign:'center', fontSize:'0.7rem', letterSpacing:'0.2em'}}>
                            © {new Date().getFullYear()} SATCORP.IO | NAMTAR ASCENSION PROTOCOLS
                        </footer>
                    </>
                )}
            </main>
        </div>
    );
}

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@100;300;400;600;700;900&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

  :root {
    --ark-orange: #ff6b1a;
    --ark-amber: #ffb347;
    --ark-teal: #00e5cc;
    --ark-cyan: #00bcd4;
    --ark-dark: #050a0e;
    --ark-darker: #020507;
    --ark-green: #39ff14;
    --ark-red: #ff2244;
    --glass: rgba(0,20,30,0.75);
    --glass-border: rgba(0,229,204,0.25);
    --panel: rgba(5,20,30,0.88);
  }

  *, *::before, *::after { box-sizing: border-box; }

  .namtar-ark {
    background: var(--ark-darker);
    color: #c8e8f0;
    font-family: 'Exo 2', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ─── SCENE LAYERS ─────────────────────────────── */
  #scene {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }

  #sky {
    position: absolute;
    inset: 0;
    background: url(/namtar_trex_background_1775226748846.png) no-repeat center/cover;
  }

  .jungle-layer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    pointer-events: none;
  }

  #jungle-far {
    height: 55vh;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 400' preserveAspectRatio='none'%3E%3Cpath d='M0 400 L0 280 Q50 200 100 250 Q150 180 200 220 Q250 150 300 200 Q350 130 400 180 Q450 100 500 160 Q550 80 600 140 Q650 60 700 120 Q750 50 800 110 Q850 70 900 130 Q950 90 1000 150 Q1050 110 1100 170 Q1150 130 1200 190 Q1250 150 1300 200 Q1350 170 1400 220 L1400 400 Z' fill='%23021a08' opacity='0.9'/%3E%3C/svg%3E") no-repeat bottom;
    background-size: 100% 100%;
    opacity: 0.7;
    transition: transform 0.1s;
  }

  #jungle-mid {
    height: 50vh;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 350' preserveAspectRatio='none'%3E%3Cpath d='M0 350 L0 220 Q30 160 70 200 Q110 140 160 190 Q200 120 250 170 Q300 100 360 155 Q410 80 460 140 Q510 60 570 125 Q620 50 680 115 Q730 70 790 130 Q840 90 900 145 Q950 110 1010 165 Q1060 120 1120 175 Q1170 140 1230 195 Q1280 160 1350 200 Q1380 185 1400 210 L1400 350 Z' fill='%23031f0a' opacity='0.95'/%3E%3C/svg%3E") no-repeat bottom;
    background-size: 100% 100%;
    opacity: 0.9;
  }

  #jungle-near {
    height: 38vh;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 300' preserveAspectRatio='none'%3E%3Cpath d='M0 300 L0 180 Q20 140 50 170 Q80 120 120 160 Q150 100 200 145 Q240 80 290 130 Q330 70 380 115 Q420 55 470 105 Q510 45 560 98 Q600 40 650 95 Q690 50 740 100 Q780 60 830 110 Q870 70 920 115 Q960 80 1010 125 Q1050 90 1100 135 Q1140 100 1190 145 Q1230 110 1280 155 Q1320 125 1360 165 Q1385 150 1400 170 L1400 300 Z' fill='%23010e05'/%3E%3C/svg%3E") no-repeat bottom;
    background-size: 100% 100%;
  }

  #trex {
    position: absolute;
    bottom: 28vh;
    right: 8%;
    width: 220px;
    height: 280px;
    opacity: 0.18;
    filter: blur(2px);
    animation: trex-breathe 5s ease-in-out infinite;
  }
  @keyframes trex-breathe {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(1.015); }
  }

  .fog {
    position: absolute;
    width: 200%;
    height: 160px;
    pointer-events: none;
    border-radius: 50%;
  }
  #fog1 {
    bottom: 22vh;
    left: -50%;
    background: radial-gradient(ellipse at center, rgba(100,200,150,0.08) 0%, transparent 70%);
    animation: fog-drift 18s ease-in-out infinite alternate;
    filter: blur(15px);
  }
  #fog2 {
    bottom: 15vh;
    left: -20%;
    height: 200px;
    background: radial-gradient(ellipse at center, rgba(50,180,130,0.12) 0%, transparent 65%);
    animation: fog-drift 25s ease-in-out infinite alternate-reverse;
    filter: blur(20px);
  }
  #fog3 {
    bottom: 5vh;
    left: -30%;
    height: 250px;
    background: radial-gradient(ellipse at center, rgba(20,80,60,0.15) 0%, transparent 70%);
    animation: fog-drift 32s ease-in-out infinite alternate;
    filter: blur(25px);
  }
  @keyframes fog-drift {
    0% { transform: translateX(0) scaleX(1); }
    100% { transform: translateX(15%) scaleX(1.1); }
  }

  #light-rays {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    overflow: hidden;
  }
  .ray {
    position: absolute;
    top: -10%;
    width: 2px;
    height: 80%;
    background: linear-gradient(180deg, rgba(255,180,50,0.12) 0%, rgba(100,255,150,0.05) 60%, transparent 100%);
    transform-origin: top center;
    filter: blur(3px);
  }
  .ray:nth-child(1) { left: 15%; transform: rotate(-15deg) scaleX(30); opacity: 0.6; animation: ray-pulse 8s ease-in-out infinite; }
  .ray:nth-child(2) { left: 35%; transform: rotate(-5deg) scaleX(20); opacity: 0.4; animation: ray-pulse 11s ease-in-out 2s infinite; }
  .ray:nth-child(3) { left: 55%; transform: rotate(8deg) scaleX(25); opacity: 0.5; animation: ray-pulse 9s ease-in-out 1s infinite; }

  @keyframes ray-pulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }

  /* ─── MAIN CONTENT ─────────────────────────────── */
  #content {
    position: relative;
    z-index: 10;
    min-height: 100vh;
    padding: 60px 20px 80px;
    max-width: 900px;
    margin: 0 auto;
  }

  header {
    text-align: center;
    padding: 60px 20px 40px;
  }

  .studio-badge {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.5em;
    color: var(--ark-teal);
    opacity: 0.7;
    margin-bottom: 6px;
    text-transform: uppercase;
  }

  .namtar-logo {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2.5rem, 8vw, 5.5rem);
    font-weight: 900;
    letter-spacing: 0.2em;
    background: linear-gradient(135deg, var(--ark-amber) 0%, var(--ark-orange) 40%, #ff4400 70%, var(--ark-amber) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 30px rgba(255,107,26,0.5));
    line-height: 1;
    margin-bottom: 4px;
  }

  .ark-subtitle {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(0.6rem, 1.5vw, 0.85rem);
    letter-spacing: 0.35em;
    color: var(--ark-teal);
    margin-bottom: 30px;
    opacity: 0.85;
  }

  .divider {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--ark-teal), var(--ark-orange), var(--ark-teal), transparent);
    opacity: 0.5;
  }

  .tag-line {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    color: #c8e8f0;
    opacity: 0.6;
    margin-top: 8px;
    text-align: center;
  }

  /* ─── KYRAX PANEL ─────────────────────────────── */
  .panel {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 4px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    margin-bottom: 24px;
  }

  .kyrax-container {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }

  .kyrax-avatar {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    position: relative;
  }
  :global(.kyrax-avatar img) {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 12px rgba(0,229,204,0.6));
    animation: hlna-float 4s ease-in-out infinite;
  }
  @keyframes hlna-float {
    0%,100% { transform: translateY(0) rotate(0deg); }
    33% { transform: translateY(-4px) rotate(1deg); }
    66% { transform: translateY(2px) rotate(-1deg); }
  }

  .kyrax-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    color: var(--ark-teal);
    margin-bottom: 2px;
  }
  .kyrax-role {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: rgba(0,229,204,0.5);
    margin-bottom: 12px;
    letter-spacing: 0.1em;
  }
  .kyrax-msg {
    font-size: 0.88rem;
    line-height: 1.7;
    color: #a8d8e0;
  }
  .highlight { color: var(--ark-amber); font-weight: 600; }

  /* ─── SURVEY ─────────────────────────────────── */
  .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 50px 0 28px;
  }
  .section-num {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.6rem;
    color: var(--ark-teal);
    letter-spacing: 0.2em;
    opacity: 0.7;
  }
  .section-line { flex: 1; height: 1px; background: linear-gradient(90deg, var(--ark-teal), transparent); opacity: 0.3; }
  .section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(0.7rem, 1.5vw, 0.85rem);
    letter-spacing: 0.25em;
    color: var(--ark-amber);
    text-transform: uppercase;
  }

  .question-card {
    border-left: 3px solid var(--ark-teal);
  }
  .q-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.6rem;
    color: var(--ark-teal);
    letter-spacing: 0.2em;
    margin-bottom: 8px;
    opacity: 0.6;
  }
  .q-text {
    font-size: 0.95rem;
    font-weight: 400;
    color: #d8eef5;
    margin-bottom: 16px;
    line-height: 1.5;
  }
  .q-note {
    font-size: 0.72rem;
    color: rgba(0,229,204,0.5);
    font-style: italic;
    margin-bottom: 14px;
    font-family: var(--font-mono);
  }

  .options-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .opt-btn {
    background: rgba(0,20,30,0.6);
    border: 1px solid rgba(0,229,204,0.2);
    color: #8ec8d5;
    padding: 8px 16px;
    font-family: 'Exo 2', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s;
    letter-spacing: 0.05em;
  }
  .opt-btn:hover { border-color: var(--ark-teal); color: var(--ark-teal); }
  .opt-btn.selected {
    background: rgba(0,229,204,0.12);
    border-color: var(--ark-teal);
    color: var(--ark-teal);
    box-shadow: 0 0 12px rgba(0,229,204,0.2);
  }

  .opt-btn.pvp-style { border-color: rgba(255,34,68,0.25); color: #d08090; }
  .opt-btn.pvp-style:hover, .opt-btn.pvp-style.selected {
    border-color: var(--ark-red);
    color: var(--ark-red);
    background: rgba(255,34,68,0.1);
    box-shadow: 0 0 12px rgba(255,34,68,0.2);
  }

  .ark-input {
    width: 100%;
    background: rgba(0,10,18,0.8);
    border: 1px solid rgba(0,229,204,0.2);
    border-bottom: 2px solid rgba(0,229,204,0.4);
    color: #c8e8f0;
    padding: 10px 14px;
    font-family: 'Exo 2', sans-serif;
    font-size: 0.88rem;
    border-radius: 2px;
    transition: all 0.2s;
    outline: none;
  }
  .ark-input:focus {
    border-color: var(--ark-teal);
    box-shadow: 0 0 15px rgba(0,229,204,0.12);
  }

  .range-wrap { display: flex; align-items: center; gap: 14px; margin-top: 10px; }
  .ark-range {
    flex: 1;
    -webkit-appearance: none;
    height: 4px;
    background: rgba(0,229,204,0.2);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  .ark-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px; height: 18px;
    background: var(--ark-teal);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,229,204,0.6);
  }
  .range-val {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.4rem;
    color: var(--ark-teal);
    min-width: 40px;
    text-align: center;
    font-weight: 900;
  }

  .conditional { display: none; margin-top: 14px; }
  .conditional.visible { display: block; }

  #submit-btn {
    background: linear-gradient(135deg, #ff6b1a 0%, #ff4400 50%, #cc2200 100%);
    border: none;
    color: white;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.3em;
    padding: 18px 60px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s;
    box-shadow: 0 0 30px rgba(255,107,26,0.4);
    width: 100%;
    margin-top: 20px;
  }
  #submit-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 40px rgba(255,107,26,0.6); }

  /* ─── THANK YOU ──────────────────────────── */
  #thank-you {
    width: 100%;
    max-width: 820px;
    margin: 0 auto;
    padding: 60px 0;
  }
  .ty-header { text-align: center; margin-bottom: 40px; }
  .ty-studio { font-family: 'Orbitron', sans-serif; font-size: 0.65rem; letter-spacing: 0.5em; color: var(--ark-teal); margin-bottom: 10px; opacity: 0.7; }
  .ty-namtar { font-family: 'Orbitron', sans-serif; font-size: clamp(2rem, 6vw, 4rem); font-weight: 900; background: linear-gradient(135deg, var(--ark-amber), var(--ark-orange)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 30px rgba(255,107,26,0.5)); }
  .ty-ark { font-family: 'Orbitron', sans-serif; font-size: 0.8rem; letter-spacing: 0.25em; color: var(--ark-teal); margin: 8px 0; }
  
  .ty-transmission { border-top: 3px solid var(--ark-teal); position: relative; }
  .ty-transmission::before { content: 'TRANSMISSION RECEIVED'; position: absolute; top: -10px; left: 24px; background: var(--ark-darker); padding: 0 10px; font-family: 'Orbitron', sans-serif; font-size: 0.55rem; letter-spacing: 0.3em; color: var(--ark-teal); }
  .ty-transmission h2 { font-family: 'Orbitron', sans-serif; font-size: clamp(1rem, 3vw, 1.6rem); color: var(--ark-amber); margin-bottom: 16px; letter-spacing: 0.1em; }
  .ty-transmission p { line-height: 1.8; color: #a8d8e0; font-size: 0.9rem; margin-bottom: 16px; }

  .ty-shapes { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; margin: 20px 0; }
  .ty-shape { background: rgba(0,229,204,0.08); border: 1px solid rgba(0,229,204,0.2); border-radius: 2px; padding: 12px 16px; font-size: 0.8rem; color: var(--ark-teal); display: flex; align-items: center; gap: 8px; }

  .ty-reward { background: linear-gradient(135deg, rgba(255,179,71,0.08) 0%, rgba(255,107,26,0.05) 100%); border: 1px solid rgba(255,179,71,0.3); padding: 24px; border-radius: 4px; }
  .ty-reward h3 { font-family: 'Orbitron', sans-serif; font-size: 0.75rem; letter-spacing: 0.3em; color: var(--ark-amber); margin-bottom: 12px; }

  /* ─── PROGRESS BAR ──────────────────────────── */
  #progress-bar { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--ark-teal), var(--ark-orange)); width: 0%; z-index: 100; transition: width 0.4s ease; box-shadow: 0 0 10px rgba(0,229,204,0.6); }
  #lightning-flash { position: fixed; inset: 0; background: rgba(100,200,255,0.08); pointer-events: none; opacity: 0; z-index: 1; transition: opacity 0.1s; }

  /* ─── BOOT SCREEN CORNERS ──────────────────── */
  .boot-corner {
    position: absolute; width: 50px; height: 50px; z-index: 25;
  }
  .boot-corner-tl { top: 16px; left: 16px; border-top: 2px solid rgba(0,229,204,0.5); border-left: 2px solid rgba(0,229,204,0.5); }
  .boot-corner-tr { top: 16px; right: 16px; border-top: 2px solid rgba(0,229,204,0.5); border-right: 2px solid rgba(0,229,204,0.5); }
  .boot-corner-bl { bottom: 16px; left: 16px; border-bottom: 2px solid rgba(0,229,204,0.5); border-left: 2px solid rgba(0,229,204,0.5); }
  .boot-corner-br { bottom: 16px; right: 16px; border-bottom: 2px solid rgba(0,229,204,0.5); border-right: 2px solid rgba(0,229,204,0.5); }

  @media(max-width:600px) {
    .kyrax-container { flex-direction: column; }
    .kyrax-avatar { width: 60px; height: 60px; }
    .options-grid { gap: 6px; }
  }
`;

