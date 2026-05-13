import styles from './Proceso.module.css'
import { terrarium } from '../../data/terrarium'

export function Proceso() {
  return (
    <section className={styles.section} aria-labelledby="proc-title">
      <div className="shell">
        <header className={styles.head}>
          <span className={`${styles.eyebrow} reveal`}>Proceso · III</span>
          <h2 id="proc-title" className={`${styles.title} reveal reveal-delay-1`}>
            Cuatro pasos para <em>contener</em><br />un fragmento de bosque.
          </h2>
          <p className={`${styles.subtitle} reveal reveal-delay-2`}>
            Tarda más de un mes. Y eso es parte del precio que pagamos para no romper nada.
          </p>
        </header>

        <ol className={styles.timeline}>
          <span className={styles.line} aria-hidden="true" />
          {terrarium.process.map((p, i) => (
            <li key={p.step} className={`${styles.step} reveal`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className={styles.numberWrap}>
                <span className={styles.roman}>{p.step}</span>
              </div>
              <div className={styles.stepText}>
                <h3 className={styles.stepTitle}>{p.title}</h3>
                <p className={styles.stepBody}>{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
