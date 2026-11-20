import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const siteUrl = 'https://parramnainani.vercel.app'
const siteTitle = 'Parram Nainani | Software Engineer (Full-Stack & AI/ML)'
const siteDescription =
  'Parram Nainani: B.Tech CSE (AI & ML) student at UPES and founder of NaviiGo. Full-stack and AI/ML engineer building with React, Next.js, Node.js, PostgreSQL, Flutter and PyTorch.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: ['Parram Nainani', 'software engineer', 'full-stack developer', 'AI/ML', 'Next.js', 'React', 'Node.js', 'NaviiGo', 'UPES'],
  authors: [{ name: 'Parram Nainani', url: siteUrl }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: 'Parram Nainani',
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
    creator: '@ParramNainani',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="antialiased min-h-screen overflow-x-hidden">{children}</body>
    </html>
  )
}
