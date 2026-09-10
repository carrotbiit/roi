import { sponsorBenefits, sponsorTiers } from '../data/site'
import { Section, SectionIndex } from './layout'

function Included({ yes, tier, benefit }: { yes: boolean; tier: string; benefit: string }) {
  return (
    <span>
      <span aria-hidden="true" className={yes ? 'text-brand' : 'text-fg-subtle'}>
        {yes ? '■' : '–'}
      </span>
      <span className="sr-only">
        {benefit} {yes ? 'included' : 'not included'} at the {tier} tier
      </span>
    </span>
  )
}

export function Sponsor() {
  return (
    <Section id="sponsor" labelledBy="sponsor-heading">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="min-w-0 md:col-span-5 md:sticky md:top-24 md:self-start">
          <SectionIndex n="03" label="Sponsor" />
          <h2 id="sponsor-heading" className="mt-6 text-3xl md:text-4xl">
            Partners keep the day free of barriers.
          </h2>
          <div className="mt-8 space-y-5 text-fg-muted">
            <p>
              Sponsorship covers the venue, meals, and every fee waiver requested, so that cost
              never decides which students compete. In return partners spend a day with a few
              hundred teenagers who chose to spend a Saturday arguing about monetary policy.
            </p>
            <p>
              Figures below are placeholders. Ask for the partnership deck and we will send the
              current tiers, delegate demographics, and last year's report.
            </p>
          </div>
          <a
            href="mailto:partners@roi-pitch.org"
            className="mt-8 inline-block bg-brand px-6 py-3 font-medium text-ink transition-colors hover:bg-brand-deep hover:text-fg"
          >
            Request the deck
          </a>
        </div>

        <div className="min-w-0 md:col-span-6 md:col-start-7">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[22rem] text-left">
              <caption className="sr-only">Sponsorship tiers and what each one includes</caption>
              <thead>
                <tr className="border-b border-rule-strong">
                  <th scope="col" className="pb-4 font-mono text-[0.68rem] font-normal tracking-[0.24em] text-fg-subtle uppercase">
                    Tier
                  </th>
                  {sponsorTiers.map((t) => (
                    <th key={t.tier} scope="col" className="pb-4 pl-6 text-right align-bottom">
                      <span className="block font-display text-lg text-fg">{t.tier}</span>
                      <span className="block font-mono text-sm text-fg-muted">{t.amount}</span>
                      {t.lead && (
                        <span className="mt-1 inline-block font-mono text-[0.6rem] tracking-[0.2em] text-brand uppercase">
                          Lead partner
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sponsorBenefits.map((benefit) => (
                  <tr key={benefit} className="border-b border-rule">
                    <th scope="row" className="py-4 pr-6 text-sm font-normal text-fg">
                      {benefit}
                    </th>
                    {sponsorTiers.map((t) => (
                      <td key={t.tier} className="py-4 pl-6 text-right font-mono">
                        <Included
                          yes={t.benefits[benefit as keyof typeof t.benefits]}
                          tier={t.tier}
                          benefit={benefit}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="py-4 pr-6 font-mono text-[0.68rem] font-normal tracking-[0.2em] text-fg-subtle uppercase">
                    Places
                  </th>
                  {sponsorTiers.map((t) => (
                    <td key={t.tier} className="py-4 pl-6 text-right text-sm text-fg-muted">
                      {t.slots}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12">
            <h3 className="font-mono text-xs tracking-[0.24em] text-fg-subtle uppercase">
              Partner marks
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <li
                  key={i}
                  className="flex h-20 items-center justify-center border border-dashed border-rule-strong font-mono text-[0.6rem] tracking-[0.2em] text-fg-subtle uppercase"
                >
                  Open
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
