import { faqs } from '../data/site'
import { Section } from './layout'

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="min-w-0 md:col-span-4 md:sticky md:top-24 md:self-start">
          <h2 id="faq-heading" className="text-4xl md:text-5xl">
            FAQ
          </h2>
        </div>

        <div className="min-w-0 md:col-span-7 md:col-start-6">
          <div className="border-t border-rule">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group border-b border-rule" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-baseline gap-5 py-5">
                  <span className="font-display text-lg text-fg">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="ml-auto font-mono text-fg-subtle transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
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
