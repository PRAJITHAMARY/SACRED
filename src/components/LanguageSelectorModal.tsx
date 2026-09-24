import React from 'react';
import { X, Check, Globe } from 'lucide-react';
import type { LanguageCode, UITranslations } from '../types';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  translations: UITranslations;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLanguage,
  translations,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(10, 28, 32, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 200ms ease forwards',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#143B42',
          border: '1px solid var(--accent-gold)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), var(--shadow-gold)',
          padding: '1.5rem',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(214, 182, 106, 0.15)', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
              <Globe size={18} />
            </div>
            <div>
              <h3 id="lang-modal-title" style={{ fontSize: '1.2rem', color: 'var(--text-ivory)', margin: 0 }}>
                {translations.selectLanguageTitle}
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {translations.selectLanguageSubtitle}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
            aria-label={translations.close}
          >
            <X size={18} />
          </button>
        </div>

        {/* Grid of Languages */}
        <div className="lang-grid">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`lang-card-btn ${isActive ? 'active' : ''}`}
              >
                <div className="lang-card-symbol">
                  {lang.flagOrSymbol}
                </div>
                <div className="lang-card-text">
                  <div className="lang-card-native">{lang.nativeName}</div>
                  <div className="lang-card-english">{lang.englishName}</div>
                </div>
                {isActive && (
                  <div style={{ color: 'var(--accent-gold)' }}>
                    <Check size={18} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Bottom Note */}
        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          ✝ {translations.footerExhibitionNote}
        </div>
      </div>
    </div>
  );
};
