"use client";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Información que recopilamos",
      content:
        "Recopilamos información básica del dispositivo, datos de uso y, en caso de contacto, información de los padres o tutores. Tekko puede ser utilizada por niños bajo la supervisión de adultos. Nunca recopilamos información personal directamente de menores sin consentimiento.",
    },
    {
      title: "2. Uso de la información",
      content:
        "Utilizamos los datos para mejorar la experiencia de Tekko, mostrar anuncios mediante Google AdMob y analizar métricas con Firebase.",
    },
    {
      title: "3. Datos de Google que recopilamos",
      content:
        "Cuando accedes a Tekko mediante Google Sign-In, únicamente obtenemos tu correo electrónico y tu nombre de perfil. No accedemos a tu contraseña ni a información sensible de tu cuenta de Google.",
    },
    {
      title: "4. Cómo usamos los datos de Google",
      content:
        "Usamos el correo electrónico y el nombre de perfil solo para autenticar tu cuenta y mostrar tu perfil dentro de la app. No compartimos esta información con terceros ni la usamos para publicidad personalizada.",
    },
    {
      title: "5. Privacidad de menores",
      content:
        "Tekko está pensada para ser usada con niños bajo supervisión de padres o tutores. Cumple con políticas como COPPA. Si descubrimos que recopilamos datos de un menor sin consentimiento, los eliminaremos de inmediato.",
    },
  ];

  return (
    <section
      id="privacy-policy"
      className="relative min-h-screen flex flex-col items-center justify-start text-white px-6 pt-36 pb-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #3d2f1f 0%, #2a1f15 50%, #1a1410 100%)",
      }}
    >
      {/* Partículas doradas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#F2D19E]"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${
                Math.random() * 3 + 2
              }s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }
      `}</style>

      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#FFF8F5]">
          Política de Privacidad
        </h1>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#F2D19E] to-transparent rounded-full" />
      </motion.div>

      {/* Contenido */}
      <div className="z-10 max-w-4xl w-full space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative bg-[#F2D19E]/5 backdrop-blur-md border border-[#D74B16]/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:border-[#D74B16]/40 hover:bg-[#F2D19E]/10 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D74B16]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h2 className="relative text-2xl font-bold text-[#F2D19E] mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#D74B16] rounded-full group-hover:scale-150 transition-transform duration-300" />
              {section.title}
            </h2>
            <p className="relative text-gray-300 leading-relaxed">
              {section.content}
            </p>
          </motion.div>
        ))}

        {/* Servicios de terceros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group relative bg-[#F2D19E]/5 backdrop-blur-md border border-[#D74B16]/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:border-[#D74B16]/40 hover:bg-[#F2D19E]/10 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D74B16]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h2 className="relative text-2xl font-bold text-[#F2D19E] mb-4 flex items-center gap-3">
            <span className="w-2 h-2 bg-[#D74B16] rounded-full group-hover:scale-150 transition-transform duration-300" />
            6. Servicios de terceros
          </h2>
          <p className="relative text-gray-300 leading-relaxed mb-4">
            Tekko utiliza Firebase (analíticas, distribución y notificaciones) y
            Google AdMob (publicidad). Estos servicios pueden recopilar
            información anónima de uso. Consulta sus políticas:
          </p>
          <ul className="relative space-y-2">
            <li>
              <a
                href="https://firebase.google.com/support/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#F2D19E] hover:text-[#D74B16] transition-colors duration-200 group/link"
              >
                <span className="w-1.5 h-1.5 bg-[#D74B16] rounded-full group-hover/link:scale-150 transition-transform duration-200" />
                Política de Firebase
                <svg
                  className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#F2D19E] hover:text-[#D74B16] transition-colors duration-200 group/link"
              >
                <span className="w-1.5 h-1.5 bg-[#D74B16] rounded-full group-hover/link:scale-150 transition-transform duration-200" />
                Política de Google AdMob
                <svg
                  className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="group relative bg-gradient-to-br from-[#D74B16]/10 to-[#F2D19E]/5 backdrop-blur-md border border-[#D74B16]/30 rounded-2xl p-8 shadow-2xl hover:shadow-[0_0_30px_rgba(215,75,22,0.3)] hover:border-[#D74B16]/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D74B16]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h2 className="relative text-2xl font-bold text-[#F2D19E] mb-4 flex items-center gap-3">
            <span className="w-2 h-2 bg-[#D74B16] rounded-full group-hover:scale-150 transition-transform duration-300" />
            7. Contacto
          </h2>
          <p className="relative text-gray-300 leading-relaxed mb-6">
            Si tienes dudas o deseas ejercer tus derechos de acceso,
            rectificación o eliminación de datos, puedes escribirnos:
          </p>
          <div className="relative space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <a
                href="mailto:team@yvagacore.com"
                className="text-[#F2D19E] hover:text-[#D74B16] transition-colors duration-200 font-medium"
              >
                team@yvagacore.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <a
                href="https://www.yvagacore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F2D19E] hover:text-[#D74B16] transition-colors duration-200 font-medium"
              >
                www.yvagacore.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decoración inferior */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="z-10 mt-16 text-center"
      >
        <div className="inline-block px-6 py-3 bg-[#F2D19E]/5 backdrop-blur-sm border border-[#D74B16]/20 rounded-full">
          <p className="text-sm text-gray-400">
            Última actualización: Noviembre 2025
          </p>
        </div>
      </motion.div>
    </section>
  );
}
