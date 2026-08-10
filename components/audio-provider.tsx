"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { invitationConfig } from "@/data/config";

interface AudioContextValue {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

const AudioPlaybackContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Browser mungkin memblokir autoplay sebelum ada interaksi pengguna.
    // Gagal secara diam-diam — tombol manual tetap tersedia.
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  return (
    <AudioPlaybackContext.Provider value={{ isPlaying, play, pause, toggle }}>
      {children}
      {/* Ganti file ini dengan musik pilihan Anda (instrumental gamelan disarankan) */}
      <audio ref={audioRef} src={invitationConfig.music} loop preload="none" />
    </AudioPlaybackContext.Provider>
  );
}

export function useAudioPlayback() {
  const ctx = useContext(AudioPlaybackContext);
  if (!ctx) {
    throw new Error("useAudioPlayback must be used within AudioProvider");
  }
  return ctx;
}
