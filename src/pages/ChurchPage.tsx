import React, { useEffect } from 'react';
import { ChurchHero } from '../components/ChurchHero';
import { HistorySectionCard } from '../components/HistorySectionCard';
import { SpecialFeaturesGrid } from '../components/SpecialFeaturesGrid';
import { BackToTop } from '../components/BackToTop';
import type { ChurchData, ChurchId, LanguageCode, UITranslations } from '../types';
import { getChurchData } from '../data';
import { BookOpen, Clock, Calendar, Landmark, ArrowRight, Sparkles } from 'lucide-react';

interface ChurchPageProps {
  church?: ChurchData;
  churchId?: ChurchId;
  currentLang: LanguageCode;
  translations: UITranslations;
  onNavigate: (route: string) => void;
}

const ArchitectureFeatureIcon: React.FC<{ iconName?: string }> = ({ iconName }) => {
  const style = { color: 'var(--accent-gold)', flexShrink: 0 } as const;
  switch (iconName) {
    case 'church':   return <Landmark size={22} style={style} />;
    case 'sparkles': return <Sparkles size={22} style={style} />;
    case 'heart':    return <span style={{ fontSize: '1.2rem' }}>❤️</span>;
    case 'cross':    return <span style={{ fontSize: '1.2rem' }}>✝️</span>;
    case 'book':     return <BookOpen size={22} style={style} />;
    case 'feather':  return <span style={{ fontSize: '1.2rem' }}>🌿</span>;
    case 'layers':   return <span style={{ fontSize: '1.2rem' }}>🏛️</span>;
    default:         return <Sparkles size={22} style={style} />;
  }
};

