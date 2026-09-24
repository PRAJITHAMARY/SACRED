import React from 'react';
import { CheckCircle, Info } from 'lucide-react';
import type { HistorySection, UITranslations } from '../types';

interface HistorySectionCardProps {
  section: HistorySection;
  translations: UITranslations;
}

export const HistorySectionCard: React.FC<HistorySectionCardProps> = ({
  section,
  translations,
}) => {
  return (
    <article
      id={`section-${section.number}`}
      className="history-card"
    >
      {/* Header */}
      <div className="history-card-header">
        <div className="section-num-badge">
          {section.number}
        </div>

        <div className="history-title-group">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <h3 className="history-card-title">
              {section.title}
            </h3>

            {/* Verification Status Badge */}
            {section.verifiedStatus === 'verified' && (
              <span className="status-badge verified" title="Archival church records & verified oral tradition">
                <CheckCircle size={12} />
                <span>{translations.verifiedBadge}</span>
              </span>
            )}
            {section.verifiedStatus === 'exhibit_note' && (
              <span className="status-badge exhibit-note" title="Exhibition archival note">
                <Info size={12} />
                <span>{translations.exhibitNoteBadge}</span>
              </span>
            )}
          </div>

          {section.subtitle && (
            <div className="history-card-subtitle">
              {section.subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Gold Divider Line */}
      <div className="history-card-divider" />

      {/* Paragraphs of History */}
      <div className="history-body">
        {section.content.map((paragraph, index) => (
          <p key={index} className="history-body-paragraph">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Optional Key Points Box */}
      {section.keyPoints && section.keyPoints.length > 0 && (
        <div className="history-key-points">
          <div className="history-key-points-title">
            ✦ {translations.featuresHeading}
          </div>
          <ul className="history-key-points-list">
            {section.keyPoints.map((point, idx) => (
              <li key={idx} className="history-key-points-item">
                <span style={{ color: 'var(--card-cream-accent)', fontWeight: 'bold' }}>•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Optional Quote / Spiritual reflection */}
      {section.quote && (
        <div className="history-quote-box">
          “{section.quote}”
        </div>
      )}
    </article>
  );
};
