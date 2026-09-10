import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav } from '../data/site'
import { Wordmark } from './Brand'
import { Close, Menu } from './Icon'
import { Container } from './layout'

const linkBase = 'text-sm transition-colors'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ink/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link to="/" className="text-xl">
          <Wordmark />
          <span className="sr-only">ROI, home</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'}`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-brand"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
          <Link
            to="/#register"
            className="bg-brand px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-fg"
          >
            Apply
          </Link>
        </nav>

        <button
          ref={toggle}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex items-center gap-2 border border-rule-strong px-3 py-1.5 font-mono text-xs tracking-[0.16em] text-fg-muted uppercase transition-colors hover:border-fg-subtle hover:text-fg md:hidden"
        >
          {open ? <Close /> : <Menu />}
          {open ? 'Close' : 'Menu'}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-rule bg-surface md:hidden"
        >
          <Container className="py-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block border-b border-rule py-3.5 ${isActive ? 'text-fg' : 'text-fg-muted'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/#register"
              onClick={() => setOpen(false)}
              className="block py-3.5 font-medium text-brand"
            >
              Apply to compete
            </Link>
          </Container>
        </nav>
      )}
    </header>
  )
}
