import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 300, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "yrs", label: "Studio Practice" },
  { value: 25, suffix: "+", label: "Design Experts" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      <span style={{ color: "var(--brass)" }}>{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-24 px-6 md:px-12 border-y border-foreground/10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
            className={`flex flex-col gap-2 md:border-l md:border-foreground/10 md:pl-6 first:border-l-0 first:pl-0 ${
              i === 4 ? "col-span-2 items-center text-center md:col-span-1 md:items-start md:text-left md:border-l" : ""
            }`}
          >
            <span className="font-display text-4xl md:text-6xl tracking-tight">
              <Counter to={s.value} suffix={s.suffix} />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
