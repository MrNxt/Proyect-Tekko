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
      className="hero-details py-20 px-4 sm:px-6 lg:px-8 mt-7"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl xl:text-6xl font-bold text-white mb-4"
        >
          Prueba nuestra App
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-400 text-lg"
        >
          Completá el formulario para participar de la primera experiencia con
          Tekko.
        </motion.p>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="mt-10 bg-gray-800 text-white rounded-xl shadow-lg px-6 py-8 flex flex-col items-center justify-center"
            >
              <motion.div
                className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"
                aria-hidden="true"
              />
              <p className="text-lg font-medium">Enviando tu solicitud...</p>
            </motion.div>
          ) : isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="mt-10 bg-green-600 text-white rounded-xl shadow-lg px-6 py-8"
            >
              <h3 className="text-2xl font-bold mb-2">
                ¡Gracias por registrarte!
              </h3>
              <p className="text-lg">
                Te contactaremos pronto para que seas parte de la prueba beta.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-left mt-10"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-white"
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
                  placeholder="Tu nombre completo"
                  className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-white"
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
                  className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="motivo"
                  className="block text-sm font-bold text-white"
                >
                  ¿Por qué querés participar?
                </label>
                <textarea
                  name="motivo"
                  id="motivo"
                  rows={3}
                  value={formData.motivo}
                  onChange={handleChange}
                  placeholder="Contanos tu interés en la app Tekko"
                  className="mt-1 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-black"
                ></textarea>
              </div>
              <div>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition"
                >
                  Enviar solicitud
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
