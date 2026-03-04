import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Sparkles, Mail, CheckCircle } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (
      !formData.company ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.productType ||
      !formData.quantity ||
      !formData.details
    ) {
      alert('Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      // Crear el cuerpo del correo
      const emailBody = `
Solicitud de Pedido Personalizado - ECOFEST DOM

================== DATOS DEL CLIENTE ==================
Nombre: ${formData.name}
Empresa: ${formData.company}
Email del Cliente: ${formData.email}
Teléfono: ${formData.phone}

================== DETALLES DEL PEDIDO ==================
Tipo de Producto: ${formData.productType}
Cantidad Estimada: ${formData.quantity}

================== ESPECIFICACIONES Y DETALLES ==================
${formData.details}

================== FIN DEL CORREO ==================
Este correo fue enviado desde el formulario de Pedidos Personalizados
      `.trim();

      // Enviar el correo usando FormSubmit
      const response = await fetch('https://formsubmit.co/ajax/semillerodarlyn@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          productType: formData.productType,
          quantity: formData.quantity,
          details: formData.details,
          _subject: `Nueva Solicitud de Pedido - ${formData.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el correo');
      }

      // Mostrar mensaje de éxito
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
      }, 4000);
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Hubo un error al enviar la solicitud. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
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
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              ¡Gracias por elegirnos!
            </h3>
            <p className="text-gray-600 text-lg">
              Estaremos en contacto con usted muy pronto.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Revisa tu correo electrónico para más información sobre tu pedido.
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
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2`}
            >
              <Mail className="w-5 h-5" />
              {loading ? 'Enviando...' : 'Enviar Solicitud por Correo'}
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
