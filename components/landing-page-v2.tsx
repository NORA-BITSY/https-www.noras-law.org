'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import PageIllustration from '@/components/landing/page-illustration'
import Header from '@/components/landing/ui/header'
import Hero from '@/components/landing/hero-home'
import Features from '@/components/landing/features'
import Workflows from '@/components/landing/workflows'
import Cta from '@/components/landing/cta'
import Footer from '@/components/landing/ui/footer'

export default function LandingPageV2() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 1000,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <>
      <Header />
      <main className="grow">
        <PageIllustration />
        <Hero />
        <Features />
        <Workflows />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
