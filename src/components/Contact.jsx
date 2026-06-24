import { useState, useRef, useEffect } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ email: '', message: '' });
    }, 3000);
  };

  return (
    <section className={`contact ${visible ? 'contact--visible' : ''}`} id="contact" ref={sectionRef}>
      <div className="contact__container">
        <div className="contact__content">
          <span className="contact__label">Get In Touch</span>
          <h2 className="contact__title">Connect with <span>me</span></h2>
          <p className="contact__text">
            Have a project in mind or just want to chat? Feel free to reach out.
            I'm always open to new opportunities and collaborations.
          </p>

          <div className="contact__info">
            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <span className="contact__info-label">Email</span>
                <span className="contact__info-value">jertadlaon@gmail.com</span>
              </div>
            </div>
            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="contact__info-label">Location</span>
                <span className="contact__info-value">Philippines</span>
              </div>
            </div>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
          <div className="contact__field">
            <input
              type="email"
              id="contact-email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="contact__input"
            />
          </div>
          <div className="contact__field">
            <textarea
              id="contact-message"
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="contact__textarea"
            />
          </div>
          <button
            type="submit"
            className={`contact__submit ${submitted ? 'contact__submit--sent' : ''}`}
            id="contact-submit"
          >
            {submitted ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Message Sent!
              </>
            ) : (
              <>
                Stay Connected
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Decorative timeline */}
      <div className="contact__decoration">
        <div className="contact__deco-line"></div>
        <div className="contact__deco-dot contact__deco-dot--1"></div>
        <div className="contact__deco-dot contact__deco-dot--2"></div>
        <div className="contact__deco-dot contact__deco-dot--3"></div>
      </div>
    </section>
  );
}
