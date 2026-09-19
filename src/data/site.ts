/**
 * All site copy lives here. Everything below is placeholder content written to
 * the right shape and length; replace the values, not the structure.
 */

export const event = {
  name: 'ROI',
  tagline: "Building tomorrow's financial leaders",
  edition: 'Fourth edition',
  season: 'Spring 2026',
  date: 'TBA',
  dateISO: '2026-04-18',
  venue: 'Lazaridis Hall',
  street: '64 University Ave W',
  city: 'Waterloo, Ontario',
  eligibility: 'High school students',
  teamSize: 'Teams of three to four',
  deadline: 'TBA',
  prizePool: '$1000+',
} as const

/**
 * Primary navigation. Hrefs are absolute so the same list works from the home
 * page and from any page of its own: sponsor is a separate document, the rest
 * are sections of the home page.
 */
export const nav = [
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'workshops', label: 'Workshops', href: '/#workshops' },
  { id: 'team', label: 'Team', href: '/#team' },
  { id: 'sponsor', label: 'Sponsor', href: '/sponsor.html' },
  { id: 'volunteer', label: 'Volunteer', href: '/volunteer.html' },
] as const

/**
 * The organising team. `photo` is a path under /public; leave it empty and the
 * card falls back to a lettered placeholder.
 */
export const team = [
  { name: 'First Last', role: 'Director', note: 'Grade 12, economics', photo: '' },
  { name: 'First Last', role: 'Head of judging', note: 'Grade 12, mathematics', photo: '' },
  { name: 'First Last', role: 'Partnerships', note: 'Grade 11, business', photo: '' },
] as const

/** The three phases of the competition day, shown as a stepped list. */
export const phases = [
  {
    n: 1,
    name: 'The case',
    body: 'At ten in the morning every team opens the same sealed case: one economy, one policy question, and an appendix of real data running back twenty years. Nobody sees it in advance, so preparation counts for method rather than memorised answers.',
  },
  {
    n: 2,
    name: 'The desk',
    body: 'Four hours to build a position. Teams work in assigned breakout rooms with the data provided and nothing else. Judges hold open office hours over lunch for teams that want to test an argument before they commit to it.',
  },
  {
    n: 3,
    name: 'The panel',
    body: 'Eight minutes to pitch and seven to answer for it. The panel is made up of practitioners from banking, research and public policy, and they ask the questions they would ask a colleague.',
  },
] as const

/** Scoring rubric, published in full to registered delegates. */
export const rubric = [
  { criterion: 'Economic reasoning', weight: 40 },
  { criterion: 'Use of evidence', weight: 25 },
  { criterion: 'Clarity of delivery', weight: 20 },
  { criterion: 'Cross-examination', weight: 15 },
] as const

export const schedule = [
  { time: '08:30', title: 'Registration and breakfast', place: 'Atrium' },
  { time: '09:15', title: 'Opening address', place: 'Main hall' },
  { time: '10:00', title: 'Case release, research block begins', place: 'Breakout rooms' },
  { time: '13:00', title: 'Lunch and judge office hours', place: 'Atrium' },
  { time: '14:00', title: 'Preliminary rounds', place: 'Breakout rooms' },
  { time: '16:15', title: 'Final round, six teams', place: 'Main hall' },
  { time: '17:30', title: 'Awards and close', place: 'Main hall' },
] as const

export const venueFacts = [
  { label: 'Transit', value: 'Four minutes on foot from Union Station' },
  { label: 'Parking', value: 'Underground, flat day rate' },
  { label: 'Accessibility', value: 'Step-free entry, lifts to every round' },
  { label: 'Meals', value: 'Breakfast and lunch provided' },
] as const

/**
 * Volunteer roles on the day. Add or remove entries freely — the page is a
 * list and takes any number of them.
 */
export const volunteerRoles = [
  {
    n: '01',
    title: 'Room marshal',
    commitment: 'Full day, 08:00 to 18:00',
    body: 'Keep one breakout room on schedule: open the block, hold the clock, and make sure every team knows how long it has left.',
  },
  {
    n: '02',
    title: 'Registration desk',
    commitment: 'Morning, 07:30 to 11:00',
    body: 'The first face of the day. Check delegates in, hand out packs, and point people at the right room before the case is released.',
  },
  {
    n: '03',
    title: 'Judge liaison',
    commitment: 'Afternoon, 13:00 to 18:00',
    body: 'Look after the panel: brief judges on the rubric, collect score sheets between rounds, and keep the final running to time.',
  },
  {
    n: '04',
    title: 'Setup and pack-down',
    commitment: 'Either end of the day',
    body: 'Signage, seating, cabling and the hundred small things that decide whether a venue works. The shift that makes every other one possible.',
  },
] as const

/** Practical terms, answered before anyone has to ask. */
export const volunteerFacts = [
  { label: 'Who', value: 'University students, teachers, alumni, 16 and over' },
  { label: 'Training', value: 'One online briefing the week before' },
  { label: 'Meals', value: 'Breakfast and lunch provided' },
  { label: 'References', value: 'Reference letters on request' },
] as const

