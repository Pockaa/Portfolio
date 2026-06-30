import { useEffect, useRef, useState } from 'react';
import './Experience.css';

const experiences = [
  {
    role: 'OJT — IT Support',
    company: 'M. Montesclaros Holdings Inc.',
    period: 'Jan 2026 – May 2026',
    type: 'Internship',
    description:
      'Provided technical support by troubleshooting computers, printers, CCTV systems, and network devices. Assisted in fiber optic installation, data backup, hardware maintenance, and graphic design tasks, while gaining hands-on experience in IT operations and workplace professionalism.',
    highlights: [
      'Maintained company network and resolved connectivity issues',
      'Assembled and troubleshot desktop PCs and peripherals',
      'Assisted with fiber optic and Ethernet cable installation',
      'Fixed CCTV wiring, installation, and setup'
    ],
    color: '#ff4655',
  },
  {
    role: 'NASA International Space Apps Challenge',
    company: 'NASA / Space Apps',
    period: 'October2025',
    type: 'Hackathon',
    description:
      'Participated in the world\'s largest annual global hackathon, collaborating with a team to develop innovative solutions using NASA\'s open data and technology to address real-world challenges.',
    highlights: [
      'Built a working prototype within 48 hours',
      'Collaborated with a team on problem-solving and ideation',
      'Used NASA open data and APIs for the project',
      'Presented solutions to a panel of judges',
    ],
    color: '#61dafb',
  },
  {
    role: 'DIGI-MC 2025 — 2nd Place',
    company: 'City Government of Malaybalay / BukSU',
    period: 'October 2025',
    type: 'Competition',
    description:
      'Competed in the DIGI-MC digital media competition and achieved 2nd place, showcasing skills in creative design, digital problem-solving, and multimedia production.',
    highlights: [
      'Achieved 2nd place in the Solutions Showdown',
      'Developed innovative solutions addressing local-to-global challenges',
      'Competed over a 3-day event at Bukidnon State University',
      'Recognized for creativity, technical skill, and impact',
    ],
    color: '#f0db4f',
  },
  {
    role: 'InnoVa Hackathon — 3rd Place',
    company: 'Valencia City / National ICT Month 2026',
    period: 'June 2026',
    type: 'Hackathon',
    description:
      'Competed in the InnoVa Hackathon held as part of the "Linaw, Hapsay, Bibo: Valencia Goes Digital" celebration of National ICT Month 2026. Evaluated by experts in technology, innovation, education, and digital transformation.',
    highlights: [
      'Achieved 3rd place among competing teams',
      'Developed an innovative digital solution under time pressure',
      'Assessed on creativity, technical excellence, and feasibility',
      'Presented to a distinguished panel of industry judges',
    ],
    color: '#34d399',
  },
  {
    role: 'Web & Mobile App Development',
    company: 'ACLC College — Capstone Project',
    period: '2025 – 2026',
    type: 'Project',
    description:
      'Developed full-stack web and mobile applications as part of academic coursework, applying modern frameworks and best practices to build functional, user-friendly solutions.',
    highlights: [
      'Built responsive web apps with React & JavaScript',
      'Created cross-platform mobile apps using React Native',
      'Implemented REST APIs with Node.js',
      'Applied UI/UX design principles to every project',
    ],
    color: '#a78bfa',
  },
  {
    role: 'Virtual Assistant Trainee',
    company: 'Freelance Academy',
    period: '2025',
    type: 'Training',
    description:
      'Completed professional training in virtual assistance, covering real estate VA tasks, QuickBooks bookkeeping, social media marketing, and general administrative support.',
    highlights: [
      'QuickBooks Online bookkeeping & invoicing',
      'Real estate admin: CRM, scheduling, data entry',
      'Social media content scheduling & analytics',
      'Email management and document organization',
    ],
    color: '#ff7eb3',
  },
];

function ExperienceCard({ experience, index }) {
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

  return (
    <div
      className={`exp-item ${visible ? 'exp-item--visible' : ''}`}
      ref={cardRef}
      style={{ '--item-delay': `${index * 0.1}s`, '--item-accent': experience.color }}
    >
      <div className="exp-item__header">
        <div className="exp-item__meta">
          <span className="exp-item__type">{experience.type}</span>
          <span className="exp-item__period">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {experience.period}
          </span>
        </div>
        <h3 className="exp-item__role">{experience.role}</h3>
        <span className="exp-item__company">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          {experience.company}
        </span>
      </div>

      <p className="exp-item__description">{experience.description}</p>

      <ul className="exp-item__highlights">
        {experience.highlights.map((item) => (
          <li key={item} className="exp-item__highlight">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      <div className="exp-item__shine" />
    </div>
  );
}

export default function Experience() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`experience ${visible ? 'experience--visible' : ''}`} id="experience" ref={sectionRef}>
      <div className="experience__container">
        <div className="experience__header">
          <span className="experience__label">Career Journey</span>
          <h2 className="experience__title">Work <span>Experience</span></h2>
          <p className="experience__subtitle">
            My professional background in development, IT support, and virtual assistance.
          </p>
        </div>

        <div className="experience__timeline">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.role} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
