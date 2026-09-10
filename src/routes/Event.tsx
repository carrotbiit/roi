import { Link } from 'react-router-dom'
import { event, phases, pitchFormat, rubric, schedule, venueFacts, workshops } from '../data/site'
import { ArrowRight } from '../components/Icon'
import { Container, PageHead, Section, SectionHead } from '../components/layout'

/**
 * The full description of the day. Where the home page argues, this page
 * explains: the workshops that run beforehand, the pitch and its format, the
 * run of the day, and the room it happens in.
 */
export function Event() {
  return (
    <>
      <PageHead
        id="event-heading"
        title="One sealed case, start to finish."
        standfirst={`Everything that happens on ${event.date}, and the three workshops that run before it. Published in full before you register.`}
      />

      {/* Workshops lead. They are the answer to "can I do this without
          economics coursework", which is the question that stops most people. */}
      <Section id="workshops" labelledBy="workshops-heading">
        <SectionHead
          id="workshops-heading"
          title="Workshops, before the day"
          standfirst={workshops.intro}
        />

        <ol className="mt-12 border-t border-rule">
          {workshops.sessions.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-rule py-8 md:grid-cols-[auto_1fr_1.3fr] md:items-baseline"
            >
              <span className="font-mono text-sm text-brand">
                {String(s.n).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl md:text-2xl">{s.name}</h3>
                <p className="mt-2 font-mono text-[0.7rem] tracking-[0.14em] text-fg-subtle uppercase">
                  {s.when}
                  <span aria-hidden="true" className="px-2 text-rule-strong">
                    /
                  </span>
                  {s.length}
                </p>
              </div>
              <p className="max-w-prose text-fg-muted">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-prose text-fg-muted">
          {workshops.required
            ? 'Attendance is expected of every delegate.'
            : 'None of the three is compulsory, and skipping them does not disadvantage a team on the day. They exist so that a first case is not the first time you see one.'}
        </p>
      </Section>

      {/* The pitch. */}
      <Section id="pitch" labelledBy="pitch-heading">
        <SectionHead
          id="pitch-heading"
          title="The pitch, and answering for it"
          standfirst="Fifteen minutes in front of the panel: eight to put the position, seven to defend it. The second half is where most marks move."
        />

        <dl className="mt-12 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {pitchFormat.map((f) => (
            <div key={f.label} className="bg-ink p-6">
              <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-fg-subtle uppercase">
                {f.label}
              </dt>
              <dd className="mt-4 font-display text-3xl text-fg">{f.value}</dd>
              <dd className="mt-2 text-sm text-fg-muted">{f.note}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-3">
          {phases.map((p) => (
            <div key={p.n} className="min-w-0">
              <h3 className="border-b border-rule pb-3 font-display text-xl">
                <span className="mr-3 font-mono text-sm text-brand">
                  {String(p.n).padStart(2, '0')}
                </span>
                {p.name}
              </h3>
              <p className="mt-4 text-fg-muted">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-rule pt-8">
          <h3 className="font-display text-xl">What the panel is marking</h3>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {rubric.map((r) => (
              <li key={r.criterion} className="flex items-baseline gap-3">
                <span className="font-mono text-lg text-brand">{r.weight}%</span>
                <span className="text-fg-muted">{r.criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Run of day. */}
      <Section id="schedule" labelledBy="schedule-heading">
        <SectionHead
          id="schedule-heading"
          title="Run of the day"
          standfirst="Provisional, and confirmed to registered delegates before the event."
        />

        <div className="mt-12">
          <table className="w-full text-left">
            <caption className="sr-only">Run of day for {event.date}</caption>
            <thead>
              <tr className="border-b border-rule-strong">
                {['Time', 'Session', 'Room'].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={`pb-3 font-mono text-[0.68rem] font-normal tracking-[0.2em] text-fg-subtle uppercase ${
                      i === 2 ? 'text-right' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((s) => (
                <tr key={s.time} className="border-b border-rule align-baseline hover:bg-surface">
                  <th
                    scope="row"
                    className="py-5 pr-4 font-mono text-sm font-normal text-brand sm:pr-6"
                  >
                    <time dateTime={`${event.dateISO}T${s.time}`}>{s.time}</time>
                  </th>
                  <td className="py-5 pr-4 font-display text-base text-balance sm:pr-6 sm:text-lg">
                    {s.title}
                  </td>
                  <td className="py-5 text-right text-sm text-fg-muted">{s.place}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* The room. */}
      <Section id="venue" labelledBy="venue-heading">
        <div className="grid gap-x-14 gap-y-10 md:grid-cols-2">
          <div className="min-w-0">
            <SectionHead id="venue-heading" title={event.venue} />
            <address className="mt-5 text-lg text-fg-muted not-italic">
              {event.street}
              <br />
              {event.city}
            </address>
            <p className="mt-6 max-w-prose text-fg-muted">
              Chaperones are welcome in the gallery for the final round and the awards. Preliminary
              rounds are closed so the breakout rooms stay focused on delegates.
            </p>
          </div>

          <dl className="min-w-0 border-t border-rule">
            {venueFacts.map((f) => (
              <div
                key={f.label}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-rule py-4"
              >
                <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-fg-subtle uppercase">
                  {f.label}
                </dt>
                <dd className="text-fg-muted">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <section aria-labelledby="event-cta" className="border-t border-rule py-20">
        <Container>
          <h2 id="event-cta" className="max-w-2xl text-3xl md:text-4xl">
            Applications close {event.deadline}.
          </h2>
          <Link
            to="/#register"
            className="group mt-8 inline-flex items-center gap-2.5 bg-brand px-6 py-3 font-medium text-ink transition-colors hover:bg-fg"
          >
            Apply to compete
            <ArrowRight className="text-[1.1em] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </section>
    </>
  )
}
