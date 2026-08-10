import Image from "next/image";
import { invitationConfig } from "@/data/config";
import { Reveal } from "./reveal";

export function GallerySection() {
  return (
    <section id="galeri" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <Reveal className="text-center">
          <span className="font-body text-[11px] uppercase tracking-label text-maroon">
            Galeri
          </span>
          <h2 className="mt-3 font-display text-3xl font-medium text-sogan-dark md:text-4xl">
            Momen Kami
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {invitationConfig.gallery.map((photo, i) => (
            <Reveal key={photo.id} delay={0.05 * (i % 4)}>
              <figure className="group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={photo.image}
                    alt={photo.caption ?? ""}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-cinematic group-hover:scale-105"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
                {photo.caption && (
                  <figcaption className="mt-2 font-body text-xs text-sogan-dark/50">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}