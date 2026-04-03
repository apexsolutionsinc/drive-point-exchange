export type DataLayerValue = string | number | boolean | null | undefined;

export type DataLayerEvent = {
  event: string;
} & Record<string, DataLayerValue>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export interface LeadEventPayload {
  lead_type: string;
  form_name: string;
  calculator_type?: string;
  language?: string;
  loan_type?: string;
  sms_consent?: boolean;
  is_agent?: boolean;
}

const GTM_PREVIEW_PARAM_PREFIX = 'gtm_';

export interface TrackedPageContext {
  pagePath: string;
  pageLocation: string;
}

export function getTrackedPageContext(): TrackedPageContext {
  if (typeof window === 'undefined') {
    return {
      pagePath: '/',
      pageLocation: '',
    };
  }

  const url = new URL(window.location.href);
  const trackedSearchParams = new URLSearchParams(url.search);

  for (const key of Array.from(trackedSearchParams.keys())) {
    if (key.startsWith(GTM_PREVIEW_PARAM_PREFIX)) {
      trackedSearchParams.delete(key);
    }
  }

  const trackedSearch = trackedSearchParams.toString();
  const pagePath = trackedSearch ? `${url.pathname}?${trackedSearch}` : url.pathname;

  url.search = trackedSearch;

  return {
    pagePath,
    pageLocation: url.toString(),
  };
}

export function pushDataLayerEvent(event: DataLayerEvent): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function trackLeadSubmitted(payload: LeadEventPayload): void {
  if (typeof window === 'undefined') {
    return;
  }

  const { pagePath, pageLocation } = getTrackedPageContext();

  pushDataLayerEvent({
    event: 'generate_lead',
    page_path: pagePath,
    page_location: pageLocation,
    ...payload,
  });
}