import { event, schedule, venueFacts } from "../data/site";
import { Container, Section, SectionIndex } from "./layout";

export function HallBand() {
  return (
    <figure className="border-t border-rule">
      <img
        src="/img/hall.svg"
        alt=""
        width={1600}
        height={420}
        className="w-full"
      />
      <Container>
        <figcaption className="py-4 font-mono text-xs tracking-[0.24em] text-fg-subtle uppercase">
          Placeholder artwork. Replace with a photograph of the final round.
        </figcaption>
      </Container>
    </figure>
  );
}

export function Program() {
  return (
    <Section id="program" labelledBy="program-heading">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="min-w-0 md:col-span-5">
          <SectionIndex n="02" label="Program" />
          <h2 id="program-heading" className="mt-6 text-3xl md:text-4xl">
            {event.date}
          </h2>
          <p className="mt-6 text-fg-muted">
            Doors open at half past eight and awards finish by six. Timings
            below are provisional and will be confirmed to registered delegates
            two weeks before the event.
          </p>

          <figure className="mt-10 border border-rule">
            <img
              src="/img/venue.svg"
              alt=""
              width={800}
              height={600}
              className="w-full"
            />
            <figcaption className="border-t border-rule px-5 py-4">
              <p className="font-display text-lg">{event.venue}</p>
              <p className="text-sm text-fg-muted">
                {event.street}, {event.city}
              </p>
            </figcaption>
          </figure>

          <dl className="mt-8 text-sm">
            {venueFacts.map((f) => (
              <div
                key={f.label}
                className="flex justify-between gap-6 border-b border-rule py-3"
              >
                <dt className="font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">
                  {f.label}
                </dt>
                <dd className="text-right text-fg-muted">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 md:col-span-6 md:col-start-7 md:sticky md:top-24 md:self-start">
          <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-[24rem] text-left">
              <caption className="sr-only">Run of day for {event.date}</caption>
              <thead>
                <tr className="border-b border-rule-strong">
                  <th
                    scope="col"
                    className="pb-3 font-mono text-[0.68rem] font-normal tracking-[0.24em] text-fg-subtle uppercase"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="pb-3 font-mono text-[0.68rem] font-normal tracking-[0.24em] text-fg-subtle uppercase"
                  >
                    Session
                  </th>
                  <th
                    scope="col"
                    className="pb-3 text-right font-mono text-[0.68rem] font-normal tracking-[0.24em] text-fg-subtle uppercase"
                  >
                    Room
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((s) => (
                  <tr
                    key={s.time}
                    className="border-b border-rule align-baseline"
                  >
                    <th
                      scope="row"
                      className="py-5 pr-6 font-mono text-sm font-normal text-brand"
                    >
                      <time dateTime={`${event.dateISO}T${s.time}`}>
                        {s.time}
                      </time>
                    </th>
                    <td className="py-5 pr-6 font-display text-lg">
                      {s.title}
                    </td>
                    <td className="py-5 text-right text-sm text-fg-muted">
                      {s.place}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
}
