import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const words =
    "We believe every wall tells a story, and every space deserves a quiet identity — composed of light, material, and time.".split(
      " ",
    );

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 md:px-12">
      <motion.div style={{ y }} className="max-w-5xl mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-12 flex items-center gap-3">
          <span className="h-px w-8 bg-foreground/30" />
          (Manifesto)
        </div>
        <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-balance">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="inline-block mr-[0.22em]"
            >
              {w === "quiet" || w === "story," ? (
                <em style={{ color: "var(--brass)" }} className="not-italic font-display italic">
                  {w}
                </em>
              ) : (
                w
              )}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </section>
  );
}
