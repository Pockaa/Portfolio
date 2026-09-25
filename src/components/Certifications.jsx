import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Certifications.css';

const certs = [
  {
    image: '/certs/quickbooks-online-advance.jpg',
    title: 'Quickbooks Online Advance Training',
    description: 'Skilled in using QuickBooks to support daily accounting tasks such as bookkeeping, invoicing, and bank reconciliation.',
    issuer: 'Freelance Academy',
    year: '2025',
  },
  {
    image: '/certs/real-estate-va.jpg',
    title: 'Real Estate Virtual Assistant',
    description: 'Experienced in remote real estate admin support, including data entry, email handling, scheduling, CRM maintenance, and document organization.',
    issuer: 'Freelance Academy',
    year: '2025',
  },
  {
    image: '/certs/va-social-media-marketing.jpg',
    title: 'Social Media Marketing',
    description: 'Experienced Social Media Marketing VA handling content scheduling, basic graphics, hashtag research, and engagement analytics to support brand growth.',
    issuer: 'Freelance Academy',
    year: '2025',
  },
  {
    image: '/certs/digi-mc-2025.png',
    title: 'DIGI-MC 2025 — 2nd Place Award',
    description: 'Achieved 2nd place in the DIGI-MC digital media competition, showcasing skills in creative design and digital problem-solving.',
    issuer: 'City Government of Malaybalay / BukSU',
    year: '2025',
    rotate: -90,
  },
  {
    image: '/certs/cyber-hygiene-training.jpg',
    title: 'Cyber Hygiene Training & Career Pathways',
    description: 'Completed training on cybersecurity best practices, digital safety awareness, and career pathways in the digital economy.',
    issuer: 'Brgy. Poblacion, Valencia City, Bukidnon',
    year: '2025',
    rotate: -90,
  },
  {
    image: '/certs/mt-moriah-retreat.png',
    title: 'Youth Ministry Retreat — Discovering Your True Self',
    description: 'Participated in a youth ministry retreat focused on self-image, personal growth, leadership, and identity discovery.',
    issuer: 'Mt. Moriah Youth Ministry',
    year: '2026',
    rotate: -90,
  },
  {
    image: '/certs/aclc-pinning-ceremony.jpg',
    title: 'OJT Pinning & Orientation — Work Attitude & Communication',
    description: 'Completed orientation covering professional work attitude, effective communication skills, and workplace reliability.',
    issuer: 'ACLC College — Bukidnon Campus',
    year: '2026',
    rotate: -90,
  },
  {
    image: '/certs/aclc-pinning-ceremony-2.jpg',
    title: 'OJT Pinning & Orientation — Supervisor Grading',
    description: 'Attended orientation on OJT evaluation criteria, understanding what supervisors assess during internship performance.',
    issuer: 'ACLC College — Bukidnon Campus',
    year: '2026',
    rotate: -90,
  },
];

export default function Certifications() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOpen = (index) => setSelectedIndex(index);
  const handleClose = useCallback(() => setSelectedIndex(null), []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % certs.length : null));
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + certs.length) % certs.length : null));
  }, []);

  return (
    <section className="certifications-section" id="certifications">
      <div className="certifications-container">
        <div className="certifications-header text-center">
          <span className="section-tag">Credentials & Training</span>
          <h2 className="section-title">
            Earned <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Professional training programs, technical workshops, and hackathon certificates earned across software development, virtual assistance, and IT cybersecurity.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {certs.map((cert, i) => (
            <div
              key={cert.title}
              className="cert-card"
              onClick={() => handleOpen(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpen(i);
              }}
            >
              <div className="cert-year-badge">{cert.year}</div>

              <div className="cert-image-wrap">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cert-image"
                  loading="lazy"
                  style={cert.rotate ? { transform: `rotate(${cert.rotate}deg) scale(1.4)` } : undefined}
                />
                <div className="cert-image-overlay">
                  <div className="cert-zoom-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                    <span>View Certificate</span>
                  </div>
                </div>
              </div>

              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-desc">{cert.description}</p>
                <div className="cert-issuer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                  <span>{cert.issuer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIndex !== null && (
        <LightboxModal
          cert={certs[selectedIndex]}
          index={selectedIndex}
          total={certs.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
        />
      )}
    </section>
  );
}

function LightboxModal({ cert, index, total, onNext, onPrev, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, onNext, onPrev]);

  return createPortal(
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="lightbox-close-btn" onClick={onClose} aria-label="Close Modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Prev Arrow */}
        <button className="lightbox-nav-btn lightbox-nav-btn--prev" onClick={onPrev} aria-label="Previous Certificate">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Image Frame */}
        <div className="lightbox-img-wrapper">
          <img
            src={cert.image}
            alt={cert.title}
            className="lightbox-img"
            style={cert.rotate ? { transform: `rotate(${cert.rotate}deg)` } : undefined}
          />
        </div>

        {/* Next Arrow */}
        <button className="lightbox-nav-btn lightbox-nav-btn--next" onClick={onNext} aria-label="Next Certificate">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Bottom Info Bar */}
        <div className="lightbox-footer">
          <div>
            <h4 className="lightbox-title">{cert.title}</h4>
            <p className="lightbox-meta">{cert.issuer} • {cert.year}</p>
          </div>
          <div className="lightbox-counter">{index + 1} / {total}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
