export type LanguageCode = 'ta' | 'en';

export type ChurchId = 'velankanni' | 'poondi';

export interface LanguageInfo {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  region: string;
  flagOrSymbol: string;
  fontFamilyClass: string;
}

export interface HistorySection {
  id: string;
  number: string; // e.g. "01", "02"
  title: string;
  subtitle?: string;
  content: string[];
  keyPoints?: string[];
  quote?: string;
  image?: string;
  imageCaption?: string;
  verifiedStatus?: 'verified' | 'exhibit_note';
}

export interface TimelineMilestone {
  id: string;
  yearOrEra: string;
  title: string;
  description: string;
  tag?: string;
  icon?: string;
  isTraditional?: boolean;
  statusLabel?: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  dateOrEra: string;
  description: string;
  badge?: string;
}

export interface Festival {
  id: string;
  name: string;
  datePeriod: string;
  significance: string;
  traditions: string[];
}

export interface ArchitectureFeature {
  id: string;
  title: string;
  description: string;
  iconName?: 'church' | 'bell' | 'cross' | 'shield' | 'compass' | 'sparkles' | 'book' | 'heart' | 'flame' | 'feather' | 'layers';
}

export interface SpecialFeature {
  id: string;
  title: string;
  description: string;
  iconName?: 'church' | 'bell' | 'cross' | 'shield' | 'compass' | 'sparkles' | 'book' | 'heart' | 'flame' | 'feather';
}

export interface FestivalScheduleEntry {
  id: string;
  date: string;
  icon: string;
  title: string;
  stage: string;
  description: string;
  highlights: string[];
  isPinnacle?: boolean;
}

export interface ChurchData {
  id: ChurchId;
  name: string;
  tamilName?: string;
  subtitle: string;
  location: string;
  patronSaint: string;
  elevationStatus: string;
  heroImage: string;
  heroTagline: string;
  shortDescription: string;
  overviewHighlights: { label: string; value: string }[];
  historySections: HistorySection[];
  timeline: TimelineMilestone[];
  events: HistoricalEvent[];
  festivals: Festival[];
  feastPeriodLabel: string;
  feastIntro: string;
  festivalSchedule: FestivalScheduleEntry[];
  specialFeatures: SpecialFeature[];
  architectureFeatures: ArchitectureFeature[];
  architectureIntro: string;
  architectureTitle: string;
}

export interface UITranslations {
  appName: string;
  appSubtitle: string;
  experienceTag: string;
  selectLanguageTitle: string;
  selectLanguageSubtitle: string;
  continueBtn: string;
  homeTitle: string;
  homeSubtitle: string;
  exploreHistoryBtn: string;
  changeLanguage: string;
  backToHome: string;
  backBtn: string;
  close: string;

  // Section Navigation & Headings
  historySectionHeading: string;
  timelineHeading: string;
  eventsHeading: string;
  festivalsHeading: string;
  featuresHeading: string;
  architectureHeading: string;

  // Section Subtitles
  historySectionSub: string;
  timelineSub: string;
  eventsSub: string;
  festivalsSub: string;
  featuresSub: string;
  architectureSub: string;

  // Jump Pills
  navHistory: string;
  navTimeline: string;
  navFestivals: string;
  navArchitecture: string;

  // Badges & Labels
  verifiedBadge: string;
  exhibitNoteBadge: string;
  milestoneLabel: string;

  // Footer
  footerAboutTitle: string;
  footerAboutText: string;
  footerExploreOther: string;
  footerBackToTop: string;
  footerExhibitionNote: string;
  footerCopyright: string;

  // Comfort & Utility
  textLarge: string;
  textStandard: string;
  reduceMotion: string;
}
