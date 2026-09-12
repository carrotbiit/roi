/**
 * Market data for the ticker, fetched from Finnhub on the server.
 *
 * The browser never sees the API key and never talks to Finnhub: it asks this
 * function, which holds a snapshot for five minutes and serves everyone the
 * same one. Two layers keep that promise. The module-scope `cache` covers
 * repeat hits on a warm instance, and the `s-maxage=300` header lets Vercel's
 * edge store the response so a busy minute costs exactly zero extra calls
 * upstream. Either way Finnhub sees at most one round of requests per five
 * minutes per region, well inside the free tier's 60 calls a minute.
 *
 * Deployment: set API_KEY in the Vercel project's environment variables. There
 * is no fallback and no invented data — if the key is missing or the upstream
 * fails, this returns an error and the ticker hides itself rather than showing
 * numbers nobody can stand behind.
 */

import type { Quote, Snapshot } from '../src/data/quotes'

/** The board. Order is the order they scroll past. */
const SYMBOLS = [
  { symbol: 'SPY', name: 'S&P 500' },
  { symbol: 'QQQ', name: 'Nasdaq 100' },
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'NVDA', name: 'Nvidia' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'JPM', name: 'JP Morgan' },
  { symbol: 'XOM', name: 'Exxon' },
  { symbol: 'TSLA', name: 'Tesla' },
]

const REFRESH_MS = 5 * 60 * 1000
/** Give up on a slow symbol rather than holding the whole snapshot hostage. */
const UPSTREAM_TIMEOUT_MS = 4000

let cache: { at: number; snapshot: Snapshot } | null = null
/** In-flight refresh, so a burst of cold requests still makes one round trip. */
let pending: Promise<Snapshot> | null = null

/** Finnhub's quote shape: c current, d change, dp percent, pc previous close. */
type FinnhubQuote = { c?: number; d?: number; dp?: number; pc?: number }

async function fetchQuote(
  entry: (typeof SYMBOLS)[number],
  key: string,
): Promise<Quote | null> {
  const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(entry.symbol)}&token=${encodeURIComponent(key)}`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) })
    if (!res.ok) return null
    const data = (await res.json()) as FinnhubQuote
    /* Finnhub answers 200 with zeroed fields for an unknown symbol. */
    if (!data || typeof data.c !== 'number' || data.c === 0) return null
    return {
      symbol: entry.symbol,
      name: entry.name,
      price: data.c,
      change: typeof data.d === 'number' ? data.d : 0,
      percent: typeof data.dp === 'number' ? data.dp : 0,
    }
  } catch {
    return null
  }
}

async function refresh(key: string): Promise<Snapshot> {
  const results = await Promise.all(SYMBOLS.map((entry) => fetchQuote(entry, key)))
  const quotes = results.filter((q): q is Quote => q !== null)
  if (quotes.length === 0) throw new Error('no quotes returned')
  return { fetchedAt: new Date().toISOString(), quotes }
}

function json(body: unknown, status: number, cacheable: boolean): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      /* Five minutes at the edge, then serve the old snapshot while the next
         one is fetched, so a viewer never waits on Finnhub. */
      'cache-control': cacheable
        ? 'public, s-maxage=300, stale-while-revalidate=600'
        : 'no-store',
    },
  })
}

/** Vercel's Web Handler signature: a named method export returning a Response. */
export async function GET(): Promise<Response> {
  const key = process.env.API_KEY
  if (!key) return json({ error: 'API_KEY is not set on the server' }, 500, false)

  const now = Date.now()
  if (cache && now - cache.at < REFRESH_MS) return json(cache.snapshot, 200, true)

  try {
    pending ??= refresh(key)
    const snapshot = await pending
    cache = { at: Date.now(), snapshot }
    return json(snapshot, 200, true)
  } catch {
    /* Upstream is down. A stale snapshot beats an empty ticker; only when we
       have nothing at all does the client get told to hide. */
    if (cache) return json(cache.snapshot, 200, false)
    return json({ error: 'market data unavailable' }, 502, false)
  } finally {
    pending = null
  }
}
