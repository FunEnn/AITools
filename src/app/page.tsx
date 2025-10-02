import Hero from '@/components/Hero';
import AiTools from '@/components/AiTools';
import Testimonial from '@/components/Testimonial';
import Plan from '@/components/Plan';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';


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
