import CommunityClient from "@/components/ai/CommunityClient";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface CommunityPageProps {
  params: Promise<{ lang: string }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);

  return <CommunityClient dict={dict} lang={lang as Lang} />;
}
