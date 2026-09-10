import { Link } from 'react-router-dom'
import { contacts, event, nav, usingPlaceholders } from '../data/site'
import { TaglineRule, Wordmark } from './Brand'
import { Container } from './layout'

const heading = 'font-mono text-[0.68rem] tracking-[0.22em] text-fg-subtle uppercase'

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-surface pb-11">
      <Container className="py-16">
        <div className="max-w-lg">
          <Wordmark className="text-4xl" />
          <div className="mt-5">
            <TaglineRule text={event.tagline} />
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className={heading}>Pages</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-fg-muted transition-colors hover:text-fg">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>Where</h2>
            <address className="mt-4 text-sm text-fg-muted not-italic">
              {event.venue}
              <br />
              {event.street}
              <br />
              {event.city}
            </address>
          </div>

          <div>
            <h2 className={heading}>When</h2>
            <p className="mt-4 text-sm text-fg-muted">
              <time dateTime={event.dateISO}>{event.date}</time>
              <br />
              {event.hours}
              <br />
              <span className="text-fg-subtle">{event.edition}</span>
            </p>
          </div>

          <div>
            <h2 className={heading}>Contact</h2>
            <ul className="mt-4 space-y-2">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="font-mono text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-rule pt-6 font-mono text-[0.68rem] tracking-[0.16em] text-fg-subtle uppercase">
          <p>© {new Date().getFullYear()} ROI</p>
          {usingPlaceholders && (
            <p className="normal-case tracking-normal">
              Dates, figures and contact details on this site are placeholders pending
              confirmation.
            </p>
          )}
        </div>
      </Container>
    </footer>
  )
}
