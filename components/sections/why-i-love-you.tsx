"use client"

import { config } from "@/lib/config"
import { SectionHeading } from "@/components/section-heading"
import { useReveal } from "@/components/use-reveal"

export function WhyILoveYou() {
  return (
    <section id="reasons" className="relative px-6 py-24 sm:py-28">
      <SectionHeading>Why I Love You</SectionHeading>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {config.reasons.map((r, i) => (
          <ReasonCard key={i} reason={r} index={i} />
        ))}
      </div>
    </section>
  )
}

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof config.reasons)[number]
  index: number
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} group rounded-2xl bg-card p-6 text-center shadow-md ring-1 ring-border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:ring-primary/40`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl transition-transform duration-500 group-hover:scale-110">
        <span aria-hidden>{reason.emoji}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground">{reason.title}</h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{reason.text}</p>
    </div>
  )
}
