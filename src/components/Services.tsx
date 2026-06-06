import { motion } from "motion/react";

const services = [
  {
    n: "I",
    title: "Premium Wall Solutions",
    items: [
      "Decorative & Custom Wall Graphics",
      "3D Wall Panels",
      "Luxury Wallpaper Installation",
      "Textured & Lime Finishes",
      "Corporate Branding Walls",
      "Feature Accent Walls",
    ],
  },
  {
    n: "II",
    title: "Interior Design",
    items: [
      "Luxury Home & Villa Interiors",
      "Apartment Interior Design",
      "Office & Workspace Planning",
      "Café, Restaurant & Hotel Interiors",
      "Retail Store & Showroom Design",
      "Hospitality Styling",
    ],
  },
  {
    n: "III",
    title: "Design Consultation",
    items: [
      "Space Planning",
      "Furniture Layout",
      "Material Selection",
      "Color Consultation",
      "Lighting Design Guidance",
      "End-to-End Project Support",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 px-6 md:px-12 bg-charcoal text-background">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 border-b border-background/10 pb-10">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3" style={{ color: "var(--brass-glow)" }}>
              <span className="h-px w-8" style={{ background: "var(--brass-glow)" }} />
              (02) Disciplines
            </div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight text-balance">
              What we make, <em className="italic" style={{ color: "var(--brass-glow)" }}>and unmake</em>.
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed opacity-70">
            Three quiet disciplines, one studio. Walls, rooms, and the
            conversations between them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group"
              data-cursor="hover"
            >
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--brass-glow)" }}>
                  {s.n}
                </span>
                <span className="h-px flex-1" style={{ background: "color-mix(in oklab, var(--brass-glow) 30%, transparent)" }} />
              </div>
              <h3 className="font-display text-3xl md:text-4xl mb-8 leading-tight">{s.title}</h3>
              <ul className="space-y-3 text-sm font-light">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <span className="h-1 w-1 rounded-full" style={{ background: "var(--brass-glow)" }} />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
