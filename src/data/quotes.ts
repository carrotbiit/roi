/**
 * The wire format between `api/ticker.ts` and the market strip. It lives on the
 * client side of the tree on purpose: the server imports these types, so the
 * client never has to import the server.
 */

export type Quote = {
  symbol: string
  /** Company or fund name, for assistive technology. */
  name: string
  /** Last price. */
  price: number
  /** Change and percent change on the previous close. */
  change: number
  percent: number
}

export type Snapshot = {
  /** When this snapshot was taken, ISO 8601. */
  fetchedAt: string
  quotes: Quote[]
}
