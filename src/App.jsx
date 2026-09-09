import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('about');

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
      case 'about':
        return <Hero />;
      case 'skills':
        return <Skills />;
      case 'experience':
        return <Experience />;
      case 'certifications':
        return <Certifications />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="app">
      <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} />

      <div className="tab-view-wrapper" key={activeTab}>
        <main className="tab-view-content">
          {renderActiveTab()}
        </main>
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`scroll-top ${visible ? 'scroll-top--visible' : ''}`}
      id="scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

export default App;
