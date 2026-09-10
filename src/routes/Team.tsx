import { contacts, team } from '../data/site'
import { ArrowRight } from '../components/Icon'
import { Container, PageHead, Section, SectionHead } from '../components/layout'

/**
 * Meet the team.
 *
 * `team.members` is empty and no names are invented. The page renders its
 * founding state instead: what the team does, and an open call. Add entries to
 * `team.members` in site.ts and the roster replaces the call automatically,
 * with or without photographs.
 */
export function Team() {
  const hasRoster = team.members.length > 0
  const general = contacts[0]

  return (
    <>
      <PageHead
        id="team-heading"
        title="The people running it."
        standfirst={team.intro}
      />

      {hasRoster ? (
        <Section labelledBy="roster-heading">
          <SectionHead id="roster-heading" title="Organising committee" />
          <ul className="mt-12 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {team.members.map((m) => (
              <li key={m.name} className="flex flex-col bg-ink p-7">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt=""
                    width={320}
                    height={320}
                    loading="lazy"
                    className="mb-6 aspect-square w-full object-cover grayscale"
                  />
                ) : (
                  /* No photograph: the initials carry the slot rather than a
                     grey silhouette standing in for a face. */
                  <span
                    aria-hidden="true"
                    className="mb-6 flex aspect-square w-full items-center justify-center border border-rule bg-surface font-display text-5xl text-rule-strong"
                  >
                    {m.name
                      .split(' ')
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                )}
                <h3 className="font-display text-xl">{m.name}</h3>
                <p className="mt-1 font-mono text-[0.68rem] tracking-[0.16em] text-brand uppercase">
                  {m.role}
                </p>
                {m.affiliation && (
                  <p className="mt-2 text-sm text-fg-subtle">{m.affiliation}</p>
                )}
                {m.bio && <p className="mt-4 text-sm text-fg-muted">{m.bio}</p>}
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        <Section labelledBy="founding-heading">
          <div className="grid gap-x-14 gap-y-10 md:grid-cols-[1fr_1.2fr]">
            <SectionHead
              id="founding-heading"
              title="Being assembled now."
              standfirst="The founding committee is still forming, so rather than fill this page with names that are not confirmed, here is the work it covers."
            />
            <div className="min-w-0">
              <ul className="border-t border-rule">
                {team.roles.map((role) => (
                  <li
                    key={role}
                    className="flex items-baseline gap-4 border-b border-rule py-4 text-fg-muted"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-rule-strong" />
                    {role}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-prose text-fg-muted">
                Profiles go up here as each seat is filled.
              </p>
            </div>
          </div>
        </Section>
      )}

      <section aria-labelledby="join-heading" className="border-t border-rule py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 id="join-heading" className="text-3xl md:text-4xl">
              {hasRoster ? 'Want to join them?' : 'Want a seat on it?'}
            </h2>
            <p className="mt-6 text-fg-muted">
              We are looking for organisers, case writers, and judges from banking, research and
              public policy. Tell us which of the areas above you would take on.
            </p>
          </div>
          <a
            href={general.href}
            className="group mt-8 inline-flex items-center gap-2.5 bg-brand px-6 py-3 font-medium text-ink transition-colors hover:bg-fg"
          >
            Write to us
            <ArrowRight className="text-[1.1em] transition-transform group-hover:translate-x-0.5" />
          </a>
        </Container>
      </section>
    </>
  )
}
