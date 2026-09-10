import { contacts, faqs } from '../data/site'
import { Plus } from './Icon'
import { Section, SectionHead } from './layout'

export function Faq() {
  const general = contacts[0]

  return (
    <Section id="faq" labelledBy="faq-heading">
      <div className="grid gap-x-14 gap-y-10 md:grid-cols-12">
        <div className="min-w-0 md:col-span-4 md:sticky md:top-24 md:self-start">
          <SectionHead id="faq-heading" title="Questions we are asked first." />
          <p className="mt-6 text-fg-muted">
            Anything not covered here goes to{' '}
            <a
              href={general.href}
              className="border-b border-rule-strong text-fg transition-colors hover:border-brand"
            >
              {general.value}
            </a>
            . We answer within two working days.
          </p>
        </div>

        <div className="min-w-0 md:col-span-7 md:col-start-6">
          <div className="border-t border-rule">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group border-b border-rule" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-baseline gap-5 py-5 transition-colors hover:text-brand">
                  <span className="font-display text-lg text-fg group-hover:text-brand">
                    {faq.q}
                  </span>
                  <Plus
                    className="ml-auto shrink-0 translate-y-0.5 text-lg text-fg-subtle transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-prose pb-6 text-fg-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
