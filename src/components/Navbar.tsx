import { useState, useEffect } from "react";

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TechtrekkersLogo = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M4 8 L16 4 L28 8 L28 16 L16 28 L4 16 Z" fill="url(#logoGrad)" />
    <path d="M10 14 L16 10 L22 14 L22 20 L16 24 L10 20 Z" fill="rgba(255,255,255,0.15)" />
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
    </defs>
  </svg>
);

const productLinks = [
  { label: "Digital Twin", target: "Product" },
  { label: "Neo Scripting", target: "Product" },
  { label: "Nex Estate AI", target: "Product" },
];

const navLinks = [
  { label: "Home", target: "Home" },
  { label: "Products", target: "Product", hasDropdown: true },
  { label: "Why Us", target: "Benefits" },
  { label: "Demo Video", target: "Demo" },
  { label: "Contact", target: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (target: string) => {
    const section = document.getElementById(target);
    if (!section) return;

    const navOffset = 72;
    const top = section.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10, 10, 20, 0.6)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
      }}
    >
      <div className="mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToSection("Home")}
          className="flex items-center gap-2 select-none"
        >
          <img src="/Logo.png" alt="logo" width={40} />
          <span
            className="text-white font-semibold text-2xl"
            style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", letterSpacing: "-0.01em" }}
          >
            Techtrekkers
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              <button
                type="button"
                className="flex items-center gap-1 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-150 rounded-lg hover:bg-white/5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => scrollToSection(link.target)}
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.label}
                {link.hasDropdown && (
                  <span className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`}>
                    <ChevronDown />
                  </span>
                )}
              </button>

              {link.hasDropdown && activeDropdown === link.label && (
                <div
                  className="absolute top-full left-0 mt-2 w-52 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "rgba(15, 15, 28, 0.92)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {productLinks.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => scrollToSection(item.target)}
                      className="block w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={() => scrollToSection("Contact")}
            className="px-5 py-2 text-sm font-medium text-white rounded-full transition-all duration-200"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => { (e.currentTarget).style.background = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={(e) => { (e.currentTarget).style.background = "rgba(255,255,255,0.08)"; }}
          >
            Book a Demo
          </button>
        </div>

        {/* Mobile Hamburger — only on mobile */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4"
          style={{
            background: "rgba(10, 10, 20, 0.92)",
            backdropFilter: "blur(18px)",
          }}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollToSection(link.target)}
                className="flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown />}
              </button>
            ))}
            <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                type="button"
                onClick={() => scrollToSection("Contact")}
                className="w-full px-5 py-2.5 text-sm font-medium text-white rounded-full"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
