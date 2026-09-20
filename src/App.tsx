import { useEffect } from 'react'
import { Hero } from './components/Hero'
import { MarketBackdrop } from './components/MarketBackdrop'
import { Mosaic } from './components/Mosaic'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { Sponsors } from './components/Sponsors'
import { Team } from './components/Team'
import { Workshops } from './components/Workshops'

/**
 * Arriving from another page of the site, e.g. /#about, the hash names a
 * section that does not exist yet: the browser looks for it before React has
 * rendered anything and gives up. Once the sections are on the page, take the
 * jump the browser could not. Instant, not smooth, so a link lands where it
 * points rather than sliding there from the top.
 */
function useHashLanding() {
  useEffect(() => {
    const { hash } = window.location
    if (!hash || hash === '#top') return

    let frame = 0
    /* Give up after a second of frames: a hash naming nothing is a bad link,
       not a section still mounting. */
    const deadline = performance.now() + 1000
    const jump = () => {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'instant' })
        return
      }
      if (performance.now() < deadline) frame = requestAnimationFrame(jump)
    }
    frame = requestAnimationFrame(jump)
    return () => cancelAnimationFrame(frame)
  }, [])
}

function App() {
  useHashLanding()

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
        <Hero />
        <Mosaic />
        <Workshops />
        <Sponsors />
        <Team />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
