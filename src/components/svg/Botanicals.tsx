import type { CSSProperties } from 'react'

type BotanicalProps = {
  className?: string
  style?: CSSProperties
  ariaLabel?: string
}

/**
 * Fittonia - hojas ovaladas con nervadura plateada visible.
 * Construida con múltiples capas: tallo, hojas, venación detallada.
 */
export function Fittonia({ className, style, ariaLabel = 'Fittonia' }: BotanicalProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={ariaLabel}>
      {/* maceta sugerida */}
      <ellipse cx="100" cy="222" rx="34" ry="3" fill="#000" opacity="0.4" />

      {/* tallos */}
      <g stroke="#3d2a1a" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M100 218 C 100 200, 92 180, 80 160" />
        <path d="M100 218 C 102 196, 112 176, 124 160" />
        <path d="M100 218 C 96 198, 88 180, 70 168" />
        <path d="M100 218 C 104 200, 120 188, 138 178" />
        <path d="M100 218 C 100 195, 102 170, 100 140" />
      </g>

      {/* hojas - elipses con nervadura plateada */}
      {[
        { cx: 78, cy: 150, rx: 22, ry: 14, rot: -30 },
        { cx: 126, cy: 150, rx: 22, ry: 14, rot: 30 },
        { cx: 68, cy: 168, rx: 20, ry: 13, rot: -60 },
        { cx: 142, cy: 174, rx: 20, ry: 13, rot: 60 },
        { cx: 100, cy: 128, rx: 24, ry: 15, rot: 0 },
        { cx: 90, cy: 100, rx: 18, ry: 11, rot: -20 },
        { cx: 112, cy: 100, rx: 18, ry: 11, rot: 20 },
        { cx: 100, cy: 78, rx: 16, ry: 10, rot: 0 },
      ].map((l, i) => (
        <g key={i} transform={`translate(${l.cx} ${l.cy}) rotate(${l.rot})`}>
          <ellipse cx="0" cy="0" rx={l.rx} ry={l.ry} fill="#3d4d2f" stroke="#1d2614" strokeWidth="0.6" />
          {/* nervadura central */}
          <line x1={-l.rx + 2} y1="0" x2={l.rx - 2} y2="0" stroke="#cfc6b0" strokeWidth="0.6" opacity="0.85" />
          {/* nervios laterales */}
          {Array.from({ length: 6 }).map((_, j) => {
            const t = (j + 1) / 7
            const x = -l.rx + t * l.rx * 2
            return (
              <g key={j}>
                <path d={`M ${x} 0 Q ${x - 2} ${-l.ry * 0.5}, ${x - 5} ${-l.ry * 0.85}`} stroke="#cfc6b0" strokeWidth="0.4" fill="none" opacity="0.8" />
                <path d={`M ${x} 0 Q ${x - 2} ${l.ry * 0.5}, ${x - 5} ${l.ry * 0.85}`} stroke="#cfc6b0" strokeWidth="0.4" fill="none" opacity="0.8" />
              </g>
            )
          })}
        </g>
      ))}
    </svg>
  )
}

/** Helecho - patrón fractal de frondas. */
export function Fern({ className, style, ariaLabel = 'Helecho' }: BotanicalProps) {
  // recursividad limitada: cada fronda con folíolos opuestos
  const fronds = [
    { x: 100, y: 220, len: 200, rot: 0, depth: 2 },
    { x: 100, y: 220, len: 160, rot: -28, depth: 2 },
    { x: 100, y: 220, len: 160, rot: 28, depth: 2 },
    { x: 100, y: 220, len: 130, rot: -55, depth: 1 },
    { x: 100, y: 220, len: 130, rot: 55, depth: 1 },
  ]
  return (
    <svg className={className} style={style} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={ariaLabel}>
      {fronds.map((f, i) => (
        <Frond key={i} {...f} />
      ))}
      {/* base */}
      <ellipse cx="100" cy="226" rx="20" ry="2.5" fill="#000" opacity="0.35" />
    </svg>
  )
}

