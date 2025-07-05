"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { label } from "framer-motion/client";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "info", label: "Sobre Tekko" },
  { id: "visual-support", label: "Explora" },
  { id: "beta-signup", label: "Prueba" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  // Variants para animar la lista y los items
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
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
              <a
                href={`#${section.id}`}
                onClick={handleScrollTo(section.id)}
                className="hover:text-[#D74B16] transition-colors duration-200"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón a implementar próximamente */}
        <div className="flex items-center gap-2">
          <button className="invisible pointer-events-none h-0 overflow-hidden px-4 py-2 rounded-full">
            Pre-registro
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#F2D19E]"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Menú mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden bg-[rgb(9_9_6_/_0.67)] backdrop-blur-md rounded-xl mt-3 px-5 text-[#F2D19E] text-base font-medium shadow-lg transition-all duration-300 w-1/2 ml-auto
                      py-5 min-h-[220px] flex flex-col justify-around"
          >
            {sections.map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                onClick={handleScrollTo(section.id)}
                className="block text-left hover:text-[#D74B16] transition-colors duration-200"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                  delay: index * 0.1,
                }}
              >
                {section.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
