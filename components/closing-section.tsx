import { invitationConfig } from "@/data/config";
import { Reveal } from "./reveal";

export function ClosingSection() {
  return (
    <section className="bg-ivory py-28 text-center md:py-36">
      <div className="mx-auto max-w-xl px-6 md:px-12">
        <Reveal>
          <p className="font-display text-2xl font-medium italic text-sogan-dark md:text-3xl">
            {invitationConfig.closing.heading}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 font-body text-sm text-sogan-dark/60 md:text-base">
            {invitationConfig.closing.body}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-10 font-script text-4xl text-gold">
            {invitationConfig.groom.nickname} &amp; {invitationConfig.bride.nickname}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
