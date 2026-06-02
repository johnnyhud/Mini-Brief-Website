"use client";

import { useEffect, useState } from "react";

type Options = {
  charsPerTick?: number;
  msPerTick?: number;
};

export function useStreamingText(target: string, active: boolean, opts: Options = {}) {
  const { charsPerTick = 1, msPerTick = 22 } = opts;
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setText("");
      setDone(false);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(target);
      setDone(true);
      return;
    }

    setText("");
    setDone(false);

    let i = 0;
    let timer = 0;
    const step = () => {
      i = Math.min(i + charsPerTick, target.length);
      setText(target.slice(0, i));
      if (i < target.length) {
        timer = window.setTimeout(step, msPerTick);
      } else {
        setDone(true);
      }
    };
    timer = window.setTimeout(step, msPerTick);

    return () => window.clearTimeout(timer);
  }, [active, target, charsPerTick, msPerTick]);

  return { text, done };
}
