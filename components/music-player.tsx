"use client";

import { Music, VolumeX } from "lucide-react";
import { useAudioPlayback } from "./audio-provider";

export function MusicPlayer() {
  const { isPlaying, toggle } = useAudioPlayback();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
      aria-pressed={isPlaying}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-dark/85 text-ivory shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-transform duration-300 hover:scale-105 md:h-14 md:w-14"
    >
      <span
        className={`absolute inset-0 rounded-full border border-gold/40 ${
          isPlaying ? "animate-[spin_9s_linear_infinite]" : ""
        }`}
        aria-hidden="true"
      />
      {isPlaying ? (
        <Music className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
      ) : (
        <VolumeX className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
      )}
    </button>
  );
}
