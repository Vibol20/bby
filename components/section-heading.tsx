"use client"

import type { ReactNode } from "react"
import { useReveal } from "@/components/use-reveal"

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const { ref, visible } = useReveal<HTMLHeadingElement>()
  return (
    <h2
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} text-center font-script text-4xl text-primary sm:text-5xl md:text-6xl ${className}`}
    >
      {children}
    </h2>
  )
}
