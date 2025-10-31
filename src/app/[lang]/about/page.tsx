import About from "@/components/features/About";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const dict = (await getDictionary(lang as Lang)) as any;

  return (
    <>
      <Navbar lang={lang as Lang} dict={dict} />
      <About dict={dict} lang={lang as Lang} />
      <Footer dict={dict} lang={lang} />
    </>
  );
}
