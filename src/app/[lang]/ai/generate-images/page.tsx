import GenerateImagesClient from "@/components/ai/GenerateImagesClient";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface GenerateImagesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function GenerateImagesPage({
  params,
}: GenerateImagesPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);

  return <GenerateImagesClient dict={dict} />;
}
