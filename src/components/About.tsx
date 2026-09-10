import { event, phases, rubric } from '../data/site'
import { Section, SectionHead } from './layout'

/**
 * The three sections that replaced the single dense mosaic. Each carries one
 * kind of information: the shape of the day, how it is scored, and what ROI
 * actually is. They are deliberately different compositions — a sequence, a
 * weighted scale, and a plain paragraph — because they are different kinds of
 * fact and looked interchangeable when they shared one grid.
 */

/** A marker per phase, drawn from the copy rather than invented. */
const clock = ['10:00', '4 hours', '8 + 7 min']

export function Format() {
  return (
    <Section id="format" labelledBy="format-heading">
      <SectionHead
        id="format-heading"
        title="How the day runs"
        standfirst="Three phases, the same for every team. Nobody sees the case in advance, so the day rewards method rather than rehearsal."
      />

      <ol className="mt-14 grid gap-px bg-rule md:grid-cols-3">
        {phases.map((phase, i) => (
          <li key={phase.n} className="flex flex-col bg-ink p-7 md:p-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-4">
              <span className="font-mono text-[0.68rem] tracking-[0.2em] text-fg-subtle uppercase">
                Phase {String(phase.n).padStart(2, '0')}
              </span>
              <span className="font-mono text-sm text-brand">{clock[i]}</span>
            </div>
            <h3 className="mt-6 font-display text-2xl">{phase.name}</h3>
            <p className="mt-4 text-fg-muted">{phase.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Scoring() {
  return (
    <Section id="scoring" labelledBy="scoring-heading">
      <SectionHead
        id="scoring-heading"
        title="How a pitch is scored"
        standfirst="Four weighted criteria, published before you register. The weights are why no coursework is required: reasoning outscores vocabulary by a wide margin."
      />

      <dl className="mt-14 border-t border-rule">
        {rubric.map((r) => (
          <div
            key={r.criterion}
            className="grid grid-cols-1 gap-x-10 gap-y-4 border-b border-rule py-7 md:grid-cols-[1fr_1.4fr] md:py-8"
          >
            <dt className="min-w-0">
              <span className="flex items-baseline justify-between gap-5">
                <span className="font-display text-xl md:text-2xl">{r.criterion}</span>
                <span className="font-mono text-xl text-brand md:text-2xl">
                  {r.weight}
                  <span className="text-[0.6em] text-fg-subtle">%</span>
                </span>
              </span>
              {/* Width carries the weight; the figure beside it carries the
                  same information for anyone the bar does not reach. */}
              <span
                aria-hidden="true"
                className="mt-3 block h-1.5 w-full bg-surface-2"
              >
                <span
                  className="block h-full bg-brand"
                  style={{ width: `${r.weight}%` }}
                />
              </span>
            </dt>
            <dd className="max-w-prose text-fg-muted">{r.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export function Background() {
  return (
    <Section id="background" labelledBy="background-heading">
      <div className="grid gap-x-14 gap-y-8 md:grid-cols-[1fr_1.3fr]">
        <SectionHead id="background-heading" title="What ROI is" />
        <div className="max-w-prose space-y-5 text-lg text-fg-muted">
          <p>
            ROI is a one-day macroeconomics pitch competition for {event.eligibility.toLowerCase()}.
            Teams open a sealed policy case, build a position against real data, and defend it in
            front of practitioners from banking, research and public policy.
          </p>
          <p>
            This is the {event.edition.toLowerCase()}, so there is no track record to point at yet.
            What there is instead is the format, published here in full before you register: the
            case, the rubric, the run of the day and what the judges are looking for. Most
            competitions tell you that afterwards.
          </p>
        </div>
      </div>
    </Section>
  )
}
