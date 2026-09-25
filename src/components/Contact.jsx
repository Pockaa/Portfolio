import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const EMAILJS_SERVICE_ID = 'service_eq9tbbf';
const EMAILJS_TEMPLATE_ID = 'template_s744gdg';
const EMAILJS_PUBLIC_KEY = 'JGzQfTzQgJk0IZXo-';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jertadlaon@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          title: 'Portfolio Contact Form',
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setErrorMsg(error?.text || 'Something went wrong. Please email directly.');
      setTimeout(() => {
        setStatus('idle');
        setErrorMsg('');
      }, 5000);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Contact Left Text */}
        <div className="contact-info-col">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Great Together</span>
          </h2>
          <p className="contact-description">
            I'm currently seeking remote opportunities, freelance collaborations, and full-time IT/software development roles. Feel free to send me a message or copy my email address below!
          </p>

          <div className="contact-cards-list">
            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-card-body">
                <span className="contact-card-label">Direct Email</span>
                <span className="contact-card-value">jertadlaon@gmail.com</span>
              </div>
              <button
                className="contact-copy-btn"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-card-body">
                <span className="contact-card-label">Location</span>
                <span className="contact-card-value">Bukidnon, Philippines (Remote Ready)</span>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="contact-card-body">
                <span className="contact-card-label">Availability</span>
                <span className="contact-card-value">Open to Full-Time, Remote & Freelance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-col">
          <form className="contact-form-card" onSubmit={handleSubmit} ref={formRef}>
            <h3 className="contact-form-title">Send a Message</h3>

            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Your Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Your Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="form-textarea"
              />
            </div>

            {status === 'error' && (
              <div className="form-error-alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className={`form-submit-btn ${status === 'sent' ? 'form-submit-btn--sent' : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <span className="form-spinner" />
                  Sending Message...
                </>
              ) : status === 'sent' ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Message Sent Successfully!
                </>
              ) : (
                <>
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
