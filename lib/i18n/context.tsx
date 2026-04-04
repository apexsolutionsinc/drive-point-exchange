'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useSyncExternalStore } from 'react';
import { getTranslations } from './translations';

export type Language = 'en' | 'es' | 'pl' | 'it' | 'fr';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
  nativeName: string;
}

export const LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', nativeName: 'Polski' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
];

export const DEFAULT_LANGUAGE: Language = 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => unknown;
  ts: (key: string, params?: Record<string, string | number>) => string;
  languages: LanguageConfig[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

// Subscribe to nothing - we only need the snapshot
const emptySubscribe = () => () => {};

// Helper to get saved language from localStorage
function getSavedLanguage(): Language | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('apex-language') as Language;
    if (saved && LANGUAGES.some(lang => lang.code === saved)) {
      return saved;
    }
  }
  return null;
}

export function I18nProvider({ children }: I18nProviderProps) {
  // Use useSyncExternalStore to safely detect hydration
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Always start with default to avoid SSR/client mismatch
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  // Load saved language from localStorage after hydration
  useEffect(() => {
    const saved = getSavedLanguage();
    if (saved) setLanguageState(saved);
  }, []);

  // Get translations for current language
  const translations = getTranslations(language);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (isClient) {
      localStorage.setItem('apex-language', newLanguage);
    }
  };

  const t = (key: string, params?: Record<string, string | number>): unknown => {
    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation not found
      }
    }

    // Replace parameters in the translation string if it's a string
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  const ts = (key: string, params?: Record<string, string | number>): string => {
    const result = t(key, params);
    return typeof result === 'string' ? result : key;
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    ts,
    languages: LANGUAGES,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Utility function to get language-specific locale
export function getLanguageLocale(language: Language): string {
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    es: 'es-ES',
    pl: 'pl-PL',
    it: 'it-IT',
    fr: 'fr-FR',
  };
  return localeMap[language];
}

// Utility function to get language-specific HTML lang attribute
export function getLanguageAttribute(language: Language): string {
  return language;
}
