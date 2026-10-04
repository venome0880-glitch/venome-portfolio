import { useEffect, useState } from "react";

const lines = [
  "I build websites, servers & resilient systems.",
  "I ship fast UIs and calm infrastructure.",
  "I design software that stays out of the way.",
];

const Typewriter = () => {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = lines[i % lines.length];
    const speed = del ? 30 : 55;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((n) => n + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="font-mono text-sm md:text-base">
      <span className="text-accent">&gt;_</span> {text}
      <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-foreground animate-blink" />
    </span>
  );
};

export default Typewriter;
