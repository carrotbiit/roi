import {
  contacts,
  event,
  sponsorBenefits,
  sponsorCase,
  sponsorReach,
  sponsorTiers,
} from '../data/site'
import { ArrowRight, Check, Dash } from '../components/Icon'
import { Container, PageHead, Section, SectionHead } from '../components/layout'

/**
 * The partner-facing page.
 *
 * Every figure under "reach" is a first-edition target, not an achieved
 * result, and it says so on the page rather than in a footnote. The logo wall
 * stays genuinely empty until there is a partner to name.
 */

function Included({ yes, tier, benefit }: { yes: boolean; tier: string; benefit: string }) {
  return (
    <span className="inline-flex">
      {/* Shape, not only colour, carries whether this is included. */}
      {yes ? (
        <Check className="text-lg text-brand" />
      ) : (
        <Dash className="text-lg text-fg-subtle" />
      )}
      <span className="sr-only">
        {benefit} {yes ? 'included' : 'not included'} at the {tier} tier
      </span>
    </span>
  )
}

export function Sponsors() {
  const partners = contacts.find((c) => c.label === 'Sponsorship') ?? contacts[0]

  return (
    <>
      <PageHead
        id="sponsors-heading"
        title="Back the first edition."
        standfirst="A few hundred teenagers who chose to spend a Saturday arguing about monetary policy, and almost nobody is talking to them yet."
      />

      <Section labelledBy="why-heading">
        <SectionHead id="why-heading" title="Why sponsor ROI" />
        <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-3">
          {sponsorCase.map((c) => (
            <div key={c.title} className="min-w-0 border-t border-rule-strong pt-6">
              <h3 className="font-display text-xl">{c.title}</h3>
              <p className="mt-4 text-fg-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Reach. The projection label is load-bearing, not decoration. */}
      <Section labelledBy="reach-heading">
        <SectionHead id="reach-heading" title="Audience and reach" standfirst={sponsorReach.note} />

        <p className="mt-8 inline-flex items-center gap-2.5 border border-rule-strong px-4 py-2 font-mono text-[0.68rem] tracking-[0.18em] text-fg-muted uppercase">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-bear" />
          {sponsorReach.label}
        </p>

        <dl className="mt-8 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {sponsorReach.figures.map((f) => (
            <div key={f.unit} className="bg-ink p-7">
              <dt className="sr-only">{f.unit}</dt>
              <dd>
                <span className="font-display text-4xl text-fg">{f.value}</span>
                <span className="mt-1 block font-mono text-[0.68rem] tracking-[0.18em] text-brand uppercase">
                  {f.unit}
                </span>
                <span className="mt-4 block text-sm text-fg-muted">{f.body}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Tiers. */}
      <Section labelledBy="tiers-heading">
        <SectionHead
          id="tiers-heading"
          title="Tiers"
          standfirst="Amounts are indicative for the first edition. Ask for the partnership deck and we will send the current tiers in full."
        />

        {/* Narrow screens get one block per tier. A benefit matrix that has to
            be scrolled sideways is a matrix nobody reads, and a sponsor is as
            likely to open this on a phone as anyone else. */}
        <ul className="mt-12 grid gap-px bg-rule md:hidden">
          {sponsorTiers.map((t) => (
            <li key={t.tier} className="bg-ink p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-b border-rule pb-4">
                <h3 className="font-display text-xl">{t.tier}</h3>
                <p className="font-mono text-fg-muted">{t.amount}</p>
                <p className="w-full font-mono text-[0.68rem] tracking-[0.18em] text-fg-subtle uppercase">
                  {t.slots}
                  {t.lead && <span className="ml-3 text-brand">Lead partner</span>}
                </p>
              </div>
              <ul className="mt-4 space-y-2.5">
                {sponsorBenefits.map((b) => {
                  const yes = t.benefits[b as keyof typeof t.benefits]
                  return (
                    <li key={b} className="flex items-baseline gap-3 text-sm">
                      {yes ? (
                        <Check className="shrink-0 translate-y-0.5 text-brand" />
                      ) : (
                        <Dash className="shrink-0 translate-y-0.5 text-fg-subtle" />
                      )}
                      <span className={yes ? 'text-fg-muted' : 'text-fg-subtle line-through'}>
                        {b}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-12 hidden md:block">
          <table className="w-full text-left">
            <caption className="sr-only">Sponsorship tiers and what each one includes</caption>
            <thead>
              <tr className="border-b border-rule-strong">
                <th
                  scope="col"
                  className="pb-4 font-mono text-[0.68rem] font-normal tracking-[0.2em] text-fg-subtle uppercase"
                >
                  Tier
                </th>
                {sponsorTiers.map((t) => (
                  <th key={t.tier} scope="col" className="pb-4 pl-6 text-right align-bottom">
                    <span className="block font-display text-lg text-fg">{t.tier}</span>
                    <span className="block font-mono text-sm text-fg-muted">{t.amount}</span>
                    {t.lead && (
                      <span className="mt-1 inline-block font-mono text-[0.6rem] tracking-[0.16em] text-brand uppercase">
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
                    <td key={t.tier} className="py-4 pl-6 text-right">
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
                <th
                  scope="row"
                  className="py-4 pr-6 font-mono text-[0.68rem] font-normal tracking-[0.18em] text-fg-subtle uppercase"
                >
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
      </Section>

      {/* No partners are named because none have been confirmed to us for
          publication. An honest empty state beats six dashed boxes pretending
          to be a logo wall. */}
      <Section labelledBy="partners-heading">
        <div className="grid gap-x-14 gap-y-8 md:grid-cols-[1fr_1.2fr]">
          <SectionHead id="partners-heading" title="Founding partners" />
          <p className="max-w-prose text-lg text-fg-muted">
            The first edition has not announced its partners yet. Whoever comes in now is named on
            every delegate pack, on the final round, and on this page as a founding partner of ROI
            — which is a sentence that can only be true once.
          </p>
        </div>
      </Section>

      <section aria-labelledby="sponsor-cta" className="border-t border-rule py-20">
        <Container>
          <h2 id="sponsor-cta" className="max-w-2xl text-3xl md:text-4xl">
            Ask for the partnership deck.
          </h2>
          <p className="mt-6 max-w-xl text-fg-muted">
            It covers tiers, delegate demographics and what the day looks like from a partner's
            side. Decisions for {event.season} are being made now.
          </p>
          <a
            href={partners.href}
            className="group mt-8 inline-flex items-center gap-2.5 bg-brand px-6 py-3 font-medium text-ink transition-colors hover:bg-fg"
          >
            Request the deck
            <ArrowRight className="text-[1.1em] transition-transform group-hover:translate-x-0.5" />
          </a>
        </Container>
      </section>
    </>
  )
}
