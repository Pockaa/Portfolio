import { useEffect, useRef, useState } from 'react';
import './Portfolio.css';

const projects = [
  {
    title: 'SiteTrack',
    category: 'Web and Mobile App',
    description: 'A Construction Project Reporting and Management System with AI-Powered Predictive Analytics.',
    tags: ['React Native', 'TypeScript', 'Supabase', 'AI'],
    color: '#ff4655',
    link: 'https://strck.netlify.app',
    preview: '/certs/sitetrack-preview.png',
  },
  {
    title: 'TicTacToe-Game',
    category: 'Game Development',
    description: 'A TicTacToe Game with Minimax AI bot and Online Multiplayer.',
    tags: ['TypeScript', 'Supabase', 'React Native'],
    color: '#7c5cfc',
    link: 'https://tictactaw.netlify.app/',
    preview: '/certs/tictactoe-preview.png',
  },
];

function ProjectCard({ project, index }) {
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
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const Wrapper = project.link ? 'a' : 'div';
  const wrapperProps = project.link
    ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      className={`project-card ${visible ? 'project-card--visible' : ''}`}
      ref={cardRef}
      style={{ transitionDelay: `${index * 0.1}s` }}
      {...wrapperProps}
    >
      <div className="project-card__preview" style={{ '--card-accent': project.color }}>
        <div className="project-card__mockup">
          <div className="project-card__mockup-bar">
            <span></span><span></span><span></span>
            <div className="project-card__mockup-url">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              {project.link?.replace('https://', '')}
            </div>
          </div>
          <div className="project-card__mockup-screen">
            <img
              src={project.preview}
              alt={`${project.title} preview`}
              className="project-card__mockup-img"
              loading="lazy"
            />
          </div>
        </div>
        <div className="project-card__number">0{index + 1}</div>
      </div>

      <div className="project-card__info">
        <span className="project-card__category">{project.category}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__container">
        <div className="portfolio__header">
          <span className="portfolio__label">Portfolio</span>
          <h2 className="portfolio__title">Featured <span>Projects</span></h2>
          <p className="portfolio__subtitle">A selection of recent work that showcases my skills and passion.</p>
        </div>

        <div className="portfolio__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
