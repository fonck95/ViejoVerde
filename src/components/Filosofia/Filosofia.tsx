import styles from './Filosofia.module.css'
import { OrnamentDivider, BrandSeal } from '../svg/Ornaments'
import { MossPatch } from '../svg/Botanicals'
import { terrarium } from '../../data/terrarium'

export function Filosofia() {
  return (
    <section className={styles.section} aria-labelledby="hist-title">
      <div className="shell">
        <OrnamentDivider className={`${styles.divider} reveal`} />

        <header className={`${styles.head} reveal reveal-delay-1`}>
          <span className={styles.eyebrow}>Historia · I</span>
          <h2 id="hist-title" className={styles.title}>
            Nació entre niebla,<br /><em>en silencio</em>.
          </h2>
        </header>

        <div className={styles.body}>
          <div className={`${styles.story} reveal reveal-delay-2`}>
            {terrarium.story.map((p, i) => (
              <p key={i}>{i === 0 ? <>«{p}»</> : p}</p>
            ))}
            <p className={styles.attribution}>
              {terrarium.born} · {terrarium.origin}
            </p>
          </div>

          <div className={`${styles.illustrationFrame} reveal reveal-delay-3`} aria-hidden="true">
            <BrandSeal className={styles.seal} />
            <div className={styles.fixedInner}>
              <MossPatch style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
