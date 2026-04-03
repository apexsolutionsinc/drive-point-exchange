import { Language } from './config';

// Email template translation utility
export async function getEmailTranslations(language: Language) {
  try {
    const translations = await import(`../../translations/${language}.json`);
    return translations.default.email;
  } catch (error) {
    console.error(`Failed to load email translations for ${language}:`, error);
    // Fallback to English
    const fallbackTranslations = await import(`../../translations/en.json`);
    return fallbackTranslations.default.email;
  }
}

// Format currency based on language
export function formatCurrency(amount: number, language: Language): string {
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    es: 'es-ES',
    pl: 'pl-PL',
    it: 'it-IT',
    fr: 'fr-FR',
  };

  const locale = localeMap[language];
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD', // Keep USD for all languages as it's a US company
    }).format(amount);
  } catch {
    // Fallback to simple USD formatting
    return `$${amount.toLocaleString()}`;
  }
}

// Format number based on language
export function formatNumber(number: number, language: Language): string {
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    es: 'es-ES',
    pl: 'pl-PL',
    it: 'it-IT',
    fr: 'fr-FR',
  };

  const locale = localeMap[language];
  
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch {
    // Fallback to simple formatting
    return number.toLocaleString();
  }
}

// Format percentage based on language
export function formatPercentage(percentage: number, language: Language): string {
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    es: 'es-ES',
    pl: 'pl-PL',
    it: 'it-IT',
    fr: 'fr-FR',
  };

  const locale = localeMap[language];
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(percentage / 100);
  } catch {
    // Fallback to simple percentage formatting
    return `${percentage.toFixed(2)}%`;
  }
}

// Get language name in its native language
export function getNativeLanguageName(language: Language): string {
  const nativeNames: Record<Language, string> = {
    en: 'English',
    es: 'Español',
    pl: 'Polski',
    it: 'Italiano',
    fr: 'Français',
  };
  
  return nativeNames[language];
}

// Validate and sanitize language parameter
export function sanitizeLanguage(language: string | undefined): Language {
  if (!language) return 'en';
  
  const validLanguages: Language[] = ['en', 'es', 'pl', 'it', 'fr'];
  return validLanguages.includes(language as Language) ? (language as Language) : 'en';
}
