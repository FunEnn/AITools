import AIPageClient from "@/components/ai/AIPageClient";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";
import type { Dictionary } from "@/types/dictionary";

interface AIPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AIPage({ params }: AIPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);

  return (
    <AIPageClient dict={dict as unknown as Dictionary} lang={lang as Lang} />
  );
}
