import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const BASE = import.meta.env.BASE_URL;
const chatbotsImg  = `${BASE}ai-chatbots.png`;
const automationImg = `${BASE}ai-automation.png`;
const mediaVideo   = `${BASE}ai-media.mp4`;

const ACCENT = "#E6F6C1";
const DARK   = "#151515";

const CASES = [
  {
    id: 0,
    service: "AI chatbots & Agents",
    title: "AI chatbots & Agents",
    type: "photo" as const,
    src: chatbotsImg,
    fit: "cover" as const,
    maxH: "62vh",
    description: [
      "Our AI solutions cover the full cycle of automation: from voice agents for calls to smart chatbots operating 24/7. They provide continuous customer support, instantly adapting to user requests.",
      "Through advanced language models, our agents effectively handle complex dialogues and provide accurate recommendations. This allows businesses to significantly optimize costs and response times.",
      "We create a personalized experience where the AI acts as a professional assistant always ready for dialogue. This transforms standard service into a highly efficient and accessible communication system.",
    ],
  },
  {
    id: 1,
    service: "Automations",
    title: "Automations",
    type: "photo" as const,
    src: automationImg,
    fit: "cover" as const,
    maxH: "62vh",
    description: [
      "We integrate your social media with existing CRM systems or build a custom solution tailored specifically to your needs, allowing you to manage sales from a single workspace.",
      "Our bots provide instant notifications for new leads, automatically updating your trackers. Beyond CRM, we automate broader business processes, including social media hosting and automated delivery of lead magnets via direct message.",
      "As we operate internationally, all our systems and interfaces are available in any language to best suit your team's requirements.",
    ],
  },
  {
    id: 2,
    service: "AI media generation",
    title: "AI media generation",
    type: "video" as const,
    src: mediaVideo,
    fit: "cover" as const,
    maxH: "62vh",
    description: [
      "We create professional content using cutting-edge media generation tools. Our capabilities include producing high-quality videos, generating realistic AI avatars, and providing professional voiceovers to give your content a unique and engaging tone.",
      "We also specialize in generating custom images and musical scores that perfectly align with your brand's identity. This enables the fast and efficient production of media content of any complexity for marketing campaigns or internal projects.",
    ],
  },
];

export default function AICasesPage() {
  const [, setLocation] = useLocation();
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = CASES[active];

  const toggleSound = () => {
    setMuted(m => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  return (
    <div className="min-h-screen w-full" style={{ background: "#f7f7f5", color: DARK }}>

      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-10 py-3 sm:py-4"
        style={{
          background: "rgba(247,247,245,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(21,21,21,0.08)",
        }}
      >
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-sm font-medium rounded-full px-4 sm:px-5 py-2 transition-all duration-200"
          style={{ color: "rgba(21,21,21,0.45)", background: "transparent", border: `1px solid ${ACCENT}`, cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = DARK; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(21,21,21,0.45)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Back
        </button>

        <div className="font-bold text-base sm:text-lg tracking-[0.2em]" style={{ color: DARK }}>MAGNICY</div>

        <button
          onClick={() => { sessionStorage.setItem("openContact", "1"); setLocation("/"); }}
          className="text-sm font-medium rounded-full px-4 sm:px-5 py-2 transition-all duration-200"
          style={{ background: ACCENT, color: DARK, border: `1px solid ${ACCENT}`, cursor: "pointer" }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(21,21,21,0.45)";
            e.currentTarget.style.borderColor = ACCENT;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = ACCENT;
            e.currentTarget.style.color = DARK;
            e.currentTarget.style.borderColor = ACCENT;
          }}
        >
          Contact us
        </button>
      </header>

      {/* Page content */}
      <div className="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20 max-w-[1400px] mx-auto">

        <h1
          className="font-bold mb-8 sm:mb-12 lg:mb-14"
          style={{ fontSize: "clamp(44px, 9vw, 110px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: DARK }}
        >
          CASES
        </h1>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-12 mb-8 md:mb-10 lg:mb-12">

          {/* Left — title + description */}
          <div className="w-full md:w-[40%] md:flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <h2
                  className="font-bold mb-4 sm:mb-6"
                  style={{ fontSize: "clamp(22px, 3.5vw, 48px)", letterSpacing: "-0.02em", color: DARK }}
                >
                  {current.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {current.description.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(21,21,21,0.50)" }}>
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
                  background: active === c.id ? "rgba(21,21,21,0.06)" : "rgba(21,21,21,0.03)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: active === c.id ? "1px solid rgba(21,21,21,0.28)" : "1px solid rgba(21,21,21,0.10)",
                  color: active === c.id ? DARK : "rgba(21,21,21,0.38)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  if (active !== c.id) {
                    e.currentTarget.style.color = "rgba(21,21,21,0.65)";
                    e.currentTarget.style.borderColor = "rgba(21,21,21,0.20)";
                  }
                }}
                onMouseLeave={e => {
                  if (active !== c.id) {
                    e.currentTarget.style.color = "rgba(21,21,21,0.38)";
                    e.currentTarget.style.borderColor = "rgba(21,21,21,0.10)";
                  }
                }}
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
            style={{ border: "1px solid rgba(21,21,21,0.08)", background: "rgba(21,21,21,0.04)", minHeight: 200 }}
          >
            {current.type === "video" ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  key={current.src}
                  src={current.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    display: "block",
                    maxHeight: current.maxH === "none" ? undefined : current.maxH,
                    objectFit: current.fit,
                  }}
                />
                {/* Sound toggle */}
                <button
                  onClick={toggleSound}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200"
                  style={{
                    background: "rgba(21,21,21,0.55)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: "#f5f5f5",
                    border: "1px solid rgba(255,255,255,0.18)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(21,21,21,0.80)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(21,21,21,0.55)"; }}
                >
                  {muted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                  {muted ? "Unmute" : "Mute"}
                </button>
              </div>
            ) : (
              <img
                src={current.src}
                alt={current.title}
                style={{
                  width: "100%",
                  display: "block",
                  maxHeight: current.maxH === "none" ? undefined : current.maxH,
                  objectFit: current.fit,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
