import type { CSSProperties } from 'react'

type OrnamentProps = {
  className?: string
  style?: CSSProperties
}

/** Filete ornamental simétrico con hojas, ideal como separador entre secciones. */
export function OrnamentDivider({ className, style }: OrnamentProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 600 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="orn-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b8924a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#b8924a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#b8924a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* línea base con fade */}
      <line x1="0" y1="30" x2="600" y2="30" stroke="url(#orn-line)" strokeWidth="0.8" />

      {/* tallos curvos a izquierda y derecha */}
      <g stroke="#b8924a" strokeWidth="0.8" fill="none" strokeLinecap="round">
        <path d="M260 30 C 230 30, 220 20, 200 18 C 180 16, 160 22, 140 24 C 120 26, 100 22, 80 18 C 60 14, 40 18, 20 22" />
        <path d="M340 30 C 370 30, 380 20, 400 18 C 420 16, 440 22, 460 24 C 480 26, 500 22, 520 18 C 540 14, 560 18, 580 22" />
      </g>

      {/* hojas izquierda */}
      <g fill="#4a5a3a" stroke="#283126" strokeWidth="0.4">
        <path d="M200 18 c -3 -5, -1 -10, 3 -12 c 4 2, 4 8, 1 12 c -1 2, -3 2, -4 0 Z" />
        <path d="M140 24 c -3 -5, -1 -10, 3 -12 c 4 2, 4 8, 1 12 c -1 2, -3 2, -4 0 Z" />
        <path d="M80 18 c -3 -5, -1 -10, 3 -12 c 4 2, 4 8, 1 12 c -1 2, -3 2, -4 0 Z" />
        <path d="M170 32 c 3 5, 1 10, -3 12 c -4 -2, -4 -8, -1 -12 c 1 -2, 3 -2, 4 0 Z" />
        <path d="M110 32 c 3 5, 1 10, -3 12 c -4 -2, -4 -8, -1 -12 c 1 -2, 3 -2, 4 0 Z" />
        <path d="M50 32 c 3 5, 1 10, -3 12 c -4 -2, -4 -8, -1 -12 c 1 -2, 3 -2, 4 0 Z" />
      </g>

      {/* hojas derecha */}
      <g fill="#4a5a3a" stroke="#283126" strokeWidth="0.4">
        <path d="M400 18 c -3 -5, -1 -10, 3 -12 c 4 2, 4 8, 1 12 c -1 2, -3 2, -4 0 Z" />
        <path d="M460 24 c -3 -5, -1 -10, 3 -12 c 4 2, 4 8, 1 12 c -1 2, -3 2, -4 0 Z" />
        <path d="M520 18 c -3 -5, -1 -10, 3 -12 c 4 2, 4 8, 1 12 c -1 2, -3 2, -4 0 Z" />
        <path d="M430 32 c 3 5, 1 10, -3 12 c -4 -2, -4 -8, -1 -12 c 1 -2, 3 -2, 4 0 Z" />
        <path d="M490 32 c 3 5, 1 10, -3 12 c -4 -2, -4 -8, -1 -12 c 1 -2, 3 -2, 4 0 Z" />
        <path d="M550 32 c 3 5, 1 10, -3 12 c -4 -2, -4 -8, -1 -12 c 1 -2, 3 -2, 4 0 Z" />
      </g>

      {/* rombo central */}
      <g transform="translate(300 30)">
        <path d="M0 -12 L 10 0 L 0 12 L -10 0 Z" fill="#0c1208" stroke="#b8924a" strokeWidth="0.8" />
        <path d="M0 -7 L 6 0 L 0 7 L -6 0 Z" fill="none" stroke="#b8924a" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="1.2" fill="#b8924a" />
        {/* hojitas en cada vértice */}
        <path d="M0 -12 c -2 -3, -1 -7, 2 -9 c 3 2, 2 6, 1 9 z" fill="#4a5a3a" />
        <path d="M0 12 c 2 3, 1 7, -2 9 c -3 -2, -2 -6, -1 -9 z" fill="#4a5a3a" />
        <path d="M-12 0 c -3 -2, -7 -1, -9 2 c 2 3, 6 2, 9 1 z" fill="#4a5a3a" />
        <path d="M12 0 c 3 -2, 7 -1, 9 2 c -2 3, -6 2, -9 1 z" fill="#4a5a3a" />
      </g>
    </svg>
  )
}

