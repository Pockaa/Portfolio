import { useState, useEffect } from 'react';
import './Navbar.css';

const navItems = [
  { id: 'hero', label: 'About' },
  { id: 'skills', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'portfolio', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ activeSection, theme, onToggleTheme, onNavigateSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Add box shadow & background blur intensity when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-header--scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
        >
          <div className="navbar-avatar">JA</div>
          <span className="navbar-title">
            Jert<span className="navbar-title-accent">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav-desktop">
          <ul className="navbar-nav-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (activeSection === '' && item.id === 'hero');
              return (
                <li key={item.id}>
                  <button
                    className={`navbar-link ${isActive ? 'navbar-link--active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                    {isActive && <span className="navbar-link-indicator" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header Actions: Theme Switcher + CTA */}
        <div className="navbar-actions">
          {/* Light / Dark Mode Toggle Switch */}
          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <div className={`theme-toggle-icon ${theme === 'dark' ? 'theme-toggle-icon--dark' : 'theme-toggle-icon--light'}`}>
              {theme === 'dark' ? (
                /* Sun Icon for Dark Mode (click to go Light) */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon Icon for Light Mode (click to go Dark) */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </div>
            <span className="theme-toggle-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          {/* Quick CTA Button */}
          <button
            className="navbar-cta-btn"
            onClick={() => handleNavClick('contact')}
          >
            Hire Me
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-toggle-btn ${mobileOpen ? 'mobile-toggle-btn--active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Drawer"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="navbar-avatar">JA</div>
              <span className="navbar-title">Jert Adlaon</span>
            </div>
            <ul className="mobile-drawer-list">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      className={`mobile-drawer-link ${isActive ? 'mobile-drawer-link--active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mobile-drawer-actions">
              <button className="mobile-theme-btn" onClick={onToggleTheme}>
                {theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
