import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ShopSection from './components/ShopSection';
import OnlineSection from './components/OnlineSection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import { shop } from './data';

export default function App() {
  useEffect(() => {
    document.title = `${shop.name} | Mobile Repair & Online Services`;
  }, []);

  return (
    <div className="site">
      <Navbar />

      <main>
        <Hero />

        <ServicesSection />

        <ShopSection />

        <OnlineSection />

        <ContactSection />

        {/* Reviews is now the last main section */}
        <ReviewsSection />
      </main>

      <Footer />
    </div>
  );
}