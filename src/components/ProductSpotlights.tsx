import { useState, useEffect, useRef } from "react";
import { PlayCircle, X, ChevronRight, User, Code2, Building2 } from "lucide-react";

import digitalTwinVideo from "../Images/Orion_ Digital Twin.mp4";
import realEstateVideo from "../Images/ai agent final animation video.mp4";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Product {
  id: string;
  title: string;
  img: string;
  accent: string;           // tailwind color name  e.g. "blue"
  accentHex: string;
  borderIdle: string;
  borderHover: string;
  glowClass: string;
  btnClass: string;
  iconBgClass: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  url: string;
  video: string | null;
}

/* ─────────────────────────────────────────────
   Product Data  — add your img paths here
───────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id: "digital-twin",
    title: "Digital Twin",
    img: "../../public/ProductspotlightsImages/ChatGPT Image Apr 24, 2026, 02_12_54 PM.png",                       // ← your image path
    accent: "blue",
    accentHex: "#3B82F6",
    borderIdle: "border-blue-500/20",
    borderHover: "hover:border-blue-500/60",
    glowClass: "group-hover:shadow-[0_28px_64px_rgba(59,130,246,0.20)]",
    btnClass: "bg-blue-600 hover:bg-blue-700 shadow-[0_4px_20px_rgba(59,130,246,0.4)]",
    iconBgClass: "bg-gradient-to-br from-blue-700 to-blue-500 shadow-[0_4px_18px_rgba(59,130,246,0.45)]",
    icon: <User className="w-5 h-5 text-white" strokeWidth={2.2} />,
    description:
      "Create an AI-Powered Digital Twin that represents you professionally. Your AI persona converses with clients 24/7, nurturing leads and answering questions when you're unavailable.",
    features: [
      "Personalized AI representation of your expertise",
      "Intelligent conversations that nurture relationships",
      "Never miss an opportunity while offline",
    ],
    url: "https://digitaltwin.techtrekkers.ai/",
    video: digitalTwinVideo,
  },
  {
    id: "neo-script",
    title: "Neo Script",
    img: "/ProductspotlightsImages/ChatGPT Image Apr 24, 2026, 02_14_41 PM.png",                       // ← your image path
    accent: "purple",
    accentHex: "#9333EA",
    borderIdle: "border-purple-500/20",
    borderHover: "hover:border-purple-500/60",
    glowClass: "group-hover:shadow-[0_28px_64px_rgba(147,51,234,0.20)]",
    btnClass: "bg-purple-600 hover:bg-purple-700 shadow-[0_4px_20px_rgba(147,51,234,0.4)]",
    iconBgClass: "bg-gradient-to-br from-purple-800 to-purple-500 shadow-[0_4px_18px_rgba(147,51,234,0.45)]",
    icon: <Code2 className="w-5 h-5 text-white" strokeWidth={2.2} />,
    description:
      "AI Automation Engine that creates, controls, and scales intelligent workflows with autonomous agents.",
    features: [
      "Create & automate complex workflows",
      "Autonomous AI agents that get things done",
      "Save time and scale your operations",
    ],
    url: "#",
    video: null,
  },
  {
    id: "nex-estate",
    title: "Nex Estate",
    img: "../../public/ProductspotlightsImages/ChatGPT Image Apr 24, 2026, 02_16_24 PM.png",                       // ← your image path
    accent: "teal",
    accentHex: "#0D9488",
    borderIdle: "border-teal-500/20",
    borderHover: "hover:border-teal-500/60",
    glowClass: "group-hover:shadow-[0_28px_64px_rgba(13,148,136,0.20)]",
    btnClass: "bg-teal-600 hover:bg-teal-700 shadow-[0_4px_20px_rgba(13,148,136,0.4)]",
    iconBgClass: "bg-gradient-to-br from-teal-700 to-teal-500 shadow-[0_4px_18px_rgba(13,148,136,0.45)]",
    icon: <Building2 className="w-5 h-5 text-white" strokeWidth={2.2} />,
    description:
      "AI Agents for Real Estate that work 24/7. Transform real estate sales with intelligent AI agents that automate lead capture, qualification, and act as your sales assistant.",
    features: [
      "Automated lead capture and qualification",
      "Schedule viewings and handle routine tasks",
      "Your AI sales assistant, not replacement",
    ],
    url: "https://estate.techtrekkers.ai/",
    video: realEstateVideo,
  },
];

/* ─────────────────────────────────────────────
   Check Icon (per-accent colour)
───────────────────────────────────────────── */
function CheckIcon({ hex }: { hex: string }) {
  return (
    <span
      className="flex-shrink-0 w-[19px] h-[19px] rounded-full flex items-center justify-center mt-[2px]"
      style={{ background: `${hex}22`, border: `1.5px solid ${hex}99` }}
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4l2.8 3L9 1" stroke={hex} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function ProductSpotlights() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [videoModal, setVideoModal] = useState<{ open: boolean; url: string; title: string }>({
    open: false,
    url: "",
    title: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const truncateText = (text, limit = 170) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
};

  /* mouse tracking */
  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* video helpers */
  const openModal = (url: string, title: string) => {
    setVideoModal({ open: true, url, title });
    setIsPlaying(false);
  };
  const closeModal = () => {
    setVideoModal({ open: false, url: "", title: "" });
    setIsPlaying(false);
    videoRef.current?.pause();
  };
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else           { videoRef.current.play();  setIsPlaying(true); }
  };
  useEffect(() => {
    if (videoModal.open && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [videoModal.open]);

  return (
    <section
      id="Product"
      className="relative overflow-hidden bg-[#020817] py-24 px-6 lg:px-16"
      style={{ background: "linear-gradient(180deg,#020817 0%,#07112e 45%,#020817 100%)" }}
    >
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes ps-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes ps-twinkle{0%,100%{opacity:.15}50%{opacity:.9}}
        @keyframes ps-pulse{0%,100%{opacity:.4}50%{opacity:.9}}
        @keyframes ps-fadeup{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ps-scalein{from{opacity:0;transform:scale(.93) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes ps-fadein{from{opacity:0}to{opacity:1}}
        .ps-font{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
        .ps-float{animation:ps-float 5s ease-in-out infinite}
        .ps-twinkle{animation:ps-twinkle ease-in-out infinite}
        .ps-pulse-anim{animation:ps-pulse 3s ease-in-out infinite}
        .ps-fadeup{animation:ps-fadeup .8s ease-out both}
        .ps-scalein{animation:ps-scalein .35s cubic-bezier(.34,1.56,.64,1) both}
        .ps-fadein{animation:ps-fadein .25s ease-out both}
        .ps-card{transition:transform .4s cubic-bezier(.34,1.56,.64,1),box-shadow .4s ease,border-color .3s ease}
        .ps-card:hover{transform:translateY(-10px) scale(1.012)}
        .ps-img{mix-blend-mode:lighten}
      `}</style>

      {/* ── Stars ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {mounted &&
          Array.from({ length: 70 }).map((_, i) => (
            <div
              key={i}
              className="ps-twinkle absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
      </div>

      {/* ── Mouse glow ── */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none z-0 transition-[left,top] duration-[900ms] ease-out"
        style={{
          background: "radial-gradient(circle,rgba(99,102,241,.09) 0%,transparent 70%)",
          left: mousePos.x - 350,
          top: mousePos.y - 350,
        }}
      />

      {/* ── Ambient blobs ── */}
      <div className="absolute top-[18%] left-[6%] w-72 h-72 rounded-full blur-[90px] bg-blue-500/[.05] pointer-events-none z-0" />
      <div className="absolute bottom-[18%] right-[6%] w-72 h-72 rounded-full blur-[90px] bg-purple-500/[.05] pointer-events-none z-0" />
      <div className="absolute top-[50%] left-[42%] w-60 h-60 rounded-full blur-[90px] bg-teal-500/[.05] pointer-events-none z-0" />

      {/* ══════════════════ CONTENT ══════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="ps-fadeup text-center mb-20" style={{ animationDelay: "0s" }}>
          {/* pill */}
          <div className="inline-flex items-center gap-2 px-5 py-[6px] rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="#818CF8">
              <path d="M5 0l1.12 3.45H9.76L6.82 5.59l1.12 3.45L5 7.05l-2.94 2 1.12-3.46L.24 3.45H3.88z" />
            </svg>
            <span className="ps-font text-[11px] font-bold tracking-[2px] uppercase text-indigo-400">
              Our Flagship Products
            </span>
          </div>

          {/* heading */}
          <h2 className="ps-font text-[clamp(34px,4.5vw,58px)] font-black leading-[1.08] tracking-tight text-white mb-5">
            Three Powerful AI Solutions,
            <br />
            <span
              className="ps-font"
              style={{
                background: "linear-gradient(90deg,#818CF8 0%,#A78BFA 45%,#38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Built for Your Success
            </span>
          </h2>

          <p className="text-white text-base  mx-auto leading-relaxed">
            Innovative AI-powered products designed to automate, engage,
            <br />
            and elevate your business to the next level.
          </p>
        </div>

        {/* ── Cards grid — extra pt so imgs don't clip ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-[90px]">
          {PRODUCTS.map((p, idx) => (
            <div
              key={p.id}
              className={`
                group ps-card ps-fadeup relative flex flex-col rounded-[20px] border
                ${p.borderIdle} ${p.borderHover} ${p.glowClass}
                bg-gradient-to-b from-[rgba(10,18,50,0.97)] to-[rgba(5,10,30,0.98)]
                overflow-visible
              `}
              style={{ animationDelay: `${0.12 * (idx + 1)}s` }}
            >
              {/* ── Floating image — overflows above card ── */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-[100px] w-[260px] h-[200px] flex items-end justify-center pointer-events-none z-10">
                {/* accent glow */}
                <div
                  className="ps-pulse-anim absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-40 h-12 rounded-full blur-[32px] transition-opacity duration-500 opacity-30 group-hover:opacity-60"
                  style={{ background: p.accentHex, animationDelay: `${idx * 0.8}s` }}
                />
                {/* image */}
                <div
                  className="ps-float w-full h-full flex items-end justify-center"
                  style={{ animationDelay: `${idx * 0.6}s` }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    draggable={false}
                    className="ps-img max-h-[190px] w-auto max-w-full object-contain"
                    style={{ filter: `drop-shadow(0 0 22px ${p.accentHex}88)` }}
                  />
                </div>
              </div>

              {/* ── Card body ── */}
              <div className="flex flex-col flex-1 px-6 pb-7 pt-[118px]">
                {/* top accent line */}
                <div
                  className="w-full h-px mb-5"
                  style={{ background: `linear-gradient(90deg,transparent,${p.accentHex}55,transparent)` }}
                />

                {/* icon + title */}
                <div className="flex items-center gap-[14px] mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${p.iconBgClass}`}>
                    {p.icon}
                  </div>
                  <h3 className="ps-font text-[22px] font-black text-white tracking-tight">
                    {p.title}
                  </h3>
                </div>

                {/* description */}
             <div className="flex flex-col h-full">
  
              <p className="text-white/80 text-[13.5px] leading-[1.75] mb-5 min-h-[80px]">
              {truncateText(p.description)}
            </p>

              <ul className="flex flex-col gap-[10px] mb-6 flex-1">
                {p.features.map((feat, fi) => (
                  <li key={fi} className="flex items-start gap-[10px] text-white text-[13.5px] cursor-pointer leading-snug hover:text-[14.5px] transition-colors duration-200">
                    <CheckIcon hex={p.accentHex} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

            </div>

                {/* CTA buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(p.url, "_blank")}
                    className={`
                      flex-1 flex items-center justify-center gap-[6px] py-[13px] px-4
                      rounded-xl text-white text-[13.5px] font-bold ps-font
                      transition-all duration-200 hover:brightness-110 hover:-translate-y-[2px] active:scale-[.98]
                      ${p.btnClass}
                    `}
                  >
                    Know More
                    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={() => p.video && openModal(p.video, `${p.title} Demo`)}
                    disabled={!p.video}
                    className={`
                      flex-1 flex items-center justify-center gap-[7px] py-[13px] px-4
                      rounded-xl text-white text-[13.5px] font-semibold ps-font
                      bg-white/[.06] border border-white/[.16]
                      transition-all duration-200 hover:bg-white/[.12] hover:-translate-y-[2px]
                      active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed
                    `}
                  >
                    <PlayCircle className="w-4 h-4" />
                    Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════ VIDEO MODAL ══════════════════ */}
      {videoModal.open && (
        <div
          className="ps-fadein fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/88 backdrop-blur-[14px]" />

          {/* glow */}
          <div className="ps-pulse-anim absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] bg-indigo-500/10 pointer-events-none" />

          <div
            className="ps-scalein relative w-full max-w-[820px] rounded-[20px] overflow-hidden border border-indigo-500/35 shadow-[0_24px_80px_rgba(99,102,241,0.22)]"
            style={{ background: "linear-gradient(145deg,rgba(10,18,50,.99),rgba(5,10,30,.99))" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[.08] bg-gradient-to-r from-blue-600/20 to-indigo-500/15">
              <div className="flex items-center gap-[10px]">
                <div className="ps-pulse-anim w-2 h-2 rounded-full bg-indigo-400" />
                <span className="ps-font font-bold text-[15px] text-white">{videoModal.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/35 text-xs">Now Playing</span>
                <button
                  onClick={closeModal}
                  className="w-[30px] h-[30px] rounded-lg flex items-center justify-center bg-white/[.08] hover:bg-red-500/80 text-white transition-colors duration-200"
                >
                  <X className="w-[15px] h-[15px]" />
                </button>
              </div>
            </div>

            {/* video */}
            <div className="relative bg-black aspect-video">
              <video
                ref={videoRef}
                src={videoModal.url}
                className="w-full h-full object-contain block"
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 cursor-pointer transition-colors duration-200"
                >
                  <div className="w-[72px] h-[72px] rounded-full bg-white/90 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,.25)]">
                    <PlayCircle className="w-10 h-10 text-blue-700" strokeWidth={2} />
                  </div>
                </div>
              )}
            </div>

            {/* controls */}
            <div
              className="flex items-center justify-between px-6 py-[14px] border-t border-white/[.06]"
              style={{ background: "rgba(5,10,30,.95)" }}
            >
              <button
                onClick={togglePlay}
                className="flex items-center gap-[7px] px-5 py-[9px] rounded-[10px] text-white text-[13px] font-bold ps-font bg-gradient-to-r from-blue-600 to-indigo-500 hover:brightness-110 transition-all duration-200"
              >
                {isPlaying ? (
                  <>
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="white">
                      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                    </svg>
                    Pause
                  </>
                ) : (
                  <><PlayCircle className="w-[14px] h-[14px]" /> Play</>
                )}
              </button>
              <button
                onClick={closeModal}
                className="flex items-center px-5 py-[9px] rounded-[10px] text-white text-[13px] font-semibold ps-font bg-white/[.07] border border-white/[.13] hover:bg-white/[.14] transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductSpotlights;
