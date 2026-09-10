import { event, nav } from '../data/site'
import { TaglineRule, Wordmark } from './Brand'
import { Container } from './layout'

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-surface">
      <Container className="py-16">
        <div className="max-w-lg">
          <Wordmark className="text-4xl" />
          <div className="mt-5">
            <TaglineRule text={event.tagline} />
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          <div>
            <h2 className="font-mono text-[0.68rem] tracking-[0.24em] text-fg-subtle uppercase">
              This page
            </h2>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-fg-muted hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[0.68rem] tracking-[0.24em] text-fg-subtle uppercase">
              Where
            </h2>
            <address className="mt-4 text-sm not-italic text-fg-muted">
              {event.venue}
              <br />
              {event.street}
              <br />
              {event.city}
            </address>
          </div>
          <div>
            <h2 className="font-mono text-[0.68rem] tracking-[0.24em] text-fg-subtle uppercase">
              When
            </h2>
            <p className="mt-4 text-sm text-fg-muted">
              <time dateTime={event.dateISO}>{event.date}</time>
              <br />
              {event.hours}
            </p>
          </div>
        </div>

        <p className="mt-14 border-t border-rule pt-6 font-mono text-[0.68rem] tracking-[0.2em] text-fg-subtle uppercase">
          © {new Date().getFullYear()} ROI · Every figure and name on this page is placeholder
          content
        </p>
      </Container>
    </footer>
  )
}
