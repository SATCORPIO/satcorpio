import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════════════════════
   DUALCORE 900 v2.0 — SECURITY RESERVE + ANTI-SURGE SYSTEMS
   
   NEW PARAMETERS ADDED:
   1. Always-On Security Reserve: E2 in spinning reserve — one engine is
      ALWAYS a heartbeat from parallel. True N+1 at all times.
   2. Anti-Surge Pre-emptive Start: J1939 ECM data + s-CAN inter-controller
      communication triggers E2 before E1 sags, not after.
   3. Full ECM-to-ECM communication architecture (J1939 + s-CAN + CANopen)
   
   Communication verified against:
   - Cummins PCC3300 Specification Sheet (S-1570)
   - PCC3.3 Application Guide (0900-0670 Issue 21)
   - SAE J1939-71 Vehicle Application Layer
   ════════════════════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
:root {
  --ink:#030608; --p0:#040810; --p1:#080f1c; --p2:#0b1628; --p3:#0f1e34;
  --line:#142840; --line2:#1c3858;
  --E1:#f0a010; --E1b:#ffd060;
  --E2:#10c8d0; --E2b:#50e8f0;
  --BUS:#2880f0; --BUSb:#70b8ff;
  --OK:#18d850; --OK2:#10a038;
  --WN:#d8c010; --WNb:#fff050;
  --ER:#f02020; --ER2:#ff6850;
  --PU:#8830d8; --PUb:#c060ff;
  --J:#20d890;  --Jb:#80ffcc;   /* J1939 — teal-green */
  --SC:#e060f0; --SCb:#f8b0ff;  /* s-CAN — magenta */
  --CO:#6090ff; --COb:#a0c0ff;  /* CANopen — periwinkle */
  --TX:#b0d8ff; --TM:#4070a0; --TL:#1a3050;
  --MO:'JetBrains Mono',monospace; --SA:'Rajdhani',sans-serif; --DI:'Bebas Neue',sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0;}
html,body{background:var(--ink);}
.app{font-family:var(--SA);background:var(--p0);color:var(--TX);min-height:100vh;}

