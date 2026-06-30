import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const BASE = import.meta.env.BASE_URL;
const noorVideo     = `${BASE}noor-video.mp4`;
const harmoniaPhoto = `${BASE}harmonia-photo.png`;
const arctaPhoto    = `${BASE}arcta-photo.png`;

const CASES = [
  {
    id: 0,
    service: "Websites & Landing pages",
    title: "NOOR",
    type: "video" as const,
    src: noorVideo,
    fit: "contain" as const,
    maxH: "none",
    description: [
      "The NOOR Void Pro 01 landing page features interactive 3D storytelling, centered on a detailed headphone model. This approach highlights the product's technology while immersing users in a premium sound experience.",
      "The design utilizes a frosted glass effect for depth and a modern aesthetic. A sophisticated pastel purple serves as the sole accent, drawing attention to key details against a clean, minimalist backdrop.",
      "This structure ensures a cohesive and intuitive user experience. The minimalist layout keeps the focus strictly on the product, delivering a refined and memorable impression.",
    ],
  },
  {
    id: 1,
    service: "Brand identity & Logo design",
    title: "Harmonia",
    type: "photo" as const,
    src: harmoniaPhoto,
    fit: "contain" as const,
    maxH: "none",
    description: [
      "Harmonia's visual style relies on elegant typography and a natural palette to evoke a sense of peace. This combination creates an atmosphere of sophistication and trust.",
      "The lotus-shaped logo embodies a philosophy of harmony and integrity. Its minimalist design ensures the brand remains aesthetic and recognizable.",
      "A clear system of instructions for typography and colors guarantees brand consistency. This ensures professional communication across all media.",
    ],
  },
  {
    id: 2,
    service: "UI/UX & Product design",
    title: "Arcta",
    type: "photo" as const,
    src: arctaPhoto,
    fit: "cover" as const,
    maxH: "62vh",
    description: [
      "Arcta's design embodies arctic purity through clear bottles and iceberg-shaped labels. This minimalist approach highlights the product's natural origin.",
      "The contrast between smooth glass and textured labels creates a distinct look. It stands out on the shelf while conveying the story of Norwegian glaciers.",
      "Color coding allows for easy flavor differentiation. Sophisticated typography completes the brand's modern aesthetic.",
    ],
  },
];

const ACCENT = "#E6F6C1";

export default function DesignCasesPage() {
  const [, setLocation] = useLocation();
  const [active, setActive] = useState(0);
  const current = CASES[active];

  return (
    <div className="min-h-screen w-full" style={{ background: "#151515", color: "#f5f5f5" }}>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-10 py-3 sm:py-4"
        style={{ background: "rgba(21,21,21,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-sm font-medium rounded-full px-4 sm:px-5 py-2 transition-all duration-200"
          style={{ color: "rgba(245,245,245,0.55)", background: "transparent", border: `1px solid ${ACCENT}`, cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#151515"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(245,245,245,0.55)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Back
        </button>

        <div className="font-bold text-base sm:text-lg tracking-[0.2em]">MAGNICY</div>

        <button
          onClick={() => { sessionStorage.setItem("openContact", "1"); setLocation("/"); }}
          className="text-sm font-medium rounded-full px-4 sm:px-5 py-2 transition-all duration-200"
          style={{ background: ACCENT, color: "#151515", border: `1px solid ${ACCENT}`, cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(245,245,245,0.55)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#151515"; }}
        >
          Contact us
        </button>
      </header>

      {/* Page content */}
      <div className="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20 max-w-[1400px] mx-auto">

        {/* CASES heading */}
        <h1 className="font-bold mb-8 sm:mb-12 lg:mb-14"
          style={{ fontSize: "clamp(44px, 9vw, 110px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
          CASES
        </h1>

        {/* Two-column: left = text, right = buttons — stacks on mobile */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-12 mb-8 md:mb-10 lg:mb-12">

          {/* Left — case title + description */}
          <div className="w-full md:w-[40%] md:flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <h2 className="font-bold mb-4 sm:mb-6"
                  style={{ fontSize: "clamp(22px, 3.5vw, 48px)", letterSpacing: "-0.02em" }}>
                  {current.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {current.description.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(245,245,245,0.55)" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — service buttons */}
          <div className="flex-1 flex flex-col gap-3">
            {CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className="w-full text-center rounded-2xl text-sm font-semibold py-4 sm:py-5 px-6 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: active === c.id ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.12)",
                  color: active === c.id ? "#f5f5f5" : "rgba(245,245,245,0.38)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => { if (active !== c.id) { e.currentTarget.style.color = "rgba(245,245,245,0.65)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; } }}
                onMouseLeave={e => { if (active !== c.id) { e.currentTarget.style.color = "rgba(245,245,245,0.38)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; } }}
              >
                {c.service}
              </button>
            ))}
          </div>
        </div>

        {/* Full-width media */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "#1e1e1e", minHeight: 200 }}
          >
            {current.type === "video" ? (
              <video
                key={current.src}
                src={current.src}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", display: "block", maxHeight: current.maxH === "none" ? undefined : current.maxH, objectFit: current.fit }}
              />
            ) : (
              <img
                src={current.src}
                alt={current.title}
                style={{ width: "100%", display: "block", maxHeight: current.maxH === "none" ? undefined : current.maxH, objectFit: current.fit }}
              />
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