export const ChurchPage: React.FC<ChurchPageProps> = ({
  church: propChurch,
  churchId,
  currentLang,
  translations,
  onNavigate,
}) => {
  const church = propChurch || (churchId ? getChurchData(churchId, currentLang) : getChurchData('velankanni', currentLang));
  const isTa = currentLang === 'ta';

  // Smooth scroll to #history or #architecture on initial load if hash is present
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (hash === 'history' || hash === 'architecture') {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [church.id]);

  const timelineBtn = isTa ? '⏳ காலவரிசை' : '⏳ Timeline';
  const festivalsBtn = isTa ? '🕊️ திருவிழாக்கள்' : '🕊️ Festivals';

  const timelineDesc = isTa
    ? `${church.name} திருத்தலத்தின் முக்கிய வரலாற்று மைல்கற்கள் மற்றும் வளர்ச்சி காலவரிசை.`
    : `Historical milestones and sacred timeline of ${church.name}.`;

  const festivalsDesc = isTa
    ? `${church.feastPeriodLabel} மற்றும் 2026 ஆண்டிற்கான முழு திருவிழா அட்டவணை.`
    : `${church.feastPeriodLabel} and the complete 2026 annual festival calendar.`;

  return (
    <div className="page-wrapper sacred-bg-pattern">
      {/* 1. Reusable Hero Section with 4 Navigation Buttons */}
      <ChurchHero
        church={church}
        currentLang={currentLang}
        onNavigate={onNavigate}
      />

      <main className="app-container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Quick Overview Summary Strip */}
        <section aria-label="Church Overview" style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.85rem',
              background: 'rgba(23, 70, 74, 0.65)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(214, 182, 106, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {church.overviewHighlights.map((item, idx) => (
              <div key={idx} style={{ padding: '0.4rem 0.6rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold-light)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 1: COMPLETE CHURCH HISTORY
            id="history" — scroll target
            ═══════════════════════════════════════ */}
        <section
          id="history"
          aria-label={translations.historySectionHeading}
          className="section-spacer scroll-section"
          style={{ scrollMarginTop: 'calc(var(--header-height, 64px) + 1.25rem)' }}
        >
          <div className="section-header-block">
            <span className="section-header-eyebrow">
              <BookOpen size={16} />
              <span>{translations.historySectionHeading}</span>
            </span>
            <h2 className="section-header-title serif-title">
              {translations.historySectionHeading}
            </h2>
            <div className="gold-divider">
              <div className="gold-divider-line" />
              <span className="gold-divider-symbol">✝</span>
              <div className="gold-divider-line" />
            </div>
            <p className="section-header-sub">{translations.historySectionSub}</p>
          </div>

          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            {church.historySections.map((section) => (
              <HistorySectionCard
                key={section.id}
                section={section}
                translations={translations}
              />
            ))}
          </div>
        </section>

        {/* Architectural & Spiritual Highlights */}
        {church.specialFeatures && church.specialFeatures.length > 0 && (
          <section className="section-spacer" aria-label={translations.featuresHeading}>
            <SpecialFeaturesGrid features={church.specialFeatures} translations={translations} />
          </section>
        )}

        {/* ═══════════════════════════════════════
            EXHIBITION PATHWAYS — Timeline & Festivals
            Both churches get Timeline + Festivals cards
            ═══════════════════════════════════════ */}
        <section
          aria-label={isTa ? 'கண்காட்சி பகுதிகள்' : 'Exhibition Explorations'}
          className="section-spacer"
          style={{ marginTop: '2.5rem' }}
        >
          <div className="section-header-block" style={{ marginBottom: '1.75rem' }}>
            <span className="section-header-eyebrow">
              <span>✝</span>
              <span>{isTa ? 'வரலாற்றுப் பகுதிகள்' : 'Heritage Explorations'}</span>
            </span>
            <h2 className="section-header-title serif-title">
              {isTa ? 'மேலும் ஆராய்க' : `Explore ${church.name} Exhibition`}
            </h2>
            <div className="gold-divider">
              <div className="gold-divider-line" />
              <span className="gold-divider-symbol">✝</span>
              <div className="gold-divider-line" />
            </div>
            <p className="section-header-sub">
              {isTa
                ? 'வரலாற்று காலவரிசை மற்றும் 2026 திருவிழாக்கள் பிரத்யேக பக்கங்களில் காண்க.'
                : 'Visit dedicated exhibition sections for the full historical timeline and 2026 festival calendar.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            {/* Timeline Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(23, 70, 74, 0.75) 0%, rgba(16, 47, 53, 0.9) 100%)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-medium)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(214, 182, 106, 0.15)', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={20} color="var(--accent-gold)" />
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--accent-gold-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isTa ? 'முழு காலவரிசை' : 'Full Timeline'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-ivory)', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {timelineBtn}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {timelineDesc}
                </p>
              </div>
              <button
                onClick={() => onNavigate(`${churchId}/timeline`)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'space-between', padding: '0.75rem 1.25rem', fontSize: '0.92rem' }}
                aria-label={isTa ? 'காலவரிசை பக்கத்திற்கு செல்க' : 'Open Timeline Page'}
              >
                <span>{isTa ? 'காலவரிசையைக் காண்க' : 'Open Timeline'}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Festivals Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(23, 70, 74, 0.75) 0%, rgba(16, 47, 53, 0.9) 100%)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-medium)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(214, 182, 106, 0.15)', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={20} color="var(--accent-gold)" />
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--accent-gold-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    2026 {isTa ? 'அட்டவணை' : 'Schedule'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-ivory)', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {festivalsBtn}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {festivalsDesc}
                </p>
              </div>
              <button
                onClick={() => onNavigate(`${churchId}/festivals`)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'space-between', padding: '0.75rem 1.25rem', fontSize: '0.92rem' }}
                aria-label={isTa ? 'திருவிழாக்கள் பக்கத்திற்கு செல்க' : 'Open Festivals Page'}
              >
                <span>{isTa ? '2026 திருவிழா அட்டவணை' : 'Open 2026 Festivals'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            ARCHITECTURE SECTION
            id="architecture" — scroll target
            ═══════════════════════════════════════ */}
        <section
          id="architecture"
          aria-label={church.architectureTitle}
          className="section-spacer scroll-section"
          style={{ scrollMarginTop: 'calc(var(--header-height, 64px) + 1.25rem)', marginTop: '2.5rem' }}
        >
          <div className="section-header-block">
            <span className="section-header-eyebrow">
              <Landmark size={16} />
              <span>🏛️ {translations.architectureHeading}</span>
            </span>
            <h2 className="section-header-title serif-title">
              {church.architectureTitle}
            </h2>
            <div className="gold-divider">
              <div className="gold-divider-line" />
              <span className="gold-divider-symbol">✝</span>
              <div className="gold-divider-line" />
            </div>
            <p className="section-header-sub" style={{ maxWidth: '700px' }}>
              {church.architectureIntro}
            </p>
          </div>

          {/* Architecture Feature Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              maxWidth: '1080px',
              margin: '0 auto',
            }}
          >
            {church.architectureFeatures.map((feature) => (
              <div
                key={feature.id}
                style={{
                  background: 'rgba(23, 70, 74, 0.55)',
                  border: '1px solid rgba(214, 182, 106, 0.28)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.35rem',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  transition: 'all var(--transition-base)',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent-gold)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 22px rgba(214, 182, 106, 0.2)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(214, 182, 106, 0.28)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                  (e.currentTarget as HTMLDivElement).style.transform = '';
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(16, 47, 53, 0.85)',
                    border: '1px solid var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ArchitectureFeatureIcon iconName={feature.iconName} />
                </div>
                <h4 style={{ fontSize: '1.08rem', color: 'var(--text-ivory)', fontWeight: 700, margin: 0 }}>
                  {feature.title}
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Back To Top Button */}
      <BackToTop translations={translations} />
    </div>
  );
};

export default ChurchPage;
