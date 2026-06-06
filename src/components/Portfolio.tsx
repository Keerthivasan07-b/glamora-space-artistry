import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import livingImg from "@/assets/portfolio-living.jpg";
import officeImg from "@/assets/portfolio-office.jpg";
import cafeImg from "@/assets/portfolio-cafe.jpg";
import bedroomImg from "@/assets/portfolio-bedroom.jpg";
import showroomImg from "@/assets/portfolio-showroom.jpg";

interface Project {
  title: string;
  category: string;
  location: string;
  img: string;
  span: string;
  aspect: string;
}

const projects: Project[] = [
  {
    title: "Modern Luxury Residence",
    category: "Residential / Wall Atelier",
    location: "Milan, IT",
    img: livingImg,
    span: "col-span-12 lg:col-span-7",
    aspect: "aspect-[4/5]",
  },
  {
    title: "The Nocturne Suite",
    category: "Bedroom / Custom Panels",
    location: "Zurich, CH",
    img: bedroomImg,
    span: "col-span-12 lg:col-span-5 lg:mt-32",
    aspect: "aspect-[5/6]",
  },
  {
    title: "Linear Workspace",
    category: "Corporate Branding Wall",
    location: "London, UK",
    img: officeImg,
    span: "col-span-12 lg:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Artisan Café",
    category: "Hospitality / Hand-Finished",
    location: "Brussels, BE",
    img: cafeImg,
    span: "col-span-12 lg:col-span-4 lg:mt-24",
    aspect: "aspect-square",
  },
  {
    title: "Brera Showroom",
    category: "Retail / Sculpted Niches",
    location: "Milan, IT",
    img: showroomImg,
    span: "col-span-12 lg:col-span-3 lg:mt-12",
    aspect: "aspect-[3/4]",
  },
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { damping: 20, stiffness: 200 });
  const sy = useSpring(ry, { damping: 20, stiffness: 200 });
  const rotateX = useTransform(sy, (v) => v * 6);
  const rotateY = useTransform(sx, (v) => v * -6);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rx.set((e.clientX - r.left) / r.width - 0.5);
    ry.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className={`${p.span} group relative animate-drift`}
      style={{ animationDelay: `${index * 0.7}s`, perspective: 1200 }}
      data-cursor="media"
      data-cursor-label="View Project"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className={`relative overflow-hidden rounded-sm ${p.aspect} bg-muted`}>
          {/* Image */}
          <motion.img
            src={p.img}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover"
            initial={{ scale: 1.05 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Animated border */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--brass-glow) 90%, transparent), 0 30px 80px -20px color-mix(in oklab, var(--ink) 60%, transparent)",
            }}
          />

          {/* Brass glow on hover */}
          <span
            aria-hidden
            className="absolute -inset-3 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 blur-2xl"
            style={{ background: "color-mix(in oklab, var(--brass) 35%, transparent)" }}
          />

          {/* Glassmorphism caption overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <div
              className="rounded-sm p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "color-mix(in oklab, var(--ink) 55%, transparent)",
                backdropFilter: "blur(14px) saturate(1.2)",
                WebkitBackdropFilter: "blur(14px) saturate(1.2)",
                border: "1px solid color-mix(in oklab, var(--brass-glow) 35%, transparent)",
              }}
            >
              <div className="flex items-center justify-between gap-4 text-background">
                <div>
                  <div className="font-display text-lg md:text-2xl italic">{p.title}</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-70 mt-1">
                    {p.category} — {p.location}
                  </div>
                </div>
                <span
                  className="h-10 w-10 rounded-full grid place-items-center shrink-0"
                  style={{ background: "var(--brass)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Always-visible caption */}
        <div className="mt-5 flex items-baseline justify-between">
          <h3 className="font-display text-2xl md:text-3xl">{p.title}</h3>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-1">
          {p.category}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section id="work" className="relative py-32 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 border-b border-foreground/10 pb-10">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/30" />
              (01) Selected Works
            </div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight text-balance">
              A sequence of <em className="italic" style={{ color: "var(--brass)" }}>spaces</em>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            From private residences in Como to retail flagships in Milan — each
            project begins with the wall and ends with a way of living.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
