"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import React, { useState, useEffect, useMemo } from "react"

const HeroDetailsMobile = () => {
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = useMemo(() => [
    {
        id: "visual-support",
        title: "Apoyo visual y emocional",
        description: "Tekko ofrece una interfaz visual amigable para que los niños con autismo puedan navegar con facilidad y se sientan acompañados en cada momento.",
        images: [
        { src: "/img_1.png", alt: "" },
        { src: "/img_2.png", alt: "" },
        { src: "/img_3.png", alt: "" }
        ]
    },
    {
        id: "personalized-progress",
        title: "Progreso personalizado",
        description: "Con Tekko, los padres pueden seguir el progreso de sus hijos mediante estadísticas sencillas y visuales que muestran evolución en tiempo real.",
        images: [
        { src: "/img_7.png", alt: "" },
        { src: "/img_5.png", alt: "" },
        { src: "/img_6.png", alt: "Resumen de progreso" }
        ]
    },
    {
        id: "motivating-activities",
        title: "Actividades que motivan",
        description: "Tekko incluye juegos y actividades diseñadas específicamente para reforzar habilidades cognitivas y sociales de manera divertida y estimulante.",
        images: [
        { src: "/img_10.png", alt: "" },
        { src: "/img_11.png", alt: "" },
        { src: "/img_12.png", alt: "" }
        ]
    }
    ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const goToSection = (index: number) => {
    const sectionEl = document.getElementById(sections[index].id);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-details-mobile relative">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Tus elementos decorativos aquí... */}
      </div>

      <div className="space-y-0">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen py-12 flex items-center justify-center px-4"
          >
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 gap-8 items-center">
              {/* Contenido de texto */}
              <div className="space-y-5 relative z-10">
                <div className="space-y-3">
                  <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase">
                    ¿Cómo ayuda a las familias?
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                    Experiencia {section.title.split(' ')[0]}
                    <br />
                    <span className="text-3xl sm:text-4xl font-bold">
                      {section.title.split(' ').slice(1).join(' ')} para
                    </span>
                    <br />
                    <span className="text-3xl sm:text-4xl font-bold">
                      todos.
                    </span>
                  </h1>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                    {section.description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button className="border border-gray-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300">
                    Próximamente
                  </button>
                </div>
              </div>

              {/* Sección de imágenes para mobile con estilo profesional y animaciones */}
            <div className="relative flex justify-center items-center mt-8">
            <div className="flex flex-col items-center w-full py-4">
                {/* Imagen principal con animación */}
                <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                >
                <div className="rounded-3xl shadow-xl overflow-hidden bg-none">
                    <Image
                    src={section.images[0].src}
                    alt={section.images[0].alt}
                    width={200}
                    height={350}
                    className="rounded-3xl object-cover"
                    />
                </div>
                </motion.div>

                {/* Imágenes secundarias */}
                <div className="flex justify-center items-end space-x-4 mt-2">
                {[1, 2].map(i => (
                    <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    >
                    <div className="rounded-2xl shadow-lg overflow-hidden bg-none">
                        <Image
                        src={section.images[i].src}
                        alt={section.images[i].alt}
                        width={120}
                        height={215}
                        className="rounded-2xl object-cover"
                        />
                    </div>
                    </motion.div>
                ))}
                </div>
            </div>
            </div>

            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default HeroDetailsMobile