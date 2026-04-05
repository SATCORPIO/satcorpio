module.exports=[7104,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(38246);function e({className:a,style:c}){return(0,b.jsx)("img",{src:"/wolf.png",alt:"KYRAX",className:a,style:c})}let f=[{text:"> SATCORP MAINFRAME ONLINE",cls:"ok",delay:700,dur:600,ch:26},{text:"> KYRAX v4.2.1 — LOADING AI CORE...",cls:"",delay:1400,dur:700,ch:36},{text:"> NAMTAR ENVIRONMENT: LOADED",cls:"ok",delay:2200,dur:600,ch:28},{text:"> SURVIVOR DATABASE: INITIALIZING",cls:"",delay:2900,dur:700,ch:33},{text:"> SERVER CALIBRATION MODULE: ACTIVE",cls:"ok",delay:3600,dur:750,ch:35},{text:"> DISCORD RELAY: CONNECTED",cls:"ok",delay:4300,dur:600,ch:26},{text:"> [ ALERT ] NAMTAR ASCENSION DETECTED",cls:"warn",delay:5200,dur:800,ch:37},{text:"> SYSTEM CALIBRATION: READY",cls:"ok",delay:6200,dur:700,ch:27}],g=`
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
`;a.s(["default",0,function(){let[a,h]=(0,c.useState)(!0),[i,j]=(0,c.useState)(0),[k,l]=(0,c.useState)([]),[m,n]=(0,c.useState)(!1),[o,p]=(0,c.useState)({q25:7}),[q,r]=(0,c.useState)(""),[s,t]=(0,c.useState)(!1),u=(0,c.useRef)(null),v=(0,c.useRef)(null),w=(0,c.useRef)(null);(0,c.useEffect)(()=>{if(!a)return;let b=Date.now(),c=setInterval(()=>{let a=Math.min(100,Math.floor((Date.now()-b)/8400*100));j(a),a>=100&&clearInterval(c)},50);f.forEach(a=>{setTimeout(()=>{l(b=>[...b,a])},a.delay)});let d=v.current;if(d){let a=d.getContext("2d");if(a){let b;d.width=window.innerWidth,d.height=window.innerHeight;let c=Array.from({length:150},()=>({x:Math.random()*d.width,y:Math.random()*d.height,len:8+18*Math.random(),speed:7+9*Math.random(),op:.1+.35*Math.random()})),e=()=>{a.clearRect(0,0,d.width,d.height),c.forEach(b=>{a.beginPath(),a.moveTo(b.x,b.y),a.lineTo(b.x-.1*b.len,b.y+b.len),a.strokeStyle="rgba(150,220,255,"+b.op+")",a.lineWidth=.5,a.stroke(),b.y+=b.speed,b.x-=.4,b.y>d.height&&(b.y=-20,b.x=Math.random()*d.width)}),b=requestAnimationFrame(e)};return e(),()=>cancelAnimationFrame(b)}}},[a]),(0,c.useEffect)(()=>{if(a)return;let b=document.getElementById("stars");if(b&&0===b.children.length)for(let a=0;a<120;a++){let a=document.createElement("div");a.className="star";let c=2*Math.random()+.5;a.style.cssText=`
                    width:${c}px;height:${c}px;
                    left:${100*Math.random()}%;
                    top:${60*Math.random()}%;
                    --d:${2+4*Math.random()}s;
                    animation-delay:${5*Math.random()}s;
                    position: absolute; border-radius: 50%; background: white;
                    opacity:${.1+.5*Math.random()};
                `,b.appendChild(a)}let c=u.current;if(c){let a=c.getContext("2d");if(a){let b,d=()=>{c.width=window.innerWidth,c.height=window.innerHeight};d(),window.addEventListener("resize",d);let e=Array.from({length:200},()=>({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,len:8+20*Math.random(),speed:8+10*Math.random(),opacity:.1+.4*Math.random()})),f=()=>{a.clearRect(0,0,c.width,c.height),e.forEach(b=>{a.beginPath(),a.moveTo(b.x,b.y),a.lineTo(b.x-.1*b.len,b.y+b.len),a.strokeStyle=`rgba(150,220,255,${b.opacity})`,a.lineWidth=.5,a.stroke(),b.y+=b.speed,b.x-=.5,b.y>c.height&&(b.y=-20,b.x=Math.random()*c.width)}),b=requestAnimationFrame(f)};return f(),()=>{cancelAnimationFrame(b),window.removeEventListener("resize",d)}}}},[a]),(0,c.useEffect)(()=>{if(a)return;let b=()=>{let a=window.scrollY,b=document.getElementById("fog1"),c=document.getElementById("fog2"),d=document.getElementById("fog3");b&&(b.style.transform=`translateY(${.04*a}px)`),c&&(c.style.transform=`translateY(${.06*a}px)`),d&&(d.style.transform=`translateY(${.08*a}px)`);let e=document.documentElement.scrollHeight-window.innerHeight,f=document.getElementById("progress-bar");f&&(f.style.width=a/e*100+"%")};return window.addEventListener("scroll",b),()=>window.removeEventListener("scroll",b)},[a]),(0,c.useEffect)(()=>{if(a)return;let b=()=>{let a=w.current;a&&(a.style.opacity="1",setTimeout(()=>{a.style.opacity="0"},80),setTimeout(()=>{a.style.opacity="0.7"},120),setTimeout(()=>{a.style.opacity="0"},200),setTimeout(b,5e3+2e4*Math.random()))},c=setTimeout(b,4e3);return()=>clearTimeout(c)},[a]);let x=(a,b,c=!1)=>{p(d=>{let e=d[a];if(!c)return{...d,[a]:b};let f=Array.isArray(e)?[...e]:e?[e]:[];return f.includes(b)?{...d,[a]:f.filter(a=>a!==b)}:{...d,[a]:[...f,b]}})},y=a=>{let{name:b,value:c}=a.target;p(a=>({...a,[b]:c}))},z=async()=>{t(!0),r("");let a=a=>Object.entries(a).filter(([a])=>o[a]).map(([a,b])=>{let c=o[a];return Array.isArray(c)&&(c=c.join(", ")),{name:b,value:String(c).substring(0,1024),inline:!1}}),b=[{username:"KYRAX // SATCORP AI",embeds:[{title:`⚡ NAMTAR SURVEY — ${o.q1||"Survivor"} [1/2]`,description:`New survivor registration received.
**Submitted:** ${new Date().toLocaleString()}`,color:58828,fields:a({q1:"Survivor Name",q2:"Platform",q3:"Play Time/Week",q4:"Playstyle",q5:"Server Mode",q6:"ORP Preference",q7:"Wipe Schedule",q8:"Map Setup","q8-maps":"Cluster Maps","q8-custom-map":"Custom Map Suggestion",q9:"Starting Map","q9-other":"Starting Map (Other)",q10:"Harvest Rates","q10-custom":"Harvest Custom",q11:"Taming Speed",q12:"Breeding",q13:"XP Rate",q14:"Imprint Settings",q15:"Dino Difficulty"}),footer:{text:"Ki-Ra Studios | NAMTAR Calibration - Profile"}}]},{username:"KYRAX // SATCORP AI",embeds:[{title:`⚡ NAMTAR SURVEY — ${o.q1||"Survivor"} [2/2]`,color:0xff6b1a,fields:a({q16:"QoL Features","q16-open":"QoL Mandatory",q17:"Mod Volume",q18:"Mod Categories","q18-open":"Specific Mods",q19:"Economy Participation",q20:"World Events",q21:"Community Size",q22:"Rule Strictness",q23:"Stays Long-Term For",q24:"Leaves Server For",q25:"Interest Rating (1–10)",q26:"Join At Launch?",q27:"Additional Comments","q-bonus":"Elite Credentials"}),footer:{text:"Ki-Ra Studios | NAMTAR Calibration - Systems"}}]}];try{(await fetch("/api/namtarsurvey",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)})).ok?(n(!0),window.scrollTo({top:0,behavior:"smooth"})):r("Transmission failed. Please try again later.")}catch(a){r("Connection error. Please check your uplink.")}finally{t(!1)}};return(0,b.jsxs)("div",{className:"namtar-ark",children:[(0,b.jsx)("style",{dangerouslySetInnerHTML:{__html:g}}),(0,b.jsx)("div",{id:"progress-bar"}),(0,b.jsx)("div",{id:"lightning-flash",ref:w}),a&&(0,b.jsxs)("div",{style:{position:"fixed",inset:0,background:"url(/namtar_trex_background_1775227097997.png) no-repeat center/cover",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px",fontFamily:'"Share Tech Mono", monospace'},children:[(0,b.jsx)("canvas",{ref:v,style:{position:"absolute",inset:0}}),(0,b.jsx)("div",{className:"boot-corner boot-corner-tl"}),(0,b.jsx)("div",{className:"boot-corner boot-corner-tr"}),(0,b.jsx)("div",{className:"boot-corner boot-corner-bl"}),(0,b.jsx)("div",{className:"boot-corner boot-corner-br"}),(0,b.jsxs)("div",{style:{position:"relative",zIndex:10,width:"100%",maxWidth:"600px",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,b.jsx)(e,{className:"boot-kyrax-img",style:{width:"80px",height:"80px",marginBottom:"20px"}}),(0,b.jsx)("div",{style:{fontSize:"3.5rem",fontWeight:900,color:"#ffb347",textAlign:"center",letterSpacing:"0.2em",marginBottom:"10px",filter:"drop-shadow(0 0 20px #ff6b1a)",fontFamily:"Orbitron, sans-serif"},children:"NAMTAR"}),(0,b.jsx)("div",{style:{fontSize:"0.8rem",color:"#00e5cc",textAlign:"center",letterSpacing:"0.4em",marginBottom:"40px",fontFamily:"Orbitron, sans-serif"},children:"SYSTEM CALIBRATION INITIALIZED"}),(0,b.jsx)("div",{style:{background:"rgba(0,255,200,0.05)",border:"1px solid rgba(0,255,200,0.2)",padding:"20px",height:"220px",overflow:"hidden",marginBottom:"20px",borderRadius:"2px"},children:k.map((a,c)=>(0,b.jsx)("div",{style:{color:"ok"===a.cls?"#39ff14":"warn"===a.cls?"#ffb347":"#00e5cc",marginBottom:"6px",fontSize:"0.85rem"},children:a.text},c))}),(0,b.jsx)("div",{style:{width:"100%",height:"4px",background:"rgba(255,255,255,0.05)",borderRadius:"10px",overflow:"hidden"},children:(0,b.jsx)("div",{style:{width:`${i}%`,height:"100%",background:"linear-gradient(90deg, #00e5cc, #ff6b1a)",boxShadow:"0 0 15px #00e5cc",transition:"width 0.1s linear"}})}),(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px",color:"rgba(0,229,204,0.5)",fontSize:"0.7rem",letterSpacing:"0.1em"},children:[(0,b.jsxs)("span",{children:["UPLINK DENSITY: ",(1.2*i).toFixed(1)," GB/S"]}),(0,b.jsxs)("span",{children:[i,"%"]})]}),100===i&&(0,b.jsx)("button",{onClick:()=>h(!1),style:{width:"100%",marginTop:"40px",padding:"15px",background:"transparent",border:"1px solid #00e5cc",color:"#00e5cc",fontFamily:"inherit",cursor:"pointer",letterSpacing:"0.3em",fontSize:"0.9rem",transition:"all 0.3s"},onMouseOver:a=>{a.currentTarget.style.background="rgba(0,229,204,0.1)",a.currentTarget.style.boxShadow="0 0 20px rgba(0,229,204,0.3)"},onMouseOut:a=>{a.currentTarget.style.background="transparent",a.currentTarget.style.boxShadow="none"},children:"[ ACCESS INTERFACE ]"})]})]}),(0,b.jsxs)("div",{id:"scene",children:[(0,b.jsx)("div",{id:"sky"}),(0,b.jsx)("div",{id:"stars"}),(0,b.jsx)("div",{id:"fog1",className:"fog"}),(0,b.jsx)("div",{id:"fog2",className:"fog"}),(0,b.jsx)("div",{id:"fog3",className:"fog"}),(0,b.jsx)("canvas",{ref:u,id:"rain-canvas"}),(0,b.jsx)("div",{className:"vignette-overlay",style:{position:"absolute",inset:0,background:"radial-gradient(circle, transparent 40%, rgba(0,5,10,0.8) 100%)",pointerEvents:"none"}})]}),(0,b.jsx)("main",{id:"content",children:m?(0,b.jsxs)("div",{id:"thank-you",children:[(0,b.jsxs)("div",{className:"ty-header",children:[(0,b.jsx)("div",{className:"ty-studio",children:"KI-RA STUDIOS PRESENTS"}),(0,b.jsx)("h1",{className:"ty-namtar",children:"NAMTAR"}),(0,b.jsx)("div",{className:"ty-ark",children:"ARK: SURVIVAL ASCENDED"})]}),(0,b.jsxs)("div",{className:"panel ty-transmission",children:[(0,b.jsx)("h2",{children:"TRANSMISSION SUCCESSFUL"}),(0,b.jsxs)("p",{children:["Survivor, your data has been integrated into the ",(0,b.jsx)("span",{className:"highlight",children:"NAMTAR Calibration Matrix"}),". We are analyzing your preferences to ensure the ultimate ARK experience."]}),(0,b.jsx)("p",{children:"The dawn of a new era is approaching. Stay tuned to the Satcorp transmissions for launch window announcements."}),(0,b.jsxs)("div",{className:"ty-shapes",children:[(0,b.jsx)("div",{className:"ty-shape",children:"⌬ SYNC_COMPLETE"}),(0,b.jsx)("div",{className:"ty-shape",children:"⌬ NODE_ACTIVE"}),(0,b.jsx)("div",{className:"ty-shape",children:"⌬ SIGNAL_STABLE"})]}),(0,b.jsxs)("div",{className:"ty-reward",children:[(0,b.jsx)("h3",{children:"REGISTRATION REWARD: [PENDING]"}),(0,b.jsx)("p",{style:{fontSize:"0.8rem",opacity:.7,margin:0},children:'As an early registrant, your profile has been flagged for exclusive "First Wave" starting equipment and cosmetic data-packs.'})]}),(0,b.jsx)("div",{style:{marginTop:"30px",textAlign:"center"},children:(0,b.jsx)(d.default,{href:"/",style:{color:"var(--ark-teal)",textDecoration:"none",fontFamily:"Orbitron, sans-serif",fontSize:"0.8rem",letterSpacing:"0.2em"},children:"[ RETURN TO SATCORP HUB ]"})})]})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("header",{children:[(0,b.jsx)("div",{className:"studio-badge",children:"KI-RA STUDIOS PRESENTS"}),(0,b.jsx)("h1",{className:"namtar-logo",children:"NAMTAR"}),(0,b.jsx)("div",{className:"ark-subtitle",children:"ARK: SURVIVAL ASCENDED"}),(0,b.jsx)("div",{className:"divider"}),(0,b.jsx)("div",{className:"tag-line",children:"SERVER CALIBRATION & SURVIVOR REGISTRATION"})]}),(0,b.jsx)("div",{className:"panel",children:(0,b.jsxs)("div",{className:"kyrax-container",children:[(0,b.jsx)("div",{className:"kyrax-avatar",children:(0,b.jsx)("img",{src:"/wolf.png",alt:"Kyrax AI"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"kyrax-name",children:"KYRAX v4.2"}),(0,b.jsx)("div",{className:"kyrax-role",children:"SYSTEM OVERSEER"}),(0,b.jsxs)("div",{className:"kyrax-msg",children:["Greetings, Survivor. I am ",(0,b.jsx)("span",{className:"highlight",children:"KYRAX"}),". To optimize the NAMTAR Ascension protocols, I requires your tactical input. Every response calibrates the final parameters of the server you will call home. ",(0,b.jsx)("span",{className:"highlight",children:"Respond accurately."})]})]})]})}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-01"}),(0,b.jsx)("div",{className:"section-title",children:"Survivor Identity"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 01"}),(0,b.jsx)("div",{className:"q-text",children:"What is your primary handle (Survivor Name)?"}),(0,b.jsx)("input",{type:"text",name:"q1",className:"ark-input",placeholder:"Enter name...",onChange:y})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 02"}),(0,b.jsx)("div",{className:"q-text",children:"Which platform will you be utilizing for the NAMTAR transmission?"}),(0,b.jsx)("div",{className:"options-grid",children:["PC (Steam)","PlayStation 5","Xbox Series X/S","PC (Windows/Gamepass)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q2===a?"selected":""}`,onClick:()=>x("q2",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-02"}),(0,b.jsx)("div",{className:"section-title",children:"Temporal Commitment"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 03"}),(0,b.jsx)("div",{className:"q-text",children:"Estimated weekly engagement (Hours)?"}),(0,b.jsx)("div",{className:"options-grid",children:["1-10 Hours","10-30 Hours","30-60 Hours","60+ Hours (Hardcore)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q3===a?"selected":""}`,onClick:()=>x("q3",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-03"}),(0,b.jsx)("div",{className:"section-title",children:"Tactical Doctrine"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 04"}),(0,b.jsx)("div",{className:"q-text",children:"Select your primary gameplay focus:"}),(0,b.jsx)("div",{className:"options-grid",children:["Aggressive PVP","Competitive Building","PVE/Exploration Focus","Balanced (PVPVE)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q4===a?"selected":""}`,onClick:()=>x("q4",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 05"}),(0,b.jsx)("div",{className:"q-text",children:"Preferred server mode for this calibration?"}),(0,b.jsx)("div",{className:"options-grid",children:["Pure PVP (No Rules)","Moderate PVP (Rules Apply)","PVE (Zero Combat)","Roleplay (RP)"].map(a=>(0,b.jsx)("button",{className:`opt-btn pvp-style ${o.q5===a?"selected":""}`,onClick:()=>x("q5",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-04"}),(0,b.jsx)("div",{className:"section-title",children:"Environmental Protocols"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 06"}),(0,b.jsx)("div",{className:"q-text",children:"Offline Raid Protection (ORP) preference:"}),(0,b.jsx)("div",{className:"options-grid",children:["Strict (Full Protection)","Delayed (Small Window)","Tactical (Turret/Dino Buffs Only)","None (Absolute Chaos)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q6===a?"selected":""}`,onClick:()=>x("q6",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 07"}),(0,b.jsx)("div",{className:"q-text",children:"Wipe frequency preference?"}),(0,b.jsx)("div",{className:"options-grid",children:["Never (Permanent Home)","Long Cycles (6+ Months)","Seasonal (2-3 Months)","Fast (Monthly)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q7===a?"selected":""}`,onClick:()=>x("q7",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 08"}),(0,b.jsx)("div",{className:"q-text",children:"Map Architecture preference:"}),(0,b.jsx)("div",{className:"options-grid",children:["Cluster (All Ark Maps)","Island Only","The Center Only","Custom/Modded Map Focus"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q8===a?"selected":""}`,onClick:()=>x("q8",a),children:a},a))}),(0,b.jsxs)("div",{className:`conditional ${"Cluster (All Ark Maps)"===o.q8?"visible":""}`,children:[(0,b.jsx)("div",{className:"q-note",children:"SELECT PREFERRED MAPS FOR THE CLUSTER:"}),(0,b.jsx)("div",{className:"options-grid",children:["The Island","The Center","Scorched Earth","Aberration","Ragnarok","Extinction"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o["q8-maps"]?.includes(a)?"selected":""}`,onClick:()=>x("q8-maps",a,!0),children:a},a))})]}),(0,b.jsx)("div",{className:`conditional ${"Custom/Modded Map Focus"===o.q8?"visible":""}`,children:(0,b.jsx)("input",{type:"text",name:"q8-custom-map",className:"ark-input",placeholder:"Suggest a custom map...",onChange:y})})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 09"}),(0,b.jsx)("div",{className:"q-text",children:"Where should your journey begin?"}),(0,b.jsx)("div",{className:"options-grid",children:["The Island","Scorched Earth","The Center","Other"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q9===a?"selected":""}`,onClick:()=>x("q9",a),children:a},a))}),(0,b.jsx)("div",{className:`conditional ${"Other"===o.q9?"visible":""}`,children:(0,b.jsx)("input",{type:"text",name:"q9-other",className:"ark-input",placeholder:"Specifiy starting location...",onChange:y})})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-05"}),(0,b.jsx)("div",{className:"section-title",children:"Resource & Biological Rates"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 10"}),(0,b.jsx)("div",{className:"q-text",children:"Harvest Yield parameters:"}),(0,b.jsx)("div",{className:"options-grid",children:["Classic (1x-2x)","Boosted (3x-5x)","Heavy (10x+)","Custom"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q10===a?"selected":""}`,onClick:()=>x("q10",a),children:a},a))}),(0,b.jsx)("div",{className:`conditional ${"Custom"===o.q10?"visible":""}`,children:(0,b.jsx)("input",{type:"text",name:"q10-custom",className:"ark-input",placeholder:"Describe preferred harvest settings...",onChange:y})})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 11"}),(0,b.jsx)("div",{className:"q-text",children:"Biological Taming velocity:"}),(0,b.jsx)("div",{className:"options-grid",children:["Official (1x)","Enhanced (3x-5x)","Fast (10x)","Instant"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q11===a?"selected":""}`,onClick:()=>x("q11",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 12"}),(0,b.jsx)("div",{className:"q-text",children:"Breeding & Maturation rates:"}),(0,b.jsx)("div",{className:"options-grid",children:["Official","Competitive Fast","Hyper-Speed"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q12===a?"selected":""}`,onClick:()=>x("q12",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 13"}),(0,b.jsx)("div",{className:"q-text",children:"Ascension XP Growth:"}),(0,b.jsx)("div",{className:"options-grid",children:["1x Experience","2.5x Experience","5x Experience","High (10x+)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q13===a?"selected":""}`,onClick:()=>x("q13",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-06"}),(0,b.jsx)("div",{className:"section-title",children:"Advanced Mechanics"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 14"}),(0,b.jsx)("div",{className:"q-text",children:"Imprint scaling preference:"}),(0,b.jsx)("div",{className:"options-grid",children:["1-Cuddle 100%","Official Multi-Cuddle","None (Manual Only)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q14===a?"selected":""}`,onClick:()=>x("q14",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 15"}),(0,b.jsx)("div",{className:"q-text",children:"Wild Creature Resistance/Difficulty:"}),(0,b.jsx)("div",{className:"options-grid",children:["Standard (Lvl 150)","Advanced (Lvl 300)","Hardcore (Lvl 600+)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q15===a?"selected":""}`,onClick:()=>x("q15",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 16"}),(0,b.jsx)("div",{className:"q-text",children:"Essential Quality of Life (QoL) features:"}),(0,b.jsx)("div",{className:"options-grid",children:["Stacking Mods","Better Spyglass","Cryopod Enhancements","Automated Collection"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q16?.includes(a)?"selected":""}`,onClick:()=>x("q16",a,!0),children:a},a))}),(0,b.jsx)("div",{style:{marginTop:"12px"},children:(0,b.jsx)("input",{type:"text",name:"q16-open",className:"ark-input",placeholder:"List any other MUST-HAVE QoL features...",onChange:y})})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-07"}),(0,b.jsx)("div",{className:"section-title",children:"Structural Modifications"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 17"}),(0,b.jsx)("div",{className:"q-text",children:"Preferred Modification volume?"}),(0,b.jsx)("div",{className:"options-grid",children:["Vanilla (No Mods)","Vanilla+ (Essential Only)","Modded (Balanced Additions)","Heavy (Transformation)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q17===a?"selected":""}`,onClick:()=>x("q17",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 18"}),(0,b.jsx)("div",{className:"q-text",children:"Primary Mod Categories of interest:"}),(0,b.jsx)("div",{className:"options-grid",children:["New Creatures","Building Structures","New Technology/Armor","Visual Enhancements"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q18?.includes(a)?"selected":""}`,onClick:()=>x("q18",a,!0),children:a},a))}),(0,b.jsx)("div",{style:{marginTop:"12px"},children:(0,b.jsx)("input",{type:"text",name:"q18-open",className:"ark-input",placeholder:"Specific mod suggestions?",onChange:y})})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-08"}),(0,b.jsx)("div",{className:"section-title",children:"Economic Protocols"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 19"}),(0,b.jsx)("div",{className:"q-text",children:"Preferred participation in Server Economy?"}),(0,b.jsx)("div",{className:"options-grid",children:["Trading (Player-to-Player)","Admin Shop (In-game Currency)","None (Barter Only)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q19===a?"selected":""}`,onClick:()=>x("q19",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 20"}),(0,b.jsx)("div",{className:"q-text",children:"World Event preference:"}),(0,b.jsx)("div",{className:"options-grid",children:["Dynamic Boss Spawns","Dino Racing/Tournaments","Raid Events (Admin Bases)","Scavenger Hunts"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q20?.includes(a)?"selected":""}`,onClick:()=>x("q20",a,!0),children:a},a))})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-09"}),(0,b.jsx)("div",{className:"section-title",children:"Survivor Philosophy"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 21"}),(0,b.jsx)("div",{className:"q-text",children:"The Ideal Community Size?"}),(0,b.jsx)("div",{className:"options-grid",children:["Intimate (20-30 Active)","Busy (50-70 Active)","Populated (100+ Active)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q21===a?"selected":""}`,onClick:()=>x("q21",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 22"}),(0,b.jsx)("div",{className:"q-text",children:"Rule Enforcement strictness?"}),(0,b.jsx)("div",{className:"options-grid",children:["Strict (High Moderation)","Fair (Community Policed)","Loose (Wild West)"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q22===a?"selected":""}`,onClick:()=>x("q22",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 23"}),(0,b.jsx)("div",{className:"q-text",children:"What factors encourage your long-term engagement?"}),(0,b.jsx)("textarea",{name:"q23",className:"ark-input",rows:3,placeholder:"Examples: Friendly community, stable updates, active admins...",onChange:y})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 24"}),(0,b.jsx)("div",{className:"q-text",children:"What factors would cause you to leave?"}),(0,b.jsx)("textarea",{name:"q24",className:"ark-input",rows:3,placeholder:"Examples: Lag, bad admins, toxicity...",onChange:y})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-10"}),(0,b.jsx)("div",{className:"section-title",children:"Final Calibration"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 25"}),(0,b.jsx)("div",{className:"q-text",children:"Interest in the NAMTAR Ascension? (1–10)"}),(0,b.jsxs)("div",{className:"range-wrap",children:[(0,b.jsx)("input",{type:"range",name:"q25",min:"1",max:"100",className:"ark-range",value:10*o.q25,onChange:a=>p({...o,q25:Math.ceil(parseInt(a.target.value)/10)})}),(0,b.jsx)("div",{className:"range-val",children:o.q25})]})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 26"}),(0,b.jsx)("div",{className:"q-text",children:"Do you plan to join the NAMTAR transmission at launch?"}),(0,b.jsx)("div",{className:"options-grid",children:["YES — AT LAUNCH","LATER — POST-ALPHA","MAYBE — UNDECIDED"].map(a=>(0,b.jsx)("button",{className:`opt-btn ${o.q26===a?"selected":""}`,onClick:()=>x("q26",a),children:a},a))})]}),(0,b.jsxs)("div",{className:"panel question-card",children:[(0,b.jsx)("div",{className:"q-label",children:"QUESTION 27"}),(0,b.jsx)("div",{className:"q-text",children:"Any additional data for KYRAX?"}),(0,b.jsx)("textarea",{name:"q27",className:"ark-input",rows:4,placeholder:"Suggestions, concerns, or greetings...",onChange:y})]}),(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("div",{className:"section-num",children:"S-X"}),(0,b.jsx)("div",{className:"section-title",children:"Bonus: Elite Application"}),(0,b.jsx)("div",{className:"section-line"})]}),(0,b.jsxs)("div",{className:"panel",style:{borderStyle:"dashed",borderColor:"var(--ark-amber)"},children:[(0,b.jsx)("div",{className:"q-label",style:{color:"var(--ark-amber)"},children:"OPTIONAL: THE ASCENDED PATH"}),(0,b.jsx)("div",{className:"q-text",children:"Do you have extensive ARK expertise or relevant technical skills (Admin, Dev, Community Lead)? Mention it here for consideration in the ELITE survivor cohort."}),(0,b.jsx)("textarea",{name:"q-bonus",className:"ark-input",rows:3,placeholder:"Detail your credentials...",onChange:y})]}),q&&(0,b.jsx)("div",{style:{color:"var(--ark-red)",textAlign:"center",marginBottom:"15px",fontWeight:600},children:q}),(0,b.jsx)("button",{id:"submit-btn",disabled:s,onClick:z,children:s?"TRANSMITTING...":"[ SUBMIT SURVEY ]"}),(0,b.jsxs)("footer",{style:{marginTop:"40px",opacity:.4,textAlign:"center",fontSize:"0.7rem",letterSpacing:"0.2em"},children:["© ",new Date().getFullYear()," KI-RA STUDIOS | NAMTAR ASCENSION PROTOCOLS"]})]})})]})}])}];

//# sourceMappingURL=src_app_namtarsurvey_page_tsx_12ew~1q._.js.map