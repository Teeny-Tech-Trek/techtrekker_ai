import { useState, useEffect, useMemo, useRef } from 'react';

export function KeyBenefits() {
  const [mounted, setMounted] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stars = useMemo(
    () =>
      Array.from({ length: 65 }, (_, i) => ({
        id: i,
        size: `${Math.random() * 2 + 1}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${2 + Math.random() * 4}s`,
        animationDelay: `${Math.random() * 5}s`,
      })),
    []
  );

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      orbRef.current.style.transform = `translate3d(${e.clientX - 350}px, ${e.clientY - 350}px, 0)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !('IntersectionObserver' in window)) return;

    video.load();
    const playWhenBuffered = () => {
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        video.addEventListener('canplay', playWhenBuffered, { once: true });
        return;
      }

      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playWhenBuffered();
          return;
        }

        video.pause();
        video.currentTime = 0;
      },
      { threshold: 0.55 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      img: 'https://li2nscbbak4vqitk.public.blob.vercel-storage.com/KeyBenefitsImages/Clock.png',       // ← replace with your actual image path
      title: 'ALWAYS AVAILABLE',
      desc: 'Your AI works around the clock, never missing an opportunity',
    },
    {
      img: 'https://li2nscbbak4vqitk.public.blob.vercel-storage.com/KeyBenefitsImages/Lightning.png',   // ← replace with your actual image path
      title: 'LIGHTNING FAST',
      desc: 'Instant responses that keep leads engaged and interested',
    },
    {
      img: 'https://li2nscbbak4vqitk.public.blob.vercel-storage.com/KeyBenefitsImages/Enterprise.png',      // ← replace with your actual image path
      title: 'ENTERPRISE SECURITY',
      desc: 'Bank-level encryption and compliance standards',
    },
    {
      img: 'https://li2nscbbak4vqitk.public.blob.vercel-storage.com/KeyBenefitsImages/Proven.png',       // ← replace with your actual image path
      title: 'PROVEN RESULTS',
      desc: '3x increase in lead conversion on average',
    },
  ];

  return (
    <section
      id="Benefits"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-16 xl:px-20 pt-16 sm:pt-20 lg:pt-24"
      style={{ background: 'linear-gradient(180deg,#020817 0%,#07112e 45%,#020817 100%)' }}
    >
      <style>{`
        @keyframes kb-twinkle  { 0%,100%{opacity:.15} 50%{opacity:.9} }
        @keyframes kb-fadeup   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes kb-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes kb-pulse    { 0%,100%{opacity:.3} 50%{opacity:.7} }
        .kb-font      { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .kb-twinkle   { animation: kb-twinkle ease-in-out infinite; }
        .kb-fadeup    { animation: kb-fadeup .85s ease-out both; }
        .kb-float     { animation: kb-float 4.5s ease-in-out infinite; }
        .kb-pulse-anim { animation: kb-pulse 3s ease-in-out infinite; }
        .kb-card:hover .kb-img-wrap { animation: kb-float 2.5s ease-in-out infinite; }
      `}</style>

      {/* ── Stars ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {mounted && stars.map((star) => (
          <div
            key={star.id}
            className="kb-twinkle absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: star.left,
              top: star.top,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>

      {/* ── Mouse-follow orb ── */}
      <div
        ref={orbRef}
        className="absolute left-0 top-0 w-[700px] h-[700px] rounded-full pointer-events-none z-0 transition-transform duration-[900ms] ease-out"
        style={{
          background: 'radial-gradient(circle,rgba(99,102,241,.09) 0%,transparent 70%)',
        }}
      />

      {/* ── Ambient blobs ── */}
      <div className="absolute top-[15%] left-[5%]   w-72 h-72 rounded-full blur-[90px] bg-blue-500/[.05]   pointer-events-none z-0" />
      <div className="absolute bottom-[15%] right-[5%]  w-72 h-72 rounded-full blur-[90px] bg-cyan-500/[.05]  pointer-events-none z-0" />
      <div className="absolute top-[50%]  left-[40%]  w-60 h-60 rounded-full blur-[90px] bg-indigo-500/[.05] pointer-events-none z-0" />

      {/* ── Top arc glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(56,189,248,0.10) 0%, transparent 75%)',
        }}
      />

      {/* ══════ CONTENT ══════ */}
      <div className="relative z-10 max-w-7xl 2xl:max-w-[1500px] mx-auto">

        {/* Badge */}
        <div className="kb-fadeup flex justify-center mb-6 sm:mb-7" style={{ animationDelay: '0s' }}>
          <div
            className="kb-font inline-flex items-center gap-2 px-4 sm:px-5 py-[6px] rounded-full text-[10px] sm:text-[11px] font-bold tracking-[1.5px] sm:tracking-[2px] uppercase"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full"
              style={{ background: '#22d3ee', boxShadow: '0 0 6px #22d3ee' }}
            />
            WHY TEAMS CHOOSE US
          </div>
        </div>

        {/* Heading */}
        <div className="kb-fadeup text-center mb-4 sm:mb-5" style={{ animationDelay: '0.08s' }}>
          <h2
            className="kb-font font-black uppercase leading-[1.05] tracking-tight text-white"
            style={{ fontSize: 'clamp(1.75rem,5.4vw,4rem)' }}
          >
            WHY TEAMS CHOOSE
          </h2>
          <h2
            className="kb-font font-black uppercase leading-[1.05] tracking-tight"
            style={{
              fontSize: 'clamp(1.75rem,5.4vw,4rem)',
              background: 'linear-gradient(90deg,#22d3ee 0%,#818cf8 50%,#22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TECHTREKKERS.AI
          </h2>
        </div>

        {/* Sub-heading */}
        <p
          className="kb-fadeup kb-font text-center text-white text-sm sm:text-base leading-relaxed mb-12 sm:mb-16 lg:mb-20 px-2"
          style={{ animationDelay: '0.14s' }}
        >
          Powerful AI that amplifies your capabilities<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>without replacing the human touch
        </p>

        {/* ── Benefits Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="kb-card kb-fadeup group relative flex flex-col items-center text-center"
              style={{ animationDelay: `${0.18 + index * 0.1}s` }}
            >
              {/* Image + pedestal */}
              <div className="relative mb-5 sm:mb-7">

                {/* Wide pedestal glow disc */}
                <div
                  className="kb-pulse-anim absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 sm:w-32 lg:w-36 h-6 sm:h-7 lg:h-8 rounded-full"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(6,182,212,0.65) 0%, transparent 70%)',
                    filter: 'blur(10px)',
                    animationDelay: `${index * 0.5}s`,
                  }}
                />

                {/* Pedestal ring */}
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 sm:w-28 lg:w-32 h-[8px] sm:h-[9px] lg:h-[10px] rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(6,182,212,0.22) 0%, rgba(6,182,212,0.04) 100%)',
                    border: '1px solid rgba(6,182,212,0.28)',
                  }}
                />

                {/* Image */}
                <div className="kb-img-wrap relative z-10">
                  <img
                    src={benefit.img}
                    alt={benefit.title}
                    draggable={false}
                    className="w-28 h-28 sm:w-36 sm:h-36 lg:w-48 lg:h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.55))' }}
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className="kb-font font-black uppercase tracking-tight text-white text-base sm:text-lg lg:text-[1.35rem] mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-cyan-400"
              >
                {benefit.title}
              </h3>

              {/* Accent line */}
              <div
                className="w-12 sm:w-14 h-[2px] mb-2 sm:mb-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)' }}
              />

              {/* Description */}
              <p className="kb-font text-white/55 text-xs sm:text-sm lg:text-[0.88rem] leading-relaxed max-w-[160px] sm:max-w-[180px] group-hover:text-white/80 transition-colors duration-300">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div id="Demo" className="relative z-10 left-1/2 mt-16 sm:mt-20 lg:mt-24 w-screen -translate-x-1/2 overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="block h-auto w-full"
          src="./Instagram_Reel_Format_A_man_in_a_gray_suit_and_blue_tie_walks_through_a_Z4Kca2zX.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      </div>
    </section>
  );
}
