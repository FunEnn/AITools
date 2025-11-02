import Privacy from "@/components/features/Privacy";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface PrivacyPageProps {
  params: Promise<{ lang: string }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { lang } = await params;
  const dict = (await getDictionary(lang as Lang)) as any;

  return (
    <>
      <Navbar lang={lang as Lang} dict={dict} />
      <Privacy dict={dict} lang={lang as Lang} />
      <Footer dict={dict} lang={lang} />
    </>
  );
}
