import type { ReactNode } from 'react'
import { event, phases, rubric } from '../data/site'
import { Section } from './layout'

/**
 * The About section, read as a market map: green through red tiles on a
 * twelve-up grid. The board is split into three, so the essentials, the shape
 * of the day and the rubric each get their own panel instead of competing for
 * the same surface.
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

/** A titled panel of tiles, with its own rule and instrument colour. */
function Board({
  label,
  accent,
  grid,
  children,
}: {
  label: string
  /** Static colour class: green acts, azure is format, gold is time. */
  accent: string
  /** Grid template for this panel at the lg breakpoint. */
  grid: string
  children: ReactNode
}) {
  return (
    <div className="mt-16 first:mt-0 md:mt-20">
      <div className="border-b border-rule pb-4">
        <p className={`font-mono text-[0.7rem] tracking-[0.24em] uppercase ${accent}`}>{label}</p>
      </div>
      <div
        className={`mt-6 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 ${grid}`}
      >
        {children}
      </div>
    </div>
  )
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
      className={`relative flex flex-col justify-end px-5 pt-12 pb-7 ${heat[tone]} ${span} ${className}`}
    >
      <p className="absolute top-4 right-5 left-5 font-mono text-[0.62rem] tracking-[0.2em] text-fg/70 uppercase">
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

/** Supporting line under a value. */
function Note({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-sm leading-relaxed text-fg/75">{children}</p>
}

export function Mosaic() {
  return (
    <Section id="about" labelledBy="about-heading">
      <header className="max-w-2xl">
        <h2 id="about-heading" className="text-3xl md:text-4xl">
          About
        </h2>
        <p className="mt-6 text-base leading-relaxed text-fg/80 md:text-lg">
          ROI started in 2023 as forty students in a single classroom arguing about interest rates.
          It now runs as a full day competition, and the format has not changed: nobody sees the case
          in advance, so the day rewards clear thinking rather than rehearsal.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <Board
          label="General"
          accent="text-brand"
          grid="auto-rows-[minmax(7rem,auto)] lg:auto-rows-[minmax(6rem,auto)] lg:grid-cols-12"
        >
          <Tile label="Date" tone="up-2" span="lg:col-span-5 lg:row-span-2">
            <Value size="lg">{event.date}</Value>
            <Note>{event.hours}</Note>
          </Tile>

          <Tile label="Place" tone="down-2" span="lg:col-span-4 lg:row-span-2">
            <Value>{event.venue}</Value>
            <Note>
              {event.street}, {event.city}
            </Note>
          </Tile>

          <a
            href="mailto:hello@roi-pitch.org"
            className="flex flex-col justify-between bg-brand px-5 py-7 text-ink transition-colors hover:bg-brand-deep hover:text-fg sm:col-span-2 lg:col-span-3 lg:row-span-2"
          >
            <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase opacity-70">
              Registration
            </span>
            <span className="mt-8 flex items-baseline justify-between gap-4">
              <span className="font-display text-2xl leading-tight sm:text-3xl">
                Apply to compete
              </span>
              <span aria-hidden="true" className="font-mono text-xl">
                →
              </span>
            </span>
          </a>

          <Tile label="Who" tone="up-1" span="lg:col-span-3">
            <Value size="sm">{event.eligibility}</Value>
            <Note>No coursework needed</Note>
          </Tile>

          <Tile label="Teams" tone="down-1" span="lg:col-span-3">
            <Value size="sm">Two to four</Value>
          </Tile>

          <Tile label="Entry" tone="up-3" span="lg:col-span-3">
            <Value size="sm">$35</Value>
            <Note>Waivers on request</Note>
          </Tile>

          <Tile label="Applications close" tone="down-3" span="lg:col-span-3">
            <Value size="sm">{event.deadline}</Value>
          </Tile>
        </Board>

        <Board label="Format" accent="text-azure" grid="auto-rows-[minmax(12rem,auto)] lg:grid-cols-3">
          {phases.map((phase, i) => (
            <Tile
              key={phase.n}
              label={`Phase ${String(phase.n).padStart(2, '0')} / ${phase.name}`}
              tone={i === 0 ? 'up-1' : i === 1 ? 'flat' : 'down-1'}
              span=""
              className="justify-start"
            >
              <p className="text-sm leading-relaxed text-fg/80">{phase.body}</p>
            </Tile>
          ))}
        </Board>

        <Board
          label="Judging"
          accent="text-gold"
          grid="auto-rows-[minmax(7rem,auto)] lg:auto-rows-[minmax(6.5rem,auto)] lg:grid-cols-12"
        >
          {rubric.map((r, i) => (
            <Tile
              key={r.criterion}
              label={r.criterion}
              tone={i === 0 ? 'up-3' : i === 1 ? 'up-1' : i === 2 ? 'down-1' : 'down-3'}
              /* Width tracks weight, so the panel reads as a share of the score. */
              span={i === 0 ? 'lg:col-span-5' : i === 1 ? 'lg:col-span-3' : 'lg:col-span-2'}
            >
              <Value size="lg">{r.weight}%</Value>
            </Tile>
          ))}
        </Board>
      </div>
    </Section>
  )
}
