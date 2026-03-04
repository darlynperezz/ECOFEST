import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Sparkles, Send, CheckCircle } from 'lucide-react';

export const CustomOrders = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    productType: '',
    quantity: '',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          companyName: formData.company,
          productType: formData.productType,
          quantity: parseInt(formData.quantity) || 0,
          customizations: formData.details,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({
            company: '',
            name: '',
            email: '',
            phone: '',
            productType: '',
            quantity: '',
            details: '',
          });
          setSubmitted(false);
        }, 3000);
      } else {
        console.error('Error al enviar solicitud');
        alert('Hubo un error al enviar la solicitud. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar la solicitud. Por favor intenta de nuevo.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="custom-orders"
      className="py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#F5F1E8' }}
    >
      <div
        className="absolute bottom-10 right-10 w-56 h-56 opacity-20"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400)',
          backgroundSize: 'cover',
        }}
      ></div>

      <div
        ref={elementRef}
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Pedidos Personalizados
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            ¿Necesitas productos con tu logo o diseños específicos? Creamos soluciones
            a medida para tu marca.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl p-12 shadow-2xl text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              ¡Solicitud Enviada!
            </h3>
            <p className="text-gray-600">
              Nos pondremos en contacto contigo pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors"
                  placeholder="+1 (809) XXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Producto *
                </label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Birchwood">Cubiertos de Birchwood</option>
                  <option value="Caña de Azúcar">Platos/Bowls de Caña de Azúcar</option>
                  <option value="Hojas de Palma">Productos de Hojas de Palma</option>
                  <option value="Biocups">Biocups y Tapas</option>
                  <option value="Personalizado">Diseño Personalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cantidad Estimada *
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors"
                  placeholder="Ej: 10,000 unidades"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detalles del Pedido *
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors resize-none"
                placeholder="Describe tu proyecto: ¿Necesitas impresión de logo? ¿Colores específicos? ¿Fecha de entrega deseada?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar Solicitud
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              * Todos los campos son obligatorios
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
