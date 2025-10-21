import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Nora's Law - Federal Civil Rights Litigation Platform",
  description: 'Supporting federal civil rights litigation with AI-powered case management, evidence analysis, and legal document generation.',
  keywords: 'civil rights, litigation, legal platform, evidence analysis, case management',
  authors: [{ name: "Nora's Law Team" }],
  openGraph: {
    title: "Nora's Law - Federal Civil Rights Litigation Platform",
    description: 'Supporting federal civil rights litigation with AI-powered case management, evidence analysis, and legal document generation.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
