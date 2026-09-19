import type { ReactNode } from 'react'
import { event, phases, rubric } from '../data/site'
import { Section } from './layout'

/**
 * About, built from the same parts as the rest of the page: hairline rules on
 * black, monospace meta, and the instrument accents from the palette — gold is
 * time, azure is place and format, green is who and how the score is split.
 * The essentials grid leads, then the shape of the day and the rubric each get
 * their own labelled panel instead of competing for one surface.
 */

const meta = 'font-mono text-[0.62rem] tracking-[0.2em] uppercase'

/** A titled panel with its own rule and instrument colour. */
function Panel({
  label,
  accent,
  children,
}: {
  label: string
  /** Static colour class, so Tailwind keeps every accent in the build. */
  accent: string
  children: ReactNode
}) {
  return (
    <div className="mt-16 border-t border-rule pt-10 first:mt-0 first:border-t-0 first:pt-0 md:mt-20">
      <h3 className={`font-mono text-[0.68rem] tracking-[0.24em] uppercase ${accent}`}>{label}</h3>
      {children}
    </div>
  )
}

/**
 * Instrument accents, as static pairs so Tailwind keeps every colour in the
 * build: gold is time, azure is place, green is who and how many.
 */
const accents = {
  time: { text: 'text-gold', bar: 'bg-gold' },
  place: { text: 'text-azure', bar: 'bg-azure' },
  act: { text: 'text-brand', bar: 'bg-brand' },
}

/**
 * One essential: a monospace label over the fact it names. On hover the ground
 * lifts off black and the accent rule draws across the top edge, left to right,
 * the way the hero mark draws itself.
 */
function Fact({
  label,
  accent,
  value,
  note,
  href,
}: {
  label: string
  accent: keyof typeof accents
  value: string
  note?: string
  /** Optional destination for the value, e.g. the venue's map pin. */
  href?: string
}) {
  const tone = accents[accent]
  return (
    <div className="group relative flex flex-col overflow-hidden bg-ink p-6 transition-colors duration-300 ease-out hover:bg-surface-2">
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${tone.bar}`}
      />
      <dt className={`font-mono text-sm tracking-[0.18em] uppercase md:text-base ${tone.text}`}>
        {label}
      </dt>
      <dd className="mt-6 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-block font-display text-lg leading-tight text-fg underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-brand hover:text-brand"
          >
            {value}
            <span className="sr-only"> (opens a map in a new tab)</span>
          </a>
        ) : (
          <span className="block font-display text-lg leading-tight text-fg">{value}</span>
        )}
        {note && <span className="mt-2 block text-sm leading-relaxed text-fg/70">{note}</span>}
      </dd>
    </div>
  )
}

export function Mosaic() {
  return (
    <Section id="about" labelledBy="about-heading">
      <header className="max-w-2xl">
        <h2 id="about-heading" className="text-3xl md:text-4xl">
          About ROI
        </h2>
        <p className="mt-6 text-base leading-relaxed text-fg/80 md:text-lg">
          The ROI Stock Pitch Competition brings high school students together to analyze real
          companies, build an investment thesis, and defend their ideas under pressure.
        </p>
        <p className="mt-4 text-base leading-relaxed text-fg/80 md:text-lg">
          <strong className="font-medium text-brand">No prior experience is required:</strong> our
          workshops give participants the foundation to understand financial markets, analyze
          companies, and develop their own investment ideas. Teams then put what they’ve learned
          into practice through live pitches of case studies created by university professors, with
          their ideas challenged by professionals within the field.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          <Fact label="Date" accent="time" value={event.date} />
          <Fact
            label="Place"
            accent="place"
            value={event.venue}
            note={`${event.street}, ${event.city}`}
            href={event.map}
          />
          <Fact label="Who" accent="act" value={event.eligibility} note="No experience needed" />
          <Fact label="Teams" accent="act" value="Three to four" note="Per team" />
          <Fact label="Prize pool" accent="time" value={event.prizePool} />
          <Fact label="Applications close" accent="time" value={event.deadline} />
        </dl>

        <Panel label="Format" accent="text-azure">
          {/* Rows, like the workshop list: meta on the left, the phase itself on the right. */}
          <ul className="mt-8 border-t border-rule">
            {phases.map((phase) => (
              <li
                key={phase.n}
                className="grid gap-x-10 gap-y-4 border-b border-rule py-8 md:grid-cols-12 md:py-10"
              >
                <div className="md:col-span-4">
                  <p className={`${meta} text-azure`}>Phase {String(phase.n).padStart(2, '0')}</p>
                  <h4 className="mt-3 font-display text-lg leading-tight text-fg">{phase.name}</h4>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-fg/75 md:col-span-8 md:text-base">
                  {phase.body}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel label="Judging" accent="text-gold">
          {/* Weight as a rule that fills: decoration only, the number carries it. */}
          <ul className="mt-8 border-t border-rule">
            {rubric.map((r) => (
              <li key={r.criterion} className="border-b border-rule py-5">
                <div className="flex items-baseline justify-between gap-6">
                  <p className="font-display text-base leading-tight text-fg md:text-lg">
                    {r.criterion}
                  </p>
                  <p className="font-mono text-sm text-fg-muted tabular-nums">{r.weight}%</p>
                </div>
                <div aria-hidden="true" className="mt-3 h-px bg-rule">
                  <div className="h-px bg-brand" style={{ width: `${r.weight}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  )
}
