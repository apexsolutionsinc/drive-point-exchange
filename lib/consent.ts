export interface ConsentState {
  necessary: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
}

const CONSENT_KEY = 'apex-cookie-consent';
const CONSENT_VERSION = 1;

export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(choices: { functional: boolean; marketing: boolean }): void {
  const state: ConsentState = {
    necessary: true,
    functional: choices.functional,
    marketing: choices.marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent('consent-updated'));
}

export function hasConsent(): boolean {
  return getConsent() !== null;
}

export function revokeConsent(): void {
  const state: ConsentState = {
    necessary: true,
    functional: false,
    marketing: false,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent('consent-updated'));
}
