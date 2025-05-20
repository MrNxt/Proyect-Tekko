'use client'
import CheesecakeModel from "@/components/Loading/CheesecakeModel"
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

const Info = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const textContentRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  // Configuración Lenis 
  useEffect(() => {
    lenisRef.current = new Lenis({
      lerp: 0.1,           
      smoothWheel: true,     
    })    
    
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && textContentRef.current) {
      const textElements = textContentRef.current.querySelectorAll('p, h2, div > div')
      
      textElements.forEach((element) => {
        gsap.fromTo(element,
          { y: 0, opacity: 1, filter: 'blur(0px)' },
          {
            y: -60,
            opacity: 0,
            filter: 'blur(4px)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "bottom 90%", 
              end: "bottom 10%",     
              scrub: 1,
              markers: false, 
              onLeave: () => {
                gsap.to(element, { 
                  y: -60, 
                  opacity: 0, 
                  filter: 'blur(4px)', 
                  duration: 0.8 
                })
              },
              onEnterBack: () => {
                gsap.to(element, { 
                  y: 0, 
                  opacity: 1, 
                  filter: 'blur(0px)', 
                  duration: 0.8 
                })
              }
            }
          }
        )
      })
    }

    const raf = (time: number) => {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenisRef.current?.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawSpace = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const addNebula = (x: number, y: number, size: number, intensity: number) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        gradient.addColorStop(0, `rgba(255, 180, 50, ${intensity})`)
        gradient.addColorStop(1, 'rgba(255, 120, 0, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      addNebula(canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.6, 0.08)
      addNebula(canvas.width * 0.7, canvas.height * 0.6, canvas.width * 0.4, 0.05)

      // Estrellas
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 1.2
        const alpha = 0.2 + Math.random() * 0.5
        ctx.fillStyle = `rgba(255, ${180 + Math.random() * 50}, 50, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    drawSpace()
    const resizeObserver = new ResizeObserver(drawSpace)
    resizeObserver.observe(canvas)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <section id="info"
      ref={sectionRef}
      className="w-full py-24 px-6 text-white relative overflow-hidden"
    >
      {/* Fondo */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Modelo 3D  */}
        <div className="relative w-full max-w-md h-96 mx-auto flex justify-start items-center">
          <CheesecakeModel />
        </div>

        {/* Contenido de texto */}
        <div 
          ref={textContentRef}
          className="w-full lg:w-1/2 space-y-5 lg:pl-12"
        >
          <p className="text-amber-300 uppercase tracking-wide font-semibold text-xs sm:text-sm">
            Sobre Tekko
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Nuestro <span className="text-amber-400">compromiso</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl">
            Tekko nace del deseo de transformar la manera en que las familias viven el autismo. Sabemos que cada niño es único, por eso nuestra app está diseñada con flexibilidad, empatía y ciencia.
            Trabajamos con psicólogos clínicos y expertos en neurodiversidad para ofrecer una herramienta útil, segura y transformadora
          </p>

          {/* Íconos */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-6 items-center sm:items-start text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-2xl sm:text-3xl mb-2 text-amber-400">🌟</div>
              <p className="text-white font-semibold text-sm sm:text-base">Interfaz Inclusiva</p>
              <p className="text-amber-100 text-xs sm:text-sm">Diseñada pensando en la neurodiversidad.</p>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-2xl sm:text-3xl mb-2 text-amber-400">🧩</div>
              <p className="text-white font-semibold text-sm sm:text-base">Actividades Terapéuticas</p>
              <p className="text-amber-100 text-xs sm:text-sm">Ejercicios validados por especialistas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info