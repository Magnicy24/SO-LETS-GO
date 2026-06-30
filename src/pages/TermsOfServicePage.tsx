import { useLocation } from "wouter";
import { motion } from "framer-motion";

const ACCENT = "#E6F6C1";

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>

          <p className="leading-relaxed mb-8 sm:mb-12 text-base sm:text-lg" style={{ color: "#d1d5db" }}>
            Welcome to MAGNICY. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.
          </p>

          <Section number="1" title="General Provisions">
            By using this website, you confirm that you are at least 18 years of age and have the legal capacity to enter into these terms. MAGNICY reserves the right to update or modify these terms at any time without prior notice. Continued use of the website after any changes constitutes your acceptance of the new terms.
          </Section>

          <Section number="2" title="Intellectual Property">
            All original materials featured on this website — including text, structure, layout designs, cases, and the MAGNICY logo — are the intellectual property of MAGNICY and are protected by copyright laws. Copying or using these materials for commercial purposes without our written consent is strictly prohibited.
          </Section>

          <Section number="3" title="Third-Party Assets (Fonts and Icons)">
            We respect the rights of other creators. All fonts and icons displayed on this website are the property of their respective owners. Their use does not imply any affiliation with or endorsement by the copyright holders.
          </Section>

          <Section number="4" title="Disclaimer">
            We strive to provide up-to-date information regarding our cases and services. However, MAGNICY is not liable for any damages resulting from the use of information on this website or the temporary unavailability of the resource.
          </Section>

          <Section number="5" title="Contact Information">
            If you have any questions regarding these terms or notice any copyright infringements, please contact us:
          </Section>

          <div className="mt-4 mb-12 sm:mb-16 pl-5 sm:pl-6">
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

          <p className="text-sm" style={{ color: "#6b7280" }}>
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
