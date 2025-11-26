"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/loginAdmin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(data.message || "Credenciales incorrectas");
        return;
      }

      document.cookie = `admin_token=${data.data.token}; path=/; max-age=86400`;

      router.push("/admin/biblioteca");
    } catch (e) {
      setMessage("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(180deg, #3d2f1f 0%, #2a1f15 50%, #1a1410 100%)",
      }}
    >
      <div
        className="w-full max-w-md bg-[#F2D19E]/10 border border-[#D74B16]/30 
                   backdrop-blur-xl rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-[#F2D19E] mb-6">
          Acceso Administrador
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            className="bg-white/5 border border-[#D74B16]/30 rounded-xl p-3 
                       text-white placeholder-gray-400 focus:border-[#D74B16] 
                       outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="bg-white/5 border border-[#D74B16]/30 rounded-xl p-3 
                       text-white placeholder-gray-400 focus:border-[#D74B16] 
                       outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D74B16] hover:bg-[#F2D19E] text-black 
                       font-bold py-3 rounded-xl shadow-lg transition-all"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-[#F2D19E]">{message}</p>
        )}
      </div>
    </section>
  );
}
