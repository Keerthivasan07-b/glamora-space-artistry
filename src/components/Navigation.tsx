import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference text-background"
    >
      <a href="#" data-cursor="hover" data-cursor-label="Home" className="font-display text-2xl tracking-tight italic">
        Glamora<span style={{ color: "var(--brass-glow)" }}>.</span>
      </a>

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

      <a
        href="#contact"
        data-cursor="hover"
        data-cursor-label="Talk"
        className="font-mono text-[10px] uppercase tracking-[0.22em] flex items-center gap-2 group"
      >
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${scrolled ? "" : "animate-breath"}`} style={{ background: "var(--brass-glow)" }} />
        Book a Studio Call
      </a>
    </motion.nav>
  );
}
