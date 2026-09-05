import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Hero } from './components/Hero'
import { Mosaic } from './components/Mosaic'
import { HallBand, Program } from './components/Program'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { Sponsor } from './components/Sponsor'

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-brand focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Mosaic />
        <HallBand />
        <Program />
        <Sponsor />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
