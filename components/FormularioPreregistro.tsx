'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FormData, ApiResponse, MessageType } from '@/app/types/preregistro';

const FormularioPreregistro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    descripcion: ''
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>('');
  const [tipoMensaje, setTipoMensaje] = useState<MessageType>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      setTipoMensaje('error');
      setMensaje('El nombre es requerido');
      return false;
    }
    
    if (!formData.correo.trim()) {
      setTipoMensaje('error');
      setMensaje('El correo es requerido');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      setTipoMensaje('error');
      setMensaje('Formato de email inválido');
      return false;
    }
    
    if (!formData.descripcion.trim()) {
      setTipoMensaje('error');
      setMensaje('La descripción es requerida');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMensaje('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/preregistro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setTipoMensaje('success');
        setMensaje('¡Gracias por tu preregistro! Hemos guardado tu información.');
        setFormData({ nombre: '', correo: '', descripcion: '' });
      } else {
        setTipoMensaje('error');
        setMensaje(data.message || 'Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', String(error));
      setTipoMensaje('error');
      setMensaje('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-xl mx-auto px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Preregistro para nuestra App</h2>
          <p className="text-gray-600">Sé uno de los primeros en conocer nuestra aplicación. Déjanos tus datos y te contactaremos pronto.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-5">
            <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Tu nombre completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="correo" className="block text-gray-700 font-medium mb-2">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="tu@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="descripcion" className="block text-gray-700 font-medium mb-2">
              ¿Qué te parece el proyecto? *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows={4}
              disabled={isLoading}
              placeholder="Cuéntanos qué opinas sobre el proyecto, qué esperas de la app, sugerencias, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 resize-none"
            />
          </div>

          {mensaje && (
            <div
              className={`mb-4 p-3 rounded ${
                tipoMensaje === 'success'
                  ? 'bg-green-100 text-green-800'
                  : tipoMensaje === 'error'
                  ? 'bg-red-100 text-red-800'
                  : ''
              }`}
              role="alert"
            >
              {mensaje}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? 'Enviando...' : 'Enviar Preregistro'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormularioPreregistro;