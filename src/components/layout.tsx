import type { CSSProperties, ReactNode } from 'react'

export function Container({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`} style={style}>
      {children}
    </div>
  )
}

export function Section({
  id,
  labelledBy,
  children,
  className = '',
}: {
  id: string
  labelledBy: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`border-t border-rule py-16 md:py-24 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}

/** Small monospace section index, e.g. "02 / Program". */
export function SectionIndex({ n, label }: { n: string; label: string }) {
  return (
    <p className="font-mono text-xs tracking-[0.28em] text-fg-subtle uppercase">
      <span className="text-brand">{n}</span>
      <span className="px-2">/</span>
      {label}
    </p>
  )
}
