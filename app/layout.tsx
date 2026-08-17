import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Quicksand } from 'next/font/google'
import { config } from '@/lib/config'
import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// export const metadata: Metadata = {
//   title: `Happy Birthday, ${config.name} ❤️`,
//   description: `A little surprise made with love, just for ${config.name}.`,
//   generator: 'v0.app',
// }

export const metadata: Metadata = {
  title: "Happy Birthday, Pin YouE ❤️",
  description: "A little surprise made with love, just for Pin YouE.",
  generator: 'v0.app',
  openGraph: {
    title: "Happy Birthday, Pin YouE ❤️",
    description: "A little surprise made with love, just for Pin YouE.",
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ec4899',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${quicksand.variable} bg-background`}>
      <body className="font-body antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
