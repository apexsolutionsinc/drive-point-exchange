'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, ReactNode } from 'react';
import { getCachedTranslations, loadTranslations } from './translations';

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

function getSavedLanguage(): Language | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('apex-language') as Language;
    if (saved && LANGUAGES.some(lang => lang.code === saved)) return saved;
  }
  return null;
}

function lookup(key: string, translations: Record<string, unknown>, params?: Record<string, string | number>): unknown {
  const keys = key.split('.');
  let value: unknown = translations;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }
  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => params[paramKey]?.toString() || _);
  }
  return value;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState(() => getCachedTranslations(DEFAULT_LANGUAGE)!);
  const isLoaded = useRef(false);

  useEffect(() => {
    const saved = getSavedLanguage();
    if (saved) {
      setLanguageState(saved);
      const cached = getCachedTranslations(saved);
      if (cached) {
        setTranslations(cached);
      } else {
        loadTranslations(saved).then(setTranslations);
      }
    }
    isLoaded.current = true;
  }, []);

  useEffect(() => {
    const cached = getCachedTranslations(language);
    if (cached) {
      setTranslations(cached);
    } else {
      loadTranslations(language).then(setTranslations);
    }
  }, [language]);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('apex-language', newLanguage);
    }
  }, []);

  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    return lookup(key, translations, params);
  }, [translations]);

  const ts = useCallback((key: string, params?: Record<string, string | number>) => {
    const result = lookup(key, translations, params);
    return typeof result === 'string' ? result : key;
  }, [translations]);

  const value = useMemo<I18nContextType>(() => ({
    language,
    setLanguage,
    t,
    ts,
    languages: LANGUAGES,
  }), [language, setLanguage, t, ts]);

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

export function getLanguageLocale(language: Language): string {
  const localeMap: Record<Language, string> = {
    en: 'en-US', es: 'es-ES', pl: 'pl-PL', it: 'it-IT', fr: 'fr-FR',
  };
  return localeMap[language];
}

export function getLanguageAttribute(language: Language): string {
  return language;
}
