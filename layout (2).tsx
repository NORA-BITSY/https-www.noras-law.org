import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth-provider'
import { QueryProvider } from '@/components/query-provider'
import { Analytics } from '@vercel/analytics/react'
import { Navigation } from '@/components/navigation'
import { CivilRightsNotice } from '@/components/civil-rights-notice'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Nora's Law - Civil Rights Defense Platform",
  description: 'Empowering parents to defend their constitutional rights in family court proceedings through technology, documentation, and grassroots advocacy.',
  keywords: 'civil rights, family court, constitutional rights, legal technology, document analysis, grassroots advocacy',
  authors: [{ name: "Nora's Law Foundation" }],
  openGraph: {
    title: "Nora's Law - Civil Rights Defense Platform",
    description: 'Technology-powered civil rights defense for family court',
    type: 'website',
    locale: 'en_US',
    siteName: "Nora's Law",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nora's Law",
    description: 'Civil Rights Defense Platform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryProvider>
              <div className="min-h-screen bg-gradient-to-br from-background to-muted">
                <CivilRightsNotice />
                <Navigation />
                <main className="container mx-auto px-4 py-8">
                  {children}
                </main>
                <Toaster />
              </div>
              <Analytics />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
