import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { SYSTEM_GATES } from '../../data/projectData'

export default function DevPortal() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Mock Task Engine Data
  const tasks = [
    { id: 'T-801', epic: 'Namtar Onboarding', feature: 'XOi Authentication', title: 'Implement OAuth Token Refresh', status: 'IN_PROGRESS', gate: 2 },
    { id: 'T-802', epic: 'Namtar UI', feature: 'Phase Gate Display', title: 'Build React components for locks', status: 'TODO', gate: 1 },
    { id: 'T-803', epic: 'Core Data', feature: 'Layer 1 Ingestion', title: 'JSON Validator Script', status: 'BLOCKED', gate: 0 }
  ]

  return (
    <div className="page-wrapper portal-page">
      <Header title="SATCORP" />

      <div className="portal-bg">
        <div className="portal-grid-overlay" />
      </div>

      <main className="portal-main" style={{ maxWidth: '1400px', padding: '0 32px' }}>
        {/* Portal Header Bar */}
        <div className="portal-topbar">
          <div className="portal-topbar-left">
            <span className="portal-role-badge" style={{
              background: 'rgba(124, 58, 237, 0.15)', color: '#7c3aed',
              border: '1px solid rgba(124, 58, 237, 0.4)', padding: '4px 10px',
              borderRadius: '6px', fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em'
            }}>DEVELOPER</span>
            <span className="portal-username">{currentUser?.username?.split('@')[0]}</span>
          </div>
          <div className="portal-topbar-right">
            <div className="portal-status-dot" style={{ background: '#7c3aed', boxShadow: '0 0 8px #7c3aed' }} />
            <span className="portal-status-text">BUILD LAYER ACTIVE</span>
            <button className="portal-logout-btn" onClick={handleLogout}>
              TERMINATE SESSION
            </button>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="portal-welcome">
          <div className="portal-eyebrow">
            <div className="op-eyebrow-line" style={{ background: 'linear-gradient(90deg, #7c3aed, transparent)' }} />
            <span className="op-eyebrow-text" style={{ color: '#7c3aed' }}>INTERNAL BUILD LAYER // ZERO AMBIGUITY</span>
          </div>
          <h1 className="portal-title">
            DEV <span className="portal-title-accent" style={{ color: '#7c3aed' }}>PORTAL</span>
          </h1>
          <p className="portal-subtitle">CLEARANCE LEVEL: BETA — EXECUTE TASKS & CLEAR GATES</p>
        </div>

        {/* BUILD RULES ENFORCEMENT */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '36px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', padding: '20px' }}>
             <h3 style={{ fontSize: '14px', color: '#ef4444', fontWeight: 'bold', marginBottom: '6px' }}>⚠️ FUNCTION FIRST FLAG</h3>
             <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>UI/UX work is strictly locked until core logic successfully passes Gate 3.</p>
          </div>
          <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '10px', padding: '20px' }}>
             <h3 style={{ fontSize: '14px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '6px' }}>🔒 SCOPE DISCIPLINE</h3>
             <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>Any feature request outside locked Scope triggers immediate admin review.</p>
          </div>
          <div style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '10px', padding: '20px' }}>
             <h3 style={{ fontSize: '14px', color: '#22c55e', fontWeight: 'bold', marginBottom: '6px' }}>🔄 ROLLBACK REQUIRED</h3>
             <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>Production deployment cannot execute without a documented reversal plan.</p>
          </div>
        </section>

        {/* TASK ENGINE & TRACKERS */}
        <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px', marginBottom: '36px' }}>
          
          {/* Main Task Engine */}
          <div>
            <div className="portal-section-label" style={{ marginBottom: '14px' }}>
              // TASK ENGINE (30-SECOND ASSIGNMENT RULE)
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                    <th style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>ID</th>
                    <th style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>EPIC / FEATURE</th>
                    <th style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>TASK TITLE</th>
                    <th style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>GATE</th>
                    <th style={{ padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '14px', fontFamily: 'monospace', color: '#7c3aed' }}>{task.id}</td>
                      <td style={{ padding: '14px' }}>
                        <div style={{ color: '#fff', fontWeight: 'bold' }}>{task.feature}</div>
                        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>{task.epic}</div>
                      </td>
                      <td style={{ padding: '14px', color: 'rgba(255,255,255,0.8)' }}>{task.title}</td>
                      <td style={{ padding: '14px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>G{task.gate}</td>
                      <td style={{ padding: '14px' }}>
                        <span style={{
                          background: task.status === 'IN_PROGRESS' ? 'rgba(124, 58, 237, 0.2)' : task.status === 'TODO' ? 'rgba(255,255,255,0.1)' : 'rgba(239, 68, 68, 0.2)',
                          color: task.status === 'IN_PROGRESS' ? '#7c3aed' : task.status === 'TODO' ? '#ccc' : '#ef4444',
                          padding: '4px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold', fontFamily: 'monospace'
                        }}>{task.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nav / Trackers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div className="portal-section-label" style={{ marginBottom: '14px' }}>
                // INFRASTRUCTURE VALIDATION (10 GATES)
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px' }}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', lineHeight: 1.5 }}>
                  Gate 10 triggers Polish Phase handoff. Gate failure results in immediate de-escalation to Execution.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {SYSTEM_GATES.map((gate, i) => {
                    const isPASS = gate.status === 'PASS'
                    const isACTIVE = gate.status === 'ACTIVE'
                    return (
                      <div key={i} style={{ 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                        padding: '8px', 
                        background: isPASS ? 'rgba(34, 197, 94, 0.1)' : isACTIVE ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.03)', 
                        border: `1px solid ${isPASS ? 'rgba(34, 197, 94, 0.2)' : isACTIVE ? 'rgba(245, 158, 11, 0.3)' : 'transparent'}`,
                        borderRadius: '4px' 
                      }}>
                        <span style={{ fontSize: '10px', fontFamily: 'monospace', color: isPASS ? '#22c55e' : isACTIVE ? '#f59e0b' : '#fff' }}>
                          G{gate.gate}: {gate.label}
                        </span>
                        <span style={{ fontSize: '12px' }}>{isPASS ? '✓' : isACTIVE ? '●' : '—'}</span>
                      </div>
                    )
                  })}
                </div>
                
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: '9px', fontFamily: 'monospace', color: '#06b6d4', marginBottom: '8px' }}>FINAL VERDICT MECHANISM</div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>FAIL:</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>De-escalate to Execution</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '10px', marginTop: '4px' }}>
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>PASS:</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>SATCORP Signature Status</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
