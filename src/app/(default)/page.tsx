import Hero from '@/components/Hero';
import AiTools from '@/components/AiTools';
import Navbar from '@/components/Navbar';
import Testimonial from '@/components/Testimonial';
import Plan from '@/components/Plan';
import Footer from '@/components/Footer';

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
