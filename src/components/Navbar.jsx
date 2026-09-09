import { useState } from 'react';
import './Navbar.css';

const mainNav = [
  {
    id: 'skills',
    label: 'Stack',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15l-2 5 3-1.5L16 20l-2-5" />
        <circle cx="12" cy="9" r="6" />
      </svg>
    ),
  },
  {
    id: 'portfolio',
    label: 'Projects',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Navbar({ activeTab, onSelectTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id) => {
    setIsOpen(false);
    onSelectTab?.(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`sidebar-toggle ${isOpen ? 'sidebar-toggle--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && <div className="sidebar-backdrop" onClick={() => setIsOpen(false)} />}

      {/* Left Sidebar Navbar */}
      <aside className={`sidebar-nav ${isOpen ? 'sidebar-nav--open' : ''}`}>
        <div className="sidebar-nav__inner">
          {/* Title Header */}
          <div className="sidebar-nav__header">
            <a
              href="#about"
              className={`sidebar-nav__title ${activeTab === 'about' ? 'sidebar-nav__title--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
            >
              Jert Adlaon
            </a>
          </div>

          {/* Main Navigation Section Links (Separated Tabs) */}
          <ul className="sidebar-nav__main">
            {mainNav.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="sidebar-nav__item">
                  <a
                    href={`#${item.id}`}
                    className={`sidebar-nav__main-link ${isActive ? 'sidebar-nav__main-link--active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                  >
                    <span className="sidebar-nav__icon">{item.icon}</span>
                    <span className="sidebar-nav__label">{item.label}</span>
                    {isActive && <span className="sidebar-nav__active-indicator">→</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}



