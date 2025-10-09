import BlogTitlesClient from "@/components/ai/BlogTitlesClient";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface BlogTitlesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function BlogTitlesPage({ params }: BlogTitlesPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);

  return <BlogTitlesClient dict={dict} lang={lang as Lang} />;
}
