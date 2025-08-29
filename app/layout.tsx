import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/contexts/AuthContext"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Flexdesk School Management System',
  description: 'AI-enhanced teaching tools and classroom management',
  generator: 'Flexdesk',
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
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
