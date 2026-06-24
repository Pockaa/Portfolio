import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__top">
          <a href="#home" className="footer__logo">
            Jert<span>.</span>
          </a>
          <p className="footer__tagline">Dedicated IT graduate creating efficient and innovative technology solutions.</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">Navigation</h4>
            <a href="#home" className="footer__link">Home</a>
            <a href="#skills" className="footer__link">Skills</a>
            <a href="#about" className="footer__link">About</a>
            <a href="#portfolio" className="footer__link">Portfolio</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Social</h4>
            <a href="https://github.com/Pockaa" className="footer__link" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/" className="footer__link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://facebook.com/" className="footer__link" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <a href="mailto:jertadlaon@gmail.com" className="footer__link">jertadlaon@gmail.com</a>
            <a href="#contact" className="footer__link">Send a Message</a>
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
