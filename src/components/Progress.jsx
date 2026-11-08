import { motion } from "framer-motion";
import { TOTAL_CLICKS } from "../config";

export default function Progress({ count }) {
  return (
    <div className="flex flex-col items-center gap-2" role="status" aria-label={`${count} of ${TOTAL_CLICKS}`}>
      <div className="flex gap-2.5">
        {Array.from({ length: TOTAL_CLICKS }, (_, i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full"
            animate={{ scale: i < count ? 1.25 : 1, backgroundColor: i < count ? "#E91E63" : "#F8BBD0" }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          />
        ))}
      </div>
      <p className="text-xs tracking-[0.35em] text-ink/60">
        {count}/{TOTAL_CLICKS}
      </p>
    </div>
  );
}