function Frond({ x, y, len, rot }: { x: number; y: number; len: number; rot: number; depth: number }) {
  // raquis curvado
  const tipX = x + Math.sin((rot * Math.PI) / 180) * len
  const tipY = y - Math.cos((rot * Math.PI) / 180) * len
  const ctrlX = x + Math.sin(((rot - 8) * Math.PI) / 180) * len * 0.5
  const ctrlY = y - Math.cos(((rot - 8) * Math.PI) / 180) * len * 0.5

  // folíolos
  const pinnae = []
  const count = 18
  for (let i = 1; i < count; i++) {
    const t = i / count
    const px = x + (tipX - x) * t
    const py = y + (tipY - y) * t
    const size = (1 - t) * len * 0.18
    const sideAngle = rot + 70
    const sideAngle2 = rot - 70
    const dx1 = Math.sin((sideAngle * Math.PI) / 180) * size
    const dy1 = -Math.cos((sideAngle * Math.PI) / 180) * size
    const dx2 = Math.sin((sideAngle2 * Math.PI) / 180) * size
    const dy2 = -Math.cos((sideAngle2 * Math.PI) / 180) * size

    pinnae.push(
      <g key={i}>
        {/* folíolo izquierda */}
        <path
          d={`M ${px} ${py} q ${dx1 * 0.4} ${dy1 * 0.4 - 1}, ${dx1} ${dy1}`}
          stroke="#3d4d2f"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d={`M ${px} ${py} q ${dx1 * 0.6} ${dy1 * 0.2}, ${dx1} ${dy1} q ${-dx1 * 0.1} ${-dy1 * 0.4}, ${-dx1 * 0.3} ${-dy1 * 0.4}`}
          fill="#4a5a3a"
          opacity="0.85"
        />
        {/* folíolo derecha */}
        <path
          d={`M ${px} ${py} q ${dx2 * 0.4} ${dy2 * 0.4 - 1}, ${dx2} ${dy2}`}
          stroke="#3d4d2f"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d={`M ${px} ${py} q ${dx2 * 0.6} ${dy2 * 0.2}, ${dx2} ${dy2} q ${-dx2 * 0.1} ${-dy2 * 0.4}, ${-dx2 * 0.3} ${-dy2 * 0.4}`}
          fill="#4a5a3a"
          opacity="0.85"
        />
      </g>
    )
  }

  return (
    <g>
      {/* raquis */}
      <path d={`M ${x} ${y} Q ${ctrlX} ${ctrlY}, ${tipX} ${tipY}`} stroke="#3d2a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {pinnae}
      {/* fiddlehead - báculo enroscado en la punta */}
      <circle cx={tipX} cy={tipY} r="2" fill="none" stroke="#3d4d2f" strokeWidth="0.6" />
      <circle cx={tipX} cy={tipY} r="1" fill="#3d4d2f" />
    </g>
  )
}

