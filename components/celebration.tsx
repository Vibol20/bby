"use client"

import { useMemo } from "react"
import { Heart } from "lucide-react"

/**
 * A full-screen burst of falling confetti and floating hearts.
 * Render it conditionally (e.g. when a countdown hits zero).
 */
export function Celebration({ active }: { active: boolean }) {
  const pieces = useMemo(() => {
    const colors = [
      "var(--rose)",
      "var(--blush)",
      "var(--plum)",
      "var(--primary)",
      "oklch(0.85 0.15 90)",
    ]
    return Array.from({ length: 70 }, (_, i) => {
      const r = (n: number) => {
        const x = Math.sin((i + 1) * (n + 1) * 4871.11) * 10000
        return x - Math.floor(x)
      }
      return {
        left: r(1) * 100,
        delay: r(2) * 2.5,
        duration: 3 + r(3) * 3,
        size: 7 + r(4) * 9,
        color: colors[Math.floor(r(5) * colors.length)],
        heart: r(6) > 0.6,
        rounded: r(7) > 0.5,
      }
    })
  }, [])

  if (!active) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.heart ? (
            <Heart style={{ width: p.size, height: p.size, color: p.color }} fill="currentColor" />
          ) : (
            <span
              className={p.rounded ? "block rounded-full" : "block"}
              style={{ width: p.size, height: p.size * 1.3, backgroundColor: p.color }}
            />
          )}
        </span>
      ))}
    </div>
  )
}
