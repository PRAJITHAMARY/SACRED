import type { LanguageInfo, LanguageCode } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    region: 'தமிழ்நாடு • Tamil Nadu',
    flagOrSymbol: '🇮🇳',
    fontFamilyClass: 'font-tamil',
  },
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    region: 'International',
    flagOrSymbol: '🇬🇧',
    fontFamilyClass: 'font-english',
  },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'ta';

export function getLanguageInfo(code: LanguageCode): LanguageInfo {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code) || SUPPORTED_LANGUAGES[0];
}
