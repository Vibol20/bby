"use client"

import { useState } from "react"
import { Heart, Mail } from "lucide-react"
import { config } from "@/lib/config"
import { SectionHeading } from "@/components/section-heading"
import { useReveal } from "@/components/use-reveal"

export function LoveLetter() {
  const { ref, visible } = useReveal()
  const [open, setOpen] = useState(false)

  return (
    <section id="letter" className="relative px-6 py-24 sm:py-28">
      <SectionHeading className="flex items-center justify-center gap-3">
        <span>A Letter For {config.name}</span>
        <Mail className="h-7 w-7 shrink-0 text-primary" />
      </SectionHeading>

      <div
        ref={ref}
        className={`reveal ${visible ? "is-visible" : ""} mx-auto mt-14 flex max-w-xl flex-col items-center`}
      >
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="group relative"
            aria-label="Open the letter"
          >
            {/* Envelope */}
            <div className="relative h-52 w-80 max-w-[85vw] overflow-hidden rounded-xl bg-primary shadow-2xl transition-transform duration-300 group-hover:scale-105">
              {/* Body */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-plum" />
              {/* Flap */}
              <div
                aria-hidden
                className="absolute left-0 top-0 h-0 w-0 border-l-[160px] border-r-[160px] border-t-[104px] border-l-transparent border-r-transparent border-t-[color:var(--blush)] transition-transform duration-500 group-hover:-translate-y-1"
                style={{ borderTopColor: "var(--blush)" }}
              />
              {/* Seal */}
              <span className="absolute left-1/2 top-[86px] z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-primary-foreground shadow-lg animate-heart-beat">
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              </span>
            </div>
            <p className="mt-6 text-center text-foreground/70">Tap to open your letter</p>
          </button>
        ) : (
          <div className="w-full" style={{ animation: "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both" }}>
            <article className="relative rounded-2xl bg-card p-7 text-left shadow-2xl ring-1 ring-border sm:p-10">
              <div
                aria-hidden
                className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              />
              <p className="font-script text-3xl text-primary">{config.letter.greeting}</p>

              <div className="mt-5 space-y-4 text-pretty leading-relaxed text-foreground/85">
                {config.letter.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <p className="mt-6 flex items-center gap-2 font-semibold text-primary">
                {config.letter.closing}
              </p>
              <p className="mt-1 italic text-foreground/80">{config.letter.signoffLine}</p>

              <div className="mt-8 text-right">
                <p className="text-foreground/70">{config.letter.signature}</p>
                <p className="font-script text-2xl text-primary">{config.letter.signatureName}</p>
              </div>
            </article>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:scale-105 active:scale-95"
              >
                Close Letter
                <Heart className="h-4 w-4" fill="currentColor" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
