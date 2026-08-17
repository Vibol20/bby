"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Heart, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { config } from "@/lib/config"

export type MusicPlayerHandle = {
  play: () => void
}

function formatTime(sec: number) {
  if (!Number.isFinite(sec)) return "00:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, { visible: boolean }>(
  function MusicPlayer({ visible }, ref) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [playing, setPlaying] = useState(false)
    const [muted, setMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [current, setCurrent] = useState(0)
    const [duration, setDuration] = useState(0)

    useImperativeHandle(ref, () => ({
      play: () => {
        audioRef.current?.play().then(
          () => setPlaying(true),
          () => setPlaying(false),
        )
      },
    }))

    useEffect(() => {
      const audio = audioRef.current
      if (!audio) return
      const onTime = () => {
        setCurrent(audio.currentTime)
        setDuration(audio.duration || 0)
        setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
      }
      const onEnd = () => setPlaying(false)
      audio.addEventListener("timeupdate", onTime)
      audio.addEventListener("loadedmetadata", onTime)
      audio.addEventListener("ended", onEnd)
      return () => {
        audio.removeEventListener("timeupdate", onTime)
        audio.removeEventListener("loadedmetadata", onTime)
        audio.removeEventListener("ended", onEnd)
      }
    }, [])

    const toggle = () => {
      const audio = audioRef.current
      if (!audio) return
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        audio.play().then(
          () => setPlaying(true),
          () => setPlaying(false),
        )
      }
    }

    const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current
      if (!audio || !audio.duration) return
      audio.currentTime = (Number(e.target.value) / 100) * audio.duration
    }

    const restart = () => {
      const audio = audioRef.current
      if (!audio) return
      audio.currentTime = 0
    }

    const toggleMute = () => {
      const audio = audioRef.current
      if (!audio) return
      audio.muted = !audio.muted
      setMuted(audio.muted)
    }

    return (
      <>
        <audio ref={audioRef} src={config.music.src} loop={false} preload="auto" />
        <div
          className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <div className="mx-auto max-w-5xl px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="flex items-center gap-3 rounded-2xl bg-primary/95 px-4 py-3 text-primary-foreground shadow-2xl backdrop-blur sm:gap-4 sm:px-6">
              {/* Track info */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
                  <Heart className="h-5 w-5 animate-heart-beat" fill="currentColor" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold leading-tight">{config.music.title}</p>
                  <p className="truncate text-xs text-primary-foreground/80">{config.music.artist}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={restart} aria-label="Restart" className="rounded-full p-2 transition hover:bg-primary-foreground/15">
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  onClick={toggle}
                  aria-label={playing ? "Pause music" : "Play music"}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground text-primary transition hover:scale-105 active:scale-95"
                >
                  {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5" fill="currentColor" />}
                </button>
                <button onClick={restart} aria-label="Skip" className="rounded-full p-2 transition hover:bg-primary-foreground/15">
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>

              {/* Progress */}
              <div className="hidden flex-1 items-center gap-3 sm:flex">
                <span className="w-10 text-right text-xs tabular-nums text-primary-foreground/80">
                  {formatTime(current)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={seek}
                  aria-label="Seek"
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary-foreground/30 accent-primary-foreground"
                />
                <span className="w-10 text-xs tabular-nums text-primary-foreground/80">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Volume */}
              <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="rounded-full p-2 transition hover:bg-primary-foreground/15">
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </>
    )
  },
)
