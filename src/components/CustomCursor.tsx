import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 350, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 350, mass: 0.4 });
  const trailX = useSpring(x, { damping: 40, stiffness: 120, mass: 0.8 });
  const trailY = useSpring(y, { damping: 40, stiffness: 120, mass: 0.8 });

  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState<"default" | "hover" | "media">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("[data-cursor]") as HTMLElement | null;
      if (interactive) {
        const cur = interactive.dataset.cursor || "hover";
        const text = interactive.dataset.cursorLabel || "";
        setVariant(cur === "media" ? "media" : "hover");
        setLabel(text);
      } else {
        setVariant("default");
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  const size = variant === "media" ? 96 : variant === "hover" ? 56 : 14;

  return (
    <>
      {/* trailing dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
        style={{ x: trailX, y: trailY }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 6,
            height: 6,
            background: "var(--brass)",
            boxShadow: "0 0 14px color-mix(in oklab, var(--brass) 60%, transparent)",
          }}
        />
      </motion.div>

      {/* main cursor ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201] hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{ width: size, height: size }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center mix-blend-difference"
          style={{
            border: variant === "default"
              ? "1px solid color-mix(in oklab, white 80%, transparent)"
              : "1px solid color-mix(in oklab, var(--brass-glow) 90%, transparent)",
            background: variant === "default"
              ? "transparent"
              : "color-mix(in oklab, var(--brass) 18%, transparent)",
            backdropFilter: variant !== "default" ? "blur(2px)" : undefined,
          }}
        >
          {label && (
            <span
              className="font-mono text-[9px] uppercase tracking-[0.18em] text-white whitespace-nowrap px-2"
            >
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
