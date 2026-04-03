"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { DiscordButton } from "@/components/shared/DiscordButton";

/* ─── HELPER COMPONENTS ─────────────────────────── */

function KyraxAvatarSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="orbGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#80ffef" stopOpacity="0.9"/>
          <stop offset="60%" stopColor="#00e5cc" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#004d44" stopOpacity="0.3"/>
        </radialGradient>
        <radialGradient id="coreGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#00e5cc" stopOpacity="0.7"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#00e5cc" strokeWidth="0.5" strokeDasharray="8 4" opacity="0.4"/>
      <ellipse cx="50" cy="45" rx="28" ry="32" fill="url(#orbGrad)" opacity="0.85"/>
      <ellipse cx="44" cy="36" rx="10" ry="12" fill="url(#coreGrad)" opacity="0.6"/>
      <ellipse cx="50" cy="42" rx="16" ry="5" fill="#00e5cc" opacity="0.3"/>
      <ellipse cx="50" cy="42" rx="14" ry="3" fill="#002a28" opacity="0.8"/>
      <ellipse cx="50" cy="42" rx="8" ry="2" fill="#00ffee" opacity="0.9"/>
      <ellipse cx="50" cy="42" rx="4" ry="1" fill="white" opacity="0.8"/>
      <path d="M22 45 Q10 35 8 50 Q10 60 22 55Z" fill="#00e5cc" opacity="0.3"/>
      <path d="M78 45 Q90 35 92 50 Q90 60 78 55Z" fill="#00e5cc" opacity="0.3"/>
      <path d="M42 76 Q50 90 58 76" fill="none" stroke="#00e5cc" strokeWidth="1.5" opacity="0.5"/>
      <line x1="30" y1="60" x2="70" y2="60" stroke="#00e5cc" strokeWidth="0.5" opacity="0.3"/>
      <line x1="33" y1="65" x2="67" y2="65" stroke="#00e5cc" strokeWidth="0.5" opacity="0.2"/>
    </svg>
  );
}

