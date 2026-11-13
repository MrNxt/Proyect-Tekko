import type Lenis from "lenis";

// Instancia única de Lenis compartida entre componentes (Navbar, HeroDetailsDesktop...)
let instance: Lenis | null = null;
const listeners = new Set<(lenis: Lenis | null) => void>();

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
  listeners.forEach((fn) => fn(lenis));
};

export const getLenis = () => instance;

/** Ejecuta `fn` con la instancia actual y cada vez que cambie. Devuelve la función de baja. */
export const subscribeLenis = (fn: (lenis: Lenis | null) => void) => {
  listeners.add(fn);
  fn(instance);
  return () => {
    listeners.delete(fn);
  };
};

// easeInOutQuad: misma curva que power2.inOut de GSAP y que el scroll del Navbar
export const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
