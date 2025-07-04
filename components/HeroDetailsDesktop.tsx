"use client";
import Image from "next/image";
import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const HeroDetailsDesktop = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isIndicatorsVisible, setIsIndicatorsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    {
      id: "visual-support",
      title: "Apoyo visual y emocional",
      description:
        "Tekko ofrece una interfaz visual amigable para que los niños con autismo puedan navegar con facilidad y se sientan acompañados en cada momento.",
      images: [
        { src: "/img_1.png", alt: "" },
        { src: "/img_2.png", alt: "" },
        { src: "/img_3.png", alt: "" },
      ],
    },
    {
      id: "personalized-progress",
      title: "Progreso personalizado",
      description:
        "Con Tekko, los padres pueden seguir el progreso de sus hijos mediante estadísticas sencillas y visuales que muestran evolución en tiempo real.",
      images: [
        { src: "/img_7.png", alt: "" },
        { src: "/img_5.png", alt: "" },
        { src: "/img_6.png", alt: "Resumen de progreso" },
      ],
    },
    {
      id: "motivating-activities",
      title: "Actividades que motivan",
      description:
        "Tekko incluye juegos y actividades diseñadas específicamente para reforzar habilidades cognitivas y sociales de manera divertida y estimulante.",
      images: [
        { src: "/img_10.png", alt: "" },
        { src: "/img_11.png", alt: "" },
        { src: "/img_12.png", alt: "" },
      ],
    },
  ];

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      gsap.registerPlugin(ScrollTrigger);

      const handle = setTimeout(() => {
        ScrollTrigger.getAll().forEach((st) => st.kill());

        const panels = panelsRef.current;

        const scrollTween = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.2, max: 0.8 },
              delay: 0.1,
            },
            start: "top top",
            end: () => "+=" + (containerRef.current?.offsetWidth ?? 0),
            onUpdate: (self) => {
              const newActiveSection = Math.round(
                self.progress * (panels.length - 1)
              );
              setActiveSection(newActiveSection);
            },
          },
        });

        const indicatorTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + (containerRef.current?.offsetWidth ?? 0),
          onToggle: (self) => {
            const indicators = document.getElementById("hero-indicators");
            if (indicators) {
              gsap.to(indicators, {
                opacity: self.isActive ? 1 : 0,
                y: self.isActive ? 0 : 50,
                pointerEvents: self.isActive ? "auto" : "none",
                duration: 0.5,
                ease: self.isActive ? "power2.out" : "power2.in",
              });
              setIsIndicatorsVisible(self.isActive);
            }
          },
        });

        return () => {
          scrollTween.kill();
          indicatorTrigger.kill();
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      }, 250); // delay hasta que layout esté completo

      return () => clearTimeout(handle);
    }
  }, [sections.length]);

  const goToSection = (index: number) => {
    const totalSections = sections.length;
    const scrollProgress = index / (totalSections - 1);

    const st = ScrollTrigger.getAll().find(
      (st) => st.trigger === containerRef.current
    );

    if (st) {
      const newScrollPosition = st.start + (st.end - st.start) * scrollProgress;
      window.scrollTo({
        top: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="hero-details relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right */}
        <div className="absolute top-20 right-32 w-16 h-16 bg-orange-500 rounded-full opacity-80 shadow-lg"></div>

        {/* Elementos verdes */}
        <div className="absolute top-16 right-16 w-4 h-4 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-32 left-8 w-6 h-6 bg-green-500 rounded-full"></div>

        {/* Elementos naranjas/rojos */}
        <div className="absolute top-1/3 right-8 w-3 h-3 bg-orange-500 rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-5 h-5 bg-red-500 rounded-full"></div>

        {/* Elementos púrpura/azul */}
        <div className="absolute top-1/2 left-8 w-4 h-4 bg-purple-500 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full"></div>

        {/* Formas hexagonales grises */}
        <div className="absolute top-1/4 left-16 w-8 h-8 bg-gray-600 opacity-30 transform rotate-45"></div>
        <div className="absolute bottom-20 right-1/4 w-6 h-6 bg-gray-600 opacity-30 transform rotate-12"></div>
      </div>

      <div ref={containerRef} className="h-screen overflow-hidden relative">
        <div className="flex absolute top-0 left-0 w-full h-full">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => (panelsRef.current[index] = el)}
              className="w-screen h-full flex-shrink-0 flex items-center justify-center px-8"
            >
              <div className="max-w-6xl mx-auto w-full grid grid-cols-2 gap-16 items-center h-full">
                {/* Contenido de texto */}
                <div className="space-y-8 relative z-10">
                  <div className="space-y-6">
                    <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase">
                      ¿Cómo ayuda a las familias?
                    </p>
                    <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight">
                      Experiencia {section.title.split(" ")[0]}
                      <br />
                      <span className="text-5xl xl:text-6xl font-bold">
                        {section.title.split(" ").slice(1).join(" ")} para
                      </span>
                      <br />
                      <span className="text-5xl xl:text-6xl font-bold">
                        todos.
                      </span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                      {section.description}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button className="border border-gray-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300">
                      Próximamente
                    </button>
                  </div>
                </div>

                {/* Sección de imágenes */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Móvil principal */}
                  <div className="relative z-20">
                    <div className="rounded-3xl">
                      <div className="rounded-3xl p-3">
                        <div className="relative h-[500px] w-[280px] rounded-2xl overflow-hidden">
                          <Image
                            src={section.images[0].src}
                            alt={section.images[0].alt}
                            fill
                            className="object-contain"
                            quality={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Móvil secundario derecho */}
                  <div className="absolute right-8 top-16 z-10">
                    <div className="rounded-2xl p-2">
                      <div className="relative h-[320px] w-[180px] rounded-xl overflow-hidden">
                        <Image
                          src={section.images[1].src}
                          alt={section.images[1].alt}
                          fill
                          className="object-contain"
                          quality={90}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Móvil secundario inferior */}
                  <div className="absolute bottom-20 right-16 z-15">
                    <div className="rounded-2xl p-2">
                      <div className="relative h-[180px] w-[100px] rounded-xl overflow-hidden">
                        <Image
                          src={section.images[2].src}
                          alt={section.images[2].alt}
                          fill
                          className="object-contain"
                          quality={90}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroDetailsDesktop;
