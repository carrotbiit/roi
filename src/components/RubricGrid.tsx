import { useState } from 'react'
import { Link } from 'react-router-dom'
import { event, rubric, thesis } from '../data/site'
import { TaglineRule, Wordmark } from './Brand'
import { ArrowDown, ArrowRight } from './Icon'

/**
 * The first viewport, proportioned by the rubric that decides the competition.
 *
 * Column widths are the scoring weights: 40 / 25 / 20 / 15. A visitor learns
 * how they will be judged by reading the layout, before they read a word about
 * scoring. The offer and the primary action live inside the 40 column, because
 * economic reasoning is what actually wins.
 *
 * Selecting a criterion isolates it and dims the other three, so a student can
 * study one axis at a time. It is a real toggle: pointer, keyboard and touch,
 * reversible, and announced.
 */

/** Ground tone per column, heaviest weight carrying the most brand. */
const ground = [
  'bg-brand-wash',
  'bg-surface-2',
  'bg-surface',
  'bg-ink',
]

export function RubricGrid() {
  const [isolated, setIsolated] = useState<number | null>(null)

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate border-b border-rule"
    >
      <h1 id="hero-heading" className="sr-only">
        ROI — a macroeconomics pitch competition for high school students
      </h1>

      <div className="grid min-h-[calc(100svh-4rem-2.75rem)] grid-cols-1 lg:grid-cols-[40fr_25fr_20fr_15fr]">
        {rubric.map((r, i) => {
          const dim = isolated !== null && isolated !== i
          const on = isolated === i

          return (
            <div
              key={r.criterion}
              className={`relative flex min-w-0 flex-col justify-between border-rule not-last:border-b lg:not-last:border-r lg:not-last:border-b-0 ${ground[i]} transition-opacity duration-500 ${
                dim ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {/* The criterion, as a scoring board reads it. */}
              <div className="p-6 md:p-8">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setIsolated(on ? null : i)}
                  className="group -m-2 block w-full max-w-full p-2 text-left"
                >
                  <span className="flex items-baseline gap-3 font-mono text-[0.7rem] tracking-[0.18em] text-fg-muted uppercase">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 shrink-0 transition-colors ${
                        on ? 'bg-brand' : 'bg-rule-strong group-hover:bg-fg-subtle'
                      }`}
                    />
                    <span className="min-w-0">{r.criterion}</span>
                  </span>
                  <span className="sr-only">
                    {on ? ' — showing only this criterion. Activate to show all four.' : ' — activate to isolate this criterion.'}
                  </span>
                </button>

                {/* The offer column explains itself below; the three scoring
                    columns carry their criterion's text so the board reads as
                    substance rather than as three empty bands. */}
                {i === 0 ? (
                  on && <p className="mt-5 max-w-sm text-sm text-fg/85">{r.body}</p>
                ) : (
                  <p className="mt-6 max-w-xs text-sm leading-relaxed text-fg-muted">{r.body}</p>
                )}
              </div>

              {/* The offer sits in the heaviest column. */}
              {i === 0 && (
                <div className="order-first px-6 pt-10 md:px-8 lg:order-none lg:py-0">
                  <div className="animate-rise" style={{ animationDelay: '0.15s' }}>
                    <Wordmark className="text-[clamp(3.25rem,7vw,5.5rem)] tracking-[0.01em]" />
                    <div className="mt-6 max-w-md">
                      <TaglineRule text={event.tagline} />
                    </div>
                  </div>

                  <p
                    className="animate-rise mt-10 max-w-md text-2xl leading-snug text-balance md:text-3xl"
                    style={{ animationDelay: '0.3s' }}
                  >
                    {thesis}
                  </p>
                  <p
                    className="animate-rise mt-5 max-w-md text-fg-muted"
                    style={{ animationDelay: '0.36s' }}
                  >
                    A macroeconomics pitch competition for {event.eligibility.toLowerCase()}. No
                    economics coursework required.
                  </p>

                  <div
                    className="animate-rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
                    style={{ animationDelay: '0.45s' }}
                  >
                    <a
                      href="#register"
                      className="group inline-flex items-center gap-2.5 bg-brand px-6 py-3 font-medium text-ink transition-colors hover:bg-fg"
                    >
                      Apply to compete
                      <ArrowRight className="text-[1.1em] transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <Link
                      to="/event"
                      className="border-b border-rule-strong pb-1 text-fg-muted transition-colors hover:border-brand hover:text-fg"
                    >
                      How the day works
                    </Link>
                  </div>
                </div>
              )}

              {/* The weight, at the scale the form has in life. */}
              <div className="flex items-end justify-between gap-4 p-6 md:p-8">
                <p
                  className={`font-display leading-none tracking-tight transition-colors ${
                    on ? 'text-brand' : 'text-fg'
                  } text-[clamp(2.75rem,6vw,5rem)]`}
                >
                  {r.weight}
                  <span className="align-top text-[0.4em] text-fg-subtle">%</span>
                </p>
                {i === 0 && (
                  <a
                    href="#essentials"
                    className="mb-2 hidden shrink-0 text-fg-subtle transition-colors hover:text-brand lg:block"
                  >
                    <ArrowDown className="text-2xl" />
                    <span className="sr-only">Skip to the essentials</span>
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* The base strip: the three facts a visitor scans for first. */}
      <div className="border-t border-rule bg-ink">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4 font-mono text-[0.68rem] tracking-[0.16em] text-fg-subtle uppercase md:px-10">
          <span>
            <time dateTime={event.dateISO} className="text-fg-muted">
              {event.date}
            </time>
            <span aria-hidden="true" className="px-2.5 text-rule-strong">
              /
            </span>
            {event.city}
          </span>
          <span>
            Applications close{' '}
            <time dateTime={event.deadlineISO} className="text-fg-muted">
              {event.deadline}
            </time>
          </span>
        </div>
      </div>
    </section>
  )
}
