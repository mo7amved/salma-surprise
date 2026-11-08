import { useEffect, useMemo, useState } from "react";

export function useTypewriter(text, speed = 60, delay = 0) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(0);
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setN((v) => {
          if (v >= chars.length) {
            clearInterval(interval);
            return v;
          }
          return v + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [chars, speed, delay]);

  return { text: chars.slice(0, n).join(""), done: n >= chars.length };
}
