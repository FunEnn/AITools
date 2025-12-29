import ReviewResumeClient from "@/components/ai/ReviewResumeClient";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface ReviewResumePageProps {
  params: Promise<{ lang: string }>;
}

export default async function ReviewResumePage({
  params,
}: ReviewResumePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);

  return <ReviewResumeClient dict={dict} />;
}
