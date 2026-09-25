import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Portfolio.css';

const projects = [
  {
    id: 'sitetrack',
    title: 'SiteTrack',
    type: 'app',
    category: 'Web & Mobile App',
    description: 'A comprehensive Construction Project Reporting and Management System integrated with AI-Powered Predictive Analytics for tracking build milestones, cost budgets, and team schedules.',
    tags: ['React Native', 'TypeScript', 'Supabase', 'AI Analytics', 'REST API'],
    color: '#00f2fe',
    link: 'https://strck.netlify.app',
    preview: '/certs/sitetrack-preview.png',
    featured: true,
  },
  {
    id: 'tictactoe',
    title: 'TicTacToe-Game',
    type: 'app',
    category: 'Game Development',
    description: 'A feature-rich TicTacToe application featuring an unbeatable Minimax AI single-player bot alongside online real-time multiplayer lobbies.',
    tags: ['React Native', 'TypeScript', 'Supabase', 'Minimax AI', 'Realtime'],
    color: '#8b5cf6',
    link: 'https://tictactaw.netlify.app/',
    preview: '/certs/tictactoe-preview.png',
    featured: true,
  },
  {
    id: 'ark-of-the-covenant',
    title: 'Ark of the Covenant',
    type: 'video',
    category: 'Video & Media Editing',
    description: 'An original 9:16 vertical video editing showcase created and edited in CapCut. Demonstrates advanced timeline cutting, sound design, visual storytelling, and color grading.',
    tags: ['CapCut', '9:16 Vertical Reel', 'Video Production', 'Sound Design', 'Color Grading', 'Visual Effects'],
    duration: 'CapCut Edit',
    resolution: '9:16 Vertical HD',
    videoUrl: '/videos/ark-of-the-covenant.mp4',
    poster: '/videos/ark-of-the-covenant-cover.jpg',
    aspectRatio: '9:16',
    color: '#00f2fe',
    featured: true,
  },
  {
    id: 'clima-assistant',
    title: 'Clima Assistant',
    type: 'video',
    category: 'Video & Media Editing',
    description: 'An AI-powered weather assistant promo & application showcase video created and edited in CapCut. Features smooth motion graphics, interface transitions, sound design, and video pacing.',
    tags: ['CapCut', 'App Motion Promo', 'Video Production', 'UI Showcase', 'Sound Design'],
    duration: 'CapCut Edit',
    resolution: 'HD Video',
    videoUrl: '/videos/clima-assistant.mp4',
    poster: '',
    color: '#3b82f6',
    featured: true,
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const categories = ['All', 'Web & Mobile App', 'Game Development', 'Video & Media Editing'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-header text-center">
          <span className="section-tag">Portfolio & Showcase</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects & Media</span>
          </h2>
          <p className="section-subtitle">
            Explore my software development applications, interactive games, and professional video editing production work.
          </p>

          {/* Category Filter Tabs */}
          <div className="portfolio-category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`portfolio-tab ${activeCategory === cat ? 'portfolio-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'Video & Media Editing' ? '🎬 ' + cat : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className={`portfolio-card ${project.type === 'video' ? 'portfolio-card--video' : ''}`}>
              {project.type === 'video' ? (
                /* Video Project Media Card */
                <>
                  <div
                    className={`video-thumbnail-container ${project.aspectRatio === '9:16' ? 'video-thumbnail-container--vertical' : ''}`}
                    onClick={() => setSelectedVideo(project)}
                  >
                    {project.poster ? (
                      <img
                        src={project.poster}
                        alt={`${project.title} Video Cover`}
                        className="video-poster-img"
                      />
                    ) : (
                      <video
                        src={`${project.videoUrl}#t=0.5`}
                        preload="metadata"
                        muted
                        className="video-poster-img"
                      />
                    )}
                    <div className="video-poster-overlay">
                      <button className="video-play-btn" aria-label={`Play ${project.title}`}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </button>
                      <span className="video-badge-type">🎬 CapCut Video</span>
                    </div>

                    <div className="video-meta-pills">
                      <span className="video-meta-pill">{project.duration}</span>
                      <span className="video-meta-pill">{project.resolution}</span>
                    </div>
                  </div>

                  <div className="project-body">
                    <div className="project-category-badge" style={{ color: project.color }}>
                      {project.category}
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-footer">
                      <button
                        className="project-video-btn"
                        onClick={() => setSelectedVideo(project)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Watch Video Preview</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Software App Project Card */
                <>
                  <div className="mockup-header">
                    <div className="mockup-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <div className="mockup-url">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <span>{project.link.replace('https://', '')}</span>
                    </div>
                    <span className="mockup-number">0{idx + 1}</span>
                  </div>

                  <div className="mockup-screen">
                    <img
                      src={project.preview}
                      alt={`${project.title} Preview`}
                      className="mockup-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('mockup-screen-fallback');
                      }}
                    />
                    <div className="mockup-screen-overlay">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mockup-preview-btn"
                      >
                        Launch Live App
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="project-body">
                    <div className="project-category-badge">{project.category}</div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-footer">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                      >
                        <span>View Project</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Lightbox Modal Portal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </section>
  );
}

function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const isVertical = video.aspectRatio === '9:16';

  return createPortal(
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className={`video-modal-card ${isVertical ? 'video-modal-card--vertical' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="video-modal-close" onClick={onClose} aria-label="Close Video">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Video Player Only */}
        <div className={`video-player-wrapper ${isVertical ? 'video-player-wrapper--vertical' : ''}`}>
          <video
            src={video.videoUrl}
            poster={video.poster || undefined}
            controls
            autoPlay
            className="video-player-element"
          >
            Your browser does not support HTML5 video playback.
          </video>
        </div>
      </div>
    </div>,
    document.body
  );
}
