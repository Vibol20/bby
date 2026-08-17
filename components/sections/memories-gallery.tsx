"use client"

import { Camera, Heart } from "lucide-react"
import { config } from "@/lib/config"
import { SectionHeading } from "@/components/section-heading"
import { useReveal } from "@/components/use-reveal"

export function MemoriesGallery() {
  return (
    <section id="memories" className="relative px-6 py-24 sm:py-28">
      <SectionHeading className="flex items-center justify-center gap-3">
        <span>Our Beautiful Memories</span>
        <Camera className="h-8 w-8 shrink-0 text-primary" />
      </SectionHeading>

      <p className="mt-4 text-center text-foreground/70">
        A few moments I never want to forget.
      </p>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {config.memories.map((m, i) => (
          <MemoryCard key={i} memory={m} index={i} />
        ))}
      </div>
    </section>
  )
}

function MemoryCard({
  memory,
  index,
}: {
  memory: (typeof config.memories)[number]
  index: number
}) {
  const { ref, visible } = useReveal()
  return (
    <figure
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} group`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
        <div className="aspect-[4/5] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={memory.src || "/placeholder.svg"}
            alt={memory.caption}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Heart
          className="absolute right-3 top-3 h-6 w-6 translate-y-2 text-primary opacity-0 drop-shadow transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          fill="currentColor"
        />
      </div>
      <figcaption className="mt-4 text-center">
        <p className="flex items-center justify-center gap-1.5 font-semibold text-foreground">
          {memory.caption}
          <Heart className="h-3.5 w-3.5 text-primary" fill="currentColor" />
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{memory.date}</p>
      </figcaption>
    </figure>
  )
}
