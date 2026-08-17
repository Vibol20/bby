"use client"

import { Gift, Heart } from "lucide-react"
import { config } from "@/lib/config"

export function WelcomeScreen({
  onOpen,
  closing,
}: {
  onOpen: () => void
  closing: boolean
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        closing ? "pointer-events-none scale-110 opacity-0" : "opacity-100"
      }`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-plum/70 via-plum/45 to-plum/75" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <p
          className="mb-4 flex items-center justify-center gap-2 text-primary-foreground/90"
          style={{ animation: "fade-up 1s ease-out 0.2s both" }}
        >
          <Heart className="h-4 w-4" fill="currentColor" /> A little surprise
        </p>

        <h1
          className="font-script text-6xl leading-none text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.45)] sm:text-7xl md:text-8xl"
          style={{ animation: "fade-up 1s ease-out 0.4s both" }}
        >
          Hey {config.name}
          <Heart
            className="ml-3 inline-block h-10 w-10 animate-heart-beat text-primary md:h-14 md:w-14"
            fill="currentColor"
          />
        </h1>

        <p
          className="mx-auto mt-6 max-w-md text-balance text-lg text-primary-foreground/90 drop-shadow md:text-xl"
          style={{ animation: "fade-up 1s ease-out 0.7s both" }}
        >
          Someone special made something just for you...
        </p>

        <button
          onClick={onOpen}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 animate-glow-pulse"
          style={{ animation: "fade-up 1s ease-out 1s both, glow-pulse 2.8s ease-in-out 1s infinite" }}
        >
          Open Your Surprise
          <Gift className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
