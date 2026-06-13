import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  { icon: '🤖', title: 'AI-Generated Content', desc: 'Gemini AI writes your resume summary, skills, and achievements tailored to your target role.' },
  { icon: '✉️', title: 'Cover Letter Builder', desc: 'Paste a job description and get a personalized cover letter in seconds.' },
  { icon: '📄', title: 'PDF Download', desc: 'Export a clean, ATS-friendly PDF resume ready to send to recruiters.' },
  { icon: '🎨', title: 'Multiple Templates', desc: 'Choose from 5 beautiful resume templates — modern, classic, minimal and more.' },
];

const steps = [
  { step: 'Fill Your Details', desc: 'Name, education, skills, projects — a simple form.' },
  { step: 'AI Generates Content', desc: 'Our AI writes professional summaries and descriptions for you.' },
  { step: 'Download & Apply', desc: 'Get your PDF resume and cover letter instantly.' },
];

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="container hero__content">
          <div className="badge" style={{ marginBottom: '24px' }}>IBM Internship Project</div>
          <h1 className="hero__title">Your Resume,<br /><span className="hero__title--accent">Built by AI</span></h1>
          <p className="hero__subtitle">Stop struggling with resume formats. Fill in your details, let AI craft the perfect resume and cover letter — download in one click.</p>
          <div className="hero__actions">
            <Link to="/builder" className="btn-primary">Start Building Free →</Link>
            <Link to="/preview" className="btn-outline">See Example</Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat"><span className="hero__stat-num">AI</span><span className="hero__stat-label">Powered by Gemini</span></div>
            <div className="hero__stat-divider" />
            <div className="hero__stat"><span className="hero__stat-num">100%</span><span className="hero__stat-label">Free to use</span></div>
            <div className="hero__stat-divider" />
            <div className="hero__stat"><span className="hero__stat-num">5</span><span className="hero__stat-label">Templates</span></div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Features</span>
            <h2 className="section-title">Everything you need to get hired</h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="steps-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">How It Works</span>
            <h2 className="section-title">Three steps to your dream job</h2>
          </div>
          <div className="steps-list">
            {steps.map((s, i) => (
              <div className="step-item" key={i}>
                <div className="step-number">{i + 1}</div>
                <div className="step-body"><h3 className="step-title">{s.step}</h3><p className="step-desc">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card card">
            <h2 className="cta-title">Ready to build your resume?</h2>
            <p className="cta-sub">Free. Fast. AI-powered. No sign-up needed.</p>
            <Link to="/builder" className="btn-primary">Build My Resume Now →</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>
            Built with ❤️ for IBM Edunet Foundation Internship · Vishal Fulbandhe · SISTec-R Bhopal
            <br />
            <a href="https://github.com/codervishal207max" target="_blank" rel="noreferrer" style={{color:'#6c63ff', marginRight:'16px'}}>GitHub</a>
            <a href="https://www.linkedin.com/in/vishal-fulbandhe-16662832b" target="_blank" rel="noreferrer" style={{color:'#10d9a0'}}>LinkedIn</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
export default Home;
