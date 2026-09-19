import { workshops } from '../data/site'
import { Section } from './layout'

/**
 * The workshop programme, as a list of rules rather than a grid: meta on the
 * left, the session itself on the right. Every entry in `workshops` gets a row,
 * so the section holds three sessions or eight without changing shape.
 */

const meta = 'font-mono text-xs tracking-[0.2em] uppercase'

export function Workshops() {
  return (
    <Section id="workshops" labelledBy="workshops-heading">
      <h2 id="workshops-heading" className="text-4xl md:text-5xl">
        Workshops
      </h2>

      <ul className="mt-10 border-t border-rule md:mt-12">
        {workshops.map((workshop) => (
          <li
            key={workshop.n}
            className="grid gap-x-10 gap-y-4 border-b border-rule py-7 md:grid-cols-12 md:py-8"
          >
            <div className="md:col-span-4">
              <p className={`${meta} text-gold`}>{workshop.n}</p>
              <p className="mt-3 font-display text-lg leading-tight text-fg">{workshop.date}</p>
              <p className="mt-2 text-base text-fg-muted">{workshop.time}</p>
            </div>

            <div className="md:col-span-8">
              <h3 className="text-2xl md:text-3xl">{workshop.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg/75 md:text-lg">
                {workshop.body}
              </p>
              <p className={`${meta} mt-4 text-fg-subtle`}>
                <span className="text-azure">{workshop.format}</span>
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
