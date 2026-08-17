"use client"

import { useMemo } from "react"
import { Heart } from "lucide-react"

type Particle = {
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
  kind: "heart" | "sparkle" | "petal"
}

function seeded(count: number, salt: number): Particle[] {
  const kinds: Particle["kind"][] = ["heart", "sparkle", "petal"]
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => {
      const x = Math.sin((i + 1) * (n + salt) * 9973.13) * 10000
      return x - Math.floor(x)
    }
    return {
      left: r(1) * 100,
      size: 10 + r(2) * 22,
      duration: 9 + r(3) * 12,
      delay: r(4) * 12,
      opacity: 0.25 + r(5) * 0.5,
      kind: kinds[Math.floor(r(6) * kinds.length)],
    }
  })
}

/**
 * A fixed, non-interactive layer of floating hearts, petals and sparkles
 * drifting up the screen behind the content.
 */
export function FloatingHearts({ count = 22 }: { count?: number }) {
  const particles = useMemo(() => seeded(count, 3.7), [count])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-40px]"
          style={{
            left: `${p.left}%`,
            // custom props consumed by the float-up keyframes
            ["--s" as string]: 1,
            ["--o" as string]: p.opacity,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.kind === "heart" && (
            <Heart
              className="text-primary/70"
              style={{ width: p.size, height: p.size }}
              fill="currentColor"
            />
          )}
          {p.kind === "petal" && (
            <span
              className="block rounded-full bg-primary/40"
              style={{ width: p.size, height: p.size * 0.7 }}
            />
          )}
          {p.kind === "sparkle" && (
            <span
              className="block rotate-45 bg-accent-foreground/50"
              style={{
                width: p.size * 0.4,
                height: p.size * 0.4,
                clipPath:
                  "polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%)",
              }}
            />
          )}
        </span>
      ))}
    </div>
  )
}
