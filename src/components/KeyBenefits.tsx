import { useState, useEffect } from 'react';
import { Zap, Shield, TrendingUp, Clock } from 'lucide-react';

export function KeyBenefits() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const benefits = [
    { 
      icon: Clock, 
      title: 'ALWAYS AVAILABLE', 
      desc: 'Your AI works around the clock, never missing an opportunity',
    },
    { 
      icon: Zap, 
      title: 'LIGHTNING FAST', 
      desc: 'Instant responses that keep leads engaged and interested',
    },
    { 
      icon: Shield, 
      title: 'ENTERPRISE SECURITY', 
      desc: 'Bank-level encryption and compliance standards',
    },
    { 
      icon: TrendingUp, 
      title: 'PROVEN RESULTS', 
      desc: '3x increase in lead conversion on average',
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950 px-6 lg:px-20 py-20 lg:py-32 overflow-hidden">
      
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
        {[...Array(30)].map((_, i) => (
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

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24 space-y-6 animate-fade-in-up">
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight leading-tight">
            WHY TEAMS CHOOSE<br />TECHTREKKERS.AI
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Powerful AI that amplifies your capabilities without replacing the human touch
          </p>
        </div>

        {/* Benefits Grid - No boxes, motion divs with floating effect */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group relative text-center animate-fade-in-up hover-float"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated glow effect behind icon */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
              
              {/* Icon with motion */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <benefit.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>

              {/* Title with motion */}
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight uppercase group-hover:text-cyan-400 transition-colors duration-300">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-xs mx-auto group-hover:text-white/95 transition-colors duration-300">
                {benefit.desc}
              </p>

              {/* Decorative line underneath */}
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .hover-float:hover {
          animation: float 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}