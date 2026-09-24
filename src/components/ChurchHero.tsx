import React, { useState, useEffect } from 'react';
import { MapPin, Church as ChurchIcon } from 'lucide-react';
import type { ChurchData, LanguageCode } from '../types';

interface ChurchHeroProps {
  church: ChurchData;
  currentLang: LanguageCode;
  onNavigate?: (route: string) => void;
}

const NAV_SECTIONS = ['history', 'timeline', 'festivals', 'architecture'] as const;

export const ChurchHero: React.FC<ChurchHeroProps> = ({
  church,
  currentLang,
  onNavigate,
}) => {
  const [imageError, setImageError] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const churchId = church.id; // 'velankanni' or 'poondi'

  // IntersectionObserver for tracking when History / Architecture sections are in view
  useEffect(() => {
    const sections = ['history', 'architecture'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { rootMargin: '-10% 0px -50% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (sectionId: (typeof NAV_SECTIONS)[number]) => {
    if (sectionId === 'history') {
      const el = document.getElementById('history');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection('history');
        window.history.replaceState(null, '', '#history');
      }
    } else if (sectionId === 'architecture') {
      const el = document.getElementById('architecture');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection('architecture');
        window.history.replaceState(null, '', '#architecture');
      }
    } else if (sectionId === 'timeline') {
      if (onNavigate) onNavigate(`${churchId}/timeline`);
    } else if (sectionId === 'festivals') {
      if (onNavigate) onNavigate(`${churchId}/festivals`);
    }
  };

  const navLabels = {
    history:      currentLang === 'ta' ? '📜 வரலாறு'         : '📜 History',
    timeline:     currentLang === 'ta' ? '⏳ காலவரிசை'       : '⏳ Timeline',
    festivals:    currentLang === 'ta' ? '🕊️ திருவிழாக்கள்'  : '🕊️ Festivals',
    architecture: currentLang === 'ta' ? '🏛️ கட்டடக்கலை'    : '🏛️ Architecture',
  };

  return (
    <section className="hero-section" aria-label={`${church.name} Hero`}>
      {/* Background Image with Ken Burns Zoom */}
      <div className="hero-media-wrapper">
        {!imageError ? (
          <img
            src={church.heroImage}
            alt={church.name}
            className="hero-image"
            onError={() => setImageError(true)}
            loading="eager"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, #1c5156 0%, #102f35 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChurchIcon size={84} color="var(--accent-gold)" opacity={0.4} />
          </div>
        )}
        <div className="hero-overlay" />
      </div>

      {/* Hero Content */}
      <div className="app-container hero-content">
        {/* Sacred Cross Badge */}
        <div className="hero-cross-badge">
          <span>✝</span>
          <span>{church.elevationStatus}</span>
        </div>

        {/* Church Main Title */}
        <h1 className="hero-title serif-title">
          {church.name}
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          {church.subtitle}
        </p>

        {/* Location Info */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-gold-light)', fontSize: '0.86rem', marginBottom: '1.25rem' }}>
          <MapPin size={15} />
          <span>{church.location}</span>
        </div>

        {/* Quick Jump Navigation Buttons */}
        <nav className="hero-jump-pills" aria-label="Section and Page Navigation">
          {NAV_SECTIONS.map((sectionId) => (
            <button
              key={sectionId}
              onClick={() => handleNavClick(sectionId)}
              className={`jump-pill${activeSection === sectionId ? ' jump-pill-active' : ''}`}
              aria-label={`Go to ${navLabels[sectionId]}`}
              aria-current={activeSection === sectionId ? 'location' : undefined}
            >
              {navLabels[sectionId]}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default ChurchHero;
