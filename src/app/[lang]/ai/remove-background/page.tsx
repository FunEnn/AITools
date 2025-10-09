import RemoveBackgroundClient from "@/components/ai/RemoveBackgroundClient";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface RemoveBackgroundPageProps {
  params: Promise<{ lang: string }>;
}

export default async function RemoveBackgroundPage({
  params,
}: RemoveBackgroundPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);

  return <RemoveBackgroundClient dict={dict} lang={lang as Lang} />;
}
