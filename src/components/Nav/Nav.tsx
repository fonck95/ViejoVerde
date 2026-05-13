import { useEffect, useState } from 'react'
import styles from './Nav.module.css'
import { WebGPUImage } from '../WebGPUImage/WebGPUImage'
import { terrarium } from '../../data/terrarium'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#top" className={styles.mark} aria-label="Viejo Verde">
        <WebGPUImage
          src="/logoViejoVerde.png"
          alt="Viejo Verde"
          scale={2}
          className={styles.markImg}
          loading="eager"
        />
        <span className={styles.markText}>
          <strong>VIEJO&nbsp;VERDE</strong>
          <span>micro·bosques</span>
        </span>
      </a>

      <nav className={styles.links} aria-label="Secciones">
        <a href="#historia">Historia</a>
        <a href="#especies">Especies</a>
        <a href="#proceso">Proceso</a>
        <a href="#cuidados">Cuidados</a>
      </nav>

      <span className={styles.passport}>{terrarium.code}</span>
    </header>
  )
}
