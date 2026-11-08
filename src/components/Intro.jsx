import { motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";

export default function Intro({ onOpen }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 px-6 text-center"
      style={{ background: "radial-gradient(circle at 50% 40%, #FFE3EE 0%, #F8BBD0 60%, #F48FB1 100%)" }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-rose"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mail size={72} strokeWidth={1.3} />
      </motion.div>

      <h1 className="font-display text-3xl italic leading-snug text-wine sm:text-4xl">
        Something is waiting for you, Salma
      </h1>

      <motion.button
        type="button"
        onClick={onOpen}
        whileTap={{ scale: 0.94 }}
        className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(233,30,99,0.4)] transition hover:bg-wine"
      >
        Open your surprise <Heart size={16} fill="currentColor" strokeWidth={0} />
      </motion.button>
    </motion.div>
  );
}
