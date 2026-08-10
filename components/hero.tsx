"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { invitationConfig } from "@/data/config";
import { Reveal } from "./reveal";

// Interface untuk menyimpan hitungan mundur
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Hero() {
  const searchParams = useSearchParams();

  const rawGuest = searchParams.get("to")?.trim();
  const guestName = rawGuest || invitationConfig.fallbackGuestName;
  const mainSchedule = invitationConfig.schedule[0];

  // Logic Countdown Timer
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(invitationConfig.eventDateTime).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-sogan px-6 py-16 text-center text-ivory"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={invitationConfig.coverPhoto}
          alt="Latar belakang pernikahan"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-sogan/70 to-dark/85" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Teks Save The Date / Sub-heading */}
        <Reveal>
          <span className="font-body text-[11px] uppercase tracking-[0.25em] text-gold">
            Save The Date
          </span>
        </Reveal>

        {/* Frame Photo */}
        <div className="relative my-6 aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-2xl border border-gold/30 shadow-2xl md:max-w-[260px]">
          <Image
            src="/images/gallery-01.jpg"
            alt={`Foto Pengantin ${invitationConfig.groom.nickname} & ${invitationConfig.bride.nickname}`}
            fill
            priority
            className="object-cover object-top"
            sizes="(min-width: 768px) 260px, 220px"
          />
        </div>

        {/* Nama Pasangan */}
        <Reveal delay={0.1}>
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.05]">
            {invitationConfig.groom.nickname}
            <span className="mx-3 font-script text-gold md:mx-5">&amp;</span>
            {invitationConfig.bride.nickname}
          </h1>
        </Reveal>

        {/* Tanggal & Lokasi Pernikahan */}
        {mainSchedule && (
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60 md:w-12" />
                <p className="font-display text-lg tracking-wider text-ivory/95 md:text-xl">
                  {mainSchedule.date}
                </p>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60 md:w-12" />
              </div>

              <p className="mt-2 font-body text-[11px] uppercase tracking-[0.2em] text-gold/80">
                {mainSchedule.location}
              </p>
            </div>
          </Reveal>
        )}

        {/* Komponen Countdown Timer */}
        <Reveal delay={0.3}>
          <div className="mt-8 flex items-center justify-center gap-3 md:gap-5">
            <div className="flex flex-col items-center rounded-lg border border-gold/20 bg-dark/40 px-3 py-2 min-w-[56px] md:min-w-[64px] backdrop-blur-xs">
              <span className="font-display text-xl md:text-2xl font-semibold text-gold">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-body text-[9px] uppercase tracking-wider text-ivory/70">
                Hari
              </span>
            </div>

            <span className="font-display text-gold/60 text-lg md:text-xl">:</span>

            <div className="flex flex-col items-center rounded-lg border border-gold/20 bg-dark/40 px-3 py-2 min-w-[56px] md:min-w-[64px] backdrop-blur-xs">
              <span className="font-display text-xl md:text-2xl font-semibold text-gold">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-body text-[9px] uppercase tracking-wider text-ivory/70">
                Jam
              </span>
            </div>

            <span className="font-display text-gold/60 text-lg md:text-xl">:</span>

            <div className="flex flex-col items-center rounded-lg border border-gold/20 bg-dark/40 px-3 py-2 min-w-[56px] md:min-w-[64px] backdrop-blur-xs">
              <span className="font-display text-xl md:text-2xl font-semibold text-gold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="font-body text-[9px] uppercase tracking-wider text-ivory/70">
                Menit
              </span>
            </div>

            <span className="font-display text-gold/60 text-lg md:text-xl">:</span>

            <div className="flex flex-col items-center rounded-lg border border-gold/20 bg-dark/40 px-3 py-2 min-w-[56px] md:min-w-[64px] backdrop-blur-xs">
              <span className="font-display text-xl md:text-2xl font-semibold text-gold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="font-body text-[9px] uppercase tracking-wider text-ivory/70">
                Detik
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Indikator Scroll Down */}
      <div className="absolute bottom-6 z-10 flex flex-col items-center animate-bounce opacity-70">
        <span className="font-body text-[10px] uppercase tracking-widest text-ivory/60">
          Scroll
        </span>
        <svg 
          className="mt-1 h-4 w-4 text-gold" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// Fallback untuk Suspense
export function HeroFallback() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-sogan text-ivory">
      <span className="font-body text-xs uppercase tracking-label text-gold/70">
        Memuat undangan...
      </span>
    </section>
  );
}