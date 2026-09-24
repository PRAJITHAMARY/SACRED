import React from 'react';
import { Church, Sparkles, BookOpen, Compass, Heart, Feather, Cross } from 'lucide-react';
import type { SpecialFeature, UITranslations } from '../types';

interface SpecialFeaturesGridProps {
  features: SpecialFeature[];
  translations: UITranslations;
}

export const SpecialFeaturesGrid: React.FC<SpecialFeaturesGridProps> = ({
  features,
  translations,
}) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'church':
        return <Church size={22} color="var(--accent-gold)" />;
      case 'sparkles':
        return <Sparkles size={22} color="var(--accent-gold)" />;
      case 'book':
        return <BookOpen size={22} color="var(--accent-gold)" />;
      case 'compass':
        return <Compass size={22} color="var(--accent-gold)" />;
      case 'heart':
        return <Heart size={22} color="var(--accent-gold)" />;
      case 'cross':
        return <Cross size={22} color="var(--accent-gold)" />;
      case 'feather':
        return <Feather size={22} color="var(--accent-gold)" />;
      default:
        return <Sparkles size={22} color="var(--accent-gold)" />;
    }
  };

  return (
    <section id="features" aria-label={translations.featuresHeading}>
      <div className="section-header-block">
        <span className="section-header-eyebrow">
          <Sparkles size={14} />
          <span>{translations.featuresHeading}</span>
        </span>
        <h3 className="section-header-title serif-title">
          {translations.featuresHeading}
        </h3>
        <p className="section-header-sub">
          {translations.featuresSub}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {features.map((feature) => (
          <div
            key={feature.id}
            style={{
              background: 'rgba(23, 70, 74, 0.5)',
              border: '1px solid rgba(214, 182, 106, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              transition: 'all var(--transition-base)',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(16, 47, 53, 0.8)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {getIcon(feature.iconName)}
            </div>

            <h4 style={{ fontSize: '1.08rem', color: 'var(--text-ivory)', fontWeight: 700 }}>
              {feature.title}
            </h4>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
