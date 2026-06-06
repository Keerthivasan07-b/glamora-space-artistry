import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export function ChatButton() {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220 });
  const sy = useSpring(y, { damping: 18, stiffness: 220 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 140) {
        x.set(dx * 0.25);
        y.set(dy * 0.25);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      data-cursor-label="Chat with us"
      aria-label="Chat with the studio"
      style={{ x: sx, y: sy }}
      className="fixed right-6 bottom-6 z-[96]"
    >
      <span
        className="relative grid place-items-center h-14 w-14 rounded-full animate-breath"
        style={{
          background: "var(--brass)",
          boxShadow:
            "0 18px 40px -10px color-mix(in oklab, var(--brass) 60%, transparent), 0 0 0 1px color-mix(in oklab, var(--brass-glow) 60%, transparent)",
        }}
      >
        {/* ripple rings */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full animate-ripple"
          style={{ border: "1px solid color-mix(in oklab, var(--brass-glow) 70%, transparent)" }}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full animate-ripple"
          style={{ border: "1px solid color-mix(in oklab, var(--brass-glow) 50%, transparent)", animationDelay: "0.6s" }}
        />
        {/* badge */}
        <span
          aria-hidden
          className="absolute -top-1 -right-1 h-4 w-4 grid place-items-center rounded-full text-[9px] font-mono font-bold"
          style={{ background: "var(--ink)", color: "var(--brass-glow)" }}
        >
          1
          <span className="absolute inset-0 rounded-full animate-brass-pulse" />
        </span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.5-.4 2.9-1.1 4.1L20 20l-4-.9c-1.2.6-2.5.9-4 .9-4.4 0-8-3.6-8-8z"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 11h.01M12 11h.01M16 11h.01" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    </motion.a>
  );
}
