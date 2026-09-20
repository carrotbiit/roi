import { useEffect, useState } from 'react'
import { nav, socials } from '../data/site'
import { Wordmark } from './Brand'
import { Container } from './layout'

/** Brand marks, drawn as solid paths so they sit at the weight of the nav text. */
const icon: Record<string, string> = {
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.53 4.78 5.82V21h-4v-5.66c0-1.35-.03-3.09-1.94-3.09-1.94 0-2.24 1.47-2.24 2.99V21h-4V9Z',
  instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.84-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z',
}

function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {socials.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center text-fg-muted transition-colors hover:text-brand"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d={icon[s.id]} />
            </svg>
            <span className="sr-only">{s.label} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

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
              className="text-base text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/apply.html"
            className="bg-brand px-4 py-2 text-base font-medium text-ink transition-colors hover:bg-brand-deep hover:text-fg"
          >
            Apply
          </a>
          <SocialLinks className="-mr-2 ml-1" />
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
              href="/apply.html"
              onClick={() => setOpen(false)}
              className="block py-3.5 font-medium text-brand"
            >
              Apply to compete
            </a>
            <SocialLinks className="-ml-2 py-2" />
          </Container>
        </nav>
      )}
    </header>
  )
}
