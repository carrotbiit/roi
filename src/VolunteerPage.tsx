import { MarketBackdrop } from './components/MarketBackdrop'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { Volunteer } from './components/Volunteer'

/** The volunteer page: the same shell as the home page, one section inside it. */
export function VolunteerPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-brand focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <MarketBackdrop />
      <SiteHeader />
      <main id="main">
        <Volunteer />
      </main>
      <SiteFooter />
    </>
  )
}
