import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

const inter = Inter({ subsets: ['latin'] })

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
  font-family: "${GeistSans?.style?.fontFamily || 'sans-serif'}";
  --font-sans: ${GeistSans?.variable || ''};
  --font-mono: ${GeistMono?.variable || ''};
}
        `}</style>
      </head>
      <body className={`${inter.className} show-nav`}>{children}</body>
    </html>
  )
}
