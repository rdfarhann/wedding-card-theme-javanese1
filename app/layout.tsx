import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Poppins } from "next/font/google";
import { invitationConfig } from "@/data/config";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Undangan Pernikahan ${invitationConfig.groom.nickname} & ${invitationConfig.bride.nickname}`,
  description: "Undangan pernikahan digital.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${greatVibes.variable} ${poppins.variable}`}
    >
      <body className="bg-ivory font-body text-sogan-dark antialiased">
        {children}
      </body>
    </html>
  );
}
