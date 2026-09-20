import type { ReactNode } from 'react'
import { email } from '../data/site'

/**
 * A mail link that opens Gmail's compose window in a new tab rather than a
 * mailto: a mailto does nothing at all in a browser with no mail handler
 * registered, which is most people reading this on a school laptop.
 */
export function MailLink({
  subject,
  className = '',
  children,
}: {
  subject?: string
  className?: string
  children: ReactNode
}) {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: email })
  if (subject) params.set('su', subject)
  const href = `https://mail.google.com/mail/?${params}`

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens Gmail in a new tab)</span>
    </a>
  )
}
