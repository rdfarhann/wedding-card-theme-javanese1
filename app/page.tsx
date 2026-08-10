import { Suspense } from "react";
import { SiteShell } from "@/components/site-shell";
import { Hero, HeroFallback } from "@/components/hero";
import { CoupleSection } from "@/components/couple-section";
import { EventSchedule } from "@/components/event-schedule";
import { GallerySection } from "@/components/gallery-section";
import { QuoteSection } from "@/components/quote-section";
import { RsvpSection } from "@/components/rsvp-section";
import { ClosingSection } from "@/components/closing-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <SiteShell>
      {/* useSearchParams() di dalam <Hero /> wajib dibungkus Suspense */}
      <Suspense fallback={<HeroFallback />}>
        <Hero />
      </Suspense>

      <CoupleSection />
      <EventSchedule />
      <GallerySection />
      <QuoteSection />
      <RsvpSection />
      <ClosingSection />
      <Footer />
    </SiteShell>
  );
}
