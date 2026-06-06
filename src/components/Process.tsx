import { motion } from "motion/react";

const steps = [
  { n: "01", title: "Free Consultation", desc: "An immersive dialogue to understand your vision, lifestyle and aesthetic instincts." },
  { n: "02", title: "Site Inspection", desc: "Precise spatial analysis, light study, and material context of your environment." },
  { n: "03", title: "Design Planning", desc: "Conceptual drafts, mood boards and atmospheric storyboards." },
  { n: "04", title: "Material Selection", desc: "Tactile curation of stone, fabric and custom wall treatments." },
  { n: "05", title: "Project Execution", desc: "Meticulous craft overseen by our project masters and trades." },
  { n: "06", title: "Quality Inspection", desc: "Rigorous assessment of every finish, joint and lighting detail." },
  { n: "07", title: "Project Handover", desc: "The final reveal of your transformed space, tailored for everyday life." },
];

export function Process() {
  return (
    <section id="process" className="relative py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
            (03) The Method
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight text-balance">
            From first sketch <br />to <em className="italic" style={{ color: "var(--brass)" }}>final reveal</em>.
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-12 gap-4 py-8 md:py-10 border-t border-foreground/10 last:border-b items-baseline hover:bg-foreground/5 transition-colors px-2 md:px-4"
              data-cursor="hover"
            >
              <span className="col-span-2 font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {s.n}
              </span>
              <h4 className="col-span-10 md:col-span-4 font-display text-2xl md:text-4xl italic">
                {s.title}
              </h4>
              <p className="col-span-12 md:col-span-6 text-sm text-muted-foreground leading-relaxed mt-2 md:mt-0">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
