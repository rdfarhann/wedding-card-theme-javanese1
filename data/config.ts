// ─────────────────────────────────────────────────────────
// EDIT FILE INI untuk personalisasi seluruh undangan.
// Semua nama, tanggal, lokasi, nomor WA, dan teks ada di sini —
// komponen tidak boleh menyimpan teks hardcode.
// ─────────────────────────────────────────────────────────

export interface PersonData {
  fullName: string;
  nickname: string;
  parents: string; // contoh: "Putra pertama dari Bapak ... & Ibu ..."
  instagram?: string;
  photo: string;
}

export interface EventSchedule {
  label: string; // "Akad Nikah" | "Resepsi"
  date: string; // ditampilkan apa adanya, contoh: "17 Oktober 2026"
  time: string; // contoh: "08.00 - 10.00 WIB"
  location: string;
  address: string;
  mapsUrl: string;
}

export interface GalleryPhoto {
  id: number;
  image: string;
  caption?: string;
}

export const invitationConfig = {
  groom: {
    fullName: "Raden Bagus Wicaksono",
    nickname: "Bagus",
    parents: "Putra pertama dari Bapak Slamet Riyadi & Ibu Sri Wahyuni",
    instagram: "@bagus.wicaksono",
    photo: "/images/groom.jpg",
  } satisfies PersonData,

  bride: {
    fullName: "Roro Ayu Kusumawardhani",
    nickname: "Ayu",
    parents: "Putri kedua dari Bapak Hariyanto & Ibu Endang Lestari",
    instagram: "@ayu.kusuma",
    photo: "/images/bride.jpg",
  } satisfies PersonData,
 

  // Dipakai untuk hitung mundur / urutan tanggal (format ISO)
  eventDateTime: "2026-10-17T08:00:00",

  schedule: [
    {
      label: "Akad Nikah",
      date: "17 Oktober 2026",
      time: "08.00 – 10.00 WIB",
      location: "Kediaman Mempelai Wanita",
      address: "Jl. Kenanga No.12, Nanggulan, Maguwoharjo, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281",
      mapsUrl: "https://maps.app.goo.gl/YnNohBJ4826GPiyf8",
    },
    {
      label: "Resepsi",
      date: "17 Oktober 2026",
      time: "11.00 – 14.00 WIB",
      location: "Gedung Pendopo Agung",
      address: "Jl. Laksda Adisucipto No.62, Ambarukmo, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281",
      mapsUrl: "https://maps.app.goo.gl/VkCvnpnHhLaTBgzr6",
    },
  ] satisfies EventSchedule[],

  // Nomor WhatsApp TUJUAN untuk menerima RSVP.
  // Format: kode negara tanpa "+" dan tanpa angka 0 di depan. Contoh: 6281234567890
  whatsappNumber: "6281234567890",

  surahArabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  quote:
    "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.",
  quoteSource: "QS. Ar-Rum: 21",

  // Ganti file ini dengan musik instrumental pilihan Anda (gamelan/instrumental disarankan)
  music: "/music/banda-neira.mp3",

  gallery: [
    { id: 1, image: "/images/gallery-01.jpg", caption: "Prosesi lamaran" },
    { id: 2, image: "/images/gallery-02.jpg", caption: "Sesi foto pra-nikah" },
    { id: 3, image: "/images/gallery-03.jpg", caption: "Sesi foto pra-nikah" },
    { id: 4, image: "/images/gallery-04.jpg", caption: "Momen kebersamaan" },
  ] satisfies GalleryPhoto[],

  // Fallback saat parameter ?to= kosong atau tidak ada
  fallbackGuestName: "Tamu Undangan",

  coverPhoto: "/images/cover.jpg",

  closing: {
    heading:
      "Merupakan suatu kebahagiaan dan kehormatan bagi kami",
    body: "apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.",
  },

  // Dipakai halaman generator untuk menyusun link undangan.
  // Kosongkan untuk otomatis memakai domain saat ini (window.location.origin).
  baseUrl: "",
} as const;

export const navigationLinks = [
  { label: "Mempelai", href: "#mempelai" },
  { label: "Acara", href: "#acara" },
  { label: "Galeri", href: "#galeri" },
  { label: "RSVP", href: "#rsvp" },
] as const;
