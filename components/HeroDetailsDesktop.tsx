import Image from "next/image";
import React, { useRef, useLayoutEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Define section type for type safety
interface Section {
  id: string;
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}

// Type for GSAP Tween (from gsap types)
type GSAPTween = ReturnType<typeof gsap.to>;

// Use React.memo with typed props (empty in this case)
const HeroDetailsDesktop = React.memo(() => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [isIndicatorsVisible, setIsIndicatorsVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<GSAPTween | null>(null);
  const indicatorTriggerRef = useRef<ScrollTrigger | null>(null);

  const sections: Section[] = [
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

  // Debounce function with proper typing
  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Handle section change with debouncing
  const handleSectionChange = useCallback(
    debounce((idx: number) => {
      setActiveSection(idx);
    }, 100),
    []
  );

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      const panels = panelsRef.current.filter(Boolean); // Remove null refs
      const container = containerRef.current;

      // Optimize container for GPU acceleration
      container.style.willChange = "transform";
      container.style.transform = "translate3d(0,0,0)";

      const activeRef = { current: -1 };

      // Create ScrollTrigger
      scrollTriggerRef.current = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: (progress) =>
              Math.round(progress * (panels.length - 1)) / (panels.length - 1),
            duration: 0.25,
            ease: "power2.out",
          },
          start: "top top",
          end: () => "+=" + (container.scrollWidth - container.clientWidth),
          fastScrollEnd: true,
          onUpdate: (self: ScrollTrigger) => {
            const idx = Math.round(self.progress * (panels.length - 1));
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              handleSectionChange(idx);
            }
          },
        },
      });

      // Indicator animation
      indicatorTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => "+=" + (container.scrollWidth - container.clientWidth),
        onToggle: (self: ScrollTrigger) => {
          const indicators = document.getElementById("hero-indicators");
          if (indicators) {
            gsap.to(indicators, {
              opacity: self.isActive ? 1 : 0,
              y: self.isActive ? 0 : 50,
              pointerEvents: self.isActive ? "auto" : "none",
              duration: 0.25,
              ease: "power2.out",
            });
            setIsIndicatorsVisible(self.isActive);
          }
        },
      });

      return () => {
        // Clean up only this component's ScrollTriggers
        if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
        if (indicatorTriggerRef.current) indicatorTriggerRef.current.kill();
        container.style.willChange = "";
        container.style.transform = "";
      };
    }
  }, [sections.length, handleSectionChange]);

  const goToSection = (index: number) => {
    if (!containerRef.current || !scrollTriggerRef.current) return;

    // Pause ScrollTrigger to avoid conflicts
    scrollTriggerRef.current.scrollTrigger?.disable();

    gsap.to(window, {
      scrollTo: {
        y: containerRef.current,
        offsetY: (containerRef.current.scrollWidth / sections.length) * index,
      },
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        // Re-enable ScrollTrigger
        scrollTriggerRef.current?.scrollTrigger?.enable();
      },
    });
  };

  return (
    <div className="hero-details relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-32 w-16 h-16 bg-orange-500 rounded-full opacity-80 shadow-lg"
          style={{ willChange: "transform, opacity" }}
        ></div>
        <div
          className="absolute top-16 right-16 w-4 h-4 bg-green-500 rounded-full"
          style={{ willChange: "transform, opacity" }}
        ></div>
        <div
          className="absolute bottom-32 left-8 w-6 h-6 bg-green-500 rounded-full"
          style={{ willChange: "transform, opacity" }}
        ></div>
        <div
          className="absolute top-1/3 right-8 w-3 h-3 bg-orange-500 rounded-full"
          style={{ willChange: "transform, opacity" }}
        ></div>
        <div
          className="absolute bottom-40 right-20 w-5 h-5 bg-red-500 rounded-full"
          style={{ willChange: "transform, opacity" }}
        ></div>
        <div
          className="absolute top-1/2 left-8 w-4 h-4 bg-purple-500 rounded-full"
          style={{ willChange: "transform, opacity" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full"
          style={{ willChange: "transform, opacity" }}
        ></div>
        <div
          className="absolute top-1/4 left-16 w-8 h-8 bg-gray-600 opacity-30 transform rotate-45"
          style={{ willChange: "transform, opacity" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/4 w-6 h-6 bg-gray-600 opacity-30 transform rotate-12"
          style={{ willChange: "transform, opacity" }}
        ></div>
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

                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Primary mobile */}
                  <div className="relative z-20">
                    <div className="rounded-3xl">
                      <div className="rounded-3xl p-3">
                        <div className="relative h-[500px] w-[280px] rounded-2xl overflow-hidden">
                          <Image
                            src={section.images[0].src}
                            alt={section.images[0].alt}
                            fill
                            className="object-contain"
                            quality={70}
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary mobile (right) */}
                  <div className="absolute right-8 top-16 z-10">
                    <div className="rounded-2xl p-2">
                      <div className="relative h-[320px] w-[180px] rounded-xl overflow-hidden">
                        <Image
                          src={section.images[1].src}
                          alt={section.images[1].alt}
                          fill
                          className="object-contain"
                          quality={50}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Secondary mobile (bottom) */}
                  <div className="absolute bottom-20 right-16 z-15">
                    <div className="rounded-2xl p-2">
                      <div className="relative h-[180px] w-[100px] rounded-xl overflow-hidden">
                        <Image
                          src={section.images[2].src}
                          alt={section.images[2].alt}
                          fill
                          className="object-contain"
                          quality={50}
                          loading="lazy"
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
});

export default HeroDetailsDesktop;