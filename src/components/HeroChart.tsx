/**
 * Hero backdrop: a Japanese candlestick chart with a price scale on the right
 * and the competition day along the bottom. The series is fixed sample data,
 * not live prices, and is decorative only.
 */

type Candle = [open: number, high: number, low: number, close: number]

const CANDLES: Candle[] = [
  [132.0, 132.04, 131.43, 131.8], [131.8, 132.54, 131.15, 131.61], [131.61, 132.75, 131.46, 132.5], [132.5, 132.84, 132.0, 132.57],
  [132.57, 134.18, 132.54, 133.9], [133.9, 134.61, 133.3, 133.85], [133.85, 135.31, 133.64, 134.62], [134.62, 135.58, 133.9, 134.88],
  [134.88, 136.01, 134.18, 135.72], [135.72, 136.13, 134.95, 135.72], [135.72, 136.48, 135.08, 135.86], [135.86, 137.25, 135.28, 136.76],
  [136.76, 138.78, 136.28, 138.09], [138.09, 140.03, 137.63, 139.25], [139.25, 140.2, 138.74, 140.19], [140.19, 140.96, 139.65, 140.58],
  [140.58, 141.05, 139.84, 140.62], [140.62, 141.89, 139.8, 141.44], [141.44, 142.26, 141.15, 141.82], [141.82, 142.49, 141.51, 141.81],
  [141.81, 142.87, 141.41, 142.77], [142.77, 143.27, 142.54, 143.25], [143.25, 144.07, 143.14, 143.36], [143.36, 143.41, 142.62, 142.84],
  [142.84, 143.55, 142.01, 143.1], [143.1, 143.54, 142.59, 143.14], [143.14, 143.43, 141.82, 142.57], [142.57, 143.51, 142.34, 142.85],
  [142.85, 143.36, 141.47, 142.23], [142.23, 143.41, 141.86, 142.58], [142.58, 143.19, 141.68, 142.03], [142.03, 142.69, 141.72, 142.16],
  [142.16, 143.14, 141.49, 142.59], [142.59, 144.03, 142.03, 143.28], [143.28, 143.57, 141.77, 141.91], [141.91, 142.58, 140.04, 140.75],
  [140.75, 141.07, 138.59, 139.17], [139.17, 139.91, 138.14, 138.75], [138.75, 139.24, 137.92, 138.04], [138.04, 138.32, 136.17, 136.77],
  [136.77, 137.26, 135.09, 135.42], [135.42, 136.07, 133.8, 134.37], [134.37, 134.85, 132.36, 133.07], [133.07, 133.75, 132.48, 133.41],
  [133.41, 134.12, 132.83, 133.82], [133.82, 135.81, 133.6, 135.12], [135.12, 136.69, 134.6, 136.26], [136.26, 137.24, 135.61, 136.82],
  [136.82, 137.23, 136.39, 137.13], [137.13, 138.22, 137.08, 137.61], [137.61, 139.02, 137.24, 138.28], [138.28, 138.74, 137.72, 138.52],
  [138.52, 139.48, 137.92, 139.17], [139.17, 139.66, 138.54, 139.04], [139.04, 139.72, 138.58, 138.82], [138.82, 139.0, 138.09, 138.82],
  [138.82, 139.96, 138.39, 139.89], [139.89, 141.14, 139.34, 140.31], [140.31, 140.32, 139.85, 140.09], [140.09, 140.75, 139.06, 139.81],
  [139.81, 140.02, 139.35, 140.01], [140.01, 140.49, 139.39, 140.45], [140.45, 140.69, 139.48, 140.27], [140.27, 141.69, 139.75, 140.85],
]

const HOURS = ['08:30', '10:00', '12:00', '14:00', '16:00', '18:00']

const STEP = 10
const BODY = 6.4
const WICK = 1.3
const PLOT_H = 1000
const PLOT_W = CANDLES.length * STEP
const TICK = 4

const headroom = 0.06
const high = Math.max(...CANDLES.map((c) => c[1]))
const low = Math.min(...CANDLES.map((c) => c[2]))
const top = high + (high - low) * headroom
const bottom = low - (high - low) * headroom

/** Price to a 0–1 position from the top of the plot. */
const at = (price: number) => (top - price) / (top - bottom)
const y = (price: number) => at(price) * PLOT_H

const ticks: number[] = []
for (let t = Math.ceil(bottom / TICK) * TICK; t < top; t += TICK) ticks.push(t)

const last = CANDLES[CANDLES.length - 1][3]

export function HeroChart() {
  return (
    <div aria-hidden="true" className="absolute top-0 right-0 bottom-16 left-0 -z-10 overflow-hidden">
      <div className="absolute top-0 right-0 bottom-0 left-0 sm:right-14 sm:bottom-9">
        <svg
          viewBox={`0 0 ${PLOT_W} ${PLOT_H}`}
          preserveAspectRatio="none"
          className="h-full w-full opacity-85"
        >
          <g stroke="var(--color-rule)" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {ticks.map((t) => (
              <line key={t} x1="0" y1={y(t)} x2={PLOT_W} y2={y(t)} />
            ))}
          </g>

          {CANDLES.map(([o, h, l, c], i) => {
            const up = c >= o
            const x = i * STEP + STEP / 2
            const bodyTop = y(Math.max(o, c))
            const bodyHeight = Math.max(y(Math.min(o, c)) - bodyTop, 2)
            return (
              <g
                key={i}
                fill={up ? 'var(--color-brand)' : 'var(--color-bear)'}
                className="animate-fade"
                style={{ animationDelay: `${0.2 + i * 0.018}s`, animationDuration: '0.5s' }}
              >
                <rect x={x - WICK / 2} y={y(h)} width={WICK} height={y(l) - y(h)} />
                <rect x={x - BODY / 2} y={bodyTop} width={BODY} height={bodyHeight} />
              </g>
            )
          })}

          <line
            x1="0"
            y1={y(last)}
            x2={PLOT_W}
            y2={y(last)}
            stroke="var(--color-brand)"
            strokeWidth="1"
            strokeDasharray="6 6"
            vectorEffect="non-scaling-stroke"
            className="animate-fade [animation-delay:1.5s]"
          />
        </svg>

        <div className="animate-fade hidden [animation-delay:1.4s] sm:block">
          {ticks.map((t) => (
            <span
              key={t}
              style={{ top: `${at(t) * 100}%` }}
              className="absolute right-0 -translate-y-1/2 translate-x-full pl-2 font-mono text-[10px] leading-none text-fg-subtle tabular-nums"
            >
              {t.toFixed(2)}
            </span>
          ))}
          <span
            style={{ top: `${at(last) * 100}%` }}
            className="absolute right-0 -translate-y-1/2 translate-x-full ml-2 bg-brand px-1.5 py-0.5 font-mono text-[10px] leading-none text-ink tabular-nums"
          >
            {last.toFixed(2)}
          </span>
          {HOURS.map((h, i) => (
            <span
              key={h}
              style={{ left: `${(i / (HOURS.length - 1)) * 100}%` }}
              className="absolute bottom-0 translate-y-6 -translate-x-1/2 font-mono text-[10px] leading-none text-fg-subtle tabular-nums"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
