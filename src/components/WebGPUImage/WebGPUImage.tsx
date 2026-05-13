import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { upscaleToCanvas, isWebGPUAvailable } from './upscaler'

type Props = {
  src: string
  alt: string
  /** Upscale factor applied on top of the source image resolution. Default 3. */
  scale?: number
  className?: string
  style?: CSSProperties
  loading?: 'eager' | 'lazy'
}

/**
 * Renders an image upscaled on the GPU via WebGPU using a Mitchell-Netravali
 * bicubic filter. Falls back to a regular <img> when WebGPU is unavailable
 * or pipeline setup fails.
 */
export function WebGPUImage({ src, alt, scale = 3, className, style, loading = 'eager' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [renderedKey, setRenderedKey] = useState<string>('')
  const currentKey = `${src}|${scale}`
  const ready = renderedKey === currentKey

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      const canvas = canvasRef.current
      if (!canvas || !isWebGPUAvailable()) return
      try {
        const response = await fetch(src)
        const blob = await response.blob()
        const bitmap = await createImageBitmap(blob)
        if (cancelled) {
          bitmap.close?.()
          return
        }
        await upscaleToCanvas(canvas, bitmap, scale)
        bitmap.close?.()
        if (!cancelled) setRenderedKey(`${src}|${scale}`)
      } catch {
        // fall through; canvas stays hidden, <img> fallback remains visible
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [src, scale])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={className}
        style={{ ...style, display: ready ? 'block' : 'none' }}
        role="img"
        aria-label={alt}
      />
      {!ready && (
        <img
          src={src}
          alt={alt}
          className={className}
          style={style}
          loading={loading}
          decoding="async"
        />
      )}
    </>
  )
}
