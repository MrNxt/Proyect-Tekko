"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BetaSignUp() {
  const [formData, setFormData] = useState({ name: "", email: "", motivo: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setTimeout(() => {
          setIsLoading(false);
          setIsSubmitted(true);
          setFormData({ name: "", email: "", motivo: "" });
        }, 1000);
      } else {
        setIsLoading(false);
        alert("Hubo un error. Intentá de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setIsLoading(false);
    }
  };

  return (
    <section
      id="beta-signup"
      className="py-16 px-4 sm:px-6 lg:px-8 mt-7"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white mb-3"
        >
          Queremos tu opinión
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300 text-base md:text-lg"
        >
          Ayudanos a mejorar Tekko. Contanos qué te gusta, qué crees que podemos mejorar o qué funcionalidades te gustaría que agreguemos.
        </motion.p>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mt-8 bg-gray-800 bg-opacity-80 text-white rounded-2xl shadow-lg px-6 py-6 flex flex-col items-center justify-center"
            >
              <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-base font-medium">Enviando tu sugerencia...</p>
            </motion.div>
          ) : isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mt-8 bg-green-600 text-white rounded-2xl shadow-lg px-6 py-6"
            >
              <h3 className="text-xl font-bold mb-1">¡Gracias por tu aporte!</h3>
              <p className="text-base">
                Nos pondremos en contacto para conocer más sobre tus ideas.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-left mt-8  rounded-2xl p-6 shadow-lg"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-orange-400 focus:border-orange-400 text-black text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tucorreo@ejemplo.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-orange-400 focus:border-orange-400 text-black text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="motivo"
                  className="block text-sm font-semibold text-white"
                >
                  Tu sugerencia o idea
                </label>
                <textarea
                  name="motivo"
                  id="motivo"
                  rows={3}
                  value={formData.motivo}
                  onChange={handleChange}
                  placeholder="Contanos qué funcionalidad o mejora te gustaría ver en Tekko"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-orange-400 focus:border-orange-400 text-black text-sm"
                />
              </div>
              <div>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition text-sm"
                >
                  Enviar
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
