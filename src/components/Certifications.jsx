import { useEffect, useRef, useState, useCallback } from 'react';
import './Certifications.css';

/*
  HOW TO ADD CERTIFICATES:
  1. Drop your certificate images into: public/certs/
  2. Add an entry below with the filename, title, issuer, and optional rotate.
  
  The 'rotate' field (in degrees) corrects sideways photos.
  Example:
    { image: '/certs/my-certificate.jpg', title: 'Web Dev Bootcamp', issuer: 'Udemy', year: '2024', rotate: -90 },
*/
const certs = [
  { image: '/certs/digi-mc-2025.png', title: 'DIGI-MC 2025 — 2nd Place', issuer: 'City Government of Malaybalay / BukSU', year: '2025', rotate: -90 },
  { image: '/certs/mt-moriah-retreat.png', title: 'Youth Ministry Retreat — Self-Image: Discovering Your True Self', issuer: 'Mt. Moriah Youth Ministry', year: '2026', rotate: -90 },
  { image: '/certs/aclc-pinning-ceremony.jpg', title: 'OJT Pinning & Orientation — Work Attitude, Communication & Reliability', issuer: 'ACLC College — Bukidnon Campus', year: '2026', rotate: -90 },
  { image: '/certs/cyber-hygiene-training.jpg', title: 'Cyber Hygiene Training & Career Pathways in the Digital Economy', issuer: 'Brgy. Poblacion, Valencia City, Bukidnon', year: '2025', rotate: -90 },
  { image: '/certs/aclc-pinning-ceremony-2.jpg', title: 'OJT Pinning & Orientation — What Your Supervisor Actually Grades', issuer: 'ACLC College — Bukidnon Campus', year: '2026', rotate: -90 },
];

function CertCard({ cert, index, visible, onOpen }) {
  return (
    <div
      className={`cert-card ${visible ? 'cert-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
      onClick={() => onOpen(cert)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(cert); }}
    >
      <div className="cert-card__image-wrap">
        <img
          src={cert.image}
          alt={cert.title}
          className="cert-card__image"
          loading="lazy"
          style={cert.rotate ? { transform: `rotate(${cert.rotate}deg) scale(1.45)` } : undefined}
        />
        <div className="cert-card__overlay">
          <span className="cert-card__year">{cert.year}</span>
        </div>
      </div>
      <div className="cert-card__info">
        <h3 className="cert-card__title">{cert.title}</h3>
        <p className="cert-card__issuer">{cert.issuer}</p>
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
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="certifications" id="certifications" ref={sectionRef}>
      <div className="certifications__container">
        <div className="certifications__header">
          <span className="certifications__label">Achievements</span>
          <h2 className="certifications__title">Certifications & <span>Awards</span></h2>
          <p className="certifications__subtitle">
            Seminars, hackathons, and training programs I've participated in.
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

          <div className="certifications__track" ref={trackRef}>
            {certs.map((cert, i) => (
              <CertCard key={cert.title} cert={cert} index={i} visible={visible} onOpen={setActiveCert} />
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
        </div>
      </div>

      {activeCert && <Lightbox cert={activeCert} onClose={closeLightbox} />}
    </section>
  );
}
