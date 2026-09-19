import { team } from '../data/site'
import { Section } from './layout'

/**
 * Meet the team: three portraits, short and flat. Until real headshots land,
 * each card draws a lettered placeholder in the same 4:5 frame the photo will
 * fill, so swapping one in changes nothing about the layout.
 */

/** Initials for the placeholder frame, e.g. "First Last" becomes "FL". */
const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export function Team() {
  return (
    <Section id="team" labelledBy="team-heading">
      <h2 id="team-heading" className="text-4xl md:text-5xl">
        Meet the team
      </h2>

      {/* Three across at every width: two columns would leave a dead cell. */}
      <ul className="mt-10 grid grid-cols-3 gap-px border border-rule bg-rule md:mt-12">
        {team.map((member, i) => (
          <li key={i} className="bg-ink p-3 sm:p-5">
            <div className="relative aspect-4/5 overflow-hidden bg-surface-2">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center font-mono text-2xl tracking-[0.2em] text-fg-subtle"
                >
                  {initials(member.name)}
                </span>
              )}
            </div>

            <p className="mt-4 font-display text-base leading-tight text-fg">{member.name}</p>
            <p className="mt-2 font-mono text-xs tracking-[0.2em] text-azure uppercase">
              {member.role}
            </p>
            <p className="mt-4 text-base leading-relaxed text-fg/70">{member.note}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
