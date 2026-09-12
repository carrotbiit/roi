import { useEffect, useState } from 'react'
import { nav } from '../data/site'
import { Wordmark } from './Brand'
import { Container } from './layout'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ink/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="/#top" className="text-xl">
          <Wordmark />
          <span className="sr-only">ROI home</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:hello@roi-pitch.org"
            className="bg-brand px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-brand-deep hover:text-fg"
          >
            Apply
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="border border-rule-strong px-3 py-1.5 font-mono text-xs tracking-[0.2em] text-fg-muted uppercase md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-rule bg-surface md:hidden">
          <Container className="py-2">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-rule py-3.5 text-fg-muted last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:hello@roi-pitch.org"
              onClick={() => setOpen(false)}
              className="block py-3.5 font-medium text-brand"
            >
              Apply to compete
            </a>
          </Container>
        </nav>
      )}
    </header>
  )
}
