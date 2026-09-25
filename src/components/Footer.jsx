import './Footer.css';

export default function Footer({ onNavigateSection }) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-avatar">JA</div>
            <div>
              <h3 className="footer-title">Jert Adlaon</h3>
              <p className="footer-tagline">
                IT Graduate • Full-Stack & Mobile Developer • Shopify & IT Support Specialist
              </p>
            </div>
          </div>

          <div className="footer-socials">
            <a
              href="https://github.com/Pockaa"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub Profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/jxrt-adlaon-750970320/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn Profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="mailto:jertadlaon@gmail.com"
              className="footer-social-link"
              aria-label="Send Email"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-nav">
          <button className="footer-nav-link" onClick={() => handleScrollTo('hero')}>About</button>
          <button className="footer-nav-link" onClick={() => handleScrollTo('skills')}>Stack</button>
          <button className="footer-nav-link" onClick={() => handleScrollTo('experience')}>Experience</button>
          <button className="footer-nav-link" onClick={() => handleScrollTo('portfolio')}>Projects</button>
          <button className="footer-nav-link" onClick={() => handleScrollTo('certifications')}>Certifications</button>
          <button className="footer-nav-link" onClick={() => handleScrollTo('contact')}>Contact</button>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {currentYear} Jert Adlaon. Crafted with passion & precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
