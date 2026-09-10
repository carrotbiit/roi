/**
 * All site copy lives here. Replace the values, not the structure.
 *
 * PLACEHOLDER POLICY
 * Values marked `TBC` are stand-ins written to the right shape and length.
 * They are safe to swap wholesale. What is NOT placeheld is history: ROI has
 * never been held before, so nothing here may imply a past edition, alumni,
 * retired cases or a prior year's report. Add achievements after the first
 * edition happens, not before.
 */

/** Flip to false once every TBC value below has been replaced with a real one. */
export const usingPlaceholders = true

export const event = {
  name: 'ROI',
  tagline: "Building tomorrow's financial leaders",
  edition: 'Inaugural edition',
  season: 'Spring 2026',
  date: 'Saturday 18 April 2026', // TBC
  dateISO: '2026-04-18', // TBC
  hours: '08:30 to 18:00', // TBC
  venue: 'The Exchange Auditorium', // TBC
  street: '120 Front Street West', // TBC
  city: 'Toronto, Ontario', // TBC
  eligibility: 'Grades 9 to 12',
  teamSize: 'Teams of two to four',
  deadline: 'Friday 27 March 2026', // TBC
  deadlineISO: '2026-03-27', // TBC
  fee: '$35 per delegate', // TBC
  feeNote: 'Need-based waivers granted at registration, no documentation required.',
} as const

/** One line, said plainly, wherever the site needs to state what ROI is. */
export const thesis =
  'One sealed case. Four hours to build a position. Eight minutes to defend it.'

export const nav = [
  { to: '/event', label: 'The event' },
  { to: '/team', label: 'Team' },
  { to: '/sponsors', label: 'Sponsors' },
] as const

