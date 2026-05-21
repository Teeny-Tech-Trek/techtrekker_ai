import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Cards3D from './3D/Cards3D';

const FLOATING_PARTICLES = Array.from({ length: 40 }, (_, index) => ({
  id: index,
  size: Math.random() * 2 + 1,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  opacity: 0.2 + (index % 5) * 0.05,
}));

function TechtrekkersLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[80] flex min-h-screen items-center justify-center bg-black px-6 text-white"
    >
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
          <span className="techtrekkers-loader-word text-5xl font-black sm:text-7xl">
            TechTrekkers
          </span>
        </div>

        <p className="mt-8 text-2xl font-semibold text-white/85 sm:text-3xl">
          Adding 3D Intelligence...
        </p>

        <div className="techtrekkers-loader-spinner mt-44 sm:mt-56" aria-hidden="true" />
        <span className="sr-only">Loading Techtrekkers 3D hero</span>
      </div>

      <style>{`
        .techtrekkers-loader-word {
          background: linear-gradient(90deg, #60a5fa 0%, #a78bfa 48%, #67e8f9 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1;
        }

        .techtrekkers-loader-spinner {
          width: 76px;
          height: 76px;
          border-radius: 999px;
          background: repeating-conic-gradient(from 0deg, rgba(255,255,255,0.95) 0deg 9deg, transparent 9deg 18deg);
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px));
          animation: techtrekkers-loader-spin 1.1s steps(24) infinite;
        }

        @keyframes techtrekkers-loader-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .techtrekkers-loader-spinner {
            width: 64px;
            height: 64px;
          }
        }
      `}</style>
    </div>
  );
}

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHeroReady, setIsHeroReady] = useState(false);
  const heroCopyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isHeroReady || !heroCopyRef.current) return;

    const targets = heroCopyRef.current.querySelectorAll('.gsap-line');

    gsap.set(targets, { opacity: 0, y: 40 });

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      stagger: {
        amount: 1,
        from: 'start',
      },
    });
  }, [isHeroReady]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('Product');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="Home" className="hero-section relative min-h-screen overflow-hidden bg-slate-950">
      <div
        aria-hidden={!isHeroReady}
        className={`hero-wrapper transition-opacity duration-500 ${isHeroReady ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="hero-scene absolute z-0">
          <Cards3D height="100%" onReady={() => setIsHeroReady(true)} />
        </div>

        <div aria-hidden="true" className="absolute inset-0 z-[5] pointer-events-none">
          <div
            className="absolute h-[600px] w-[600px] rounded-full opacity-20 blur-3xl transition-all duration-700 ease-out"
            style={{
              background:
                'radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(14,165,233,0.4) 40%, transparent 70%)',
              left: `${mousePosition.x - 300}px`,
              top: `${mousePosition.y - 300}px`,
            }}
          />

          <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-400/10 blur-[100px]" />

          <div className="absolute inset-0 overflow-hidden">
            {FLOATING_PARTICLES.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full bg-cyan-300"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: particle.left,
                  top: particle.top,
                  opacity: particle.opacity,
                  boxShadow: '0 0 4px rgba(6,182,212,0.8)',
                }}
              />
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hero-overlay absolute inset-0 z-10 pointer-events-none"
        />

        <div
          ref={heroCopyRef}
          className="hero-copy relative z-20 flex min-h-screen flex-col"
          style={{
            paddingLeft: 'clamp(1.25rem, 5vw, 5rem)',
            paddingRight: 'clamp(1.25rem, 5vw, 5rem)',
          }}
        >
          <div className="space-y-5 sm:space-y-7 lg:space-y-8">

            {/* Line 1 — Badge */}
            <div className="gsap-line inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm">
              <span className="text-blue-400 text-sm" aria-hidden="true">
                &#10022;
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white/70">
                AI-POWERED ECOSYSTEM
              </span>
            </div>

            {/* Line 2 — Heading */}
            <h1
              className="gsap-line font-black tracking-tight text-white"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
            >
              Build. Automate.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Scale with AI.
              </span>
            </h1>

            {/* Line 3 — Paragraph */}
            <p className="gsap-line max-w-xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg">
              Techtrekkers.ai delivers intelligent AI agents that handle real work.
             <br /> From automation to
              net twins and real estate, we power your next big advantage.
            </p>

            {/* Line 4 — Buttons */}
            <div className="gsap-line flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-violet-600 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <span>Explore Products</span>
                <span aria-hidden="true">&rarr;</span>
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/15">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 8 10" aria-hidden="true">
                    <path d="M0 0v10l8-5z" />
                  </svg>
                </span>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Line 5 — Stats */}
            <div className="gsap-line flex flex-wrap items-center gap-4 pt-2 sm:gap-6 lg:gap-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                  </svg>
                  <span className="text-xl sm:text-2xl font-black text-white">24/7</span>
                </div>
                <p className="text-[11px] sm:text-xs font-medium text-white/50">AI Agents Working</p>
              </div>

              <div className="hidden sm:block h-10 w-px bg-white/10" />

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  <span className="text-xl sm:text-2xl font-black text-white">3</span>
                </div>
                <p className="text-[11px] sm:text-xs font-medium text-white/50">Powerful Products</p>
              </div>

              <div className="hidden sm:block h-10 w-px bg-white/10" />

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span className="text-xl sm:text-2xl font-black text-white">5+</span>
                </div>
                <p className="text-[11px] sm:text-xs font-medium text-white/50">Businesses Trust Us</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {!isHeroReady && <TechtrekkersLoader />}

      <style>{`
        /* Default: large desktops / monitors — text LEFT half, 3D RIGHT half */
        /* top/bottom set to 0 (was -8vh) so the canvas does NOT extend past the
           section — removes the extra empty transparent space above & below. */
        .hero-scene {
          top: 0;
          bottom: 0;
          right: 18px;
          width: min(52vw, 920px);
        }

        .hero-copy {
          max-width: 50%;
          padding-top: 92px;
          padding-bottom: 72px;
          justify-content: center;
        }

        /* Overlay HATA diya — yeh left-dark / right-light split bana raha tha
           jisse screen ke beech ek vertical line/seam dikh rahi thi. Cards ab
           waise bhi right side pe hain (text ke upar nahi aate), isliye overlay
           ki zaroorat nahi. Background ab poori width pe ekdum uniform hai, toh
           text + 3D ek hi component jaisa lagta hai — koi divide line nahi. */
        .hero-overlay {
          display: none;
        }

        /* Ultra-wide monitors — keep proportions */
        @media (min-width: 1920px) {
          .hero-scene {
            width: min(46vw, 1100px);
            right: 40px;
          }
          .hero-copy {
            max-width: 48%;
            padding-left: clamp(3rem, 8vw, 10rem) !important;
          }
        }

        /* Tablets / small laptops */
        /* top/bottom set to 0 (was -4vh) — same reason as above. */
        @media (max-width: 1024px) {
          .hero-scene {
            bottom: 0;
            right: 12px;
            top: 0;
            width: min(56vw, 720px);
          }
          .hero-copy {
            max-width: min(100%, 38rem);
          }
        }

        /* Tablets portrait — text on top, 3D scene below */
        @media (max-width: 900px) {
          .hero-section {
            min-height: auto;
          }
          .hero-wrapper {
            display: flex;
            flex-direction: column;
          }
          .hero-copy {
            order: 1;
            max-width: 100%;
            min-height: auto;
            padding-top: 96px;
            padding-bottom: 24px;
            justify-content: flex-start;
          }
          .hero-scene {
            order: 2;
            position: relative;
            inset: auto;
            width: 100%;
            margin-left: 0;
            height: 65vh;
            min-height: 460px;
            margin-top: -10px;
            opacity: 1;
          }
          .hero-overlay {
            display: none;
          }
        }

        /* Mobile phones */
        @media (max-width: 640px) {
          .hero-copy {
            padding-top: 84px;
            padding-bottom: 12px;
          }
          .hero-scene {
            width: 105%;
            margin-left: -2.5%;
            height: 60vh;
            min-height: 420px;
            margin-top: 0;
          }
        }

        /* Small phones */
        @media (max-width: 380px) {
          .hero-copy {
            padding-top: 80px;
          }
          .hero-scene {
            width: 108%;
            margin-left: -4%;
            height: 56vh;
            min-height: 380px;
          }
        }
      `}</style>
    </section>
  );
}

export { Hero };
export default Hero;