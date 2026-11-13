"use client";
import { LazyMotion, domAnimation } from "framer-motion";

// Carga solo las features de framer-motion que usa la web (animate, exit,
// whileInView, whileTap...) en lugar del paquete completo de `motion`.
// Los componentes usan `m.div` en vez de `motion.div`.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
