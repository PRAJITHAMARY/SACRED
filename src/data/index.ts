import type { ChurchData, ChurchId, LanguageCode } from '../types';
import { VELANKANNI_DATA } from './churches/velankanni';
import { POONDI_DATA } from './churches/poondi';

export function getChurchData(id: ChurchId, lang: LanguageCode): ChurchData {
  if (id === 'velankanni') {
    return VELANKANNI_DATA[lang] || VELANKANNI_DATA.en;
  }
  if (id === 'poondi') {
    return POONDI_DATA[lang] || POONDI_DATA.en;
  }
  return VELANKANNI_DATA[lang] || VELANKANNI_DATA.en;
}

export const ALL_CHURCH_IDS: ChurchId[] = ['velankanni', 'poondi'];
