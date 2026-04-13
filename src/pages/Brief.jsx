import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import GalaxyBackground from '../components/GalaxyBackground';
import JsonLd from '../components/JsonLd';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1492038802544267395/XHgcF2P_gMzDELXeuL2mw6LfKrNsj2HyhLagC5jHqgmc1MHX15mK3NaMmIAGgc_8JVVv';

export default function Brief() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Design/Creative',
    objective: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const embed = {
      title: '🎯 NEW PROJECT BRIEF — SATCORP',
      color: 0x00ff41,
      fields: [
        { name: '🪪 Client Name', value: formData.name || 'N/A', inline: true },
        { name: '📧 Contact', value: formData.email || 'N/A', inline: true },
        { name: '🛠️ Project Type', value: formData.projectType, inline: true },
        { name: '💰 Budget Range', value: formData.budget || 'N/A', inline: true },
        { name: '⏳ Timeline', value: formData.timeline || 'N/A', inline: true },
        { name: '📝 Objectives', value: formData.objective || 'N/A', inline: false },
      ],
      footer: { text: 'SATCORP Intake System // Intelligence Architecture' },
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] })
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        alert("Transmission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting brief.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper brief-page">
      <Helmet>
        <title>REQUEST A CONSULTATION // SATCORP</title>
        <meta name="description" content="Initiate a consultation with SATCORP Intelligence Architecture." />
      </Helmet>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Request a Consultation",
        "description": "Project intake for SATCORP Intelligence Architecture."
      }} />
      
      <Header title="CONCIERGE CONSULTATION" />
      <div className="portal-bg" style={{ 
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.95)), url(/assets/satcorp_main_bg.png)',
        position: 'fixed', inset: 0, zIndex: -1, backgroundSize: 'cover'
      }} />
      <GalaxyBackground />

      <style dangerouslySetInnerHTML={{__html: `
        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(0,255,65,0.5)' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }
        select.form-input option {
          background-color: #0c0c0c;
          color: #e4e4e4;
          padding: 10px;
        }
      `}} />

      <main className="operator-section" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '120px' }}>
        <div className="op-eyebrow">
          <div className="op-eyebrow-line" />
          <span className="op-eyebrow-text">PROJECT INTAKE // PROTOCOL 01</span>
        </div>
        <h1 className="op-main-title">REQUEST A <em>CONSULTATION</em></h1>
        <p className="op-sub">INITIALIZE MISSION PARAMETERS FOR ARCHITECTURAL DEPLOYMENT.</p>

        <div className="op-value-grid" style={{ gridTemplateColumns: '1fr', padding: '0' }}>
          {submitSuccess ? (
            <div className="submit-success" style={{ padding: '60px 20px' }}>
              <div className="success-icon" style={{ color: 'var(--accent)' }}>📡</div>
              <h2 className="success-title">CONSULTATION REQUESTED</h2>
              <p className="success-text">Your data packet has been received. An operator will establish contact shortly.</p>
              <button className="btn-primary" style={{ marginTop: '24px' }} onClick={() => window.location.href = '/'}>RETURN TO HQ</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="op-value-item" style={{ border: 'none', background: 'var(--glass-bg)', padding: '40px' }}>
              <div className="form-group">
                <label className="form-label">OPERATOR / ENTITY NAME <span className="req">*</span></label>
                <input type="text" name="name" className="form-input" required value={formData.name} onChange={handleChange} placeholder="IDENTIFY YOURSELF" />
              </div>

              <div className="form-group">
                <label className="form-label">COMMUNICATION CHANNEL <span className="req">*</span></label>
                <input type="email" name="email" className="form-input" required value={formData.email} onChange={handleChange} placeholder="EMAIL // SIGNAL // DISCORD" />
              </div>

              <div className="form-group">
                <label className="form-label">SECTOR TYPE</label>
                <select name="projectType" className="form-input" value={formData.projectType} onChange={handleChange}>
                  <option>Intelligence Architecture</option>
                  <option>Creative Direction</option>
                  <option>Development / Ops</option>
                  <option>Consulting</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">BUDGET PARAMETERS</label>
                  <input type="text" name="budget" className="form-input" value={formData.budget} onChange={handleChange} placeholder="ALLOCATED CREDITS" />
                </div>
                <div className="form-group">
                  <label className="form-label">TIMELINE</label>
                  <input type="text" name="timeline" className="form-input" value={formData.timeline} onChange={handleChange} placeholder="EST. COMPLETION" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">MISSION OBJECTIVES <span className="req">*</span></label>
                <textarea name="objective" className="form-textarea" required value={formData.objective} onChange={handleChange} rows="5" placeholder="OUTLINE YOUR GOALS..." />
              </div>

              <div style={{ marginTop: '20px' }}>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'TRANSMITTING...' : 'INTIATE CONSULTATION REQUEST'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
