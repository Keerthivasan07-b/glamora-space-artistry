import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4";
const HERO_POSTER =
  "https://images.pexels.com/videos/7578552/free-video-7578552.jpg?auto=compress&cs=tinysrgb&w=1600";

export function HeroVideo() {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  // cinematic scroll: video subtle zoom + pan, content fades & lifts
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.28]);
  const yPan = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.4, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setLoaded(true);
    v.addEventListener("loadeddata", onReady);
    v.play().catch(() => {});
    return () => v.removeEventListener("loadeddata", onReady);
  }, []);

  return (
    <section ref={ref} className="relative h-[110vh] w-full overflow-hidden bg-charcoal">
      {/* Video layer with scroll-driven scale + pan */}
      <motion.div
        style={{ scale, y: yPan }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: loaded ? 1 : 0, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Cinematic gradient overlays */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0" style={{
          background:
            "linear-gradient(180deg, rgba(15,12,10,0.55) 0%, rgba(15,12,10,0.15) 35%, rgba(15,12,10,0.25) 65%, rgba(15,12,10,0.85) 100%)",
        }} />
        <div className="absolute inset-0" style={{
          background:
            "radial-gradient(60% 80% at 50% 60%, transparent 30%, rgba(15,12,10,0.55) 100%)",
        }} />
      </motion.div>

      {/* Loading mask reveal */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.4, ease: [0.7, 0, 0.3, 1], delay: 0.1 }}
        style={{ background: "var(--ink)", transformOrigin: "top" }}
        className="absolute inset-0 z-30 pointer-events-none"
        aria-hidden
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex h-screen flex-col justify-end px-6 md:px-12 pb-20 md:pb-28 text-background"
      >
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-8 font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "var(--brass-glow)" }}
            >
              <span className="h-px w-10" style={{ background: "var(--brass-glow)" }} />
              Interior Atelier — Est. Studio Practice
            </motion.div>

            <h1 className="font-display leading-[0.92] tracking-tight text-balance">
              {"Transforming Spaces.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 1.5 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.25em] text-5xl md:text-8xl lg:text-[9rem]"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {"Elevating Lifestyles.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 1.9 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.25em] italic text-5xl md:text-8xl lg:text-[9rem]"
                  style={{ color: "var(--brass-glow)" }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-4 lg:pb-4"
          >
            <p className="max-w-sm text-base md:text-lg font-light leading-relaxed text-balance opacity-80">
              A premium wall styling and interior atelier — crafting residences,
              offices and hospitality interiors that read as quiet, lived-in luxury.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] opacity-60">Scroll</span>
          <div className="h-12 w-px overflow-hidden bg-background/20">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1/2 w-full"
              style={{ background: "var(--brass-glow)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
