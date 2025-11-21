"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { getCookie } from "@/hooks/getCookies";

export default function AdminUploadBook() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [totalPaginas, setTotalPaginas] = useState("");
  const [nivelId, setNivelId] = useState("");
  const pdfRef = useRef<HTMLInputElement | null>(null);
  const portadaRef = useRef<HTMLInputElement | null>(null);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [portadaFile, setPortadaFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getCookie("admin_token");

    if (!token) {
      setMessage("Sesión expirada. Volvé a iniciar sesión.");
      return;
    }

    if (!pdfFile || !portadaFile) {
      setMessage("Debes seleccionar PDF y portada");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("totalPaginas", totalPaginas);
    formData.append("nivelId", nivelId);
    formData.append("pdf", pdfFile);
    formData.append("portada", portadaFile);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        console.warn("Token expirado. Cerrando sesión...");

        // Borrar cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
        });

        // Borrar localStorage
        localStorage.clear();

        // Redirigir
        window.location.href = "/admin";
        return;
      }

      if (response.ok) {
        setMessage("📚 Libro subido correctamente");
        setTitulo("");
        setDescripcion("");
        setTotalPaginas("");
        setNivelId("");

        setPdfFile(null);
        setPortadaFile(null);
        if (pdfRef.current) pdfRef.current.value = "";
        if (portadaRef.current) portadaRef.current.value = "";
      } else {
        setMessage(data.error || "Error subiendo libro");
      }
    } catch (err) {
      setMessage("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-start justify-center px-6 pt-36 pb-24 text-white"
      style={{
        background:
          "linear-gradient(180deg, #3d2f1f 0%, #2a1f15 50%, #1a1410 100%)",
      }}
    >
      {/* Partículas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
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

      {/* Formulario */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-2xl bg-[#F2D19E]/5 border border-[#D74B16]/20 
                   rounded-2xl p-10 backdrop-blur-xl shadow-xl 
                   hover:shadow-2xl hover:border-[#D74B16]/40 
                   transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#F2D19E] mb-8">
          Subir Nuevo Libro
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Inputs */}
          <input
            type="text"
            placeholder="Título del libro"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="bg-white/5 border border-[#D74B16]/30 rounded-xl p-3 text-white 
                       placeholder-gray-400 focus:border-[#D74B16] outline-none transition"
            required
          />

          <textarea
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="bg-white/5 border border-[#D74B16]/30 rounded-xl p-3 text-white 
                       placeholder-gray-400 focus:border-[#D74B16] outline-none transition resize-none"
            rows={4}
          />

          <input
            type="number"
            placeholder="Total de páginas"
            value={totalPaginas}
            onChange={(e) => setTotalPaginas(e.target.value)}
            className="bg-white/5 border border-[#D74B16]/30 rounded-xl p-3 text-white 
                       placeholder-gray-400 focus:border-[#D74B16] outline-none transition"
            required
          />

          <input
            type="number"
            placeholder="Nivel ID"
            value={nivelId}
            onChange={(e) => setNivelId(e.target.value)}
            className="bg-white/5 border border-[#D74B16]/30 rounded-xl p-3 text-white 
                       placeholder-gray-400 focus:border-[#D74B16] outline-none transition"
            required
          />

          <label className="text-[#F2D19E] font-medium">📄 Archivo PDF</label>
          <input
            ref={pdfRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            required
          />

          <label className="text-[#F2D19E] font-medium">
            🖼️ Portada (PNG/JPG)
          </label>
          <input
            ref={portadaRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setPortadaFile(e.target.files?.[0] || null)}
            className="text-gray-300"
            required
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-[#D74B16] hover:bg-[#F2D19E] 
                     text-black font-bold py-3 rounded-xl 
                     shadow-lg transition-all duration-300"
        >
          {loading ? "Subiendo..." : "Subir Libro"}
        </button>

        {/* Mensaje */}
        {message && (
          <p className="text-center mt-4 text-[#F2D19E]">{message}</p>
        )}
      </motion.form>
    </section>
  );
}
