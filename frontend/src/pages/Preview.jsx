import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Preview.css';

const TEMPLATE_STYLES = {
  modern:  { accent: '#6c63ff', bg: '#111118', headerBg: 'linear-gradient(135deg,#6c63ff,#8b85ff)' },
  classic: { accent: '#10d9a0', bg: '#111118', headerBg: 'linear-gradient(135deg,#10d9a0,#0aaa7a)' },
  minimal: { accent: '#f0eeff', bg: '#0d0d0d', headerBg: '#1a1a1a' },
  bold:    { accent: '#ff6b6b', bg: '#111118', headerBg: 'linear-gradient(135deg,#ff6b6b,#ee5a24)' },
  elegant: { accent: '#ffd700', bg: '#111118', headerBg: 'linear-gradient(135deg,#ffd700,#f39c12)' },
};

function Preview() {
  const [formData, setFormData] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('resume');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem('resumeForm');
    if (!saved) { navigate('/builder'); return; }
    const data = JSON.parse(saved);
    setFormData(data);
    generateContent(data);
  }, []);

  const generateContent = async (data) => {
    setLoading(true);
    try {
      const res = await fetch('https://ai-resume-builder-n6ih.onrender.com/api/generate-resume', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const result = await res.json();
      setResume(result.resume);
      if (result.coverLetter) setCoverLetter(result.coverLetter);
    } catch (err) {
      setResume(buildFallback(data));
    } finally { setLoading(false); }
  };

  const buildFallback = (d) => ({
    name: d.fullName, email: d.email, phone: d.phone, location: d.location,
    linkedin: d.linkedin, github: d.github,
    summary: `Results-driven ${d.targetRole} with expertise in ${d.skills?.split(',').slice(0,3).join(', ')}.`,
    education: { degree: d.degree, college: d.college, year: d.graduationYear, cgpa: d.cgpa },
    skills: d.skills,
    projects: [
      d.project1Title ? { title: d.project1Title, desc: d.project1Desc } : null,
      d.project2Title ? { title: d.project2Title, desc: d.project2Desc } : null,
    ].filter(Boolean),
    certifications: d.certifications, achievements: d.achievements,
    template: d.template || 'modern',
  });

  const handleDownload = async () => {
    try {
      const res = await fetch('https://ai-resume-builder-n6ih.onrender.com/api/download-pdf', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, formData }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${resume?.name || 'resume'}_resume.pdf`; a.click();
    } catch (err){
      console.error('PDF download failed:',err);
    }
  };

  if (loading) return (
    <div className="preview-loading">
      <div className="preview-loading__spinner" />
      <p>AI is generating your resume...</p>
    </div>
  );

  const template = formData?.template || 'modern';
  const style = TEMPLATE_STYLES[template] || TEMPLATE_STYLES.modern;

  return (
    <main className="preview">
      <div className="container">
        <div className="preview__header">
          <div><span className="badge badge-green">Ready!</span><h1 className="preview__title">Your AI Resume</h1></div>
          <div className="preview__actions">
            <button className="btn-outline" onClick={() => navigate('/builder')}>← Edit</button>
            <button className="btn-primary" onClick={handleDownload}>⬇ Download PDF</button>
          </div>
        </div>
        <div className="preview__tabs">
          <button className={`preview__tab ${activeTab==='resume'?'active':''}`} onClick={() => setActiveTab('resume')}>Resume</button>
          {coverLetter && <button className={`preview__tab ${activeTab==='cover'?'active':''}`} onClick={() => setActiveTab('cover')}>Cover Letter</button>}
        </div>

        {activeTab === 'resume' && resume && (
          <div className="resume-doc card" style={{background: style.bg}}>
            <div className="resume-doc__header" style={{background: style.headerBg}}>
              <h1 className="resume-doc__name">{resume.name}</h1>
              <div className="resume-doc__contacts">
                {resume.email && <span>📧 {resume.email}</span>}
                {resume.phone && <span>📱 {resume.phone}</span>}
                {resume.location && <span>📍 {resume.location}</span>}
                {resume.linkedin && <span>🔗 {resume.linkedin}</span>}
                {resume.github && <span>💻 {resume.github}</span>}
              </div>
            </div>

            {resume.summary && (
              <div className="resume-doc__section">
                <h2 className="resume-doc__section-title" style={{color: style.accent}}>PROFESSIONAL SUMMARY</h2>
                <p className="resume-doc__text">{resume.summary}</p>
              </div>
            )}
            {resume.education?.degree && (
              <div className="resume-doc__section">
                <h2 className="resume-doc__section-title" style={{color: style.accent}}>EDUCATION</h2>
                <div className="resume-doc__entry">
                  <div className="resume-doc__entry-header"><strong>{resume.education.degree}</strong><span className="resume-doc__entry-date">{resume.education.year}</span></div>
                  <div className="resume-doc__entry-sub">{resume.education.college}{resume.education.cgpa && ` · CGPA: ${resume.education.cgpa}`}</div>
                </div>
              </div>
            )}
            {resume.skills && (
              <div className="resume-doc__section">
                <h2 className="resume-doc__section-title" style={{color: style.accent}}>TECHNICAL SKILLS</h2>
                <div className="resume-doc__skills">
                  {resume.skills.split(',').map((s,i) => <span className="resume-doc__skill-tag" key={i} style={{borderColor: style.accent+'44'}}>{s.trim()}</span>)}
                </div>
              </div>
            )}
            {resume.projects?.length > 0 && (
              <div className="resume-doc__section">
                <h2 className="resume-doc__section-title" style={{color: style.accent}}>PROJECTS</h2>
                {resume.projects.map((p,i) => <div className="resume-doc__entry" key={i}><strong className="resume-doc__project-title">{p.title}</strong><p className="resume-doc__text">{p.desc}</p></div>)}
              </div>
            )}
            {resume.certifications && (
              <div className="resume-doc__section">
                <h2 className="resume-doc__section-title" style={{color: style.accent}}>CERTIFICATIONS</h2>
                <p className="resume-doc__text">{resume.certifications}</p>
              </div>
            )}
            {resume.achievements && (
              <div className="resume-doc__section">
                <h2 className="resume-doc__section-title" style={{color: style.accent}}>ACHIEVEMENTS</h2>
                <p className="resume-doc__text">{resume.achievements}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'cover' && coverLetter && (
          <div className="resume-doc card">
            <div className="resume-doc__section">
              <h2 className="resume-doc__section-title" style={{color: style.accent}}>COVER LETTER</h2>
              <p className="resume-doc__text" style={{whiteSpace:'pre-line'}}>{coverLetter}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
export default Preview;
