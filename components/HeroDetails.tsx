"use client"
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const HeroDetails = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const HeroDetailsDesktop = dynamic(
    () => import('./HeroDetailsDesktop'),
    { ssr: false }
  )
  
  const HeroDetailsMobile = dynamic(
    () => import('./HeroDetailsMobile'),
    { ssr: false }
  )

  return isMobile ? <HeroDetailsMobile /> : <HeroDetailsDesktop />
}

export default HeroDetails