(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,29075,e=>{"use strict";var a=e.i(43476),t=e.i(71645),i=e.i(22016);function s({className:e,style:t}){return(0,a.jsx)("img",{src:"/wolf.png",alt:"KYRAX",className:e,style:t})}let r=[{text:"> SATCORP MAINFRAME ONLINE",cls:"ok",delay:700,dur:600,ch:26},{text:"> KYRAX v4.2.1 — LOADING AI CORE...",cls:"",delay:1400,dur:700,ch:36},{text:"> NAMTAR ENVIRONMENT: LOADED",cls:"ok",delay:2200,dur:600,ch:28},{text:"> SURVIVOR DATABASE: INITIALIZING",cls:"",delay:2900,dur:700,ch:33},{text:"> SERVER CALIBRATION MODULE: ACTIVE",cls:"ok",delay:3600,dur:750,ch:35},{text:"> DISCORD RELAY: CONNECTED",cls:"ok",delay:4300,dur:600,ch:26},{text:"> [ ALERT ] NAMTAR ASCENSION DETECTED",cls:"warn",delay:5200,dur:800,ch:37},{text:"> SYSTEM CALIBRATION: READY",cls:"ok",delay:6200,dur:700,ch:27}],n=`
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
`;e.s(["default",0,function(){let[e,o]=(0,t.useState)(!0),[l,d]=(0,t.useState)(0),[c,m]=(0,t.useState)([]),[p,x]=(0,t.useState)(!1),[h,g]=(0,t.useState)({q25:7}),[u,v]=(0,t.useState)(""),[b,f]=(0,t.useState)(!1),N=(0,t.useRef)(null),y=(0,t.useRef)(null),j=(0,t.useRef)(null);(0,t.useEffect)(()=>{if(!e)return;let a=Date.now(),t=setInterval(()=>{let e=Math.min(100,Math.floor((Date.now()-a)/8400*100));d(e),e>=100&&clearInterval(t)},50);r.forEach(e=>{setTimeout(()=>{m(a=>[...a,e])},e.delay)});let i=y.current;if(i){let e=i.getContext("2d");if(e){let a;i.width=window.innerWidth,i.height=window.innerHeight;let t=Array.from({length:150},()=>({x:Math.random()*i.width,y:Math.random()*i.height,len:8+18*Math.random(),speed:7+9*Math.random(),op:.1+.35*Math.random()})),s=()=>{e.clearRect(0,0,i.width,i.height),t.forEach(a=>{e.beginPath(),e.moveTo(a.x,a.y),e.lineTo(a.x-.1*a.len,a.y+a.len),e.strokeStyle="rgba(150,220,255,"+a.op+")",e.lineWidth=.5,e.stroke(),a.y+=a.speed,a.x-=.4,a.y>i.height&&(a.y=-20,a.x=Math.random()*i.width)}),a=requestAnimationFrame(s)};return s(),()=>cancelAnimationFrame(a)}}},[e]),(0,t.useEffect)(()=>{if(e)return;let a=document.getElementById("stars");if(a&&0===a.children.length)for(let e=0;e<120;e++){let e=document.createElement("div");e.className="star";let t=2*Math.random()+.5;e.style.cssText=`
                    width:${t}px;height:${t}px;
                    left:${100*Math.random()}%;
                    top:${60*Math.random()}%;
                    --d:${2+4*Math.random()}s;
                    animation-delay:${5*Math.random()}s;
                    position: absolute; border-radius: 50%; background: white;
                    opacity:${.1+.5*Math.random()};
                `,a.appendChild(e)}let t=N.current;if(t){let e=t.getContext("2d");if(e){let a,i=()=>{t.width=window.innerWidth,t.height=window.innerHeight};i(),window.addEventListener("resize",i);let s=Array.from({length:200},()=>({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,len:8+20*Math.random(),speed:8+10*Math.random(),opacity:.1+.4*Math.random()})),r=()=>{e.clearRect(0,0,t.width,t.height),s.forEach(a=>{e.beginPath(),e.moveTo(a.x,a.y),e.lineTo(a.x-.1*a.len,a.y+a.len),e.strokeStyle=`rgba(150,220,255,${a.opacity})`,e.lineWidth=.5,e.stroke(),a.y+=a.speed,a.x-=.5,a.y>t.height&&(a.y=-20,a.x=Math.random()*t.width)}),a=requestAnimationFrame(r)};return r(),()=>{cancelAnimationFrame(a),window.removeEventListener("resize",i)}}}},[e]),(0,t.useEffect)(()=>{if(e)return;let a=()=>{let e=window.scrollY,a=document.getElementById("fog1"),t=document.getElementById("fog2"),i=document.getElementById("fog3");a&&(a.style.transform=`translateY(${.04*e}px)`),t&&(t.style.transform=`translateY(${.06*e}px)`),i&&(i.style.transform=`translateY(${.08*e}px)`);let s=document.documentElement.scrollHeight-window.innerHeight,r=document.getElementById("progress-bar");r&&(r.style.width=e/s*100+"%")};return window.addEventListener("scroll",a),()=>window.removeEventListener("scroll",a)},[e]),(0,t.useEffect)(()=>{if(e)return;let a=()=>{let e=j.current;e&&(e.style.opacity="1",setTimeout(()=>{e.style.opacity="0"},80),setTimeout(()=>{e.style.opacity="0.7"},120),setTimeout(()=>{e.style.opacity="0"},200),setTimeout(a,5e3+2e4*Math.random()))},t=setTimeout(a,4e3);return()=>clearTimeout(t)},[e]);let S=(e,a,t=!1)=>{g(i=>{let s=i[e];if(!t)return{...i,[e]:a};let r=Array.isArray(s)?[...s]:s?[s]:[];return r.includes(a)?{...i,[e]:r.filter(e=>e!==a)}:{...i,[e]:[...r,a]}})},k=e=>{let{name:a,value:t}=e.target;g(e=>({...e,[a]:t}))},q=async()=>{f(!0),v("");let e=e=>Object.entries(e).filter(([e])=>h[e]).map(([e,a])=>{let t=h[e];return Array.isArray(t)&&(t=t.join(", ")),{name:a,value:String(t).substring(0,1024),inline:!1}}),a=[{username:"KYRAX // SATCORP AI",embeds:[{title:`⚡ NAMTAR SURVEY — ${h.q1||"Survivor"} [1/2]`,description:`New survivor registration received.
**Submitted:** ${new Date().toLocaleString()}`,color:58828,fields:e({q1:"Survivor Name",q2:"Platform",q3:"Play Time/Week",q4:"Playstyle",q5:"Server Mode",q6:"ORP Preference",q7:"Wipe Schedule",q8:"Map Setup","q8-maps":"Cluster Maps","q8-custom-map":"Custom Map Suggestion",q9:"Starting Map","q9-other":"Starting Map (Other)",q10:"Harvest Rates","q10-custom":"Harvest Custom",q11:"Taming Speed",q12:"Breeding",q13:"XP Rate",q14:"Imprint Settings",q15:"Dino Difficulty"}),footer:{text:"Ki-Ra Studios | NAMTAR Calibration - Profile"}}]},{username:"KYRAX // SATCORP AI",embeds:[{title:`⚡ NAMTAR SURVEY — ${h.q1||"Survivor"} [2/2]`,color:0xff6b1a,fields:e({q16:"QoL Features","q16-open":"QoL Mandatory",q17:"Mod Volume",q18:"Mod Categories","q18-open":"Specific Mods",q19:"Economy Participation",q20:"World Events",q21:"Community Size",q22:"Rule Strictness",q23:"Stays Long-Term For",q24:"Leaves Server For",q25:"Interest Rating (1–10)",q26:"Join At Launch?",q27:"Additional Comments","q-bonus":"Elite Credentials"}),footer:{text:"Ki-Ra Studios | NAMTAR Calibration - Systems"}}]}];try{(await fetch("/api/namtarsurvey",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).ok?(x(!0),window.scrollTo({top:0,behavior:"smooth"})):v("Transmission failed. Please try again later.")}catch(e){v("Connection error. Please check your uplink.")}finally{f(!1)}};return(0,a.jsxs)("div",{className:"namtar-ark",children:[(0,a.jsx)("style",{dangerouslySetInnerHTML:{__html:n}}),(0,a.jsx)("div",{id:"progress-bar"}),(0,a.jsx)("div",{id:"lightning-flash",ref:j}),e&&(0,a.jsxs)("div",{style:{position:"fixed",inset:0,background:"url(/namtar_trex_background_1775227097997.png) no-repeat center/cover",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px",fontFamily:'"Share Tech Mono", monospace'},children:[(0,a.jsx)("canvas",{ref:y,style:{position:"absolute",inset:0}}),(0,a.jsx)("div",{className:"boot-corner boot-corner-tl"}),(0,a.jsx)("div",{className:"boot-corner boot-corner-tr"}),(0,a.jsx)("div",{className:"boot-corner boot-corner-bl"}),(0,a.jsx)("div",{className:"boot-corner boot-corner-br"}),(0,a.jsxs)("div",{style:{position:"relative",zIndex:10,width:"100%",maxWidth:"600px",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,a.jsx)(s,{className:"boot-kyrax-img",style:{width:"80px",height:"80px",marginBottom:"20px"}}),(0,a.jsx)("div",{style:{fontSize:"3.5rem",fontWeight:900,color:"#ffb347",textAlign:"center",letterSpacing:"0.2em",marginBottom:"10px",filter:"drop-shadow(0 0 20px #ff6b1a)",fontFamily:"Orbitron, sans-serif"},children:"NAMTAR"}),(0,a.jsx)("div",{style:{fontSize:"0.8rem",color:"#00e5cc",textAlign:"center",letterSpacing:"0.4em",marginBottom:"40px",fontFamily:"Orbitron, sans-serif"},children:"SYSTEM CALIBRATION INITIALIZED"}),(0,a.jsx)("div",{style:{background:"rgba(0,255,200,0.05)",border:"1px solid rgba(0,255,200,0.2)",padding:"20px",height:"220px",overflow:"hidden",marginBottom:"20px",borderRadius:"2px"},children:c.map((e,t)=>(0,a.jsx)("div",{style:{color:"ok"===e.cls?"#39ff14":"warn"===e.cls?"#ffb347":"#00e5cc",marginBottom:"6px",fontSize:"0.85rem"},children:e.text},t))}),(0,a.jsx)("div",{style:{width:"100%",height:"4px",background:"rgba(255,255,255,0.05)",borderRadius:"10px",overflow:"hidden"},children:(0,a.jsx)("div",{style:{width:`${l}%`,height:"100%",background:"linear-gradient(90deg, #00e5cc, #ff6b1a)",boxShadow:"0 0 15px #00e5cc",transition:"width 0.1s linear"}})}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px",color:"rgba(0,229,204,0.5)",fontSize:"0.7rem",letterSpacing:"0.1em"},children:[(0,a.jsxs)("span",{children:["UPLINK DENSITY: ",(1.2*l).toFixed(1)," GB/S"]}),(0,a.jsxs)("span",{children:[l,"%"]})]}),100===l&&(0,a.jsx)("button",{onClick:()=>o(!1),style:{width:"100%",marginTop:"40px",padding:"15px",background:"transparent",border:"1px solid #00e5cc",color:"#00e5cc",fontFamily:"inherit",cursor:"pointer",letterSpacing:"0.3em",fontSize:"0.9rem",transition:"all 0.3s"},onMouseOver:e=>{e.currentTarget.style.background="rgba(0,229,204,0.1)",e.currentTarget.style.boxShadow="0 0 20px rgba(0,229,204,0.3)"},onMouseOut:e=>{e.currentTarget.style.background="transparent",e.currentTarget.style.boxShadow="none"},children:"[ ACCESS INTERFACE ]"})]})]}),(0,a.jsxs)("div",{id:"scene",children:[(0,a.jsx)("div",{id:"sky"}),(0,a.jsx)("div",{id:"stars"}),(0,a.jsx)("div",{id:"fog1",className:"fog"}),(0,a.jsx)("div",{id:"fog2",className:"fog"}),(0,a.jsx)("div",{id:"fog3",className:"fog"}),(0,a.jsx)("canvas",{ref:N,id:"rain-canvas"}),(0,a.jsx)("div",{className:"vignette-overlay",style:{position:"absolute",inset:0,background:"radial-gradient(circle, transparent 40%, rgba(0,5,10,0.8) 100%)",pointerEvents:"none"}})]}),(0,a.jsx)("main",{id:"content",children:p?(0,a.jsxs)("div",{id:"thank-you",children:[(0,a.jsxs)("div",{className:"ty-header",children:[(0,a.jsx)("div",{className:"ty-studio",children:"KI-RA STUDIOS PRESENTS"}),(0,a.jsx)("h1",{className:"ty-namtar",children:"NAMTAR"}),(0,a.jsx)("div",{className:"ty-ark",children:"ARK: SURVIVAL ASCENDED"})]}),(0,a.jsxs)("div",{className:"panel ty-transmission",children:[(0,a.jsx)("h2",{children:"TRANSMISSION SUCCESSFUL"}),(0,a.jsxs)("p",{children:["Survivor, your data has been integrated into the ",(0,a.jsx)("span",{className:"highlight",children:"NAMTAR Calibration Matrix"}),". We are analyzing your preferences to ensure the ultimate ARK experience."]}),(0,a.jsx)("p",{children:"The dawn of a new era is approaching. Stay tuned to the Satcorp transmissions for launch window announcements."}),(0,a.jsxs)("div",{className:"ty-shapes",children:[(0,a.jsx)("div",{className:"ty-shape",children:"⌬ SYNC_COMPLETE"}),(0,a.jsx)("div",{className:"ty-shape",children:"⌬ NODE_ACTIVE"}),(0,a.jsx)("div",{className:"ty-shape",children:"⌬ SIGNAL_STABLE"})]}),(0,a.jsxs)("div",{className:"ty-reward",children:[(0,a.jsx)("h3",{children:"REGISTRATION REWARD: [PENDING]"}),(0,a.jsx)("p",{style:{fontSize:"0.8rem",opacity:.7,margin:0},children:'As an early registrant, your profile has been flagged for exclusive "First Wave" starting equipment and cosmetic data-packs.'})]}),(0,a.jsx)("div",{style:{marginTop:"30px",textAlign:"center"},children:(0,a.jsx)(i.default,{href:"/",style:{color:"var(--ark-teal)",textDecoration:"none",fontFamily:"Orbitron, sans-serif",fontSize:"0.8rem",letterSpacing:"0.2em"},children:"[ RETURN TO SATCORP HUB ]"})})]})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("header",{children:[(0,a.jsx)("div",{className:"studio-badge",children:"KI-RA STUDIOS PRESENTS"}),(0,a.jsx)("h1",{className:"namtar-logo",children:"NAMTAR"}),(0,a.jsx)("div",{className:"ark-subtitle",children:"ARK: SURVIVAL ASCENDED"}),(0,a.jsx)("div",{className:"divider"}),(0,a.jsx)("div",{className:"tag-line",children:"SERVER CALIBRATION & SURVIVOR REGISTRATION"})]}),(0,a.jsx)("div",{className:"panel",children:(0,a.jsxs)("div",{className:"kyrax-container",children:[(0,a.jsx)("div",{className:"kyrax-avatar",children:(0,a.jsx)("img",{src:"/wolf.png",alt:"Kyrax AI"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"kyrax-name",children:"KYRAX v4.2"}),(0,a.jsx)("div",{className:"kyrax-role",children:"SYSTEM OVERSEER"}),(0,a.jsxs)("div",{className:"kyrax-msg",children:["Greetings, Survivor. I am ",(0,a.jsx)("span",{className:"highlight",children:"KYRAX"}),". To optimize the NAMTAR Ascension protocols, I requires your tactical input. Every response calibrates the final parameters of the server you will call home. ",(0,a.jsx)("span",{className:"highlight",children:"Respond accurately."})]})]})]})}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-01"}),(0,a.jsx)("div",{className:"section-title",children:"Survivor Identity"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 01"}),(0,a.jsx)("div",{className:"q-text",children:"What is your primary handle (Survivor Name)?"}),(0,a.jsx)("input",{type:"text",name:"q1",className:"ark-input",placeholder:"Enter name...",onChange:k})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 02"}),(0,a.jsx)("div",{className:"q-text",children:"Which platform will you be utilizing for the NAMTAR transmission?"}),(0,a.jsx)("div",{className:"options-grid",children:["PC (Steam)","PlayStation 5","Xbox Series X/S","PC (Windows/Gamepass)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q2===e?"selected":""}`,onClick:()=>S("q2",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-02"}),(0,a.jsx)("div",{className:"section-title",children:"Temporal Commitment"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 03"}),(0,a.jsx)("div",{className:"q-text",children:"Estimated weekly engagement (Hours)?"}),(0,a.jsx)("div",{className:"options-grid",children:["1-10 Hours","10-30 Hours","30-60 Hours","60+ Hours (Hardcore)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q3===e?"selected":""}`,onClick:()=>S("q3",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-03"}),(0,a.jsx)("div",{className:"section-title",children:"Tactical Doctrine"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 04"}),(0,a.jsx)("div",{className:"q-text",children:"Select your primary gameplay focus:"}),(0,a.jsx)("div",{className:"options-grid",children:["Aggressive PVP","Competitive Building","PVE/Exploration Focus","Balanced (PVPVE)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q4===e?"selected":""}`,onClick:()=>S("q4",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 05"}),(0,a.jsx)("div",{className:"q-text",children:"Preferred server mode for this calibration?"}),(0,a.jsx)("div",{className:"options-grid",children:["Pure PVP (No Rules)","Moderate PVP (Rules Apply)","PVE (Zero Combat)","Roleplay (RP)"].map(e=>(0,a.jsx)("button",{className:`opt-btn pvp-style ${h.q5===e?"selected":""}`,onClick:()=>S("q5",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-04"}),(0,a.jsx)("div",{className:"section-title",children:"Environmental Protocols"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 06"}),(0,a.jsx)("div",{className:"q-text",children:"Offline Raid Protection (ORP) preference:"}),(0,a.jsx)("div",{className:"options-grid",children:["Strict (Full Protection)","Delayed (Small Window)","Tactical (Turret/Dino Buffs Only)","None (Absolute Chaos)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q6===e?"selected":""}`,onClick:()=>S("q6",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 07"}),(0,a.jsx)("div",{className:"q-text",children:"Wipe frequency preference?"}),(0,a.jsx)("div",{className:"options-grid",children:["Never (Permanent Home)","Long Cycles (6+ Months)","Seasonal (2-3 Months)","Fast (Monthly)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q7===e?"selected":""}`,onClick:()=>S("q7",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 08"}),(0,a.jsx)("div",{className:"q-text",children:"Map Architecture preference:"}),(0,a.jsx)("div",{className:"options-grid",children:["Cluster (All Ark Maps)","Island Only","The Center Only","Custom/Modded Map Focus"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q8===e?"selected":""}`,onClick:()=>S("q8",e),children:e},e))}),(0,a.jsxs)("div",{className:`conditional ${"Cluster (All Ark Maps)"===h.q8?"visible":""}`,children:[(0,a.jsx)("div",{className:"q-note",children:"SELECT PREFERRED MAPS FOR THE CLUSTER:"}),(0,a.jsx)("div",{className:"options-grid",children:["The Island","The Center","Scorched Earth","Aberration","Ragnarok","Extinction"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h["q8-maps"]?.includes(e)?"selected":""}`,onClick:()=>S("q8-maps",e,!0),children:e},e))})]}),(0,a.jsx)("div",{className:`conditional ${"Custom/Modded Map Focus"===h.q8?"visible":""}`,children:(0,a.jsx)("input",{type:"text",name:"q8-custom-map",className:"ark-input",placeholder:"Suggest a custom map...",onChange:k})})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 09"}),(0,a.jsx)("div",{className:"q-text",children:"Where should your journey begin?"}),(0,a.jsx)("div",{className:"options-grid",children:["The Island","Scorched Earth","The Center","Other"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q9===e?"selected":""}`,onClick:()=>S("q9",e),children:e},e))}),(0,a.jsx)("div",{className:`conditional ${"Other"===h.q9?"visible":""}`,children:(0,a.jsx)("input",{type:"text",name:"q9-other",className:"ark-input",placeholder:"Specifiy starting location...",onChange:k})})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-05"}),(0,a.jsx)("div",{className:"section-title",children:"Resource & Biological Rates"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 10"}),(0,a.jsx)("div",{className:"q-text",children:"Harvest Yield parameters:"}),(0,a.jsx)("div",{className:"options-grid",children:["Classic (1x-2x)","Boosted (3x-5x)","Heavy (10x+)","Custom"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q10===e?"selected":""}`,onClick:()=>S("q10",e),children:e},e))}),(0,a.jsx)("div",{className:`conditional ${"Custom"===h.q10?"visible":""}`,children:(0,a.jsx)("input",{type:"text",name:"q10-custom",className:"ark-input",placeholder:"Describe preferred harvest settings...",onChange:k})})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 11"}),(0,a.jsx)("div",{className:"q-text",children:"Biological Taming velocity:"}),(0,a.jsx)("div",{className:"options-grid",children:["Official (1x)","Enhanced (3x-5x)","Fast (10x)","Instant"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q11===e?"selected":""}`,onClick:()=>S("q11",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 12"}),(0,a.jsx)("div",{className:"q-text",children:"Breeding & Maturation rates:"}),(0,a.jsx)("div",{className:"options-grid",children:["Official","Competitive Fast","Hyper-Speed"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q12===e?"selected":""}`,onClick:()=>S("q12",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 13"}),(0,a.jsx)("div",{className:"q-text",children:"Ascension XP Growth:"}),(0,a.jsx)("div",{className:"options-grid",children:["1x Experience","2.5x Experience","5x Experience","High (10x+)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q13===e?"selected":""}`,onClick:()=>S("q13",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-06"}),(0,a.jsx)("div",{className:"section-title",children:"Advanced Mechanics"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 14"}),(0,a.jsx)("div",{className:"q-text",children:"Imprint scaling preference:"}),(0,a.jsx)("div",{className:"options-grid",children:["1-Cuddle 100%","Official Multi-Cuddle","None (Manual Only)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q14===e?"selected":""}`,onClick:()=>S("q14",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 15"}),(0,a.jsx)("div",{className:"q-text",children:"Wild Creature Resistance/Difficulty:"}),(0,a.jsx)("div",{className:"options-grid",children:["Standard (Lvl 150)","Advanced (Lvl 300)","Hardcore (Lvl 600+)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q15===e?"selected":""}`,onClick:()=>S("q15",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 16"}),(0,a.jsx)("div",{className:"q-text",children:"Essential Quality of Life (QoL) features:"}),(0,a.jsx)("div",{className:"options-grid",children:["Stacking Mods","Better Spyglass","Cryopod Enhancements","Automated Collection"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q16?.includes(e)?"selected":""}`,onClick:()=>S("q16",e,!0),children:e},e))}),(0,a.jsx)("div",{style:{marginTop:"12px"},children:(0,a.jsx)("input",{type:"text",name:"q16-open",className:"ark-input",placeholder:"List any other MUST-HAVE QoL features...",onChange:k})})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-07"}),(0,a.jsx)("div",{className:"section-title",children:"Structural Modifications"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 17"}),(0,a.jsx)("div",{className:"q-text",children:"Preferred Modification volume?"}),(0,a.jsx)("div",{className:"options-grid",children:["Vanilla (No Mods)","Vanilla+ (Essential Only)","Modded (Balanced Additions)","Heavy (Transformation)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q17===e?"selected":""}`,onClick:()=>S("q17",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 18"}),(0,a.jsx)("div",{className:"q-text",children:"Primary Mod Categories of interest:"}),(0,a.jsx)("div",{className:"options-grid",children:["New Creatures","Building Structures","New Technology/Armor","Visual Enhancements"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q18?.includes(e)?"selected":""}`,onClick:()=>S("q18",e,!0),children:e},e))}),(0,a.jsx)("div",{style:{marginTop:"12px"},children:(0,a.jsx)("input",{type:"text",name:"q18-open",className:"ark-input",placeholder:"Specific mod suggestions?",onChange:k})})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-08"}),(0,a.jsx)("div",{className:"section-title",children:"Economic Protocols"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 19"}),(0,a.jsx)("div",{className:"q-text",children:"Preferred participation in Server Economy?"}),(0,a.jsx)("div",{className:"options-grid",children:["Trading (Player-to-Player)","Admin Shop (In-game Currency)","None (Barter Only)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q19===e?"selected":""}`,onClick:()=>S("q19",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 20"}),(0,a.jsx)("div",{className:"q-text",children:"World Event preference:"}),(0,a.jsx)("div",{className:"options-grid",children:["Dynamic Boss Spawns","Dino Racing/Tournaments","Raid Events (Admin Bases)","Scavenger Hunts"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q20?.includes(e)?"selected":""}`,onClick:()=>S("q20",e,!0),children:e},e))})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-09"}),(0,a.jsx)("div",{className:"section-title",children:"Survivor Philosophy"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 21"}),(0,a.jsx)("div",{className:"q-text",children:"The Ideal Community Size?"}),(0,a.jsx)("div",{className:"options-grid",children:["Intimate (20-30 Active)","Busy (50-70 Active)","Populated (100+ Active)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q21===e?"selected":""}`,onClick:()=>S("q21",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 22"}),(0,a.jsx)("div",{className:"q-text",children:"Rule Enforcement strictness?"}),(0,a.jsx)("div",{className:"options-grid",children:["Strict (High Moderation)","Fair (Community Policed)","Loose (Wild West)"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q22===e?"selected":""}`,onClick:()=>S("q22",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 23"}),(0,a.jsx)("div",{className:"q-text",children:"What factors encourage your long-term engagement?"}),(0,a.jsx)("textarea",{name:"q23",className:"ark-input",rows:3,placeholder:"Examples: Friendly community, stable updates, active admins...",onChange:k})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 24"}),(0,a.jsx)("div",{className:"q-text",children:"What factors would cause you to leave?"}),(0,a.jsx)("textarea",{name:"q24",className:"ark-input",rows:3,placeholder:"Examples: Lag, bad admins, toxicity...",onChange:k})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-10"}),(0,a.jsx)("div",{className:"section-title",children:"Final Calibration"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 25"}),(0,a.jsx)("div",{className:"q-text",children:"Interest in the NAMTAR Ascension? (1–10)"}),(0,a.jsxs)("div",{className:"range-wrap",children:[(0,a.jsx)("input",{type:"range",name:"q25",min:"1",max:"100",className:"ark-range",value:10*h.q25,onChange:e=>g({...h,q25:Math.ceil(parseInt(e.target.value)/10)})}),(0,a.jsx)("div",{className:"range-val",children:h.q25})]})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 26"}),(0,a.jsx)("div",{className:"q-text",children:"Do you plan to join the NAMTAR transmission at launch?"}),(0,a.jsx)("div",{className:"options-grid",children:["YES — AT LAUNCH","LATER — POST-ALPHA","MAYBE — UNDECIDED"].map(e=>(0,a.jsx)("button",{className:`opt-btn ${h.q26===e?"selected":""}`,onClick:()=>S("q26",e),children:e},e))})]}),(0,a.jsxs)("div",{className:"panel question-card",children:[(0,a.jsx)("div",{className:"q-label",children:"QUESTION 27"}),(0,a.jsx)("div",{className:"q-text",children:"Any additional data for KYRAX?"}),(0,a.jsx)("textarea",{name:"q27",className:"ark-input",rows:4,placeholder:"Suggestions, concerns, or greetings...",onChange:k})]}),(0,a.jsxs)("div",{className:"section-header",children:[(0,a.jsx)("div",{className:"section-num",children:"S-X"}),(0,a.jsx)("div",{className:"section-title",children:"Bonus: Elite Application"}),(0,a.jsx)("div",{className:"section-line"})]}),(0,a.jsxs)("div",{className:"panel",style:{borderStyle:"dashed",borderColor:"var(--ark-amber)"},children:[(0,a.jsx)("div",{className:"q-label",style:{color:"var(--ark-amber)"},children:"OPTIONAL: THE ASCENDED PATH"}),(0,a.jsx)("div",{className:"q-text",children:"Do you have extensive ARK expertise or relevant technical skills (Admin, Dev, Community Lead)? Mention it here for consideration in the ELITE survivor cohort."}),(0,a.jsx)("textarea",{name:"q-bonus",className:"ark-input",rows:3,placeholder:"Detail your credentials...",onChange:k})]}),u&&(0,a.jsx)("div",{style:{color:"var(--ark-red)",textAlign:"center",marginBottom:"15px",fontWeight:600},children:u}),(0,a.jsx)("button",{id:"submit-btn",disabled:b,onClick:q,children:b?"TRANSMITTING...":"[ SUBMIT SURVEY ]"}),(0,a.jsxs)("footer",{style:{marginTop:"40px",opacity:.4,textAlign:"center",fontSize:"0.7rem",letterSpacing:"0.2em"},children:["© ",new Date().getFullYear()," KI-RA STUDIOS | NAMTAR ASCENSION PROTOCOLS"]})]})})]})}])}]);