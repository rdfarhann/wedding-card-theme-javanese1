# Undangan Digital Adat Jawa — Paket Bronze

Boilerplate Next.js App Router + TypeScript + Tailwind CSS untuk produk
undangan digital "Paket Bronze" (zero-database, pure static client-side).

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Untuk uji nama tamu dinamis, buka:
`http://localhost:3000/?to=Budi%20Santoso`

Tool generator link ada di: `http://localhost:3000/generator`
(halaman ini untuk klien, bukan bagian dari undangan yang dibagikan ke tamu).

## Struktur folder

```
app/
├── layout.tsx          → font (Playfair Display, Great Vibes, Poppins)
├── page.tsx             → merangkai semua section di dalam SiteShell
├── globals.css
└── generator/
    └── page.tsx          → WhatsApp Link Generator (internal/klien)

components/
├── site-shell.tsx        → orkestrasi opening, audio, nav, dekorasi
├── opening-screen.tsx     → cover cinematic, trigger musik
├── hero.tsx               → section pertama, baca nama tamu dari ?to=
├── couple-section.tsx     → profil kedua mempelai
├── event-schedule.tsx     → akad & resepsi
├── gallery-section.tsx    → galeri foto
├── quote-section.tsx      → quote/ayat
├── rsvp-section.tsx       → form RSVP → WhatsApp
├── closing-section.tsx    → pesan penutup
├── footer.tsx
├── navigation.tsx
├── scroll-progress.tsx
├── custom-cursor.tsx
├── audio-provider.tsx     → context pemutar musik
├── music-player.tsx       → tombol float play/pause
├── floating-elements.tsx  → dekorasi ambient (kembang)
└── reveal.tsx             → wrapper scroll fade-in

data/
└── config.ts             → SEMUA data personal ada di sini

public/
├── images/                → foto placeholder (ganti dengan foto asli)
└── music/                 → taruh musik latar di sini
```

## Alur halaman

1. **Opening screen** — foto cover, nama kedua mempelai, tombol "Buka Undangan" yang memicu musik dan membuka konten utama.
2. **Hero** — sapaan personal ke tamu (baca `?to=`), quote singkat.
3. **Mempelai** — foto & profil kedua mempelai.
4. **Acara** — kartu Akad & Resepsi dengan tombol "Lihat Peta".
5. **Galeri** — grid foto momen.
6. **Quote** — ayat/quote pembuka.
7. **RSVP** — form konfirmasi kehadiran ke WhatsApp.
8. **Penutup** — ucapan terima kasih.
9. **Footer**.

Semua section pakai `<Reveal>` (fade-in saat scroll) dan menghormati `prefers-reduced-motion`.

## Fitur yang sudah jalan (sesuai ketentuan Paket Bronze)

1. **Dynamic Guest Name** — `components/hero.tsx` baca `?to=` lewat
   `useSearchParams()`, dibungkus `<Suspense>` di `app/page.tsx` supaya
   tidak ada hydration mismatch. Kosong → fallback "Tamu Undangan"
   (bisa diubah di `data/config.ts` → `fallbackGuestName`).
2. **WhatsApp Link Generator** — `app/generator/page.tsx`. Klien input
   nama (1 baris/nama) + template pesan, sistem generate link
   `domain.com/?to=Nama` + tombol "Kirim WA" otomatis buka WhatsApp
   dengan pesan yang sudah terisi.
3. **RSVP via WhatsApp** — `components/rsvp-section.tsx`. Form Nama,
   Status Kehadiran, Jumlah Tamu, Ucapan/Doa → format rapi → buka
   `wa.me/{nomor-klien}?text=...` ke nomor yang diset di
   `data/config.ts` → `whatsappNumber`.
4. **Config terpusat** — semua teks, nama pengantin, tanggal, lokasi,
   nomor WA, musik, dan galeri ada di `data/config.ts`. Tidak ada teks
   personal hardcode di komponen.
5. **Aset via `next/image`** — semua foto pakai `<Image />` untuk
   lazy-loading otomatis.
6. **Animasi** — Framer Motion untuk fade-in reveal saat scroll
   (`components/reveal.tsx`), floating decorative elements, custom
   cursor desktop-only (bisa ditambahkan sesuai kebutuhan), dan
   `prefers-reduced-motion` dihormati di semua animasi.

## Yang perlu diisi klien

| Apa | Di mana |
|---|---|
| Nama pengantin, orang tua, tanggal, lokasi acara | `data/config.ts` |
| Nomor WhatsApp penerima RSVP | `data/config.ts` → `whatsappNumber` |
| Foto cover, mempelai, galeri | `public/images/` (ganti file, nama sama) |
| Musik latar | `public/music/gamelan-instrumental.mp3` |
| Quote/ayat pembuka | `data/config.ts` → `quote`, `quoteSource` |

## Catatan teknis

- `whatsappNumber` harus format internasional tanpa `+` dan tanpa `0`
  di depan, contoh: `6281234567890`.
- Halaman `/generator` sebaiknya tidak di-link dari navigasi publik —
  cukup dibagikan manual ke klien, atau nanti ditambah proteksi
  password sederhana di paket yang lebih tinggi.
"# wedding-card-theme-javanese1" 
"# wedding-card-theme-javanese1" 
