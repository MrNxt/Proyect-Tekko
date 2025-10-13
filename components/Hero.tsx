"use client";
import { useCallback, useMemo } from "react";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { motion } from "framer-motion";

const HeroBody = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = useMemo(() => ({
    fullScreen: false,
    background: { color: "#2e1f16" },
    particles: {
      color: { value: "#f7f400" },
      number: { value: 80, density: { enable: true, area: 800 } },
      opacity: { value: 0.3 },
      size: { value: 2 },
      move: { enable: true, speed: 0.3 },
      links: { enable: true, color: "#f7f400", distance: 120, opacity: 0.1 },
    },
  }), []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center text-white px-6 py-20 overflow-hidden bg-gradient-to-br from-[#2e1f16] via-[#3d2a1f] to-[#2e1f16]"
    >
      {/* Fondo de partículas */}
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />

      {/* Luces difusas */}
      <div className="absolute -top-32 left-[-15%] w-[500px] h-[500px] bg-yellow-500 opacity-30 rounded-full blur-3xl z-0 animate-pulse-slow" />
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-orange-400 opacity-20 rounded-full blur-3xl z-0 animate-pulse-medium" />
      <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] bg-yellow-500 opacity-15 rounded-full blur-3xl z-0 animate-pulse-fast" />

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Columna izquierda - Contenido de texto */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
          className="text-left space-y-6"
        >
          {/* Título principal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center md:text-left">
            Aprendemos <span className="text-yellow-400"> y Crecemos</span> juntos
          </h1>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-gray-300 max-w-xl text-center md:text-left">
            Tekko es una app diseñada para apoyar a niños con dificultades de comunicación, fortaleciendo el vínculo entre padres e hijos mediante actividades guiadas y adaptadas por especialistas
          </p>

          {/* Botones de descarga */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-start gap-4 pt-4">
            {/* Botón Play Store */}
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group flex items-center gap-3 px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-bold text-lg shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 w-fit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6" fill="currentColor">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.6 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
              <span>Descargar</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>

            {/* Botón App Store - Próximamente */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 px-6 py-4 bg-black/40 border-2 border-yellow-500/40 text-white rounded-full font-semibold text-lg backdrop-blur-sm cursor-not-allowed w-fit"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-gray-400">Próximamente</span>
            </motion.div>
          </div>

        </motion.div>

        {/* Columna derecha - Tarjetas flotantes */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center lg:justify-end px-4 sm:px-0"
        >
          {/* Contenedor mobiles */}
          <div className="relative w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] lg:w-[360px] lg:h-[720px]">
            
            {/* Img */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[220px] h-[440px] sm:w-[260px] sm:h-[520px]">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src="/img_1.png" 
                  alt="Tekko App Interface" 
                  width={260} 
                  height={520}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Img 4 - Izquierda superior */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden sm:block absolute -left-16 top-8 w-36 h-auto z-10"
            >
              <Image 
                src="/img_4.png" 
                alt="Tekko Screen" 
                width={140} 
                height={280}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Img 5 - Derecha inferior */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hidden sm:block absolute -right-16 bottom-20 w-32 h-auto z-10"
            >
              <Image 
                src="/img_5.png" 
                alt="Tekko Screen" 
                width={128} 
                height={256}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Tarjetas flotantes */}
            <motion.div className="absolute right-0 sm:-right-4 top-4 w-32 h-24 z-30 animate-float-right">
              <div className="w-full h-full rounded-xl shadow-2xl overflow-hidden border-2 border-yellow-500/30 bg-gradient-to-br from-orange-600 to-yellow-600 p-2">
                <Image src="/tekko4.png" alt="Personaje Tekko" width={120} height={90} className="w-full h-full object-contain"/>
              </div>
            </motion.div>

            <motion.div className="absolute left-0 sm:-left-6 bottom-16 w-32 h-24 z-30 animate-float-left">
              <div className="w-full h-full rounded-xl shadow-2xl overflow-hidden border-2 border-yellow-500/30 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 p-2">
                <Image src="/tekko3.png" alt="Personaje Tekko" width={120} height={90} className="w-full h-full object-contain"/>
              </div>
            </motion.div>

            {/* Elementos decorativos flotantes */}
            <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 right-12 w-12 h-12 bg-yellow-400 rounded-full opacity-80 blur-sm z-5"/>
            <motion.div animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-12 left-0 sm:-left-6 w-16 h-16 bg-orange-400 rounded-full opacity-60 blur-sm z-5"/>
            <motion.div animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-1/3 right-0 sm:-right-4 w-8 h-8 bg-yellow-500 rounded-full opacity-70 blur-sm z-5"/>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroBody;