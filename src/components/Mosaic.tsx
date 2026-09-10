import type { ReactNode } from 'react'
import { event, phases, rubric } from '../data/site'
import { Section } from './layout'

/**
 * The essentials, the format and the rubric packed into a single market-map
 * grid: twelve columns, tiles of deliberately unequal width and height, each
 * coloured green through red so the board reads like a treemap of a session.
 */

type Heat = 'up-3' | 'up-2' | 'up-1' | 'flat' | 'down-1' | 'down-2' | 'down-3'

/** Static class names so Tailwind keeps every shade in the build. */
const heat: Record<Heat, string> = {
  'up-3': 'bg-heat-up-3',
  'up-2': 'bg-heat-up-2',
  'up-1': 'bg-heat-up-1',
  flat: 'bg-heat-flat',
  'down-1': 'bg-heat-down-1',
  'down-2': 'bg-heat-down-2',
  'down-3': 'bg-heat-down-3',
}

function Tile({
  label,
  tone = 'flat',
  span,
  className = '',
  children,
}: {
  label: string
  tone?: Heat
  /** Column and row span at the lg breakpoint, where the twelve-up grid kicks in. */
  span: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={`relative flex flex-col justify-end px-4 pt-9 pb-5 ${heat[tone]} ${span} ${className}`}
    >
      <p className="absolute top-2.5 left-4 right-4 font-mono text-[0.62rem] tracking-[0.2em] text-fg/70 uppercase">
        {label}
      </p>
      {children}
    </div>
  )
}

/** The headline number or phrase on a tile. */
function Value({ children, size = 'md' }: { children: ReactNode; size?: 'lg' | 'md' | 'sm' }) {
  const scale = size === 'lg' ? 'text-3xl sm:text-4xl' : size === 'md' ? 'text-lg' : 'text-base'
  return <p className={`font-display leading-tight text-fg ${scale}`}>{children}</p>
}

export function Mosaic() {
  return (
    <Section id="about" labelledBy="about-heading">
      <h2 id="about-heading" className="text-3xl md:text-4xl">
        About
      </h2>

      <div className="mt-10 grid auto-rows-[minmax(5.5rem,auto)] grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:auto-rows-[minmax(5rem,auto)] lg:grid-cols-12">
        <Tile label="Date" tone="up-2" span="lg:col-span-5 lg:row-span-3">
          <Value size="lg">{event.date}</Value>
          <p className="mt-1.5 text-sm text-fg/75">{event.hours}</p>
        </Tile>

        <Tile label="Place" tone="down-2" span="lg:col-span-4 lg:row-span-2">
          <Value>{event.venue}</Value>
          <p className="mt-1.5 text-sm text-fg/75">
            {event.street}, {event.city}
          </p>
        </Tile>

        <a
          href="mailto:hello@roi-pitch.org"
          className="flex flex-col justify-between bg-brand p-4 text-ink transition-colors hover:bg-brand-deep hover:text-fg sm:col-span-2 lg:col-span-3 lg:row-span-4"
        >
          <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase opacity-70">
            Registration
          </span>
          <span className="mt-6 flex items-baseline justify-between gap-4">
            <span className="font-display text-2xl leading-tight sm:text-3xl">Apply to compete</span>
            <span aria-hidden="true" className="font-mono text-xl">
              →
            </span>
          </span>
        </a>

        <Tile label="Who" tone="up-1" span="lg:col-span-4">
          <Value>{event.eligibility}</Value>
          <p className="mt-1.5 text-sm text-fg/75">No economics coursework needed</p>
        </Tile>

        <Tile
          label="Background"
          tone="flat"
          span="sm:col-span-2 lg:col-span-5 lg:row-span-2"
          className="justify-start"
        >
          <p className="text-sm text-fg/80">
            ROI started in 2023 as forty students in a single classroom arguing about interest rates.
            It now runs as a full day competition, and the format has not changed: nobody sees the
            case in advance, so the day rewards clear thinking rather than rehearsal.
          </p>
        </Tile>

        <Tile label="Applications close" tone="down-1" span="lg:col-span-4">
          <Value>{event.deadline}</Value>
        </Tile>

        <Tile label="Entry" tone="up-1" span="lg:col-span-2">
          <Value>$35</Value>
          <p className="mt-1.5 text-sm text-fg/75">Waivers on request</p>
        </Tile>

        <Tile label="Teams" tone="down-3" span="lg:col-span-2">
          <Value size="sm">Two to four</Value>
        </Tile>

        <Tile label="First held" tone="up-3" span="lg:col-span-3">
          <Value size="sm">2023</Value>
        </Tile>

        {phases.map((phase, i) => (
          <Tile
            key={phase.n}
            label={`Phase ${String(phase.n).padStart(2, '0')} / ${phase.name}`}
            tone={i === 0 ? 'up-1' : i === 1 ? 'down-2' : 'flat'}
            span="lg:col-span-4 lg:row-span-2"
            className="justify-start"
          >
            <p className="text-sm text-fg/80">{phase.body}</p>
          </Tile>
        ))}

        <Tile label="Alumni" tone="down-1" span="lg:col-span-2">
          <Value size="sm">640</Value>
        </Tile>

        {rubric.map((r, i) => (
          <Tile
            key={r.criterion}
            label={`Scoring / ${r.criterion}`}
            tone={i === 0 ? 'up-2' : i === 1 ? 'down-1' : i === 2 ? 'up-1' : 'down-2'}
            span={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}
          >
            <Value size="sm">{r.weight}%</Value>
          </Tile>
        ))}
      </div>
    </Section>
  )
}
