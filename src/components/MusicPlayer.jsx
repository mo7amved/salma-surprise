import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Pause, Play } from "lucide-react";
import { MUSIC } from "../config";

const MusicPlayer = forwardRef(function MusicPlayer(_, ref) {
  const [playing, setPlaying] = useState(false);
  const holder = useRef(null);
  const yt = useRef(null);
  const audio = useRef(null);
  const wantPlay = useRef(false);
  const userPaused = useRef(false);
  const useYT = !!MUSIC.youtubeId;
  const available = useYT || !!MUSIC.audioSrc;

  useEffect(() => {
    if (!useYT) return;
    const init = () => {
      const el = document.createElement("div");
      holder.current.appendChild(el);
      yt.current = new window.YT.Player(el, {
        width: "200",
        height: "200",
        videoId: MUSIC.youtubeId,
        playerVars: { loop: 1, playlist: MUSIC.youtubeId, playsinline: 1, controls: 0 },
        events: {
          onReady: () => wantPlay.current && yt.current.playVideo(),
          onStateChange: (e) => setPlaying(e.data === 1),
        },
      });
    };
    if (window.YT?.Player) init();
    else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = init;
    }
    return () => {
      yt.current?.destroy?.();
      yt.current = null;
      if (holder.current) holder.current.innerHTML = "";
    };
  }, [useYT]);

  const play = () => {
    userPaused.current = false;
    wantPlay.current = true;
    yt.current?.playVideo?.();
    audio.current?.play().catch(() => setPlaying(false)); // autoplay blocked -> user can press play
  };
  const pause = () => {
    userPaused.current = true;
    wantPlay.current = false;
    yt.current?.pauseVideo?.();
    audio.current?.pause();
  };

  // called by App on the first heart tap (a real user gesture)
  useImperativeHandle(ref, () => ({ start: () => !userPaused.current && play() }));

  if (!available) return null;

  return (
    <>
      {useYT && <div ref={holder} aria-hidden className="pointer-events-none fixed -left-[300px] top-0 opacity-0" />}
      {MUSIC.audioSrc && (
        <audio ref={audio} src={MUSIC.audioSrc} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      )}
      <button
        type="button"
        onClick={playing ? pause : play}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/70 bg-white/50 py-1.5 pl-2 pr-3 text-rose shadow-[0_4px_20px_rgba(233,30,99,0.2)] backdrop-blur-xl transition active:scale-95 [padding-top:max(0.375rem,env(safe-area-inset-top))]"
      >
        <motion.span
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-blush/70"
        >
          <Music2 size={15} />
        </motion.span>
        {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
    </>
  );
});

export default MusicPlayer;
