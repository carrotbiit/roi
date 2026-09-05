/**
 * The ROI lockup, rebuilt in markup so it stays crisp at any size and inherits
 * the surrounding font size: white R and I, violet square in place of the O.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="ROI"
      className={`inline-flex items-center font-display leading-none font-bold tracking-[0.04em] ${className}`}
    >
      <span aria-hidden="true">R</span>
      <span
        aria-hidden="true"
        className="mx-[0.1em] inline-block aspect-square w-[0.72em] -translate-y-[0.045em] rounded-[0.16em] border-[0.13em] border-brand"
      />
      <span aria-hidden="true">I</span>
    </span>
  )
}

/** The rule and tagline that sit beneath the mark in the logo. */
export function TaglineRule({ text }: { text: string }) {
  return (
    <div className="w-full">
      <hr className="border-0 border-t border-brand/70" />
      <p className="mt-3 flex items-center gap-4 font-mono text-[0.68rem] tracking-[0.32em] text-fg uppercase sm:text-xs">
        <span aria-hidden="true" className="text-brand">
          &gt;
        </span>
        <span className="min-w-0 flex-1">{text}</span>
        <span aria-hidden="true" className="h-4 w-2 shrink-0 bg-brand" />
      </p>
    </div>
  )
}
