import type { ReactNode } from 'react'
import { event, phases } from '../data/site'
import { Section } from './layout'

/**
 * About, built from the same parts as the rest of the page: hairline rules on
 * black, monospace meta, and the instrument accents from the palette — gold is
 * time, azure is place and format, green is who and how many.
 * The essentials grid leads, then the shape of the day gets its own labelled
 * panel below it.
 */

const meta = 'font-mono text-xs tracking-[0.2em] uppercase'

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
    <div className="mt-12 border-t border-rule pt-8 first:mt-0 first:border-t-0 first:pt-0 md:mt-16">
      <h3 className={`font-mono text-xs tracking-[0.24em] uppercase ${accent}`}>{label}</h3>
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
 *
 * Given a destination, the whole cell is the target. The link is an overlay
 * rather than a wrapper, so the definition list keeps its dt/dd structure and
 * the reader still gets one clearly named link per cell.
 */
function Fact({
  label,
  accent,
  value,
  note,
  href,
  away,
}: {
  label: string
  accent: keyof typeof accents
  value: string
  note?: string
  /** Optional destination for the whole cell, e.g. the venue's map pin. */
  href?: string
  /** Set for a destination off the site, which opens in its own tab. */
  away?: string
}) {
  const tone = accents[accent]
  return (
    <div
      className={`group relative flex flex-col overflow-hidden bg-ink p-6 transition-colors duration-300 ease-out hover:bg-surface-2 ${
        href ? 'focus-within:bg-surface-2' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100 ${tone.bar}`}
      />
      <dt className={`font-mono text-sm tracking-[0.18em] uppercase md:text-base ${tone.text}`}>
        {label}
      </dt>
      <dd className="mt-6 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
        <span
          className={`block font-display text-xl leading-tight transition-colors duration-300 ease-out ${
            href ? 'text-fg group-hover:text-brand group-focus-within:text-brand' : 'text-fg'
          }`}
        >
          {value}
        </span>
        {note && <span className="mt-2 block text-base leading-relaxed text-fg/70">{note}</span>}
      </dd>
      {href && (
        <a
          href={href}
          {...(away ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
        >
          <span className="sr-only">
            {label}: {value}
            {away ? ` (${away}, opens in a new tab)` : ''}
          </span>
        </a>
      )}
    </div>
  )
}

export function Mosaic() {
  return (
    <Section id="about" labelledBy="about-heading">
      <header className="max-w-2xl">
        <h2 id="about-heading" className="text-4xl md:text-5xl">
          About ROI
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-fg/80 md:text-xl">
          The ROI Stock Pitch Competition brings high school students together to analyze real
          companies, build an investment thesis, and defend their ideas under pressure.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-fg/80 md:text-xl">
          <strong className="font-medium text-brand">No prior experience is required:</strong> our
          workshops give participants the foundation to understand financial markets, analyze
          companies, and develop their own investment ideas. Teams then put what they’ve learned
          into practice through{' '}
          <strong className="font-medium text-brand">
            live pitches of case studies created by university professors
          </strong>
          , with their ideas challenged by{' '}
          <strong className="font-medium text-brand">
            professionals within the field
          </strong>
          .
        </p>
      </header>

      <div className="mt-10 md:mt-12">
        <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          <Fact label="Date" accent="time" value={event.date} />
          <Fact
            label="Place"
            accent="place"
            value={event.venue}
            note={`${event.street}, ${event.city}`}
            href={event.map}
            away="map"
          />
          <Fact label="Who" accent="act" value={event.eligibility} note="No experience needed" />
          <Fact label="Teams" accent="act" value="Three to four" note="Per team" />
          <Fact label="Prize pool" accent="time" value={event.prizePool} />
          <Fact
            label="Applications close"
            accent="time"
            value={event.deadline}
            note="Apply to compete"
            href="/apply.html"
          />
        </dl>

        <Panel label="Format" accent="text-azure">
          {/* Rows, like the workshop list: meta on the left, the phase itself on the right. */}
          <ul className="mt-6 border-t border-rule">
            {phases.map((phase) => (
              <li
                key={phase.n}
                className="grid gap-x-10 gap-y-4 border-b border-rule py-7 md:grid-cols-12 md:py-8"
              >
                <div className="md:col-span-4">
                  <p className={`${meta} text-azure`}>Phase {String(phase.n).padStart(2, '0')}</p>
                  <h4 className="mt-3 font-display text-xl leading-tight text-fg">{phase.name}</h4>
                </div>
                <p className="max-w-2xl text-base leading-relaxed text-fg/75 md:col-span-8 md:text-lg">
                  {phase.body}
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  )
}
