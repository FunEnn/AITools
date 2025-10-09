import AiTools from "@/components/features/AiTools";
import Hero from "@/components/features/Hero";
import Plan from "@/components/features/Plan";
import Testimonial from "@/components/features/Testimonial";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang as Lang)) as any;

  return (
    <>
      <Navbar lang={lang as Lang} dict={dict} />
      <Hero dict={dict} lang={lang as Lang} />
      <AiTools dict={dict} lang={lang as Lang} />
      <Testimonial dict={dict} />
      <Plan dict={dict} />
      <Footer dict={dict} />
    </>
  );
}
