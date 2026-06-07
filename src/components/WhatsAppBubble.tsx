import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function WhatsAppBubble() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const show = () => mounted && setOpen(true);
    const hide = () => mounted && setOpen(false);
    const cycle = () => {
      setTimeout(show, 12000);
      setTimeout(hide, 26000);
    };
    cycle();
    const t = setInterval(cycle, 32000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.a
          href="https://wa.me/919876543210?text=Hi%20Glamora%2C%20I%27d%20love%20to%20discuss%20a%20project."
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          data-cursor-label="Chat"
          initial={{ x: 60, y: 20, opacity: 0, scale: 0.6 }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          exit={{ x: 30, opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", damping: 16, stiffness: 220 }}
          className="fixed-chat-widget-bubble fixed right-6 bottom-28 z-[95] max-w-[280px] transition-all duration-500"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-2xl rounded-br-sm px-4 py-3 pr-5 text-sm leading-snug"
            style={{
              background: "var(--background)",
              color: "var(--ink)",
              boxShadow:
                "0 20px 60px -20px rgba(0,0,0,0.35), 0 0 32px -10px color-mix(in oklab, var(--brass) 50%, transparent)",
              border: "1px solid color-mix(in oklab, var(--brass) 30%, transparent)",
            }}
          >
            <div className="flex items-center gap-2 mb-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#25D366" }}>
                <span className="absolute inset-0 rounded-full animate-ripple" style={{ background: "#25D366" }} />
              </span>
              Studio · Online
            </div>
            <span className="font-display text-base italic">
              Hi! Looking for a luxury interior transformation?
            </span>
            <span
              aria-hidden
              className="absolute -bottom-1 right-3 h-3 w-3 rotate-45"
              style={{ background: "var(--background)", borderRight: "1px solid color-mix(in oklab, var(--brass) 30%, transparent)", borderBottom: "1px solid color-mix(in oklab, var(--brass) 30%, transparent)" }}
            />
          </motion.div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
