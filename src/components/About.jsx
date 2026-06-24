import { useEffect, useRef, useState } from 'react';
import './About.css';

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '5', label: 'Projects Made' },
];

const techStack = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Git', 'Figma', 'React Native', 'PhotoShop', 'Canva'];

export default function About() {
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

  return (
    <section className={`about ${visible ? 'about--visible' : ''}`} id="about" ref={sectionRef}>
      <div className="about__container">
        <div className="about__content">
          <span className="about__label">About Me</span>
          <h2 className="about__title">Passionate about creating <span>digital experiences</span></h2>
          <p className="about__text">
            I'm a dedicated IT graduate with hands-on experience in web and mobile development. I specialize
            in building responsive, user-friendly applications using React, JavaScript, and Node.js. With
            additional skills in networking, hardware troubleshooting, and multimedia design, I bring a
            well-rounded technical perspective to every project.
          </p>
          <p className="about__text">
            I'm currently seeking remote opportunities where I can contribute to meaningful projects,
            grow as a developer, and collaborate with teams worldwide.
          </p>

          <div className="about__tech">
            <h3 className="about__tech-title">Tech Stack</h3>
            <div className="about__tech-list">
              {techStack.map(tech => (
                <span key={tech} className="about__tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="about__stats">
          {stats.map((stat, i) => (
            <div key={stat.label} className="about__stat" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              <span className="about__stat-value">{stat.value}</span>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
