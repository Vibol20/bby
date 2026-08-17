"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Reveals an element with a fade-up animation when it scrolls into view.
 * Returns a ref to attach and a boolean for the visible state.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number
  once?: boolean
}) {
  const { threshold = 0.15, once = true } = options ?? {}
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, visible }
}
