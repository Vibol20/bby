"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Maximize, Pause, Play, Video, Volume2, VolumeX } from "lucide-react"
import { config } from "@/lib/config"
import { SectionHeading } from "@/components/section-heading"
import { useReveal } from "@/components/use-reveal"

function fmt(sec: number) {
  if (!Number.isFinite(sec)) return "0:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, "0")}`
}

export function VideoMemories() {
  const { ref, visible } = useReveal()
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => {
      setCurrent(v.currentTime)
      setDuration(v.duration || 0)
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
    }
    const onEnd = () => {
      setPlaying(false)
      setEnded(true)
      window.setTimeout(() => setEnded(false), 5000)
    }
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("loadedmetadata", onTime)
    v.addEventListener("ended", onEnd)
    return () => {
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("loadedmetadata", onTime)
      v.removeEventListener("ended", onEnd)
    }
  }, [])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) {
      v.pause()
      setPlaying(false)
    } else {
      v.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      )
    }
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    v.currentTime = (Number(e.target.value) / 100) * v.duration
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const fullscreen = () => wrapRef.current?.requestFullscreen?.()

  return (
    <section id="video" className="relative px-6 py-24 sm:py-28">
      <SectionHeading className="flex items-center justify-center gap-3">
        <span>Our Video Memories</span>
        <Video className="h-8 w-8 shrink-0 text-primary" />
      </SectionHeading>

      <div
        ref={ref}
        className={`reveal ${visible ? "is-visible" : ""} mx-auto mt-12 max-w-3xl`}
      >
        <div
          ref={wrapRef}
          className="group relative overflow-hidden rounded-3xl bg-plum shadow-2xl ring-1 ring-primary/40 animate-glow-pulse"
        >
          <video
            ref={videoRef}
            src={config.video.src}
            poster={config.video.poster}
            playsInline
            className="aspect-video w-full bg-black object-cover"
            onClick={toggle}
          />

          {/* Title overlay */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 bg-gradient-to-b from-black/50 to-transparent p-5">
            <p className="font-script text-2xl text-white drop-shadow sm:text-3xl">
              {config.video.title}
            </p>
          </div>

          {/* Big play button when paused */}
          {!playing && (
            <button
              onClick={toggle}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/15"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-xl transition-transform hover:scale-110">
                <Play className="ml-1 h-9 w-9" fill="currentColor" />
              </span>
            </button>
          )}

          {/* Controls */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent p-4">
            <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="text-white transition hover:text-primary">
              {playing ? <Pause className="h-6 w-6" fill="currentColor" /> : <Play className="h-6 w-6" fill="currentColor" />}
            </button>
            <span className="text-xs tabular-nums text-white/90">{fmt(current)}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={seek}
              aria-label="Seek video"
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/30 accent-primary"
            />
            <span className="text-xs tabular-nums text-white/90">{fmt(duration)}</span>
            <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="text-white transition hover:text-primary">
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button onClick={fullscreen} aria-label="Fullscreen" className="text-white transition hover:text-primary">
              <Maximize className="h-5 w-5" />
            </button>
          </div>

          {/* On-complete "I Love You" celebration */}
          {ended && (
            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-plum/70 backdrop-blur-sm">
              {Array.from({ length: 14 }).map((_, i) => (
                <Heart
                  key={i}
                  className="absolute bottom-0 text-primary"
                  fill="currentColor"
                  style={{
                    left: `${(i * 7 + 5) % 95}%`,
                    width: 16 + (i % 4) * 8,
                    height: 16 + (i % 4) * 8,
                    animation: `float-up ${5 + (i % 4)}s linear ${i * 0.15}s 1`,
                    ["--o" as string]: 0.9,
                  }}
                />
              ))}
              <p
                className="relative font-script text-4xl text-white drop-shadow-lg sm:text-6xl"
                style={{ animation: "fade-up 0.9s ease-out both, heart-beat 1.6s ease-in-out 0.9s infinite" }}
              >
                I Love You, {config.name} ❤️
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-pretty text-foreground/70">
          {config.video.caption}
          <Heart className="h-4 w-4 shrink-0 text-primary" fill="currentColor" />
        </p>
      </div>
    </section>
  )
}
