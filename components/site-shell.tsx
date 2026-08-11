"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { AudioProvider } from "./audio-provider";
import { OpeningScreen } from "./opening-screen";
import { MusicPlayer } from "./music-player";
import { Navigation } from "./navigation";
import { ScrollProgress } from "./scroll-progress";
import { FloatingElements } from "./floating-elements";
import { CustomCursor } from "./custom-cursor";

export function SiteShell({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <AudioProvider>
      <CustomCursor />
      <Suspense fallback={null}>
        <OpeningScreen onOpen={() => setOpened(true)} />
      </Suspense>

      <div
        aria-hidden={!opened}
        className={`transition-opacity duration-700 ${
          opened ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ScrollProgress />
        <Navigation />
        <FloatingElements />
        <main>{children}</main>
      </div>

      <MusicPlayer />
    </AudioProvider>
  );
}
