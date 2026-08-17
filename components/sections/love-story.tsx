"use client"

import { Heart } from "lucide-react"
import { config } from "@/lib/config"
import { SectionHeading } from "@/components/section-heading"
import { useReveal } from "@/components/use-reveal"

export function LoveStory() {
  return (
    <section id="story" className="relative px-6 py-24 sm:py-28">
      <SectionHeading>Our Love Story</SectionHeading>

      <div className="relative mx-auto mt-16 max-w-2xl">
        {/* Vertical line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-4 top-0 w-0.5 bg-gradient-to-b from-primary/70 via-primary/50 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />

        <ol className="space-y-10">
          {config.timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof config.timeline)[number]
  index: number
}) {
  const { ref, visible } = useReveal()
  const left = index % 2 === 0
  return (
    <li
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} relative flex items-start gap-5 sm:w-1/2 ${
        left ? "sm:pr-10" : "sm:ml-auto sm:flex-row-reverse sm:pl-10"
      }`}
    >
      {/* Node */}
      <span
        className={`relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md sm:absolute sm:top-1 sm:mt-0 ${
          left ? "sm:right-[-2.55rem]" : "sm:left-[-2.55rem]"
        }`}
      >
        <Heart className="h-4 w-4" fill="currentColor" />
      </span>

      <div
        className={`flex-1 rounded-2xl bg-card p-5 shadow-md ring-1 ring-border ${
          left ? "sm:text-right" : "sm:text-left"
        }`}
      >
        <h3 className="flex items-center gap-2 text-lg font-semibold text-primary sm:justify-start">
          <span className={left ? "sm:order-2 sm:ml-auto" : ""}>{item.title}</span>
          <span aria-hidden className={left ? "sm:order-1" : ""}>
            {item.emoji}
          </span>
        </h3>
        <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
          {item.text}
        </p>
      </div>
    </li>
  )
}
