/**
 * All site copy lives here. Everything below is placeholder content written to
 * the right shape and length; replace the values, not the structure.
 */

export const event = {
  name: 'ROI',
  tagline: "Building tomorrow's financial leaders",
  edition: 'Fourth edition',
  season: 'Spring 2026',
  /** The month, for the hero strip: coarse, and settled long before the day is. */
  window: 'November 2026',
  date: 'Late November',
  dateISO: '2026-11',
  venue: 'Lazaridis Hall',
  street: '64 University Ave W',
  city: 'Waterloo, Ontario',
  /** Map pin for the venue, opened from the About grid. */
  map: 'https://www.google.com/maps/place/Lazaridis+School+of+Business+and+Economics/@43.4750999,-80.5320229,17z/data=!3m1!4b1!4m6!3m5!1s0x882bf3f62c12347f:0x100f39a182234b30!8m2!3d43.475096!4d-80.529448!16s%2Fm%2F0ds44jc',
  eligibility: 'High school students',
  teamSize: 'Teams of three to four',
  deadline: 'TBA',
  prizePool: '$1000+',
  /** The interest form, linked from the apply page until registration opens. */
  interestForm: 'https://forms.gle/79fBCguYXH8iTkDc7',
} as const

/** What delegates get out of ROI, listed on the apply page. */
export const expectations = [
  '$1,000+ in prize money',
  'Medals and awards',
  'Workshops with LAMA',
  'Case studies developed and assessed by Laurier professors',
  'Networking with peers, professors, and LAMA executives',
  'Laurier campus tour',
  'Food provided',
  'Free to enter',
] as const

/**
 * Primary navigation. Hrefs are absolute so the same list works from the home
 * page and from any page of its own.
 */
export const nav = [
  { id: 'about', label: 'Home', href: '/#about' },
  { id: 'workshops', label: 'Workshops', href: '/#workshops' },
  { id: 'team', label: 'Team', href: '/#team' },
  // Hidden for now: restore this line to put the sponsor page back in the nav.
  // { id: 'sponsor', label: 'Sponsor', href: '/sponsor.html' },
  // Hidden for now: restore this line (and the volunteer input in vite.config.ts) to bring the page back.
  // { id: 'volunteer', label: 'Volunteer', href: '/volunteer.html' },
] as const

/**
 * The organising team. `photo` is a path under /public; leave it empty and the
 * card falls back to a lettered placeholder. `note` is optional, `linkedin`
 * turns the name into a link.
 */
export type TeamMember = {
  name: string
  note: string
  photo: string
  linkedin: string
}

export const team: TeamMember[] = [
  {
    name: 'Ryan Tang',
    note: '',
    photo: '/img/people/Ryan_Tang.jpg',
    linkedin: 'https://www.linkedin.com/in/ryan-tang-b3944b372/',
  },
  {
    name: 'Jason Shao',
    note: '',
    photo: '/img/people/Jason_Shao.jpg',
    linkedin: 'https://www.linkedin.com/in/jason-shao-31892941a/',
  },
  {
    name: 'Irtaza Qasim',
    note: '',
    photo: '/img/people/Irtaza_Qasim.png',
    linkedin: 'https://www.linkedin.com/in/irtaza-qasim-baa888388/',
  },
]

/** The three rounds of the competition day, shown as a stepped list. */
export const phases = [
  {
    n: 1,
    name: 'Preliminary Round',
    body: 'In the morning, every team is given a case study and builds its pitch alongside a LAMA analyst. Each pitch is then presented to and reviewed by the LAMA executive team.',
  },
  {
    n: 2,
    name: 'Semi-finals',
    body: 'Advancing teams receive a new case study and repeat the process: build the pitch, then present it. This time, the pitches are reviewed by Laurier professors.',
  },
  {
    n: 3,
    name: 'Finals',
    body: 'The finalists take on one last, different case study and pitch it to a panel of Laurier professors.',
  },
] as const

/** Shown under the format list until the details are settled. */
export const formatNote = 'More specifics of the format will be announced closer to the date of the event.'

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

/** Practical terms, answered before anyone has to ask. */
export const volunteerFacts = [
  { label: 'Who', value: 'University students, teachers, alumni, 16 and over' },
  { label: 'Training', value: 'One online briefing the week before' },
  { label: 'Meals', value: 'Breakfast and lunch provided' },
  { label: 'References', value: 'Reference letters on request' },
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
    q: 'Do I need to pay to register?',
    a: 'No. Registration for the ROI Stock Pitch Competition is completely free.',
  },
  {
    q: 'How will the competition be judged?',
    a: 'More information about the judging criteria and evaluation process will be revealed closer to the competition.',
  },
  {
    q: 'Do I need to bring anything?',
    a: 'Yes. Participants should bring a laptop and charger to help with research and creating their pitch.',
  },
  {
    q: 'What should I wear?',
    a: 'ROI is a formal competition, so a suit is recommended; however, business casual attire is also appropriate.',
  },
  {
    q: 'Is transportation provided?',
    a: 'Transportation to and from the event is not provided. Participants are responsible for arranging their own transportation. Public buses are readily available for getting to Lazaridis Hall.',
  },
  {
    q: 'Will food be provided?',
    a: 'Yes. One meal will be provided for all participants.',
  },
] as const

/**
 * Sponsors, thanked above the team. `logo` is a path under /public; the list is
 * short on purpose for now, and grows as partners sign on.
 */
export const sponsors = [
  { name: 'Youth Capital Forum', logo: '/img/sponsors/ycf.png', href: '' },
  { name: 'Laurier Asset Management Association', logo: '/img/sponsors/LAMA.jpg', href: '' },
] as const

/**
 * Social accounts, shown as icon links beside the header's Apply button.
 * Links to the real accounts.
 */
export const socials = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/joinroi/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/join.roi' },
] as const

/** The one inbox. Every mail link on the site is built from it. */
export const email = 'hello@joinroi.ca'

export const contacts = [
  { label: 'General', value: email, href: `mailto:${email}` },
] as const
