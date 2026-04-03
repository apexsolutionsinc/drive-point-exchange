export type Language = 'en' | 'es' | 'pl' | 'it' | 'fr';

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'es', 'pl', 'it', 'fr'];

export const DEFAULT_LANGUAGE: Language = 'en';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
  nativeName: string;
  locale: string;
}

export const LANGUAGE_CONFIGS: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English',
    locale: 'en-US',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸',
    nativeName: 'Español',
    locale: 'es-ES',
  },
  pl: {
    code: 'pl',
    name: 'Polish',
    flag: '🇵🇱',
    nativeName: 'Polski',
    locale: 'pl-PL',
  },
  it: {
    code: 'it',
    name: 'Italian',
    flag: '🇮🇹',
    nativeName: 'Italiano',
    locale: 'it-IT',
  },
  fr: {
    code: 'fr',
    name: 'French',
    flag: '🇫🇷',
    nativeName: 'Français',
    locale: 'fr-FR',
  },
};

export function isValidLanguage(language: string): language is Language {
  return SUPPORTED_LANGUAGES.includes(language as Language);
}

export function getLanguageConfig(language: Language): LanguageConfig {
  return LANGUAGE_CONFIGS[language];
}

export function getAllLanguageConfigs(): LanguageConfig[] {
  return SUPPORTED_LANGUAGES.map(getLanguageConfig);
}
