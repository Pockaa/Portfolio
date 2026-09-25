import './Skills.css';

const skillCategories = [
  {
    category: 'Programming & Development',
    badge: 'Front-end & UI/UX',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    accentColor: 'var(--accent-cyan)',
    skills: [
      'React & React Native',
      'JavaScript & TypeScript',
      'HTML5, CSS3, Modern Styling',
      'Next.js',
      'Figma',
    ],
  },
  {
    category: 'Multimedia & Content Production',
    badge: 'Video & Visuals',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    accentColor: 'var(--accent-purple)',
    skills: [
      'CapCut',
      'Adobe Premiere Pro',
      'Adobe Photoshop',
    ],
  },
  {
    category: 'Virtual Assistance',
    badge: 'Admin & Store Ops',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    accentColor: 'var(--accent-pink)',
    skills: [
      'Shopify Product Listing & Inventory',
      'QuickBooks Bookkeeping',
      'Microsoft Office (Excel, Word, PowerPoint)',
    ],
  },
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <div className="skills-header text-center">
          <span className="section-tag">Tech Stack & Expertise</span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Proficiencies</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical capabilities spanning web & mobile software development, digital video editing, and e-commerce virtual assistance.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat) => (
            <div
              key={cat.category}
              className="skill-card"
              style={{ '--card-accent': cat.accentColor }}
            >
              <div className="skill-card-header">
                <div className="skill-card-icon" style={{ color: cat.accentColor }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="skill-card-title">{cat.category}</h3>
                  <span className="skill-card-badge">{cat.badge}</span>
                </div>
              </div>

              <div className="skill-tags-grid">
                {cat.skills.map((skill) => (
                  <div key={skill} className="skill-badge-item">
                    <span className="skill-badge-dot" style={{ backgroundColor: cat.accentColor }} />
                    <span className="skill-badge-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
