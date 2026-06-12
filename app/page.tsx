import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { Compare } from '@/components/compare'
import { SignupForm } from '@/components/signup-form'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Compare />
        <SignupForm />
      </main>
      <SiteFooter />
    </>
  )
}
