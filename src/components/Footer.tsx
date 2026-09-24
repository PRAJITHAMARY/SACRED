import React from 'react';
import { Globe, Church, Home, ArrowUp } from 'lucide-react';
import type { ChurchId, LanguageCode, UITranslations } from '../types';

interface FooterProps {
  currentLang: LanguageCode;
  translations: UITranslations;
  onNavigate: (route: string) => void;
  onOpenLanguage: () => void;
  activeChurchId?: ChurchId;
}

export const Footer: React.FC<FooterProps> = ({
  translations,
  onNavigate,
  onOpenLanguage,
  activeChurchId,
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="app-footer" role="contentinfo">
      <div className="app-container">
        {/* Sacred Emblem */}
        <div className="footer-cross">✝</div>

        <h3 className="footer-title">
          {translations.appName}
        </h3>

        <p className="footer-desc">
          {translations.footerAboutText}
        </p>

        {/* Navigation & Actions */}
        <div className="footer-links">
          {activeChurchId && (
            <button
              onClick={() => onNavigate('home')}
              className="footer-link-btn"
            >
              <Home size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              {translations.backToHome}
            </button>
          )}

          {activeChurchId !== 'velankanni' && (
            <button
              onClick={() => onNavigate('velankanni')}
              className="footer-link-btn"
            >
              <Church size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              வேளாங்கண்ணி (Velankanni)
            </button>
          )}

          {activeChurchId !== 'poondi' && (
            <button
              onClick={() => onNavigate('poondi')}
              className="footer-link-btn"
            >
              <Church size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              பூண்டி மாதா (Poondi)
            </button>
          )}

          <button
            onClick={onOpenLanguage}
            className="footer-link-btn"
          >
            <Globe size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            {translations.changeLanguage}
          </button>

          <button
            onClick={scrollToTop}
            className="footer-link-btn"
          >
            <ArrowUp size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            {translations.footerBackToTop}
          </button>
        </div>

        {/* Bottom Credits & Archival Note */}
        <div className="footer-bottom-text">
          <p style={{ marginBottom: '0.4rem' }}>{translations.footerExhibitionNote}</p>
          <p style={{ opacity: 0.8 }}>{translations.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
};
