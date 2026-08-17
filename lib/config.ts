/**
 * =====================================================================
 *  EDIT EVERYTHING HERE  ❤️
 * ---------------------------------------------------------------------
 *  This is the only file you need to change to personalize the website.
 *  Change the name, birthday date, photos, captions, letter, music,
 *  and important dates below.
 * =====================================================================
 */

export const config = {
  /** Her name — shows up everywhere on the site. */
  name: "Loy",

  /**
   * Her next birthday date (used for the countdown timer).
   * Format: "YYYY-MM-DDTHH:mm:ss"  (24h time, local timezone)
   * Example: "2025-12-24T00:00:00"
   */
  birthday: "2026-09-01T00:00:00",

  /** Background music. Replace with your own song in /public/music/. */
  music: {
    src: "/music/romantic.mp3", // <-- put your .mp3 file here
    title: "Perfect",
    artist: "Ed Sheeran",
  },

  /** Video memory. Replace with your own clip in /public/video/. */
  video: {
    src: "/video/our-moments.mp4", // <-- put your .mp4 file here
    poster: "/images/video-poster.png",
    title: "Our Special Moments",
    caption: "Every second with you is a memory I want to keep forever.",
  },

  /** Section 1 — Birthday wish. */
  wish: {
    title: "Happy Birthday, My Love",
    message:
      "Happy Birthday to the most beautiful person in my life. Thank you for coming into my world and making every moment more special. I hope today brings you as much happiness as you bring to me every day.",
  },

  /** Section 2 — Photo gallery. Add/remove items freely. */
  memories: [
    {
      src: "/images/memory-1.png",
      caption: "Our First Memory",
      date: "12 May 2023",
    },
    {
      src: "/images/memory-2.png",
      caption: "That Beautiful Day",
      date: "24 June 2023",
    },
    {
      src: "/images/memory-3.png",
      caption: "Every Moment With You",
      date: "14 August 2023",
    },
    {
      src: "/images/memory-4.png",
      caption: "My Favorite Person",
      date: "Today & Forever",
    },
  ],

  /** Section 3 — Reasons why you love her. */
  reasons: [
    { emoji: "😊", title: "Your Smile", text: "Your smile brightens my darkest days." },
    { emoji: "❤️", title: "Your Kind Heart", text: "You are so caring and understanding." },
    { emoji: "🥰", title: "The Way You Make Me Happy", text: "You make me a better person." },
    { emoji: "✨", title: "Your Beautiful Personality", text: "You are amazing in every way." },
    { emoji: "💖", title: "Simply Because You're You", text: "I love you for who you are." },
    { emoji: "🌍", title: "You Mean The World To Me", text: "You are my everything." },
  ],

  /** Section 4 — Love story timeline. */
  timeline: [
    { title: "First Meeting", emoji: "❤️", text: "The moment our eyes met." },
    { title: "The Day We Became Close", emoji: "🥰", text: "We started talking more every single day." },
    { title: "Our Favorite Memories", emoji: "📸", text: "All the beautiful moments we've shared." },
    { title: "Every Moment Together", emoji: "💕", text: "Happy, silly, sad, everything we went through." },
    { title: "Today — Your Birthday", emoji: "🎂", text: "Another beautiful chapter of our story." },
  ],

  /** Section 5 — Love letter. Each string is a paragraph. */
  letter: {
    greeting: "My Dear Loy,",
    paragraphs: [
      "I don't know if words can truly explain how important you are to me.",
      "Since you came into my life, so many ordinary moments have become special. Your smile can make my worst day better, and simply having you beside me makes me feel lucky.",
      "On your birthday, I don't just wish you happiness today. I wish you happiness every single day of your life.",
      "I hope we can continue creating memories, laughing together, supporting each other, and growing together.",
      "Thank you for being you.",
    ],
    closing: "Happy Birthday, my love. ❤️",
    signoffLine: "I love you more than words can say.",
    signature: "Always Yours,",
    signatureName: "( Your Boy ❤️ )",
  },

  /** Section 7 — Final surprise. */
  finale: {
    intro: "Loy, I have one more thing to tell you...",
    middle: "You are one of the most precious people in my life.",
    end: "Happy Birthday, My Love",
  },
} as const

export type Config = typeof config
