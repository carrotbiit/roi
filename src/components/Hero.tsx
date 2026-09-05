import { event } from '../data/site'
import { TaglineRule, Wordmark } from './Brand'
import { HeroChart } from './HeroChart'
import { Container } from './layout'

/** Entrance timings, in the order the eye should pick things up. */
const delay = {
  mark: '0.15s',
  copy: '0.35s',
  actions: '0.5s',
  footer: '0.7s',
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden"
    >
      <HeroChart />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ink to-transparent"
      />

      <Container className="flex flex-1 flex-col items-center justify-center py-16 text-center md:py-20">
        <div className="animate-rise w-full max-w-xl" style={{ animationDelay: delay.mark }}>
          <Wordmark className="text-[clamp(4.5rem,15vw,8.5rem)] tracking-[0.01em]" />
          <div className="mt-6">
            <TaglineRule text={event.tagline} />
          </div>
        </div>

        <h1
          className="animate-rise mt-10 max-w-2xl text-3xl md:text-[2.75rem]"
          style={{ animationDelay: delay.copy }}
        >
          A macroeconomics pitch competition for high school students.
        </h1>

        <div
          className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          style={{ animationDelay: delay.actions }}
        >
          <a
            href="mailto:hello@roi-pitch.org"
            className="bg-brand px-6 py-3 font-medium text-ink transition-colors hover:bg-brand-deep hover:text-fg"
          >
            Apply to compete
          </a>
          <a
            href="mailto:partners@roi-pitch.org"
            className="border-b border-rule-strong pb-1 text-fg-muted transition-colors hover:border-brand hover:text-fg"
          >
            Sponsor the event
          </a>
        </div>
      </Container>

      <Container
        className="animate-rise flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-rule py-5 font-mono text-[0.68rem] tracking-[0.22em] text-fg-subtle uppercase"
        style={{ animationDelay: delay.footer }}
      >
        <span className="text-fg-muted">
          Date
          <span className="px-2 text-rule-strong">/</span>
          Place
        </span>
        <a href="#about" className="transition-colors hover:text-brand">
          Essentials <span aria-hidden="true">↓</span>
        </a>
      </Container>
    </section>
  )
}
