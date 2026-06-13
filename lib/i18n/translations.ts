import en from '../../translations/en.json';
import type { Language } from './config';

type TranslationMap = Record<string, unknown>;

const loaders: Partial<Record<Language, () => Promise<TranslationMap>>> = {
  es: () => import('../../translations/es.json').then(m => (m.default ?? m) as TranslationMap),
  pl: () => import('../../translations/pl.json').then(m => (m.default ?? m) as TranslationMap),
  it: () => import('../../translations/it.json').then(m => (m.default ?? m) as TranslationMap),
  fr: () => import('../../translations/fr.json').then(m => (m.default ?? m) as TranslationMap),
};

const cache = new Map<Language, TranslationMap>();
cache.set('en', en as TranslationMap);

export function getCachedTranslations(language: Language): TranslationMap | null {
  return cache.get(language) ?? null;
}

export async function loadTranslations(language: Language): Promise<TranslationMap> {
  const existing = cache.get(language);
  if (existing) return existing;

  const loader = loaders[language];
  if (!loader) return en as TranslationMap;

  const data = await loader();
  cache.set(language, data);
  return data;
}
