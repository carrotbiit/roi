import { useEffect, useRef } from 'react'

/**
 * Site backdrop: a candlestick series fixed behind every section, crawling
 * left. The price is an Ornstein–Uhlenbeck walk — it wanders but is always
 * pulled back to the base, so it stays inside the plot and the scale never has
 * to move. Invented data, decorative only.
 *
 * Nothing here is stepped. The price advances every frame, the candle at the
 * right edge grows with it — open fixed, close tracking the price, wick
 * stretching to each new extreme — and the whole series translates by a
 * fraction of a column per frame, so the crawl is continuous. React renders the
 * rects once; the loop writes attributes straight to the DOM.
 */

type Candle = { o: number; h: number; l: number; c: number }

/** Columns across the plot. One more is drawn just off the left edge. */
const VISIBLE = 64
const COUNT = VISIBLE + 1

const STEP = 10
const BODY = 6.2
const WICK = 1.2
const PLOT_W = VISIBLE * STEP
const PLOT_H = 1000

/** How long a candle takes to form. The series crosses in VISIBLE × this. */
const CANDLE_MS = 1900
/**
 * The walk only moves on a tick — four per candle — and the drawn price eases
 * toward the last tick over EASE_MS. So the forming candle glides between a
 * handful of levels instead of trembling on every frame, which is both slower
 * and much quieter at the right edge.
 */
const TICK_MS = CANDLE_MS / 4
const EASE_MS = 420

const BASE = 140
/** The walk is held inside this band, so the price scale never has to rescale. */
const BAND = 13
const TICK = 5
const top = BASE + BAND + 4
const bottom = BASE - BAND - 4

/** Price to a 0–1 position from the top of the plot. */
const at = (price: number) => (top - price) / (top - bottom)
const y = (price: number) => at(price) * PLOT_H

const ticks: number[] = []
for (let t = Math.ceil(bottom / TICK) * TICK; t < top; t += TICK) ticks.push(t)

/** Roughly normal, from three uniforms: most steps small, the odd one sharp. */
const gauss = () => Math.random() + Math.random() + Math.random() - 1.5

/**
 * Mean reversion and volatility, both per candle. Volatility sets how tall a
 * typical body is: at this level the median candle is a few percent of the plot
 * and the walk wanders over roughly half of it, which is enough to read as a
 * chart through the scrim without ever reaching the band.
 */
const PULL = 0.03
const VOL = 3

/**
 * One step of the walk over `k` candles' worth of time. Noise scales with the
 * square root, so the series has the same character however long a frame ran.
 *
 * `k` is clamped before the square root, and a non-finite result falls back to
 * the base price: a single NaN here would otherwise flow into the live candle
 * and, one close at a time, poison every candle in the series.
 */
function advance(price: number, k: number): number {
  const step = Math.max(k, 0)
  const v = price + (BASE - price) * PULL * step + gauss() * VOL * Math.sqrt(step)
  if (!Number.isFinite(v)) return BASE
  return Math.min(BASE + BAND, Math.max(BASE - BAND, v))
}

/** A closed series, burnt in past the visible window so it opens mid-trend. */
function seed(): { candles: Candle[]; price: number } {
  let price = BASE
  const candles: Candle[] = []
  for (let i = 0; i < COUNT + 200; i++) {
    const o = price
    let h = o
    let l = o
    /* Four intra-candle samples: enough for wicks that overshoot the body. */
    for (let s = 0; s < 4; s++) {
      price = advance(price, 0.25)
      h = Math.max(h, price)
      l = Math.min(l, price)
    }
    candles.push({ o, h, l, c: price })
  }
  return { candles: candles.slice(-COUNT), price }
}

