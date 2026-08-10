import Image from "next/image";
import { invitationConfig, type PersonData } from "@/data/config";
import { Reveal } from "./reveal";

function PersonCard({
  person,
  align,
}: {
  person: PersonData;
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col items-center text-center ${
        align === "right" ? "md:items-end md:text-right" : "md:items-start md:text-left"
      }`}
    >
      <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl shadow-sm">
        <Image
          src={person.photo}
          alt={person.fullName}
          fill
          className="object-cover object-top"
          sizes="(min-width: 768px) 33vw, 80vw"
        />
      </div>
      <h3 className="mt-6 font-display text-3xl font-medium text-sogan-dark">
        {person.fullName}
      </h3>
      <p className="mt-2 max-w-xs font-body text-sm text-sogan-dark/60">
        {person.parents}
      </p>
      {person.instagram && (
        <p className="mt-2 font-body text-xs uppercase tracking-label text-gold">
          {person.instagram}
        </p>
      )}
    </div>
  );
}

export function CoupleSection() {
  return (
    <section id="mempelai" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <Reveal className="text-center">
          <span className="font-body text-[11px] uppercase tracking-label text-maroon">
            Mempelai
          </span>
          <h2 className="mt-3 font-display text-3xl font-medium text-sogan-dark md:text-4xl">
            Kedua Mempelai
          </h2>
          
          {/* Kalimat Salam & Doa Meminta Restu */}
          <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-sogan-dark/70">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. 
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan 
            Pernikahan Putra-Putri kami.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
          <Reveal delay={0.1}>
            <PersonCard person={invitationConfig.groom} align="left" />
          </Reveal>
          <Reveal delay={0.2}>
            <PersonCard person={invitationConfig.bride} align="right" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}