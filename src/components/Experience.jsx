import { useState } from 'react';
import './Experience.css';

const experiences = [
  {
    role: 'Shopify Product Lister',
    company: 'TwinAthletics',
    period: 'March 2025 – Feb 2026',
    type: 'E-Commerce',
    badgeColor: 'var(--accent-emerald)',
    description:
      'Managed product listings, inventory data, and catalog optimization on Shopify for TwinAthletics, ensuring accurate product details, high-converting descriptions, and organized store collections.',
    highlights: [
      'Created and managed high-quality product listings on Shopify',
      'Updated product titles, descriptions, pricing, and variants',
      'Organized product collections and tags for smooth store navigation',
      'Maintained accurate inventory data and catalog details',
    ],
  },
  {
    role: 'OJT — IT Support Specialist',
    company: 'M. Montesclaros Holdings Inc.',
    period: 'Jan 2026 – May 2026',
    type: 'Internship',
    badgeColor: 'var(--accent-cyan)',
    description:
      'Provided technical support by troubleshooting computers, printers, CCTV systems, and network devices. Assisted in fiber optic installation, data backup, hardware maintenance, and graphic design tasks.',
    highlights: [
      'Maintained company network infrastructure and resolved connectivity issues',
      'Assembled and troubleshot desktop PCs, printers, and peripherals',
      'Assisted with fiber optic cable splicing and Ethernet RJ45 installation',
      'Fixed CCTV camera wiring, installation, and NVR setup',
    ],
  },
  {
    role: 'InnoVa Hackathon — 3rd Place Winner',
    company: 'Valencia City / National ICT Month 2026',
    period: 'June 2026',
    type: 'Hackathon',
    badgeColor: 'var(--accent-purple)',
    description:
      'Competed in the InnoVa Hackathon held as part of the "Linaw, Hapsay, Bibo: Valencia Goes Digital" celebration of National ICT Month 2026. Evaluated by experts in tech, innovation, and digital transformation.',
    highlights: [
      'Achieved 3rd place overall among competing tech teams',
      'Developed an innovative digital software solution under strict time constraints',
      'Assessed on creativity, technical excellence, and real-world feasibility',
      'Presented solution live to a distinguished panel of industry judges',
    ],
  },
  {
    role: 'DIGI-MC 2025 — 2nd Place Winner',
    company: 'Malaybalay City / BukSU',
    period: 'October 2025',
    type: 'Competition',
    badgeColor: 'var(--accent-amber)',
    description:
      'Competed in the DIGI-MC digital media competition and achieved 2nd place, showcasing skills in creative design, digital problem-solving, and multimedia production.',
    highlights: [
      'Achieved 2nd place in the Solutions Showdown competition',
      'Developed creative tech solutions addressing local-to-global community challenges',
      'Recognized for technical skill, design quality, and community impact',
    ],
  },
  {
    role: 'NASA International Space Apps Challenge',
    company: 'NASA / Space Apps',
    period: 'October 2025',
    type: 'Hackathon',
    badgeColor: 'var(--accent-pink)',
    description:
      'Participated in the world\'s largest annual global hackathon, collaborating with a team to develop innovative solutions using NASA\'s open data and technology to address real-world challenges.',
    highlights: [
      'Built a working software prototype within 48 hours',
      'Collaborated on problem-solving, UI wireframing, and team ideation',
      'Utilized NASA open dataset APIs for project insights',
    ],
  },
  {
    role: 'Full-Stack Web & Mobile App Development',
    company: 'ACLC College — Capstone Project',
    period: '2025 – 2026',
    type: 'Academic Capstone',
    badgeColor: 'var(--accent-blue)',
    description:
      'Developed full-stack web and mobile applications as part of academic capstone coursework, applying modern frameworks, databases, and UI/UX design principles.',
    highlights: [
      'Built responsive web applications with React & JavaScript',
      'Created cross-platform mobile applications using React Native & Supabase',
      'Implemented REST APIs with Node.js and Express',
    ],
  },
];

export default function Experience() {
  const [filter, setFilter] = useState('All');

  const filterOptions = ['All', 'E-Commerce', 'Internship', 'Hackathon', 'Competition'];

  const filteredExperiences = filter === 'All'
    ? experiences
    : experiences.filter((exp) => exp.type === filter);

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <div className="experience-header text-center">
          <span className="section-tag">Career & Milestones</span>
          <h2 className="section-title">
            Work & Hackathon <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            My professional journey across software development, IT support internship, e-commerce catalog operations, and competitive hackathons.
          </p>

          {/* Filter Pills */}
          <div className="experience-filters">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                className={`exp-filter-btn ${filter === opt ? 'exp-filter-btn--active' : ''}`}
                onClick={() => setFilter(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Glowing Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline-line" />

          <div className="timeline-items">
            {filteredExperiences.map((exp, index) => (
              <div key={exp.role + exp.period} className="timeline-item">
                <div
                  className="timeline-dot"
                  style={{ '--dot-color': exp.badgeColor }}
                />

                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div className="timeline-card-meta">
                      <span
                        className="timeline-badge"
                        style={{ '--badge-color': exp.badgeColor }}
                      >
                        {exp.type}
                      </span>
                      <span className="timeline-period">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-company">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      {exp.company}
                    </div>
                  </div>

                  <p className="timeline-desc">{exp.description}</p>

                  <ul className="timeline-highlights">
                    {exp.highlights.map((item) => (
                      <li key={item} className="timeline-highlight-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
