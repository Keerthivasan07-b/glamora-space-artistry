import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-menu-open", "true");
    } else {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-menu-open");
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between transition-all duration-500 ${
          scrolled && !menuOpen
            ? "bg-background/80 backdrop-blur-md border-b border-foreground/5 text-foreground py-4"
            : "mix-blend-difference text-background"
        }`}
      >
        <a href="#" data-cursor="hover" data-cursor-label="Home" className="font-display text-2xl tracking-tight italic relative z-50">
          Glamora<span style={{ color: "var(--brass-glow)" }}>.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 font-mono text-[10px] uppercase tracking-[0.22em]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className="relative group"
            >
              <span>{l.label}</span>
              <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: "var(--brass-glow)" }} />
            </a>
          ))}
        </div>

        {/* Desktop CTA / Mobile Menu Container */}
        <div className="flex items-center gap-6">
          <a
            href="#contact"
            data-cursor="hover"
            data-cursor-label="Talk"
            className="hidden sm:flex font-mono text-[10px] uppercase tracking-[0.22em] items-center gap-2 group relative z-50"
          >
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${scrolled ? "" : "animate-breath"}`} style={{ background: "var(--brass-glow)" }} />
            Book a Studio Call
          </a>

          {/* Minimalist Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 justify-center items-end h-8 w-8 relative z-50 focus:outline-none text-current"
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-6 bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -5, width: 24 } : { rotate: 0, y: 0, width: 16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-current"
            />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-charcoal text-background flex flex-col justify-between px-8 py-24 md:hidden"
            style={{ background: "var(--ink)" }}
          >
            <div className="flex flex-col gap-8 mt-12">
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-40">
                (Navigation Menu)
              </span>
              {links.map((l, idx) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl italic tracking-wide group flex items-baseline justify-between border-b border-background/5 pb-4"
                >
                  <span className="hover:text-brass-glow transition-colors">{l.label}</span>
                  <span className="font-mono text-[10px] tracking-normal opacity-40">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-6 border-t border-background/10 pt-8 font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">
              <div className="flex justify-between items-center">
                <span className="opacity-50">Studio Concierge</span>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="text-brass-glow underline underline-offset-4">Book a Call</a>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-50">Milano Atelier</span>
                <span>Via della Moscova, 33</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-50">Inquiries</span>
                <a href="mailto:hello@glamora.com" className="text-brass-glow">hello@glamora.com</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
