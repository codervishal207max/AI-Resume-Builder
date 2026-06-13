import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Builder.css';

const initialForm = {
  fullName:'',email:'',phone:'',linkedin:'',github:'',location:'',
  targetRole:'',yearsExp:'',degree:'',college:'',graduationYear:'',cgpa:'',
  skills:'',project1Title:'',project1Desc:'',project2Title:'',project2Desc:'',
  certifications:'',achievements:'',jobDescription:'',template:'modern'
};

const TEMPLATES = [
  { id:'modern', label:'Modern', color:'#6c63ff' },
  { id:'classic', label:'Classic', color:'#10d9a0' },
  { id:'minimal', label:'Minimal', color:'#f0eeff' },
  { id:'bold', label:'Bold', color:'#ff6b6b' },
  { id:'elegant', label:'Elegant', color:'#ffd700' },
];

function Builder() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const navigate = useNavigate();
  const sections = ['Personal','Education','Skills & Projects','Template','Cover Letter'];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGenerate = async () => {
    setLoading(true);
    sessionStorage.setItem('resumeForm', JSON.stringify(form));
    navigate('/preview');
    setLoading(false);
  };

  return (
    <main className="builder">
      <div className="container">
        <div className="builder__header">
          <span className="badge">Resume Builder</span>
          <h1 className="builder__title">Fill your details</h1>
          <p className="builder__sub">AI will generate professional content from your inputs.</p>
        </div>
        <div className="builder__tabs">
          {sections.map((s, i) => (
            <button key={i} className={`builder__tab ${activeSection===i?'active':''}`} onClick={() => setActiveSection(i)}>
              <span className="builder__tab-num">{i+1}</span>{s}
            </button>
          ))}
        </div>
        <div className="builder__body">
          {activeSection === 0 && (
            <div className="builder__section card">
              <h2 className="builder__section-title">Personal Information</h2>
              <div className="form-grid">
                <div className="form-group"><label>Full Name *</label><input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Vishal Sharma" /></div>
                <div className="form-group"><label>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" /></div>
                <div className="form-group"><label>Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" /></div>
                <div className="form-group"><label>Location</label><input name="location" value={form.location} onChange={handleChange} placeholder="Bhopal, MP" /></div>
                <div className="form-group"><label>LinkedIn URL</label><input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/yourname" /></div>
                <div className="form-group"><label>GitHub URL</label><input name="github" value={form.github} onChange={handleChange} placeholder="github.com/username" /></div>
                <div className="form-group"><label>Target Role *</label><input name="targetRole" value={form.targetRole} onChange={handleChange} placeholder="Data Scientist Intern" /></div>
                <div className="form-group"><label>Experience</label><input name="yearsExp" value={form.yearsExp} onChange={handleChange} placeholder="Fresher / 1 year" /></div>
              </div>
            </div>
          )}
          {activeSection === 1 && (
            <div className="builder__section card">
              <h2 className="builder__section-title">Education</h2>
              <div className="form-grid">
                <div className="form-group"><label>Degree *</label><input name="degree" value={form.degree} onChange={handleChange} placeholder="B.Tech CSE (AI/ML)" /></div>
                <div className="form-group"><label>College *</label><input name="college" value={form.college} onChange={handleChange} placeholder="SISTec-R, RGPV Bhopal" /></div>
                <div className="form-group"><label>Graduation Year</label><input name="graduationYear" value={form.graduationYear} onChange={handleChange} placeholder="2028" /></div>
                <div className="form-group"><label>CGPA</label><input name="cgpa" value={form.cgpa} onChange={handleChange} placeholder="8.5 / 10" /></div>
                <div className="form-group" style={{gridColumn:'1/-1'}}><label>Certifications</label><textarea name="certifications" value={form.certifications} onChange={handleChange} rows={3} placeholder="IBM AI Fundamentals, Google Cloud..." /></div>
                <div className="form-group" style={{gridColumn:'1/-1'}}><label>Achievements</label><textarea name="achievements" value={form.achievements} onChange={handleChange} rows={3} placeholder="Top 10 at Oriental TechHack 2.0..." /></div>
              </div>
            </div>
          )}
          {activeSection === 2 && (
            <div className="builder__section card">
              <h2 className="builder__section-title">Skills & Projects</h2>
              <div className="form-group"><label>Technical Skills *</label><textarea name="skills" value={form.skills} onChange={handleChange} rows={3} placeholder="Python, Machine Learning, SQL, React, FastAPI..." /></div>
              <div className="divider" />
              <h3 className="builder__subsection-title">Project 1</h3>
              <div className="form-grid">
                <div className="form-group"><label>Title</label><input name="project1Title" value={form.project1Title} onChange={handleChange} placeholder="CareerLens — AI Career Path Predictor" /></div>
                <div className="form-group" style={{gridColumn:'1/-1'}}><label>Description</label><textarea name="project1Desc" value={form.project1Desc} onChange={handleChange} rows={3} placeholder="Built using XGBoost and React..." /></div>
              </div>
              <h3 className="builder__subsection-title" style={{marginTop:'16px'}}>Project 2</h3>
              <div className="form-grid">
                <div className="form-group"><label>Title</label><input name="project2Title" value={form.project2Title} onChange={handleChange} placeholder="AI Resume Builder" /></div>
                <div className="form-group" style={{gridColumn:'1/-1'}}><label>Description</label><textarea name="project2Desc" value={form.project2Desc} onChange={handleChange} rows={3} placeholder="Full-stack AI app using FastAPI and React..." /></div>
              </div>
            </div>
          )}
          {activeSection === 3 && (
            <div className="builder__section card">
              <h2 className="builder__section-title">Choose Template</h2>
              <p className="builder__section-hint">Select a resume style that fits your personality.</p>
              <div className="template-grid">
                {TEMPLATES.map((t) => (
                  <div key={t.id} className={`template-card ${form.template===t.id?'selected':''}`} onClick={() => setForm({...form, template: t.id})}>
                    <div className="template-preview" style={{borderColor: t.color}}>
                      <div className="template-preview__header" style={{background: t.color}} />
                      <div className="template-preview__lines">
                        <div className="template-preview__line" />
                        <div className="template-preview__line short" />
                        <div className="template-preview__line" />
                        <div className="template-preview__line short" />
                      </div>
                    </div>
                    <span className="template-label" style={{color: form.template===t.id ? t.color : 'var(--text-secondary)'}}>{t.label}</span>
                    {form.template===t.id && <span className="template-check">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === 4 && (
            <div className="builder__section card">
              <h2 className="builder__section-title">Cover Letter (Optional)</h2>
              <p className="builder__section-hint">Paste the job description — AI will write a personalized cover letter.</p>
              <div className="form-group"><label>Job Description</label><textarea name="jobDescription" value={form.jobDescription} onChange={handleChange} rows={10} placeholder="Paste the full job description here..." /></div>
            </div>
          )}
          <div className="builder__nav">
            {activeSection > 0 && <button className="btn-outline" onClick={() => setActiveSection(activeSection-1)}>← Back</button>}
            {activeSection < sections.length-1
              ? <button className="btn-primary" onClick={() => setActiveSection(activeSection+1)}>Next →</button>
              : <button className="btn-primary" onClick={handleGenerate} disabled={loading || !form.fullName || !form.targetRole}>
                  {loading ? 'Generating...' : '✨ Generate with AI →'}
                </button>
            }
          </div>
        </div>
      </div>
    </main>
  );
}
export default Builder;
