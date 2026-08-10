"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { invitationConfig } from "@/data/config";
import { Reveal } from "./reveal";

type AttendanceStatus = "Hadir" | "Tidak Hadir";

const attendanceOptions: AttendanceStatus[] = ["Hadir",  "Tidak Hadir"];

export function RsvpSection() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceStatus>("Hadir");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Mohon isi nama terlebih dahulu.");
      return;
    }
    setError("");

    const rawMessage = [
      "Assalamu'alaikum,",
      "Saya ingin konfirmasi kehadiran pada acara pernikahan:",
      "",
      `Nama: ${name.trim()}`,
      `Kehadiran: ${attendance}`,
      `Jumlah Tamu: ${guestCount}`,
      `Ucapan/Doa: ${message.trim() || "-"}`,
    ].join("\n");

    const waUrl = `https://wa.me/${invitationConfig.whatsappNumber}?text=${encodeURIComponent(
      rawMessage
    )}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="rsvp" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-xl px-6 md:px-12">
        <Reveal>
          <span className="font-body text-[11px] uppercase tracking-label text-maroon">
            RSVP
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-3xl font-medium text-sogan-dark md:text-4xl">
            Konfirmasi Kehadiran
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-3 font-body text-sm text-sogan-dark/60">
            Mohon konfirmasikan kehadiran Anda. Pesan akan dikirim langsung
            melalui WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-10 space-y-6" noValidate>
            <div>
              <label
                htmlFor="rsvp-name"
                className="mb-2 block font-body text-xs uppercase tracking-label text-sogan-dark/70"
              >
                Nama
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap Anda"
                className="w-full border-b border-sogan/30 bg-transparent py-2 font-body text-base text-sogan-dark placeholder:text-sogan-dark/30 focus:border-gold focus:outline-none"
              />
            </div>

            <fieldset>
              <legend className="mb-2 font-body text-xs uppercase tracking-label text-sogan-dark/70">
                Status Kehadiran
              </legend>
              <div className="flex flex-wrap gap-3">
                {attendanceOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAttendance(option)}
                    aria-pressed={attendance === option}
                    className={`border px-4 py-2 font-body text-xs uppercase tracking-label transition-colors duration-300 ${
                      attendance === option
                        ? "border-gold bg-gold/10 text-maroon"
                        : "border-sogan/20 text-sogan-dark/60 hover:border-gold/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="rsvp-guest-count"
                className="mb-2 block font-body text-xs uppercase tracking-label text-sogan-dark/70"
              >
                Jumlah Tamu
              </label>
              <input
                id="rsvp-guest-count"
                type="number"
                min={1}
                max={10}
                value={guestCount}
                onChange={(e) =>
                  setGuestCount(Math.max(1, Number(e.target.value) || 1))
                }
                className="w-24 border-b border-sogan/30 bg-transparent py-2 font-body text-base text-sogan-dark focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="rsvp-message"
                className="mb-2 block font-body text-xs uppercase tracking-label text-sogan-dark/70"
              >
                Ucapan &amp; Doa
              </label>
              <textarea
                id="rsvp-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                className="w-full resize-none border border-sogan/20 bg-white/40 p-3 font-body text-base text-sogan-dark placeholder:text-sogan-dark/30 focus:border-gold focus:outline-none"
              />
            </div>

            {error && (
              <p role="alert" className="font-body text-sm text-maroon">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 bg-sogan px-6 py-4 font-body text-xs uppercase tracking-label text-ivory transition-colors duration-300 hover:bg-sogan-dark"
            >
              <Send className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Kirim via WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
