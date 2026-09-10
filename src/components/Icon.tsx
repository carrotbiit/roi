/**
 * The site's icon set, drawn here rather than borrowed from a font or a
 * unicode glyph. One 24-unit box, one 1.5 stroke, one cap and join style, so
 * every icon sits on the same optical weight as the mono type beside it.
 *
 * Icons are decorative by default: they sit next to a label or carry an
 * adjacent sr-only string. Pass a `title` only when the icon is the sole
 * carrier of its meaning.
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { title?: string }

function Svg({ title, children, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

export function ArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Svg>
  )
}

export function ArrowDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </Svg>
  )
}

export function Plus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  )
}

export function Check(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12.5 9.5 18 20 6.5" />
    </Svg>
  )
}

export function Dash(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 12h12" />
    </Svg>
  )
}

export function Menu(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </Svg>
  )
}

export function Close(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </Svg>
  )
}

/** Filled triangles: the ticker needs a shape, not only a colour, to say which way. */
export function TrendUp(props: IconProps) {
  return (
    <Svg fill="currentColor" stroke="none" {...props}>
      <path d="M12 6l7 12H5z" />
    </Svg>
  )
}

export function TrendDown(props: IconProps) {
  return (
    <Svg fill="currentColor" stroke="none" {...props}>
      <path d="M12 18L5 6h14z" />
    </Svg>
  )
}

export function TrendFlat(props: IconProps) {
  return (
    <Svg fill="currentColor" stroke="none" {...props}>
      <rect x="5" y="10.5" width="14" height="3" />
    </Svg>
  )
}
