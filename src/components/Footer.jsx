import './Footer.css';

export default function Footer({ onSelectTab }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (e, id) => {
    e.preventDefault();
    onSelectTab?.(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__top">
          <a href="#home" className="footer__logo" onClick={(e) => handleNav(e, 'home')}>
            Jert Adlaon<span>.</span>
          </a>
          <p className="footer__tagline">Dedicated IT graduate creating efficient and innovative technology solutions.</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">Navigation</h4>
            <a href="#home" className="footer__link" onClick={(e) => handleNav(e, 'home')}>Home</a>
            <a href="#about" className="footer__link" onClick={(e) => handleNav(e, 'about')}>About</a>
            <a href="#skills" className="footer__link" onClick={(e) => handleNav(e, 'skills')}>Skills</a>
            <a href="#experience" className="footer__link" onClick={(e) => handleNav(e, 'experience')}>Experience</a>
            <a href="#certifications" className="footer__link" onClick={(e) => handleNav(e, 'certifications')}>Certifications</a>
            <a href="#portfolio" className="footer__link" onClick={(e) => handleNav(e, 'portfolio')}>Portfolio</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Social</h4>
            <a href="https://github.com/Pockaa" className="footer__link" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/jxrt-adlaon-750970320/" className="footer__link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://facebook.com/" className="footer__link" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <a href="mailto:jertadlaon@gmail.com" className="footer__link">jertadlaon@gmail.com</a>
            <a href="#contact" className="footer__link" onClick={(e) => handleNav(e, 'contact')}>Send a Message</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Jert Adlaon. All rights reserved.
          </p>
          <p className="footer__credit">
            Designed &amp; Built with <span className="footer__heart">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
