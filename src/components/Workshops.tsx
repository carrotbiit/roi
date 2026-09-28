import { Section } from './layout'

/**
 * The workshop programme. A single announcement until the sessions are
 * confirmed.
 */
export function Workshops() {
  return (
    <Section id="workshops" labelledBy="workshops-heading">
      <h2 id="workshops-heading" className="text-4xl md:text-5xl">
        Workshops
      </h2>

      <p className="mt-10 max-w-2xl text-base leading-relaxed text-fg/75 md:mt-12 md:text-lg">
        ROI will be running three workshops throughout the event, partnering with the Laurier
        Asset Management Association (LAMA). More details to be annouced.
      </p>
    </Section>
  )
}
