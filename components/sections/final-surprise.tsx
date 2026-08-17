"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { config } from "@/lib/config"
import { Celebration } from "@/components/celebration"
import { useReveal } from "@/components/use-reveal"

export function FinalSurprise() {
  const { ref, visible } = useReveal({ threshold: 0.4 })
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!visible) return
    const timers = [
      window.setTimeout(() => setStage(1), 400),
      window.setTimeout(() => setStage(2), 2400),
      window.setTimeout(() => setStage(3), 4400),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [visible])

  return (
    <section
      id="surprise"
      ref={ref}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/finale.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-plum/70 via-plum/60 to-background/90" />

      <Celebration active={stage >= 3} />

      <div className="relative z-10 mx-auto max-w-2xl">
        <p
          className={`text-balance text-xl text-white drop-shadow transition-all duration-1000 sm:text-2xl ${
            stage >= 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {config.finale.intro}
        </p>

        <p
          className={`mt-6 text-balance text-2xl font-semibold text-white drop-shadow transition-all duration-1000 sm:text-3xl ${
            stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {config.finale.middle}
        </p>

        <div
          className={`mt-12 transition-all duration-1000 ${
            stage >= 3 ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-primary/40 blur-2xl animate-glow-pulse" />
            <Heart className="relative h-32 w-32 animate-heart-beat text-primary drop-shadow-2xl" fill="currentColor" />
          </div>

          <h2 className="mt-6 flex flex-wrap items-center justify-center gap-3 font-script text-5xl leading-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl">
            {config.finale.end}
            <Heart className="h-10 w-10 text-primary md:h-12 md:w-12" fill="currentColor" />
          </h2>
        </div>
      </div>
    </section>
  )
}
