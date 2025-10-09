import RemoveObjectClient from "@/components/ai/RemoveObjectClient";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface RemoveObjectPageProps {
  params: Promise<{ lang: string }>;
}

export default async function RemoveObjectPage({
  params,
}: RemoveObjectPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);

  return <RemoveObjectClient dict={dict} lang={lang as Lang} />;
}