/* MASTHEAD */
.mast{background:linear-gradient(135deg,#060d1c 0%,#08142a 60%,#040a18 100%);border-bottom:1px solid var(--line);padding:0 28px;position:relative;overflow:hidden;}
.mast::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:repeating-linear-gradient(-45deg,transparent,transparent 22px,rgba(12,32,60,.12) 22px,rgba(12,32,60,.12) 23px);pointer-events:none;}
.mast-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 0;gap:12px;flex-wrap:wrap;position:relative;}
.brand-name{font-family:var(--DI);font-size:30px;letter-spacing:5px;background:linear-gradient(90deg,var(--E1b) 0%,var(--BUSb) 55%,var(--E2b) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;}
.brand-sub{font-family:var(--MO);font-size:8px;color:var(--TM);letter-spacing:2px;margin-top:2px;}
.v2badge{background:linear-gradient(135deg,var(--OK),var(--J));color:#000;font-family:var(--DI);font-size:12px;letter-spacing:2px;padding:2px 10px;margin-left:10px;}
.spec-strip{display:flex;gap:18px;flex-wrap:wrap;}
.spec-chip-v{font-family:var(--DI);font-size:17px;color:var(--BUSb);letter-spacing:2px;}
.spec-chip-k{font-family:var(--MO);font-size:7px;color:var(--TM);letter-spacing:2px;}
.sys-dots{display:flex;gap:12px;}
.dot-item{display:flex;flex-direction:column;align-items:center;gap:2px;}
.dot{width:9px;height:9px;border-radius:50%;}
.dot.on{animation:pu 1.8s ease-in-out infinite;}
@keyframes pu{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.dot-lbl{font-family:var(--MO);font-size:7px;letter-spacing:1.5px;}
.dot-val{font-family:var(--MO);font-size:8px;}

/* TABS */
.tabs{display:flex;background:var(--ink);border-bottom:1px solid var(--line);padding:0 28px;overflow-x:auto;}
.tab{padding:11px 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;color:var(--TL);border-bottom:2px solid transparent;transition:all .15s;background:none;border-top:none;border-left:none;border-right:none;font-family:var(--SA);white-space:nowrap;}
.tab:hover{color:var(--TM);}
.tab.ac{color:var(--E1);border-bottom-color:var(--E1);}
.tab.new{position:relative;}
.tab.new::after{content:'NEW';position:absolute;top:4px;right:2px;font-size:6px;background:var(--OK);color:#000;padding:1px 4px;font-family:var(--MO);}

.body{padding:18px 28px;display:flex;flex-direction:column;gap:14px;}
.row{display:flex;gap:14px;flex-wrap:wrap;}
.col{display:flex;flex-direction:column;gap:14px;}

/* PANELS */
.panel{background:var(--p1);border:1px solid var(--line);position:relative;}
.panel[data-lbl]::before{content:attr(data-lbl);position:absolute;top:0;left:0;font-family:var(--MO);font-size:7px;letter-spacing:1.5px;padding:3px 10px;background:var(--line);color:var(--TM);text-transform:uppercase;z-index:2;}
.pi{padding:26px 16px 16px;}
.pi.nl{padding:16px;}
.e1t{border-top:2px solid var(--E1);}
.e2t{border-top:2px solid var(--E2);}
.but{border-top:2px solid var(--BUS);}
.okt{border-top:2px solid var(--OK);}
.ert{border-top:2px solid var(--ER);}
.put{border-top:2px solid var(--PU);}
.jt{border-top:2px solid var(--J);}
.sct{border-top:2px solid var(--SC);}
.wnt{border-top:2px solid var(--WN);}

/* SH */
.sh{font-family:var(--MO);font-size:8px;letter-spacing:3px;color:var(--TM);text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.sh::after{content:'';flex:1;height:1px;background:var(--line);}
.sh.j{color:var(--Jb);}
.sh.sc{color:var(--SCb);}
.sh.co{color:var(--COb);}
.sh.e1{color:var(--E1);}
.sh.e2{color:var(--E2);}

/* ST TABLE */
.st{width:100%;border-collapse:collapse;font-size:13px;}
.st td{padding:5px 10px;border-bottom:1px solid var(--line);}
.st td:first-child{color:var(--TM);font-family:var(--MO);font-size:9px;letter-spacing:.5px;text-transform:uppercase;width:50%;}
.st td:last-child{font-weight:700;text-align:right;color:var(--E1b);}
.st tr:last-child td{border-bottom:none;}
.st .hr td{color:var(--TX)!important;font-size:9px!important;font-weight:700;background:var(--p3);letter-spacing:2px!important;}
.st .gc td:last-child{color:var(--OK);}
.st .rc td:last-child{color:var(--ER2);}
.st .wc td:last-child{color:var(--WN);}
.st .jc td:last-child{color:var(--Jb);}
.st .sc2 td:last-child{color:var(--SCb);}
.st .e2c td:last-child{color:var(--E2b);}
.st .e1c td:last-child{color:var(--E1b);}
.st .bc td:last-child{color:var(--BUSb);}
.st .pc td:last-child{color:var(--PUb);}

/* CALLOUT */
.co{border-left:3px solid;padding:9px 13px;margin:8px 0;font-family:var(--MO);font-size:9px;line-height:1.7;}
.co.ok{border-color:var(--OK);color:var(--OK);background:rgba(18,100,40,.12);}
.co.er{border-color:var(--ER);color:var(--ER2);background:rgba(60,0,0,.12);}
.co.inf{border-color:var(--BUS);color:var(--BUSb);background:rgba(8,24,52,.2);}
.co.wn{border-color:var(--WN);color:var(--WN);background:rgba(40,32,0,.15);}
.co.j{border-color:var(--J);color:var(--Jb);background:rgba(0,50,30,.15);}
.co.sc{border-color:var(--SC);color:var(--SCb);background:rgba(50,0,60,.15);}
.co.pu{border-color:var(--PU);color:var(--PUb);background:rgba(40,0,60,.15);}

/* GAUGE */
.grow{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}
.gwrap{display:flex;flex-direction:column;align-items:center;gap:3px;}
.glbl{font-family:var(--MO);font-size:7px;letter-spacing:1px;color:var(--TM);text-transform:uppercase;}

/* COMM DIAGRAM */
.comm-lane{display:flex;flex-direction:column;gap:6px;}
.msg-pill{font-family:var(--MO);font-size:8px;padding:3px 10px;border:1px solid;border-radius:1px;display:inline-block;letter-spacing:.5px;}

/* STATUS BADGE */
.sbadge{font-family:var(--MO);font-size:9px;padding:3px 10px;letter-spacing:1px;font-weight:700;border:1px solid;display:inline-flex;align-items:center;gap:6px;}
.sbadge.ok{color:var(--OK);border-color:var(--OK);background:rgba(18,100,40,.15);}
.sbadge.warn{color:var(--WN);border-color:var(--WN);background:rgba(60,50,0,.15);}
.sbadge.run{color:var(--E1b);border-color:var(--E1);background:rgba(60,40,0,.15);}
.sbadge.spin{color:var(--E2b);border-color:var(--E2);background:rgba(0,50,55,.15);}
.sbadge.cold{color:var(--TM);border-color:var(--line2);background:transparent;}
.sbadge-dot{width:7px;height:7px;border-radius:50%;}

/* SURGE METER */
.surge-track{height:28px;background:var(--ink);position:relative;overflow:hidden;border:1px solid var(--line2);}
.surge-zones{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;}
.surge-fill{height:100%;transition:width .3s ease;position:absolute;top:0;left:0;}
.surge-label{position:absolute;right:8px;top:50%;transform:translateY(-50%);font-family:var(--MO);font-size:10px;font-weight:700;}
.threshold-line{position:absolute;top:0;bottom:0;width:2px;opacity:.8;}

/* TILES */
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:8px;}
.tile{background:var(--p2);border:1px solid var(--line);padding:9px 12px;border-left:3px solid var(--line2);}
.tile.j{border-left-color:var(--J);}
.tile.sc{border-left-color:var(--SC);}
.tile.co{border-left-color:var(--CO);}
.tile.e1{border-left-color:var(--E1);}
.tile.e2{border-left-color:var(--E2);}
.tile.ok{border-left-color:var(--OK);}
.tk{font-family:var(--MO);font-size:7px;letter-spacing:2px;color:var(--TM);text-transform:uppercase;margin-bottom:4px;}
.tv{font-family:var(--DI);font-size:19px;letter-spacing:1px;line-height:1;}
.tu{font-size:10px;color:var(--TM);margin-left:2px;}
.ts{font-size:11px;color:var(--TL);margin-top:3px;}

/* STAGE STEP */
.step{display:flex;gap:12px;align-items:flex-start;padding:7px 0;border-bottom:1px solid var(--line);}
.step:last-child{border-bottom:none;}
.snum{width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-family:var(--MO);font-size:9px;font-weight:700;flex-shrink:0;}
.sbody .st2{font-size:14px;font-weight:600;}
.sbody .ss{font-family:var(--MO);font-size:9px;color:var(--TM);margin-top:2px;line-height:1.5;}

/* FLOW ANIM */
@keyframes fR{from{stroke-dashoffset:20}to{stroke-dashoffset:0}}
@keyframes fL{from{stroke-dashoffset:0}to{stroke-dashoffset:20}}
.fj{stroke:#20d890;stroke-width:2;fill:none;stroke-dasharray:6 4;animation:fR .45s linear infinite;}
.fsc{stroke:#e060f0;stroke-width:2;fill:none;stroke-dasharray:6 4;animation:fR .45s linear infinite;}
.fco{stroke:#6090ff;stroke-width:1.5;fill:none;stroke-dasharray:5 5;animation:fR .6s linear infinite;}
.fe1{stroke:#f0a010;stroke-width:2.5;fill:none;stroke-dasharray:7 4;animation:fR .5s linear infinite;}
.fe2{stroke:#10c8d0;stroke-width:2.5;fill:none;stroke-dasharray:7 4;animation:fR .5s linear infinite;}
.fbu{stroke:#2880f0;stroke-width:2;fill:none;stroke-dasharray:8 4;animation:fR .38s linear infinite;}
`;

/* ── GAUGE ── */
function G({value,min,max,label,unit,size=86,color="#f0a010",warn,danger,dec=0,alert}){
  const pct=Math.max(0,Math.min(1,(value-min)/(max-min)));
  const r=size/2-10,cx=size/2,cy=size/2+5;
  const xy=d=>({x:cx+r*Math.cos(d*Math.PI/180),y:cy+r*Math.sin(d*Math.PI/180)});
  const arc=(a1,a2,c)=>{const s=xy(a1),e=xy(a2),lg=Math.abs(a2-a1)>180?1:0;
    return<path d={`M${s.x},${s.y}A${r},${r}0 ${lg}1${e.x},${e.y}`}stroke={c}strokeWidth="4"fill="none"strokeLinecap="round"/>;};
  const ang=-225+pct*270,tip=xy(ang);
  let vc=color;
  if(danger!==undefined&&value>=danger)vc="#f02020";
  else if(warn!==undefined&&value>=warn)vc="#d8c010";
  if(alert&&value<=alert)vc="#f02020";
  return(<div className="gwrap">
    <svg width={size}height={size}style={{overflow:"visible"}}>
      {arc(-225,45,"#0c1c30")}{arc(-225,ang,vc)}
      <line x1={cx}y1={cy}x2={tip.x}y2={tip.y}stroke={vc}strokeWidth="1.5"strokeLinecap="round"/>
      <circle cx={cx}cy={cy}r="3"fill={vc}/>
      <text x={cx}y={cy+16}textAnchor="middle"fill={vc}fontSize="11"fontFamily="'JetBrains Mono'"fontWeight="700">{value.toFixed(dec)}</text>
      <text x={cx}y={cy+25}textAnchor="middle"fill="#3a5878"fontSize="7"fontFamily="'JetBrains Mono'">{unit}</text>
    </svg>
    <div className="glbl">{label}</div>
  </div>);
}

/* ══════════════════════════════════════════════════════
   COMMUNICATION ARCHITECTURE DIAGRAM
   Three layers: J1939 | s-CAN | CANopen
   ══════════════════════════════════════════════════════ */
function CommDiagram(){
  const[off,setOff]=useState(0);
  useEffect(()=>{const iv=setInterval(()=>setOff(o=>(o+1)%20),50);return()=>clearInterval(iv);},[]);
  return(
    <svg width="100%"viewBox="0 0 860 480"style={{maxWidth:"100%",minHeight:"280px"}}>
      <defs>
        {[["aJ","#20d890"],["aSC","#e060f0"],["aCO","#6090ff"],["aE1","#f0a010"],["aE2","#10c8d0"],["aBU","#2880f0"]].map(([id,c])=>(
          <marker key={id}id={id}markerWidth="6"markerHeight="5"refX="6"refY="2.5"orient="auto"><polygon points="0 0,6 2.5,0 5"fill={c}/></marker>
        ))}
      </defs>

      {/* ═══ LAYER LABELS (left spine) ═══ */}
      {[["L1","J1939 CAN BUS","Per-engine ECM ↔ PCC3300","250kbps · 10ms cycle","#20d890",40],
        ["L2","s-CAN NETWORK","PCC3300 ↔ PCC3300","Masterless Load Demand","#e060f0",200],
        ["L3","CANopen / MODBUS","PCC3300s ↔ Master HMI","Anti-surge · Staging · IoT","#6090ff",355],
      ].map(([lv,t,d1,d2,c,y])=>(
        <g key={lv}>
          <rect x={2}y={y}width={110}height={78}fill="var(--p2)"stroke={c}strokeWidth="1"rx="2"/>
          <text x={57}y={y+16}textAnchor="middle"fill={c}fontSize="8"fontFamily="'JetBrains Mono'"fontWeight="700"letterSpacing="1">{lv}</text>
          <text x={57}y={y+30}textAnchor="middle"fill={c}fontSize="7"fontFamily="'JetBrains Mono'"fontWeight="700">{t}</text>
          <text x={57}y={y+44}textAnchor="middle"fill="#3a6080"fontSize="6"fontFamily="'JetBrains Mono'">{d1}</text>
          <text x={57}y={y+55}textAnchor="middle"fill="#3a6080"fontSize="6"fontFamily="'JetBrains Mono'">{d2}</text>
        </g>
      ))}

      {/* ═══ ENGINE 1 ECM ═══ */}
      <rect x={130}y={20}width={140}height={120}fill="#0e1808"stroke="#f0a010"strokeWidth="2"rx="2"/>
      <text x={200}y={42}textAnchor="middle"fill="#f0a010"fontSize="9"fontFamily="'JetBrains Mono'"fontWeight="700">E1 — QSX15 ECM</text>
      <text x={200}y={55}textAnchor="middle"fill="#806010"fontSize="7"fontFamily="'JetBrains Mono'">Broadcasts J1939 PGNs:</text>
      {[["EEC1","RPM + Throttle",70],["EEC2","Load % + Fuel Rate",83],["ET1","Coolant/Oil Temp",96],["EOI","Oil Pressure",109],["IC1","Intake Manifold Press",122]].map(([pgn,d,y])=>(
        <g key={pgn}>
          <text x={140}y={y}fill="#20d890"fontSize="7"fontFamily="'JetBrains Mono'"fontWeight="700">{pgn}:</text>
          <text x={183}y={y}fill="#3a6050"fontSize="7"fontFamily="'JetBrains Mono'">{d}</text>
        </g>
      ))}

      {/* J1939 E1 ECM → PCC3300 #1 */}
      <path className="fj"d={`M270 80 L330 80`}markerEnd="url(#aJ)"/>
      <text x={300}y={74}textAnchor="middle"fill="#20d890"fontSize="7"fontFamily="'JetBrains Mono'">J1939</text>
      <text x={300}y={90}textAnchor="middle"fill="#1a4030"fontSize="6"fontFamily="'JetBrains Mono'">10ms</text>

      {/* ═══ PCC3300 #1 ═══ */}
      <rect x={330}y={20}width={160}height={440}fill="#080c20"stroke="#2880f0"strokeWidth="1.5"rx="2"/>
      <text x={410}y={42}textAnchor="middle"fill="#2880f0"fontSize="8"fontFamily="'JetBrains Mono'"fontWeight="700"letterSpacing="1">PCC3300 #1</text>
      <text x={410}y={54}textAnchor="middle"fill="#1a3060"fontSize="7"fontFamily="'JetBrains Mono'">ENGINE 1 CONTROLLER</text>

      {/* PCC3300-1 internals */}
      {[
        {t:"VOLTAGE REG",s:"AVR digital PWM",y:70,c:"#f0a010"},
        {t:"GOV CONTROL",s:"Droop/Isochronous",y:95,c:"#f0a010"},
        {t:"SYNC CHECK",s:"ANSI 25 permissive",y:120,c:"#2880f0"},
        {t:"PROTECTION",s:"27/59/81/32 ANSI",y:145,c:"#f02020"},
        {t:"kW/kVAR METER",s:"CT inputs 3-phase",y:170,c:"#2880f0"},
        {t:"J1939 RECEIVE",s:"ECM data parse",y:195,c:"#20d890"},
        {t:"s-CAN PORT",s:"MLD link to PCC2",y:220,c:"#e060f0"},
        {t:"MODBUS/RS485",s:"Master HMI link",y:245,c:"#6090ff"},
      ].map(f=>(
        <g key={f.t}>
          <rect x={338}y={f.y-10}width={144}height={17}fill="var(--p3)"stroke={`${f.c}30`}strokeWidth="1"rx="1"/>
          <text x={342}y={f.y+2}fill={f.c}fontSize="7"fontFamily="'JetBrains Mono'"fontWeight="700">{f.t}</text>
          <text x={342}y={f.y+11}fill="#304060"fontSize="6"fontFamily="'JetBrains Mono'">{f.s}</text>
        </g>
      ))}

      {/* CB1 symbol inside PCC column */}
      <rect x={368}y={278}width={84}height={24}fill="#1a0e00"stroke="#f0a010"strokeWidth="1"rx="1"/>
      <text x={410}y={289}textAnchor="middle"fill="#f0a010"fontSize="7"fontFamily="'JetBrains Mono'"fontWeight="700">CB1 — 1200A CONTROL</text>
      <text x={410}y={298}textAnchor="middle"fill="#20d850"fontSize="6"fontFamily="'JetBrains Mono'">CLOSE / OPEN / POSITION</text>

      {/* ENGINE 2 ECM */}
      <rect x={595}y={20}width={140}height={120}fill="#081818"stroke="#10c8d0"strokeWidth="2"rx="2"/>
      <text x={665}y={42}textAnchor="middle"fill="#10c8d0"fontSize="9"fontFamily="'JetBrains Mono'"fontWeight="700">E2 — QSX15 ECM</text>
      <text x={665}y={55}textAnchor="middle"fill="#107880"fontSize="7"fontFamily="'JetBrains Mono'">Broadcasts J1939 PGNs:</text>
      {[["EEC1","RPM + Throttle",70],["EEC2","Load % + Fuel Rate",83],["ET1","Coolant/Oil Temp",96],["EOI","Oil Pressure",109],["VEP1","Battery Voltage",122]].map(([pgn,d,y])=>(
        <g key={pgn}>
          <text x={605}y={y}fill="#20d890"fontSize="7"fontFamily="'JetBrains Mono'"fontWeight="700">{pgn}:</text>
          <text x={648}y={y}fill="#1a5040"fontSize="7"fontFamily="'JetBrains Mono'">{d}</text>
        </g>
      ))}

      {/* J1939 PCC3300-2 → E2 ECM */}
      <path className="fj"d={`M595 80 L530 80`}markerEnd="url(#aJ)"/>
      <text x={562}y={74}textAnchor="middle"fill="#20d890"fontSize="7"fontFamily="'JetBrains Mono'">J1939</text>
      <text x={562}y={90}textAnchor="middle"fill="#1a4030"fontSize="6"fontFamily="'JetBrains Mono'">10ms</text>

      {/* PCC3300 #2 */}
      <rect x={490}y={20}width={160}height={440}fill="#080c20"stroke="#10c8d0"strokeWidth="1.5"rx="2"/>
      <text x={570}y={42}textAnchor="middle"fill="#10c8d0"fontSize="8"fontFamily="'JetBrains Mono'"fontWeight="700"letterSpacing="1">PCC3300 #2</text>
      <text x={570}y={54}textAnchor="middle"fill="#0a3040"fontSize="7"fontFamily="'JetBrains Mono'">ENGINE 2 CONTROLLER</text>
      {[
        {t:"VOLTAGE REG",s:"AVR digital PWM",y:70,c:"#10c8d0"},
        {t:"GOV CONTROL",s:"Droop/Isochronous",y:95,c:"#10c8d0"},
        {t:"SYNC CHECK",s:"ANSI 25 permissive",y:120,c:"#2880f0"},
        {t:"PROTECTION",s:"27/59/81/32 ANSI",y:145,c:"#f02020"},
        {t:"kW/kVAR METER",s:"CT inputs 3-phase",y:170,c:"#2880f0"},
        {t:"J1939 RECEIVE",s:"ECM data parse",y:195,c:"#20d890"},
        {t:"s-CAN PORT",s:"MLD link to PCC1",y:220,c:"#e060f0"},
        {t:"MODBUS/RS485",s:"Master HMI link",y:245,c:"#6090ff"},
      ].map(f=>(
        <g key={f.t}>
          <rect x={498}y={f.y-10}width={144}height={17}fill="var(--p3)"stroke={`${f.c}30`}strokeWidth="1"rx="1"/>
          <text x={502}y={f.y+2}fill={f.c}fontSize="7"fontFamily="'JetBrains Mono'"fontWeight="700">{f.t}</text>
          <text x={502}y={f.y+11}fill="#304060"fontSize="6"fontFamily="'JetBrains Mono'">{f.s}</text>
        </g>
      ))}
      <rect x={528}y={278}width={84}height={24}fill="#001a1a"stroke="#10c8d0"strokeWidth="1"rx="1"/>
      <text x={570}y={289}textAnchor="middle"fill="#10c8d0"fontSize="7"fontFamily="'JetBrains Mono'"fontWeight="700">CB2 — 1200A CONTROL</text>
      <text x={570}y={298}textAnchor="middle"fill="#20d850"fontSize="6"fontFamily="'JetBrains Mono'">CLOSE / OPEN / POSITION</text>

      {/* ═══ s-CAN LINK (PCC1 ↔ PCC2) ═══ */}
      <path className="fsc"d={`M490 220 L490 310 L330 310`}markerEnd="url(#aSC)"/>
      <path className="fsc"d={`M330 220 L330 305 L490 305`}markerEnd="url(#aSC)"/>
      <rect x={370}y={316}width={120}height={40}fill="#180818"stroke="#e060f0"strokeWidth="1"rx="2"/>
      <text x={430}y={330}textAnchor="middle"fill="#e060f0"fontSize="7"fontFamily="'JetBrains Mono'"fontWeight="700">s-CAN NETWORK</text>
      <text x={430}y={341}textAnchor="middle"fill="#8030a0"fontSize="6"fontFamily="'JetBrains Mono'">MASTERLESS LOAD DEMAND</text>
      <text x={430}y={352}textAnchor="middle"fill="#602080"fontSize="6"fontFamily="'JetBrains Mono'">kW · kVAR · RPM · STATUS · FAULTS</text>

      {/* ═══ MASTER HMI / DC-900 CONTROLLER ═══ */}
      <rect x={310}y={380}width={240}height={88}fill="#08081c"stroke="#6090ff"strokeWidth="2"rx="2"/>
      <text x={430}y={398}textAnchor="middle"fill="#6090ff"fontSize="9"fontFamily="'JetBrains Mono'"fontWeight="700"letterSpacing="1">DC-900 MASTER HMI</text>
      <text x={430}y={410}textAnchor="middle"fill="#304070"fontSize="7"fontFamily="'JetBrains Mono'">Anti-Surge Engine · Staging Logic · Security Reserve</text>
      <text x={430}y={422}textAnchor="middle"fill="#304070"fontSize="7"fontFamily="'JetBrains Mono'">Receives: ALL J1939 params from BOTH engines via PCC</text>
      <text x={430}y={434}textAnchor="middle"fill="#304070"fontSize="7"fontFamily="'JetBrains Mono'">Decisions: E2 Start / Stop / Surge Alert / Load Shed</text>
      <text x={430}y={446}textAnchor="middle"fill="#304070"fontSize="7"fontFamily="'JetBrains Mono'">Output: Touchscreen · Cloud IoT · Remote alarm</text>
      <text x={430}y={460}textAnchor="middle"fill="#6090ff"fontSize="7"fontFamily="'JetBrains Mono'">CANopen / Modbus RTU 9600 baud from each PCC3300</text>

      {/* CANopen links PCC → Master */}
      <path className="fco"d={`M410 380 L410 310`}markerEnd="url(#aCO)"/>
      <path className="fco"d={`M450 380 L450 316 L450 310`}markerEnd="url(#aCO)"/>

      {/* Internal bus */}
      <rect x={330}y={464}width={320}height={12}fill="#0a1828"stroke="#2880f0"strokeWidth="1"/>
      <text x={490}y={474}textAnchor="middle"fill="#2880f0"fontSize="6"fontFamily="'JetBrains Mono'"letterSpacing="2">480V INTERNAL BUS — 2000A</text>

      {/* Power flows to bus */}
      <path className="fe1"d={`M410 302 L410 464`}markerEnd="url(#aE1)"/>
      <path className="fe2"d={`M570 302 L570 464`}markerEnd="url(#aE2)"/>

      {/* Legend */}
      {[["#20d890","J1939 CAN (ECM→PCC)"],["#e060f0","s-CAN (PCC↔PCC MLD)"],["#6090ff","CANopen/Modbus (PCC→HMI)"],["#f0a010","E1 Power"],["#10c8d0","E2 Power"]].map(([c,l],i)=>(
        <g key={i}><line x1={10+i*168}y1={476}x2={34+i*168}y2={476}stroke={c}strokeWidth="2"strokeDasharray="6,3"/>
        <text x={38+i*168}y={479}fill="#3a6080"fontSize="7"fontFamily="'JetBrains Mono'">{l}</text></g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   ANTI-SURGE LOGIC DIAGRAM (state machine visualization)
   ══════════════════════════════════════════════════════ */
function AntSurgeDiagram({e1hz,e1rpm,e1v,e1kw}){
  const[t,setT]=useState(0);
  useEffect(()=>{const iv=setInterval(()=>setT(x=>x+1),800);return()=>clearInterval(iv);},[]);

  const states=[
    {id:"NORM",label:"NORMAL OPERATION",sub:`E1 ${e1kw.toFixed(0)}kW · ${e1hz.toFixed(2)}Hz · ${e1v.toFixed(0)}V`,c:"#18d850",active:e1kw<350&&e1hz>59.5&&e1v>468},
    {id:"WATCH",label:"THRESHOLD WATCH",sub:"Load > 72% OR Hz < 59.7 OR V < 470V",c:"#d8c010",active:e1kw>=350||e1hz<=59.7||e1v<=470},
    {id:"PRESTART",label:"E2 PRE-START",sub:"Heating E2 coolant · Priming fuel",c:"#f0a010",active:false},
    {id:"START",label:"E2 AUTO-START",sub:"Cranking · Oil rise · Hz/V match",c:"#10c8d0",active:false},
    {id:"SYNC",label:"AUTO-SYNC",sub:"ΔHz < 0.1 · ΔV < 2% · CB2 close",c:"#6090ff",active:false},
    {id:"SHARE",label:"LOAD SHARING",sub:"Both engines · equal kW · stable",c:"#18d850",active:false},
  ];

  return(
    <div style={{position:"relative"}}>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
        {states.map((s,i)=>(
          <div key={s.id} style={{
            background:s.active?`${s.c}22`:"var(--p2)",
            border:`1px solid ${s.active?s.c:var_:"var(--line)"}`,
            padding:"8px 12px",flex:"1",minWidth:"110px",
            transition:"all .3s",
            borderLeft:`3px solid ${s.active?s.c:"var(--line2)"}`,
          }}>
            <div style={{fontFamily:"var(--MO)",fontSize:"8px",color:s.active?s.c:"var(--TL)",fontWeight:"700",letterSpacing:"1px",marginBottom:"4px"}}>{s.id}</div>
            <div style={{fontSize:"12px",fontWeight:"600",color:s.active?s.c:"var(--TM)"}}>{s.label}</div>
            <div style={{fontFamily:"var(--MO)",fontSize:"7px",color:s.active?"var(--TX)":"var(--TL)",marginTop:"3px"}}>{s.sub}</div>
            {s.active&&<div style={{fontFamily:"var(--MO)",fontSize:"7px",color:s.c,marginTop:"4px",letterSpacing:"1px"}}>◉ ACTIVE</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function var_(){return "var(--line)";}

/* ══════════════════════════════════════════════════════
   LIVE ANTI-SURGE SIMULATOR
   ══════════════════════════════════════════════════════ */
function AntSurgeSimulator(){
  const[e1Load,setE1Load]=useState(280);
  const[mode,setMode]=useState("EFFICIENCY");
  const e1Hz=60-(e1Load/450)*0.4;
  const e1V=480-(e1Load/450)*12;
  const e1RPM=1800-(e1Load/450)*8;

  // Thresholds
  const T_HZ=59.7, T_V=470, T_RPM=1792, T_LOAD_PCT=72;
  const T_HZ_CRIT=59.5, T_V_CRIT=460, T_RPM_CRIT=1788;

  const watch=e1Hz<=T_HZ||e1V<=T_V||e1RPM<=T_RPM||(e1Load/450*100)>=T_LOAD_PCT;
  const crit=e1Hz<=T_HZ_CRIT||e1V<=T_V_CRIT||e1RPM<=T_RPM_CRIT;

  const stateColor=crit?"var(--ER)":watch?"var(--WN)":"var(--OK)";
  const stateLabel=crit?"⚡ SURGE RISK — E2 STARTING":"THRESHOLD WATCH":watch?"⚠ PRE-TRIGGER — E2 WARMING":"✓ NORMAL";
  const stateMsg=crit?"E2 auto-starts immediately. Pre-start already complete if in SECURE mode.":watch?"One or more parameters approaching trigger threshold. E2 begins warm-up in SECURE/ADAPTIVE modes.":"All parameters within normal operating band. E2 in standby per selected mode.";

  const triggerReasons=[];
  if((e1Load/450*100)>=T_LOAD_PCT)triggerReasons.push(`Load ${(e1Load/450*100).toFixed(0)}% ≥ ${T_LOAD_PCT}% threshold`);
  if(e1Hz<=T_HZ)triggerReasons.push(`Freq ${e1Hz.toFixed(2)}Hz ≤ ${T_HZ}Hz threshold`);
  if(e1V<=T_V)triggerReasons.push(`Voltage ${e1V.toFixed(0)}V ≤ ${T_V}V threshold`);
  if(e1RPM<=T_RPM)triggerReasons.push(`RPM ${e1RPM.toFixed(0)} ≤ ${T_RPM} threshold`);

  return(
    <div>
      <div className="sh e1">ANTI-SURGE PARAMETER MONITOR — LIVE SIMULATION</div>
      <div style={{display:"flex",gap:"12px",alignItems:"center",marginBottom:"14px",flexWrap:"wrap"}}>
        <div style={{fontFamily:"var(--MO)",fontSize:"8px",color:"var(--TM)"}}>E1 LOAD:</div>
        <input type="range"min="50"max="450"value={e1Load}onChange={e=>setE1Load(+e.target.value)}style={{flex:1,minWidth:"150px"}}/>
        <div style={{fontFamily:"var(--MO)",fontSize:"18px",color:"var(--E1b)",fontFamily:"var(--DI)",letterSpacing:"2px"}}>{e1Load} kW</div>
      </div>
      <div style={{marginBottom:"12px",display:"flex",gap:"8px",flexWrap:"wrap"}}>
        {[["SECURE","E2 hot standby @ 800 RPM always"],["ADAPTIVE","E2 idles when watch triggers"],["EFFICIENCY","E2 cold — starts on threshold"]].map(([m,d])=>(
          <button key={m}onClick={()=>setMode(m)}style={{
            padding:"6px 14px",fontFamily:"var(--MO)",fontSize:"9px",letterSpacing:"1px",
            cursor:"pointer",border:`1px solid ${mode===m?"var(--E1)":"var(--line)"}`,
            background:mode===m?"var(--p3)":"var(--p1)",color:mode===m?"var(--E1b)":"var(--TM)",
            display:"flex",flexDirection:"column",gap:"2px"
          }}>
            <span style={{fontWeight:"700"}}>{m}</span>
            <span style={{fontSize:"7px",color:"var(--TL)"}}>{d}</span>
          </button>
        ))}
      </div>

      {/* Parameter bars with thresholds */}
      {[
        {label:"FREQ (Hz)",value:e1Hz,min:59.0,max:60.5,warn:T_HZ,crit:T_HZ_CRIT,unit:"Hz",dec:2,invert:true},
        {label:"VOLTAGE",value:e1V,min:450,max:485,warn:T_V,crit:T_V_CRIT,unit:"V",dec:0,invert:true},
        {label:"ENGINE RPM",value:e1RPM,min:1782,max:1803,warn:T_RPM,crit:T_RPM_CRIT,unit:"RPM",dec:0,invert:true},
        {label:"LOAD %",value:e1Load/450*100,min:0,max:100,warn:T_LOAD_PCT,crit:85,unit:"%",dec:1,invert:false},
      ].map(p=>{
        const pct=((p.value-p.min)/(p.max-p.min))*100;
        const wPct=((p.warn-p.min)/(p.max-p.min))*100;
        const cPct=((p.crit-p.min)/(p.max-p.min))*100;
        const isCrit=p.invert?p.value<=p.crit:p.value>=p.crit;
        const isWarn=p.invert?p.value<=p.warn:p.value>=p.warn;
        const bc=isCrit?"var(--ER)":isWarn?"var(--WN)":"var(--E2)";
        return(
          <div key={p.label}style={{marginBottom:"10px"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontFamily:"var(--MO)",fontSize:"9px",marginBottom:"3px"}}>
              <span style={{color:bc}}>{p.label}</span>
              <span style={{color:bc}}>{p.value.toFixed(p.dec)} {p.unit}</span>
              <span style={{color:isCrit?"var(--ER)":isWarn?"var(--WN)":"var(--TL)"}}>{isCrit?"CRITICAL TRIGGER":isWarn?"PRE-TRIGGER":"NORMAL"}</span>
            </div>
            <div style={{height:"14px",background:"var(--ink)",position:"relative",overflow:"hidden",border:"1px solid var(--line)"}}>
              <div style={{position:"absolute",left:`${Math.min(100,pct)}%`,top:0,bottom:0,width:"3px",background:bc,transition:"left .3s"}}/>
              <div style={{position:"absolute",left:`${wPct}%`,top:0,bottom:0,width:"1px",background:"var(--WN)",opacity:.7}}/>
              <div style={{position:"absolute",left:`${cPct}%`,top:0,bottom:0,width:"1px",background:"var(--ER)",opacity:.7}}/>
              <div style={{position:"absolute",left:3,top:2,fontSize:"7px",fontFamily:"var(--MO)",color:"var(--TL)"}}>MIN</div>
              <div style={{position:"absolute",right:3,top:2,fontSize:"7px",fontFamily:"var(--MO)",color:"var(--TL)"}}>MAX</div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontFamily:"var(--MO)",fontSize:"7px",color:"var(--TL)",marginTop:"2px"}}>
              <span>{p.invert?"▼":"▲"} Warn @ {p.warn}{p.unit}</span>
              <span>{p.invert?"▼":"▲"} Crit @ {p.crit}{p.unit}</span>
            </div>
          </div>
        );
      })}

      {/* System state */}
      <div style={{background:crit?"rgba(60,0,0,.2)":watch?"rgba(50,40,0,.2)":"rgba(0,40,0,.2)",border:`1px solid ${stateColor}`,padding:"10px 14px",marginTop:"8px"}}>
        <div style={{fontFamily:"var(--MO)",fontSize:"10px",color:stateColor,fontWeight:"700",marginBottom:"5px"}}>{stateLabel}</div>
        <div style={{fontSize:"13px",color:"var(--TX)"}}>{stateMsg}</div>
        {triggerReasons.length>0&&(
          <div style={{marginTop:"6px"}}>
            {triggerReasons.map((r,i)=><div key={i}style={{fontFamily:"var(--MO)",fontSize:"8px",color:"var(--WN)",marginTop:"2px"}}>▸ {r}</div>)}
          </div>
        )}
      </div>

      {/* Response time by mode */}
      <div style={{marginTop:"10px"}}>
        <div className="sh e2">E2 RESPONSE TIME BY MODE</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px"}}>
          {[
            {m:"SECURE",sub:"E2 idling @ 800RPM",t1:"3–5s",t2:"CB2 closes",c:"var(--OK)",fuel:"~2.5 GPH idle"},
            {m:"ADAPTIVE",sub:"E2 at warm idle on watch",t1:"5–8s",t2:"CB2 closes",c:"var(--WN)",fuel:"~1.5 GPH avg"},
            {m:"EFFICIENCY",sub:"E2 cold — starts on crit",t1:"10–15s",t2:"CB2 closes",c:"var(--TM)",fuel:"~0 GPH idle"},
          ].map(m=>(
            <div key={m.m}style={{background:mode===m.m?"var(--p3)":"var(--p2)",border:`1px solid ${mode===m.m?m.c:"var(--line)"}`,padding:"10px 12px"}}>
              <div style={{fontFamily:"var(--MO)",fontSize:"9px",color:m.c,fontWeight:"700"}}>{m.m}</div>
              <div style={{fontSize:"11px",color:"var(--TM)",marginTop:"3px"}}>{m.sub}</div>
              <div style={{fontFamily:"var(--MO)",fontSize:"14px",color:m.c,fontWeight:"700",marginTop:"5px"}}>{m.t1}</div>
              <div style={{fontFamily:"var(--MO)",fontSize:"8px",color:"var(--TL)",marginTop:"2px"}}>to {m.t2}</div>
              <div style={{fontFamily:"var(--MO)",fontSize:"8px",color:"var(--TL)",marginTop:"4px"}}>E2 idle: {m.fuel}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECURITY RESERVE STATE DIAGRAM
   ══════════════════════════════════════════════════════ */
function SecurityReserveDiagram(){
  const[mode,setMode]=useState("SECURE");
  return(
    <div>
      <div className="sh e2">SECURITY RESERVE — E2 STANDBY STATES</div>
      <div style={{display:"flex",gap:"8px",marginBottom:"12px",flexWrap:"wrap"}}>
        {["SECURE","ADAPTIVE","EFFICIENCY"].map(m=>(
          <button key={m}className={`tog${mode===m?" on":""}`}style={{fontFamily:"var(--MO)",fontSize:"10px"}}onClick={()=>setMode(m)}>{m}</button>
        ))}
      </div>
      {mode==="SECURE"&&(
        <div>
          <div className="co ok">SECURE MODE: E2 runs continuously at warm idle (~800 RPM). CB2 is OPEN. E2 is desynchronized but warm, pressurized, and ready. When any E1 threshold triggers, PCC3300 #2 immediately begins speed ramp to 1800 RPM → auto-sync → CB2 close in 3–5 seconds. E2 idle fuel burn: ~2.5 GPH.</div>
          <table className="st" style={{marginTop:"10px"}}>
            <tbody>
              <tr className="hr"><td colSpan="2">SECURE MODE — E2 IDLE STATE</td></tr>
              <tr className="gc"><td>E2 engine state</td><td>Running @ ~800 RPM (warm idle)</td></tr>
              <tr className="gc"><td>E2 coolant temp</td><td>82°C (maintained by thermostat)</td></tr>
              <tr className="gc"><td>E2 oil pressure</td><td>40–50 PSI (full circulation)</td></tr>
              <tr><td>CB2 state</td><td>OPEN — E2 producing no power</td></tr>
              <tr><td>E2 fuel consumption (idle)</td><td>~2.5 GPH / 9.5 L/hr</td></tr>
              <tr><td>Response to trigger</td><td>3–5 seconds to CB2 close</td></tr>
              <tr><td>What happens on trigger</td><td>PCC3300 #2 ramps E2 to 1800 RPM via J1939 governor command → auto-sync → CB2 close</td></tr>
              <tr><td>Annual idle fuel cost (2,000 hr)</td><td>~$22,500 at $4.50/gal</td></tr>
              <tr><td>Recommended for</td><td>Mission-critical: hospitals, data centers, 24/7 operations</td></tr>
            </tbody>
          </table>
        </div>
      )}
      {mode==="ADAPTIVE"&&(
        <div>
          <div className="co wn">ADAPTIVE MODE: E2 is cold when E1 load is below the WATCH threshold (72%). When E1 enters WATCH, the master HMI commands E2 to start and idle at 800 RPM (pre-warm). If E1 returns to NORMAL, E2 cools down and stops. Response time: 5–8 seconds once pre-warm is complete. Best balance of redundancy and fuel cost.</div>
          <table className="st" style={{marginTop:"10px"}}>
            <tbody>
              <tr className="hr"><td colSpan="2">ADAPTIVE MODE — E2 STATE BY E1 LOAD</td></tr>
              <tr><td>E1 load &lt; 72% (NORMAL)</td><td>E2 cold — engine off</td></tr>
              <tr className="wc"><td>E1 load 72–80% (WATCH)</td><td>E2 starts, idles at 800 RPM</td></tr>
              <tr className="gc"><td>E1 load &gt; 80% or threshold hit</td><td>E2 ramps to 1800 RPM → sync → parallel</td></tr>
              <tr><td>Warm-up time (cold to idle)</td><td>~3 min (QSX15 min warm-up)</td></tr>
              <tr><td>Idle to parallel</td><td>5–8 seconds</td></tr>
              <tr><td>Cold to parallel</td><td>~3 min + 5–8 sec = ~3.5 min worst case</td></tr>
              <tr><td>Note on cold-to-parallel</td><td>System alerts operator if E1 surges during cold-to-idle warm-up — load shed available</td></tr>
            </tbody>
          </table>
        </div>
      )}
      {mode==="EFFICIENCY"&&(
        <div>
          <div className="co inf">EFFICIENCY MODE: E2 is cold at all times. Starts only when critical threshold is crossed on E1. Response time: 10–15 seconds from cold crank to CB2 close (QSX15 start sequence). During those 10–15 seconds, E1 is alone and exposed. If E1 trips during E2 start sequence, there is a brief power gap. Not recommended for truly mission-critical applications.</div>
          <table className="st" style={{marginTop:"10px"}}>
            <tbody>
              <tr className="hr"><td colSpan="2">EFFICIENCY MODE — E2 COLD STANDBY</td></tr>
              <tr className="rc"><td>E2 engine state</td><td>Off — block heater maintaining 30–40°C</td></tr>
              <tr><td>Idle fuel cost</td><td>Zero — E2 not running</td></tr>
              <tr className="rc"><td>Response to trigger</td><td>10–15 seconds (full cold start)</td></tr>
              <tr><td>Start sequence</td><td>Crank → oil rise → warm → ramp → sync → CB2 close</td></tr>
              <tr><td>Power protection during startup</td><td>E1 alone — if E1 trips, power gap exists</td></tr>
              <tr><td>Recommended for</td><td>Non-critical loads, cost-sensitive sites, sites with ATS fallback</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const TABS=["Live Monitor","ECM Comm Layer","Anti-Surge System","Security Reserve","Trigger Thresholds","Integration Map","Full Spec"];

export default function App(){
  const[tab,setTab]=useState(0);
  const[time,setTime]=useState("");
  const[g,setG]=useState({e1rpm:1800,e1hz:60.0,e1v:480,e1kw:310,e1oil:58,e1temp:88,e1load:69,e2rpm:800,e2hz:26.7,e2v:0,e2kw:0,e2oil:42,e2temp:82,total:310,mode:"SECURE",e2state:"IDLE"});

  useEffect(()=>{
    const iv=setInterval(()=>{
      setG(x=>({...x,
        e1rpm:1800+(Math.random()-.5)*4,e1hz:60+(Math.random()-.5)*.06,e1v:480+(Math.random()-.5)*1.5,
        e1kw:310+(Math.random()-.5)*3,e1oil:58+(Math.random()-.5)*1.5,e1temp:88+(Math.random()-.5),
        e1load:69+(Math.random()-.5)*1.5,
        e2rpm:800+(Math.random()-.5)*8,e2hz:26.7+(Math.random()-.5)*.2,
        e2oil:42+(Math.random()-.5)*1,e2temp:82+(Math.random()-.5)*.5,
        total:310+(Math.random()-.5)*3,
      }));
      setTime(new Date().toLocaleTimeString());
    },700);
    return()=>clearInterval(iv);
  },[]);

  return(
    <div className="app">
      <style>{CSS}</style>

      {/* MASTHEAD */}
      <div className="mast">
        <div className="mast-inner">
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <div className="brand-name">DUALCORE 900</div>
                <div className="v2badge">v2.0</div>
              </div>
              <div className="brand-sub">DC-900 · SECURITY RESERVE + ANTI-SURGE EDITION · J1939 + s-CAN + CANopen COMM ARCHITECTURE</div>
            </div>
          </div>
          <div className="spec-strip">
            {[["900kW","STANDBY"],["SECURE","E2 STATE"],["3–5s","SURGE RESP"],["J1939+sCAN","COMM LAYER"],["ADAPTIVE","DEFAULT MODE"]].map(([v,k])=>(
              <div key={k}style={{textAlign:"center"}}>
                <div className="spec-chip-v">{v}</div>
                <div className="spec-chip-k">{k}</div>
              </div>
            ))}
          </div>
          <div className="sys-dots">
            {[
              {c:"var(--E1)",l:"E1",v:`${g.e1hz.toFixed(2)}Hz`,on:true},
              {c:"var(--E2)",l:"E2",v:`${g.e2rpm.toFixed(0)}RPM`,on:true},
              {c:"var(--J)",l:"J1939",v:"LIVE",on:true},
              {c:"var(--SC)",l:"s-CAN",v:"LINKED",on:true},
            ].map(s=>(
              <div className="dot-item"key={s.l}>
                <div className="dot on"style={{background:s.c,boxShadow:`0 0 8px ${s.c}`}}/>
                <div className="dot-lbl"style={{color:s.c}}>{s.l}</div>
                <div className="dot-val"style={{color:s.c}}>{s.v}</div>
              </div>
            ))}
            <div style={{fontFamily:"var(--MO)",fontSize:"9px",color:"var(--TM)",marginLeft:8}}>{time}</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        {[
          {t:"Live Monitor",n:false},{t:"ECM Comm Layer",n:true},{t:"Anti-Surge System",n:true},
          {t:"Security Reserve",n:true},{t:"Trigger Thresholds",n:false},{t:"Integration Map",n:false},{t:"Full Spec",n:false}
        ].map(({t,n},i)=>(
          <button key={i}className={`tab${tab===i?" ac":""}${n?" new":""}`}onClick={()=>setTab(i)}>{t}</button>
        ))}
      </div>

      {/* ── TAB 0: LIVE MONITOR ── */}
      {tab===0&&(
        <div className="body">
          {/* STATUS HEADER */}
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
            <div className="sbadge run"><div className="sbadge-dot"style={{background:"var(--E1)",boxShadow:"0 0 6px var(--E1)"}}/>E1 RUNNING · {g.e1load.toFixed(0)}% LOAD</div>
            <div className="sbadge spin"><div className="sbadge-dot"style={{background:"var(--E2)",animation:"pu 1.5s ease-in-out infinite"}}/>E2 SECURE IDLE · {g.e2rpm.toFixed(0)} RPM · CB2 OPEN</div>
            <div className="sbadge ok"><div className="sbadge-dot"style={{background:"var(--J)"}}/>J1939 ACTIVE · 10ms CYCLE</div>
            <div className="sbadge ok"style={{color:"var(--SC)",borderColor:"var(--SC)"}}><div className="sbadge-dot"style={{background:"var(--SC)"}}/>s-CAN MLD LINKED</div>
          </div>

          <div className="panel e1t"data-lbl="Engine 1 — Running · Carrying Load">
            <div className="pi">
              <div className="grow">
                <G value={g.e1rpm}min={0}max={2400}label="E1 RPM"unit="RPM"color="#f0a010"dec={0}warn={2100}danger={2150}/>
                <G value={g.e1hz}min={55}max={65}label="E1 FREQ"unit="Hz"color="#f0a010"dec={2}warn={61.5}danger={63}alert={59.7}/>
                <G value={g.e1v}min={440}max={520}label="E1 VOLTAGE"unit="V"color="#f0a010"dec={0}danger={516}alert={470}/>
                <G value={g.e1kw}min={0}max={500}label="E1 OUTPUT"unit="kW"color="#f0a010"dec={0}warn={380}danger={460}/>
                <G value={g.e1oil}min={0}max={100}label="E1 OIL PSI"unit="PSI"color="#18d850"dec={0}alert={25}/>
                <G value={g.e1temp}min={40}max={120}label="E1 COOLANT"unit="°C"color="#18d850"dec={0}warn={100}danger={104}/>
                <G value={g.e1load}min={0}max={100}label="E1 LOAD %"unit="%"color="#f0a010"dec={1}warn={72}danger={85}/>
              </div>
              <div className="co j"style={{marginTop:"10px"}}>J1939 data above is received by PCC3300 #1 via CAN bus at 10ms intervals. Master HMI reads this data from PCC3300 #1 via Modbus and evaluates anti-surge thresholds on every cycle. Any parameter crossing a threshold triggers the E2 pre-start or start command via s-CAN → PCC3300 #2.</div>
            </div>
          </div>

          <div className="panel e2t"data-lbl="Engine 2 — SECURE IDLE (Spinning Reserve) · CB2 Open">
            <div className="pi">
              <div className="grow">
                <G value={g.e2rpm}min={0}max={2000}label="E2 RPM (IDLE)"unit="RPM"color="#10c8d0"dec={0}/>
                <G value={g.e2hz}min={0}max={65}label="E2 FREQ (IDLE)"unit="Hz"color="#10c8d0"dec={1}/>
                <G value={0}min={0}max={500}label="E2 OUTPUT"unit="kW"color="#10c8d0"dec={0}/>
                <G value={g.e2oil}min={0}max={80}label="E2 OIL PSI"unit="PSI"color="#10c8d0"dec={0}/>
                <G value={g.e2temp}min={40}max={120}label="E2 COOLANT"unit="°C"color="#10c8d0"dec={0}/>
              </div>
              <div className="co ok"style={{marginTop:"10px"}}>E2 in SECURE idle — engine running, warm, oil circulating, coolant at 82°C. CB2 is OPEN. E2 is producing no power to the bus. On any E1 threshold trigger: PCC3300 #2 receives start command via s-CAN MLD link → ramps E2 to 1800 RPM → auto-sync → CB2 closes in 3–5 seconds. Zero power interruption to load.</div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 1: ECM COMM LAYER ── */}
      {tab===1&&(
        <div className="body">
          <div className="panel jt"data-lbl="DC-900 Communication Architecture — Three-Layer Stack">
            <div className="pi"><CommDiagram/></div>
          </div>
          <div className="row">
            <div className="panel jt"data-lbl="Layer 1 — J1939 CAN Bus (ECM ↔ PCC3300)"style={{flex:1,minWidth:"260px"}}>
              <div className="pi">
                <div className="co j">SAE J1939 is the industry-standard CAN bus protocol for heavy-duty diesel engines. The Cummins QSX15 ECM continuously broadcasts parameter group numbers (PGNs) on the J1939 bus. The PCC3300 is a J1939-compliant controller — it reads these broadcasts and uses the data for protection, metering, and governor control. This is not a custom protocol — it is an open SAE standard.</div>
                <table className="st"style={{marginTop:"10px"}}>
                  <tbody>
                    <tr className="hr"><td colSpan="2">J1939 KEY PARAMETER GROUPS</td></tr>
                    <tr className="jc"><td>PGN 61444 (EEC1)</td><td>Engine RPM · Torque% · Throttle%</td></tr>
                    <tr className="jc"><td>PGN 61443 (EEC2)</td><td>Engine load% · Fuel delivery% · Acc pedal</td></tr>
                    <tr className="jc"><td>PGN 65262 (ET1)</td><td>Coolant temp · Oil temp · Intake air temp</td></tr>
                    <tr className="jc"><td>PGN 65263 (EOI)</td><td>Oil pressure · Oil level (if equipped)</td></tr>
                    <tr className="jc"><td>PGN 65271 (VEP1)</td><td>Battery voltage · Alternator output</td></tr>
                    <tr className="jc"><td>PGN 65237 (IC1)</td><td>Intake manifold pressure (turbo boost)</td></tr>
                    <tr className="jc"><td>PGN 65253 (HOURS)</td><td>Engine total run hours</td></tr>
                    <tr className="jc"><td>DM1 (Active Faults)</td><td>All active fault codes (SPN/FMI pairs)</td></tr>
                    <tr className="hr"><td colSpan="2">J1939 SPECIFICATIONS</td></tr>
                    <tr><td>Physical layer</td><td>CAN 2.0B · 250 kbps</td></tr>
                    <tr><td>Cable</td><td>Shielded twisted pair (STP) 120Ω</td></tr>
                    <tr><td>Termination</td><td>120Ω at each end of network</td></tr>
                    <tr><td>Update rate (critical params)</td><td>10 ms (RPM, load%)</td></tr>
                    <tr><td>Update rate (temp, pressure)</td><td>100 ms (less time-critical)</td></tr>
                    <tr><td>Nodes on network</td><td>ECM + PCC3300 + optional gateway</td></tr>
                    <tr><td>Direction</td><td>ECM → PCC3300 (data) + PCC3300 → ECM (governor cmds)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="panel sct"data-lbl="Layer 2 — s-CAN (PCC3300 ↔ PCC3300 Masterless Load Demand)"style={{flex:1,minWidth:"260px"}}>
              <div className="pi">
                <div className="co sc">s-CAN is Cummins' proprietary serial CAN network that connects multiple PCC3300 controllers together. This enables Masterless Load Demand (MLD) — each PCC3300 shares its engine status, kW output, kVAR output, and fault state with all other PCC3300s on the network. No master controller is required for load sharing. In the DC-900, the s-CAN link is the direct channel through which PCC3300 #1 tells PCC3300 #2 "E1 is struggling — start E2 now."</div>
                <table className="st"style={{marginTop:"10px"}}>
                  <tbody>
                    <tr className="hr"><td colSpan="2">s-CAN SHARED DATA (PCC ↔ PCC)</td></tr>
                    <tr className="sc2"><td>Own kW output</td><td>Real power broadcast every cycle</td></tr>
                    <tr className="sc2"><td>Own kVAR output</td><td>Reactive power for AVR sharing</td></tr>
                    <tr className="sc2"><td>Own % rated load</td><td>Enables remote load demand decision</td></tr>
                    <tr className="sc2"><td>Own RPM</td><td>Speed shared for sync reference</td></tr>
                    <tr className="sc2"><td>Own voltage (L-L)</td><td>Used by PCC2 for pre-sync match</td></tr>
                    <tr className="sc2"><td>Own fault status</td><td>Active alarms and shutdowns</td></tr>
                    <tr className="sc2"><td>Own CB state</td><td>Open/closed/tripped</td></tr>
                    <tr className="sc2"><td>MLD Start/Stop cmd</td><td>PCC1 can command PCC2 to start</td></tr>
                    <tr className="hr"><td colSpan="2">HOW ANTI-SURGE USES s-CAN</td></tr>
                    <tr><td>Step 1</td><td>Master HMI reads E1 J1939 data via PCC3300 #1</td></tr>
                    <tr><td>Step 2</td><td>E1 RPM/Hz/V crosses pre-trigger threshold</td></tr>
                    <tr><td>Step 3</td><td>Master HMI sends "START E2" command to PCC3300 #2</td></tr>
                    <tr><td>Step 4</td><td>PCC3300 #2 relays command to E2 ECM via J1939 (crank enable)</td></tr>
                    <tr><td>Step 5</td><td>E2 ramps to 1800 RPM. PCC3300 #2 reads E2 ECM J1939 to confirm</td></tr>
                    <tr><td>Step 6</td><td>PCC3300 #2 → ANSI 25 sync check → CB2 close command</td></tr>
                    <tr><td>Also: MLD autonomous</td><td>If Master HMI fails, PCC3300s MLD logic operates independently via s-CAN — no single-point failure in control system</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: ANTI-SURGE ── */}
      {tab===2&&(
        <div className="body">
          <div className="row">
            <div className="panel e1t"data-lbl="Anti-Surge Pre-emptive Start System — Interactive"style={{flex:1.5,minWidth:"300px"}}>
              <div className="pi"><AntSurgeSimulator/></div>
            </div>
            <div className="col"style={{flex:1,minWidth:"240px"}}>
              <div className="panel sct"data-lbl="Why J1939 RPM/Voltage Sag Matters">
                <div className="pi">
                  <div className="sh sc">THE PHYSICS OF A POWER SURGE</div>
                  <div style={{fontSize:"13px",lineHeight:"1.7",color:"var(--TX)"}}>
                    <p style={{marginBottom:"10px"}}>When a large load steps onto E1 — a motor starting, a UPS switching, a compressor kicking on — the engine cannot respond instantaneously. Diesel engines have inertia. Fuel injection takes time to ramp. In those first 0.5–3 seconds, the engine slows down as the load extracts more energy than the governor can immediately replace.</p>
                    <p style={{marginBottom:"10px"}}>That slowdown is visible on J1939 <b style={{color:"var(--Jb)"}}>EEC1 → RPM</b> and <b style={{color:"var(--Jb)"}}>EEC2 → Load%</b> within 10ms of the event. It shows on the bus as a voltage sag (V drops) and frequency dip (Hz drops) within 50–200ms.</p>
                    <p>If E2 is already at 800 RPM idle (SECURE mode), the moment J1939 data shows the sag beginning, the master HMI sends the ramp command via s-CAN. E2 is at 1800 RPM and synchronized within 3–5 seconds — before the sag develops into a sustained voltage problem for connected loads.</p>
                  </div>
                </div>
              </div>
              <div className="panel jt"data-lbl="What J1939 Actually Measures — Real Params">
                <div className="pi">
                  <table className="st">
                    <tbody>
                      <tr className="hr"><td colSpan="2">PRE-SURGE INDICATORS ON J1939</td></tr>
                      <tr className="jc"><td>EEC1: Engine speed</td><td>First to drop on load step — within 10ms</td></tr>
                      <tr className="jc"><td>EEC2: Engine load %</td><td>Jumps immediately on load increase</td></tr>
                      <tr className="jc"><td>EEC2: Fuel delivery %</td><td>Governor attempting to respond</td></tr>
                      <tr className="jc"><td>IC1: Boost pressure</td><td>Drops under sudden load — turbo lag</td></tr>
                      <tr><td>Bus frequency (CT)</td><td>Drops within 100–200ms of RPM drop</td></tr>
                      <tr><td>Bus voltage (PCC3300)</td><td>Drops within 50–100ms (inductive load)</td></tr>
                      <tr className="hr"><td colSpan="2">WHY J1939 IS FASTER THAN VOLTAGE</td></tr>
                      <tr className="gc"><td>RPM sag (J1939)</td><td>Detectable in 10ms</td></tr>
                      <tr className="wc"><td>Frequency sag (PCC3300)</td><td>Detectable in 100–200ms</td></tr>
                      <tr className="rc"><td>Voltage sag (protection)</td><td>Detectable in 50–100ms</td></tr>
                      <tr className="gc"><td>DC-900 advantage</td><td>J1939 RPM data triggers E2 start BEFORE bus Hz/V drops — pre-emptive not reactive</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: SECURITY RESERVE ── */}
      {tab===3&&(
        <div className="body">
          <div className="row">
            <div className="panel e2t"data-lbl="Security Reserve — Always-On N+1 System"style={{flex:1.5,minWidth:"300px"}}>
              <div className="pi">
                <SecurityReserveDiagram/>
              </div>
            </div>
            <div className="col"style={{flex:1,minWidth:"240px"}}>
              <div className="panel okt"data-lbl="Why Traditional N+1 Isn't Enough">
                <div className="pi">
                  <div className="sh">CONVENTIONAL N+1 vs DC-900 SECURE</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
                    {[
                      {k:"Traditional N+1",c:"var(--ER2)",items:["E2 cold — engine off","Start on E1 fault/trip","10–15 sec from cold","Power gap before E2 online","Load shed likely during startup","E1 must actually fail before E2 starts"]},
                      {k:"DC-900 SECURE",c:"var(--OK)",items:["E2 warm idle — always running","Starts BEFORE E1 degrades","3–5 sec from idle","No power gap to load","E2 is already on its way up","E1 doesn't have to fail — threshold triggers"]},
                    ].map(x=>(
                      <div key={x.k}style={{background:"var(--p2)",border:`1px solid ${x.c}30`,padding:"10px 12px"}}>
                        <div style={{fontFamily:"var(--MO)",fontSize:"9px",color:x.c,fontWeight:"700",marginBottom:"8px"}}>{x.k}</div>
                        {x.items.map((i,j)=><div key={j}style={{fontSize:"12px",color:"var(--TX)",marginBottom:"4px",display:"flex",gap:"6px"}}><span style={{color:x.c,flexShrink:0}}>{x.c===var_()?"✗":"✓"}</span>{i}</div>)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="panel put"data-lbl="Spinning Reserve — Grid Engineering Concept Applied">
                <div className="pi">
                  <div className="co pu">The concept comes from utility grid engineering. "Spinning reserve" means generation capacity that is already rotating, synchronized or near-sync, able to pick up load within seconds. Large grids require 10–15% spinning reserve at all times. The DC-900 implements this at the genset level: E2 is always spinning, warm, and pre-positioned — a spinning reserve system in a single box.</div>
                  <table className="st"style={{marginTop:"10px"}}>
                    <tbody>
                      <tr className="hr"><td colSpan="2">SPINNING RESERVE PARAMETERS — DC-900 SECURE</td></tr>
                      <tr className="e2c"><td>Reserve capacity</td><td>450kW (100% of primary engine)</td></tr>
                      <tr className="e2c"><td>Reserve availability</td><td>100% of operating time (always idling)</td></tr>
                      <tr><td>Reserve engine RPM</td><td>~800 RPM (warm idle)</td></tr>
                      <tr><td>Reserve coolant temp</td><td>82°C — fully thermalized</td></tr>
                      <tr><td>Time from reserve to full</td><td>3–5 seconds (speed + sync)</td></tr>
                      <tr><td>Grid equivalent</td><td>Frequency nadir response < 1 cycle</td></tr>
                      <tr><td>Idle fuel penalty</td><td>~2.5 GPH E2 idle = ~$11/hr at $4.50/gal</td></tr>
                      <tr><td>Break-even justification</td><td>One avoided power outage pays for months of idle fuel on any critical site</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: TRIGGER THRESHOLDS ── */}
      {tab===4&&(
        <div className="body">
          <div className="row">
            <div className="panel wnt"data-lbl="Trigger Threshold Table — All Parameters"style={{flex:2,minWidth:"320px"}}>
              <div className="pi">
                <div className="co inf">All thresholds are configurable via InPower Pro on each PCC3300 and via the DC-900 Master HMI. Factory defaults shown. Three-tier system: WATCH (pre-warm E2), TRIGGER (start E2), CRITICAL (emergency parallel + load alert).</div>
                <table className="st"style={{marginTop:"10px"}}>
                  <tbody>
                    <tr className="hr"><td>PARAMETER (J1939 SOURCE)</td><td style={{color:"var(--OK)",textAlign:"right"}}>WATCH</td></tr>
                    <tr><td></td><td style={{color:"var(--WN)",textAlign:"right"}}>TRIGGER → E2 START</td></tr>
                    <tr><td></td><td style={{color:"var(--ER2)",textAlign:"right"}}>CRITICAL → SURGE PREVENT</td></tr>

                    <tr className="hr"><td colSpan="2">FREQUENCY (PCC3300 BUS SENSOR)</td></tr>
                    <tr className="gc"><td>Freq WATCH</td><td>&lt; 59.7 Hz (&lt; –0.5% nominal)</td></tr>
                    <tr className="wc"><td>Freq TRIGGER</td><td>&lt; 59.5 Hz (&lt; –0.83%) for &gt; 1.5s</td></tr>
                    <tr className="rc"><td>Freq CRITICAL</td><td>&lt; 59.0 Hz (&lt; –1.67%) — immediate action</td></tr>

                    <tr className="hr"><td colSpan="2">VOLTAGE L-L (PCC3300 BUS SENSOR)</td></tr>
                    <tr className="gc"><td>Voltage WATCH</td><td>&lt; 472V (&lt; –1.7% nominal)</td></tr>
                    <tr className="wc"><td>Voltage TRIGGER</td><td>&lt; 468V (&lt; –2.5%) for &gt; 1.0s</td></tr>
                    <tr className="rc"><td>Voltage CRITICAL</td><td>&lt; 456V (&lt; –5%) — ANSI 27 active range</td></tr>

                    <tr className="hr"><td colSpan="2">ENGINE RPM (J1939 EEC1 — 10ms UPDATE)</td></tr>
                    <tr className="gc"><td>RPM WATCH</td><td>&lt; 1,793 RPM (&lt; –0.39%)</td></tr>
                    <tr className="wc"><td>RPM TRIGGER</td><td>&lt; 1,788 RPM (&lt; –0.67%) for &gt; 500ms</td></tr>
                    <tr className="rc"><td>RPM CRITICAL</td><td>&lt; 1,782 RPM (&lt; –1%) — fast ramp event</td></tr>

                    <tr className="hr"><td colSpan="2">E1 LOAD % (J1939 EEC2 + CT)</td></tr>
                    <tr className="gc"><td>Load WATCH</td><td>&gt; 72% of prime (323 kW)</td></tr>
                    <tr className="wc"><td>Load TRIGGER</td><td>&gt; 80% of prime (360 kW) for &gt; 30s</td></tr>
                    <tr className="rc"><td>Load CRITICAL</td><td>&gt; 90% of prime (405 kW) — immediate</td></tr>

                    <tr className="hr"><td colSpan="2">RATE OF CHANGE (dRPM/dt, dV/dt, df/dt)</td></tr>
                    <tr className="wc"><td>RPM drop rate TRIGGER</td><td>&gt; 4 RPM/s sustained drop (EEC1 J1939)</td></tr>
                    <tr className="wc"><td>Voltage drop rate TRIGGER</td><td>&gt; 2V/s sustained drop</td></tr>
                    <tr className="wc"><td>Freq drop rate TRIGGER</td><td>&gt; 0.05 Hz/s sustained drop</td></tr>
                    <tr><td>Benefit of rate-of-change</td><td>Detects large load step approaching before threshold hit — predictive, not reactive</td></tr>

                    <tr className="hr"><td colSpan="2">ENGINE HEALTH FAULTS (J1939 DM1)</td></tr>
                    <tr className="rc"><td>Low oil pressure ACTIVE fault</td><td>Immediate E2 start + E1 warning</td></tr>
                    <tr className="rc"><td>High coolant temp ACTIVE fault</td><td>Immediate E2 start + E1 warning</td></tr>
                    <tr className="rc"><td>Overspeed ACTIVE fault</td><td>E2 already running (SECURE) → instant CB2 close</td></tr>
                    <tr className="wc"><td>Low fuel level alarm</td><td>WATCH — E2 starts so site has time to respond</td></tr>

                    <tr className="hr"><td colSpan="2">TIMING — MINIMUM DELAYS (CONFIGURABLE)</td></tr>
                    <tr><td>WATCH → TRIGGER delay</td><td>30 seconds (prevents trigger on transient spikes)</td></tr>
                    <tr><td>TRIGGER → E2 crank delay</td><td>3 seconds (allows self-recovery check)</td></tr>
                    <tr><td>CRITICAL → E2 start delay</td><td>0 seconds (immediate)</td></tr>
                    <tr><td>HEALTH FAULT → E2 start delay</td><td>0 seconds (immediate — J1939 DM1)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col"style={{flex:1,minWidth:"240px"}}>
              <div className="panel jt"data-lbl="J1939 → Decision Speed Analysis">
                <div className="pi">
                  <div className="sh j">RESPONSE TIME CHAIN</div>
                  {[
                    {n:"1",t:"Load step occurs",s:"Large motor starts on E1 bus. Engine begins to slow.",c:"var(--E1)"},
                    {n:"2",t:"J1939 EEC1 broadcasts RPM sag",s:"QSX15 ECM broadcasts RPM within 10ms of speed change. PCC3300 #1 receives data.",c:"var(--Jb)"},
                    {n:"3",t:"Master HMI evaluates threshold",s:"Modbus poll every 100ms. RPM crossing detected within 110ms of event.",c:"var(--COb)"},
                    {n:"4",t:"s-CAN START command to PCC3300 #2",s:"Master HMI sends start command. s-CAN propagates to PCC3300 #2 in < 20ms.",c:"var(--SCb)"},
                    {n:"5",t:"PCC3300 #2 commands E2 ECM via J1939",s:"Governor ramp command sent to E2 ECM. Engine responds within 200ms.",c:"var(--Jb)"},
                    {n:"6",t:"E2 ramps 800→1800 RPM (SECURE mode)",s:"~2 seconds from 800 RPM idle to 1800 RPM. (EFFICIENCY mode: full cold start = 10–15s)",c:"var(--E2)"},
                    {n:"7",t:"ANSI 25 sync check satisfied",s:"ΔHz < 0.1, ΔV < 2%, Δφ < 5°. Auto-sync achieved.",c:"var(--BUSb)"},
                    {n:"8",t:"CB2 closes — load shared",s:"E2 on bus. Both engines sharing load. E1 recovers to rated speed.",c:"var(--OK)"},
                  ].map(s=>(
                    <div key={s.n}style={{display:"flex",gap:"10px",alignItems:"flex-start",padding:"5px 0",borderBottom:"1px solid var(--line)"}}>
                      <div style={{background:s.c,color:"#000",fontFamily:"var(--MO)",fontSize:"8px",fontWeight:"700",minWidth:"20px",height:"20px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{s.n}</div>
                      <div><div style={{fontSize:"13px",fontWeight:"600"}}>{s.t}</div><div style={{fontFamily:"var(--MO)",fontSize:"8px",color:"var(--TM)",marginTop:"2px"}}>{s.s}</div></div>
                    </div>
                  ))}
                  <div className="co ok"style={{marginTop:"10px"}}>TOTAL: From load step → CB2 close: approximately 3–5 seconds in SECURE mode. Comparison: traditional reactive protection (ANSI 27 low-voltage trip) doesn't start E2 until AFTER E1 has already degraded.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 5: INTEGRATION MAP ── */}
      {tab===5&&(
        <div className="body">
          <div className="panel but"data-lbl="How All Systems Integrate — v2.0 Complete Map">
            <div className="pi">
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"10px"}}>
                {[
                  {t:"J1939 → Pre-emptive Trigger",c:"var(--J)",d:"The QSX15 ECM broadcasts RPM via J1939 EEC1 every 10ms. This is the fastest available signal — faster than voltage or frequency sensors. The master HMI monitors RPM drop rate. A sustained drop of > 4 RPM/s (before the Hz or V has even moved) triggers the E2 pre-warm chain."},
                  {t:"s-CAN → Masterless Autonomy",c:"var(--SC)",d:"Cummins MLD via s-CAN means the two PCC3300s share load data and can command each other independently. If the master HMI fails, the PCC3300 s-CAN network continues to share data and the MLD logic in each PCC3300 continues to manage load demand starts autonomously. No single-point of failure in the control chain."},
                  {t:"Security Reserve → No Gap",c:"var(--E2)",d:"E2 idling at 800 RPM in SECURE mode means the response time to CB2 close is 3–5 seconds. This is comparable to a UPS static transfer switch on medium-to-large loads. Spinning reserve is the difference between 'E2 will start' and 'E2 is already started.'"},
                  {t:"Anti-Surge → Pre-emptive Not Reactive",c:"var(--WN)",d:"Traditional genset protection is reactive — it waits for a fault to occur, then trips, then the backup tries to start. The DC-900 anti-surge system is pre-emptive — it detects the conditions leading to a fault and gets E2 online before the fault occurs. The load never sees a voltage gap."},
                  {t:"ANSI 25 → Gate on CB2",c:"var(--BUS)",d:"Even with all the automation, CB2 cannot close unless the ANSI 25 sync check relay confirms all four conditions simultaneously. The sync check is hardware — not software. It is the physical gate. No amount of software error can close CB2 out of phase."},
                  {t:"Factory Calibrated Thresholds",c:"var(--OK)",d:"All J1939 thresholds, s-CAN timing, droop settings, and ANSI relay setpoints are calibrated at the factory during the 8-hour acceptance test. No field adjustment needed. Thresholds are accessible via Master HMI for site-specific tuning but are pre-set to safe defaults."},
                ].map((f,i)=>(
                  <div key={i}style={{background:"var(--p2)",border:"1px solid var(--line)",borderLeft:`3px solid ${f.c}`,padding:"12px 14px"}}>
                    <div style={{fontFamily:"var(--MO)",fontSize:"9px",color:f.c,fontWeight:"700",marginBottom:"6px",letterSpacing:"1px"}}>{f.t}</div>
                    <div style={{fontSize:"13px",lineHeight:"1.5",color:"var(--TX)"}}>{f.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 6: FULL SPEC ── */}
      {tab===6&&(
        <div className="body">
          <div className="tgrid">
            {[
              {k:"Engines",v:"2× QSX15-G9",u:"",s:"Factory-matched serial pair",cl:"e1"},
              {k:"Standby",v:"900",u:"kW",s:"1,125 kVA @ 0.8 PF",cl:"bu"},
              {k:"Prime",v:"820",u:"kW",s:"1,025 kVA (ISO 8528)",cl:"bu"},
              {k:"Oil per engine",v:"83.3",u:"L",s:"2× full-flow filters",cl:"e1"},
              {k:"Fuel @ 100%",v:"60.2",u:"GPH",s:"228 L/hr combined",cl:"e1"},
              {k:"E2 idle (SECURE)",v:"2.5",u:"GPH",s:"800 RPM warm idle",cl:"e2"},
              {k:"J1939 update rate",v:"10",u:"ms",s:"EEC1 RPM parameter",cl:"j"},
              {k:"s-CAN MLD network",v:"Active",u:"",s:"PCC3300 ↔ PCC3300",cl:"sc"},
              {k:"RPM WATCH threshold",v:"1,793",u:"RPM",s:"–0.39% nominal",cl:"e1"},
              {k:"RPM TRIGGER threshold",v:"1,788",u:"RPM",s:"–0.67% for > 500ms",cl:"e1"},
              {k:"Hz TRIGGER threshold",v:"59.5",u:"Hz",s:"–0.83% for > 1.5s",cl:"e1"},
              {k:"Voltage TRIGGER",v:"468",u:"V",s:"–2.5% nominal",cl:"e1"},
              {k:"Load TRIGGER",v:"80",u:"%",s:"360 kW for > 30s",cl:"e1"},
              {k:"SECURE mode response",v:"3–5",u:"s",s:"E2 idle → CB2 close",cl:"e2"},
              {k:"ADAPTIVE response",v:"5–8",u:"s",s:"Pre-warmed → CB2",cl:"e2"},
              {k:"EFFICIENCY response",v:"10–15",u:"s",s:"Cold start → CB2",cl:"e2"},
              {k:"Sync check (ANSI 25)",v:"Factory",u:"",s:"ΔHz < 0.1, ΔV < 2%",cl:"bu"},
              {k:"Reverse power (ANSI 32)",v:"–9",u:"kW",s:"–2% per machine",cl:"bu"},
              {k:"GFP (NEC 230.95)",v:"1,200",u:"A",s:"Required > 1000A service",cl:"bu"},
              {k:"Machine breakers",v:"1,200",u:"A",s:"65 kAIC LSIG each",cl:"bu"},
              {k:"Output breaker",v:"1,600",u:"A",s:"Factory coordinated",cl:"bu"},
              {k:"Sub-base fuel tank",v:"400",u:"USG",s:"Double-wall, single fill",cl:"e1"},
              {k:"Coolant combined",v:"115.8",u:"L",s:"2× 57.9L QSX15",cl:"e2"},
              {k:"Predictive sensors",v:"10",u:"ch.",s:"IoT cloud + local HMI",cl:"ok"},
              {k:"Weight wet (est.)",v:"~26,000",u:"lbs",s:"~11,800 kg"},
              {k:"Enclosure",v:"IP56",u:"",s:"Sound-attenuated"},
              {k:"Standards",v:"NFPA 110 L1",u:"",s:"UL2200, CSA"},
            ].map((t,i)=>(
              <div key={i}className={`tile ${t.cl||""}`}>
                <div className="tk">{t.k}</div>
                <div><span className="tv"style={{color:t.cl==="j"?"var(--Jb)":t.cl==="sc"?"var(--SCb)":t.cl==="e2"?"var(--E2b)":t.cl==="e1"?"var(--E1b)":t.cl==="bu"?"var(--BUSb)":t.cl==="ok"?"var(--OK)":"var(--E1b)"}}>{t.v}</span><span className="tu">{t.u}</span></div>
                <div className="ts">{t.s}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
