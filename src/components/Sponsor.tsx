import { contacts, event, sponsorReasons } from '../data/site'
import { Section } from './layout'

/**
 * The sponsor pitch: why a partner would want the day, and every way to start
 * the conversation. Tiers and figures stay out of it deliberately — those go in
 * the deck, which is what this section is asking people to request.
 */

const label = 'font-mono text-[0.68rem] tracking-[0.24em] text-fg-subtle uppercase'

export function Sponsor() {
  return (
    <Section id="sponsor" labelledBy="sponsor-heading">
      <header className="max-w-2xl">
        <h2 id="sponsor-heading" className="text-3xl md:text-4xl">
          Why sponsor?
        </h2>
        <p className="mt-6 text-base leading-relaxed text-fg/80 md:text-lg">
          {event.name} runs on partners. They cover the room, the meals and every waiver, and in
          return they spend a day with a few hundred teenagers who chose to spend a Saturday
          arguing about interest rates.
        </p>
      </header>

      <ul className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {sponsorReasons.map((reason) => (
          <li key={reason.n} className="flex flex-col bg-ink p-6">
            <p className="font-mono text-[0.7rem] tracking-[0.24em] text-brand uppercase">
              {reason.n}
            </p>
            <h3 className="mt-6 font-display text-lg leading-tight text-fg">{reason.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg/75">{reason.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-16 grid gap-10 border-t border-rule pt-10 md:grid-cols-12 md:mt-20">
        <div className="min-w-0 md:col-span-5">
          <h3 className={label}>Ways to contact</h3>
          <p className="mt-6 text-base leading-relaxed text-fg/80">
            Partnership takes a short call and a one-page agreement. Ask for the deck and we will
            send the current tiers, delegate demographics and last year's report. Commitments for{' '}
            {event.season} close alongside registration on {event.deadline}.
          </p>
          <a
            href="mailto:partners@roi-pitch.org"
            className="mt-8 inline-block bg-brand px-6 py-3 font-medium text-ink transition-colors hover:bg-brand-deep hover:text-fg"
          >
            Request the deck
          </a>
        </div>

        <dl className="min-w-0 border-t border-rule md:col-span-6 md:col-start-7 md:border-t-0">
          {contacts.map((c) => (
            <div
              key={c.label}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
            >
              <dt className={label}>{c.label}</dt>
              <dd>
                <a
                  href={c.href}
                  className="font-mono text-sm text-fg transition-colors hover:text-brand"
                >
                  {c.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
