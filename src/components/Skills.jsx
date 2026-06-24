import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const skillCategories = [
  {
    category: 'Programming & Development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
    skills: ['HTML, CSS, JS', 'React', 'React Native', 'Node.js', 'Git', 'JavaScript', 'TypeScript'],
    color: '#ff4655',
  },
  {
    category: 'Networking & Hardware',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    skills: ['Fiber Optic Cable Splicing', 'Ethernet Cable Crimping (RJ45)', 'LAN/WLAN Installation & Troubleshooting', 'PC Assembly & Troubleshooting'],
    color: '#61dafb',
  },
  {
    category: 'Multimedia & Design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    skills: ['Adobe Photoshop', 'Photo Editing & Graphic Design', 'Video Editing & Multimedia Production'],
    color: '#ff7eb3',
  },
  {
    category: 'Productivity Tools',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    skills: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
    color: '#f0db4f',
  },
];

function SkillCategory({ category, icon, skills, color, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`skill-card ${visible ? 'skill-card--visible' : ''}`}
      ref={cardRef}
      style={{ transitionDelay: `${index * 0.1}s`, '--card-accent': color }}
    >
      <div className="skill-card__header">
        <div className="skill-card__icon" style={{ '--icon-color': color }}>{icon}</div>
        <h3 className="skill-card__title">{category}</h3>
      </div>

      <ul className="skill-card__list">
        {skills.map((skill) => (
          <li key={skill} className="skill-card__item" style={{ '--bullet-color': color }}>
            {skill}
          </li>
        ))}
      </ul>

      <div className="skill-card__shine"></div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills__container">
        <div className="skills__header">
          <span className="skills__label">What I Know</span>
          <h2 className="skills__title">Skills & <span>Services</span></h2>
          <p className="skills__subtitle">
            A comprehensive overview of my technical expertise across multiple disciplines.
          </p>
        </div>

        <div className="skills__grid">
          {skillCategories.map((cat, i) => (
            <SkillCategory key={cat.category} {...cat} index={i} />
          ))}
        </div>
      </div>

      {/* Decorative timeline on the right */}
      <div className="skills__timeline">
        <div className="skills__timeline-line"></div>
        <div className="skills__timeline-dot skills__timeline-dot--1"></div>
        <div className="skills__timeline-dot skills__timeline-dot--2"></div>
        <div className="skills__timeline-dot skills__timeline-dot--3"></div>
      </div>
    </section>
  );
}
