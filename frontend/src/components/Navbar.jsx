import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">⚡</span>
          <span className="navbar__logo-text">ResumeAI</span>
        </Link>
        <div className="navbar__links">
          <Link to="/" className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/builder" className={`navbar__link ${location.pathname === '/builder' ? 'active' : ''}`}>Builder</Link>
          <Link to="/preview" className={`navbar__link ${location.pathname === '/preview' ? 'active' : ''}`}>Preview</Link>
        </div>
        <Link to="/builder" className="btn-primary navbar__cta">Build Resume</Link>
      </div>
    </nav>
  );
}
export default Navbar;
