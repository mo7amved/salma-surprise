import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import FloatingHearts from "./components/FloatingHearts";
import MainHeart from "./components/MainHeart";
import MessageStage from "./components/MessageStage";
import Progress from "./components/Progress";
import MusicPlayer from "./components/MusicPlayer";
import FinalSurprise from "./components/FinalSurprise";
import Intro from "./components/Intro";
import { TOTAL_CLICKS } from "./config";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [clicks, setClicks] = useState(0);
  const music = useRef(null);
  const finished = clicks >= TOTAL_CLICKS;

  // the tap on the intro button is the user gesture that lets audio play (required on iOS)
  const handleOpen = () => {
    music.current?.start();
    setOpened(true);
  };

  const handleTap = () => {
    if (finished) return; // never go past the 5th stage
    setClicks((c) => Math.min(c + 1, TOTAL_CLICKS));
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[radial-gradient(ellipse_at_top,#FCE4EC_0%,#FFF5F8_60%)] font-body text-ink">
      <FloatingHearts />
      <MusicPlayer ref={music} />

      <section className="relative z-10 mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-7 px-6 py-12 text-center">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.4em] text-rose">
          <Sparkles size={14} /> For Salma <Sparkles size={14} />
        </p>
        <MainHeart count={clicks} disabled={finished} onTap={handleTap} />
        <MessageStage clicks={clicks} />
        <Progress count={clicks} />
      </section>

      <AnimatePresence>
        {finished && <FinalSurprise key="final" onReplay={() => setClicks(0)} />}
        {!opened && <Intro key="intro" onOpen={handleOpen} />}
      </AnimatePresence>
    </main>
  );
}
