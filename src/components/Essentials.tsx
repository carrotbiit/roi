import { event } from '../data/site'
import { Container } from './layout'

/**
 * The essentials, read the way a quote board is read: one fact per row, label
 * left, value right, aligned on a hairline grid with tabular numerals so the
 * column scans vertically.
 *
 * This replaces the treemap that used to carry these facts. A treemap implies
 * its tiles are commensurable, and "Saturday 18 April" and "Economic reasoning
 * 40%" are not the same kind of fact. The board makes no such claim: it just
 * lists, densely, and it survives a narrow screen because a real trading panel
 * is built for one.
 */

type Row = {
  field: string
  value: string
  note?: string
  time?: string
  tone?: 'brand' | 'bear'
}

/**
 * Days until the deadline. Returns null when the date has already passed so
 * the board shows a closed state rather than a negative countdown.
 */
function daysUntil(iso: string): number | null {
  const then = new Date(`${iso}T23:59:59`).getTime()
  if (Number.isNaN(then)) return null
  const days = Math.ceil((then - Date.now()) / 86_400_000)
  return days >= 0 ? days : null
}

function Board({ rows }: { rows: readonly Row[] }) {
  return (
    <dl className="border-t border-rule">
      {rows.map((r) => (
        <div
          key={r.field}
          className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-rule px-1 py-4 transition-colors hover:bg-surface sm:grid-cols-[8.5rem_1fr] sm:py-4"
        >
          <dt className="font-mono text-[0.68rem] leading-6 tracking-[0.18em] text-fg-subtle uppercase">
            {r.field}
          </dt>
          {/* Value and note stack in one cell. Splitting them into separate
              grid columns squeezed the value until short phrases broke one
              word per line. */}
          <dd className="min-w-0">
            <span
              className={`block font-display text-lg leading-snug text-balance ${
                r.tone === 'brand' ? 'text-brand' : r.tone === 'bear' ? 'text-bear' : 'text-fg'
              }`}
            >
              {r.time ? <time dateTime={r.time}>{r.value}</time> : r.value}
            </span>
            {r.note && <span className="mt-1 block text-sm text-fg-muted">{r.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function Essentials() {
  const left = daysUntil(event.deadlineISO)

  const when: Row[] = [
    { field: 'Date', value: event.date, time: event.dateISO, note: event.hours },
    { field: 'Venue', value: event.venue, note: `${event.street}, ${event.city}` },
    {
      field: 'Applications close',
      value: event.deadline,
      time: event.deadlineISO,
      note: left === null ? 'Closed' : `${left} days remaining`,
      tone: left === null ? 'bear' : 'brand',
    },
  ]

  const who: Row[] = [
    { field: 'Who can enter', value: event.eligibility, note: 'No economics coursework needed' },
    { field: 'Team size', value: event.teamSize, note: 'Register alone and we will place you' },
    { field: 'Entry', value: event.fee, note: 'Need-based waivers on request' },
    { field: 'Edition', value: event.edition, note: 'First time ROI has been held' },
  ]

  return (
    <section
      id="essentials"
      aria-labelledby="essentials-heading"
      className="border-t border-rule py-20 md:py-24"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 id="essentials-heading" className="text-3xl md:text-4xl">
            The essentials
          </h2>
          <a
            href="#register"
            className="border-b border-rule-strong pb-1 text-fg-muted transition-colors hover:border-brand hover:text-fg"
          >
            Register
          </a>
        </div>

        <div className="mt-10 grid gap-x-14 gap-y-10 lg:grid-cols-2">
          <div className="min-w-0">
            <h3 className="font-mono text-[0.68rem] tracking-[0.22em] text-fg-subtle uppercase">
              When and where
            </h3>
            <div className="mt-4">
              <Board rows={when} />
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-mono text-[0.68rem] tracking-[0.22em] text-fg-subtle uppercase">
              Who and what it costs
            </h3>
            <div className="mt-4">
              <Board rows={who} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
