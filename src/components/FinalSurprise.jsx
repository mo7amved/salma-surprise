import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import { useTypewriter } from "../hooks/useTypewriter";
import { FINAL } from "../config";

const rand = (a, b) => a + Math.random() * (b - a);
const COLORS = ["#E91E63", "#F8BBD0", "#FCE4EC", "#FFFFFF", "#AD1457", "#FFD6E4"];

function Explosion() {
  return Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    const d = rand(140, 340);
    return (
      <motion.span
        key={i}
        className="absolute left-1/2 top-1/2 text-rose"
        initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
        animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d, scale: rand(0.8, 1.6), opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      >
        <Heart size={26} fill="currentColor" strokeWidth={0} />
      </motion.span>
    );
  });
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: window.innerWidth < 640 ? 24 : 50 }, (_, i) => ({
        id: i,
        left: rand(0, 100),
        w: rand(5, 9),
        h: rand(8, 14),
        color: COLORS[i % COLORS.length],
        dur: rand(4, 7),
        delay: rand(0.8, 3),
        drift: rand(-60, 60),
        rot: rand(180, 720),
      })),
    []
  );
  return pieces.map((p) => (
    <motion.span
      key={p.id}
      className="absolute top-0 rounded-[2px]"
      style={{ left: `${p.left}%`, width: p.w, height: p.h, background: p.color, willChange: "transform" }}
      initial={{ y: "-8vh", opacity: 0 }}
      animate={{ y: "108vh", x: p.drift, rotate: p.rot, opacity: [0, 1, 1, 0] }}
      transition={{ duration: p.dur, delay: p.delay, ease: "easeIn", repeat: 1 }}
    />
  ));
}

const reveal = (delay) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export default function FinalSurprise({ onReplay }) {
  const { text, done } = useTypewriter(FINAL.title, 75, 2000);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ background: "radial-gradient(circle at 50% 40%, #FFE3EE 0%, #F8BBD0 50%, #F48FB1 100%)" }}
    >
      {/* pulsing pink glow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose blur-2xl"
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <FloatingHearts count={window.innerWidth < 640 ? 14 : 26} />

      {/* heart expansion + explosion */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.span
          className="absolute left-1/2 top-1/2 -ml-24 -mt-24 text-rose"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 16, opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <Heart size={192} fill="currentColor" strokeWidth={0} />
        </motion.span>
        <Explosion />
        <Confetti />
      </div>

      {/* love letter */}
      <motion.article
        className="relative w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/45 px-6 pb-8 pt-12 text-center shadow-[0_20px_80px_rgba(173,20,87,0.25)] backdrop-blur-2xl sm:px-10"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
      >
        <motion.div
          className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose to-wine text-white shadow-lg"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <Heart size={24} fill="currentColor" strokeWidth={0} />
        </motion.div>

        <h1 className="min-h-[2.6em] font-display text-3xl font-bold leading-tight text-wine sm:text-5xl">
          {text}
          {!done && <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-wine align-middle">&nbsp;</span>}
        </h1>

        {done && (
          <div className="mt-4 flex flex-col items-center gap-4">
            <motion.p {...reveal(0)} className="font-display text-lg italic text-ink sm:text-xl">
              {FINAL.subtitle}
            </motion.p>
            <motion.div {...reveal(0.5)} className="flex items-center gap-3 text-rose">
              <span className="h-px w-12 bg-rose/40" />
              <Heart size={14} fill="currentColor" strokeWidth={0} />
              <span className="h-px w-12 bg-rose/40" />
            </motion.div>
            <motion.p {...reveal(1)} className="text-sm font-light text-ink/80 sm:text-base">
              {FINAL.line}
            </motion.p>
            <motion.span {...reveal(1.4)} className="rounded-full bg-white/60 px-5 py-1.5 text-sm font-medium tracking-[0.4em] text-rose">
              {FINAL.date}
            </motion.span>
            <motion.button
              {...reveal(2)}
              type="button"
              onClick={onReplay}
              whileTap={{ scale: 0.94 }}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-rose px-6 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(233,30,99,0.4)] transition hover:bg-wine"
            >
              <RotateCcw size={15} /> Replay
            </motion.button>
          </div>
        )}
      </motion.article>
    </motion.div>
  );
}
