"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { getCookie } from "@/hooks/getCookies";
import { UploadButton } from "@/hooks/uploadthing";
import { useUploadThing } from "@/hooks/uploadthingClient";
import Image from "next/image";

export default function AdminUploadBook() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [totalPaginas, setTotalPaginas] = useState("");
  const [nivelId, setNivelId] = useState("");
  const pdfRef = useRef<HTMLInputElement | null>(null);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [portadaUrl, setPortadaUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { startUpload } = useUploadThing("portadaUploader");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getCookie("admin_token");

    if (!token) {
      setMessage("Sesión expirada. Volvé a iniciar sesión.");
      return;
    }

    if (!pdfFile || portadaUrl == "") {
      setMessage("Debes seleccionar PDF y portada");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("totalPaginas", totalPaginas);
    formData.append("nivelId", nivelId);
    formData.append("pdf", pdfFile);
    formData.append("portadaFileLink", portadaUrl);

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
        setPortadaUrl("");
        if (pdfRef.current) pdfRef.current.value = "";
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

          {/* Portada */}
          <label className="text-[#F2D19E] font-medium">
            🖼️ Portada (PNG/JPG)
          </label>

          <div className="flex flex-col gap-4">
            {/* Preview */}
            {portadaUrl && (
              <div className="w-full flex justify-center">
                <Image
                  src={portadaUrl}
                  alt="Preview portada"
                  width={180}
                  height={260}
                  className="object-cover rounded-xl border border-[#D74B16]/40 shadow-md"
                />
              </div>
            )}

            {/* Dropzone-like button */}
            <div
              onClick={() =>
                document.getElementById("uploadthing-input")?.click()
              }
              className="border-2 border-dashed border-[#D74B16]/40 hover:border-[#D74B16] 
              rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center 
              text-[#F2D19E] transition-all duration-300 hover:bg-[#D74B16]/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 16l4-4 4 4 4-4 4 4M4 4h16v12H4z"
                />
              </svg>

              <p className="font-semibold text-lg">
                {uploading ? "Subiendo imagen..." : "Seleccionar portada"}
              </p>
              <p className="text-sm text-[#F2D19E]/60 mt-1">
                PNG, JPG — máximo recomendado 5MB
              </p>
            </div>

            {/* Hidden input */}
            <input
              id="uploadthing-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploading(true);
                try {
                  const uploaded = await startUpload([file]);
                  if (uploaded && uploaded[0]?.ufsUrl) {
                    setPortadaUrl(uploaded[0].ufsUrl);
                  }
                } finally {
                  setUploading(false);
                }
              }}
            />
          </div>
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
