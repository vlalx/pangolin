export type Locale = (typeof locales)[number];

export const locales = ['en', 'de-DE'] as const;
export const defaultLocale: Locale = 'en';
