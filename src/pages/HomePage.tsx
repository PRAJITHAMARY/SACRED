import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import type { ChurchId, LanguageCode, UITranslations } from '../types';
import { getChurchData } from '../data';

interface HomePageProps {
  currentLang: LanguageCode;
  translations: UITranslations;
  onSelectChurch: (churchId: ChurchId) => void;
  onOpenLanguage: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  translations,
  onSelectChurch,
}) => {
  const velankanniData = getChurchData('velankanni', currentLang);
  const poondiData = getChurchData('poondi', currentLang);

  return (
    <div className="page-wrapper sacred-bg-pattern">
      <main className="app-container" style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
        {/* Exhibition Hero Banner */}
        <section className="section-header-block" style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.95rem',
              background: 'rgba(23, 70, 74, 0.7)',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--accent-gold-light)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              backdropFilter: 'blur(6px)',
            }}
          >
            <span>✝</span>
            <span>{translations.experienceTag}</span>
          </div>

          <h1
            className="serif-title"
            style={{
              fontSize: 'clamp(1.75rem, 5.5vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-ivory)',
              marginBottom: '0.6rem',
              lineHeight: 1.2,
            }}
          >
            {translations.homeTitle}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2.8vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            {translations.homeSubtitle}
          </p>

          <div className="gold-divider">
            <div className="gold-divider-line" />
            <span className="gold-divider-symbol">✝</span>
            <div className="gold-divider-line" />
          </div>
        </section>

        {/* Church Selection Cards (Stacked Vertically on Mobile) */}
        <section aria-label="Shrine Selection" style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Card 1: Velankanni Our Lady of Good Health */}
          <article
            className="church-card-vertical"
            onClick={() => onSelectChurch('velankanni')}
            role="button"
            tabIndex={0}
            aria-label={`${velankanniData.name} - ${translations.exploreHistoryBtn}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectChurch('velankanni');
              }
            }}
          >
            <div className="church-card-media">
              <img
                src={velankanniData.heroImage}
                alt={velankanniData.name}
                className="church-card-img"
                loading="eager"
              />
              <div className="church-card-overlay" />
              <div className="church-card-badge">
                ✝ {velankanniData.elevationStatus}
              </div>
            </div>

            <div className="church-card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '0.04em' }}>
                  SHRINE 01
                </span>
                {velankanniData.tamilName && currentLang !== 'ta' && (
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    • {velankanniData.tamilName}
                  </span>
                )}
              </div>

              <h2 className="church-card-title serif-title">
                {velankanniData.name}
              </h2>

              <div className="church-card-location">
                <MapPin size={15} />
                <span>{velankanniData.location}</span>
              </div>

              <p className="church-card-desc">
                {velankanniData.shortDescription}
              </p>

              {/* Highlights 2-grid */}
              <div className="church-card-highlights">
                {velankanniData.overviewHighlights.slice(0, 2).map((item, idx) => (
                  <div key={idx}>
                    <div className="highlight-box-label">{item.label}</div>
                    <div className="highlight-box-val">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectChurch('velankanni');
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <span>{translations.exploreHistoryBtn}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </article>

          {/* Card 2: Poondi Madha Shrine */}
          <article
            className="church-card-vertical"
            onClick={() => onSelectChurch('poondi')}
            role="button"
            tabIndex={0}
            aria-label={`${poondiData.name} - ${translations.exploreHistoryBtn}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectChurch('poondi');
              }
            }}
          >
            <div className="church-card-media">
              <img
                src={poondiData.heroImage}
                alt={poondiData.name}
                className="church-card-img"
                loading="eager"
              />
              <div className="church-card-overlay" />
              <div className="church-card-badge" style={{ borderColor: 'var(--accent-gold)' }}>
                ✝ {poondiData.elevationStatus}
              </div>
            </div>

            <div className="church-card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '0.04em' }}>
                  SHRINE 02
                </span>
                {poondiData.tamilName && currentLang !== 'ta' && (
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    • {poondiData.tamilName}
                  </span>
                )}
              </div>

              <h2 className="church-card-title serif-title">
                {poondiData.name}
              </h2>

              <div className="church-card-location">
                <MapPin size={15} />
                <span>{poondiData.location}</span>
              </div>

              <p className="church-card-desc">
                {poondiData.shortDescription}
              </p>

              {/* Highlights 2-grid */}
              <div className="church-card-highlights">
                {poondiData.overviewHighlights.slice(0, 2).map((item, idx) => (
                  <div key={idx}>
                    <div className="highlight-box-label">{item.label}</div>
                    <div className="highlight-box-val">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectChurch('poondi');
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <span>{translations.exploreHistoryBtn}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};
