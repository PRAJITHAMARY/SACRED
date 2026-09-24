import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { LanguageCode, UITranslations } from '../types';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';

interface LanguageSelectPageProps {
  currentLang: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  translations: UITranslations;
}

export const LanguageSelectPage: React.FC<LanguageSelectPageProps> = ({
  currentLang,
  onSelectLanguage,
  translations,
}) => {
  return (
    <div
      className="page-wrapper sacred-bg-pattern"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.25rem',
        textAlign: 'center',
      }}
    >
      <div className="app-container" style={{ maxWidth: '540px' }}>
        {/* Sacred Cross Visual */}
        <div
          style={{
            width: '68px',
            height: '68px',
            margin: '0 auto 1.25rem auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(23, 70, 74, 0.9) 0%, rgba(16, 47, 53, 0.9) 100%)',
            border: '2px solid var(--accent-gold)',
            boxShadow: '0 0 24px rgba(214, 182, 106, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'var(--accent-gold-light)',
          }}
        >
          ✝
        </div>

        {/* Experience Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.9rem',
            background: 'rgba(23, 70, 74, 0.65)',
            border: '1px solid rgba(214, 182, 106, 0.35)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--accent-gold-light)',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Sparkles size={13} color="var(--accent-gold)" />
          <span>{translations.experienceTag}</span>
        </div>

        {/* App Title */}
        <h1
          className="display-title"
          style={{
            fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
            color: 'var(--text-ivory)',
            lineHeight: 1.15,
            marginBottom: '0.35rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          {translations.appName}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-serif-en)',
            fontSize: 'clamp(1rem, 3.2vw, 1.25rem)',
            color: 'var(--accent-gold-light)',
            marginBottom: '1.75rem',
            letterSpacing: '0.02em',
          }}
        >
          {translations.appSubtitle}
        </p>

        {/* Gold Decorative Divider */}
        <div className="gold-divider">
          <div className="gold-divider-line" />
          <span className="gold-divider-symbol">✝</span>
          <div className="gold-divider-line" />
        </div>

        {/* Selection Prompt */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--text-ivory)', marginBottom: '0.25rem' }}>
            {translations.selectLanguageTitle}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {translations.selectLanguageSubtitle}
          </p>
        </div>

        {/* Exactly Two Large Mobile-Friendly Buttons: Tamil & English */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                className={`lang-card-btn ${isSelected ? 'active' : ''}`}
                style={{
                  minHeight: '72px',
                  padding: '1.1rem 1.4rem',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.1rem',
                  border: isSelected ? '2px solid var(--accent-gold)' : '1px solid rgba(214, 182, 106, 0.4)',
                  boxShadow: isSelected ? '0 0 20px rgba(214, 182, 106, 0.3)' : 'var(--shadow-subtle)',
                }}
              >
                <div
                  style={{
                    fontSize: '1.8rem',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {lang.flagOrSymbol}
                </div>

                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-ivory)', lineHeight: 1.2 }}>
                    {lang.nativeName}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold-light)' }}>
                    {lang.englishName}
                  </div>
                </div>

                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--accent-gold)' : 'rgba(23, 70, 74, 0.8)',
                    color: isSelected ? '#102F35' : 'var(--accent-gold-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight size={18} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Exhibition Note */}
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          <p>{translations.footerExhibitionNote}</p>
        </div>
      </div>
    </div>
  );
};
