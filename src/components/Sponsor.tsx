import {
  contacts,
  event,
  sponsorBenefits,
  sponsorReasons,
  sponsorTiers,
} from '../data/site'
import { Section } from './layout'

/**
 * The sponsor pitch: why a partner would want the day, what the three packages
 * hold, and every way to start the conversation. Every figure is placeholder.
 */

const label = 'font-mono text-[0.68rem] tracking-[0.24em] text-fg-subtle uppercase'

/**
 * One accent per package, in the site's instrument colours: gold for the lead
 * tier, azure for the middle, brand green for the entry. Static class strings,
 * so Tailwind keeps all three in the build, indexed by position in the data.
 */
const accents = [
  { ground: 'bg-gold-wash', mark: 'text-gold', name: 'text-gold', chip: 'bg-gold text-ink' },
  { ground: 'bg-azure-wash', mark: 'text-azure', name: 'text-azure', chip: 'bg-azure text-ink' },
  { ground: 'bg-brand-wash', mark: 'text-brand', name: 'text-brand', chip: 'bg-brand text-ink' },
]

/**
 * One line of a package: included, or not. The mark carries the tier's colour,
 * but never alone — the glyph, the text weight and the reader-only line all say
 * the same thing.
 */
function Line({
  benefit,
  yes,
  tier,
  mark,
}: {
  benefit: string
  yes: boolean
  tier: string
  mark: string
}) {
  return (
    <li className="flex gap-3 border-b border-rule/60 py-3 last:border-b-0">
      <span aria-hidden="true" className={`mt-px ${yes ? mark : 'text-fg-muted/60'}`}>
        {yes ? '■' : '–'}
      </span>
      <span className={`text-sm leading-relaxed ${yes ? 'text-fg/80' : 'text-fg-muted/70'}`}>
        {benefit}
      </span>
      <span className="sr-only">
        {yes ? 'included' : 'not included'} at the {tier} tier
      </span>
    </li>
  )
}

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

      <div className="mt-16 border-t border-rule pt-10 md:mt-20">
        <h3 className={label}>Packages</h3>
        <ul className="mt-8 grid gap-px border border-rule bg-rule lg:grid-cols-3">
          {sponsorTiers.map((tier, i) => {
            const accent = accents[i] ?? accents[accents.length - 1]
            return (
              <li key={tier.tier} className={`flex flex-col p-6 ${accent.ground}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className={`font-display text-xl leading-tight ${accent.name}`}>
                    {tier.tier}
                  </h4>
                  {tier.lead && (
                    <span
                      className={`px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.2em] uppercase ${accent.chip}`}
                    >
                      Lead
                    </span>
                  )}
                </div>
                <p className="mt-4 font-display text-3xl leading-none text-fg tabular-nums">
                  {tier.amount}
                </p>
                <p className="mt-2 font-mono text-[0.62rem] tracking-[0.2em] text-fg-muted uppercase">
                  {tier.slots}
                </p>

                <ul className="mt-6 border-t border-rule/60">
                  {sponsorBenefits.map((benefit) => (
                    <Line
                      key={benefit}
                      benefit={benefit}
                      tier={tier.tier}
                      mark={accent.mark}
                      yes={tier.benefits[benefit as keyof typeof tier.benefits]}
                    />
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
        <p className="mt-6 text-sm text-fg-muted">
          Placeholder figures. The deck carries the current tiers, delegate demographics and last
          year's report.
        </p>
      </div>

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
