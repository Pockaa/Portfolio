import { useEffect, useRef, useState, useCallback } from 'react';
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

function CertSlide({ cert, onOpen }) {
  return (
    <div className="cert-slide">
      <div className="cert-slide__year-badge">{cert.year}</div>
      <div
        className="cert-slide__image-wrap"
        onClick={() => onOpen(cert)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(cert); }}
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="cert-slide__image"
          loading="lazy"
          style={cert.rotate ? { transform: `rotate(${cert.rotate}deg) scale(1.45)` } : undefined}
        />
        <div className="cert-slide__image-overlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          </svg>
          <span>View</span>
        </div>
      </div>
      <div className="cert-slide__info">
        <h3 className="cert-slide__title">{cert.title}</h3>
        <p className="cert-slide__desc">{cert.description}</p>
        <span className="cert-slide__issuer">{cert.issuer}</span>
      </div>
    </div>
  );
}

function Lightbox({ cert, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
        <img
          src={cert.image}
          alt={cert.title}
          className="lightbox__image"
          style={cert.rotate ? { transform: `rotate(${cert.rotate}deg)` } : undefined}
        />
        <div className="lightbox__caption">
          <h3>{cert.title}</h3>
          <p>{cert.issuer} · {cert.year}</p>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCert, setActiveCert] = useState(null);

  const closeLightbox = useCallback(() => setActiveCert(null), []);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const updateScrollButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, []);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = 340;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="certifications" id="certifications" ref={sectionRef}>
      <div className="certifications__container">
        <div className="certifications__header">
          <span className="certifications__label">Achievements</span>
          <h2 className="certifications__title">Earned <span>Certificates</span></h2>
          <p className="certifications__subtitle">
            Professional training, seminars, and programs I've completed.
          </p>
        </div>

        <div className="certifications__carousel">
          {canScrollLeft && (
            <button
              className="certifications__arrow certifications__arrow--left"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div
            className={`certifications__track ${visible ? 'certifications__track--visible' : ''}`}
            ref={trackRef}
          >
            {certs.map((cert) => (
              <CertSlide key={cert.title} cert={cert} onOpen={setActiveCert} />
            ))}
          </div>

          {canScrollRight && (
            <button
              className="certifications__arrow certifications__arrow--right"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          <div className="certifications__counter">
            <span>{certs.length} certificates</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {activeCert && <Lightbox cert={activeCert} onClose={closeLightbox} />}
    </section>
  );
}
