# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three confirmed audiences, served by one marketing site:

1. **Students, grades 9 to 12** — the primary audience. Prospective delegates deciding whether to enter a competition they have never heard of, often without economics coursework behind them. Their job is to judge whether they belong here and whether it is worth a Saturday. Success is a registration.
2. **Prospective sponsors** — companies in banking, research, and public policy evaluating whether to back the event. Their job is to understand tiers, cost, and what they get. Success is an email to the partnerships contact.
3. **Teachers and school clubs** — educators bringing a group. Their job is to clear eligibility, cost, waivers, logistics, chaperone access, and accessibility fast enough to say yes on a student's behalf. Success is a group registration or an endorsement to their students.

Judges and volunteers are not currently an audience the site is built to recruit.

## Product Purpose

ROI is a one-day macroeconomics pitch competition for high school students. Teams open the same sealed policy case, build a position against real data, and defend it before a panel of practitioners.

The site exists to fill the first edition: convince students it is for them, teachers that it is safe and worth the trip, and sponsors that it is worth backing.

## Positioning

The mechanism is the sealed case. Every team opens the same case at the same moment, with a fixed data appendix and nothing else, then defends a thesis under cross-examination by practitioners. Preparation rewards method rather than memorised material or prior coursework — which is what lets a student with no economics background enter and compete.

**This is a first edition.** ROI has no track record, and the positioning cannot lean on one. It must persuade on the strength of the format itself.

## Operating Context

Competition day runs as three phases — the case release, a timed research block in assigned breakout rooms, and a judged pitch with cross-examination — bracketed by registration, meals, judge office hours, preliminary rounds, a final round, and awards. Delegates work from a laptop plus provided paper and calculators; outside research materials are barred once the case is released. Chaperones attend the final round and awards; preliminary rounds are closed.

The full shape of the day is drafted in `src/data/site.ts` (phases, schedule, rubric, venue facts, sponsor tiers, FAQ, contacts). That file is the single source of site copy, and its header states its contents are placeholder written to the right shape.

## Capabilities and Constraints

- **Existing stack:** React 19 + TypeScript on Vite 8, Tailwind CSS v4 with tokens declared in `@theme` in `src/index.css`. Oxlint. No router, no backend, no CMS — a single static marketing page, built and deployed as static assets.
- **Copy is centralised.** All site copy lives in `src/data/site.ts`. Replace values, not the structure.
- **Registration is not built.** There is no registration flow, form, or payment path in the codebase; contact is by email and telephone only. How delegates actually register is an open product decision.
- **Unfinished build.** `Program`, `Sponsor`, `Faq`, `Contact`, and `Brand` components exist but are not mounted in `App.tsx`, which currently renders only `SiteHeader`, `Hero`, `Mosaic`, and `SiteFooter`. This is unfinished, not a deliberate cut: the intended site includes all of them on one long page. The `nav` array in `site.ts` likewise lists only `about` and does not yet reflect the intended sections.
- **Terminology:** entrants are *delegates*; the day's three phases are *the case*, *the desk*, and *the panel*; scoring is a published four-criterion *rubric*.

### Explicitly undecided

Everything specific in `src/data/site.ts` is a stand-in and must not be presented as fact until confirmed:

- date, hours, venue name, street address, and city;
- edition number — **"Fourth edition" is false; this is the first**, along with any copy implying prior years, past cases, or returning delegates;
- fee, waiver policy, registration deadline, team size, and eligibility wording;
- the rubric's four criteria and their weights;
- the schedule times, the venue facts, and the sponsor tier names, amounts, slot counts, and benefit matrix;
- the FAQ answers, which currently contain invented specifics (a "third of last year's delegates", named past cases, workshop and primer offerings);
- the contact addresses and telephone number.

The *shape* of these — a sealed case, a timed research block, a judged pitch with cross-examination, a weighted rubric, tiered sponsorship, a single-day schedule — is the intended format. The *values* are not yet real.

## Brand Commitments

- **Name and mark:** "ROI". Tagline: "Building tomorrow's financial leaders". Both settled.
- **Visual language:** the financial-markets world is intentional and is to be preserved — black ground, the conventional green-up / red-down pair, the heatmap mosaic, monospaced numerals. It is incumbent design authority, not a placeholder. (No DESIGN.md records it yet; see `src/index.css` `@theme` and `src/components/`.)
- **Voice:** measured, concrete, unhyped. British-leaning spelling and spelled-out numbers in prose ("ten in the morning", "40 per cent"). It addresses students as capable adults rather than talking down.

## Evidence on Hand

- **At least one committed partner or backing school exists.** Names, logos, and the nature of the commitment have not yet been supplied and must not be invented or implied until they are.
- **Nothing else.** No past winners, photographs of the event, testimonials, delegate counts, press mentions, sponsor logos, retired cases, or sample case materials. `public/img/` holds two placeholder SVGs (`hall.svg`, `venue.svg`), not photography.

Future work must not fabricate proof, and must persuade without it. Any surface that structurally depends on social proof needs real material first.

## Product Principles

1. **First edition, stated honestly.** No invented history, counts, alumni, or past cases. Credibility comes from the rigour of the format and the calibre of the panel, not from a track record that does not exist.
2. **The format is the argument.** The sealed case, the four-hour desk, and the cross-examination are what make ROI worth entering. Lead with the mechanism, in specifics.
3. **No prior economics required — and prove it.** A student who has never taken an economics class must be able to read the site and conclude they can win. Never gate on jargon.
4. **One page, three readers.** Students, teachers, and sponsors each need to reach their answer without wading through someone else's. Serve all three without diluting the student case.
5. **Placeholders are liabilities.** Copy lives in one file precisely so unconfirmed values can be replaced wholesale. Never let a stand-in figure harden into a claim.

## Accessibility & Inclusion

- **WCAG 2.1 AA and fully keyboard-operable** is a requirement, not an aspiration: the audience is school students reaching the site through school networks and devices. A skip link is already in `App.tsx`.
- The green-up / red-down accent pair carries meaning and must never be the sole channel for it — colour-blind users need a second cue.
- Need-based fee waivers exist and are granted without documentation; waiver status is never surfaced to judges or panels. Where the site touches cost, it must not make asking feel exceptional.
- Venue accessibility (step-free entry, lifts to every round) is a stated intent but an unconfirmed value like every other venue fact.
