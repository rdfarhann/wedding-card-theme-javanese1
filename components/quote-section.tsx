import { invitationConfig } from "@/data/config";
import { Reveal } from "./reveal";

export function QuoteSection() {
  return (
    <section className="bg-sogan py-16 text-ivory md:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
        {/* Teks Arab Surat */}
        <Reveal duration={1}>
          <p 
            className="font-serif text-lg leading-loose text-gold md:text-2xl" 
            dir="rtl"
          >
            {invitationConfig.surahArabic}
          </p>
        </Reveal>

        {/* Terjemahan (Ukuran Huruf Diperkecil) */}
        <Reveal delay={0.15}>
          <p className="mt-5 font-body text-xs italic leading-relaxed text-ivory/85 md:text-sm">
            &ldquo;{invitationConfig.quote}&rdquo;
          </p>
        </Reveal>

        {/* Sumber Ayat */}
        <Reveal delay={0.25}>
          <p className="mt-4 font-body text-[10px] uppercase tracking-widest text-gold md:text-xs">
            — {invitationConfig.quoteSource}
          </p>
        </Reveal>
      </div>
    </section>
  );
}