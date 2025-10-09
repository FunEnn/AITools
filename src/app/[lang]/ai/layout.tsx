import AILayoutClient from "@/components/layout/AILayoutClient";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface AILayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function AILayout({ children, params }: AILayoutProps) {
  const { lang } = await params;
  const dict = (await getDictionary(lang as Lang)) as any;

  return (
    <AILayoutClient dict={dict} lang={lang as Lang}>
      {children}
    </AILayoutClient>
  );
}
