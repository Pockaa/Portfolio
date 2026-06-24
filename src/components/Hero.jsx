import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const decorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!decorRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      decorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Available for work
          </div>
          <h1 className="hero__title">
            Hello I'm<br />
            <span className="hero__title-accent">Jert Adlaon</span>
          </h1>
          <p className="hero__description">
            Dedicated IT graduate with strong technical skills, committed to
            creating efficient and innovative technology solutions.
          </p>
          <a href="#portfolio" className="hero__cta" id="hero-cta">
            Creator Journey
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="hero__visual" ref={decorRef}>
          <div className="hero__orbit">
            <div className="hero__orbit-ring hero__orbit-ring--1">
              <div className="hero__orbit-dot hero__orbit-dot--filled"></div>
            </div>
            <div className="hero__orbit-ring hero__orbit-ring--2">
              <div className="hero__orbit-dot"></div>
            </div>
            <div className="hero__orbit-ring hero__orbit-ring--3">
              <div className="hero__orbit-dot"></div>
            </div>
            <div className="hero__orbit-line"></div>
          </div>
        </div>
      </div>

      {/* Background Gradient Blobs */}
      <div className="hero__bg-blob hero__bg-blob--1"></div>
      <div className="hero__bg-blob hero__bg-blob--2"></div>
    </section>
  );
}
