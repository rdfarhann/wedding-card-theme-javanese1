"use client";

import { Flower2 } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingPetal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const PETAL_COUNT = 6;

// Reflavored dari "floating hearts" jadi "floating petals" (kembang) —
// lebih sesuai nuansa adat Jawa. Ganti ikon Flower2 dengan Heart dari
// lucide-react bila Anda tetap ingin versi hati.
export function FloatingElements() {
  const [petals, setPetals] = useState<FloatingPetal[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) return;

    const generated = Array.from({ length: PETAL_COUNT }).map((_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      size: 14 + Math.random() * 14,
      duration: 18 + Math.random() * 10,
      delay: Math.random() * 16,
    }));
    setPetals(generated);
  }, []);

  if (reducedMotion || petals.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <Flower2
          key={p.id}
          className="absolute bottom-0 animate-drift text-gold/50 blur-[0.5px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
