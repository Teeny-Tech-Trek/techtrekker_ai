import { Hero } from './components/Hero';
import { ProductSpotlights } from './components/ProductSpotlights';
import { KeyBenefits } from './components/KeyBenefits';
import { Testimonials } from './components/Testimonials';
import { CTAFooter } from './components/CTAFooter';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Hero />
      <ProductSpotlights />
      <KeyBenefits />
      <Testimonials />
      <CTAFooter />
    </div>
  );
}

export default App;
