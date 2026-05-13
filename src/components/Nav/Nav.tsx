import { useEffect, useState } from 'react'
import styles from './Nav.module.css'
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
        <svg className={styles.markSvg} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="22" y="6" width="20" height="6" rx="1" fill="#5b4631" />
          <path d="M 24 12 L 40 12 L 40 18 C 46 20, 48 24, 48 30 L 48 50 C 48 56, 42 60, 32 60 C 22 60, 16 56, 16 50 L 16 30 C 16 24, 18 20, 24 18 Z" fill="#283126" stroke="#b8924a" strokeWidth="1" />
          <path d="M 24 28 C 22 38, 22 48, 26 56 C 30 50, 32 40, 30 32 Z" fill="#4a5a3a" />
          <circle cx="28" cy="36" r="1.2" fill="#0c1208" />
          <circle cx="36" cy="36" r="1.2" fill="#0c1208" />
        </svg>
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
