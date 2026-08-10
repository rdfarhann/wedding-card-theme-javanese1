import { Clock, MapPin } from "lucide-react";
import { invitationConfig } from "@/data/config";
import { Reveal } from "./reveal";

export function EventSchedule() {
  return (
    <section id="acara" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <Reveal className="text-center">
          <span className="font-body text-[11px] uppercase tracking-label text-maroon">
            Acara
          </span>
          <h2 className="mt-3 font-display text-3xl font-medium text-sogan-dark md:text-4xl">
            Rangkaian Acara
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {invitationConfig.schedule.map((event, i) => (
            <Reveal key={event.label} delay={0.1 * i}>
              <div className="border border-sogan/15 bg-white/60 p-8 text-center">
                <span className="font-body text-xs uppercase tracking-label text-gold">
                  {event.label}
                </span>
                <p className="mt-3 font-display text-2xl font-medium text-sogan-dark">
                  {event.date}
                </p>
                <p className="mt-2 flex items-center justify-center gap-2 font-body text-sm text-sogan-dark/70">
                  <Clock className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  {event.time}
                </p>
                <p className="mt-4 font-body text-sm font-medium text-sogan-dark">
                  {event.location}
                </p>
                <p className="mt-1 font-body text-xs text-sogan-dark/50">
                  {event.address}
                </p>
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 border border-sogan/20 px-5 py-2.5 font-body text-xs uppercase tracking-label text-sogan-dark/70 transition-colors hover:border-gold"
                >
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                  Lihat Peta
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