/** Musgo - manto puntillista con esporas */
export function MossPatch({ className, style, ariaLabel = 'Musgo' }: BotanicalProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={ariaLabel}>
      <ellipse cx="100" cy="200" rx="80" ry="20" fill="#283126" />
      <g fill="#3d4d2f">
        {Array.from({ length: 280 }).map((_, i) => {
          const cx = 22 + (i * 17) % 156
          const cy = 175 + ((i * 11) % 50)
          const r = 0.8 + ((i * 5) % 4) * 0.3
          return <circle key={i} cx={cx} cy={cy} r={r} />
        })}
      </g>
      <g fill="#7c8a62">
        {Array.from({ length: 140 }).map((_, i) => {
          const cx = 24 + (i * 23) % 152
          const cy = 178 + ((i * 13) % 44)
          const r = 0.5 + ((i * 3) % 3) * 0.2
          return <circle key={i} cx={cx} cy={cy} r={r} />
        })}
      </g>
      {/* esporofitos */}
      <g stroke="#5b4631" strokeWidth="0.7" fill="none">
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 30 + (i * 8) + (i % 2 ? 0 : 3)
          const len = 28 + ((i * 7) % 14)
          return (
            <g key={i}>
              <path d={`M${x} 200 q ${i % 2 ? 1 : -1} ${-len * 0.5}, ${i % 2 ? 1 : -1} ${-len}`} />
              <ellipse cx={x + (i % 2 ? 1 : -1)} cy={200 - len} rx="2" ry="3" fill="#5b4631" />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/** Selaginella - musgo de hojas escalonadas */
export function Selaginella({ className, style, ariaLabel = 'Selaginella' }: BotanicalProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={ariaLabel}>
      <ellipse cx="100" cy="222" rx="30" ry="3" fill="#000" opacity="0.4" />
      {/* ramas que se abren en abanico, cada una con escamas */}
      {Array.from({ length: 9 }).map((_, i) => {
        const angle = -55 + i * 14
        const len = 110 + (i % 2 ? 12 : 0)
        const rad = (angle * Math.PI) / 180
        const tipX = 100 + Math.sin(rad) * len
        const tipY = 220 - Math.cos(rad) * len
        return (
          <g key={i}>
            <path d={`M 100 220 Q ${100 + Math.sin(rad) * len * 0.45} ${220 - Math.cos(rad) * len * 0.55}, ${tipX} ${tipY}`} stroke="#3d4d2f" strokeWidth="0.8" fill="none" />
            {/* escamas a lo largo del tallo */}
            {Array.from({ length: 14 }).map((_, j) => {
              const t = (j + 1) / 15
              const sx = 100 + (tipX - 100) * t
              const sy = 220 + (tipY - 220) * t
              const side = j % 2 ? 1 : -1
              const dx = Math.cos(rad) * 4 * side
              const dy = Math.sin(rad) * 4 * side
              return (
                <path
                  key={j}
                  d={`M ${sx} ${sy} q ${dx * 0.6} ${dy * 0.6 - 1}, ${dx} ${dy}`}
                  fill="#4a5a3a"
                  stroke="#283126"
                  strokeWidth="0.3"
                />
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

/** Spathiphyllum - hoja ancha lanceolada con espata blanca */
export function Spathiphyllum({ className, style, ariaLabel = 'Spathiphyllum' }: BotanicalProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={ariaLabel}>
      <ellipse cx="100" cy="226" rx="30" ry="3" fill="#000" opacity="0.4" />
      {/* hojas grandes */}
      {[
        { rot: -20, sx: 0.9 },
        { rot: 25, sx: 0.95 },
        { rot: -55, sx: 0.7 },
        { rot: 55, sx: 0.7 },
        { rot: 0, sx: 1 },
      ].map((l, i) => (
        <g key={i} transform={`translate(100 220) rotate(${l.rot}) scale(${l.sx})`}>
          <path d="M 0 0 Q -22 -50, -10 -120 Q 0 -160, 10 -120 Q 22 -50, 0 0 Z" fill="#3d4d2f" stroke="#1d2614" strokeWidth="0.6" />
          {/* nervadura */}
          <path d="M 0 0 L 0 -150" stroke="#283126" strokeWidth="0.6" />
          {Array.from({ length: 8 }).map((_, j) => {
            const y = -20 - j * 16
            return (
              <g key={j}>
                <path d={`M 0 ${y} Q -6 ${y - 6}, -12 ${y - 14}`} stroke="#283126" strokeWidth="0.35" fill="none" opacity="0.7" />
                <path d={`M 0 ${y} Q 6 ${y - 6}, 12 ${y - 14}`} stroke="#283126" strokeWidth="0.35" fill="none" opacity="0.7" />
              </g>
            )
          })}
        </g>
      ))}
      {/* espata blanca (la flor) */}
      <g transform="translate(120 110) rotate(20)">
        <path d="M 0 0 Q -8 -20, 0 -42 Q 8 -20, 0 0 Z" fill="#e8dfc8" stroke="#5b4631" strokeWidth="0.5" />
        <line x1="0" y1="-2" x2="0" y2="-22" stroke="#b8924a" strokeWidth="1.2" />
        <g fill="#b8924a">
          {Array.from({ length: 18 }).map((_, j) => (
            <circle key={j} cx="0" cy={-4 - j} r="0.5" />
          ))}
        </g>
      </g>
    </svg>
  )
}

/** Colémbolo - microorganismo limpiador */
export function Springtail({ className, style, ariaLabel = 'Colémbolo' }: BotanicalProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={ariaLabel}>
      <ellipse cx="100" cy="222" rx="30" ry="3" fill="#000" opacity="0.3" />
      {/* hoja base */}
      <g transform="translate(100 200)">
        <path d="M -70 0 Q -50 -20, 0 -22 Q 50 -20, 70 0 Q 50 8, 0 8 Q -50 8, -70 0 Z" fill="#3d4d2f" stroke="#1d2614" strokeWidth="0.5" />
        {/* nervaduras */}
        <line x1="-66" y1="0" x2="66" y2="0" stroke="#283126" strokeWidth="0.4" />
      </g>
      {/* gota de agua */}
      <g transform="translate(60 188)">
        <ellipse cx="0" cy="0" rx="5" ry="6" fill="#cfd9bb" opacity="0.55" stroke="#7c8a62" strokeWidth="0.4" />
        <ellipse cx="-1.5" cy="-2" rx="1.2" ry="1.8" fill="#e8dfc8" opacity="0.8" />
      </g>
      {/* colémbolo cuerpo */}
      <g transform="translate(110 168)">
        <ellipse cx="0" cy="0" rx="22" ry="14" fill="#cfc6b0" stroke="#5b4631" strokeWidth="0.8" />
        {/* segmentos */}
        <path d="M -18 -2 q 0 6, 0 8" stroke="#5b4631" strokeWidth="0.4" fill="none" />
        <path d="M -10 -6 q 0 10, 0 12" stroke="#5b4631" strokeWidth="0.4" fill="none" />
        <path d="M 0 -8 q 0 14, 0 16" stroke="#5b4631" strokeWidth="0.4" fill="none" />
        <path d="M 10 -7 q 0 12, 0 14" stroke="#5b4631" strokeWidth="0.4" fill="none" />
        {/* ojo */}
        <circle cx="-14" cy="-3" r="2.2" fill="#0c1208" />
        <circle cx="-14.4" cy="-3.6" r="0.7" fill="#e8dfc8" />
        {/* antenas */}
        <path d="M -20 -4 q -6 -6, -10 -10" stroke="#5b4631" strokeWidth="0.6" fill="none" />
        <path d="M -20 -2 q -8 -2, -14 -4" stroke="#5b4631" strokeWidth="0.6" fill="none" />
        {/* patas */}
        <g stroke="#5b4631" strokeWidth="0.6" fill="none">
          <path d="M -10 8 q -2 6, -4 10" />
          <path d="M 0 9 q -1 7, -2 11" />
          <path d="M 10 8 q 1 7, 3 11" />
        </g>
        {/* furca - "cola" doblada bajo el cuerpo */}
        <path d="M 18 4 q 10 -2, 14 -8 q -8 0, -14 4" fill="#a39d85" stroke="#5b4631" strokeWidth="0.4" />
      </g>
      {/* partículas de polvo / esporas */}
      <g fill="#7c8a62" opacity="0.7">
        <circle cx="40" cy="80" r="1" />
        <circle cx="60" cy="60" r="0.8" />
        <circle cx="160" cy="78" r="1.2" />
        <circle cx="150" cy="120" r="0.6" />
        <circle cx="40" cy="130" r="0.8" />
      </g>
    </svg>
  )
}
