// TechtrekkersFooter.tsx
// Dependencies: lucide-react, tailwindcss

import { ArrowRight, Sparkles } from "lucide-react";

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-3 h-3 text-cyan-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-150">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const PRODUCTS = [
  { name: "Net Twin", url: "https://nettwin.techtrekkers.ai/" },
  { name: "Neo Scripting", url: "https://neoscript.techtrekkers.ai/" },
  { name: "Nex Estate", url: "https://nexestate.techtrekkers.ai/" },
];

// const SOCIALS = [
//   { label: "LinkedIn", icon: <LinkedInIcon />, href: "#" },
//   { label: "X", icon: <XIcon />, href: "#" },
//   { label: "GitHub", icon: <GithubIcon />, href: "#" },
// ];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToProducts = () => {
    const section = document.getElementById("Product");
    if (!section) return;
    const navOffset = 72;
    const top = section.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <footer id="Contact" className="relative w-full overflow-hidden">
      {/* Top gradient glow line */}
      <div
        className="absolute top-0 inset-x-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), rgba(139,92,246,0.5), rgba(56,189,248,0.5), transparent)" }}
      />

      {/* Background */}
      <div
        className="absolute inset-0 -z-0"
        style={{
          background: "linear-gradient(180deg, rgba(7,17,46,0.55) 0%, rgba(2,8,23,0.85) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-0 left-[10%] w-72 h-72 rounded-full blur-[100px] bg-cyan-500/[.06] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-80 h-80 rounded-full blur-[100px] bg-purple-500/[.06] pointer-events-none" />

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-6 lg:px-16 xl:px-20 pt-14 sm:pt-16 lg:pt-20 pb-6">

        {/* ═══ CTA STRIP ═══ */}
        

        {/* ═══ MAIN BODY — 3 cols on desktop ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] gap-10 lg:gap-12 xl:gap-16 pb-10 sm:pb-12">

          {/* COL 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/Logo.png" alt="Logo" className="w-10 sm:w-11" />
              <span className="text-white font-bold text-xl sm:text-[24px] tracking-tight leading-none">
                Techtrekkers<span className="text-cyan-400">.ai</span>
              </span>
            </div>

            <p className="text-[13.5px] sm:text-[14px] text-white/60 leading-[1.7] mb-6 max-w-md">
              AI products for teams that need reliable automation, intelligent agents, and always‑on customer workflows. Built for scale, designed for humans.
            </p>

            {/* Social */}
            {/* <div className="flex gap-2.5">
              {SOCIALS.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* COL 2 — Products */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-cyan-300/80 mb-5 sm:mb-6">
              Products
            </p>
            <ul className="flex flex-col gap-3 sm:gap-3.5">
              {PRODUCTS.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[14px] text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <ChevronRight />
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Ready-to-Begin CTA Card */}
          <div className="md:col-span-2 lg:col-span-1">
            <div
              className="relative overflow-hidden rounded-2xl p-6 sm:p-7 border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(15,20,40,0.85) 0%, rgba(20,15,45,0.85) 100%)",
              }}
            >
              {/* glow blob behind card */}
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-[60px] bg-cyan-400/20 pointer-events-none" />
              <div className="absolute -bottom-16 -left-12 w-44 h-44 rounded-full blur-[60px] bg-purple-500/20 pointer-events-none" />

              {/* Heading row */}
              <div className="relative flex items-center gap-2 mb-3">
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-md"
                  style={{ background: "rgba(56,189,248,0.15)" }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                </span>
                <h4 className="text-white font-bold text-[17px] sm:text-[18px] tracking-tight">
                  Ready to begin?
                </h4>
              </div>

              {/* Description */}
              <p className="relative text-[13.5px] text-white/65 leading-[1.65] mb-5 sm:mb-6">
                Start building your AI-powered ecosystem and make every workflow smarter, faster, and effortless.
              </p>

              {/* Get Started Button — scrolls to ProductSpotlights */}
              <button
                type="button"
                onClick={scrollToProducts}
                className="relative group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-white text-[13.5px] font-bold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-cyan-500/40"
                style={{
                  background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%)",
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM BAR ═══ */}
        <div
          className="border-t border-white/[.06] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-[12.5px] text-white/45">
            © 2026 <span className="text-white/65 font-semibold">Techtrekkers.ai</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-5">
            {/* <a href="#" className="text-[12.5px] text-white/45 hover:text-white/85 transition-colors">Privacy</a>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <a href="#" className="text-[12.5px] text-white/45 hover:text-white/85 transition-colors">Terms</a>
            <span className="w-1 h-1 rounded-full bg-white/15" /> */}
            <button
              onClick={scrollToTop}
              className="text-[12.5px] text-white/45 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              Back to top
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
