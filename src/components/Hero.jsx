import { useEffect, useRef } from 'react';
import './Hero.css';

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '5', label: 'Projects Made' },
];

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
          <p className="hero__subtitle-tag">
            Passionate about creating <span>digital experiences</span>
          </p>
          <p className="hero__description">
            I’m an IT graduate with experience in product listing, virtual assistance, web development, and video editing.
            I’m a detail-oriented, adaptable, and hardworking person who enjoys learning new tools and taking on new challenges,
            with a strong focus on delivering quality work and meeting deadlines.
          </p>
          <p className="hero__description">
            I'm currently seeking remote opportunities where I can contribute to meaningful projects,
            grow as a person, and collaborate with teams worldwide.
          </p>

          <div className="hero__stats">
            {stats.map((stat, i) => (
              <div key={stat.label} className="hero__stat-card" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
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

