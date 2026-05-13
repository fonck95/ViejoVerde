import { useEffect } from 'react'

/**
 * Activa las animaciones de aparición sobre cualquier elemento con clase .reveal.
 * Una sola observación global, idempotente.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

    const targets = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [])
}
