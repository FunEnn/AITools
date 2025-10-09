import WriteArticleClient from "@/components/ai/WriteArticleClient";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface WriteArticlePageProps {
  params: Promise<{ lang: string }>;
}

export default async function WriteArticlePage({
  params,
}: WriteArticlePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);

  return <WriteArticleClient dict={dict} lang={lang as Lang} />;
}
