"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[70] h-3 w-3 rounded-full border border-gold/70 transition-opacity duration-300"
      style={{
        transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0)`,
        opacity: visible ? 1 : 0,
        transitionProperty: "opacity",
      }}
      aria-hidden="true"
    />
  );
}
