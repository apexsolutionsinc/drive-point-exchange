import enTranslations from '../../translations/en.json';
import esTranslations from '../../translations/es.json';
import plTranslations from '../../translations/pl.json';
import itTranslations from '../../translations/it.json';
import frTranslations from '../../translations/fr.json';
import { Language } from './config';

export const translations = {
  en: enTranslations,
  es: esTranslations,
  pl: plTranslations,
  it: itTranslations,
  fr: frTranslations,
};

export function getTranslations(language: Language) {
  return translations[language] || translations.en;
}
