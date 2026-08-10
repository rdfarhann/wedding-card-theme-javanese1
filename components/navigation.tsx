"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { invitationConfig, navigationLinks } from "@/data/config";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? "bg-ivory/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <span className="font-script text-2xl text-sogan-dark">
          {invitationConfig.groom.nickname} &amp; {invitationConfig.bride.nickname}
        </span>

        <ul className="hidden items-center gap-10 md:flex">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavigate(link.href)}
                className="group relative font-body text-[11px] uppercase tracking-label text-sogan-dark/70 transition-colors duration-300 hover:text-maroon"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-maroon transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="text-sogan-dark md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-1 bg-ivory/95 px-6 pb-6 backdrop-blur-sm md:hidden">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavigate(link.href)}
                className="w-full py-3 text-left font-body text-xs uppercase tracking-label text-sogan-dark/70"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
