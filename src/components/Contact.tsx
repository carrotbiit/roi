import { useState } from 'react'
import type { FormEvent } from 'react'
import { contacts, event } from '../data/site'
import { Section, SectionIndex } from './layout'

const field =
  'mt-2 w-full border border-rule bg-surface px-4 py-3 text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none'
const label = 'font-mono text-xs tracking-[0.24em] text-fg-subtle uppercase'

export function Contact() {
  const [sent, setSent] = useState(false)

  /** Placeholder submit. Point this at a form endpoint before launch. */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <Section id="contact" labelledBy="contact-heading">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="min-w-0 md:col-span-5 md:sticky md:top-24 md:self-start">
          <SectionIndex n="05" label="Contact" />
          <h2 id="contact-heading" className="mt-6 text-3xl md:text-4xl">
            Put a team on the floor.
          </h2>
          <p className="mt-6 text-fg-muted">
            Registration for {event.season} closes on {event.deadline}. Send the form and we will
            reply with the delegate pack, the primer, and the waiver request if you need one.
          </p>

          <dl className="mt-10 border-t border-rule">
            {contacts.map((c) => (
              <div key={c.label} className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
                <dt className={label}>{c.label}</dt>
                <dd>
                  <a
                    href={c.href}
                    className="font-mono text-sm text-fg transition-colors hover:text-brand"
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 md:col-span-6 md:col-start-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={label}>
                  Name
                </label>
                <input id="name" name="name" required autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="email" className={label}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="school" className={label}>
                  School
                </label>
                <input id="school" name="school" className={field} />
              </div>
              <div>
                <label htmlFor="role" className={label}>
                  Writing as
                </label>
                <select id="role" name="role" defaultValue="student" className={field}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher or chaperone</option>
                  <option value="judge">Prospective judge</option>
                  <option value="sponsor">Sponsor</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className={label}>
                Message
              </label>
              <textarea id="message" name="message" rows={5} className={field} />
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                className="bg-brand px-6 py-3 font-medium text-ink transition-colors hover:bg-brand-deep hover:text-fg"
              >
                Send
              </button>
              <p aria-live="polite" className="text-sm text-fg-muted">
                {sent
                  ? 'Received. This demo form does not send mail yet; write to hello@joinroi.ca in the meantime.'
                  : 'Not yet connected to a mail service.'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </Section>
  )
}
