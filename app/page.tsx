"use client"

import { useRef, useState } from "react"
import { FloatingHearts } from "@/components/floating-hearts"
import { NavBar } from "@/components/nav-bar"
import { WelcomeScreen } from "@/components/welcome-screen"
import { MusicPlayer, type MusicPlayerHandle } from "@/components/music-player"
import { BirthdayWish } from "@/components/sections/birthday-wish"
import { MemoriesGallery } from "@/components/sections/memories-gallery"
import { VideoMemories } from "@/components/sections/video-memories"
import { WhyILoveYou } from "@/components/sections/why-i-love-you"
import { LoveStory } from "@/components/sections/love-story"
import { LoveLetter } from "@/components/sections/love-letter"
import { Countdown } from "@/components/sections/countdown"
import { FinalSurprise } from "@/components/sections/final-surprise"

export default function Page() {
  const [opened, setOpened] = useState(false)
  const [closing, setClosing] = useState(false)
  const playerRef = useRef<MusicPlayerHandle>(null)

  const handleOpen = () => {
    // Start music on the user interaction (avoids autoplay restrictions).
    playerRef.current?.play()
    setClosing(true)
    // Allow the fade-out animation before removing the overlay.
    window.setTimeout(() => setOpened(true), 1000)
    // Prevent scrolling until the surprise is open.
    document.body.style.overflow = ""
  }

  return (
    <main id="top" className="relative min-h-screen overflow-x-hidden">
      <FloatingHearts />

      {!opened && <WelcomeScreen onOpen={handleOpen} closing={closing} />}

      <div
        className={`relative z-10 transition-opacity duration-1000 ${
          opened ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <NavBar />
        <div className="h-16" />
        <BirthdayWish />
        <MemoriesGallery />
        <WhyILoveYou />
        <LoveStory />
        <LoveLetter />
        <VideoMemories />
        <Countdown />
        <FinalSurprise />
        <footer className="relative z-10 pb-28 pt-10 text-center text-sm text-muted-foreground">
          Made with love, just for you.
        </footer>
      </div>

      <MusicPlayer ref={playerRef} visible={opened} />
    </main>
  )
}
