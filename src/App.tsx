  import type { SyntheticEvent } from 'react';
  import { Hero } from './components/Hero';
  import { ProductSpotlights } from './components/ProductSpotlights';
  import { KeyBenefits } from './components/KeyBenefits';
  import Footer from './components/Footer';
  import Navbar from './components/Navbar';

  function App() {
    const blockImageAction = (event: SyntheticEvent<HTMLElement>) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault();
      }
    };

    return (
      <div
        className="min-h-screen bg-slate-900"
        onContextMenu={blockImageAction}
        onDragStart={blockImageAction}
        onCopy={blockImageAction}
      >
          <Navbar/>
          <Hero />
          <ProductSpotlights />
          <KeyBenefits />
          <Footer />
        
      </div>
    );
  }

  export default App;
