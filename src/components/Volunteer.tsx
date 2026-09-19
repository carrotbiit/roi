import { event, volunteerFacts, volunteerRoles } from '../data/site'
import { Section } from './layout'

/**
 * The volunteer page: the roles that need filling on the day, the terms that
 * go with them, and one way to put your name down. Commitments are set in gold
 * — the site's colour for time — so a reader can find the shift that fits
 * before reading a word about the job.
 */

const label = 'font-mono text-xs tracking-[0.24em] text-fg-subtle uppercase'

export function Volunteer() {
  return (
    <Section id="volunteer" labelledBy="volunteer-heading">
      <header className="max-w-2xl">
        <h2 id="volunteer-heading" className="text-4xl md:text-5xl">
          Volunteer
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-fg/80 md:text-xl">
          A competition day runs on the people holding the clock. Most roles need no economics
          background at all — they need someone who turns up, keeps a room on schedule and is
          straight with a nervous fifteen-year-old about how long they have left.
        </p>
      </header>

      <ul className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
        {volunteerRoles.map((role) => (
          <li key={role.n} className="flex flex-col bg-ink p-6">
            <h3 className="font-display text-xl leading-tight text-fg">{role.title}</h3>
            <p className="mt-2 font-mono text-xs tracking-[0.2em] text-gold uppercase">
              {role.commitment}
            </p>
            <p className="mt-4 text-base leading-relaxed text-fg/75">{role.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-10 border-t border-rule pt-8 md:mt-16 md:grid-cols-12">
        <div className="min-w-0 md:col-span-5">
          <h3 className={label}>Putting your name down</h3>
          <p className="mt-6 text-lg leading-relaxed text-fg/80">
            Write to us with the role you want and the hours you can give. We confirm shifts in the
            fortnight before {event.date}, and you can change your mind up to the day without
            explaining yourself.
          </p>
          <a
            href="mailto:hello@roi-pitch.org"
            className="mt-8 inline-block bg-brand px-6 py-3 text-lg font-medium text-ink transition-colors hover:bg-brand-deep hover:text-fg"
          >
            Volunteer for the day
          </a>
        </div>

        <dl className="min-w-0 border-t border-rule md:col-span-6 md:col-start-7 md:border-t-0">
          {volunteerFacts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
            >
              <dt className={label}>{fact.label}</dt>
              <dd className="text-sm text-fg/80">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
