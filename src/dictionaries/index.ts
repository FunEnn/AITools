import type { Lang } from "@/i18n";

// Import only essential translations
const translations = {
  en: {
    nav: () => import("./en/nav").then((module) => module.default),
    hero: () => import("./en/hero").then((module) => module.default),
    tools: () => import("./en/tools").then((module) => module.default),
    pricing: () => import("./en/pricing").then((module) => module.default),
    testimonials: () =>
      import("./en/testimonials").then((module) => module.default),
    ai: () => import("./en/ai").then((module) => module.default),
    notFound: () => import("./en/not-found").then((module) => module.default),
    about: () => import("./en/about").then((module) => module.default),
  },
  zh: {
    nav: () => import("./zh/nav").then((module) => module.default),
    hero: () => import("./zh/hero").then((module) => module.default),
    tools: () => import("./zh/tools").then((module) => module.default),
    pricing: () => import("./zh/pricing").then((module) => module.default),
    testimonials: () =>
      import("./zh/testimonials").then((module) => module.default),
    ai: () => import("./zh/ai").then((module) => module.default),
    notFound: () => import("./zh/not-found").then((module) => module.default),
    about: () => import("./zh/about").then((module) => module.default),
  },
};

export const getDictionary = async (lang: Lang) => {
  const nav = await translations[lang].nav();
  const hero = await translations[lang].hero();
  const tools = await translations[lang].tools();
  const pricing = await translations[lang].pricing();
  const testimonials = await translations[lang].testimonials();
  const ai = await translations[lang].ai();
  const notFound = await translations[lang].notFound();
  const about = await translations[lang].about();

  return {
    nav,
    hero,
    tools,
    pricing,
    testimonials,
    ai,
    notFound,
    about,
  };
};
