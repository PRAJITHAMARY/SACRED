import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import type { UITranslations } from '../types';

interface BackToTopProps {
  translations: UITranslations;
}

export const BackToTop: React.FC<BackToTopProps> = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top-btn"
      title={translations.footerBackToTop}
      aria-label={translations.footerBackToTop}
    >
      <ArrowUp size={22} />
    </button>
  );
};
