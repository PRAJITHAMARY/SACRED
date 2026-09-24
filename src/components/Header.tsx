import React from 'react';
import { ArrowLeft, Globe, Type } from 'lucide-react';
import type { LanguageCode, UITranslations } from '../types';
import { getLanguageInfo } from '../i18n/languages';

interface HeaderProps {
  currentLang: LanguageCode;
  translations: UITranslations;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenLanguage: () => void;
  isLargeText: boolean;
  onToggleLargeText: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  translations,
  title,
  subtitle,
  showBack = false,
  onBack,
  onOpenLanguage,
  isLargeText,
  onToggleLargeText,
}) => {
  const currentLangInfo = getLanguageInfo(currentLang);

  return (
    <header className="app-header" role="banner">
      <div className="app-container header-inner">
        {/* Left Action */}
        <div className="header-left">
          {showBack ? (
            <button
              onClick={onBack}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.8rem', minHeight: '40px', fontSize: '0.85rem' }}
              aria-label={translations.backBtn}
            >
              <ArrowLeft size={16} />
              <span>{translations.backBtn}</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '1.25rem', color: 'var(--accent-gold)' }}>✝</span>
              <span style={{ fontFamily: 'var(--font-display-en)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-ivory)', letterSpacing: '0.04em' }}>
                SACRED
              </span>
            </div>
          )}
        </div>

        {/* Center Title */}
        <div className="header-title-wrapper">
          <div className="header-title">
            {title || translations.appName}
          </div>
          {subtitle && (
            <span className="header-subtitle">{subtitle}</span>
          )}
        </div>

        {/* Right Actions */}
        <div className="header-right">
          {/* Text Size Toggle */}
          <button
            onClick={onToggleLargeText}
            className="btn-icon"
            style={{ width: '38px', height: '38px' }}
            title={isLargeText ? translations.textStandard : translations.textLarge}
            aria-label={isLargeText ? translations.textStandard : translations.textLarge}
          >
            <Type size={16} color={isLargeText ? 'var(--accent-gold)' : 'var(--text-ivory)'} />
          </button>

          {/* Language Switcher */}
          <button
            onClick={onOpenLanguage}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.8rem', minHeight: '38px', fontSize: '0.85rem', gap: '0.4rem' }}
            aria-label={translations.changeLanguage}
          >
            <Globe size={15} color="var(--accent-gold)" />
            <span style={{ fontWeight: 700 }}>{currentLangInfo.nativeName}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
