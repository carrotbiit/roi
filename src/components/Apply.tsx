import { event, expectations } from '../data/site'
import { Section } from './layout'

/**
 * The apply page while registration is still closed: the status and the
 * interest form first, because they are what a reader came for, then what ROI
 * is and what to expect, then the form again for anyone who read to the end.
 */

const label = 'font-mono text-xs tracking-[0.24em] text-fg-subtle uppercase'

/** The one call to action on the page, used at the top and the bottom. */
function FormButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={event.interestForm}
      target="_blank"
      rel="noreferrer"
      className={`inline-block bg-brand px-6 py-3 text-lg font-medium text-ink transition-colors hover:bg-brand-deep hover:text-fg ${className}`}
    >
      Fill out the interest form
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export function Apply() {
  return (
    <Section id="apply" labelledBy="apply-heading">
      <header className="max-w-2xl">
        <h2 id="apply-heading" className="text-4xl md:text-5xl">
          Applications are opening soon
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-fg/80 md:text-xl">
          Interested in investing, business, or finance? Register your interest now and we’ll
          keep you updated.
        </p>
        <FormButton className="mt-8" />
      </header>

      <div className="mt-12 grid gap-12 border-t border-rule pt-8 md:mt-16 md:grid-cols-12 md:gap-10">
        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-fg/80 md:col-span-7 md:text-lg">
          <h3 className={label}>About the competition</h3>
          <p>
            <span className="text-brand">ROI</span> is a high school stock pitch competition hosted
            at Wilfrid Laurier University’s Lazaridis Building in late November, in partnership with
            LAMA (Laurier Asset Management Association), with $1,000+ in prizes.
          </p>
          <p>
            <strong className="font-medium text-brand">
              No prior investing or finance experience is required.
            </strong>{' '}
            Even if you come in knowing nothing about investing, you’ll leave with the knowledge and
            tools you need to build and defend your own investment idea through our workshops.
          </p>
          <p>
            ROI gives high school students the opportunity to learn about investing, work with other
            students, and experience a university-level finance competition. Before the
            competition, participants will take part in LAMA-led workshops covering company
            analysis, valuation, and how to develop an investment thesis.
          </p>
          <p>
            During the competition, teams of 3–4 students will be partnered with a LAMA analyst and
            given case studies developed by Laurier professors focused on a sector. Teams will
            conduct their own research, develop an investment thesis, and ultimately present and
            defend their ideas to a panel of Laurier professors.
          </p>
          <p>
            Beyond the competition, ROI will provide opportunities to network with like-minded
            students, Laurier professors, and LAMA executives, as well as take part in a tour of the
            Laurier campus.
          </p>
        </div>

        <div className="md:col-span-5">
          <h3 className={label}>What to expect</h3>
          <ul className="mt-6 border-t border-rule">
            {expectations.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-rule py-4 text-base text-fg/85"
              >
                <span aria-hidden="true" className="inline-block size-1.5 shrink-0 translate-y-[-0.15em] bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 max-w-2xl border-t border-rule pt-8 md:mt-16">
        <h3 className={label}>Interest form</h3>
        <p className="mt-6 text-base leading-relaxed text-fg/80 md:text-lg">
          If you’re interested, fill out the form below. This is an interest form and does not
          commit you to participating. It simply allows us to keep you updated as we release
          information about registration, workshops, teams, and the competition.
        </p>
        <FormButton className="mt-8" />
      </div>
    </Section>
  )
}
