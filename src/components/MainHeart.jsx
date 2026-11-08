import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

function Burst() {
  return (
    <>
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-rose/50"
        initial={{ scale: 0.6, opacity: 0.8 }}
        animate={{ scale: 1.9, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const d = 130 + (i % 3) * 25;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 -ml-3 -mt-3 text-rose"
            initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
            animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d, scale: 1, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Heart size={i % 2 ? 16 : 22} fill="currentColor" strokeWidth={0} />
          </motion.span>
        );
      })}
    </>
  );
}

export default function MainHeart({ count, disabled, onTap }) {
  const [bursts, setBursts] = useState([]);

  const handleTap = () => {
    if (disabled) return;
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1000);
    onTap();
  };

  return (
    <div className="relative flex h-[min(68vw,290px)] w-[min(68vw,290px)] items-center justify-center">
      {/* glow grows with every tap */}
      <motion.div
        aria-hidden
        className="absolute -inset-[22%] rounded-full bg-rose blur-3xl"
        animate={{ opacity: [0.18 + count * 0.04, 0.32 + count * 0.05, 0.18 + count * 0.04], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {bursts.map((id) => (
        <Burst key={id} />
      ))}
      <motion.div
        className="relative h-full w-full"
        animate={{ scale: [1, 1.06, 1, 1.09, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.button
          type="button"
          onClick={handleTap}
          disabled={disabled}
          aria-label={`Tap the heart (${count} of 5)`}
          whileTap={{ scale: 0.86 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="h-full w-full cursor-pointer rounded-full outline-none focus-visible:ring-4 focus-visible:ring-rose/40 disabled:cursor-default"
        >
          <svg viewBox="0 0 24 24" className="h-full w-full" style={{ filter: "drop-shadow(0 12px 26px rgba(233,30,99,.45))" }}>
            <defs>
              <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF6F9F" />
                <stop offset="55%" stopColor="#E91E63" />
                <stop offset="100%" stopColor="#AD1457" />
              </linearGradient>
            </defs>
            <path d={HEART_PATH} fill="url(#heartGrad)" />
            <path d="M5.2 8.2c.5-1.6 1.8-2.6 3.3-2.7" stroke="#fff" strokeOpacity=".55" strokeWidth=".9" strokeLinecap="round" fill="none" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
