import AiTools from "@/components/features/AiTools";
import Hero from "@/components/features/Hero";
import Plan from "@/components/features/Plan";
import Testimonial from "@/components/features/Testimonial";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
      <Footer />
    </>
  );
}
