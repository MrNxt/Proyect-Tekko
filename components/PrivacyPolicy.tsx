"use client";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <section
      id="privacy-policy"
      className="relative min-h-screen flex flex-col items-center justify-start  text-white px-6 pt-36 pb-20 overflow-hidden"
    >
      {/* Luces de fondo */}
      {/* <div className="absolute -top-32 left-[-15%] w-[500px] h-[500px] bg-yellow-500 opacity-20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-orange-400 opacity-20 rounded-full blur-3xl animate-pulse-medium" /> */}

      {/* Título */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-12 text-center z-10"
      >
        Política de Privacidad de Tekko
      </motion.h1>

      {/* Contenido */}
      <div className="z-10 max-w-4xl space-y-6">
        <div className="bg-black/40 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg hover:border-yellow-500/60 transition-all">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            1. Información que recopilamos
          </h2>
          <p className="text-gray-300">
            Recopilamos información básica del dispositivo, datos de uso y, en
            caso de contacto, información de los padres o tutores. Tekko puede
            ser utilizada por niños bajo la supervisión de adultos. Nunca
            recopilamos información personal directamente de menores sin
            consentimiento.
          </p>
        </div>

        <div className="bg-black/40 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg hover:border-yellow-500/60 transition-all">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            2. Uso de la información
          </h2>
          <p className="text-gray-300">
            Utilizamos los datos para mejorar la experiencia de Tekko, mostrar
            anuncios mediante Google AdMob y analizar métricas con Firebase.
          </p>
        </div>

        <div className="bg-black/40 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg hover:border-yellow-500/60 transition-all">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            3. Privacidad de menores
          </h2>
          <p className="text-gray-300">
            Tekko está pensada para ser usada con niños. Requiere la supervisión
            de padres o tutores y cumple con políticas como COPPA. Si
            descubrimos que recopilamos datos de un menor sin consentimiento,
            los eliminaremos de inmediato.
          </p>
        </div>

        <div className="bg-black/40 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg hover:border-yellow-500/60 transition-all">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            4. Servicios de terceros
          </h2>
          <p className="text-gray-300">
            Tekko utiliza Firebase (analíticas, distribución y notificaciones) y
            Google AdMob (publicidad). Estos servicios pueden recopilar
            información anónima de uso. Consulta sus políticas:
          </p>
          <ul className="list-disc list-inside text-gray-400 mt-2">
            <li>
              <a
                href="https://firebase.google.com/support/privacy"
                target="_blank"
                className="text-yellow-400 hover:underline"
              >
                Política de Firebase
              </a>
            </li>
            <li>
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                className="text-yellow-400 hover:underline"
              >
                Política de Google AdMob
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-black/40 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg hover:border-yellow-500/60 transition-all">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            5. Contacto
          </h2>
          <p className="text-gray-300">
            Si tienes dudas o deseas ejercer tus derechos de acceso,
            rectificación o eliminación de datos, puedes escribirnos:
          </p>
          <p className="mt-2 text-gray-300">
            📧{" "}
            <a
              href="mailto:team@yvagacore.tech"
              className="text-yellow-400 hover:underline"
            >
              team@yvagacore.tech
            </a>
          </p>
          <p className="text-gray-300">
            🌐{" "}
            <a
              href="https://www.yvagacore.com"
              target="_blank"
              className="text-yellow-400 hover:underline"
            >
              www.yvagacore.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
