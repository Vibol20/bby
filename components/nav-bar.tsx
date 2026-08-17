"use client"

import { useEffect, useState } from "react"
import { Heart, Menu, Music, X } from "lucide-react"
import { config } from "@/lib/config"

const links = [
  { label: "Home", href: "#top" },
  { label: "Memories", href: "#memories" },
  { label: "Reasons", href: "#reasons" },
  { label: "Our Story", href: "#story" },
  { label: "Letter", href: "#letter" },
  { label: "Video", href: "#video" },
  { label: "Surprise", href: "#surprise" },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
        scrolled ? "bg-background/80 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-script text-2xl text-primary">
          <Heart className="h-5 w-5 animate-heart-beat" fill="currentColor" />
          For {config.name}
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-foreground/70 transition hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#top"
          className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:scale-105 md:inline-flex"
        >
          <Music className="h-4 w-4" />
          Play Music
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-full p-2 text-primary md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur md:hidden">
          <ul className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-foreground/80 transition hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
