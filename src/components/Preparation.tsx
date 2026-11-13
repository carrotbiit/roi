import { Section } from './layout'

/**
 * How ROI gets beginners ready: an analyst on every team, and an intro package
 * sent out ahead of the day.
 */
const points = [
  {
    name: 'A LAMA analyst on your team',
    body: 'Every team is paired with an analyst from the Laurier Asset Management Association, who works alongside you to help build your pitch.',
  },
  {
    name: 'Beginner intro package',
    body: 'Before the competition, we send out a beginner intro package with all the information you need to learn the basics of investing and stock pitching.',
  },
] as const

export function Preparation() {
  return (
    <Section id="preparation" labelledBy="preparation-heading">
      <h2 id="preparation-heading" className="text-4xl md:text-5xl">
        How We Help You Prepare
      </h2>

      <ul className="mt-10 grid gap-px border border-rule bg-rule md:mt-12 md:grid-cols-2">
        {points.map((point) => (
          <li key={point.name} className="bg-ink p-6 md:p-8">
            <h3 className="font-display text-xl leading-tight text-fg">{point.name}</h3>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-fg/75 md:text-lg">
              {point.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
