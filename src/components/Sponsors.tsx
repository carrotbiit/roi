import { sponsors } from '../data/site'
import { Section } from './layout'

/**
 * Thanks to the people paying for the room. One logo for now, so the row is
 * centred rather than stretched: adding partners fills it left to right without
 * touching the layout.
 */
export function Sponsors() {
  return (
    <Section id="sponsors" labelledBy="sponsors-heading" className="pb-8! md:pb-10!">
      <h2 id="sponsors-heading" className="text-3xl md:text-4xl">
        Thank You to our Sponsors:
      </h2>

      <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-16 gap-y-12 md:mt-12">
        {sponsors.map((sponsor) => {
          const logo = (
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              loading="lazy"
              className="h-28 w-auto max-w-[360px] object-contain md:h-36"
            />
          )
          return (
            <li key={sponsor.name}>
              {sponsor.href ? (
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block transition-opacity hover:opacity-80"
                >
                  {logo}
                </a>
              ) : (
                logo
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
