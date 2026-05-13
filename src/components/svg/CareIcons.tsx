import type { CSSProperties } from 'react'

type IconProps = {
  className?: string
  style?: CSSProperties
}

const STROKE = '#b8924a'
const ACCENT = '#7c8a62'

/** Gota de agua con caída interior */
export function IconWater({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke={STROKE} strokeWidth="0.5" opacity="0.4" />
      <path d="M 32 14 C 32 14, 18 30, 18 40 a 14 14 0 0 0 28 0 C 46 30, 32 14, 32 14 Z" fill="none" stroke={STROKE} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M 25 38 a 7 7 0 0 0 7 7" fill="none" stroke={STROKE} strokeWidth="0.8" opacity="0.8" />
      <circle cx="38" cy="48" r="1.2" fill={STROKE} opacity="0.6" />
      {/* gotitas dentro */}
      <g fill={ACCENT} opacity="0.6">
        <circle cx="30" cy="34" r="0.8" />
        <circle cx="34" cy="38" r="0.6" />
      </g>
    </svg>
  )
}

/** Sol con rayos finos y hojas alrededor (luz indirecta) */
export function IconLight({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke={STROKE} strokeWidth="0.5" opacity="0.4" />
      <circle cx="32" cy="32" r="9" fill="none" stroke={STROKE} strokeWidth="1.1" />
      <circle cx="32" cy="32" r="5" fill="none" stroke={STROKE} strokeWidth="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (Math.PI * 2 * i) / 12
        const x1 = 32 + Math.cos(a) * 13
        const y1 = 32 + Math.sin(a) * 13
        const x2 = 32 + Math.cos(a) * (i % 2 ? 20 : 17)
        const y2 = 32 + Math.sin(a) * (i % 2 ? 20 : 17)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="0.8" strokeLinecap="round" />
      })}
      {/* hojita en esquina */}
      <path d="M 50 18 c -3 -3, -8 -2, -10 2 c 3 3, 8 2, 10 -2 Z" fill={ACCENT} stroke={STROKE} strokeWidth="0.4" />
      <line x1="40" y1="20" x2="44" y2="18" stroke={STROKE} strokeWidth="0.4" />
    </svg>
  )
}

/** Termómetro */
export function IconThermo({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke={STROKE} strokeWidth="0.5" opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M 28 18 a 4 4 0 0 1 8 0 v 22 a 6 6 0 1 1 -8 0 Z" />
        <circle cx="32" cy="46" r="3.5" fill={ACCENT} stroke={STROKE} />
        <line x1="32" y1="22" x2="32" y2="42" stroke={ACCENT} strokeWidth="1.6" />
      </g>
      {/* marcas */}
      <g stroke={STROKE} strokeWidth="0.5">
        <line x1="38" y1="24" x2="42" y2="24" />
        <line x1="38" y1="30" x2="41" y2="30" />
        <line x1="38" y1="36" x2="42" y2="36" />
      </g>
    </svg>
  )
}

/** Frasco con corcho abriéndose - ventilación */
export function IconVent({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke={STROKE} strokeWidth="0.5" opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1" fill="none" strokeLinejoin="round">
        <path d="M 24 26 L 24 46 a 4 4 0 0 0 4 4 h 8 a 4 4 0 0 0 4 4 -4 V 26 Z" />
        <path d="M 22 24 L 42 24 L 40 18 L 24 18 Z" />
      </g>
      {/* vapor */}
      <g stroke={STROKE} strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M 28 14 c -2 -3, 2 -5, 0 -8" />
        <path d="M 32 14 c -2 -4, 2 -6, 0 -10" />
        <path d="M 36 14 c -2 -3, 2 -5, 0 -8" />
      </g>
    </svg>
  )
}

/** Triángulo de alerta con hoja */
export function IconAlert({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke={STROKE} strokeWidth="0.5" opacity="0.4" />
      <path d="M 32 14 L 52 48 L 12 48 Z" fill="none" stroke={STROKE} strokeWidth="1.1" strokeLinejoin="round" />
      <line x1="32" y1="26" x2="32" y2="38" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="43" r="1.4" fill={STROKE} />
      <path d="M 22 50 c -3 -3, -2 -8, 2 -10 c 3 3, 2 8, -2 10 Z" fill={ACCENT} stroke={STROKE} strokeWidth="0.4" />
    </svg>
  )
}

/** Espiral / mano de cuidado */
export function IconCare({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke={STROKE} strokeWidth="0.5" opacity="0.4" />
      <path d="M 32 50 c -10 0, -16 -8, -16 -16 c 0 -8, 6 -12, 12 -12 c 4 0, 6 2, 4 6 c -2 4, -8 4, -8 8 c 0 4, 4 6, 8 6 c 6 0, 10 -4, 10 -10 c 0 -8, -8 -14, -16 -14" fill="none" stroke={STROKE} strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="48" cy="22" r="2" fill={ACCENT} stroke={STROKE} strokeWidth="0.5" />
    </svg>
  )
}