export function MarketBackdrop() {
  const wicks = useRef<(SVGRectElement | null)[]>([])
  const bodies = useRef<(SVGRectElement | null)[]>([])
  const crawl = useRef<SVGGElement>(null)
  const marker = useRef<HTMLDivElement>(null)
  const tag = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const { candles, price: opening } = seed()
    /** Where the walk has got to, and the eased price actually drawn. */
    let target = opening
    let price = opening

    /** Draw column i from its candle. */
    const paint = (i: number) => {
      const { o, h, l, c } = candles[i]
      const wick = wicks.current[i]
      const body = bodies.current[i]
      if (!wick || !body) return
      if (!Number.isFinite(o + h + l + c)) return
      const fill = c >= o ? 'var(--color-bull)' : 'var(--color-bear)'
      const bodyTop = y(Math.max(o, c))
      wick.setAttribute('y', `${y(h)}`)
      wick.setAttribute('height', `${Math.max(y(l) - y(h), 1)}`)
      wick.setAttribute('fill', fill)
      body.setAttribute('y', `${bodyTop}`)
      body.setAttribute('height', `${Math.max(y(Math.min(o, c)) - bodyTop, 2)}`)
      body.setAttribute('fill', fill)
    }

    const paintAll = () => {
      for (let i = 0; i < COUNT; i++) paint(i)
    }

    /**
     * The live price rule, dot and badge at the right edge. The rule glides
     * every frame; the badge only reprints a few times a second, since digits
     * flickering at 60fps pull the eye away from the copy in front.
     */
    let printed = 0
    const mark = (now: number) => {
      if (marker.current) marker.current.style.top = `${at(price) * 100}%`
      if (tag.current && now - printed > 250) {
        printed = now
        tag.current.textContent = price.toFixed(2)
      }
    }

    paintAll()
    mark(performance.now())

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let last = performance.now()
    let elapsed = 0
    let sinceTick = 0

    const frame = (now: number) => {
      /* Clamp the delta: a backgrounded tab resumes rather than fast-forwards,
         and a frame timestamp older than the clock read at setup — which some
         browsers hand out on the first callback — cannot run the walk
         backwards. */
      const dt = Math.min(Math.max(now - last, 0), CANDLE_MS)
      last = now
      elapsed += dt
      sinceTick += dt

      while (sinceTick >= TICK_MS) {
        sinceTick -= TICK_MS
        target = advance(target, TICK_MS / CANDLE_MS)
      }
      /* Exponential ease, written against elapsed time rather than a fixed
         fraction, so the glide is identical at any frame rate. */
      price += (target - price) * (1 - Math.exp(-dt / EASE_MS))

      const live = candles[COUNT - 1]
      live.c = price
      live.h = Math.max(live.h, price)
      live.l = Math.min(live.l, price)

      if (elapsed >= CANDLE_MS) {
        elapsed -= CANDLE_MS
        candles.shift()
        candles.push({ o: price, h: price, l: price, c: price })
        paintAll()
      } else {
        paint(COUNT - 1)
      }

      /* A fraction of a column of crawl, reset by the shift above. */
      const slide = -(elapsed / CANDLE_MS) * STEP
      if (crawl.current) crawl.current.style.transform = `translateX(${slide}px)`
      mark(now)

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 sm:right-14 sm:bottom-9">
        <svg
          viewBox={`0 0 ${PLOT_W} ${PLOT_H}`}
          preserveAspectRatio="none"
          className="animate-fade h-full w-full"
        >
          <g stroke="var(--color-rule)" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {ticks.map((t) => (
              <line key={t} x1="0" y1={y(t)} x2={PLOT_W} y2={y(t)} />
            ))}
          </g>

          {/* Column i sits one step left of its index, so the forming candle
              lands fully inside the right edge rather than half off it. */}
          <g ref={crawl} opacity="0.9">
            {Array.from({ length: COUNT }, (_, i) => {
              const x = (i - 1) * STEP + STEP / 2
              return (
                <g key={i}>
                  <rect
                    ref={(el) => {
                      wicks.current[i] = el
                    }}
                    x={x - WICK / 2}
                    width={WICK}
                  />
                  <rect
                    ref={(el) => {
                      bodies.current[i] = el
                    }}
                    x={x - BODY / 2}
                    width={BODY}
                  />
                </g>
              )
            })}
          </g>
        </svg>

        {/* The right edge: the live price, its rule and its badge. */}
        <div ref={marker} className="animate-fade absolute inset-x-0 [animation-delay:0.9s]">
          <div className="h-px w-full bg-bull/20" />
          <div className="absolute top-0 right-0 size-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-bull/80" />
          <span
            ref={tag}
            className="absolute top-0 right-0 ml-3 hidden -translate-y-1/2 translate-x-full bg-bull/90 px-1.5 py-0.5 font-mono text-[10px] leading-none text-ink tabular-nums sm:block"
          />
        </div>

        <div className="animate-fade hidden [animation-delay:1.1s] sm:block">
          {ticks.map((t) => (
            <span
              key={t}
              style={{ top: `${at(t) * 100}%` }}
              className="absolute right-0 -translate-y-1/2 translate-x-full pl-3 font-mono text-[10px] leading-none text-fg-subtle tabular-nums"
            >
              {t.toFixed(2)}
            </span>
          ))}
        </div>
      </div>

      {/* One flat scrim, so the series sits at the same weight everywhere
          rather than fading across the page. */}
      <div className="absolute inset-0 bg-ink/80" />
    </div>
  )
}
