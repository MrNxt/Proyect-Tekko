"use client"
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

// three.js + drei + fiber (~700 KB) solo se descargan cuando el modelo se acerca a la pantalla
const ModelScene = dynamic(() => import('./ModelScene'), { ssr: false })

export default function CheesecakeModel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isNear, setIsNear] = useState(false)
  const [pageIdle, setPageIdle] = useState(false)
  const [inView, setInView] = useState(false)

  // three.js + el .glb (~1.5 MB en total) no deben competir con la carga inicial
  // (Hero, fuente, imagen principal): se espera a que la página termine de cargar
  // y el navegador esté libre.
  useEffect(() => {
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const markIdle = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setPageIdle(true), { timeout: 2000 })
      } else {
        timeoutId = setTimeout(() => setPageIdle(true), 200)
      }
    }
    if (document.readyState === 'complete') markIdle()
    else window.addEventListener('load', markIdle, { once: true })

    return () => {
      window.removeEventListener('load', markIdle)
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [])

  const shouldMount = isNear && pageIdle

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Precarga con margen amplio para que el modelo ya esté listo al llegar
    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true)
          mountObserver.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )

    // Render activo solo mientras se ve (con un pequeño margen)
    const viewObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '100px 0px' }
    )

    mountObserver.observe(el)
    viewObserver.observe(el)
    return () => {
      mountObserver.disconnect()
      viewObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '80vh',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      {shouldMount && <ModelScene active={inView} />}
    </div>
  )
}