/**
 * Optional sessions in the run-up to the competition. Add or remove entries
 * freely — the section is a list and takes any number of them.
 */
export const workshops = [
  {
    n: '01',
    title: 'TBA',
    date: 'TBA',
    time: 'TBA',
    format: 'TBA',
    level: 'TBA',
    body: 'Topic, date and format to be announced.',
  },
  {
    n: '02',
    title: 'TBA',
    date: 'TBA',
    time: 'TBA',
    format: 'TBA',
    level: 'TBA',
    body: 'Topic, date and format to be announced.',
  },
  {
    n: '03',
    title: 'TBA',
    date: 'TBA',
    time: 'TBA',
    format: 'TBA',
    level: 'TBA',
    body: 'Topic, date and format to be announced.',
  },
] as const

/** The case for partnering, four panels wide. */
export const sponsorReasons = [
  {
    n: '01',
    title: 'A room that opted in',
    body: 'Three hundred delegates give up a Saturday to argue about monetary policy, and their teachers and families come with them. Your mark sits on the materials they take home.',
  },
  {
    n: '02',
    title: 'Time on the floor',
    body: 'Partners take a table for the day and a seat on the judging panel. Your team meets delegates over a case rather than across a careers fair.',
  },
  {
    n: '03',
    title: 'No barriers at the door',
    body: 'Sponsorship covers the venue, meals and every fee waiver requested, so cost never decides which students compete.',
  },
  {
    n: '04',
    title: 'A report afterwards',
    body: 'Delegate numbers, schools represented and what the judges saw, sent to every partner within three weeks of the final.',
  },
] as const

export const sponsorTiers = [
  {
    tier: 'Principal',
    amount: '$10,000',
    slots: 'One partner',
    lead: true,
    benefits: {
      'Naming rights on the final round': true,
      'Seat on the head judging panel': true,
      'Mark on delegate materials': true,
      'Table on the floor all day': true,
      'Post-event report': true,
    },
  },
  {
    tier: 'Desk',
    amount: '$5,000',
    slots: 'Four partners',
    lead: false,
    benefits: {
      'Naming rights on the final round': false,
      'Seat on the head judging panel': true,
      'Mark on delegate materials': true,
      'Table on the floor all day': true,
      'Post-event report': true,
    },
  },
  {
    tier: 'Analyst',
    amount: '$1,500',
    slots: 'Open',
    lead: false,
    benefits: {
      'Naming rights on the final round': false,
      'Seat on the head judging panel': true,
      'Mark on delegate materials': true,
      'Table on the floor all day': false,
      'Post-event report': false,
    },
  },
] as const

export const sponsorBenefits = [
  'Naming rights on the final round',
  'Seat on the head judging panel',
  'Mark on delegate materials',
  'Table on the floor all day',
  'Post-event report',
] as const

export const faqs = [
  {
    q: 'Who can enter?',
    a: 'Any student in grades 9 to 12, or the international equivalent, during the 2025 to 2026 school year. No economics coursework is required. About a third of last year’s delegates had never taken an economics class.',
  },
  {
    q: 'Do I need a full team to register?',
    a: 'Teams are two to four students. Register on your own and we will place you on a team in the week before the event, matched on track preference and experience.',
  },
  {
    q: 'What is in the case?',
    a: 'One economy, one policy question, and a data appendix of roughly thirty exhibits. Past cases have covered a central bank facing a wage spiral, a commodity exporter managing a currency peg, and a government choosing between two fiscal packages.',
  },
  {
    q: 'How is a pitch scored?',
    a: 'Four weighted criteria: economic reasoning at 40 per cent, use of evidence at 25, clarity of delivery at 20, and performance under cross-examination at 15. The full rubric goes out to registered delegates two weeks before the event.',
  },
  {
    q: 'What does it cost?',
    a: 'Thirty-five dollars per delegate, covering materials and two meals. Need-based waivers are granted at registration without documentation, and waiver status is never shared with judges or panels.',
  },
  {
    q: 'How should I prepare?',
    a: 'Registered delegates receive a primer on the core indicators, three retired cases with annotated winning pitches, and access to two optional online workshops in the month beforehand.',
  },
  {
    q: 'What can I bring on the day?',
    a: 'A laptop, a charger and student identification. Paper and calculators are provided. Outside research materials may not be used once the case is released.',
  },
  {
    q: 'Can teachers and parents attend?',
    a: 'Chaperones are welcome in the gallery for the final round and the awards. Preliminary rounds are closed so the breakout rooms stay focused on delegates.',
  },
] as const

export const contacts = [
  { label: 'General', value: 'hello@roi-pitch.org', href: 'mailto:hello@roi-pitch.org' },
  { label: 'Sponsorship', value: 'partners@roi-pitch.org', href: 'mailto:partners@roi-pitch.org' },
  { label: 'Press', value: 'press@roi-pitch.org', href: 'mailto:press@roi-pitch.org' },
  { label: 'Telephone', value: '+1 416 555 0142', href: 'tel:+14165550142' },
] as const
