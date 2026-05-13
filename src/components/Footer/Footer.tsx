import styles from './Footer.module.css'
import { OrnamentDivider } from '../svg/Ornaments'
import { terrarium } from '../../data/terrarium'

export function Footer() {
  return (
    <footer className={styles.section}>
      <div className="shell">
        <div className={`${styles.brand} reveal`}>
          <p className={styles.bigMark}>VIEJO&nbsp;&nbsp;VERDE</p>
          <p className={styles.subBrand}>· micro-bosques ·</p>
          <OrnamentDivider className={styles.divider} />
          <p className={styles.manifest}>
            <strong>{terrarium.promise}</strong>
            «Cada frasco es un pequeño bosque que pudo nacer en otro lugar y aún sigue respirando».
          </p>
        </div>

        <div className={`${styles.meta} reveal reveal-delay-1`}>
          <div className={styles.metaBlock}>
            <span className={styles.metaTitle}>Procedencia</span>
            <p className={styles.metaBody}>
              {terrarium.origin}<br />
              Bucaramanga · Colombia
            </p>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaTitle}>Acompañamiento</span>
            <p className={styles.metaBody}>
              <a href="mailto:hola@viejoverde.co">hola@viejoverde.co</a><br />
              <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer noopener">WhatsApp · +57 300 000 0000</a>
            </p>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaTitle}>Diario</span>
            <p className={styles.metaBody}>
              <a href="https://instagram.com/viejoverde.co" target="_blank" rel="noreferrer noopener">@viejoverde.co</a><br />
              Notas desde el bosque
            </p>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <span>© MMXXIV · Viejo Verde</span>
          <span>{terrarium.code} · {terrarium.number}</span>
        </div>
      </div>
    </footer>
  )
}
