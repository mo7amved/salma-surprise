import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const rand = (a, b) => a + Math.random() * (b - a);

export default function FloatingHearts({ count = 16 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: rand(0, 96),
        size: rand(14, 36),
        dur: rand(9, 17),
        delay: rand(0, 6),
        sway: rand(15, 35),
        opacity: rand(0.25, 0.6),
        color: i % 3 === 0 ? "text-rose" : "text-blush",
      })),
    [count]
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(3, 7),
        dur: rand(2, 4.5),
        delay: rand(0, 4),
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.9)]"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity }}
        />
      ))}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className={`absolute bottom-0 ${h.color}`}
          style={{ left: `${h.left}%`, opacity: h.opacity, willChange: "transform" }}
          animate={{
            y: ["10vh", "-115vh"],
            x: [0, h.sway, -h.sway, 0],
            rotate: [-12, 12, -12],
          }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          <Heart size={h.size} fill="currentColor" strokeWidth={0} />
        </motion.div>
      ))}
    </div>
  );
}
