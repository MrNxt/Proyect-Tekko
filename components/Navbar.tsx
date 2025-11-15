"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { id: "inicio", label: "Inicio", type: "section" },
  { id: "info", label: "Sobre Tekko", type: "section" },
  { id: "visual-support", label: "Explora", type: "section" },
  { id: "beta-signup", label: "Sugerencias", type: "section" },
  { id: "/politicas", label: "Política de Privacidad", type: "page" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 100;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 800; 
      
      let startTime: number | null = null;
      
      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const ease = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };
      
      requestAnimationFrame(animation);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4 mx-auto transition-transform duration-300 ${
          isVisible ? "translate-y-4" : "-translate-y-[150%]"
        }`}
      >
        <nav className="w-full rounded-2xl backdrop-blur-md bg-[#F2D19E]/10 border border-none shadow-lg px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Tekko Icon"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-xl font-bold text-[#D74B16]">TEKKO</span>
          </div>

          {/* Desktop nav */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium text-[#F2D19E]">
            {sections.map((section) => (
              <li key={section.id}>
                {section.type === "page" ? (
                  <a
                    href={section.id}
                    className="hover:text-[#D74B16] transition-colors duration-200"
                  >
                    {section.label}
                  </a>
                ) : (
                  <a
                    href={`#${section.id}`}
                    onClick={handleScrollTo(section.id)}
                    className="hover:text-[#D74B16] transition-colors duration-200 cursor-pointer"
                  >
                    {section.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Botón a implementar próximamente si se saca se rompe el diseño */}
          <div className="flex items-center gap-2">
            <button className="invisible pointer-events-none h-0 overflow-hidden px-4 py-2 rounded-full">
              Pre-registro
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#F2D19E] z-50"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menú mobile - Ahora posicionado absolutamente fuera del header */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-4 z-40 md:hidden bg-[rgb(9_9_6_/_0.67)] backdrop-blur-md rounded-xl px-5 py-5 text-[#F2D19E] text-base font-medium shadow-lg w-64"
          >
            <div className="flex flex-col space-y-4">
              {sections.map((section, index) => (
                section.type === "page" ? (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={section.id}
                      className="block text-left hover:text-[#D74B16] transition-colors duration-200 py-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      {section.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={handleScrollTo(section.id)}
                    className="block text-left hover:text-[#D74B16] transition-colors duration-200 py-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {section.label}
                  </motion.a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;