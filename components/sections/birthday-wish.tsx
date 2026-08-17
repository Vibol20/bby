"use client"

import { Cake, Heart } from "lucide-react"
import { config } from "@/lib/config"
import { useReveal } from "@/components/use-reveal"

export function BirthdayWish() {
  const { ref, visible } = useReveal()

  return (
    <section id="wish" className="relative px-6 py-24 sm:py-28">
      <div
        ref={ref}
        className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl text-center`}
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          <Cake className="h-7 w-7 text-primary" />
          <Heart className="h-9 w-9 animate-heart-beat text-primary" fill="currentColor" />
          <Cake className="h-7 w-7 text-primary" />
        </div>

        <h2 className="text-balance font-script text-5xl leading-tight text-primary sm:text-6xl md:text-7xl">
          {config.wish.title}
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/80 md:text-xl">
          {config.wish.message}
        </p>

        <div className="mt-10 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <Heart
              key={i}
              className="h-5 w-5 text-primary/70"
              fill="currentColor"
              style={{ animation: `heart-beat 1.6s ease-in-out ${i * 0.25}s infinite` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
