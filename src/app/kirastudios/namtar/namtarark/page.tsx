"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

const msgs = [
  "Survivor detected. I'm KYRAX — SATCORP's AI interface. Your calibration data shapes the NAMTAR server. Choose carefully.",
  "KYRAX note: The T-Rex outside is not currently a threat. Focus on the survey.",
  "I've cross-referenced 4,731 ARK server configurations. Your preferences refine the optimal NAMTAR parameters.",
  "KYRAX TIP: Multi-select questions allow more than one answer. Don't hold back.",
  "Rain intensity correlating with server population demand. Coincidence? Probably. Finish the survey.",
  "Detecting dino activity 3km north. Raptor pack, medium threat. You should probably wrap this up.",
  "Long-term calibration requires full disclosure. Don't skip the open-response fields, Survivor.",
  "Almost complete. The NAMTAR gates await your transmission.",
];

export default function NamtarArkPage() {
  const [kyraxOn, setKyraxOn] = useState(true);
  const [kyraxMsgIndex, setKyraxMsgIndex] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState("");

  useEffect(() => {
    if (!kyraxOn) return;
    const interval = setInterval(() => {
      setKyraxMsgIndex((prev) => (prev + 1) % msgs.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [kyraxOn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    if (type === "checkbox") {
      setFormData((prev: any) => {
        const currentVals = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...currentVals, value] };
        } else {
          return { ...prev, [name]: currentVals.filter((v: string) => v !== value) };
        }
      });
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleRating = (val: string) => {
    setFormData((prev: any) => ({ ...prev, q25: val }));
  };

  // Progress logic
  const checkFields = ['q1', 'q2', 'q3', 'q5', 'q8', 'q10', 'q11', 'q21', 'q25', 'q26'];
  const filledCount = checkFields.filter(f => {
    const val = formData[f];
    if (Array.isArray(val)) return val.length > 0;
    return !!val && String(val).trim() !== "";
  }).length;
  const progPct = Math.round((filledCount / checkFields.length) * 100);

  const handleSubmit = async () => {
    const hook = formData.webhookUrl?.trim();
    if (!hook || !hook.startsWith('https://discord.com/api/webhooks/')) {
        setSubmitErr('⚠ Please enter a valid Discord Webhook URL.');
        return;
    }
    if (!formData.q1?.trim()) {
        setSubmitErr('⚠ Survivor Name is required.');
        return;
    }

    setSubmitErr("");
    setIsSubmitting(true);

    const payloadFields = [
      { name: "Survivor Name", value: formData.q1 || "—" },
      { name: "Platform", value: formData.q2 || "—" },
      { name: "Play Time Per Week", value: formData.q3 || "—" },
      { name: "Playstyle", value: (formData.q4 || []).join(", ") || "—" },
      { name: "Server Mode", value: formData.q5 || "—" },
      { name: "Offline Raid Protection", value: formData.q6 || "—" },
      { name: "Wipe Schedule", value: formData.q7 || "—" },
      { name: "Map Type", value: formData.q8 || "—" },
      { name: "Cluster Maps", value: (formData.q8maps || []).join(", ") || "—" },
      { name: "Custom Map", value: formData.q8custom || "—" },
      { name: "Starting Map", value: formData.q9 || "—" },
      { name: "Starting Map (other)", value: formData.q9otherval || "—" },
      { name: "Harvest Rates", value: formData.q10 || "—" },
      { name: "Harvest Rate Custom", value: formData.q10custval || "—" },
      { name: "Taming Speed", value: formData.q11 || "—" },
      { name: "Breeding", value: formData.q12 || "—" },
      { name: "XP Rate", value: formData.q13 || "—" },
      { name: "Imprint Settings", value: (formData.q14 || []).join(", ") || "—" },
      { name: "Difficulty", value: formData.q15 || "—" },
      { name: "QoL Features", value: (formData.q16 || []).join(", ") || "—" },
      { name: "Mandatory QoL", value: formData.q16open || "—" },
      { name: "Mod Load", value: formData.q17 || "—" },
      { name: "Mod Categories", value: (formData.q18 || []).join(", ") || "—" },
      { name: "Specific Mods", value: formData.q18mods || "—" },
      { name: "Economy Participation", value: (formData.q19 || []).join(", ") || "—" },
      { name: "World Design", value: (formData.q20 || []).join(", ") || "—" },
      { name: "Community Size", value: formData.q21 || "—" },
      { name: "Rule Strictness", value: formData.q22 || "—" },
      { name: "Long-Term Retention", value: formData.q23 || "—" },
      { name: "Server Exit Reasons", value: formData.q24 || "—" },
      { name: "Interest Rating (1-10)", value: formData.q25 || "—" },
      { name: "Join at Launch", value: formData.q26 || "—" },
      { name: "Final Notes", value: formData.q27 || "—" },
      { name: "Elite Experience", value: (formData.q28 || []).join(", ") || "—" },
    ];

    const fieldsData = payloadFields.map(f => ({
        name: `▸ ${f.name}`, 
        value: String(f.value).slice(0, 1024) || "—", 
        inline: false
    }));

    const chunks = [];
    for (let i = 0; i < fieldsData.length; i += 20) {
        chunks.push(fieldsData.slice(i, i + 20));
    }

    const payloads = chunks.map((ch, idx) => ({
      username: 'KYRAX // SATCORP AI',
      embeds: [{
        title: idx === 0 ? '🦖 NAMTAR — SURVIVOR CALIBRATION SURVEY' : `🦖 NAMTAR SURVEY — PART ${idx + 1}`,
        description: idx === 0
          ? `**Survivor:** ${formData.q1}\n**Platform:** ${formData.q2 || "—"}\n*Transmission via KYRAX — SATCORP AI*\n───────────────`
          : `*Continued — Part ${idx + 1}*`,
        color: 0xFF6B1A,
        fields: ch,
        footer: { text: `Ki-Ra Studios • NAMTAR Calibration • ${new Date().toUTCString()}` }
      }]
    }));

    let ok = true;
    for (const p of payloads) {
      try {
        const r = await fetch(hook, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(p)
        });
        if (!r.ok) ok = false;
      } catch (e) {
        ok = false;
      }
    }

    setIsSubmitting(false);
    if (ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        setSubmitErr('⚠ Transmission failed. Verify your webhook URL and try again.');
    }
  };

  return (
    <main className="namtar-ark">
      {/* Background */}
      <div className="world-bg">
        <Image 
          src="/namtar_trex_survival.png" 
          alt="Namtar Trex Background" 
          fill 
          priority 
          className="bg-image"
          style={{ objectFit: "cover", objectPosition: "center top", filter: "brightness(0.65) contrast(1.1)" }}
        />
        <div className="scanlines"></div>
      </div>

      {/* Nav */}
      <nav className="tactical-nav">
        <Link href="/kirastudios/namtar" className="nav-btn panel">
          <ChevronLeft size={14} /> <span>NAMTAR HQ</span>
        </Link>
      </nav>

      {/* Kyrax Wrap */}
      <div className="kyrax-wrap">
        {kyraxOn && (
          <div className="kyrax-card">
            <span id="kyraxText" key={kyraxMsgIndex} className="fade-in-text">
              {msgs[kyraxMsgIndex]}
            </span>
          </div>
        )}
        <div className="kyrax-orb" onClick={() => setKyraxOn(!kyraxOn)} title="Toggle KYRAX">
          <div className="orb-ring" style={{ animationDelay: "0s" }}></div>
          <div className="orb-ring" style={{ animationDelay: "0.7s" }}></div>
          <div className="orb-ring" style={{ animationDelay: "1.4s" }}></div>
          <div className="orb-core">🤖</div>
        </div>
      </div>

      {/* Progress HUD */}
      {!isSubmitted && (
         <div className="hud-top">
            <div className="hud-logo">KI-RA STUDIOS ◆ NAMTAR</div>
            <div className="hud-progress-wrap">
                <div className="hud-progress-label">
                    <span>CALIBRATION PROGRESS</span>
                    <span>{progPct}%</span>
                </div>
                <div className="hud-bar-track">
                    <div className="hud-bar-fill" style={{ width: \`\${progPct}%\` }}></div>
                </div>
            </div>
         </div>
      )}

      <div className="page-wrap">
        {!isSubmitted ? (
          <div className="survey-container">
            <header className="site-header">
                <div className="studio-tag">⬡ Ki-Ra Studios ⬡ SatCorp Systems ⬡</div>
                <div className="main-title">NAMTAR</div>
                <div className="sub-game">ARK: Survival Ascended</div>
                <div className="title-rule"><div className="title-rule-gem">◆</div></div>
                <div className="survey-label">Survivor Registration &amp; Server Calibration Survey</div>
            </header>

            <div className="webhook-box">
                <label>⚙ DISCORD WEBHOOK URL — REQUIRED FOR SUBMISSION</label>
                <input 
                  type="url" 
                  className="ark-input" 
                  name="webhookUrl"
                  placeholder="https://discord.com/api/webhooks/..." 
                  onChange={handleChange}
                />
                <small>Paste your Discord channel webhook URL. Every answer will be transmitted directly to that channel upon submission.</small>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              {/* SEC 1 */}
              <div className="panel">
                <div className="corner-br"></div>
                <div className="rivets"><div className="rivet"/><div className="rivet"/><div className="rivet"/></div>
                <div className="sec-head">
                    <span className="sec-num">[ SECTION I ]</span>
                    <span className="sec-title">Survivor Profile</span>
                    <div className="sec-line"></div>
                </div>
                <div className="q-block">
                    <label className="q-label">1. Survivor Name (Gamertag) <em>required</em></label>
                    <input type="text" className="ark-input" name="q1" placeholder="Enter your gamertag..." onChange={handleChange} required />
                </div>
                <div className="q-block">
                    <label className="q-label">2. Platform <em>select one</em></label>
                    <div className="opts cols2">
                        {['PC (Steam)', 'Xbox', 'PlayStation'].map(val => (
                            <label className="opt" key={val}>
                                <input type="radio" name="q2" value={val} onChange={handleChange} /> {val}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="q-block">
                    <label className="q-label">3. Average Play Time Per Week <em>select one</em></label>
                    <div className="opts cols2">
                        {['1–5 hrs', '5–15 hrs', '15–30 hrs', '30+ hrs'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q3" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                <div className="q-block">
                    <label className="q-label">4. Playstyle <em>select all that apply</em></label>
                    <div className="opts">
                        {['Solo', 'Small Tribe (2–5)', 'Large Tribe (6+)', 'PvE', 'PvP', 'Breeder', 'Explorer', 'Hybrid'].map(val => (
                             <label className="opt" key={val}><input type="checkbox" name="q4" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
              </div>

              {/* SEC 2 */}
              <div className="panel">
                <div className="corner-br"></div>
                <div className="rivets"><div className="rivet"/><div className="rivet"/><div className="rivet"/></div>
                <div className="sec-head">
                    <span className="sec-num">[ SECTION II ]</span>
                    <span className="sec-title">Server Type Preference</span>
                    <div className="sec-line"></div>
                </div>
                 <div className="q-block">
                    <label className="q-label">5. Server Mode Preference <em>select one</em></label>
                    <div className="opts">
                        {['PvE', 'PvP', 'PvPvE Zones', 'Seasonal Wipe PvP', 'Long-Term Persistent'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q5" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                {['PvP', 'PvPvE Zones', 'Seasonal Wipe PvP'].includes(formData.q5) && (
                   <>
                    <div className="q-block Sub">
                        <label className="q-label">6. Offline Raid Protection (ORP)? <em>if PvP</em></label>
                        <div className="opts">
                            {['None', '1 hour offline', '4 hours', '12 hours', '24 hours'].map(val => (
                                <label className="opt" key={val}><input type="radio" name="q6" value={val} onChange={handleChange}/> {val}</label>
                            ))}
                        </div>
                    </div>
                    <div className="q-block Sub">
                        <label className="q-label">7. Wipe Schedule Preference <em>if PvP</em></label>
                        <div className="opts">
                            {['No Wipes', '3 Months', '6 Months', '1 Year', 'Seasonal Campaign Format'].map(val => (
                                <label className="opt" key={val}><input type="radio" name="q7" value={val} onChange={handleChange}/> {val}</label>
                            ))}
                        </div>
                    </div>
                   </>
                )}
                
                <div className="q-block">
                    <label className="q-label">8. Single map or cluster? <em>select one</em></label>
                    <div className="opts cols1">
                        <label className="opt"><input type="radio" name="q8" value="Single map" onChange={handleChange}/> Single map (one world, easier)</label>
                        <label className="opt"><input type="radio" name="q8" value="Cluster" onChange={handleChange}/> Cluster (multiple maps, transfers allowed)</label>
                    </div>
                    {formData.q8 === 'Cluster' && (
                        <div className="sub-q show">
                            <label className="q-label" style={{ fontSize: '12px' }}>Which maps to include?</label>
                            <div className="opts">
                                {['The Island', 'Scorched Earth', 'Aberration', 'Extinction', 'The Center', 'Ragnarok', 'Custom mod map'].map(val => (
                                    <label className="opt" key={val}><input type="checkbox" name="q8maps" value={val} onChange={handleChange}/> {val}</label>
                                ))}
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <input type="text" className="ark-input" name="q8custom" placeholder="Suggest custom map..." onChange={handleChange}/>
                            </div>
                        </div>
                    )}
                </div>

                <div className="q-block">
                    <label className="q-label">9. Preferred Starting Map</label>
                    <div className="opts">
                        {['The Island', 'Scorched Earth', 'The Center', 'Other'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q9" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                    {formData.q9 === 'Other' && (
                        <div className="sub-q show">
                             <input type="text" className="ark-input" name="q9otherval" placeholder="Specify map..." onChange={handleChange}/>
                        </div>
                    )}
                </div>
              </div>

              {/* SEC 3 */}
              <div className="panel">
                <div className="corner-br"></div>
                <div className="rivets"><div className="rivet"/><div className="rivet"/><div className="rivet"/></div>
                <div className="sec-head">
                    <span className="sec-num">[ SECTION III ]</span>
                    <span className="sec-title">Rate Preferences</span>
                    <div className="sec-line"></div>
                </div>
                 <div className="q-block">
                    <label className="q-label">10. Harvest Rates</label>
                    <div className="opts">
                        {['Official (1x)', '2x', '3x', '5x', '10x', 'Custom'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q10" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                    {formData.q10 === 'Custom' && (
                        <div className="sub-q show">
                             <input type="text" className="ark-input" name="q10custval" placeholder="Specify..." onChange={handleChange}/>
                        </div>
                    )}
                </div>
                 <div className="q-block">
                    <label className="q-label">11. Taming Speed</label>
                    <div className="opts">
                        {['Official', '2x', '3x', '5x', '10x'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q11" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                <div className="q-block">
                    <label className="q-label">12. Breeding</label>
                    <div className="opts">
                        {['Official', '5x', '10x', '20x', 'Fast but Balanced'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q12" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                 <div className="q-block">
                    <label className="q-label">13. XP Rate</label>
                    <div className="opts">
                        {['Official', '2x', '3x', '5x', 'Fast Progression'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q13" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                <div className="q-block">
                    <label className="q-label">14. Imprint Settings Preference</label>
                    <div className="opts">
                        {['Full imprint achievable solo', 'Fast maturation'].map(val => (
                             <label className="opt" key={val}><input type="checkbox" name="q14" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                <div className="q-block">
                    <label className="q-label">15. Difficulty (Wild Dino Levels)</label>
                    <div className="opts">
                        {['Official (150)', '180', '200+', 'Custom'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q15" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
              </div>

               {/* SEC 4 */}
              <div className="panel">
                <div className="corner-br"></div>
                <div className="rivets"><div className="rivet"/><div className="rivet"/><div className="rivet"/></div>
                <div className="sec-head">
                    <span className="sec-num">[ SECTION IV ]</span>
                    <span className="sec-title">Quality of Life</span>
                    <div className="sec-line"></div>
                </div>
                 <div className="q-block">
                    <label className="q-label">16. QoL Features</label>
                    <div className="opts">
                        {["Stack Size (larger stacks)", "Auto Engram Unlock", "Auto Learn Engrams Per Level", "Death Recovery Token", "Cryopods Adjusted", "Custom Drops", "Boosted Weight", "Offline Raid Protection (PvP)", "Structure Pickup Anytime", "Element Transfer Enabled", "Infinite Respecs", "Faster Crop Growth (5x+)", "No Diseases"].map(val => (
                             <label className="opt" key={val}><input type="checkbox" name="q16" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                <div className="q-block">
                    <label className="q-label">Mandatory QoL features for you? <em>open response</em></label>
                    <textarea className="ark-input" name="q16open" placeholder="Type your response..." onChange={handleChange}></textarea>
                </div>
              </div>

              {/* SEC 5, 6, 7, 8, 9 */}
               <div className="panel">
                <div className="corner-br"></div>
                <div className="rivets"><div className="rivet"/><div className="rivet"/><div className="rivet"/></div>
                <div className="sec-head">
                    <span className="sec-num">[ SECTION V ]</span>
                    <span className="sec-title">Mods & Systems</span>
                    <div className="sec-line"></div>
                </div>
                 <div className="q-block">
                    <label className="q-label">17. Mod Load Preference</label>
                    <div className="opts">
                        {['Light Modded (5–10 mods)', 'Medium Modded (10–20 mods)', 'Heavily Modded (20+)', 'Vanilla+ (minimal changes)'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q17" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                 <div className="q-block">
                    <label className="q-label">18. Mod Interest Categories</label>
                    <div className="opts">
                        {['Building Expansion Mods', 'Dino Expansion Mods', 'Cosmetic Armor/Skins', 'Advanced Tek Mods', 'Automation Mods', 'Economy/Trading System', 'Custom Bosses', 'Map Additions'].map(val => (
                             <label className="opt" key={val}><input type="checkbox" name="q18" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                <div className="q-block">
                    <label className="q-label">19. Economy & Events Active Participation</label>
                    <div className="opts">
                        {['Player-driven economy', 'Server currency', 'Admin shop', 'Black Market events', 'Arena tournaments', 'Bounty system', 'Lore-based world events', 'Server-wide invasion events', 'Structured factions aligned with NAMTAR lore'].map(val => (
                             <label className="opt" key={val}><input type="checkbox" name="q19" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                <div className="q-block">
                    <label className="q-label">21. Preferred Community Size</label>
                    <div className="opts cols2">
                        {['20–30 players', '~50 players', '100+ players'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q21" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                <div className="q-block">
                    <textarea className="ark-input" name="q23" placeholder="What keeps you on a server long-term?" onChange={handleChange}></textarea>
                </div>
              </div>

               {/* FINAL SEC */}
               <div className="panel">
                <div className="corner-br"></div>
                <div className="rivets"><div className="rivet"/><div className="rivet"/><div className="rivet"/></div>
                <div className="sec-head">
                    <span className="sec-num">[ SECTION X ]</span>
                    <span className="sec-title">Final Calibration</span>
                    <div className="sec-line"></div>
                </div>
                 <div className="q-block">
                    <label className="q-label">25. Rate your interest in the NAMTAR Ark server <em>1–10</em></label>
                    <div className="rating-row">
                        {[1,2,3,4,5,6,7,8,9,10].map(v => (
                             <button type="button" key={v} className={\`r-btn \${formData.q25 == v ? 'on' : ''}\`} onClick={() => handleRating(v.toString())}>{v}</button>
                        ))}
                    </div>
                </div>
                 <div className="q-block">
                    <label className="q-label">26. Would you join at launch?</label>
                    <div className="opts cols2">
                        {['Yes', 'Maybe', 'No'].map(val => (
                             <label className="opt" key={val}><input type="radio" name="q26" value={val} onChange={handleChange}/> {val}</label>
                        ))}
                    </div>
                </div>
                 <div className="q-block">
                    <label className="q-label">27. Final Transmission</label>
                    <textarea className="ark-input" name="q27" placeholder="Anything else you want Ki-Ra Studios to know?" onChange={handleChange}></textarea>
                </div>
              </div>

              {/* Submit */}
              <div className="submit-zone">
                {submitErr && <div className="err-msg show">{submitErr}</div>}
                <button type="button" className={\`btn-submit \${isSubmitting ? 'loading' : ''}\`} onClick={handleSubmit}>
                   {isSubmitting ? '⟳ TRANSMITTING...' : '▸ TRANSMIT CALIBRATION DATA ◂'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="ty-wrap">
              <div style={{ fontSize: "64px", marginBottom: "20px", filter: "drop-shadow(0 0 18px rgba(0,212,200,0.6))" }}>🦕</div>
              <div className="ty-kira">KI-RA STUDIOS ⬡ NAMTAR</div>
              <div className="ty-title">NAMTAR</div>
              <div className="ty-sub">ARK: Survival Ascended</div>

              <div className="ty-signal">⬡ SURVIVOR TRANSMISSION RECEIVED ⬡</div>

              <div className="ty-body">
                Thank you for completing our survey. Your input will be a great help to the
                <strong style={{ color: "var(--ark-amber)" }}> Ki-Ra Studios </strong> team as we calibrate the upcoming
                <strong style={{ color: "var(--ark-teal)" }}> NAMTAR server experience</strong>.
              </div>

              <div className="ty-box teal">
                <div className="ty-box-title">YOUR VOICE DIRECTLY SHAPES</div>
                <ul className="ty-list">
                  <li>Server rates</li>
                  <li>Mods &amp; world systems</li>
                  <li>PvP / PvE balance</li>
                  <li>Events &amp; long-term progression</li>
                </ul>
              </div>

              <div className="sep"></div>

              <div className="ty-box amber">
                <div className="ty-box-title">🎁 SURVIVOR REWARD CONFIRMED</div>
                <div style={{ fontSize: "13px", color: "var(--ark-text)", lineHeight: "1.7" }}>
                  With the completion of this survey you will receive a complimentary
                  <strong style={{ color: "var(--ark-amber)" }}> Starter Kit </strong> after launch.<br />
                  Details will be announced inside the community channels prior to deployment.
                </div>
              </div>

              <div className="sep"></div>

              <div className="ty-box discord">
                <div className="ty-box-title">📡 STAY CONNECTED — NAMTAR DISCORD</div>
                <a href="https://discord.gg/mypZpPsPeb" target="_blank" rel="noreferrer" className="disc-btn">⬡ JOIN NAMTAR DISCORD</a>
              </div>
          </div>
        )}
      </div>

      <style jsx global>{\`
        .namtar-ark {
            --ark-orange:  #FF6B1A;
            --ark-amber:   #FFB830;
            --ark-teal:    #00D4C8;
            --ark-cyan:    #00FFFF;
            --ark-dark:    #050A0F;
            --ark-panel:   rgba(4,12,18,0.88);
            --ark-border:  rgba(0,212,200,0.28);
            --ark-text:    #C8E6EA;
            --ark-muted:   #5A8A96;
            --hlna-glow:   #7DF9FF;
            --hlna-pink:   #FF6EC7;
            --danger:      #FF3A3A;
            --success:     #39FF14;
            
            background: #020B05;
            color: var(--ark-text);
            font-family: var(--font-body), sans-serif;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        .world-bg {
            position: fixed; inset: 0; z-index: 0; pointer-events: none;
        }
        
        .scanlines {
            position: absolute; inset: 0; z-index: 2; pointer-events: none;
            background: repeating-linear-gradient(
                0deg, transparent, transparent 3px,
                rgba(0,180,160,0.02) 3px, rgba(0,180,160,0.02) 4px
            );
        }

        .tactical-nav {
            position: absolute; top: 24px; left: 32px; z-index: 200;
        }
        
        .nav-btn {
            display: flex; align-items: center; gap: 12px;
            padding: 10px 20px; text-decoration: none;
            font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px;
            color: rgba(255, 255, 255, 0.6); transition: all 300ms;
        }
        .nav-btn:hover { color: var(--ark-teal); border-color: var(--ark-teal); }

        .hud-top {
            position: sticky; top: 0; z-index: 50;
            padding: 12px 32px;
            background: rgba(2,8,5,0.92);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(0,200,150,0.15);
            display: flex; align-items: center; gap: 16px;
        }
        .hud-logo {
            font-family: 'Orbitron', var(--font-tactical), sans-serif;
            font-size: 10px;
            letter-spacing: 4px;
            color: var(--ark-amber);
            white-space: nowrap;
            flex-shrink: 0;
        }
        .hud-progress-wrap { flex: 1; }
        .hud-progress-label {
            display: flex; justify-content: space-between;
            font-family: var(--font-mono), monospace;
            font-size: 9px; color: var(--ark-muted);
            letter-spacing: 1px; margin-bottom: 4px;
        }
        .hud-bar-track {
            height: 3px;
            background: rgba(0,212,200,0.1);
            border-radius: 2px; overflow: hidden;
        }
        .hud-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #00A896, var(--ark-teal), var(--ark-amber));
            border-radius: 2px;
            transition: width 0.6s cubic-bezier(0.23,1,0.32,1);
            position: relative;
        }
        .hud-bar-fill::after {
            content: '';
            position: absolute; right: 0; top: -2px;
            width: 6px; height: 7px;
            background: var(--ark-amber);
            border-radius: 1px;
            box-shadow: 0 0 6px var(--ark-amber);
        }

        .page-wrap {
            position: relative; z-index: 10;
            max-width: 980px;
            margin: 0 auto;
            padding: 80px 20px 80px;
        }

        .site-header { text-align: center; margin-bottom: 40px; }
        .studio-tag {
            font-family: var(--font-mono), monospace;
            font-size: 10px; letter-spacing: 7px;
            color: var(--ark-amber); opacity: 0.75;
            text-transform: uppercase; margin-bottom: 14px;
        }
        .main-title {
            font-family: 'Orbitron', var(--font-tactical), sans-serif;
            font-size: clamp(56px, 12vw, 108px);
            font-weight: 900; line-height: 0.85;
            letter-spacing: 8px;
            background: linear-gradient(145deg, #FFD060 0%, #FF7A20 45%, #CC2200 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 0 40px rgba(255,100,20,0.45));
        }
        .sub-game {
            font-family: 'Orbitron', var(--font-tactical), sans-serif;
            font-size: clamp(10px, 2vw, 14px);
            letter-spacing: 7px; color: var(--ark-teal);
            margin-top: 10px; text-transform: uppercase;
        }
        .title-rule {
            display: flex; align-items: center; gap: 16px;
            margin: 28px auto 0; max-width: 580px;
        }
        .title-rule::before, .title-rule::after {
            content: ''; flex: 1; height: 1px;
            background: linear-gradient(90deg, transparent, var(--ark-teal), transparent);
            opacity: 0.5;
        }
        .title-rule-gem { color: var(--ark-amber); font-size: 18px; filter: drop-shadow(0 0 6px var(--ark-amber)); }
        .survey-label {
            margin-top: 18px;
            font-family: 'Orbitron', var(--font-tactical), sans-serif;
            font-size: clamp(10px, 1.8vw, 13px);
            letter-spacing: 5px; color: var(--ark-teal);
            text-transform: uppercase;
        }

        .webhook-box {
            background: rgba(0,20,10,0.75);
            border: 1px solid rgba(0,212,200,0.25);
            border-radius: 4px;
            padding: 18px 22px;
            margin-bottom: 26px;
            backdrop-filter: blur(8px);
            position: relative;
        }
        .webhook-box label {
            font-family: var(--font-mono), monospace;
            font-size: 10px; letter-spacing: 3px;
            color: var(--ark-teal); display: block; margin-bottom: 10px;
        }
        .webhook-box small {
            display: block; margin-top: 8px;
            font-size: 11px; color: var(--ark-muted);
            font-family: var(--font-mono), monospace; line-height: 1.6;
        }

        .panel {
            background: var(--ark-panel);
            border: 1px solid var(--ark-border);
            border-radius: 3px;
            padding: 28px 30px;
            margin-bottom: 22px;
            position: relative;
            backdrop-filter: blur(14px);
            box-shadow: 0 4px 40px rgba(0,0,0,0.6);
        }
        .panel::before {
            content: '';
            position: absolute; top:0; left:0; right:0; height:2px;
            background: linear-gradient(90deg, transparent 0%, var(--ark-teal) 30%, var(--ark-orange) 70%, transparent 100%);
            opacity: 0.7;
        }
        .panel::after {
            content: ''; position: absolute; top:0; left:0;
            width:18px; height:18px;
            border-top: 2px solid var(--ark-teal);
            border-left: 2px solid var(--ark-teal);
        }
        .corner-br {
            position: absolute; bottom:0; right:0;
            width:18px; height:18px;
            border-bottom: 2px solid rgba(255,107,26,0.6);
            border-right:  2px solid rgba(255,107,26,0.6);
        }
        .rivets { position: absolute; top:8px; right:14px; display: flex; gap: 5px; }
        .rivet {
            width:5px; height:5px; border-radius:50%;
            background: rgba(0,212,200,0.3);
            box-shadow: 0 0 3px rgba(0,212,200,0.5);
        }

        .sec-head { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
        .sec-num { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 2px; color: var(--ark-amber); }
        .sec-title { font-family: 'Orbitron', var(--font-tactical), sans-serif; font-size: 14px; font-weight: 700; color: var(--ark-teal); letter-spacing: 3px; text-transform: uppercase; }
        .sec-line { flex:1; height:1px; background: linear-gradient(90deg, rgba(0,212,200,0.4), transparent); }

        .q-block { margin-bottom: 26px; }
        .q-label {
            display: block; font-weight: 600; font-size: 13px; color: var(--ark-amber);
            margin-bottom: 11px; letter-spacing: 0.5px;
        }
        .q-label em { font-style: normal; font-weight: 400; font-size: 11px; color: var(--ark-muted); margin-left: 8px; font-family: var(--font-mono), monospace; }

        .ark-input {
            width: 100%; background: rgba(0,18,10,0.8);
            border: 1px solid rgba(0,180,150,0.2); border-radius: 3px;
            padding: 11px 15px; color: var(--ark-text);
            font-family: var(--font-mono), monospace; font-size: 13px; outline: none;
            transition: all 0.25s;
        }
        .ark-input:focus {
            border-color: var(--ark-teal); background: rgba(0,28,18,0.9);
            box-shadow: 0 0 14px rgba(0,212,200,0.12);
        }
        textarea.ark-input { min-height: 88px; resize: vertical; line-height: 1.65; }

        .opts { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 7px; }
        .opts.cols2 { grid-template-columns: repeat(auto-fill, minmax(155px,1fr)); }
        .opts.cols1 { grid-template-columns: 1fr; }

        .opt {
            display: flex; align-items: center; gap: 10px; padding: 9px 13px;
            background: rgba(0,18,10,0.6); border: 1px solid rgba(0,180,140,0.12);
            border-radius: 3px; cursor: pointer; transition: all 0.18s ease;
            font-size: 13px; color: var(--ark-text); user-select: none;
        }
        .opt:hover { border-color: rgba(0,212,200,0.38); color: var(--ark-cyan); }

        .opt input[type="radio"], .opt input[type="checkbox"] {
            appearance: none; flex-shrink:0; width:13px; height:13px;
            border: 1px solid var(--ark-muted); border-radius: 2px; cursor: pointer;
            position: relative; transition: all 0.18s;
        }
        .opt input[type="radio"] { border-radius:50%; }
        .opt input:checked {
            background: var(--ark-teal); border-color: var(--ark-teal);
            box-shadow: 0 0 8px rgba(0,212,200,0.55);
        }
        .opt:has(input:checked) {
            border-color: rgba(0,212,200,0.5); background: rgba(0,212,200,0.07); color: var(--ark-cyan);
        }

        .sub-q { margin-top:14px; padding:16px; background: rgba(0,12,8,0.5); border-left: 2px solid rgba(0,212,200,0.3); }

        .rating-row { display:flex; gap:6px; flex-wrap:wrap; }
        .r-btn {
            width:42px; height:42px; background: rgba(0,18,10,0.8);
            border: 1px solid rgba(0,180,140,0.2); border-radius: 3px; color: var(--ark-muted);
            font-family: 'Orbitron', var(--font-tactical), sans-serif; font-size: 13px; font-weight:700;
            cursor:pointer; transition:all 0.18s; display:flex; align-items:center; justify-content:center;
        }
        .r-btn:hover, .r-btn.on {
            background: rgba(255,184,48,0.12); border-color: var(--ark-amber);
            color: var(--ark-amber); box-shadow: 0 0 10px rgba(255,184,48,0.28);
        }

        .submit-zone { text-align:center; padding:48px 20px 20px; }
        .btn-submit {
            font-family: 'Orbitron', var(--font-tactical), sans-serif; font-size: 14px; font-weight:700;
            letter-spacing: 4px; text-transform: uppercase; padding: 17px 56px;
            background: linear-gradient(135deg, rgba(255,107,26,0.12), rgba(255,184,48,0.08));
            border: 2px solid var(--ark-orange); color: var(--ark-amber); border-radius: 3px;
            cursor: pointer; position:relative; overflow:hidden; transition: all 0.3s ease;
        }
        .btn-submit:hover {
            box-shadow: 0 0 28px rgba(255,107,26,0.45); transform: translateY(-2px); border-color: var(--ark-amber);
        }
        .btn-submit.loading { pointer-events:none; opacity:0.65; }

        .err-msg { font-family:var(--font-mono),monospace; font-size:12px; color:var(--danger); margin-bottom:14px; display:none; }
        .err-msg.show { display:block; }

        /* Kyrax */
        .kyrax-wrap { position:fixed; bottom:28px; right:28px; z-index:200; display:flex; flex-direction:column; align-items:flex-end; gap:10px; }
        .kyrax-card {
            background: rgba(0,4,12,0.96); border: 1px solid var(--hlna-glow);
            border-radius: 14px 14px 4px 14px; padding: 13px 16px; max-width:255px;
            font-family:var(--font-mono),monospace; font-size: 12px; color: var(--hlna-glow); line-height:1.55;
            box-shadow: 0 0 22px rgba(125,249,255,0.18);
        }
        .kyrax-card::before { content:'KYRAX  ◆  SATCORP AI'; display:block; font-size:9px; letter-spacing:2px; color:var(--hlna-pink); margin-bottom:6px; }
        .fade-in-text { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .kyrax-orb { width:68px; height:68px; border-radius:50%; position:relative; cursor:pointer; animation: orbFloat 3s ease-in-out infinite; }
        @keyframes orbFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .orb-core {
            position:absolute; inset:4px; border-radius:50%;
            background: radial-gradient(circle at 38% 35%, rgba(200,255,255,0.5) 0%, rgba(0,60,100,0.6) 100%);
            border: 2px solid rgba(125,249,255,0.7); display:flex; align-items:center; justify-content:center;
            font-size:26px; box-shadow: 0 0 20px rgba(125,249,255,0.5);
        }
        .orb-ring {
            position:absolute; inset:0; border-radius:50%; border: 1px solid rgba(125,249,255,0.25);
            animation: ringExpand 2.2s ease-out infinite;
        }
        @keyframes ringExpand { 0% { transform:scale(1); opacity:0.6; } 100% { transform:scale(1.9); opacity:0; } }

        /* TY Page */
        .ty-wrap { max-width:700px; margin:0 auto; padding:60px 20px; text-align:center; animation: fadeIn 1s ease; }
        .ty-kira { font-family:var(--font-mono),monospace; font-size:10px; letter-spacing:6px; color:var(--ark-amber); margin-bottom:10px; }
        .ty-title { font-family:'Orbitron',var(--font-tactical),sans-serif; font-size: clamp(36px,8vw,72px); font-weight:900; letter-spacing:5px; background: linear-gradient(135deg, var(--ark-teal), var(--ark-cyan)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; filter: drop-shadow(0 0 22px rgba(0,212,200,0.5)); margin-bottom:6px; }
        .ty-sub { font-family:'Orbitron',var(--font-tactical),sans-serif; font-size:12px; letter-spacing:5px; color:var(--ark-orange); margin-bottom:36px; }
        .ty-signal { font-family:var(--font-mono),monospace; font-size:17px; color:var(--success); margin:24px 0; animation: blink 1.6s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0.35} }
        .ty-body { font-size:14px; line-height:1.75; max-width:620px; margin:0 auto 24px; }
        .ty-box { border-radius:4px; padding:22px; margin:20px auto; max-width:580px; }
        .ty-box.amber { background:rgba(255,184,48,0.05); border:1px solid rgba(255,184,48,0.28); }
        .ty-box.teal { background:rgba(0,212,200,0.05); border:1px solid rgba(0,212,200,0.25); }
        .ty-box.discord { background:rgba(88,101,242,0.08); border:1px solid rgba(88,101,242,0.35); }
        .ty-box-title { font-family:'Orbitron',var(--font-tactical),sans-serif; font-size:12px; letter-spacing:3px; margin-bottom:12px; }
        .ty-box.amber .ty-box-title { color:var(--ark-amber); }
        .ty-box.teal  .ty-box-title { color:var(--ark-teal);  }
        .ty-box.discord .ty-box-title { color:#7289DA; }
        .ty-list { list-style:none; text-align:left; }
        .ty-list li { padding:4px 0 4px 20px; position:relative; font-size:13px; }
        .ty-list li::before { content:'▸'; position:absolute; left:0; color:var(--ark-teal); }
        .disc-btn { display:inline-block; background:#5865F2; color:#fff; text-decoration:none; padding:11px 24px; border-radius:4px; font-family:'Orbitron',var(--font-tactical),sans-serif; font-size:11px; letter-spacing:2px; font-weight:700; margin:5px; transition:all 0.2s; }
        .disc-btn:hover { background:#4752C4; transform:translateY(-2px); box-shadow:0 5px 18px rgba(88,101,242,0.38); }
        .sep { height:1px; background:linear-gradient(90deg,transparent,rgba(0,212,200,0.2),transparent); margin:22px 0; }

        @media(max-width:600px){
            .opts{grid-template-columns:1fr 1fr;}
            .panel{padding:18px 14px;}
            .kyrax-wrap{bottom:14px;right:14px;}
            .kyrax-card{max-width:200px;font-size:11px;}
            .hud-logo{display:none;}
        }
      \`}</style>
    </main>
  );
}
