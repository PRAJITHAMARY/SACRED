import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Calendar, Info, Sparkles, Church, Clock, ChevronRight } from 'lucide-react';
import type { ChurchData, ChurchId, LanguageCode, UITranslations, FestivalScheduleEntry } from '../types';
import { getChurchData } from '../data';
import { BackToTop } from '../components/BackToTop';

interface ChurchFestivalsPageProps {
  church?: ChurchData;
  churchId?: ChurchId;
  currentLang: LanguageCode;
  translations: UITranslations;
  onNavigate: (route: string) => void;
}

const FestivalFlowCard: React.FC<{
  entry: FestivalScheduleEntry;
  index: number;
  currentLang: LanguageCode;
}> = ({ entry, index, currentLang }) => {
  const isTa = currentLang === 'ta';
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`festival-flow-card ${isVisible ? 'card-entered' : 'card-hidden'} ${entry.isPinnacle ? 'pinnacle-card' : ''}`}
      style={{
        transitionDelay: `${Math.min(index * 90, 360)}ms`,
      }}
    >
      {/* Node / Date Marker */}
      <div className="festival-card-header">
        <div className="festival-card-date-badge">
          <span className="festival-card-icon">{entry.icon}</span>
          <span className="festival-card-date-text">{entry.date}</span>
        </div>
        {entry.isPinnacle && (
          <span className="festival-pinnacle-pill">
            <Sparkles size={13} />
            <span>{isTa ? 'முதன்மை நிகழ்வு' : 'Main Event'}</span>
          </span>
        )}
      </div>

      {/* Stage Tag */}
      <div className="festival-stage-tag">{entry.stage}</div>

      {/* Main Title */}
      <h3 className="festival-card-title serif-title">{entry.title}</h3>

      {/* Description */}
      <p className="festival-card-desc">{entry.description}</p>

      {/* Highlights List */}
      <div className="festival-highlights-box">
        <div className="festival-highlights-header">
          <span>{isTa ? 'முக்கிய சிறப்பம்சங்கள்' : 'Key Highlights'}</span>
        </div>
        <ul className="festival-highlights-list">
          {entry.highlights.map((item, hIdx) => (
            <li key={hIdx} className="festival-highlight-item">
              <span className="festival-bullet">✝</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const ChurchFestivalsPage: React.FC<ChurchFestivalsPageProps> = ({
  church: propChurch,
  churchId,
  currentLang,
  translations,
  onNavigate,
}) => {
  const church = propChurch || (churchId ? getChurchData(churchId, currentLang) : getChurchData('velankanni', currentLang));
  const isTa = currentLang === 'ta';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [church.id]);

  return (
    <div className="page-wrapper sacred-bg-pattern">
      {/* Back Navigation Bar */}
      <nav aria-label="Breadcrumb Navigation" className="timeline-nav-bar">
        <div className="app-container timeline-nav-content">
          <button
            onClick={() => onNavigate(church.id)}
            className="timeline-back-btn"
            aria-label={isTa ? `${church.name} முதன்மை பக்கத்திற்கு திரும்பு` : `Back to ${church.name} Page`}
          >
            <ArrowLeft size={18} />
            <span>{isTa ? `${church.name} முதன்மைப் பக்கம்` : `Back to ${church.name}`}</span>
          </button>
          <div className="timeline-page-badge">
            <Calendar size={15} color="var(--accent-gold)" />
            <span>{isTa ? '2026 திருவிழாக்கள்' : '2026 Festivals'}</span>
          </div>
        </div>
      </nav>

      <main className="app-container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        {/* Page Hero / Heading */}
        <section className="section-header-block" style={{ marginBottom: '2.5rem' }}>
          <div className="section-header-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <Calendar size={16} />
            <span>{church.name}</span>
          </div>

          <h1
            className="serif-title"
            style={{
              fontSize: 'clamp(1.75rem, 5.5vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-ivory)',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
            }}
          >
            {isTa ? '2026 முக்கிய திருவிழாக்கள்' : 'Important Festivals — 2026'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.12rem)',
              color: 'var(--text-secondary)',
              maxWidth: '740px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {church.feastIntro}
          </p>

          <div className="gold-divider">
            <div className="gold-divider-line" />
            <span className="gold-divider-symbol">✝</span>
            <div className="gold-divider-line" />
          </div>
        </section>

        {/* Shrine Overview Mini-Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(23, 70, 74, 0.8) 0%, rgba(16, 47, 53, 0.95) 100%)',
            border: '1px solid var(--accent-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
            maxWidth: '840px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: 'var(--shadow-medium)',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(214, 182, 106, 0.18)',
              border: '1px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Church size={24} color="var(--accent-gold)" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isTa ? 'ஆண்டு பெருவிழா காலம்' : 'Main Annual Feast Period'}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-ivory)' }}>
              {church.feastPeriodLabel}
            </div>
          </div>
        </div>

        {/* Verified Notice Banner */}
        <div
          style={{
            background: 'rgba(214, 182, 106, 0.1)',
            border: '1px solid rgba(214, 182, 106, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            maxWidth: '840px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
          }}
        >
          <Info size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-ivory)', lineHeight: 1.6 }}>
            <strong>{isTa ? 'முக்கிய குறிப்பு:' : 'Important Notice:'} </strong>
            {isTa
              ? `திருவிழா நிகழ்வுகள், திருப்பலி நேரங்கள் மற்றும் பவனி அட்டவணை ஆகியவை ${church.name} நிர்வாகத்தின் அதிகாரப்பூர்வ அறிவிப்புகளுக்கு ஏற்ப மாறுபடலாம்.`
              : `Festival dates, Mass timings, and procession schedules may vary according to the official calendar of ${church.name} Administration.`}
          </p>
        </div>

        {/* Vertical Flow of Festival Cards */}
        <section aria-label={isTa ? '2026 திருவிழா கால அட்டவணை' : '2026 Festival Schedule'} style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div className="festival-timeline-wrapper">
            <div className="festival-spine-line" />
            <div className="festival-cards-stack">
              {church.festivalSchedule.map((entry, idx) => (
                <FestivalFlowCard
                  key={entry.id || idx}
                  entry={entry}
                  index={idx}
                  currentLang={currentLang}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA to Return / Explore Timeline */}
        <section style={{ maxWidth: '840px', margin: '3.5rem auto 0', textAlign: 'center' }}>
          <div
            style={{
              background: 'rgba(23, 70, 74, 0.65)',
              border: '1px solid rgba(214, 182, 106, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem 1.5rem',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-ivory)', fontWeight: 700, marginBottom: '0.5rem' }}>
              {isTa ? `${church.name} பற்றி மேலும் அறிய` : `Explore More About ${church.name}`}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {isTa
                ? 'முழு வரலாறு, ஆன்மீக காலவரிசை மற்றும் கட்டிடக்கலையை முதன்மை பக்கத்தில் காண்க.'
                : `Learn about the complete history and sacred architecture on the main ${church.name} page.`}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate(church.id)}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                <span>{isTa ? `${church.name} முகப்பு` : `${church.name} Home`}</span>
              </button>
              <button
                onClick={() => onNavigate(`${church.id}/timeline`)}
                className="btn-secondary"
                style={{ padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Clock size={16} />
                <span>{isTa ? '⏳ வரலாற்று காலவரிசை' : '⏳ View Timeline'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <BackToTop translations={translations} />
    </div>
  );
};

export default ChurchFestivalsPage;