/** The three phases of the competition day. The sequence is the information. */
export const phases = [
  {
    n: 1,
    name: 'The case',
    body: 'At ten in the morning every team opens the same sealed case: one economy, one policy question, and an appendix of real data. Nobody sees it in advance, so preparation counts for method rather than memorised answers.',
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

/**
 * Scoring rubric. These four weights proportion the page itself, so changing a
 * weight changes the layout. They must sum to 100.
 */
export const rubric = [
  {
    criterion: 'Economic reasoning',
    weight: 40,
    body: 'Does the argument follow from the data, and does it survive its own assumptions? The largest share of the mark, and the reason no coursework is required: clear thinking outscores vocabulary.',
  },
  {
    criterion: 'Use of evidence',
    weight: 25,
    body: 'Every claim traced to an exhibit in the appendix. Judges look for the figures you chose and, as often, the ones you decided not to use.',
  },
  {
    criterion: 'Clarity of delivery',
    weight: 20,
    body: 'Eight minutes, no more. A position a room can follow the first time it hears it.',
  },
  {
    criterion: 'Cross-examination',
    weight: 15,
    body: 'Seven minutes answering for the position under questioning. Conceding a fair point is scored, not penalised.',
  },
] as const

/**
 * Preparation workshops. TBC — count, subjects, facilitators and dates are all
 * placeholders. Written to the right shape so real sessions drop straight in.
 */
export const workshops = {
  intro:
    'Three optional online workshops run in the month before the competition. They are open to every registered delegate, recorded for anyone who cannot attend live, and they assume no economics background whatsoever.',
  required: false,
  sessions: [
    {
      n: 1,
      name: 'Reading an economy', // TBC
      when: 'Saturday 14 March 2026, 10:00', // TBC
      length: '90 minutes', // TBC
      body: 'The handful of indicators that describe any economy, where they come from, and what each one hides. Ends with a live read of a real data appendix.', // TBC
    },
    {
      n: 2,
      name: 'Building a position', // TBC
      when: 'Saturday 21 March 2026, 10:00', // TBC
      length: '90 minutes', // TBC
      body: 'How to get from thirty exhibits to one defensible thesis in four hours, including how to divide the work across a team of four.', // TBC
    },
    {
      n: 3,
      name: 'Defending it', // TBC
      when: 'Saturday 4 April 2026, 10:00', // TBC
      length: '90 minutes', // TBC
      body: 'Structuring eight minutes, and what cross-examination actually feels like. Delegates pitch to each other and take questions.', // TBC
    },
  ],
} as const

/** The pitch itself, as a set of measured facts rather than prose. */
export const pitchFormat = [
  { label: 'Pitch', value: '8 min', note: 'Uninterrupted. The clock is visible to the room.' },
  { label: 'Cross-examination', value: '7 min', note: 'Open questioning from the full panel.' },
  { label: 'Team size', value: '2 to 4', note: 'Every member must speak at some point.' },
  { label: 'Materials', value: 'Case only', note: 'No outside research once the case is released.' },
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
  { label: 'Transit', value: 'Four minutes on foot from Union Station' }, // TBC
  { label: 'Parking', value: 'Underground, flat day rate' }, // TBC
  { label: 'Accessibility', value: 'Step-free entry, lifts to every round' }, // TBC
  { label: 'Meals', value: 'Breakfast and lunch provided' }, // TBC
] as const

/**
 * Team profiles. TBC — no real people are listed. `members` is intentionally
 * empty so the page renders its founding-team state instead of inventing
 * anyone. Add entries and the roster renders automatically.
 */
export const team = {
  intro:
    'ROI is organised by students and early-career practitioners who wanted the competition they could not find when they were in school.',
  roles: [
    'Competition direction',
    'Case authorship',
    'Judging and panel',
    'Partnerships',
    'Operations and venue',
    'Delegate experience',
  ],
  members: [] as ReadonlyArray<{
    name: string
    role: string
    affiliation?: string
    bio?: string
    photo?: string
  }>,
} as const

/**
 * Sponsor-facing figures. TBC — every number here is a target for the first
 * edition, not an achieved result. They render with an explicit projection
 * label; do not remove it until the numbers are real.
 */
export const sponsorReach = {
  label: 'First-edition targets',
  note: 'ROI has not been held before. Every figure below is what we are building for, not what we have done.',
  figures: [
    { value: '200', unit: 'delegates', body: 'Venue capacity for the inaugural edition.' }, // TBC
    { value: '40', unit: 'schools', body: 'Across the Greater Toronto Area and beyond.' }, // TBC
    { value: '12', unit: 'judges', body: 'From banking, research and public policy.' }, // TBC
    { value: '8 hrs', unit: 'on the floor', body: 'Partners are present for the full day.' }, // TBC
  ],
} as const

export const sponsorCase = [
  {
    title: 'Reach students before anyone else does',
    body: 'These are sixteen-year-olds who chose to spend a Saturday arguing about monetary policy. They are three to seven years from a first job in your industry, and almost nobody is talking to them yet.',
  },
  {
    title: 'Keep the day free of barriers',
    body: 'Sponsorship covers the venue, meals and every fee waiver requested, so cost never decides which students compete. Waiver status is never shared with judges or panels.',
  },
  {
    title: 'Spend the day with them, not near them',
    body: 'Partners judge, hold office hours over lunch, and sit on the floor for the final round. This is not a logo on a banner.',
  },
] as const

export const sponsorTiers = [
  {
    tier: 'Principal',
    amount: '$10,000', // TBC
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
    amount: '$5,000', // TBC
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
    amount: '$1,500', // TBC
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

/**
 * Ticker rows. Illustrative indicators of the kind a case might turn on.
 * THESE ARE NOT LIVE MARKET DATA and must always render behind the sample
 * label in Ticker.tsx. Never wire this to a market feed without relabelling.
 */
export const tickerRows = [
  { symbol: 'CPI', value: '3.1%', delta: -0.2 },
  { symbol: 'POLICY RATE', value: '4.25%', delta: 0 },
  { symbol: 'UNEMP', value: '6.4%', delta: 0.3 },
  { symbol: 'GDP Q/Q', value: '1.8%', delta: 0.4 },
  { symbol: 'WAGES Y/Y', value: '4.9%', delta: 0.6 },
  { symbol: '10Y YIELD', value: '3.42%', delta: -0.08 },
  { symbol: 'FX USD/CAD', value: '1.362', delta: 0.004 },
  { symbol: 'HOUSING STARTS', value: '241k', delta: -12 },
  { symbol: 'RETAIL SALES', value: '0.7%', delta: 0.2 },
  { symbol: 'OUTPUT GAP', value: '-0.6%', delta: -0.1 },
] as const

export const faqs = [
  {
    q: 'Who can enter?',
    a: 'Any student in grades 9 to 12, or the international equivalent, during the 2025 to 2026 school year. No economics coursework is required, and the rubric is weighted so that clear reasoning outscores vocabulary.',
  },
  {
    q: 'Do I need a full team to register?',
    a: 'Teams are two to four students. Register on your own and we will place you on a team in the week before the event, matched on experience so no team is stacked.',
  },
  {
    q: 'What is in the case?',
    a: 'One economy, one policy question, and a data appendix of roughly thirty exhibits. It is written for students who have never seen one, and released to every team at the same moment.',
  },
  {
    q: 'How is a pitch scored?',
    a: 'Four weighted criteria: economic reasoning at 40 per cent, use of evidence at 25, clarity of delivery at 20, and performance under cross-examination at 15. The full rubric goes out to registered delegates before the event.',
  },
  {
    q: 'What does it cost?',
    a: 'Thirty-five dollars per delegate, covering materials and two meals. Need-based waivers are granted at registration without documentation, and waiver status is never shared with judges or panels.',
  },
  {
    q: 'How should I prepare?',
    a: 'Three optional online workshops run in the month beforehand, and registered delegates receive a primer on the core indicators. Everything you need to compete is provided.',
  },
  {
    q: 'What can I bring on the day?',
    a: 'A laptop, a charger and student identification. Paper and calculators are provided. Outside research materials may not be used once the case is released.',
  },
  {
    q: 'Can teachers and parents attend?',
    a: 'Chaperones are welcome in the gallery for the final round and the awards. Preliminary rounds are closed so the breakout rooms stay focused on delegates.',
  },
  {
    q: 'This is the first edition. Why should I trust it?',
    a: 'You should judge it on the format rather than on a track record we do not have. The case, the rubric and the run of day are published here in full before you register, which is more than most competitions tell you after you do.',
  },
] as const

export const contacts = [
  { label: 'General', value: 'hello@roi-pitch.org', href: 'mailto:hello@roi-pitch.org' }, // TBC
  { label: 'Sponsorship', value: 'partners@roi-pitch.org', href: 'mailto:partners@roi-pitch.org' }, // TBC
  { label: 'Press', value: 'press@roi-pitch.org', href: 'mailto:press@roi-pitch.org' }, // TBC
] as const

/**
 * Registration form endpoint. Deliberately unset: the service has not been
 * chosen yet. Set this to a Formspree / Netlify / custom URL and the form
 * posts to it; while it is null the form stays fully usable and tells the
 * visitor to email instead, rather than silently failing.
 */
export const formEndpoint: string | null = null
