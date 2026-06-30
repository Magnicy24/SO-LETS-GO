import { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollVideo, type TimeMapEntry } from "@/hooks/useScrollVideo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const videoSrc = `${import.meta.env.BASE_URL}hero-bg.mp4`;

const TOTAL_VIDEO_TIME = 17.73;

/**
 * Scroll-to-time keypoint map.
 * Each entry: [scrollFraction 0–1, videoTime in seconds]
 * Segments between keypoints are linearly interpolated.
 *
 * Page structure (desktop):
 *   0–13% scroll  → Hero section        → 0–3.70 s
 *   13–23% scroll → About Us section    → 3.70–4.20 s  ← USER SPEC
 *   23–100% scroll → rest of page       → 4.20–17.73 s
 */
const SCROLL_TIME_MAP: TimeMapEntry[] = [
  [0,    0     ],   // top of page
  [0.13, 3.80  ],   // About Us enters viewport
  [0.23, 4.30  ],   // About Us exits viewport
  [1,    17.73 ],   // bottom of page
];

const FAQ_DATA = [
  { q: "How long does a project take?", a: "Projects typically take from 2 days up to 4 weeks, depending entirely on the specific task and its complexity." },
  { q: "How much does it cost?", a: "Pricing is calculated individually, based on the complexity and scope of your specific request." },
  { q: "Is my business data private when using AI solutions?", a: "Absolutely. We work under strict confidentiality agreements and never share or use your data outside the scope of your project." },
  { q: "What AI tools do you use?", a: "We utilize 10+ types of AI for various kinds of tasks, selecting the best technology for each specific case." },
  { q: "Do you work internationally?", a: "Sure, we work with clients worldwide through a seamless remote collaboration workflow." },
];

const NAV_ITEMS = [
  { label: "Home",     id: "hero"     },
  { label: "About Us", id: "about"    },
  { label: "Benefits", id: "benefits" },
  { label: "Services", id: "services" },
  { label: "Cases",    id: "cases"    },
  { label: "Reviews",  id: "reviews"  },
  { label: "FAQ",      id: "faq"      },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="text-white/40 hover:text-white/80 transition-colors">
      {children}
    </a>
  );
}

const IconInstagram = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconTikTok = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z"/>
  </svg>
);
const IconTelegram = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/magnicy.agency?igsh=Nnd0eWpmaHcxcGRz&utm_source=qr", label: "Instagram", Icon: IconInstagram },
  { href: "https://www.tiktok.com/@magnicy_agency?_r=1&_t=ZN-97e79eesFHO",                                        label: "TikTok",    Icon: IconTikTok    },
  { href: "https://t.me/magnicy_agency",                                                   label: "Telegram",  Icon: IconTelegram  },
  { href: "https://wa.me/48725381073",                                                     label: "WhatsApp",  Icon: IconWhatsApp  },
];

const REVIEWS = [
  "We ordered app design and a landing page for our product, and got everything done quickly at a consistently high level of quality. The team captured the essence of our brand from the very first brief, with almost no revisions needed.",
  "We were just launching our startup, so we got the logo with brand book and wireframes for our future website from Magnicy at once, which saved us a lot of time on coordinating different contractors. Very happy with the result.",
  "We ordered UX research before a redesign and got a clear report with real insights, not just a nice-looking presentation. It helped us make several important product decisions.",
  "They set up a voice agent for handling calls and a chatbot for customer support, both have been running stably for several months now. The load on our support team has noticeably decreased.",
  "We reached out to set up a CRM and connect it to TikTok for handling leads, as well as build a bot that reports daily on managers' performance. Everything worked smoothly from the start, and now we have a full real-time picture of leads and team workload.",
  "We tested video and image generation for our ad campaigns, and the content quality pleasantly surprised us, while the production speed helped us hit our deadlines. We're now planning ongoing collaboration.",
];

