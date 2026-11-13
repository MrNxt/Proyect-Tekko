"use client"
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Definidos fuera del componente: si se crean dentro del render, cada re-render
// genera un componente nuevo y React desmonta/remonta toda la sección (y GSAP).
const HeroDetailsDesktop = dynamic(
  () => import('./HeroDetailsDesktop'),
  { ssr: false }
)

const HeroDetailsMobile = dynamic(
  () => import('./HeroDetailsMobile'),
  { ssr: false }
)

const MOBILE_QUERY = '(max-width: 1023px)' // equivalente a window.innerWidth < 1024

const HeroDetails = () => {
  // null = todavía no se sabe; así en móvil no se descarga ni monta la versión desktop (GSAP)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mq.matches)

    update()
    mq.addEventListener('change', update)

    return () => mq.removeEventListener('change', update)
  }, [])

  if (isMobile === null) return null

  return isMobile ? <HeroDetailsMobile /> : <HeroDetailsDesktop />
}

export default HeroDetails