/** Pequeña marca de esquina, en forma de hoja o flor de cuatro pétalos. */
export function CornerSprig({ className, style }: OrnamentProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#b8924a" strokeWidth="0.7" fill="none" strokeLinecap="round">
        <path d="M10 110 C 30 90, 50 80, 70 60 C 80 50, 90 35, 100 20" />
        <path d="M30 95 c -8 -2, -16 -2, -22 4" />
        <path d="M50 80 c -8 -3, -16 -1, -22 6" />
        <path d="M68 64 c -6 -4, -14 -4, -22 0" />
        <path d="M82 50 c -2 -8, -2 -16, 4 -22" />
        <path d="M65 65 c -3 -8, -1 -16, 6 -22" />
        <path d="M50 80 c -4 -7, -2 -16, 4 -22" />
      </g>
      <g fill="#4a5a3a" stroke="#283126" strokeWidth="0.4">
        <path d="M22 99 c -4 -3, -8 -1, -10 4 c 4 2, 8 2, 11 -1 z" />
        <path d="M40 86 c -4 -3, -9 -1, -11 4 c 4 2, 9 2, 12 -1 z" />
        <path d="M58 71 c -4 -3, -9 -1, -11 4 c 4 2, 9 2, 12 -1 z" />
        <path d="M82 36 c -3 -4, -1 -9, 4 -11 c 2 4, 2 9, -1 12 z" />
        <path d="M70 52 c -3 -4, -1 -9, 4 -11 c 2 4, 2 9, -1 12 z" />
      </g>
    </svg>
  )
}

/** Marca tipo timbre/sello circular con la botella en el centro. */
export function BrandSeal({ className, style }: OrnamentProps) {
  const r = 96
  const labelTop = 'VIEJO  VERDE  ·  MICRO  BOSQUES'
  const labelBot = 'RELIQUIAS  VIVAS  ·  DESDE  2024'
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <path id="seal-top" d={`M 110 110 m -${r + 4} 0 a ${r + 4} ${r + 4} 0 1 1 ${(r + 4) * 2} 0`} />
        <path id="seal-bot" d={`M 110 110 m -${r + 4} 4 a ${r + 4} ${r + 4} 0 1 0 ${(r + 4) * 2} 0`} />
      </defs>

      {/* anillos */}
      <circle cx="110" cy="110" r="104" fill="none" stroke="#b8924a" strokeWidth="0.6" opacity="0.7" />
      <circle cx="110" cy="110" r="96" fill="none" stroke="#b8924a" strokeWidth="1" />
      <circle cx="110" cy="110" r="80" fill="none" stroke="#b8924a" strokeWidth="0.5" opacity="0.5" />
      <circle cx="110" cy="110" r="64" fill="none" stroke="#b8924a" strokeWidth="0.4" opacity="0.4" />

      {/* texto curvo */}
      <text fontFamily="Cinzel, serif" fontSize="10" letterSpacing="3" fill="#b8924a">
        <textPath href="#seal-top" startOffset="50%" textAnchor="middle">{labelTop}</textPath>
      </text>
      <text fontFamily="Cinzel, serif" fontSize="8" letterSpacing="2.5" fill="#b8924a" opacity="0.8">
        <textPath href="#seal-bot" startOffset="50%" textAnchor="middle">{labelBot}</textPath>
      </text>

      {/* pequeñas estrellas/puntos separadores */}
      {Array.from({ length: 4 }).map((_, i) => {
        const a = (Math.PI / 2) * i + Math.PI / 4
        const cx = 110 + Math.cos(a) * 89
        const cy = 110 + Math.sin(a) * 89
        return <circle key={i} cx={cx} cy={cy} r="1.6" fill="#b8924a" />
      })}

      {/* pequeña botella central */}
      <g transform="translate(110 110) scale(0.32) translate(-240 -360)">
        <rect x="200" y="100" width="80" height="22" rx="3" fill="#5b4631" />
        <path d="M210 122 L 270 122 L 270 152 C 290 158, 300 172, 300 196 L 300 380 C 300 410, 280 432, 240 432 C 200 432, 180 410, 180 380 L 180 196 C 180 172, 190 158, 210 152 Z" fill="#283126" stroke="#1a2412" strokeWidth="3" />
        <path d="M210 220 C 200 290, 200 360, 220 400 C 240 380, 250 320, 240 250 Z" fill="#4a5a3a" />
        <circle cx="225" cy="260" r="3" fill="#0c1208" />
        <circle cx="255" cy="260" r="3" fill="#0c1208" />
        <path d="M220 320 C 230 360, 250 360, 260 320" fill="none" stroke="#0c1208" strokeWidth="2" />
      </g>
    </svg>
  )
}

/** Marco completo decorativo (esquinas y borde fino) para envolver una sección. */
export function DecoFrame({ className, style }: OrnamentProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="14" y="14" width="772" height="572" fill="none" stroke="#b8924a" strokeWidth="0.5" opacity="0.5" />
      <rect x="22" y="22" width="756" height="556" fill="none" stroke="#b8924a" strokeWidth="0.3" opacity="0.35" />
    </svg>
  )
}