const BOOT_LOG_LINES = [
    {text:'> SATCORP MAINFRAME ONLINE', cls:'ok', delay:1000, dur:600, ch:26},
    {text:'> KYRAX v4.2.1 — LOADING AI CORE...', cls:'', delay:2000, dur:700, ch:36},
    {text:'> NAMTAR ENVIRONMENT: LOADED', cls:'ok', delay:3000, dur:600, ch:28},
    {text:'> SURVIVOR DATABASE: INITIALIZING', cls:'', delay:4000, dur:700, ch:33},
    {text:'> SERVER CALIBRATION MODULE: ACTIVE', cls:'ok', delay:5000, dur:750, ch:35},
    {text:'> DISCORD RELAY: STANDBY', cls:'warn', delay:6000, dur:600, ch:24},
    {text:'> KYRAX: Survivor. Your arrival was expected.', cls:'kyrax-line', delay:7000, dur:900, ch:45},
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
        let bootDuration = 8000;
        
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
            const jFar = document.getElementById('jungle-far');
            const jMid = document.getElementById('jungle-mid');
            const f1 = document.getElementById('fog1');
            const f2 = document.getElementById('fog2');
            const trex = document.getElementById('trex');
            
            if (jFar) jFar.style.transform = `translateY(${y*0.05}px)`;
            if (jMid) jMid.style.transform = `translateY(${y*0.08}px)`;
            if (f1) f1.style.transform = `translateY(${y*0.04}px)`;
            if (f2) f2.style.transform = `translateY(${y*0.06}px)`;
            if (trex) trex.style.transform = `translateY(${y*0.07}px)`;

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
        const hook = formData.webhookUrl?.trim();
        if(!hook || !hook.includes('discord.com/api/webhooks/')){
            setSubmitErr('⚠ Please enter your Discord Webhook URL.');
            return;
        }

        setIsSubmitting(true);
        setSubmitErr("");

        const sectionMap: any = {
            'q1':'Survivor Name', 'q2':'Platform', 'q3':'Play Time/Week', 'q4':'Playstyle',
            'q5':'Server Mode', 'q6':'ORP Preference', 'q7':'Wipe Schedule', 'q8':'Map Setup',
            'q8-maps':'Cluster Maps', 'q8-custom-map':'Custom Map Suggestion', 'q9':'Starting Map', 'q9-other':'Starting Map (Other)',
            'q10':'Harvest Rates', 'q10-custom':'Harvest Custom', 'q11':'Taming Speed', 'q12':'Breeding',
            'q13':'XP Rate', 'q14':'Imprint Settings', 'q15':'Dino Difficulty',
            'q16':'QoL Features', 'q16-open':'QoL Mandatory',
            'q17':'Mod Volume', 'q18':'Mod Categories', 'q18-open':'Specific Mods',
            'q19':'Economy Participation', 'q20':'World Events',
            'q21':'Community Size', 'q22':'Rule Strictness',
            'q23':'Stays Long-Term For', 'q24':'Leaves Server For',
            'q25':'Interest Rating (1–10)', 'q26':'Join At Launch?', 'q27':'Additional Comments',
            'q-bonus':'Elite Credentials'
        };

        const fields = Object.entries(sectionMap).map(([key, label]) => {
            let val = formData[key];
            if (Array.isArray(val)) val = val.join(', ');
            return val ? { name: label as string, value: String(val).substring(0, 1024), inline: false } : null;
        }).filter(f => f !== null);

        const chunks = [];
        for (let i = 0; i < fields.length; i += 20) {
            chunks.push(fields.slice(i, i + 20));
        }

        const payloads = chunks.map((ch, idx) => ({
            username: 'KYRAX // SATCORP AI',
            avatar_url: 'https://i.imgur.com/4M34hi2.png',
            embeds: [{
                title: idx === 0 ? `⚡ NAMTAR SURVEY — ${formData.q1 || 'Survivor'}` : `⚡ NAMTAR SURVEY PART ${idx+1}`,
                description: idx === 0 ? `Survivor registration received.\n**Date:** ${new Date().toLocaleString()}` : "Continued...",
                color: 0x00E5CC,
                fields: ch,
                footer: { text: 'Ki-Ra Studios | NAMTAR Calibration' }
            }]
        }));

        let success = true;
        for (const p of payloads) {
            try {
                const res = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) });
                if (!res.ok) success = false;
            } catch (err) { success = false; }
        }

        setIsSubmitting(false);
        if (success) {
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setSubmitErr("Transmission failed. Check your webhook URL.");
        }
    };

    if (isBooting) {
        return (
            <div id="boot-screen">
                <div id="boot-bg"></div>
                <svg id="boot-jungle" viewBox="0 0 1400 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 320 L0 200 Q40 140 80 180 Q120 110 170 165 Q210 90 260 150 Q310 70 360 135 Q400 60 450 125 Q500 45 555 115 Q600 50 655 120 Q700 55 755 122 Q800 65 855 128 Q900 75 950 135 Q1000 90 1050 148 Q1100 105 1155 162 Q1200 125 1255 178 Q1300 148 1360 188 Q1385 172 1400 195 L1400 320 Z" fill="#010c05"/>
                    <path d="M0 320 L0 235 Q50 195 100 220 Q160 180 215 210 Q270 165 325 200 Q380 155 440 192 Q495 150 555 188 Q610 148 670 185 Q725 150 785 186 Q840 155 900 190 Q955 158 1015 192 Q1070 160 1130 194 Q1185 165 1245 198 Q1300 170 1360 200 Q1385 190 1400 205 L1400 320 Z" fill="#000a04"/>
                    <path d="M0 320 L0 275 Q100 255 200 270 Q300 250 400 268 Q500 248 600 266 Q700 248 800 265 Q900 248 1000 264 Q1100 250 1200 265 Q1300 252 1400 265 L1400 320 Z" fill="#000703"/>
                    <g transform="translate(1080, 80)" opacity="0.35">
                        <ellipse cx="80" cy="110" rx="45" ry="30"/>
                        <path d="M105 85 Q118 65 145 62 Q155 60 158 68 Q162 76 153 82 Q143 87 140 97 Q135 107 126 105 Q112 102 105 85Z"/>
                        <path d="M138 64 Q152 58 161 62 Q158 67 144 69Z"/>
                        <circle cx="144" cy="68" r="3" fill="#001006"/>
                        <path d="M100 100 Q105 85 112 90 Q116 105 108 113Z"/>
                    </g>
                </svg>
                <canvas ref={bootRainRef} id="boot-rain"></canvas>
                <div id="boot-content">
                    <div className="boot-satcorp">SATCORP SYSTEMS // KI-RA STUDIOS</div>
                    <KyraxAvatarSVG className="boot-kyrax-svg" />
                    <div className="boot-namtar">NAMTAR</div>
                    <div className="boot-ark-sub">ARK: SURVIVAL ASCENDED // SURVIVOR REGISTRATION</div>
                    <div id="boot-terminal">
                        {bootLogs.map((l, i) => (
                            <div key={i} className={`boot-log-line ${l.cls} type`} style={{ '--dur': `${l.dur}ms`, '--ch': l.ch } as any}>
                                {l.text}
                            </div>
                        ))}
                    </div>
                    <div className="boot-bar-wrap">
                        <div className="boot-bar-label"><span>CALIBRATING SYSTEMS</span><span>{bootPct}%</span></div>
                        <div className="boot-bar-track"><div className="boot-bar-fill" style={{ width: `${bootPct}%` }}></div></div>
                    </div>
                    {bootPct === 100 && <button id="boot-enter" onClick={() => setIsBooting(false)}>▶ ENTER NAMTAR</button>}
                </div>
                <style jsx>{`
                    #boot-screen { position: fixed; inset: 0; z-index: 9999; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center; }
                    #boot-bg { position: absolute; inset: 0; background: linear-gradient(180deg, #000305 0%, #010a06 40%, #021208 70%, #010803 100%); }
                    #boot-content { position: relative; z-index: 20; display: flex; flex-direction: column; align-items: center; max-width: 600px; width: 90%; }
                    .boot-satcorp { font-family: var(--font-mono); font-size: 10px; letter-spacing: 5px; color: rgba(0,229,204,0.5); margin-bottom: 20px; }
                    :global(.boot-kyrax-svg) { width: 100px; height: 100px; margin-bottom: 20px; filter: drop-shadow(0 0 20px #00e5cc); }
                    .boot-namtar { font-family: 'Orbitron', sans-serif; font-size: clamp(3rem, 10vw, 6rem); font-weight: 900; letter-spacing: 12px; background: linear-gradient(135deg, #ff9020 0%, #ff5500 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 30px rgba(255,100,20,0.5)); line-height: 1; margin-bottom: 10px; }
                    .boot-ark-sub { font-family: 'Orbitron', sans-serif; font-size: 10px; letter-spacing: 3px; color: #00e5cc; margin-bottom: 30px; }
                    #boot-terminal { width: 100%; height: 140px; background: rgba(0,8,6,0.9); border: 1px solid rgba(0,229,204,0.2); padding: 15px; font-family: var(--font-mono); font-size: 11px; color: rgba(0,229,204,0.7); overflow-y: hidden; }
                    .boot-log-line { margin-bottom: 5px; white-space: nowrap; overflow: hidden; width: 0; }
                    .boot-log-line.ok { color: #50ff8c; }
                    .boot-log-line.kyrax-line { color: #00e5cc; font-weight: bold; }
                    .type { animation: type var(--dur) steps(var(--ch)) forwards; }
                    @keyframes type { to { width: 100%; } }
                    .boot-bar-wrap { width: 100%; margin-top: 20px; }
                    .boot-bar-label { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; color: #00e5cc; margin-bottom: 5px; }
                    .boot-bar-track { width: 100%; height: 2px; background: rgba(0,229,204,0.1); }
                    .boot-bar-fill { height: 100%; background: #00e5cc; transition: width 0.1s; }
                    #boot-enter { margin-top: 30px; background: transparent; border: 1px solid #00e5cc; color: #00e5cc; font-family: 'Orbitron', sans-serif; font-size: 12px; letter-spacing: 5px; padding: 12px 40px; cursor: pointer; transition: all 0.3s; animation: pulse 2s infinite; }
                    #boot-enter:hover { background: rgba(0,229,204,0.1); box-shadow: 0 0 20px #00e5cc; }
                    @keyframes pulse { 0%,100% { opacity: 0.8; } 50% { opacity: 1; filter: brightness(1.2); } }
                `}</style>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <main className="namtar-ark">
                <style jsx global>{globalStyles}</style>
                <div id="thank-you">
                    <div className="ty-header">
                        <div className="ty-studio">KI-RA STUDIOS</div>
                        <h1 className="ty-namtar">NAMTAR</h1>
                        <div className="ty-ark">ARK SURVIVAL ASCENDED</div>
                    </div>
                    <div className="ty-transmission panel">
                        <h2>Survivor Transmission Received.</h2>
                        <p>Thank you for filling out our survey — your input will be a great help to the Ki-Ra Studios team as we calibrate the upcoming <strong>NAMTAR</strong> server experience.</p>
                        <div className="ty-shapes">
                            <div className="ty-shape">Server Rates</div>
                            <div className="ty-shape">Mods & World Systems</div>
                            <div className="ty-shape">PvP / PvE Balance</div>
                            <div className="ty-shape">Events & Long-Term Progression</div>
                        </div>
                    </div>
                    <div className="ty-reward panel" style={{ borderColor: 'var(--ark-amber)' }}>
                        <h3>⚡ SURVIVOR REWARD CONFIRMED</h3>
                        <p>With the completion of this survey, you will receive a complimentary <strong>Starter Kit</strong> after launch. Details will be announced inside the community channels prior to deployment.</p>
                    </div>
                    <div className="ty-discord-panel panel">
                        <h3>📡 STAY CONNECTED</h3>
                        <p>Join the NAMTAR community for launch updates and loot drops:</p>
                         <div style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                              <DiscordButton href="https://discord.gg/x3eYkTb68X" label="NAMTAR DISCORD" variant="cyan" />
                              <DiscordButton href="https://discord.gg/KqphHMq6vS" label="SATCORP HUD" variant="amber" />
                         </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="namtar-ark">
            <style jsx global>{globalStyles}</style>
            
            <div id="progress-bar"></div>
            <div ref={lightningRef} id="lightning-flash"></div>

            <div id="scene">
                <div id="sky"></div>
                <div id="stars"></div>
                <div id="light-rays"><div className="ray"></div><div className="ray"></div><div className="ray"></div></div>
                <canvas ref={rainCanvasRef} id="rain-canvas"></canvas>
                <div id="jungle-far" className="jungle-layer"></div>
                <div id="fog1" className="fog"></div>
                <div id="jungle-mid" className="jungle-layer"></div>
                <div id="fog2" className="fog"></div>
                <div id="trex">
                    <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="#001508"><ellipse cx="110" cy="140" rx="50" ry="35"/><path d="M130 100 Q145 80 175 75 Q185 72 190 80 Q195 88 185 95 Q175 100 170 110 Q165 120 155 118 Q140 115 130 100Z"/><path d="M165 78 Q180 70 192 75 Q188 80 175 82 Q168 82 165 78Z"/><circle cx="175" cy="82" r="4" fill="#002010"/><path d="M125 115 Q130 100 140 105 Q145 120 135 130 Q127 128 125 115Z"/><path d="M62 145 Q40 155 20 175 Q10 185 15 190 Q22 190 35 178 Q55 162 70 158"/><path d="M140 120 Q150 130 148 142 Q143 145 138 138 Q135 128 140 120Z"/><path d="M90 170 Q88 200 82 220 Q78 230 85 232 Q90 232 92 220 Q96 205 100 180"/><path d="M120 168 Q120 200 116 218 Q113 228 120 230 Q127 228 126 215 Q124 200 125 172"/><path d="M78 228 Q68 240 70 245 Q78 244 85 235"/><path d="M115 226 Q106 238 108 244 Q116 243 124 232"/></svg>
                </div>
                <div id="fog3" className="fog"></div>
                <div id="jungle-near" className="jungle-layer"></div>
            </div>

            <div id="content">
                <header>
                    <div className="studio-badge">KI-RA STUDIOS PRESENTS</div>
                    <div className="namtar-logo">NAMTAR</div>
                    <div className="ark-subtitle">ARK: SURVIVAL ASCENDED</div>
                    <div className="divider"></div>
                    <div className="tag-line">SURVIVOR REGISTRATION & SERVER CALIBRATION SURVEY</div>
                </header>

                <div id="kyrax-panel" className="panel">
                    <div className="kyrax-container">
                        <div className="kyrax-avatar"><KyraxAvatarSVG /></div>
                        <div className="kyrax-text">
                            <div className="kyrax-name">KYRAX</div>
                            <div className="kyrax-role">SATCORP A.I. INTERFACE // SURVEY LEAD</div>
                            <div className="kyrax-msg">
                                Greetings, Survivor. I am <span className="highlight">KYRAX</span>. Before the gates open, <span className="highlight">Ki-Ra Studios</span> needs to understand your ambitions. Your input directly shapes the world design.
                            </div>
                        </div>
                    </div>
                </div>

                <div id="survey-wrap">
                    <div id="webhook-banner" className="panel">
                        <strong>⚙ DISCORD WEBHOOK CONFIGURATION</strong>
                        <p>Paste your Discord webhook URL below to enable survey submission.</p>
                        <input className="ark-input" type="url" name="webhookUrl" placeholder="https://discord.com/api/webhooks/..." onChange={handleInputChange} />
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="section-header">
                            <div className="section-num">SECTION I</div><div className="section-title">Survivor Profile</div><div className="section-line"></div>
                        </div>
                        <div className="question-card panel">
                            <div className="q-label">QUESTION 01</div>
                            <div className="q-text">Survivor Name (Gamertag):</div>
                            <input className="ark-input" type="text" name="q1" placeholder="Enter gamertag..." onChange={handleInputChange} />
                        </div>
                        <div className="question-card panel">
                            <div className="q-label">QUESTION 02</div><div className="q-text">Platform:</div>
                            <div className="options-grid">
                                {['PC (Steam)', 'Xbox', 'PlayStation'].map(v => (
                                    <button key={v} type="button" className={`opt-btn ${formData.q2 === v ? 'selected' : ''}`} onClick={() => handleBtnToggle('q2', v)}>{v}</button>
                                ))}
                            </div>
                        </div>
                         <div className="section-header">
                            <div className="section-num">SECTION II</div><div className="section-title">Playstyle & Rates</div><div className="section-line"></div>
                        </div>
                        <div className="question-card panel">
                             <div className="q-label">QUESTION 04</div><div className="q-text">Playstyle (Multi-select):</div>
                             <div className="options-grid">
                                {['Solo', 'Small Tribe', 'PvE', 'PvP', 'Breeder'].map(v => (
                                    <button key={v} type="button" className={`opt-btn ${formData.q4?.includes(v) ? 'selected' : ''}`} onClick={() => handleBtnToggle('q4', v, true)}>{v}</button>
                                ))}
                             </div>
                        </div>
                        
                        <div className="question-card panel">
                            <div className="q-label">FINAL CALIBRATION</div>
                            <div className="q-text">Rate interest (1-10):</div>
                            <div className="range-wrap">
                                <input type="range" min="1" max="10" name="q25" value={formData.q25} onChange={handleInputChange} className="ark-range" />
                                <div className="range-val">{formData.q25}</div>
                            </div>
                        </div>

                        <div id="submit-area">
                            <div className="kyrax-closing panel">Transmission channels ready. Transmit for calibration.</div>
                            {submitErr && <p style={{ color: 'var(--ark-red)', marginBottom: '10px' }}>{submitErr}</p>}
                            <button type="button" id="submit-btn" disabled={isSubmitting} onClick={handleSubmit}>
                                {isSubmitting ? 'TRANSMITTING...' : '▶ TRANSMIT TO NAMTAR'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

const globalStyles = `
    :root {
        --ark-orange: #ff6b1a;
        --ark-amber: #ffb347;
        --ark-teal: #00e5cc;
        --ark-cyan: #00bcd4;
        --ark-dark: #050a0e;
        --ark-darker: #020507;
        --ark-green: #39ff14;
        --ark-red: #ff2244;
        --panel: rgba(5,20,30,0.88);
        --glass: rgba(0,20,30,0.75);
        --glass-border: rgba(0,229,204,0.25);
    }

    .namtar-ark { background: var(--ark-darker); color: #c8e8f0; font-family: 'Exo 2', sans-serif; min-height: 100vh; position: relative; overflow-x: hidden; }
    #scene { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
    #sky { position: absolute; inset: 0; background: linear-gradient(180deg, #000508 0%, #021018 25%, #041a10 55%, #061c0a 75%, #0a1a06 100%); }
    .jungle-layer { position: absolute; bottom: 0; left: 0; width: 100%; height: 50vh; background-repeat: no-repeat; background-position: bottom; background-size: 100% 100%; }
    #jungle-far { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 400'%3E%3Cpath d='M0 400 L0 280 Q50 200 100 250 Q150 180 200 220 Q250 150 300 200 Q350 130 400 180 Q450 100 500 160 Q550 80 600 140 Q650 60 700 120 Q750 50 800 110 Q850 70 900 130 Q950 90 1000 150 Q1050 110 1100 170 L1400 400 Z' fill='%23021a08'/%3E%3C/svg%3E"); opacity: 0.6; }
    #jungle-mid { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 350'%3E%3Cpath d='M0 350 L0 220 Q30 160 70 200 Q110 140 160 190 Q200 120 250 170 Q300 100 360 155 Q410 80 460 140 Q510 60 570 125 Q620 50 680 115 Q730 70 790 130 Q1400 210 L1400 350 Z' fill='%23031f0a'/%3E%3C/svg%3E"); }
    #jungle-near { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 300'%3E%3Cpath d='M0 300 L0 180 Q20 140 50 170 Q80 120 120 160 Q200 145 Q240 80 290 130 Q330 70 380 115 Q420 55 470 105 Q600 40 650 95 Q1400 170 L1400 300 Z' fill='%23010e05'/%3E%3C/svg%3E"); }
    
    #trex { position: absolute; bottom: 30vh; right: 10%; width: 200px; opacity: 0.2; animation: breathe 5s infinite; }
    @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
    
    .fog { position: absolute; width: 200%; height: 160px; filter: blur(30px); background: radial-gradient(ellipse, rgba(100,200,150,0.1), transparent); }
    #fog1 { bottom: 20vh; animation: drift 20s infinite linear; }
    #fog2 { bottom: 10vh; animation: drift 15s infinite linear reverse; }
    #fog3 { bottom: 5vh; animation: drift 25s infinite linear; }
    @keyframes drift { from { transform: translateX(-10%); } to { transform: translateX(10%); } }
    
    #rain-canvas { position: absolute; inset:0; opacity: 0.3; }
    #lightning-flash { position: fixed; inset: 0; background: rgba(100,200,255,0.1); opacity: 0; z-index: 1; pointer-events: none; transition: opacity 0.1s; }
    
    #content { position: relative; z-index: 10; max-width: 800px; margin: 0 auto; padding: 60px 20px; }
    header { text-align: center; margin-bottom: 50px; }
    .studio-badge { font-family: 'Orbitron', sans-serif; font-size: 10px; color: var(--ark-teal); letter-spacing: 4px; margin-bottom: 5px; opacity: 0.7; }
    .namtar-logo { font-family: 'Orbitron', sans-serif; font-size: 72px; font-weight: 900; background: linear-gradient(to bottom, var(--ark-amber), var(--ark-orange)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 30px #ff6b1a); margin: 0; }
    .ark-subtitle { font-family: 'Orbitron', sans-serif; font-size: 12px; color: var(--ark-teal); letter-spacing: 3px; font-weight: bold; margin-bottom: 20px; }
    .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, var(--ark-teal), transparent); margin: 20px 0; opacity: 0.4; }
    .tag-line { font-family: 'Orbitron', sans-serif; font-size: 11px; color: #fff; letter-spacing: 2px; opacity: 0.6; }

    .panel { background: var(--panel); border: 1px solid var(--glass-border); padding: 25px; border-radius: 4px; backdrop-filter: blur(8px); margin-bottom: 20px; position: relative; }
    .kyrax-container { display: flex; gap: 20px; align-items: start; }
    .kyrax-avatar { width: 80px; height: 80px; filter: drop-shadow(0 0 10px var(--ark-teal)); }
    .kyrax-name { font-family: 'Orbitron', sans-serif; font-size: 12px; color: var(--ark-teal); letter-spacing: 2px; }
    .kyrax-role { font-family: monospace; font-size: 10px; opacity: 0.5; margin-bottom: 10px; }
    .kyrax-msg { line-height: 1.6; font-size: 15px; }
    .highlight { color: var(--ark-teal); font-weight: bold; }

    .section-header { display: flex; align-items: center; gap: 15px; margin: 40px 0 20px; }
    .section-num { font-size: 10px; opacity: 0.6; color: var(--ark-teal); letter-spacing: 2px; font-family: monospace; }
    .section-title { font-family: 'Orbitron', sans-serif; color: var(--ark-amber); font-size: 14px; letter-spacing: 2px; }
    .section-line { flex: 1; height: 1px; background: linear-gradient(90deg, var(--ark-teal), transparent); opacity: 0.3; }

    .question-card { border-left: 3px solid var(--ark-teal); }
    .q-label { font-size: 10px; color: var(--ark-teal); margin-bottom: 10px; opacity: 0.7; font-family: monospace; }
    .q-text { font-size: 16px; margin-bottom: 15px; font-weight: 300; }
    .ark-input { width: 100%; background: #01080b; border: 1px solid rgba(0,229,204,0.2); border-bottom: 2px solid #00e5cc; color: white; padding: 12px; font-family: sans-serif; outline: none; transition: 0.3s; }
    .ark-input:focus { border-color: #ffb347; box-shadow: 0 0 15px rgba(255,179,71,0.2); }

    .options-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
    .opt-btn { background: rgba(0,0,0,0.3); border: 1px solid rgba(0,229,204,0.3); color: #8ec8d5; padding: 10px; cursor: pointer; border-radius: 2px; transition: 0.2s; font-family: sans-serif; font-size: 13px; }
    .opt-btn:hover, .opt-btn.selected { border-color: #00e5cc; color: #00e5cc; background: rgba(0,229,204,0.1); }
    .opt-btn.selected { box-shadow: 0 0 10px #00e5cc; }

    .range-wrap { display: flex; align-items: center; gap: 20px; }
    .ark-range { flex: 1; height: 4px; appearance: none; background: rgba(0,229,204,0.2); }
    .ark-range::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px; background: #00e5cc; border-radius: 50%; cursor: pointer; box-shadow: 0 0 10px #00e5cc; }
    .range-val { font-size: 24px; font-weight: 900; color: #00e5cc; font-family: 'Orbitron', sans-serif; }

    #submit-btn { width: 100%; padding: 20px; background: linear-gradient(135deg, #ff6b1a, #ff4400); border: none; color: white; font-family: 'Orbitron', sans-serif; font-weight: bold; letter-spacing: 5px; cursor: pointer; border-radius: 3px; box-shadow: 0 0 20px rgba(255,107,26,0.3); transition: 0.3s; margin-top: 20px; }
    #submit-btn:hover { transform: translateY(-3px); box-shadow: 0 5px 30px rgba(255,107,26,0.6); }

    .ty-header { text-align: center; margin-bottom: 40px; padding-top: 50px; }
    .ty-studio { font-family: 'Orbitron', sans-serif; font-size: 12px; color: var(--ark-teal); letter-spacing: 5px; opacity: 0.7; }
    .ty-namtar { font-family: 'Orbitron', sans-serif; font-size: 56px; color: #ffb347; margin: 10px 0; }
    .ty-transmission h2 { color: #ffb347; margin-bottom: 20px; font-family: 'Orbitron', sans-serif; }
    .ty-shapes { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
    .ty-shape { background: rgba(0,229,204,0.1); border: 1px solid #00e5cc; padding: 10px 20px; font-size: 12px; font-family: monospace; }

    #progress-bar { position: fixed; top: 0; left: 0; height: 3px; background: #00e5cc; width: 0; z-index: 1000; box-shadow: 0 0 10px #00e5cc; }
    
    .star { position: absolute; border-radius: 50%; background: white; animation: twinkle var(--d) ease-in-out infinite; }
    @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }
`;
