import { Hero } from './components/Hero'
import { Mosaic } from './components/Mosaic'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'

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
      </main>
      <SiteFooter />
    </>
  )
}

export default App
