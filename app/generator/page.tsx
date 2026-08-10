"use client";

import { useState } from "react";
import { Copy, Send, Wand2 } from "lucide-react";
import { invitationConfig } from "@/data/config";

interface GeneratedLink {
  name: string;
  link: string;
  waLink: string;
}

const DEFAULT_TEMPLATE = [
  "Assalamu’alaikum Wr. Wb.",
  "",
  "Yth. Bapak/Ibu/Saudara/i {nama},",
  "",
  "Tanpa mengurangi rasa hormat, sehubungan dengan digelarnya acara pernikahan kami, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu.",
  "",
  "Detail informasi dan lokasi acara dapat diakses melalui link undangan digital berikut:",
  "{link}",
  "",
  "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.",
  "",
  "Atas perhatian dan kehadiran Bapak/Ibu/Saudara/i, kami ucapkan terima kasih.",
  "",
  "Wassalamu’alaikum Wr. Wb.",
].join("\n");

export default function GeneratorPage() {
  const [namesInput, setNamesInput] = useState("");
  const [messageTemplate, setMessageTemplate] = useState(DEFAULT_TEMPLATE);
  const [results, setResults] = useState<GeneratedLink[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const handleGenerate = () => {
    const baseUrl =
      invitationConfig.baseUrl ||
      (typeof window !== "undefined" ? window.location.origin : "");

    const names = namesInput
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);

    const generated: GeneratedLink[] = names.map((name) => {
      const link = `${baseUrl}/?to=${encodeURIComponent(name)}`;
      const text = messageTemplate
        .replaceAll("{nama}", name)
        .replaceAll("{link}", link);

      return {
        name,
        link,
        waLink: `https://wa.me/?text=${encodeURIComponent(text)}`,
      };
    });

    setResults(generated);
  };

  const handleCopy = async (name: string, link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedName(name);
      window.setTimeout(() => setCopiedName(null), 1500);
    } catch {
      // Clipboard API bisa gagal di browser lama / non-HTTPS — abaikan dengan aman.
    }
  };

  return (
    <main className="min-h-screen bg-cream px-6 py-16 text-sogan-dark md:px-12">
      <div className="mx-auto max-w-3xl">
        <span className="font-body text-[11px] uppercase tracking-label text-maroon">
          Internal Tool
        </span>
        <h1 className="mt-3 font-display text-3xl font-medium md:text-4xl">
          WhatsApp Link Generator
        </h1>
        <p className="mt-3 max-w-xl font-body text-sm text-sogan-dark/60">
          Halaman ini untuk penggunaan internal klien saja — bukan bagian dari
          undangan yang dibagikan ke tamu. Masukkan daftar nama tamu (satu
          nama per baris) untuk membuat link undangan personal secara
          otomatis.
        </p>

        <div className="mt-10 space-y-8">
          <div>
            <label
              htmlFor="guest-names"
              className="mb-2 block font-body text-xs uppercase tracking-label text-sogan-dark/70"
            >
              Daftar Nama Tamu (1 nama per baris)
            </label>
            <textarea
              id="guest-names"
              value={namesInput}
              onChange={(e) => setNamesInput(e.target.value)}
              rows={8}
              placeholder={"Bapak Hariyanto\nIbu Endang Lestari\nKeluarga Besar Wicaksono"}
              className="w-full resize-none border border-sogan/20 bg-white p-3 font-body text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="message-template"
              className="mb-2 block font-body text-xs uppercase tracking-label text-sogan-dark/70"
            >
              Template Pesan Pengantar
            </label>
            <p className="mb-2 font-body text-xs text-sogan-dark/50">
              Gunakan <code className="rounded bg-sogan/10 px-1">{"{nama}"}</code> dan{" "}
              <code className="rounded bg-sogan/10 px-1">{"{link}"}</code> —
              keduanya akan diganti otomatis per tamu.
            </p>
            <textarea
              id="message-template"
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              rows={12}
              className="w-full resize-none border border-sogan/20 bg-white p-3 font-body text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!namesInput.trim()}
            className="flex items-center gap-2 bg-sogan px-6 py-4 font-body text-xs uppercase tracking-label text-ivory transition-colors duration-300 hover:bg-sogan-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Wand2 className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Buat Link Undangan
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-12">
            <h2 className="font-body text-xs uppercase tracking-label text-sogan-dark/70">
              {results.length} Link Dibuat
            </h2>

            <ul className="mt-4 divide-y divide-sogan/10 border border-sogan/10 bg-white">
              {results.map((result) => (
                <li
                  key={result.name}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-body text-sm font-medium text-sogan-dark">
                      {result.name}
                    </p>
                    <p className="truncate font-body text-xs text-sogan-dark/50">
                      {result.link}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(result.name, result.link)}
                      className="flex items-center gap-1.5 border border-sogan/20 px-3 py-2 font-body text-xs uppercase tracking-label text-sogan-dark/70 transition-colors hover:border-gold"
                    >
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {copiedName === result.name ? "Tersalin" : "Salin"}
                    </button>

                    <a
                      href={result.waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-sogan px-3 py-2 font-body text-xs uppercase tracking-label text-ivory transition-colors hover:bg-sogan-dark"
                    >
                      <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Kirim WA
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}