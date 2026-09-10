import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { contacts, event, formEndpoint } from '../data/site'
import { Container } from './layout'
import { ArrowRight } from './Icon'

/**
 * Registration.
 *
 * The submit endpoint is deliberately unset in site.ts — the service has not
 * been chosen. Rather than shipping a form that silently swallows a
 * submission, the unconfigured state is designed: the form still validates and
 * still tells the visitor exactly how to reach us. Set `formEndpoint` and the
 * same component posts for real, with the pending, error and success states
 * already built.
 */

type State = 'idle' | 'pending' | 'sent' | 'error'

const field =
  'mt-2 w-full border border-rule bg-surface px-4 py-3 text-fg transition-colors placeholder:text-fg-subtle hover:border-rule-strong focus:border-brand focus:outline-none disabled:opacity-50'
const label = 'font-mono text-[0.68rem] tracking-[0.2em] text-fg-subtle uppercase'

export function Register() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState<string | null>(null)
  const formId = useId()
  const general = contacts[0]

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formEndpoint) return

    setState('pending')
    setError(null)
    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.currentTarget),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('sent')
    } catch {
      setState('error')
      setError(
        `We could not send that. Nothing was lost — email ${general.value} and we will register you by hand.`,
      )
    }
  }

  const busy = state === 'pending'

  return (
    <section id="register" aria-labelledby="register-heading" className="border-t border-rule py-20 md:py-28">
      <Container>
        <div className="grid gap-x-14 gap-y-12 md:grid-cols-12">
          <div className="min-w-0 md:col-span-5">
            <h2 id="register-heading" className="text-3xl md:text-4xl">
              Put a team on the floor.
            </h2>
            <p className="mt-6 text-fg-muted">
              Applications for {event.season} close on {event.deadline}. Send this and we will reply
              with the delegate pack, the workshop dates, and a waiver request if you need one.
            </p>
            <p className="mt-4 text-fg-muted">
              You do not need a full team. Register alone and we will place you.
            </p>

            <dl className="mt-10 border-t border-rule">
              {contacts.map((c) => (
                <div
                  key={c.label}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-4"
                >
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
            {state === 'sent' ? (
              <div className="border border-brand bg-brand-wash p-8">
                <h3 className="font-display text-2xl text-fg">That is in.</h3>
                <p className="mt-4 text-fg-muted">
                  We reply within two working days. If you do not hear from us, write to{' '}
                  <a href={general.href} className="text-fg underline">
                    {general.value}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setState('idle')}
                  className="mt-6 border-b border-rule-strong pb-1 text-sm text-fg-muted transition-colors hover:border-brand hover:text-fg"
                >
                  Register someone else
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${formId}-name`} className={label}>
                      Name
                    </label>
                    <input
                      id={`${formId}-name`}
                      name="name"
                      required
                      autoComplete="name"
                      disabled={busy}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${formId}-email`} className={label}>
                      Email
                    </label>
                    <input
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={busy}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${formId}-school`} className={label}>
                      School
                    </label>
                    <input
                      id={`${formId}-school`}
                      name="school"
                      disabled={busy}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${formId}-role`} className={label}>
                      Writing as
                    </label>
                    <select
                      id={`${formId}-role`}
                      name="role"
                      defaultValue="student"
                      disabled={busy}
                      className={field}
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher or chaperone</option>
                      <option value="judge">Prospective judge</option>
                      <option value="sponsor">Sponsor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor={`${formId}-message`} className={label}>
                    Anything we should know
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={5}
                    disabled={busy}
                    className={field}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  <button
                    type="submit"
                    disabled={busy || !formEndpoint}
                    className="group inline-flex items-center gap-2.5 bg-brand px-6 py-3 font-medium text-ink transition-colors hover:bg-fg disabled:cursor-not-allowed disabled:bg-rule-strong disabled:text-fg-muted"
                  >
                    {busy ? 'Sending' : 'Send'}
                    {!busy && (
                      <ArrowRight className="text-[1.1em] transition-transform group-hover:translate-x-0.5" />
                    )}
                  </button>

                  {/* The unconfigured state, said plainly rather than hidden
                      behind a button that pretends to work. */}
                  {!formEndpoint && (
                    <p className="text-sm text-fg-muted">
                      Online registration opens shortly. Until then, email{' '}
                      <a href={general.href} className="text-fg underline">
                        {general.value}
                      </a>{' '}
                      and we will register you by hand.
                    </p>
                  )}
                </div>

                <p aria-live="polite" className="min-h-[1.5rem] text-sm">
                  {state === 'error' && error && <span className="text-bear">{error}</span>}
                  {busy && <span className="text-fg-muted">Sending your registration…</span>}
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
