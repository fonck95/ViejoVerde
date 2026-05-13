import type { CSSProperties } from 'react'

type Props = {
  className?: string
  style?: CSSProperties
  ariaLabel?: string
}

/**
 * Botella-guardián. Vector compuesto con múltiples capas:
 * vidrio, follaje interior, rostro del viejo verde (Green Man),
 * raíces y ornamentos. Estilo grabado botánico antiguo.
 */
export function BottleGuardian({ className, style, ariaLabel = 'Botella Viejo Verde' }: Props) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 480 720"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id="bg-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a2412" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#283126" stopOpacity="0.85" />
          <stop offset="1" stopColor="#0f1409" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="bg-cork" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a5d3c" />
          <stop offset="0.5" stopColor="#5b4631" />
          <stop offset="1" stopColor="#3b2c1d" />
        </linearGradient>
        <radialGradient id="bg-haze" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#7c8a62" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#3d4d2f" stopOpacity="0.2" />
          <stop offset="1" stopColor="#0f1409" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bg-glow" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#d2ab63" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0f1409" stopOpacity="0" />
        </radialGradient>
        <filter id="bg-rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="1.2" />
        </filter>
        <filter id="bg-paper" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.85  0 0 0 0 0.78  0 0 0 0 0.65  0 0 0 0.06 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id="bg-inside">
          <path d="M150 220
            C 150 200, 162 188, 175 184
            C 178 168, 178 152, 174 144
            L 174 110
            C 174 102, 182 96, 200 94
            L 280 94
            C 298 96, 306 102, 306 110
            L 306 144
            C 302 152, 302 168, 305 184
            C 318 188, 330 200, 330 220
            L 330 600
            C 330 632, 304 656, 240 656
            C 176 656, 150 632, 150 600 Z" />
        </clipPath>
      </defs>

      {/* halo cálido detrás del cristal */}
      <ellipse cx="240" cy="420" rx="230" ry="320" fill="url(#bg-glow)" />

      {/* sombra inferior */}
      <ellipse cx="240" cy="688" rx="160" ry="14" fill="#000" opacity="0.55" />

      {/* RAÍCES debajo - red orgánica */}
      <g stroke="#3d2a1a" strokeWidth="1.25" fill="none" opacity="0.85">
        <path d="M240 656 C 230 670, 210 678, 192 688 C 178 696, 168 704, 160 712" />
        <path d="M240 656 C 246 672, 256 682, 270 690 C 286 698, 300 706, 312 716" />
        <path d="M240 656 C 240 678, 238 692, 232 706" />
        <path d="M220 660 C 200 672, 180 680, 156 690 C 138 698, 124 706, 118 712" />
        <path d="M260 660 C 280 672, 300 680, 320 690 C 340 698, 354 706, 360 712" />
        <path d="M200 654 C 174 658, 150 670, 130 690" />
        <path d="M280 654 C 306 658, 330 670, 350 690" />
        <path d="M170 686 C 160 694, 150 702, 142 710" />
        <path d="M310 686 C 320 694, 330 702, 338 710" />
      </g>
      <g stroke="#4d3624" strokeWidth="0.6" fill="none" opacity="0.7">
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 110 + i * 9
          const dy = 22 + ((i * 7) % 18)
          return <path key={i} d={`M${x} 690 q ${(i % 2 ? 2 : -2)} ${dy / 2}, ${(i % 2 ? 4 : -4)} ${dy}`} />
        })}
      </g>

      {/* CUERPO DE LA BOTELLA - vidrio oscuro */}
      <g>
        {/* sombra externa */}
        <path d="M150 220
          C 150 200, 162 188, 175 184
          C 178 168, 178 152, 174 144
          L 174 110
          C 174 102, 182 96, 200 94
          L 280 94
          C 298 96, 306 102, 306 110
          L 306 144
          C 302 152, 302 168, 305 184
          C 318 188, 330 200, 330 220
          L 330 600
          C 330 632, 304 656, 240 656
          C 176 656, 150 632, 150 600 Z"
          fill="url(#bg-glass)"
          stroke="#1a2412"
          strokeWidth="2"
        />

        {/* niebla interior */}
        <g clipPath="url(#bg-inside)">
          <rect x="140" y="180" width="200" height="500" fill="url(#bg-haze)" />
          {/* anillo de humedad en el cristal */}
          <ellipse cx="180" cy="320" rx="14" ry="20" fill="#cfd9bb" opacity="0.07" />
          <ellipse cx="300" cy="280" rx="10" ry="16" fill="#cfd9bb" opacity="0.05" />
          <ellipse cx="240" cy="500" rx="40" ry="60" fill="#cfd9bb" opacity="0.04" />
        </g>

        {/* reflejo lateral */}
        <path d="M165 240 C 158 320, 158 460, 168 580" stroke="#cfd9bb" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.13" />
        <path d="M325 250 C 332 360, 330 480, 320 560" stroke="#cfd9bb" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.07" />

        {/* etiqueta colgante (cuello) - hilo */}
        <path d="M210 134 Q 200 152, 188 168" stroke="#cfc6b0" strokeWidth="0.7" fill="none" opacity="0.55" />

        {/* CORCHO */}
        <rect x="172" y="60" width="136" height="42" rx="4" fill="url(#bg-cork)" />
        <rect x="172" y="60" width="136" height="42" rx="4" fill="none" stroke="#2d2014" strokeWidth="1.5" />
        {/* textura del corcho */}
        <g fill="#3b2c1d" opacity="0.55">
          {Array.from({ length: 60 }).map((_, i) => {
            const cx = 178 + (i * 11) % 124
            const cy = 66 + ((i * 13) % 30)
            const r = 0.6 + ((i * 3) % 4) * 0.25
            return <circle key={i} cx={cx} cy={cy} r={r} />
          })}
        </g>
        <line x1="172" y1="74" x2="308" y2="74" stroke="#2d2014" strokeWidth="0.6" opacity="0.5" />
        <line x1="172" y1="88" x2="308" y2="88" stroke="#2d2014" strokeWidth="0.5" opacity="0.4" />

        {/* boca de la botella */}
        <rect x="170" y="48" width="140" height="14" rx="2" fill="#1a2412" />
        <rect x="166" y="44" width="148" height="8" rx="2" fill="#283126" />
      </g>

      {/* CONTENIDO INTERIOR: musgo, ramas, rostro */}
      <g clipPath="url(#bg-inside)">
        {/* suelo de musgo abajo */}
        <g>
          <path d="M150 600 C 200 580, 280 590, 330 596 L 330 656 L 150 656 Z" fill="#1d2614" />
          <path d="M150 614 C 200 604, 270 612, 330 608 L 330 656 L 150 656 Z" fill="#283126" />
        </g>
        {/* musgo - textura puntillista */}
        <g fill="#4d6038" opacity="0.85">
          {Array.from({ length: 220 }).map((_, i) => {
            const x = 152 + (i * 17) % 176
            const y = 590 + ((i * 11) % 60)
            const r = 0.8 + ((i * 5) % 5) * 0.2
            return <circle key={`m1-${i}`} cx={x} cy={y} r={r} />
          })}
        </g>
        <g fill="#7c8a62" opacity="0.7">
          {Array.from({ length: 120 }).map((_, i) => {
            const x = 154 + (i * 23) % 174
            const y = 596 + ((i * 13) % 50)
            const r = 0.5 + ((i * 3) % 3) * 0.2
            return <circle key={`m2-${i}`} cx={x} cy={y} r={r} />
          })}
        </g>

        {/* ROSTRO DEL VIEJO VERDE - construido con ramas y hojas */}
        {/* contorno facial sutil */}
        <g opacity="0.95">
          {/* cabeza/frente formada por una masa de hojas */}
          <path d="M195 220
            C 195 195, 215 188, 240 188
            C 265 188, 285 195, 285 220
            C 285 250, 275 280, 260 305
            L 220 305
            C 205 280, 195 250, 195 220 Z"
            fill="#3d4d2f"
            opacity="0.7"
          />
          {/* corona de hojas */}
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (Math.PI * (i + 1)) / 19
            const r = 60
            const cx = 240 - Math.cos(angle) * r
            const cy = 220 - Math.sin(angle) * (r - 6)
            const rot = (angle * 180) / Math.PI - 90
            return (
              <g key={`leaf-${i}`} transform={`translate(${cx} ${cy}) rotate(${rot})`}>
                <path d="M0 0 C -3 -10, -3 -22, 0 -32 C 3 -22, 3 -10, 0 0 Z" fill="#4a5a3a" stroke="#283126" strokeWidth="0.5" />
                <line x1="0" y1="-2" x2="0" y2="-30" stroke="#283126" strokeWidth="0.4" />
              </g>
            )
          })}

          {/* CEJAS - musgo denso */}
          <ellipse cx="220" cy="230" rx="14" ry="4" fill="#1d2614" />
          <ellipse cx="260" cy="230" rx="14" ry="4" fill="#1d2614" />
          <g fill="#3d4d2f">
            {Array.from({ length: 16 }).map((_, i) => (
              <circle key={`brow-l-${i}`} cx={208 + i * 1.6} cy={226 + ((i * 3) % 4)} r={1.2} />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <circle key={`brow-r-${i}`} cx={248 + i * 1.6} cy={226 + ((i * 3) % 4)} r={1.2} />
            ))}
          </g>

          {/* OJOS - dos puntos brillantes */}
          <circle cx="222" cy="240" r="3.2" fill="#0c1208" />
          <circle cx="258" cy="240" r="3.2" fill="#0c1208" />
          <circle cx="222.5" cy="239" r="0.9" fill="#d2ab63" />
          <circle cx="258.5" cy="239" r="0.9" fill="#d2ab63" />

          {/* NARIZ - rama */}
          <path d="M240 246 C 238 254, 236 264, 235 272 C 234 280, 238 286, 240 290 C 242 286, 246 280, 245 272 C 244 264, 242 254, 240 246 Z" fill="#5b4631" stroke="#2d2014" strokeWidth="0.4" />

          {/* BIGOTE - raíces colgantes */}
          <g stroke="#3d2a1a" strokeWidth="1" fill="none">
            <path d="M232 296 C 220 308, 208 322, 198 340" />
            <path d="M234 298 C 224 314, 216 330, 210 348" />
            <path d="M236 300 C 230 316, 226 332, 224 350" />
            <path d="M244 296 C 256 308, 268 322, 278 340" />
            <path d="M244 298 C 254 314, 262 330, 268 348" />
            <path d="M242 300 C 246 316, 250 332, 252 350" />
          </g>

          {/* BARBA - cascada de musgo y raíces */}
          <path d="M210 310
            C 195 340, 188 380, 192 420
            C 196 460, 210 510, 224 560
            C 232 590, 244 600, 256 560
            C 270 510, 284 460, 288 420
            C 292 380, 285 340, 270 310 Z"
            fill="#283126"
            opacity="0.9"
          />
          {/* textura puntillista de la barba */}
          <g fill="#4d6038" opacity="0.85">
            {Array.from({ length: 260 }).map((_, i) => {
              const x = 198 + (i * 13) % 84
              const y = 315 + ((i * 17) % 280)
              const r = 0.7 + ((i * 5) % 4) * 0.18
              return <circle key={`b-${i}`} cx={x} cy={y} r={r} />
            })}
          </g>
          {/* hebras de barba */}
          <g stroke="#1d2614" strokeWidth="0.6" fill="none" opacity="0.7">
            {Array.from({ length: 26 }).map((_, i) => {
              const x = 204 + i * 3
              const len = 80 + ((i * 7) % 120)
              const sway = (i % 2 ? 6 : -6) + ((i * 3) % 5)
              return <path key={`s-${i}`} d={`M${x} 314 q ${sway} ${len / 2}, ${sway / 2} ${len}`} />
            })}
          </g>
          {/* hojas que cuelgan de la barba */}
          <g fill="#4a5a3a" stroke="#283126" strokeWidth="0.4">
            {Array.from({ length: 12 }).map((_, i) => {
              const x = 200 + (i * 7) % 80
              const y = 360 + ((i * 41) % 220)
              return (
                <path
                  key={`bl-${i}`}
                  d={`M${x} ${y} c -2 -6, -2 -14, 0 -20 c 2 6, 2 14, 0 20 Z`}
                />
              )
            })}
          </g>
        </g>

        {/* RAMAS A LOS LADOS DEL ROSTRO */}
        <g stroke="#3d2a1a" strokeWidth="1.4" fill="none">
          <path d="M195 240 C 175 245, 162 260, 156 280" />
          <path d="M285 240 C 305 245, 318 260, 324 280" />
          <path d="M188 270 C 168 275, 158 290, 158 310" />
          <path d="M292 270 C 312 275, 322 290, 322 310" />
        </g>

        {/* HOJAS SUELTAS POR EL VIDRIO */}
        <g fill="#4a5a3a" stroke="#283126" strokeWidth="0.4" opacity="0.85">
          <path d="M170 380 c -4 -8, -2 -18, 4 -22 c 6 4, 8 14, 4 22 c -2 4, -6 4, -8 0 Z" />
          <path d="M310 420 c -4 -8, -2 -18, 4 -22 c 6 4, 8 14, 4 22 c -2 4, -6 4, -8 0 Z" />
          <path d="M175 500 c -4 -8, -2 -18, 4 -22 c 6 4, 8 14, 4 22 c -2 4, -6 4, -8 0 Z" />
          <path d="M305 540 c -4 -8, -2 -18, 4 -22 c 6 4, 8 14, 4 22 c -2 4, -6 4, -8 0 Z" />
        </g>

        {/* PARTÍCULAS DE LUZ FLOTANDO */}
        <g fill="#d2ab63" opacity="0.7">
          {Array.from({ length: 18 }).map((_, i) => {
            const x = 160 + (i * 19) % 160
            const y = 240 + ((i * 23) % 320)
            return <circle key={`p-${i}`} cx={x} cy={y} r={0.7} />
          })}
        </g>
      </g>

      {/* brillo sobre el cristal (cuello) */}
      <path d="M186 110 Q 184 130, 186 160" stroke="#cfd9bb" strokeWidth="1.2" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M294 112 Q 296 132, 294 158" stroke="#cfd9bb" strokeWidth="0.8" fill="none" opacity="0.18" strokeLinecap="round" />

      {/* ETIQUETA colgante */}
      <g transform="translate(120 200) rotate(-8)">
        <path d="M0 0 L 56 0 L 64 12 L 56 24 L 0 24 Z" fill="#e8dfc8" filter="url(#bg-paper)" />
        <path d="M0 0 L 56 0 L 64 12 L 56 24 L 0 24 Z" fill="none" stroke="#5b4631" strokeWidth="0.6" />
        <circle cx="56" cy="12" r="1.5" fill="#5b4631" />
        <text x="8" y="10" fontFamily="Cinzel, serif" fontSize="6" fill="#5b4631" letterSpacing="1.5">VV-001</text>
        <line x1="6" y1="14" x2="50" y2="14" stroke="#5b4631" strokeWidth="0.3" />
        <text x="8" y="20" fontFamily="Lora, serif" fontSize="4" fill="#5b4631" fontStyle="italic">El Guardián</text>
      </g>
    </svg>
  )
}
