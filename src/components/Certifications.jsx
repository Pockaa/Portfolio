import { useEffect, useRef, useState, useCallback } from 'react';
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
    title: 'DIGI-MC 2025 — 2nd Place',
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
    description: 'Participated in a youth ministry retreat focused on self-image, personal growth, and identity discovery.',
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

function CertCard({ cert, index, onOpen }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`cert-card ${visible ? 'cert-card--visible' : ''}`}
      ref={cardRef}
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(index); }}
    >
      <div className="cert-card__year-badge">{cert.year}</div>
      <div className="cert-card__image-wrap">
        <img
          src={cert.image}
          alt={cert.title}
          className="cert-card__image"
          loading="lazy"
          style={cert.rotate ? { transform: `rotate(${cert.rotate}deg) scale(1.45)` } : undefined}
        />
        <div className="cert-card__image-overlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          </svg>
          <span>View Certificate</span>
        </div>
      </div>
      <div className="cert-card__info">
        <h3 className="cert-card__title">{cert.title}</h3>
        <p className="cert-card__desc">{cert.description}</p>
        <span className="cert-card__issuer">{cert.issuer}</span>
      </div>
    </div>
  );
}

function Lightbox({ cert, index, total, onNext, onPrev, onClose }) {
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
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="lightbox__close-btn" onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Previous Button */}
        <button className="lightbox__arrow-btn lightbox__arrow-btn--prev" onClick={onPrev} aria-label="Previous certificate">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Image Frame */}
        <div className="lightbox__img-container">
          <img
            src={cert.image}
            alt={cert.title}
            className={`lightbox__img ${cert.rotate ? 'lightbox__img--rotated' : ''}`}
          />
        </div>

        {/* Next Button */}
        <button className="lightbox__arrow-btn lightbox__arrow-btn--next" onClick={onNext} aria-label="Next certificate">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Info Bar at Bottom */}
        <div className="lightbox__info-bar">
          <div className="lightbox__info-text">
            <h3 className="lightbox__title">{cert.title}</h3>
            <p className="lightbox__meta">{cert.issuer} · {cert.year}</p>
          </div>
          <span className="lightbox__counter">{index + 1} / {total}</span>
        </div>
      </div>
    </div>,
    document.body
  );
}

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
    <section className="certifications" id="certifications">
      <div className="certifications__container">
        <div className="certifications__header">
          <h2 className="certifications__title">Earned <span>Certificates</span></h2>
          <p className="certifications__subtitle">
            Professional training, seminars, and programs I've completed.
          </p>
        </div>

        <div className="certifications__grid">
          {certs.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} onOpen={handleOpen} />
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <Lightbox
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

