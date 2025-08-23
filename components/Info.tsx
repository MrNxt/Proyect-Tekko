"use client"
import CheesecakeModel from "@/components/Loading/CheesecakeModel"
import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { motion, useAnimation } from "framer-motion"

const FadeIn = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({ opacity: 1, y: 0 })
          } else {
            controls.start({ opacity: 0, y: 50 })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

const Info = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  // Configuración Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.2,
      alpha: 0.2 + Math.random() * 0.5,
      color: 180 + Math.random() * 50,
    }))

    const drawSpace = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const addNebula = (x: number, y: number, size: number, intensity: number) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        gradient.addColorStop(0, `rgba(255, 180, 50, ${intensity})`)
        gradient.addColorStop(1, "rgba(255, 120, 0, 0)")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      addNebula(canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.6, 0.08)
      addNebula(canvas.width * 0.7, canvas.height * 0.6, canvas.width * 0.4, 0.05)

      stars.forEach((s) => {
        ctx.fillStyle = `rgba(255, ${s.color}, 50, ${s.alpha})`
        ctx.beginPath()
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    drawSpace()
    const resizeObserver = new ResizeObserver(drawSpace)
    resizeObserver.observe(canvas)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <section
      id="info"
      className="w-full py-24 px-6 text-white relative overflow-hidden"
    >
      {/* Fondo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* Modelo 3D */}
        <div className="relative w-full max-w-md h-96 mx-auto flex justify-start items-center">
          <CheesecakeModel />
        </div>

        {/* Contenido de texto */}
        <div className="w-full lg:w-1/2 space-y-5 lg:pl-12">
          <FadeIn>
            <p className="text-amber-300 uppercase tracking-wide font-semibold text-xs sm:text-sm">
              Sobre Tekko
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Nuestro <span className="text-amber-400">compromiso</span>
            </h2>
          </FadeIn>

          <FadeIn>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl">
              Tekko nace del deseo de transformar la manera en que las familias viven el autismo. 
              Sabemos que cada niño es único, por eso nuestra app está diseñada con flexibilidad, empatía y ciencia. 
              Trabajamos con psicólogos clínicos y expertos en neurodiversidad para ofrecer una herramienta útil, segura y transformadora
            </p>
          </FadeIn>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-6 items-center sm:items-start text-center sm:text-left">
            <FadeIn>
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-2xl sm:text-3xl mb-2 text-amber-400">🌟</div>
                <p className="text-white font-semibold text-sm sm:text-base">
                  Interfaz Inclusiva
                </p>
                <p className="text-amber-100 text-xs sm:text-sm">
                  Diseñada pensando en la neurodiversidad.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-2xl sm:text-3xl mb-2 text-amber-400">🧩</div>
                <p className="text-white font-semibold text-sm sm:text-base">
                  Actividades Terapéuticas
                </p>
                <p className="text-amber-100 text-xs sm:text-sm">
                  Ejercicios validados por especialistas.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info