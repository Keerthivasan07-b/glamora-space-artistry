import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const quotes = [
  {
    body: "Glamora completely transformed our home. Every detail was executed with a precision that felt closer to art than construction.",
    name: "Elena Moretti",
    role: "Private Residence, Lake Como",
  },
  {
    body: "The team's creativity and professionalism exceeded every expectation. They translated a feeling into a finished room.",
    name: "Rohan Mehta",
    role: "Villa Owner, Bandra",
  },
  {
    body: "Our office now looks modern, elegant and unmistakably ours. Clients comment on the walls before the work.",
    name: "Aanya Kapoor",
    role: "Managing Partner, Aurum Capital",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, []);

  const q = quotes[i];

  return (
    <section className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-10">
          (04) Conversations
        </div>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-5xl leading-[1.2] text-balance mb-12"
          >
            <span style={{ color: "var(--brass)" }} className="font-display text-5xl mr-1">“</span>
            {q.body}
            <span style={{ color: "var(--brass)" }} className="font-display text-5xl ml-1">”</span>
          </motion.blockquote>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-6">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              data-cursor="hover"
              aria-label={`Quote ${idx + 1}`}
              className="group flex items-center gap-3"
            >
              <span
                className="h-px transition-all duration-500"
                style={{
                  width: idx === i ? 48 : 18,
                  background: idx === i ? "var(--brass)" : "var(--muted-foreground)",
                }}
              />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={i + "meta"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <cite className="not-italic font-medium tracking-widest uppercase text-sm">
              {q.name}
            </cite>
            <div className="text-xs text-muted-foreground mt-1">{q.role}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
