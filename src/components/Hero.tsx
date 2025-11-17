import { useState, useEffect } from 'react';
import heroImg from "../Images/ChatGPT Image Nov 16, 2025, 07_42_02 PM.png"

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('Product');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      
      {/* Main Card Container */}
      <div className="relative w-full overflow-hidden shadow-2xl">
        
        {/* Blue gradient background */}
        <div className="relative bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950 px-12 lg:px-20 py-16 lg:py-20">
          
          {/* Dynamic gradient orb that follows mouse */}
          <div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl transition-all duration-700 ease-out pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(14,165,233,0.4) 40%, transparent 70%)',
              left: `${mousePosition.x - 300}px`,
              top: `${mousePosition.y - 300}px`,
            }}
          />

          {/* Ambient glow effects */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]"></div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-40"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: 'rgba(6,182,212,0.5)',
                  boxShadow: '0 0 4px rgba(6,182,212,0.8)'
                }}
              />
            ))}
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up z-20">
              
              {/* Main Headline */}
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white">
                DEPLOY AI AGENTS THAT NEVER SLEEP
              </h1>

              {/* Description */}
              <p className="text-lg text-white/95 leading-relaxed max-w-lg">
                Techtrekkers.ai builds autonomous AI agents that handle your busiest workflows. From lead qualification to property analysis—your digital workforce works 24/7.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={scrollToProducts}
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Explore 
                </button>
              </div>
            </div>

            {/* Right Content - Visual Hero */}
            <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center animate-fade-in-up z-20" style={{ animationDelay: '0.2s' }}>
              
              {/* Holographic Silhouette - Behind */}
              

              {/* Professional Woman Image - FRONT AND CENTER */}
              <div className="relative absolute  bottom-10  h-[600px] z-30">
                <img 
                  src={heroImg} 
                  alt="Professional AI Agent" 
                  className="w-full h-full object-cover object-top"
                  style={{
                    filter: 'drop-shadow(0 15px 50px rgba(0,0,0,0.4))',
                  }}
                />
              </div>

              {/* Product Text - Right Side */}
              <div className="absolute bottom-[8%] right-0 text-right space-y-3 z-40 max-w-sm">
                <div className="space-y-1">
                  <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none drop-shadow-lg">
                    DIGITAL TWIN
                  </h2>
                  <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight leading-none drop-shadow-lg">
                    TrekEstateAgent
                  </h3>
                </div>
                
                <p className="text-lg font-bold text-white leading-tight">
                  AI Agents for Real Estate<br />
                  that work 24/7.
                </p>
                
                <p className="text-sm text-white/90 leading-relaxed">
                  Transform real estate sales with intelligent AI agents that automate lead capture, qualification, and act as your sales assistant.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export { Hero };
export default Hero;
