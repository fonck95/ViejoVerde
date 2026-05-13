import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { upscaleToCanvas, isWebGPUAvailable } from './upscaler'

type Props = {
  src: string
  alt: string
  /**
   * Extra render-resolution multiplier on top of CSS size × devicePixelRatio.
   * Bump above 1 when the element will be enlarged further by transforms or
   * when extra crispness is desired. Default 1.
   */
  resolutionBoost?: number
  /** Unsharp-mask strength applied after resampling. 0 disables. Default 0.35. */
  sharpness?: number
  className?: string
  style?: CSSProperties
  loading?: 'eager' | 'lazy'
}

const MAX_DIMENSION = 4096

export function WebGPUImage({
  src,
  alt,
  resolutionBoost = 1,
  sharpness = 0.35,
  className,
  style,
  loading = 'eager',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [renderedSrc, setRenderedSrc] = useState<string | null>(null)
  const ready = renderedSrc === src

  useEffect(() => {
    if (!isWebGPUAvailable()) return

    let cancelled = false
    let bitmap: ImageBitmap | null = null
    let rafHandle: number | null = null
    let lastRender: { w: number; h: number } | null = null

    const loadBitmap = async () => {
      try {
        const res = await fetch(src)
        const blob = await res.blob()
        const bmp = await createImageBitmap(blob, {
          premultiplyAlpha: 'premultiply',
          colorSpaceConversion: 'default',
        })
        if (cancelled) {
          bmp.close?.()
          return
        }
        bitmap = bmp
        schedule()
      } catch {
        // ignore — <img> fallback stays visible
      }
    }

    const schedule = () => {
      if (cancelled || rafHandle !== null) return
      rafHandle = requestAnimationFrame(() => {
        rafHandle = null
        void render()
      })
    }

    const measure = (): { w: number; h: number } | null => {
      const probe = imgRef.current ?? canvasRef.current
      if (!probe) return null
      const rect = probe.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return null
      const dpr = Math.max(1, Math.min(4, window.devicePixelRatio || 1))
      const w = Math.min(MAX_DIMENSION, Math.max(1, Math.ceil(rect.width * dpr * resolutionBoost)))
      const h = Math.min(MAX_DIMENSION, Math.max(1, Math.ceil(rect.height * dpr * resolutionBoost)))
      return { w, h }
    }

    const render = async () => {
      const canvas = canvasRef.current
      if (!canvas || !bitmap || cancelled) return
      const size = measure()
      if (!size) {
        schedule()
        return
      }
      // Skip if already rendered at an equal-or-larger resolution within a
      // tolerance — avoids re-encoding on every sub-pixel resize tick.
      if (lastRender && size.w <= lastRender.w + 8 && size.h <= lastRender.h + 8) return
      try {
        await upscaleToCanvas(canvas, bitmap, size.w, size.h, sharpness)
        if (cancelled) return
        lastRender = size
        setRenderedSrc(src)
      } catch {
        // ignore — <img> fallback stays visible
      }
    }

    loadBitmap()

    const ro = new ResizeObserver(() => schedule())
    if (imgRef.current) ro.observe(imgRef.current)
    if (canvasRef.current) ro.observe(canvasRef.current)

    const onWindowChange = () => schedule()
    window.addEventListener('resize', onWindowChange, { passive: true })

    return () => {
      cancelled = true
      if (rafHandle !== null) cancelAnimationFrame(rafHandle)
      ro.disconnect()
      window.removeEventListener('resize', onWindowChange)
      bitmap?.close?.()
      bitmap = null
    }
  }, [src, resolutionBoost, sharpness])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={className}
        style={{ ...style, display: ready ? 'block' : 'none' }}
        role="img"
        aria-label={alt}
      />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        style={{ ...style, display: ready ? 'none' : 'block' }}
        loading={loading}
        decoding="async"
      />
    </>
  )
}
