import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const roles = [
  'Front-End Developer',
  'Web Designer',
  'Video & Media Editor',
  'Virtual Assistant',
];

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '5+', label: 'Featured Projects' },
  { value: '8+', label: 'Certifications' },
  { value: '100%', label: 'Remote Ready' },
];

const techBadges = [
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'React Native', icon: '📱', color: '#38bdf8' },
  { name: 'TypeScript', icon: '📘', color: '#3178c6' },
  { name: 'Node.js', icon: '🟢', color: '#22c55e' },
  { name: 'Shopify', icon: '🛍️', color: '#96bf48' },
  { name: 'Supabase', icon: '⚡', color: '#3ecf8e' },
];

export default function Hero({ onNavigateSection }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const decorRef = useRef(null);

  // Typewriter effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Mouse tilt effect for hero visual
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!decorRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      decorRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        {/* Hero Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Available for Freelance & Remote Work</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Jert Adlaon</span>
          </h1>

          <div className="hero-role-wrapper">
            <span className="hero-role-prefix">I am a </span>
            <span className="hero-role-text">{displayText}</span>
            <span className="hero-cursor">|</span>
          </div>

          <p className="hero-description">
            IT graduate with versatile hands-on experience spanning web & mobile development, IT infrastructure support, Shopify e-commerce catalog management, and multimedia video editing. Dedicated to crafting elegant digital products with high attention to detail.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection('portfolio')}
            >
              Explore Projects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </button>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat-card">
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Right Visual Orbit */}
        <div className="hero-visual" ref={decorRef}>
          <div className="hero-avatar-card">
            <div className="hero-avatar-glow" />
            <div className="hero-avatar-frame">
              <img
                src="/jert-profile.jpg"
                alt="Jert Ronalf A. Adlaon"
                className="hero-profile-full-img"
              />
              <div className="hero-avatar-overlay">
                <div className="hero-avatar-tag">Jert Adlaon • IT Professional</div>
              </div>
            </div>

            {/* Orbit Rings */}
            <div className="hero-orbit-ring hero-orbit-ring--outer" />
            <div className="hero-orbit-ring hero-orbit-ring--inner" />

            {/* Floating Tech Chips */}
            {techBadges.map((badge, idx) => (
              <div
                key={badge.name}
                className={`hero-tech-chip hero-tech-chip--${idx + 1}`}
                style={{ '--badge-color': badge.color }}
              >
                <span className="hero-chip-icon">{badge.icon}</span>
                <span className="hero-chip-name">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
