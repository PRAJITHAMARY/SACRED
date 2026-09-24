import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Clock, ShieldCheck, Sparkles, ChevronRight, Calendar } from 'lucide-react';
import type { ChurchData, ChurchId, LanguageCode, UITranslations, TimelineMilestone } from '../types';
import { getChurchData } from '../data';
import { BackToTop } from '../components/BackToTop';

interface ChurchTimelinePageProps {
  church?: ChurchData;
  churchId?: ChurchId;
  currentLang: LanguageCode;
  translations: UITranslations;
  onNavigate: (route: string) => void;
}

interface MilestoneCardProps {
  milestone: TimelineMilestone;
  index: number;
  isLeft: boolean;
  isMobile: boolean;
  currentLang: LanguageCode;
}

const TimelineNodeCard: React.FC<MilestoneCardProps> = ({
  milestone,
  index,
  isLeft,
  isMobile,
  currentLang,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isTa = currentLang === 'ta';

  return (
    <div
      ref={ref}
      className={`vel-tl-item ${isMobile ? 'vel-tl-mobile' : (isLeft ? 'vel-tl-left' : 'vel-tl-right')} ${visible ? 'vel-tl-visible' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      {/* Node Dot / Circle with Icon */}
      <div className="vel-tl-node" aria-hidden="true">
        <div className="vel-tl-node-inner">
          <span style={{ fontSize: '0.85rem' }}>{milestone.icon || '✝'}</span>
        </div>
      </div>

      {/* Content Card */}
      <div className="vel-tl-card" role="article">
        {/* Top Meta Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          {/* Large Year / Date */}
          <div className="vel-tl-year">
            <span className="vel-tl-year-text">{milestone.yearOrEra}</span>
          </div>

          {/* Status Badge */}
          {milestone.isTraditional ? (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--accent-gold-light)',
                background: 'rgba(214, 182, 106, 0.15)',
                border: '1px solid rgba(214, 182, 106, 0.45)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <Sparkles size={11} color="var(--accent-gold)" />
              <span>{milestone.statusLabel || (isTa ? 'மரபு நம்பிக்கையின்படி' : 'Traditional Account')}</span>
            </span>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#9EE6B8',
                background: 'rgba(74, 150, 110, 0.18)',
                border: '1px solid rgba(126, 198, 153, 0.4)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <ShieldCheck size={11} color="#9EE6B8" />
              <span>{milestone.statusLabel || milestone.tag || (isTa ? 'சரிபார்க்கப்பட்ட வரலாறு' : 'Verified History')}</span>
            </span>
          )}
        </div>

        {/* Event Title */}
        <h3 className="vel-tl-title" style={{ fontSize: 'clamp(1.05rem, 3vw, 1.25rem)', color: 'var(--text-ivory)', marginBottom: '0.45rem', fontWeight: 700 }}>
          {milestone.title}
        </h3>

        {/* Description */}
        <p className="vel-tl-desc" style={{ fontSize: 'clamp(0.88rem, 2.5vw, 0.94rem)', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
          {milestone.description}
        </p>
      </div>
    </div>
  );
};

export const ChurchTimelinePage: React.FC<ChurchTimelinePageProps> = ({
  church: propChurch,
  churchId,
  currentLang,
  translations,
  onNavigate,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);
  const church = propChurch || (churchId ? getChurchData(churchId, currentLang) : getChurchData('velankanni', currentLang));
  const isTa = currentLang === 'ta';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 680);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [church.id]);

  return (
    <div className="page-wrapper sacred-bg-pattern">
      {/* Top Banner Navigation Strip */}
      <nav aria-label="Breadcrumb Navigation" className="timeline-nav-bar">
        <div className="app-container timeline-nav-content">
          <button
            onClick={() => onNavigate(church.id)}
            className="timeline-back-btn"
            aria-label={isTa ? `${church.name} முதன்மை பக்கத்திற்கு திரும்பு` : `Back to ${church.name}`}
          >
            <ArrowLeft size={16} />
            <span>{isTa ? `${church.name} முதன்மைப் பக்கம்` : `Back to ${church.name}`}</span>
          </button>

          <div className="timeline-page-badge">
            <Clock size={15} color="var(--accent-gold)" />
            <span>{translations.timelineHeading}</span>
          </div>
        </div>
      </nav>

      <main className="app-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {/* Page Title Header */}
        <section className="section-header-block" style={{ marginBottom: '3rem' }}>
          <div className="section-header-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <Clock size={16} />
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
            {translations.timelineHeading}
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {isTa
              ? `${church.name} திருத்தலத்தின் தோற்றம் முதல் சமகால பேராலய அங்கீகாரம் வரையிலான முழுமையான வரலாற்று காலவரிசை.`
              : `Chronological journey through the defining eras and historical milestones of ${church.name}.`}
          </p>

          <div className="gold-divider">
            <div className="gold-divider-line" />
            <span className="gold-divider-symbol">✝</span>
            <div className="gold-divider-line" />
          </div>
        </section>

        {/* Vertical Timeline Flow */}
        <section aria-label={translations.timelineHeading} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="vel-tl-container">
            {/* The Continuous Gold Spine */}
            <div className="vel-tl-spine" />

            {/* Timeline Milestones */}
            {church.timeline.map((item, index) => (
              <TimelineNodeCard
                key={item.id}
                milestone={item}
                index={index}
                isLeft={index % 2 === 0}
                isMobile={isMobile}
                currentLang={currentLang}
              />
            ))}

            {/* End of Timeline Anchor */}
            <div className="vel-tl-end-anchor">
              <div className="vel-tl-end-dot" />
              <span className="vel-tl-end-label">
                {church.name} · {isTa ? 'தற்கால திருத்தலம்' : 'Present Day'}
              </span>
            </div>
          </div>

          {/* Archival Note */}
          <div
            style={{
              maxWidth: '760px',
              margin: '2.5rem auto 0 auto',
              padding: '1rem 1.25rem',
              background: 'rgba(23, 70, 74, 0.45)',
              border: '1px solid rgba(214, 182, 106, 0.28)',
              borderRadius: 'var(--radius-md)',
              borderLeft: '3px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>ℹ️</span>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
              {isTa
                ? 'இந்த காலவரிசை சரிபார்க்கப்பட்ட திருச்சபை ஆவணங்கள் மற்றும் வரலாற்று ஆதாரங்களை அடிப்படையாகக் கொண்டது. மரபு நம்பிக்கையின்படி என்று குறிப்பிட்டவை பாரம்பரிய வாய்மொழி விவரணைகளை குறிக்கும்.'
                : 'This timeline is curated from verified ecclesiastical archives and historical documentation. Entries labeled as traditional accounts reflect pious oral traditions.'}
            </p>
          </div>
        </section>

        {/* Bottom CTA to Return / Explore Festivals */}
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
              {isTa ? 'மேலும் திருத்தலக் கண்காட்சியை ஆராய்க' : `Explore More of ${church.name}`}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {isTa
                ? 'முழு வரலாறு, கட்டிடக்கலை மற்றும் 2026 திருவிழா அட்டவணையை காண்க.'
                : 'Explore the full history, sacred architecture, and 2026 festival schedule.'}
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
                onClick={() => onNavigate(`${church.id}/festivals`)}
                className="btn-secondary"
                style={{ padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Calendar size={16} />
                <span>{isTa ? '2026 திருவிழா அட்டவணை' : '2026 Festivals'}</span>
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

export default ChurchTimelinePage;
