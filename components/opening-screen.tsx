"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation"; 
import { useState } from "react";
import { invitationConfig } from "@/data/config";
import { useAudioPlayback } from "./audio-provider";

export function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { play } = useAudioPlayback();
  const shouldReduceMotion = useReducedMotion();
  const searchParams = useSearchParams();

  // Next.js searchParams.get() sudah ter-decode secara otomatis
  const rawGuest = searchParams.get("to")?.trim();
  const guestName = rawGuest || invitationConfig.fallbackGuestName;

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    play();
    window.setTimeout(() => {
      setIsVisible(false);
      onOpen();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-dark py-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Layer (Hanya Foto Cover + Overlay Dark) */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.08, filter: "blur(16px)", opacity: 0 }}
            animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 2.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={invitationConfig.coverPhoto}
              alt="Latar Belakang Undangan"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-dark/70" />
          </motion.div>

          {/* Content Layer */}
          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center text-ivory"
            animate={isOpening ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Frame Foto Pengantin */}
            <div className="relative mb-6 aspect-[4/5] w-36 overflow-hidden rounded-lg border border-gold/30 shadow-xl md:w-44">
              <Image
                src="/images/gallery-01.jpg"
                alt={`Foto Pengantin ${invitationConfig.groom.nickname} & ${invitationConfig.bride.nickname}`}
                fill
                priority
                className="object-cover object-top"
                sizes="(min-width: 768px) 176px, 144px"
              />
            </div>

            <span className="mb-3 font-body text-[11px] uppercase tracking-label text-gold">
              The Wedding Of
            </span>

            <h1 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-medium leading-[1.05]">
              {invitationConfig.groom.nickname}
              <span className="mx-3 font-script text-gold md:mx-5">&amp;</span>
              {invitationConfig.bride.nickname}
            </h1>

            <p className="mt-3 font-body text-xs uppercase tracking-label text-ivory/60">
              {invitationConfig.schedule[0]?.date}
            </p>

            <div className="mt-8 border border-gold/30 px-8 py-6 backdrop-blur-sm">
              <p className="font-body text-[11px] uppercase tracking-label text-ivory/70">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <p className="mt-3 font-script text-3xl text-gold md:text-4xl">
                {guestName}
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpen}
              className="group relative mt-8 flex items-center gap-3 border border-ivory/30 px-8 py-4 font-body text-xs uppercase tracking-label text-ivory transition-all duration-500 hover:border-gold hover:text-gold"
            >
              <span>Buka Undangan</span>
              <span
                className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}