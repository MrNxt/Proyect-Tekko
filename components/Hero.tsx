"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { motion } from "framer-motion";

const HeroBody = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
      
  // Estado para la cuenta regresiva
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const charactersRef = useRef(null);

  useEffect(() => {
    const launchDate = new Date("2025-11-01T00:00:00");
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center text-white px-6 pt-36 pb-20 overflow-hidden bg-[#2e1f16]">
      {/* Fondo de partículas */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
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
        }}
        className="absolute inset-0 z-0"
      />

      {/* Luces difusas con animación */}
      <div className="absolute -top-32 left-[-15%] w-[500px] h-[500px] bg-yellow-500 opacity-30 rounded-full blur-3xl z-0 animate-pulse-slow" />
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-orange-400 opacity-20 rounded-full blur-3xl z-0 animate-pulse-medium" />
      <div className="absolute top-1/2 right-[20%] w-[300px] h-[300px] bg-red-500 opacity-20 rounded-full blur-3xl z-0 animate-pulse-fast" />

      {/* Contenido principal */}
      <div className="text-center max-w-2xl z-10 mb-8 mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Hola, Soy <span className="text-yellow-400">Tekko</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-5 text-lg text-gray-300"
        >
          Tekko es una app diseñada para ayudar a niños con autismo, fortaleciendo el vínculo entre padres e hijos mediante actividades guiadas por especialistas
        </motion.p>
      </div>

      {/* Contenedor de personajes */}
      <div ref={charactersRef} className="relative w-full max-w-6xl h-[500px] mb-12">
        {/* Personaje principal */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-auto md:h-auto">
          {/* Marco decorativo */}
          <div className="hidden md:block absolute -left-6 -right-6 -top-12 bottom-20 bg-black/30 border-2 border-yellow-500/30 rounded-2xl shadow-xl shadow-yellow-500/20 backdrop-blur-sm overflow-hidden"></div>

          <div className="animate-float-left">
            <Image
              src="/tekko99.png"
              alt="Mascota Tekko"
              width={350}
              height={350}
              className="object-contain relative z-10 translate-y-6 transition-transform md:hover:scale-[1.35] duration-300 md:scale-125 scale-[1.6]"
            />
          </div>
        </div>

        {/* Personaje izquierda */}
        <div className="absolute bottom-0 left-[5%] z-10 hidden md:block">
          <div className="absolute -left-4 -right-4 -top-8 bottom-10 bg-black/30 border-2 border-yellow-500/30 rounded-2xl shadow-xl shadow-yellow-500/20 backdrop-blur-sm overflow-hidden"></div>
          <div className="animate-float-left">
            <Image
              src="/tekko4.png"
              alt="Personaje izquierda"
              width={220}
              height={220}
              className="object-contain relative z-10 scale-110 translate-y-3 transition-transform hover:scale-125 duration-300"
            />
          </div>
        </div>

        {/* Personaje derecha */}
        <div className="absolute bottom-0 right-[5%] z-10 hidden md:block">
          <div className="absolute -left-4 -right-4 -top-8 bottom-10 bg-black/30 border-2 border-yellow-500/30 rounded-2xl shadow-xl shadow-yellow-500/20 backdrop-blur-sm overflow-hidden"></div>
          <div className="animate-float-right">
            <Image
              src="/tekko3.png"
              alt="Personaje derecha"
              width={220}
              height={220}
              className="object-contain relative z-10 scale-110 translate-y-3 transition-transform hover:scale-125 duration-300"
            />
          </div>
        </div>
      </div>

      {/* Cuenta regresiva */}
      <div className="flex justify-center items-center gap-4 z-20 mb-8 flex-wrap">
        {/* DÍAS */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-center bg-black/40 border-2 border-yellow-500/30 rounded-xl backdrop-blur-sm hover:border-yellow-500/70 hover:scale-105 transition-all duration-300">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">
            {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
          </div>
          <div className="text-xs text-gray-400">DÍAS</div>
        </div>

        {/* HORAS */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-center bg-black/40 border-2 border-yellow-500/30 rounded-xl backdrop-blur-sm hover:border-yellow-500/70 hover:scale-105 transition-all duration-300">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">
            {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
          </div>
          <div className="text-xs text-gray-400">HORAS</div>
        </div>

        {/* MINUTOS */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-center bg-black/40 border-2 border-yellow-500/30 rounded-xl backdrop-blur-sm hover:border-yellow-500/70 hover:scale-105 transition-all duration-300">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">
            {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}
          </div>
          <div className="text-xs text-gray-400">
            <span className="block sm:hidden">MIN</span>
            <span className="hidden sm:block">MINUTOS</span>
          </div>
        </div>

        {/* SEGUNDOS */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-center bg-black/40 border-2 border-yellow-500/30 rounded-xl backdrop-blur-sm hover:border-yellow-500/70 hover:scale-105 transition-all duration-300">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold animate-pulse">
            {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
          </div>
          <div className="text-xs text-gray-400">
            <span className="block sm:hidden">SEG</span>
            <span className="hidden sm:block">SEGUNDOS</span>
          </div>
        </div>
      </div>
      
      {/* Sección de descargas */}
      <div className="flex justify-center items-center gap-4 flex-wrap sm:flex-nowrap z-20 mb-8">
        {/* App Store */}
        <div className="flex items-center bg-black/60 hover:bg-black/80 transition-all duration-300 rounded-xl px-4 py-2 border border-yellow-500/40 cursor-pointer hover:border-yellow-500/70 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20">
          <div className="mr-2">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Próximamente</span>
            <span className="text-sm font-semibold">App Store</span>
          </div>
        </div>

        {/* Play Store */}
        <div className="flex items-center bg-black/60 hover:bg-black/80 transition-all duration-300 rounded-xl px-4 py-2 border border-yellow-500/40 cursor-pointer hover:border-yellow-500/70 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20">
          <div className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7 h-7 text-white" fill="currentColor">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.6 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Muy pronto en</span>
            <span className="text-sm font-semibold">Play Store</span>
          </div>
        </div>
      </div>
      
      {/* Texto descriptivo */}
      <div className="mt-8 text-center z-20 max-w-xl">
        <p className="text-sm text-gray-300">
          Tekko actúa como un puente entre padres e hijos. Permite a los adultos acompañar de cerca el progreso de sus hijos
        </p>
      </div>
    </section>
  );
};

export default HeroBody;