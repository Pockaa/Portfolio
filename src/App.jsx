import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const PAGES = [
  { id: 'hero', label: 'About' },
  { id: 'skills', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'portfolio', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  // Theme state with localStorage & system preference fallback
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [activePageIndex, setActivePageIndex] = useState(0);
  const touchStartXRef = useRef(null);
  const wheelCooldownRef = useRef(false);

  // Sync data-theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const goToSection = useCallback((id) => {
    const index = PAGES.findIndex((page) => page.id === id);
    if (index !== -1) {
      setActivePageIndex(index);
    }
  }, []);

  const nextPage = useCallback(() => {
    setActivePageIndex((prev) => Math.min(prev + 1, PAGES.length - 1));
  }, []);

  const prevPage = useCallback(() => {
    setActivePageIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation listener for Arrow Left and Arrow Right
  useEffect(() => {
    const handleKeyDown = (e) => {
      const targetTag = e.target.tagName;
      // Skip if user is actively typing inside an input, textarea, or contentEditable element
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }
      // Skip if Lightbox Modal or Video Modal is open
      if (document.querySelector('.lightbox-backdrop') || document.querySelector('.video-modal-backdrop')) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

  // Touch Swipe Handler (for Mobile & Tablet horizontal swipe)
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;

    if (deltaX > 50) {
      nextPage();
    } else if (deltaX < -50) {
      prevPage();
    }
    touchStartXRef.current = null;
  };

  // Wheel Gesture Handler (Only switch slides on dominant horizontal swipe)
  const handleWheel = (e) => {
    if (wheelCooldownRef.current) return;

    // Trigger horizontal slide transition ONLY if horizontal scroll (deltaX) is dominant
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 35) {
      wheelCooldownRef.current = true;
      if (e.deltaX > 0) {
        nextPage();
      } else {
        prevPage();
      }
      setTimeout(() => {
        wheelCooldownRef.current = false;
      }, 700);
    }
  };

  const activeSectionId = PAGES[activePageIndex].id;

  return (
    <div className="app">
      {/* Background Ambient Glow Elements */}
      <div className="ambient-orb ambient-orb--1" />
      <div className="ambient-orb ambient-orb--2" />
      <div className="ambient-orb ambient-orb--3" />

      {/* Header Navigation */}
      <Navbar
        activeSection={activeSectionId}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigateSection={goToSection}
      />

      {/* Main Viewport Horizontal Multi-Page Slider */}
      <div
        className="horizontal-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div
          className="horizontal-track"
          style={{ transform: `translateX(-${activePageIndex * 100}vw)` }}
        >
          {/* Page 0: Hero / About */}
          <div className="slide-page">
            <div className="slide-page-content">
              <Hero onNavigateSection={goToSection} />
            </div>
          </div>

          {/* Page 1: Skills / Tech Stack */}
          <div className="slide-page">
            <div className="slide-page-content">
              <Skills />
            </div>
          </div>

          {/* Page 2: Work & Hackathon Experience */}
          <div className="slide-page">
            <div className="slide-page-content">
              <Experience />
            </div>
          </div>

          {/* Page 3: Featured Projects */}
          <div className="slide-page">
            <div className="slide-page-content">
              <Portfolio />
            </div>
          </div>

          {/* Page 4: Certifications */}
          <div className="slide-page">
            <div className="slide-page-content">
              <Certifications />
            </div>
          </div>

          {/* Page 5: Contact & Footer */}
          <div className="slide-page">
            <div className="slide-page-content slide-page-content--contact">
              <Contact />
              <Footer onNavigateSection={goToSection} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Indicator - Keyboard Hint Only */}
      <div className="pagination-dock">
        <span className="keyboard-hint">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M18 12h.01M10 16h4" />
          </svg>
          Use ← → Keys
        </span>
      </div>
    </div>
  );
}

export default App;
