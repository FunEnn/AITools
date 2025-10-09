import type { Lang } from "@/i18n";

// Import all translations
const translations = {
  en: {
    locale: () => import("./en/locale").then((module) => module.default),
    nav: () => import("./en/nav").then((module) => module.default),
    hero: () => import("./en/hero").then((module) => module.default),
    tools: () => import("./en/tools").then((module) => module.default),
    pricing: () => import("./en/pricing").then((module) => module.default),
    community: () => import("./en/community").then((module) => module.default),
    testimonials: () =>
      import("./en/testimonials").then((module) => module.default),
    ai: () => import("./en/ai").then((module) => module.default),
  },
  zh: {
    locale: () => import("./zh/locale").then((module) => module.default),
    nav: () => import("./zh/nav").then((module) => module.default),
    hero: () => import("./zh/hero").then((module) => module.default),
    tools: () => import("./zh/tools").then((module) => module.default),
    pricing: () => import("./zh/pricing").then((module) => module.default),
    community: () => import("./zh/community").then((module) => module.default),
    testimonials: () =>
      import("./zh/testimonials").then((module) => module.default),
    ai: () => import("./zh/ai").then((module) => module.default),
  },
};

export const getDictionary = async (lang: Lang) => {
  const locale = await translations[lang].locale();
  const nav = await translations[lang].nav();
  const hero = await translations[lang].hero();
  const tools = await translations[lang].tools();
  const pricing = await translations[lang].pricing();
  const community = await translations[lang].community();
  const testimonials = await translations[lang].testimonials();
  const ai = await translations[lang].ai();

  return {
    locale,
    nav,
    hero,
    tools,
    pricing,
    community,
    testimonials,
    ai,
  };
};
