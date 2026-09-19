import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Snapshot } from '../data/quotes'

/**
 * The market strip: a CP24-style band closing the hero, scrolling the snapshot
 * that `api/ticker.ts` refreshes every five minutes. It opens in the flow at the
 * foot of the first viewport, and once the reader scrolls past it, it pins under
 * the header and follows them down the page.
 *
 * It shows real prices or it shows nothing. If the server has no snapshot the
 * component renders null — no placeholder rows, no last-known numbers without
 * a timestamp, nothing that could be mistaken for a live market when it isn't.
 */

const REFRESH_MS = 5 * 60 * 1000
/** Height of the sticky site header, which the pinned strip sits under. */
const HEADER_PX = 64
/** Seconds of scroll per quote, so a longer board scrolls proportionally. */
const SECONDS_EACH = 6

/** Sign carries direction as well as colour, so the strip survives greyscale. */
const signed = (n: number, digits = 2) =>
  `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(digits)}`

function Quotes({ snapshot, hidden }: { snapshot: Snapshot; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center font-mono text-[0.68rem] tracking-[0.06em] tabular-nums"
    >
      {snapshot.quotes.map((q) => {
        const up = q.change >= 0
        return (
          <li key={q.symbol} className="flex items-baseline gap-2 px-4">
            <span className="text-fg-muted">{q.symbol}</span>
            <span className="text-fg">{q.price.toFixed(2)}</span>
            <span className={up ? 'text-bull' : 'text-bear'}>
              {signed(q.change)} ({signed(q.percent)}%)
            </span>
            <span className="sr-only">
              {q.name}, {up ? 'up' : 'down'} {Math.abs(q.percent).toFixed(2)} percent
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function Ticker() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [still, setStill] = useState(false)
  /** True once the strip's place in the flow has scrolled under the header. */
  const [pinned, setPinned] = useState(false)
  const anchor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setStill(motion.matches)
    sync()
    motion.addEventListener('change', sync)
    return () => motion.removeEventListener('change', sync)
  }, [])

  /* Watch the strip's slot in the flow rather than the scroll position: the
     slot stops being visible exactly when the strip needs to pin, whatever the
     hero above it is doing. */
  useEffect(() => {
    const slot = anchor.current
    if (!slot) return
    const io = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting && entry.boundingClientRect.top < HEADER_PX),
      { rootMargin: `-${HEADER_PX}px 0px 0px 0px`, threshold: 0 },
    )
    io.observe(slot)
    return () => io.disconnect()
  }, [snapshot])

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const res = await fetch('/api/ticker')
        if (!res.ok) throw new Error(String(res.status))
        const data = (await res.json()) as Snapshot
        if (alive && data?.quotes?.length) setSnapshot(data)
      } catch {
        /* Leave whatever is on screen alone: a stale strip beats a flicker,
           and a strip that never loaded stays hidden. */
      }
    }
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  if (!snapshot) return null

  const taken = new Date(snapshot.fetchedAt)
  const time = taken.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    /* The slot holds the strip's 2.25rem for the rest of the page, so pinning
       it lifts nothing underneath. */
    <div ref={anchor} className="h-9">
      <section
        aria-label="Market data"
        className={`flex h-9 items-stretch border-t border-rule bg-ink/95 backdrop-blur-sm ${
          pinned ? 'fixed inset-x-0 top-16 z-40 border-b' : ''
        }`}
      >
        <div
          className={`group relative min-w-0 flex-1 ${still ? 'overflow-x-auto' : 'overflow-hidden'}`}
        >
          {still ? (
            /* No crawl under reduced motion: the same board, scrollable by hand,
               with nothing moving on its own. */
            <div className="flex h-full items-center">
              <Quotes snapshot={snapshot} />
            </div>
          ) : (
            <div
              style={
                { '--ticker-duration': `${snapshot.quotes.length * SECONDS_EACH}s` } as CSSProperties
              }
              className="flex h-full w-max items-center [animation:ticker_var(--ticker-duration)_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
            >
              <Quotes snapshot={snapshot} />
              {/* A second pass, so the loop has no gap to cross. */}
              <Quotes snapshot={snapshot} hidden />
            </div>
          )}
        </div>

        <p className="hidden shrink-0 items-center border-l border-rule px-4 font-mono text-[0.62rem] tracking-[0.2em] text-fg-subtle uppercase sm:flex">
          <span className="sr-only">Prices as of </span>
          {time}
        </p>
      </section>
    </div>
  )
}
