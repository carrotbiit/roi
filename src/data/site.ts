/**
 * All site copy lives here. Everything below is placeholder content written to
 * the right shape and length; replace the values, not the structure.
 */

export const event = {
  name: 'ROI',
  tagline: "Building tomorrow's financial leaders",
  edition: 'Fourth edition',
  season: 'Spring 2026',
  date: 'Saturday 18 April 2026',
  dateISO: '2026-04-18',
  hours: '08:30 to 18:00',
  venue: 'The Exchange Auditorium',
  street: '120 Front Street West',
  city: 'Toronto, Ontario',
  eligibility: 'Grades 9 to 12',
  teamSize: 'Teams of two to four',
  deadline: 'Friday 27 March 2026',
  fee: '$35 per delegate, waivers available',
} as const

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'team', label: 'Team' },
  { id: 'sponsor', label: 'Sponsor' },
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
 * Optional sessions in the run-up to the competition. Add or remove entries
 * freely — the section is a list and takes any number of them.
 */
export const workshops = [
  {
    n: '01',
    title: 'Reading an economy',
    date: 'Saturday 7 March 2026',
    time: '10:00 to 12:00',
    format: 'Online',
    level: 'No background needed',
    body: 'The handful of indicators every case turns on: output, prices, employment and the balance of payments. We take one real economy apart and put it back together, and you leave able to read a data appendix without panicking.',
  },
  {
    n: '02',
    title: 'Building the argument',
    date: 'Saturday 21 March 2026',
    time: '10:00 to 13:00',
    format: 'Online',
    level: 'Some economics helpful',
    body: 'How a position gets built in four hours: framing the question, choosing the evidence that carries weight, and deciding what to leave out. Teams work a retired case and compare their structure against the pitch that won it.',
  },
  {
    n: '03',
    title: 'Pitching and cross-examination',
    date: 'Saturday 4 April 2026',
    time: '10:00 to 13:00',
    format: 'In person, The Exchange Auditorium',
    level: 'Registered delegates',
    body: 'Eight minutes in front of a panel, then seven answering for it. Former judges run mock cross-examinations, and every team gets their rubric marked up line by line before the day itself.',
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
