import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function FloatingConsultation() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setOpen(true), 6500);
    return () => clearTimeout(t);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {open && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0, filter: "blur(12px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 40, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-1/2 -translate-x-1/2 bottom-6 z-[100] w-[min(92vw,520px)]"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-md p-5 md:p-6 overflow-hidden"
            style={{
              background: "color-mix(in oklab, var(--ink) 78%, transparent)",
              backdropFilter: "blur(18px) saturate(1.3)",
              WebkitBackdropFilter: "blur(18px) saturate(1.3)",
              border: "1px solid color-mix(in oklab, var(--brass-glow) 45%, transparent)",
              boxShadow:
                "0 25px 80px -20px rgba(0,0,0,0.5), 0 0 60px -15px color-mix(in oklab, var(--brass) 55%, transparent)",
              color: "var(--background)",
            }}
          >
            {/* animated brass gradient outline */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-md pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, transparent 30%, color-mix(in oklab, var(--brass-glow) 25%, transparent) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s linear infinite",
                mixBlendMode: "overlay",
              }}
            />

            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--brass)" }}>
                  <span className="absolute inset-0 rounded-full animate-brass-pulse" />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.4 5.6L20 9l-4.2 4 1 6L12 16.8 7.2 19l1-6L4 9l5.6-1.4L12 2z" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <div className="flex-1">
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] mb-1.5" style={{ color: "var(--brass-glow)" }}>
                  Studio Concierge
                </div>
                <p className="font-display text-lg md:text-xl leading-snug mb-4">
                  Need help transforming your space?
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    data-cursor="hover"
                    data-cursor-label="Book"
                    onClick={() => setDismissed(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] font-medium rounded-sm transition-transform hover:-translate-y-0.5"
                    style={{ background: "var(--brass)", color: "var(--ink)" }}
                  >
                    Book Consultation
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="#work"
                    data-cursor="hover"
                    data-cursor-label="View"
                    onClick={() => setDismissed(true)}
                    className="inline-flex items-center px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] font-medium rounded-sm border transition-colors hover:bg-background/10"
                    style={{ borderColor: "color-mix(in oklab, var(--brass-glow) 60%, transparent)", color: "var(--background)" }}
                  >
                    Explore Portfolio
                  </a>
                </div>
              </div>

              <button
                onClick={() => setDismissed(true)}
                data-cursor="hover"
                aria-label="Dismiss"
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
