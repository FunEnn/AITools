"use client";

import { enUS, zhCN } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { use } from "react";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);

  return (
    <ClerkProvider localization={lang === "zh" ? zhCN : enUS}>
      {children}
    </ClerkProvider>
  );
}
