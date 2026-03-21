"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/neon-button";

const PATH_COUNT = 36;

/** Reine Funktion: unterschiedliche Dauer pro Pfad (ca. 20–30s), ohne Math.random im Render. */
function pathTransitionDuration(pathId: number, position: number): number {
  const mix = pathId * 17 + position * 41 + pathId * pathId * 3;
  return 20 + (Math.abs(mix) % 1000) / 100; // 20.00 … 29.99
}

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: PATH_COUNT }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950/55 dark:text-white/50"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.07 + path.id * 0.018}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.28, 0.52, 0.28],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: pathTransitionDuration(path.id, position),
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
  ctaLabel = "Unsere Projekte",
  ctaHref = "#",
}: {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const words = title.split(" ");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-black">
      {/* overflow nur auf die Ebene mit den Pfaden — sonst schneidet der Hero auch Titel-Serifen/-rundungen ab */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto overflow-visible"
        >
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tight
              leading-[1.18] sm:leading-[1.15] md:leading-[1.12] pb-2 overflow-visible"
          >
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block mr-4 last:mr-0 overflow-visible align-baseline"
              >
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block overflow-visible align-baseline text-transparent bg-clip-text 
                                        bg-linear-to-r from-neutral-900 to-neutral-700/80 
                                        dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Lokaler .dark-Scope + dunkler Ring: weiße Neon-Umrandung sichtbar, auf hellem Hero trotzdem Kontrast */}
          <div className="mt-2 flex justify-center">
            <div className="dark inline-block rounded-full bg-zinc-950 p-1 shadow-lg shadow-black/30 ring-1 ring-white/15">
              <Button
                href={ctaHref}
                variant="solid"
                neon
                size="default"
                className="px-5 py-2 text-sm font-semibold min-h-0 h-auto border border-white/35 shadow-md shadow-white/10 hover:shadow-white/20 hover:-translate-y-px transition-all"
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
