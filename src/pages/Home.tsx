import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ServicesPreview from '../components/ServicesPreview';
import AboutPreview from '../components/AboutPreview';
import Process from '../components/Process';
import ProductsPreview from '../components/ProductsPreview';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';

function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <ServicesPreview />
      <AboutPreview />
      <Process />
      <ProductsPreview />
      <Testimonials />
      <Partners />
    </main>
  );
}

export default Home;
