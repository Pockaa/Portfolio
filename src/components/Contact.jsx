import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

// ─── EmailJS Configuration ─────────────────────────────────────────
// To make this work, you need to:
// 1. Create a free account at https://www.emailjs.com/
// 2. Add an email service (e.g. Gmail) and copy the Service ID
// 3. Create an email template with variables: {{name}}, {{email}}, {{message}}, {{title}}
// 4. Copy your Public Key from Account > API Keys
// Then replace the placeholder values below:
const EMAILJS_SERVICE_ID = 'service_eq9tbbf';
const EMAILJS_TEMPLATE_ID = 'template_s744gdg';
const EMAILJS_PUBLIC_KEY = 'JGzQfTzQgJk0IZXo-';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double-submit
    if (status === 'sending') return;

    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: 'Portfolio Contact',
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });

      // Reset back to idle after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setErrorMsg(
        error?.text || 'Something went wrong. Please try emailing directly.'
      );

      // Reset back to idle after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMsg('');
      }, 5000);
    }
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

        <form className="contact__form" onSubmit={handleSubmit} ref={formRef} id="contact-form">
          <input type="hidden" name="title" value="Portfolio Contact" />
          <div className="contact__field">
            <input
              type="text"
              name="name"
              id="contact-name"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="contact__input"
            />
          </div>
          <div className="contact__field">
            <input
              type="email"
              name="email"
              id="contact-email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="contact__input"
            />
          </div>
          <div className="contact__field">
            <textarea
              name="message"
              id="contact-message"
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="contact__textarea"
            />
          </div>

          {/* Error message */}
          {status === 'error' && (
            <p className="contact__error" id="contact-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className={`contact__submit ${status === 'sent' ? 'contact__submit--sent' : ''} ${status === 'error' ? 'contact__submit--error' : ''}`}
            id="contact-submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <span className="contact__spinner" />
                Sending...
              </>
            ) : status === 'sent' ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Message Sent!
              </>
            ) : status === 'error' ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Failed to Send
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
