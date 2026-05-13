import type { ReactNode } from 'react'
import styles from './Especies.module.css'
import { Fittonia, MossPatch, Selaginella, Spathiphyllum, Springtail } from '../svg/Botanicals'
import { terrarium, type Species } from '../../data/terrarium'

const illustrations: Record<string, (p: { className?: string }) => ReactNode> = {
  Fittonia: (p) => <Fittonia {...p} />,
  Musgo: (p) => <MossPatch {...p} />,
  Selaginella: (p) => <Selaginella {...p} />,
  Espatifilo: (p) => <Spathiphyllum {...p} />,
  Colémbolos: (p) => <Springtail {...p} />,
}

const originStyles = {
  Bosque: 'cardOriginBosque',
  Vivero: 'cardOriginVivero',
  Ecosistema: 'cardOriginEcosistema',
} as const

export function Especies() {
  return (
    <section className={styles.section} aria-labelledby="esp-title">
      <div className="shell">
        <header className={styles.head}>
          <div className="reveal">
            <span className={styles.eyebrow}>Habitantes · II</span>
            <h2 id="esp-title" className={styles.title}>
              Quiénes <em>respiran</em><br />dentro del frasco.
            </h2>
          </div>
          <p className={`${styles.intro} reveal reveal-delay-1`}>
            Cinco especies aprendieron a convivir aquí. Algunas vinieron del bosque, otras
            de un vivero, y unas pocas son invisibles a simple vista.
          </p>
        </header>

        <ul className={styles.grid}>
          {terrarium.species.map((s, i) => (
            <SpeciesCard key={s.num} species={s} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function SpeciesCard({ species, index }: { species: Species; index: number }) {
  const Illustration = illustrations[species.name]
  return (
    <li className={`${styles.card} reveal`} style={{ transitionDelay: `${index * 80}ms` }}>
      <div className={styles.cardHead}>
        <span className={styles.cardNum}>· {species.num} ·</span>
        <span className={`${styles.cardOrigin} ${styles[originStyles[species.origin]]}`}>
          {species.origin}
        </span>
      </div>
      <div className={styles.illustration} aria-hidden="true">
        {Illustration ? <Illustration /> : null}
      </div>
      <h3 className={styles.cardName}>{species.name}</h3>
      <p className={styles.cardScientific}>{species.scientific}</p>
      <p className={styles.cardRole}>{species.role}</p>
      <p className={styles.cardDetail}>{species.detail}</p>
      <span className={styles.cardLine} aria-hidden="true" />
    </li>
  )
}
