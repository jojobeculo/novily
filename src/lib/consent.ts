/**
 * Audience measurement consent, kept in the visitor's browser (no cookie).
 * The CNIL recommends asking again after 13 months.
 */
export type Consent = "granted" | "denied";

const KEY = "noveo-consent";
const MAX_AGE_MS = 13 * 30.5 * 24 * 60 * 60 * 1000;

/** Window event that reopens the consent banner (footer "Cookies" link). */
export const OPEN_CONSENT_EVENT = "noveo:open-consent";

export function readConsent(): Consent | null {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (typeof stored !== "object" || stored === null) return null;
    const { value, date } = stored as { value?: unknown; date?: unknown };
    if (value !== "granted" && value !== "denied") return null;
    if (typeof date !== "number" || Date.now() - date > MAX_AGE_MS) return null;
    return value;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ value, date: Date.now() }));
  } catch {
    // Storage blocked (private mode): the choice holds for this visit only.
  }
}
