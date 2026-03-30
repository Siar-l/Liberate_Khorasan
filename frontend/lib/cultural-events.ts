export type Locale = "fa" | "en";

export type CulturalEvent = {
  id: string;
  locale: Locale;
  title: string;
  date: string;
  location: string;
  description: string;
  createdAt: string;
};

export const CULTURAL_EVENTS_STORAGE_KEY = "lk_cultural_events_v1";

export const parseEvents = (raw: string | null): CulturalEvent[] => {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is CulturalEvent => {
      return (
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "locale" in item &&
        "title" in item &&
        "date" in item &&
        "location" in item &&
        "description" in item &&
        "createdAt" in item
      );
    });
  } catch {
    return [];
  }
};