function StarRow() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function useVisibleCount() {
  const [visible, setVisible] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3
      : 3
  );
  useEffect(() => {
    const update = () => {
      setVisible(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return visible;
}

function ReviewsCarousel({ glassPanel }: { glassPanel: string }) {
  const visible = useVisibleCount();
  const maxIdx = REVIEWS.length - visible;
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stepPx, setStepPx] = useState(0);
  const GAP = 16;

  // Measure one card's width + gap whenever container or visible count changes
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setStepPx((w - GAP * (visible - 1)) / visible + GAP);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [visible]);

  // Clamp idx when visible changes (e.g. on rotate)
  useEffect(() => {
    setIdx(i => Math.min(i, Math.max(0, REVIEWS.length - visible)));
  }, [visible]);

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(maxIdx, i + 1));

  const cardWidth = stepPx > 0
    ? (containerRef.current?.offsetWidth ?? 0) / visible - GAP * (visible - 1) / visible
    : undefined;

  return (
    <div className="w-full" ref={containerRef}>
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: -(idx * stepPx) }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ gap: GAP }}
        >
          {REVIEWS.map((text, i) => (
            <div
              key={i}
              className={`${glassPanel} flex-shrink-0 flex flex-col gap-6 rounded-2xl p-6 sm:p-8`}
              style={{
                width: cardWidth ?? `calc(${100 / visible}% - ${GAP * (visible - 1) / visible}px)`,
                minHeight: "180px",
              }}
            >
              <p className="font-light leading-relaxed text-sm sm:text-base opacity-90 flex-1">"{text}"</p>
              <StarRow />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-end gap-2 mt-5">
        {([
          { fn: prev, d: "M15 18l-6-6 6-6", label: "Previous", disabled: idx === 0 },
          { fn: next, d: "M9 18l6-6-6-6",   label: "Next",     disabled: idx >= maxIdx },
        ] as const).map(({ fn, d, label, disabled }) => (
          <button key={label} onClick={fn} disabled={disabled} aria-label={label}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              border: "1px solid rgba(128,128,128,0.35)",
              background: "transparent",
              opacity: disabled ? 0.3 : 1,
              cursor: disabled ? "default" : "pointer",
            }}
            onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "rgba(128,128,128,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={d} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const prevLight = useRef<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactEmailError, setContactEmailError] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [contactConsentError, setContactConsentError] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");
  const [contactErrorMsg, setContactErrorMsg] = useState("");
  const [textColor, setTextColor] = useState<"text-[#f5f5f5]" | "text-[#151515]">("text-[#f5f5f5]");

  function openContact() {
    setContactOpen(true);
    setContactEmail(""); setContactEmailError("");
    setContactConsent(false); setContactConsentError(false);
    setContactStatus("idle"); setContactErrorMsg("");
  }
  function closeContact() { setContactOpen(false); }

  useEffect(() => {
    if (sessionStorage.getItem("openContact") === "1") {
      sessionStorage.removeItem("openContact");
      openContact();
    }
  }, []);

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;
    if (!emailRegex.test(contactEmail)) {
      setContactEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (!contactConsent) {
      setContactConsentError(true);
      valid = false;
    }
    if (!valid) return;
    setContactEmailError("");
    setContactConsentError(false);
    setContactLoading(true);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: contactEmail, consent: contactConsent, _hp: "" }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setContactStatus("success");
        setTimeout(() => closeContact(), 3000);
      } else {
        setContactStatus("error");
        setContactErrorMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setContactStatus("error");
      setContactErrorMsg("Network error. Please try again.");
    } finally {
      setContactLoading(false);
    }
  }

  const videoRef = useScrollVideo(TOTAL_VIDEO_TIME, SCROLL_TIME_MAP);

  useEffect(() => {
    const applyTextColor = (t: number) => {
      const light = t >= 1.5 && t < 16;
      if (light !== (prevLight.current === true)) {
        prevLight.current = light;
        setTextColor(light ? "text-[#151515]" : "text-[#f5f5f5]");
      }
    };

    const onScroll = () => {
      const video = videoRef.current;
      if (!video) return;
      applyTextColor(video.currentTime);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [videoRef]);

  const glassPanel = textColor === "text-[#151515]" ? "glass-panel" : "glass-panel-dark";

  return (
    <div className={`relative w-full ${textColor} transition-colors duration-500`}>

      <video
        ref={videoRef}
        src={videoSrc}
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        preload="auto"
        muted
        playsInline
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: "#F5F5F5" }}
            onClick={() => setMenuOpen(false)}
          >
            <button
              onClick={e => { e.stopPropagation(); setMenuOpen(false); }}
              className="absolute top-6 right-5 sm:right-10 text-3xl font-light transition-colors duration-200"
              style={{ color: "#151515" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#9ca3af"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#151515"; }}
              aria-label="Close menu"
            >✕</button>

            <nav className="flex flex-col justify-center h-full px-6 sm:px-16 lg:px-[80px] gap-3 sm:gap-5 py-24" onClick={e => e.stopPropagation()}>
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.3, ease: "easeOut" }}
                  onClick={() => { setMenuOpen(false); scrollToSection(item.id); }}
                  className="text-left text-gray-400 hover:text-[#151515] transition-colors font-medium w-fit"
                  style={{ fontSize: "clamp(1.6rem, 4.6vw, 3.9rem)" }}
                >{item.label}</motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 + 0.2, duration: 0.3 }}
                className="flex items-center gap-5 pt-6"
              >
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="text-gray-400 hover:text-[#151515] transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    <Icon />
                  </a>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contactOpen && (
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: "#F5F5F5" }}
            onClick={closeContact}
          >
            <button
              onClick={e => { e.stopPropagation(); closeContact(); }}
              className="absolute top-6 right-5 sm:right-10 text-3xl font-light transition-colors duration-200"
              style={{ color: "#151515" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#9ca3af"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#151515"; }}
              aria-label="Close contact"
            >✕</button>

            <div className="flex flex-col justify-center h-full px-6 sm:px-16 lg:px-[80px] py-24" onClick={e => e.stopPropagation()}>
              {contactStatus === "success" ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <h2 className="font-medium" style={{ color: "#151515", fontSize: "clamp(1.6rem, 4.6vw, 3.9rem)" }}>
                    Thank you!
                  </h2>
                  <p style={{ color: "#9ca3af", fontSize: "clamp(1rem, 2vw, 1.5rem)" }}>
                    We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-6 sm:space-y-8 max-w-xl">
                  <motion.h2
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05, duration: 0.3, ease: "easeOut" }}
                    className="font-medium"
                    style={{ color: "#151515", fontSize: "clamp(1.6rem, 4.6vw, 3.9rem)" }}
                  >
                    Leave your email. We will contact you
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                    className="space-y-2"
                  >
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={e => { setContactEmail(e.target.value); if (contactEmailError) setContactEmailError(""); }}
                      placeholder="your@email.com"
                      className="w-full bg-transparent border-b-2 outline-none pb-3 transition-colors placeholder:text-gray-300"
                      style={{
                        color: "#151515",
                        borderColor: contactEmailError ? "#ef4444" : "#9ca3af",
                        fontSize: "clamp(1rem, 2vw, 1.4rem)",
                      }}
                      disabled={contactLoading}
                      autoFocus
                    />
                    {contactEmailError && (
                      <p className="text-red-500 text-sm">{contactEmailError}</p>
                    )}
                  </motion.div>

                  {/* Consent checkbox */}
                  <motion.label
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.13, duration: 0.3, ease: "easeOut" }}
                    className="flex items-start gap-3 cursor-pointer select-none"
                  >
                    <div className="relative mt-[3px] flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={contactConsent}
                        onChange={e => { setContactConsent(e.target.checked); if (contactConsentError) setContactConsentError(false); }}
                        disabled={contactLoading}
                        className="sr-only"
                      />
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center transition-colors"
                        style={{
                          border: `2px solid ${contactConsentError ? "#ef4444" : contactConsent ? "#151515" : "#9ca3af"}`,
                          background: contactConsent ? "#151515" : "transparent",
                        }}
                      >
                        {contactConsent && (
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M1 4L4 7.5L10 1" stroke="#E6F6C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: contactConsentError ? "#ef4444" : "#9ca3af" }}>
                      I agree to be contacted regarding my inquiry
                    </span>
                  </motion.label>

                  {/* honeypot */}
                  <input type="text" name="_hp" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                  {contactStatus === "error" && (
                    <p className="text-red-500 text-sm">{contactErrorMsg}</p>
                  )}

                  <motion.button
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
                    type="submit"
                    disabled={contactLoading}
                    className="font-medium px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2"
                    style={{ background: "#E6F6C1", color: "#151515", border: "1px solid #E6F6C1", opacity: contactLoading ? 0.7 : 1 }}
                    onMouseEnter={e => { if (!contactLoading) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "#E6F6C1"; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#E6F6C1"; e.currentTarget.style.color = "#151515"; e.currentTarget.style.borderColor = "#E6F6C1"; }}
                  >
                    {contactLoading && (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                    )}
                    {contactLoading ? "Sending…" : "Send"}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-[40px] py-3 flex justify-between items-center transition-colors duration-500 ${textColor}`}
        style={{ background: "transparent", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      >
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="font-medium px-4 sm:px-6 py-2 rounded-full transition-all duration-300 bg-transparent text-sm sm:text-base"
          style={{ border: "1px solid #E6F6C1", color: "#9ca3af" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#E6F6C1"; e.currentTarget.style.color = "#151515"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
        >Menu</button>

        <div className="font-bold text-base sm:text-xl tracking-[0.2em] uppercase">MAGNICY</div>

        <button
          onClick={openContact}
          className="font-medium px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base"
          style={{ background: "#E6F6C1", color: "#151515", border: "1px solid #E6F6C1" }}
          onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "#E6F6C1"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#E6F6C1"; e.currentTarget.style.color = "#151515"; e.currentTarget.style.borderColor = "#E6F6C1"; }}
        >Contact us</button>
      </header>

      <div className="relative z-10">

        {/* HERO */}
        <section id="hero" className="relative h-[100vh] w-full pointer-events-none">
          <div className="absolute bottom-6 sm:bottom-[40px] left-4 sm:left-[40px] text-gray-400 font-medium tracking-wide text-sm sm:text-base" style={{ fontSize: "clamp(13px, 2vw, 18px)" }}>
            Digital agency
          </div>
          <div className="absolute bottom-6 sm:bottom-[40px] right-4 sm:right-[40px] text-gray-400 font-medium tracking-wide text-right text-sm sm:text-base" style={{ fontSize: "clamp(13px, 2vw, 18px)" }}>
            Where design meets intelligence
          </div>
        </section>

        <div className="h-[15vh] sm:h-[25vh] lg:h-[30vh]" />

        {/* ABOUT US */}
        <section id="about" className="relative min-h-[100vh] w-full px-4 sm:px-8 lg:px-[40px] py-16 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full md:w-[75%] lg:w-[60%] space-y-6 sm:space-y-8"
          >
            <h2 className="font-bold tracking-widest uppercase text-gray-400" style={{ fontSize: "clamp(11px, 1.5vw, 21px)" }}>About Us</h2>
            <p className="font-medium leading-tight" style={{ fontSize: "clamp(1.28rem, 2.73vw, 2.83rem)" }}>
              We are a digital agency at the intersection of design and AI, building systems that deliver real business results. By combining deep UX research, product design, and custom AI development, we create smarter digital ecosystems where every element works as part of a single, integrated mechanism.
            </p>
          </motion.div>
        </section>

        <div className="h-[20vh] sm:h-[35vh] lg:h-[50vh]" />

        {/* BENEFITS */}
        <section id="benefits" className="relative min-h-[100vh] w-full px-4 sm:px-8 lg:px-[40px] py-16 flex flex-col justify-center">
          <h2 className="font-bold tracking-widest uppercase mb-8 sm:mb-12 text-gray-400" style={{ fontSize: "clamp(11px, 1.5vw, 21px)" }}>Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { metric: "−60%", label: "Routine",          desc: "We automate your repetitive operations and customer support with AI, saving your team hours of manual work." },
              { metric: "+70%", label: "Engagement",       desc: "Our custom, conversion-focused UI/UX design directly increases user interaction and lowers website bounce rates." },
              { metric: "24/7", label: "Availability",     desc: "AI-powered assistants handle your inquiries and qualify leads instantly, even while your team is asleep." },
              { metric: "100%", label: "Unique Visuals",   desc: "We craft bespoke digital identities from scratch, making sure your brand completely stands out from competitors." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
                className={`${glassPanel} p-6 sm:p-8 min-h-[220px] sm:min-h-[300px] flex flex-col justify-between`}
              >
                <div className="font-bold leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>{item.metric}</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.label}</h3>
                  <p className="opacity-80 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-[20vh] sm:h-[35vh] lg:h-[50vh]" />

        {/* SERVICES */}
        <section id="services" className="relative min-h-[100vh] w-full px-4 sm:px-8 lg:px-[40px] py-16 flex flex-col justify-center">
          <h2 className="font-bold tracking-widest uppercase mb-8 sm:mb-12 text-gray-400" style={{ fontSize: "clamp(11px, 1.5vw, 21px)" }}>Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={`${glassPanel} p-8 sm:p-10 lg:p-12 cursor-pointer group hover:scale-[1.02] transition-transform`}
              >
                <h3 className="font-semibold" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}>Design</h3>
              </motion.div>
              <div className="flex flex-col gap-2 sm:gap-3">
                {["UI/UX & Product design", "Websites & Landing pages", "Brand identity & Logo design", "Wireframing", "UX research"].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.38, ease: "easeOut", delay: idx * 0.05 }}
                    className={`${glassPanel} p-3 sm:p-4 text-sm font-medium`}
                  >{item}</motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={`${glassPanel} p-8 sm:p-10 lg:p-12 cursor-pointer group hover:scale-[1.02] transition-transform`}
              >
                <h3 className="font-semibold" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}>AI</h3>
              </motion.div>
              <div className="flex flex-col gap-2 sm:gap-3">
                {["AI voice agents", "AI chatbots & Agents", "Workflow automation", "Custom development", "AI media generation"].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.38, ease: "easeOut", delay: idx * 0.05 }}
                    className={`${glassPanel} p-3 sm:p-4 text-sm font-medium`}
                  >{item}</motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="h-[20vh] sm:h-[35vh] lg:h-[50vh]" />

        {/* CASES */}
        <section id="cases" className="relative min-h-[100vh] w-full px-4 sm:px-8 lg:px-[40px] py-16 flex flex-col justify-center">
          <h2 className="font-bold tracking-widest uppercase mb-8 sm:mb-12 text-gray-400" style={{ fontSize: "clamp(11px, 1.5vw, 21px)" }}>Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { label: "Design", path: "/design" },
              { label: "AI",     path: "/ai"     },
            ].map(({ label, path }, i) => (
              <motion.button
                key={label}
                onClick={() => setLocation(path)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.42, ease: "easeOut", delay: i * 0.08 }}
                className={`${glassPanel} p-8 sm:p-10 min-h-[180px] sm:min-h-[280px] flex items-end cursor-pointer hover:scale-[1.02] transition-transform text-left`}
              >
                <h3 className="font-semibold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{label}</h3>
              </motion.button>
            ))}
          </div>
        </section>

        <div className="h-[20vh] sm:h-[35vh] lg:h-[50vh]" />

        {/* REVIEWS */}
        <section id="reviews" className="relative min-h-[100vh] w-full px-4 sm:px-8 lg:px-[40px] py-16 flex flex-col justify-center gap-8 sm:gap-12">
          <h2 className="font-bold tracking-widest uppercase text-gray-400" style={{ fontSize: "clamp(11px, 1.5vw, 21px)" }}>Reviews</h2>

          {/* 95% highlight block */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-4xl p-6 sm:p-10 lg:p-16 text-center rounded-2xl self-center w-full"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.35)" }}>
            <div className="font-bold mb-4 sm:mb-6" style={{ fontSize: "clamp(3rem, 10vw, 6rem)", color: "#151515" }}>95%</div>
            <p className="font-light leading-relaxed" style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
              Of our clients are fully satisfied with our services
            </p>
          </motion.div>

          {/* Reviews carousel */}
          <ReviewsCarousel glassPanel={glassPanel} />
        </section>

        <div className="h-[10vh] sm:h-[15vh] lg:h-[20vh]" />

        {/* FAQ */}
        <section id="faq" className="relative min-h-[100vh] w-full px-4 sm:px-8 lg:px-[40px] py-16 max-w-4xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="font-bold tracking-widest uppercase mb-8 sm:mb-12 text-gray-400" style={{ fontSize: "clamp(11px, 1.5vw, 21px)" }}>FAQ</motion.h2>
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {FAQ_DATA.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none px-4 sm:px-6 rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.35)" }}>
                <AccordionTrigger className="py-4 sm:py-6 hover:no-underline font-medium text-left text-sm sm:text-base" style={{ color: "#151515" }}>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base pb-4 sm:pb-6 leading-relaxed" style={{ color: "#151515" }}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* FOOTER */}
        <section className="relative h-[100vh] w-full p-5 sm:p-8 lg:p-[40px]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
            <div className="font-bold tracking-tight text-center" style={{ fontSize: "clamp(3.5rem, 17vw, 13.52rem)" }}>MAGNICY</div>
          </div>
          <div className="absolute bottom-5 sm:bottom-8 lg:bottom-[40px] left-5 sm:left-8 lg:left-[40px] right-5 sm:right-8 lg:right-[40px] flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="text-xs sm:text-sm opacity-50 flex flex-wrap justify-center sm:justify-start items-center gap-x-2 gap-y-1 text-center sm:text-left">
              <span>© 2026 Magnicy. All rights reserved.</span>
              <button
                onClick={() => setLocation("/privacy")}
                className="hover:opacity-100 transition-opacity underline-offset-2 hover:underline"
              >Privacy Policy</button>
              <span>•</span>
              <button
                onClick={() => setLocation("/terms")}
                className="hover:opacity-100 transition-opacity underline-offset-2 hover:underline"
              >Terms of Service</button>
            </div>
            <div className="flex items-center gap-4 sm:gap-5">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <SocialLink key={label} href={href} label={label}><Icon /></SocialLink>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
