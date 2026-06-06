import { motion } from "motion/react";

export function ContactFooter() {
  return (
    <footer id="contact" className="relative pt-32 pb-12 px-6 md:px-12 bg-charcoal text-background">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-12 gap-12 mb-32"
        >
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-8" style={{ color: "var(--brass-glow)" }}>
              (05) Begin
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-9xl leading-[0.95] tracking-tight">
              Let's compose <br />
              something <em className="italic" style={{ color: "var(--brass-glow)" }}>extraordinary</em>.
            </h2>
            <a
              href="mailto:hello@glamora.com"
              data-cursor="hover"
              data-cursor-label="Email"
              className="inline-block mt-12 font-display text-2xl md:text-4xl italic pb-2 group"
              style={{
                color: "var(--brass-glow)",
                borderBottom: "1px solid color-mix(in oklab, var(--brass-glow) 50%, transparent)",
              }}
            >
              hello@glamora.com
            </a>
          </div>

          <div className="col-span-6 lg:col-span-2 space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Studio</div>
            <p className="text-sm leading-relaxed opacity-90">
              The Atelier<br />
              Via della Moscova, 33<br />
              20121 Milano · IT
            </p>
          </div>
          <div className="col-span-6 lg:col-span-3 space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Inquiries</div>
            <p className="text-sm leading-relaxed opacity-90">
              +91 98765 43210<br />
              press@glamora.com<br />
              careers@glamora.com
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-12 border-t border-background/10">
          <div className="font-display text-xl uppercase tracking-widest">Glamora</div>
          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
            <a href="#" data-cursor="hover" className="hover:opacity-100">Instagram</a>
            <a href="#" data-cursor="hover" className="hover:opacity-100">Facebook</a>
            <a href="#" data-cursor="hover" className="hover:opacity-100">LinkedIn</a>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-50">
            © 2026 Glamora Studio · All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
