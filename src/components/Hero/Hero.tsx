import styles from './Hero.module.css'
import { BottleGuardian } from '../svg/BottleGuardian'
import { CornerSprig } from '../svg/Ornaments'
import { terrarium } from '../../data/terrarium'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-code">
      <div className="shell">
        <div className={styles.grid}>
          <div className={styles.text}>
            <div className={`${styles.eyebrowRow} reveal`}>
              <span>Viejo Verde · Micro-bosques</span>
              <span>{terrarium.number}</span>
            </div>

            <h1 id="hero-code" className={`${styles.code} reveal reveal-delay-1`}>{terrarium.code}</h1>

            <p className={`${styles.name} reveal reveal-delay-2`}>{terrarium.name}</p>

            <p className={`${styles.subtitle} reveal reveal-delay-3`}>
              {terrarium.subtitle}. Una pieza única, sellada en vidrio, que sigue respirando en silencio.
            </p>

            <dl className={`${styles.meta} reveal reveal-delay-4`}>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Nacido</dt>
                <dd className={styles.metaValue}>{terrarium.born}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Edad</dt>
                <dd className={styles.metaValue}>{terrarium.age}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Origen</dt>
                <dd className={styles.metaValue}>Santander · CO</dd>
              </div>
            </dl>
          </div>

          <div className={`${styles.bottleWrap} reveal reveal-delay-2`}>
            <div className={styles.bottleFrame}>
              <CornerSprig className={styles.cornerTL} />
              <CornerSprig className={styles.cornerTR} />
              <CornerSprig className={styles.cornerBL} />
              <CornerSprig className={styles.cornerBR} />
              <BottleGuardian className={styles.bottleBottle} ariaLabel="VV-001 · El Guardián del Roble" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>explorar</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
