import type { ReactNode } from 'react'
import { event, phases, rubric } from '../data/site'
import { Section, SectionIndex } from './layout'

/**
 * The essentials and the format laid out as a treemap: one bordered field of
 * tiles, grouped under sector-style labels, sized by how much each fact matters.
 */

const tone = {
  1: 'bg-tile-1',
  2: 'bg-tile-2',
  3: 'bg-tile-3',
  4: 'bg-tile-4',
} as const

function Group({
  label,
  meta,
  className = '',
  gridClassName,
  children,
}: {
  label: string
  meta?: string
  className?: string
  gridClassName: string
  children: ReactNode
}) {
  return (
    <section className={`flex flex-col gap-px bg-rule ${className}`}>
      <h3 className="flex items-baseline justify-between gap-4 bg-surface px-3 py-2 font-mono text-[0.62rem] tracking-[0.22em] text-fg-subtle uppercase">
        <span className="text-fg-muted">{label}</span>
        {meta && <span>{meta}</span>}
      </h3>
      <div className={`grid flex-1 gap-px bg-rule ${gridClassName}`}>{children}</div>
    </section>
  )
}

function Tile({
  label,
  value,
  note,
  level = 3,
  className = '',
  size = 'md',
}: {
  label: string
  value: string
  note?: string
  level?: keyof typeof tone
  className?: string
  size?: 'lg' | 'md' | 'sm'
}) {
  const valueSize = size === 'lg' ? 'text-3xl sm:text-4xl' : size === 'md' ? 'text-lg' : 'text-base'
  return (
    <div
      className={`relative flex flex-col items-center justify-center px-4 pt-9 pb-5 text-center ${tone[level]} ${className}`}
    >
      <p className="absolute top-2.5 left-4 font-mono text-[0.62rem] tracking-[0.2em] text-fg-subtle uppercase">
        {label}
      </p>
      <p className={`font-display leading-tight text-fg ${valueSize}`}>{value}</p>
      {note && <p className="mt-1.5 text-sm text-fg-muted">{note}</p>}
    </div>
  )
}

export function Mosaic() {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <SectionIndex n="01" label="About" />
          <h2 id="about-heading" className="mt-6 text-3xl md:text-4xl">
            One case, one day, one panel to convince.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-fg-muted">
          Everything a delegate needs to decide whether to enter, in one board. Larger tiles carry
          the facts we are asked about most.
        </p>
      </div>

      <div className="mt-10 grid auto-rows-[minmax(6.5rem,auto)] gap-px border border-rule bg-rule lg:grid-cols-12">
        <Group
          label="Essentials"
          meta={event.season}
          className="lg:col-span-7"
          gridClassName="auto-rows-[minmax(6.5rem,auto)] grid-cols-2 sm:grid-cols-6"
        >
          <Tile
            label="Date"
            value={event.date}
            note={event.hours}
            level={1}
            size="lg"
            className="col-span-2 sm:col-span-3 sm:row-span-2"
          />
          <Tile
            label="Place"
            value={event.venue}
            note={`${event.street}, ${event.city}`}
            level={2}
            className="col-span-2 sm:col-span-3"
          />
          <Tile
            label="Who"
            value={event.eligibility}
            note="No economics coursework needed"
            level={3}
            className="sm:col-span-2"
          />
          <Tile
            label="Teams"
            value="Two to four"
            note="students"
            level={4}
            size="sm"
            className="sm:col-span-1"
          />
          <Tile
            label="Applications close"
            value={event.deadline}
            level={2}
            className="col-span-2 sm:col-span-3"
          />
          <Tile
            label="Entry"
            value="$35"
            note="Need-based waivers granted on request"
            level={4}
            className="col-span-2 sm:col-span-3"
          />
        </Group>

        <Group
          label="Enter"
          meta="Open"
          className="lg:col-span-5"
          gridClassName="auto-rows-[minmax(6.5rem,auto)] grid-cols-2"
        >
          <a
            href="#contact"
            className="col-span-2 flex flex-col justify-between bg-brand p-4 text-ink transition-colors hover:bg-brand-deep hover:text-fg"
          >
            <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase opacity-70">
              Registration
            </span>
            <span className="mt-6 flex items-baseline justify-between gap-4">
              <span className="font-display text-2xl leading-tight sm:text-3xl">
                Apply to compete
              </span>
              <span aria-hidden="true" className="font-mono text-xl">
                →
              </span>
            </span>
          </a>
          <div className="relative col-span-2 bg-tile-3 px-4 pt-9 pb-5">
            <p className="absolute top-2.5 left-4 font-mono text-[0.62rem] tracking-[0.2em] text-fg-subtle uppercase">
              Background
            </p>
            <p className="text-sm text-fg-muted">
              ROI started in 2023 as forty students in a single classroom arguing about interest
              rates. It now runs as a full day competition, and the format has not changed: nobody
              sees the case in advance, so the day rewards clear thinking rather than rehearsal.
            </p>
          </div>
          <Tile label="First held" value="2023" level={4} size="sm" />
          <Tile label="Alumni" value="640" note="Placeholder figure" level={4} size="sm" />
        </Group>

        <Group
          label="Format"
          meta="Three phases"
          className="lg:col-span-8"
          gridClassName="grid-cols-1 sm:grid-cols-3"
        >
          {phases.map((phase, i) => (
            <div
              key={phase.n}
              className={`relative px-4 pt-9 pb-5 ${i === 0 ? 'bg-tile-2' : i === 1 ? 'bg-tile-3' : 'bg-tile-4'}`}
            >
              <p className="absolute top-2.5 left-4 font-mono text-[0.62rem] tracking-[0.2em] text-fg-subtle uppercase">
                <span className="text-brand">{String(phase.n).padStart(2, '0')}</span>
                <span className="px-2">/</span>
                {phase.name}
              </p>
              <p className="text-sm text-fg-muted">{phase.body}</p>
            </div>
          ))}
        </Group>

        <Group
          label="Scoring"
          meta="Weighted"
          className="lg:col-span-4"
          gridClassName="grid-cols-1 content-stretch"
        >
          <div className="flex h-full flex-col gap-px bg-rule">
            {rubric.map((r, i) => (
              <div
                key={r.criterion}
                style={{ flexGrow: r.weight }}
                className={`flex items-baseline justify-between gap-4 p-4 ${
                  i === 0 ? 'bg-tile-1' : i === 1 ? 'bg-tile-2' : 'bg-tile-3'
                }`}
              >
                <span className="font-display text-sm text-fg sm:text-base">{r.criterion}</span>
                <span className="font-mono text-sm text-fg-muted tabular-nums">{r.weight}%</span>
              </div>
            ))}
          </div>
        </Group>
      </div>
    </Section>
  )
}
