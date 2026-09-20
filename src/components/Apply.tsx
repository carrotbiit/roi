import { email, event } from '../data/site'
import { Section } from './layout'
import { MailLink } from './MailLink'

/**
 * The apply page while the form is still closed: the status first, because it
 * is the only thing a reader came for, then what the application will ask and
 * the one way to hear the moment it opens. Nothing here pretends to be a form.
 */

const label = 'font-mono text-xs tracking-[0.24em] text-fg-subtle uppercase'

/** What a team should have ready. Short, because the form is short. */
const checklist = [
  {
    n: '01',
    title: 'A team',
    body: 'Three to four students, from one school or several. You can apply without a full team and we will place you with one.',
  },
  {
    n: '02',
    title: 'Names and grades',
    body: 'Every member, their school and their year. No transcripts, no references, no essays.',
  },
  {
    n: '03',
    title: 'One paragraph',
    body: 'Why your team wants the day. There is no right answer and no prior experience is expected.',
  },
]

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
        <p className="mt-6 text-lg leading-relaxed text-fg/80 md:text-xl">
          The form for {event.season} is not open yet. When it is, it goes up on this page and
          everyone on the list hears the same morning. Applications close on {event.deadline}.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-fg/80 md:text-xl">
          Nothing is first come, first served, so there is no advantage in waiting by the page.
        </p>

        <MailLink
          subject="Tell me when applications open"
          className="mt-8 inline-block bg-brand px-6 py-3 text-lg font-medium text-ink transition-colors hover:bg-brand-deep hover:text-fg"
        >
          Tell me when it opens
        </MailLink>
      </header>

      <div className="mt-12 border-t border-rule pt-8 md:mt-16">
        <h3 className={label}>What the form will ask</h3>
        <ul className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {checklist.map((item) => (
            <li key={item.n} className="flex flex-col bg-ink p-6">
              <p className="font-mono text-xs tracking-[0.24em] text-brand uppercase">
                {item.n}
              </p>
              <h4 className="mt-6 font-display text-xl leading-tight text-fg">{item.title}</h4>
              <p className="mt-4 text-base leading-relaxed text-fg/75">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>

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
