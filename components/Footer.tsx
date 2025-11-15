import { FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[rgb(0_0_0_/_28%)] text-white py-12 px-8 rounded-t-3xl mt-16 shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo y descripción */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Tekko Icon"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-3xl font-extrabold text-[#FACC15]">
              TEKKO
            </span>
          </div>
          <p className="text-sm text-gray-300 text-center md:text-left max-w-xs">
            ¡Creemos que la tecnología no tiene sentido si no se usa para el
            bien común, por eso creamos Tekko!
          </p>
        </div>

        {/* Enlaces útiles */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold mb-4 text-[#FACC15]">Explora</h2>
          <ul className="space-y-2 text-base">
            <li>
              <a
                href="/politicas"
                className="hover:text-[#FACC15]"
              >
                Política de Privacidad
              </a>
            </li>
            <li>
              <a
                href="https://www.yvagacore.com/"
                className="hover:text-[#FACC15]"
              >
                Apoyar
              </a>
            </li>
            <li>
              <a
                href="mailto:business@yvagacore.tech"
                className="hover:text-[#FACC15]"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <h2 className="text-lg font-bold text-[#FACC15]">Síguenos</h2>
          <div className="flex space-x-5 text-3xl text-[#e4e9ea]">
            <a href="https://www.instagram.com/tekko_app/">
              <FaInstagram className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.tiktok.com/@soy.tekko.app/">
              <FaTiktok className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.instagram.com/tekko_app/">
              <FaLinkedinIn className="hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} YvagaCore | Tekko. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
