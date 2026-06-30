import { useLocation } from "wouter";
import { motion } from "framer-motion";

const ACCENT = "#E6F6C1";

export default function PrivacyPolicyPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full" style={{ background: "#151515", color: "#f5f5f5" }}>

      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-[40px] py-3 flex justify-between items-center"
        style={{ background: "rgba(21,21,21,0.85)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
        <button
          onClick={() => setLocation("/")}
          className="font-medium px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base"
          style={{ border: `1px solid ${ACCENT}`, color: ACCENT, background: "transparent" }}
          onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#151515"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ACCENT; }}
        >Back</button>

        <div className="font-bold text-base sm:text-xl tracking-[0.2em] uppercase" style={{ color: "#f5f5f5" }}>MAGNICY</div>

        <a href="mailto:magnicy.agency@gmail.com">
          <button
            className="font-medium px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base"
            style={{ background: ACCENT, color: "#151515", border: `1px solid ${ACCENT}` }}
            onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = ACCENT; }}
            onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#151515"; e.currentTarget.style.borderColor = ACCENT; }}
          >Contact us</button>
        </a>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-[40px] pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-32">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>

          <p className="font-medium tracking-widest uppercase mb-3 sm:mb-4" style={{ fontSize: "13px", color: "#9ca3af" }}>
            Legal
          </p>
          <h1 className="font-bold leading-tight mb-10 sm:mb-14 lg:mb-16" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Privacy Policy
          </h1>

          <p className="leading-relaxed mb-8 sm:mb-12 text-base sm:text-lg" style={{ color: "#d1d5db" }}>
            At MAGNICY, we respect your privacy. This document explains how we interact with information on our website.
          </p>

          <Section number="1" title="Use of Contact Information">
            If you contact us via email or messengers, we use your details only to respond to your inquiry. We guarantee that your information will not be shared with third parties without your consent.
          </Section>

          <Section number="2" title="Links to Other Resources">
            Our website contains links to social media and third-party resources. We are not responsible for the privacy policies of those websites.
          </Section>

          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="mb-3 sm:mb-4 text-base sm:text-lg" style={{ color: "#d1d5db" }}>
              If you have any questions regarding privacy, please reach out to us:
            </p>
            <a
              href="mailto:magnicy.agency@gmail.com"
              className="font-medium transition-opacity duration-200 text-base sm:text-lg break-all"
              style={{ color: ACCENT }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            >
              magnicy.agency@gmail.com
            </a>
          </div>

          <p className="mt-10 sm:mt-12 text-sm" style={{ color: "#6b7280" }}>
            Last updated: May 2026
          </p>

        </motion.div>
      </main>
    </div>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-baseline gap-3 mb-2 sm:mb-3">
        <span className="font-semibold flex-shrink-0" style={{ color: "#E6F6C1", fontSize: "0.85rem" }}>{number}.</span>
        <h2 className="font-semibold text-base sm:text-lg">{title}</h2>
      </div>
      <p className="leading-relaxed pl-5 sm:pl-6 text-sm sm:text-base" style={{ color: "#d1d5db" }}>
        {children}
      </p>
    </div>
  );
}
