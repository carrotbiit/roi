import { workshops } from '../data/site'
import { Section } from './layout'

/**
 * The workshop programme, as a list of rules rather than a grid: meta on the
 * left, the session itself on the right. Every entry in `workshops` gets a row,
 * so the section holds three sessions or eight without changing shape.
 */

const meta = 'font-mono text-[0.62rem] tracking-[0.2em] uppercase'

export function Workshops() {
  return (
    <Section id="workshops" labelledBy="workshops-heading">
      <h2 id="workshops-heading" className="text-3xl md:text-4xl">
        Workshops
      </h2>

      <ul className="mt-10 border-t border-rule">
        {workshops.map((workshop) => (
          <li
            key={workshop.n}
            className="grid gap-x-10 gap-y-4 border-b border-rule py-8 md:grid-cols-12 md:py-10"
          >
            <div className="md:col-span-4">
              <p className={`${meta} text-brand`}>{workshop.n}</p>
              <p className="mt-3 font-display text-base leading-tight text-fg">{workshop.date}</p>
              <p className="mt-1 text-sm text-fg-muted">{workshop.time}</p>
            </div>

            <div className="md:col-span-8">
              <h3 className="text-xl md:text-2xl">{workshop.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg/75 md:text-base">
                {workshop.body}
              </p>
              <p className={`${meta} mt-5 text-fg-subtle`}>
                {workshop.format}
                <span className="px-2 text-rule-strong">/</span>
                {workshop.level}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
