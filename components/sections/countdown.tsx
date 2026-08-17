"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { config } from "@/lib/config"
import { Celebration } from "@/components/celebration"
import { useReveal } from "@/components/use-reveal"

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: number): { time: TimeLeft; done: boolean } {
  const diff = target - Date.now()
  if (diff <= 0) {
    return { time: { days: 0, hours: 0, minutes: 0, seconds: 0 }, done: true }
  }
  return {
    time: {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    },
    done: false,
  }
}

export function Countdown() {
  const { ref, visible } = useReveal()
  const target = new Date(config.birthday).getTime()
  const [state, setState] = useState<{ time: TimeLeft; done: boolean } | null>(null)

  useEffect(() => {
    setState(getTimeLeft(target))
    const id = window.setInterval(() => setState(getTimeLeft(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  const done = state?.done ?? false

  return (
    <section id="countdown" className="relative overflow-hidden px-6 py-24 sm:py-28">
      <Celebration active={done} />

      <div
        ref={ref}
        className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl text-center`}
      >
        <h2 className="flex items-center justify-center gap-3 text-balance font-script text-4xl text-primary sm:text-5xl md:text-6xl">
          <span>Counting Down To Your Special Day</span>
          <Heart className="h-7 w-7 shrink-0 animate-heart-beat text-primary" fill="currentColor" />
        </h2>

        {done ? (
          <p
            className="mt-10 text-balance font-script text-4xl text-primary sm:text-5xl"
            style={{ animation: "heart-beat 1.6s ease-in-out infinite" }}
          >
            It&apos;s finally here — Happy Birthday, {config.name}!
          </p>
        ) : (
          <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
            {(
              [
                ["Days", state?.time.days],
                ["Hours", state?.time.hours],
                ["Minutes", state?.time.minutes],
                ["Seconds", state?.time.seconds],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="flex min-w-[72px] flex-col items-center rounded-2xl bg-card px-5 py-4 shadow-md ring-1 ring-border sm:min-w-[96px] sm:px-6 sm:py-5"
              >
                <span className="font-script text-4xl text-primary tabular-nums sm:text-5xl">
                  {String(value ?? 0).padStart(2, "0")}
                </span>
                <span className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
