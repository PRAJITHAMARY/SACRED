import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { LanguageSelectPage } from './pages/LanguageSelectPage';
import { HomePage } from './pages/HomePage';
import { ChurchPage } from './pages/ChurchPage';
import { ChurchTimelinePage } from './pages/ChurchTimelinePage';
import { ChurchFestivalsPage } from './pages/ChurchFestivalsPage';
import type { LanguageCode, ChurchId } from './types';
import { getLanguageInfo, DEFAULT_LANGUAGE } from './i18n/languages';
import { getUITranslations } from './i18n/translations';
import { getChurchData } from './data';

const STORAGE_KEY_LANG = 'sacred_heritage_lang';
const STORAGE_KEY_TEXT_SIZE = 'sacred_heritage_large_text';

const ALL_ROUTES = [
  'home', 'language',
  'velankanni', 'velankanni/timeline', 'velankanni/festivals',
  'poondi', 'poondi/timeline', 'poondi/festivals',
];

export const App: React.FC = () => {
  // 1. Language State & Persistence
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (saved && (saved === 'ta' || saved === 'en')) {
      return saved as LanguageCode;
    }
    return DEFAULT_LANGUAGE;
  });

  // 2. Reading Comfort (Large Text) State
  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_TEXT_SIZE) === 'true';
  });

  // 3. Routing State
  const getInitialRoute = (): string => {
    const path = window.location.pathname.replace(/^\/+/g, '').toLowerCase();
    const hash = window.location.hash.replace(/^#\/?/g, '').toLowerCase();
    const query = new URLSearchParams(window.location.search).get('screen')?.toLowerCase();
    const target = query || path || hash;

    if (ALL_ROUTES.includes(target)) return target;

    // If first-time user hasn't chosen language, direct to language selection
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (!saved) return 'language';
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  // 4. Language Modal State
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // Synchronize route with browser history
  const navigateTo = useCallback((route: string) => {
    setCurrentRoute(route);
    const url = route === 'home' ? '/' : `/${route}`;
    if (window.location.pathname !== url) {
      window.history.pushState({ route }, '', url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+/g, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/g, '').toLowerCase();
      const target = path || hash || 'home';
      if (ALL_ROUTES.includes(target)) {
        setCurrentRoute(target);
      } else {
        setCurrentRoute('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Language Selection
  const handleSelectLanguage = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem(STORAGE_KEY_LANG, lang);
    if (currentRoute === 'language') {
      navigateTo('home');
    }
  };

  // Toggle Large Text Mode
  const handleToggleLargeText = () => {
    setIsLargeText((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_TEXT_SIZE, String(next));
      return next;
    });
  };

  // Apply typography classes and text size to body
  useEffect(() => {
    const langInfo = getLanguageInfo(currentLang);
    document.body.className = `${langInfo.fontFamilyClass} ${isLargeText ? 'text-large' : ''}`;
    document.documentElement.lang = currentLang;
  }, [currentLang, isLargeText]);

  const translations = getUITranslations(currentLang);
  const isTa = currentLang === 'ta';

  // Determine active church and sub-route for header & footer
  const isVelankanniSubRoute =
    currentRoute === 'velankanni/timeline' || currentRoute === 'velankanni/festivals';
  const isPoondiSubRoute =
    currentRoute === 'poondi/timeline' || currentRoute === 'poondi/festivals';
  const isSubRoute = isVelankanniSubRoute || isPoondiSubRoute;

  const activeChurchId: ChurchId | undefined =
    currentRoute.startsWith('velankanni') ? 'velankanni' :
    currentRoute.startsWith('poondi') ? 'poondi' :
    undefined;

  const velankanniData = getChurchData('velankanni', currentLang);
  const poondiData = getChurchData('poondi', currentLang);
  const currentChurchData = activeChurchId ? (activeChurchId === 'velankanni' ? velankanniData : poondiData) : null;

  // Header Title & Subtitle based on Route
  let headerTitle = translations.appName;
  let headerSubtitle = translations.experienceTag;
  let headerShowBack = false;
  let headerOnBack = () => navigateTo('home');

  if (isSubRoute) {
    headerTitle = currentChurchData ? currentChurchData.name : headerTitle;
    headerShowBack = true;
    headerOnBack = () => navigateTo(activeChurchId!);

    if (currentRoute.endsWith('/timeline')) {
      headerSubtitle = isTa ? '⏳ வரலாற்று காலவரிசை' : '⏳ Historical Timeline';
    } else if (currentRoute.endsWith('/festivals')) {
      headerSubtitle = isTa ? '🕊️ 2026 முக்கிய திருவிழாக்கள்' : '🕊️ 2026 Festivals';
    }
  } else if (activeChurchId) {
    headerTitle = currentChurchData ? currentChurchData.name : translations.appName;
    headerSubtitle = currentChurchData ? currentChurchData.elevationStatus : translations.experienceTag;
    headerShowBack = true;
    headerOnBack = () => navigateTo('home');
  }

  return (
    <div className={`app-root ${getLanguageInfo(currentLang).fontFamilyClass}`}>
      {/* Top Header Navigation (shown on all exhibition pages) */}
      {currentRoute !== 'language' && (
        <Header
          currentLang={currentLang}
          translations={translations}
          title={headerTitle}
          subtitle={headerSubtitle}
          showBack={headerShowBack}
          onBack={headerOnBack}
          onOpenLanguage={() => setIsLangModalOpen(true)}
          isLargeText={isLargeText}
          onToggleLargeText={handleToggleLargeText}
        />
      )}

      {/* Main Screen Router */}
      {currentRoute === 'language' && (
        <LanguageSelectPage
          currentLang={currentLang}
          onSelectLanguage={handleSelectLanguage}
          translations={translations}
        />
      )}

      {currentRoute === 'home' && (
        <HomePage
          currentLang={currentLang}
          translations={translations}
          onSelectChurch={(churchId) => navigateTo(churchId)}
          onOpenLanguage={() => setIsLangModalOpen(true)}
        />
      )}

      {/* Reusable Church Sanctuary Page */}
      {currentRoute === 'velankanni' && (
        <ChurchPage
          church={velankanniData}
          currentLang={currentLang}
          translations={translations}
          onNavigate={navigateTo}
        />
      )}

      {currentRoute === 'poondi' && (
        <ChurchPage
          church={poondiData}
          currentLang={currentLang}
          translations={translations}
          onNavigate={navigateTo}
        />
      )}

      {/* Reusable Church Timeline Page */}
      {currentRoute === 'velankanni/timeline' && (
        <ChurchTimelinePage
          church={velankanniData}
          currentLang={currentLang}
          translations={translations}
          onNavigate={navigateTo}
        />
      )}

      {currentRoute === 'poondi/timeline' && (
        <ChurchTimelinePage
          church={poondiData}
          currentLang={currentLang}
          translations={translations}
          onNavigate={navigateTo}
        />
      )}

      {/* Reusable Church Festivals Page */}
      {currentRoute === 'velankanni/festivals' && (
        <ChurchFestivalsPage
          church={velankanniData}
          currentLang={currentLang}
          translations={translations}
          onNavigate={navigateTo}
        />
      )}

      {currentRoute === 'poondi/festivals' && (
        <ChurchFestivalsPage
          church={poondiData}
          currentLang={currentLang}
          translations={translations}
          onNavigate={navigateTo}
        />
      )}

      {/* Global Respectful Footer */}
      {currentRoute !== 'language' && (
        <Footer
          currentLang={currentLang}
          translations={translations}
          onNavigate={navigateTo}
          onOpenLanguage={() => setIsLangModalOpen(true)}
          activeChurchId={activeChurchId}
        />
      )}

      {/* Language Switcher Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLang={currentLang}
        onSelectLanguage={handleSelectLanguage}
        translations={translations}
      />
    </div>
  );
};

export default App;
