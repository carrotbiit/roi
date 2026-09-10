import { useEffect, useRef, useState } from 'react'
import { tickerRows } from '../data/site'
import { TrendDown, TrendFlat, TrendUp } from './Icon'

/**
 * The rail along the bottom of every page.
 *
 * These are illustrative indicators of the kind a case turns on. They are NOT
 * live market data and the label saying so is not optional decoration: it is
 * the reason this component is honest. If the numbers ever become real, the
 * label changes with them.
 *
 * The marquee duplicates its track and translates by half, so the loop has no
 * seam. It stops entirely under prefers-reduced-motion, pauses on hover and on
 * keyboard focus, and the whole rail is exposed to assistive technology as a
 * plain static list rather than a moving one.
 */

function Row({ symbol, value, delta }: { symbol: string; value: string; delta: number }) {
  const dir = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'
  const Trend = dir === 'up' ? TrendUp : dir === 'down' ? TrendDown : TrendFlat
  const tone = dir === 'up' ? 'text-bull' : dir === 'down' ? 'text-bear' : 'text-fg-subtle'

  return (
    <li className="flex shrink-0 items-baseline gap-2.5 px-5 font-mono text-[0.7rem] tracking-[0.08em] whitespace-nowrap">
      <span className="text-fg-subtle uppercase">{symbol}</span>
      <span className="text-fg">{value}</span>
      <span className={`flex items-baseline gap-1 ${tone}`}>
        <Trend className="translate-y-[0.1em] text-[0.6em]" />
        <span>
          {delta > 0 ? '+' : ''}
          {delta === 0 ? '0.0' : delta}
        </span>
        <span className="sr-only">
          {dir === 'up' ? 'up' : dir === 'down' ? 'down' : 'unchanged'}
        </span>
      </span>
    </li>
  )
}

export function Ticker() {
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const rail = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const moving = !reduced && !paused

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-ink/95 backdrop-blur-sm"
      // The rail is a landmark rather than a live region: nothing here updates,
      // so announcing it repeatedly would be noise.
      role="region"
      aria-label="Sample economic indicators"
    >
      <div className="flex h-11 items-stretch">
        <p className="flex shrink-0 items-center gap-2 border-r border-rule bg-surface-2 px-3 font-mono text-[0.6rem] leading-tight tracking-[0.14em] text-fg-subtle uppercase sm:px-4">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-fg-subtle" />
          <span>
            Sample<span className="hidden sm:inline"> case</span> data
            <span className="sr-only">. These figures are illustrative and are not live market data.</span>
          </span>
        </p>

        <div
          ref={rail}
          className="relative min-w-0 flex-1 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="flex w-max"
            style={
              moving
                ? { animation: 'ticker 64s linear infinite' }
                : undefined
            }
          >
            <ul className="flex items-center" aria-label="Sample economic indicators">
              {tickerRows.map((r) => (
                <Row key={r.symbol} {...r} />
              ))}
            </ul>
            {/* The seamless half. Duplicated content is decorative by
                definition, so it is hidden from assistive technology. */}
            <ul className="flex items-center" aria-hidden="true">
              {tickerRows.map((r) => (
                <Row key={`${r.symbol}-echo`} {...r} />
              ))}
            </ul>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ink to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
