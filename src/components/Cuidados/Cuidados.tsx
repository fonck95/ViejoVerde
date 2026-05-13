import type { ReactNode } from 'react'
import styles from './Cuidados.module.css'
import { IconWater, IconLight, IconThermo, IconVent, IconAlert, IconCare } from '../svg/CareIcons'
import { terrarium, type CareNote } from '../../data/terrarium'

const ICONS: Record<CareNote['icon'], (p: { className?: string }) => ReactNode> = {
  water: (p) => <IconWater {...p} />,
  light: (p) => <IconLight {...p} />,
  thermo: (p) => <IconThermo {...p} />,
  vent: (p) => <IconVent {...p} />,
  alert: (p) => <IconAlert {...p} />,
  care: (p) => <IconCare {...p} />,
}

export function Cuidados() {
  return (
    <section className={styles.section} aria-labelledby="care-title">
      <div className="shell">
        <header className={styles.headWrap}>
          <div className="reveal">
            <span className={styles.eyebrow}>Cuidados · IV</span>
            <h2 id="care-title" className={styles.title}>
              Casi <em>no necesita</em><br />que lo cuides.
            </h2>
          </div>
          <p className={`${styles.intro} reveal reveal-delay-1`}>
            El frasco se autorregula. Tu papel es observar, no intervenir. Estas son las únicas
            seis cosas que necesitas recordar.
          </p>
        </header>

        <ul className={styles.grid}>
          {terrarium.care.map((c, i) => {
            const Icon = ICONS[c.icon]
            const idx = String(i + 1).padStart(2, '0')
            return (
              <li key={c.title} className={`${styles.card} reveal`} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className={styles.iconSlot} aria-hidden="true">
                  <Icon />
                </div>
                <div className={styles.cardTitleRow}>
                  <span className={styles.cardIndex}>{idx}</span>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                </div>
                <p className={styles.cardBody}>{c.body}</p>
              </li>
            )
          })}
        </ul>

        <div className={`${styles.signalBox} reveal`}>
          <span className={styles.signalLabel}>Asistencia incluida</span>
          <p className={styles.signalCopy}>
            <strong>3 visitas durante el primer año.</strong>{' '}
            Si dudas algo, escríbenos. Volveremos al bosque contigo si hace falta.
          </p>
          <a
            className={styles.cta}
            href="https://wa.me/573000000000?text=Hola%2C%20soy%20due%C3%B1o%20del%20VV-001%20y%20necesito%20acompa%C3%B1amiento"
            target="_blank"
            rel="noreferrer noopener"
          >
            Pedir asistencia
          </a>
        </div>
      </div>
    </section>
  )
}
