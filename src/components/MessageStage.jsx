import { AnimatePresence, motion } from "framer-motion";
import { MESSAGES } from "../config";

const fade = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(6px)" },
  transition: { duration: 0.55, ease: "easeOut" },
};

export default function MessageStage({ clicks }) {
  const message = MESSAGES[Math.min(clicks, MESSAGES.length) - 1];

  return (
    <div className="flex min-h-[150px] w-full max-w-md items-center justify-center">
      <AnimatePresence mode="wait">
        {clicks === 0 ? (
          <motion.p key="hint" {...fade} className="text-sm font-light tracking-wide text-ink/70 sm:text-base">
            Tap the heart to discover something special ❤️
          </motion.p>
        ) : (
          <motion.div
            key={clicks}
            {...fade}
            className="rounded-3xl border border-white/60 bg-white/40 px-6 py-6 shadow-[0_8px_32px_rgba(233,30,99,0.15)] backdrop-blur-xl"
          >
            <p className="font-display text-xl italic leading-relaxed text-ink sm:text-2xl">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
