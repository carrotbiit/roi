import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { Ticker } from './components/Ticker'
import { Container } from './components/layout'
import { Event } from './routes/Event'
import { Home } from './routes/Home'
import { Sponsors } from './routes/Sponsors'
import { Team } from './routes/Team'

/**
 * Scroll behaviour across routes: a new page starts at the top, but a hash
 * link (`/#register` from any page) still lands on its target once the new
 * route has painted.
 */
function ScrollBehaviour() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function Shell() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-brand focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollBehaviour />
      <SiteHeader />
      {/* The ticker is fixed, so the shell reserves its height rather than
          letting it sit over the end of the page. */}
      <main id="main" className="pb-11">
        <Outlet />
      </main>
      <SiteFooter />
      <Ticker />
    </>
  )
}

function NotFound() {
  return (
    <Container className="py-32">
      <h1 className="text-4xl md:text-5xl">That page does not exist.</h1>
      <p className="mt-6 max-w-prose text-fg-muted">
        The link may be out of date. Everything on the site is reachable from the menu above.
      </p>
      <a
        href="/"
        className="mt-8 inline-block border-b border-rule-strong pb-1 text-fg-muted transition-colors hover:border-brand hover:text-fg"
      >
        Back to the start
      </a>
    </Container>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Event />} />
        <Route path="/team" element={<Team />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
