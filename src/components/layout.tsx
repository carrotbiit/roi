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
  id?: string
  labelledBy: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`border-t border-rule py-20 md:py-28 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}

/**
 * The heading treatment shared by every section. There is no eyebrow above it
 * on purpose: a heading that needs a label above it to explain itself has not
 * been written yet. The optional standfirst carries what a kicker would have.
 */
export function SectionHead({
  id,
  title,
  standfirst,
  className = '',
}: {
  id: string
  title: string
  standfirst?: string
  className?: string
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 id={id} className="text-3xl md:text-4xl">
        {title}
      </h2>
      {standfirst && <p className="mt-5 text-lg text-fg-muted">{standfirst}</p>}
    </div>
  )
}

/** The masthead of an interior route. */
export function PageHead({
  id,
  title,
  standfirst,
}: {
  id: string
  title: string
  standfirst: string
}) {
  return (
    <header className="border-b border-rule py-16 md:py-24">
      <Container>
        <h1 id={id} className="max-w-3xl text-4xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-muted md:text-xl">{standfirst}</p>
      </Container>
    </header>
  )
}
