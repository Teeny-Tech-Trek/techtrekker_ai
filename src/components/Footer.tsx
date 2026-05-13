// TechtrekkersFooter.tsx
// Dependencies: lucide-react, tailwindcss

import { Mail, Phone, MapPin, Shield } from "lucide-react";

const BoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);
const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-3 h-3 text-cyan-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-150">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SECTIONS = [
  { icon: <BoxIcon />, label: "PRODUCTS", links: ["Digital Twin", "Neo Scripting", "NexEstate AI"] },
  { icon: <UsersIcon />, label: "COMPANY", links: ["About", "Solutions", "Resources"] },
  { icon: <ShieldCheckIcon />, label: "LEGAL", links: ["Privacy Policy", "Terms of Service", "Security"] },
];

const CONTACTS = [
  { icon: <Mail className="w-[15px] h-[15px]" />, text: "hello@techtrekkers.ai", iconBg: "bg-cyan-400/10", iconColor: "text-cyan-400" },
  { icon: <Phone className="w-[15px] h-[15px]" />, text: "+1 (000) 000-0000", iconBg: "bg-purple-400/10", iconColor: "text-purple-400" },
  { icon: <MapPin className="w-[15px] h-[15px]" />, text: "Global AI Solutions", iconBg: "bg-blue-400/10", iconColor: "text-blue-400" },
];

export default function Footer() {
  return (
    <div className="bg-transparent">
      <footer id="Contact" className="w-full">
        <div
          className="relative overflow-hidden border-y border-[#1a2744]"
          style={{
            background: "rgba(10, 10, 20, 0.6)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 inset-x-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), rgba(139,92,246,0.4), transparent)" }}
          />

          {/* Torus */}
          <div className="absolute bottom-12 right-7 w-28 h-28 pointer-events-none opacity-80">
            <div
              className="w-full h-full rounded-full border-[13px]"
              style={{
                borderColor: "transparent",
                borderTopColor: "#7c3aed",
                borderRightColor: "#4f46e5",
                borderBottomColor: "#6d28d9",
                borderLeftColor: "#3730a3",
                transform: "rotate(-25deg) perspective(120px) rotateX(55deg)",
                boxShadow: "inset 0 0 20px rgba(139,92,246,0.3), 0 0 28px rgba(99,102,241,0.2)",
              }}
            />
          </div>

          {/* Floating dots */}
          <div className="absolute bottom-32 right-28 w-[6px] h-[6px] rounded-full bg-purple-500 opacity-70" />
          <div className="absolute bottom-48 right-44 w-1 h-1 rounded-full bg-cyan-400 opacity-40" />

          {/* Body */}
          <div className="px-6 py-12 pb-0 lg:px-16 grid grid-cols-[minmax(260px,360px)_1px_1fr] gap-x-10">

            {/* LEFT — Brand */}
            <div>
              <div className="flex items-center gap-3 mb-[18px]">
               
               
                <img src="/Logo.png" alt="Logo" width={40} />  
                

                <span className="text-white font-bold text-[22px] tracking-tight leading-none">
                  Techtrekkers<span className="text-cyan-400">.ai</span>
                </span>
              </div>

              <p className="text-[13.5px] text-[#6b8ab0] leading-[1.65] mb-6">
                AI products for teams that need reliable automation, intelligent agents, and always‑on customer workflows.
              </p>

              <ul className="flex flex-col gap-[10px]">
                {CONTACTS.map(({ icon, text, iconBg, iconColor }) => (
                  <li key={text} className="flex items-center gap-3 group cursor-pointer">
                    <div className={`w-8 h-8 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                      {icon}
                    </div>
                    <span className="text-[13px] text-[#6b8ab0] group-hover:text-white transition-colors duration-200">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vertical divider */}
            <div
              className="self-stretch"
              style={{ background: "linear-gradient(to bottom, transparent, #1a2744 20%, #1a2744 80%, transparent)" }}
            />

            {/* RIGHT — Links */}
            <div className="grid grid-cols-3 gap-x-4">
              {SECTIONS.map(({ icon, label, links }) => (
                <div key={label}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-purple-400 mb-4"
                    style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
                  >
                    {icon}
                  </div>
                  <p className="text-[11px] font-bold tracking-[0.13em] text-[#7c5cbf] uppercase mb-4">{label}</p>
                  <ul className="flex flex-col gap-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#" className="flex items-center gap-2 text-[13.5px] text-[#6b8ab0] hover:text-white transition-colors duration-200 group">
                          <ChevronRight />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mx-6 mt-8 border-t border-[#1a2744] py-[18px] flex items-center justify-between lg:mx-16">
            <div className="flex items-center gap-[10px] text-[13px] text-white/80">
              <Shield className="w-4 h-4 text-white/80" />
              <span>© 2026 Techtrekkers.ai. All rights reserved.</span>
            </div>
            <div className="flex gap-2">
              {[
                // { label: "X", icon: <XIcon /> },
                { label: "LinkedIn", icon: <LinkedInIcon /> },
                { label: "GitHub", icon: <span className="text-[11px] font-bold tracking-wide">GH</span> },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[#6b8ab0] hover:text-white transition-all duration-200 hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
