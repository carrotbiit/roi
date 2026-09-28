import { email, event } from '../data/site'
import { Section } from './layout'
import { MailLink } from './MailLink'

/**
 * The apply page while the form is still closed: the status first, because it
 * is the only thing a reader came for, then the essentials. Nothing here
 * pretends to be a form.
 */

const label = 'font-mono text-xs tracking-[0.24em] text-fg-subtle uppercase'

export function Apply() {
  return (
    <Section id="apply" labelledBy="apply-heading">
      <header className="max-w-2xl">
        <p className="inline-flex items-center gap-3 border border-brand/40 bg-brand-wash px-4 py-2 font-mono text-xs tracking-[0.24em] text-brand uppercase">
          <span aria-hidden="true" className="inline-block size-1.5 bg-brand" />
          Opening soon
        </p>

        <h2 id="apply-heading" className="mt-6 text-4xl md:text-5xl">
          Applications are opening soon
        </h2>
      </header>

      <div className="mt-12 border-t border-rule pt-8 md:mt-16">
        <h3 className={label}>The essentials</h3>
        <dl className="mt-6 border-t border-rule">
          {[
            { term: 'Who', detail: `${event.eligibility}. No experience needed.` },
            { term: 'Teams', detail: event.teamSize },
            { term: 'Where', detail: `${event.venue}, ${event.city}` },
            { term: 'Date', detail: event.date },
            { term: 'Applications close', detail: event.deadline },
            { term: 'Prize pool', detail: event.prizePool },
          ].map((row) => (
            <div
              key={row.term}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
            >
              <dt className={label}>{row.term}</dt>
              <dd className="text-sm text-fg/80">{row.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-base text-fg-muted">
          Questions before you apply go to{' '}
          <MailLink className="font-mono text-fg transition-colors hover:text-brand">
            {email}
          </MailLink>
          .
        </p>
      </div>
    </Section>
  )
}
