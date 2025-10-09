export const i18n = {
  defaultLang: "en",
  langs: ["en", "zh"] as const,
} as const;

export type Lang = (typeof i18n)["langs"][number];

export const defaultLang = i18n.defaultLang;
export const langs = i18n.langs;
