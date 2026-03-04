import { useEffect, useState } from 'react';
import { MapPin, Loader, CheckCircle, AlertCircle, MapPin as MapPinIcon } from 'lucide-react';
import { Cart as CartType, User, OrderItem } from '../types';
import { orderService } from '../services/orderService';

interface CheckoutProps {
  cart: CartType;
  isOpen: boolean;
  onClose: () => void;
  onOrderSubmitted: () => void;
}

export const Checkout = ({ cart, isOpen, onClose, onOrderSubmitted }: CheckoutProps) => {
  const [step, setStep] = useState<'info' | 'delivery' | 'confirmation'>('info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [geolocation, setGeolocation] = useState<{ lat: number; lng: number } | null>(null);

  const [formData, setFormData] = useState<User>({
    email: '',
    full_name: '',
    phone: '',
    address: '',
    city: '',
  });

  const [deliveryData, setDeliveryData] = useState({
    meetingPoint: '',
    deliveryDate: '',
    notes: '',
    useGeolocation: false,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleGetLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setDeliveryData((prev) => ({ ...prev, useGeolocation: true }));
          setLoading(false);
        },
        (error) => {
          setError('No se pudo obtener la ubicación. Por favor, ingresa la dirección manualmente.');
          console.error('Geolocation error:', error);
          setLoading(false);
        }
      );
    } else {
      setError('La geolocalización no está disponible en tu navegador');
      setLoading(false);
    }
  };

  const handleInfoChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryChange = (field: string, value: string) => {
    setDeliveryData((prev) => ({ ...prev, [field]: value }));
  };

  const validateInfo = (): boolean => {
    if (!formData.email || !formData.full_name || !formData.phone || !formData.address || !formData.city) {
      setError('Por favor, completa todos los campos requeridos');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Por favor, ingresa un email válido');
      return false;
    }
    return true;
  };

  const handleNextStep = async () => {
    if (!validateInfo()) return;

    setLoading(true);
    setError('');

    try {
      const userData: User = {
        ...formData,
        latitude: geolocation?.lat,
        longitude: geolocation?.lng,
      };

      await orderService.createOrUpdateUser(userData);
      setStep('delivery');
    } catch (err) {
      setError('Error al guardar la información. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    if (!deliveryData.meetingPoint && !deliveryData.deliveryDate) {
      setError('Por favor, especifica un punto de encuentro o fecha de entrega');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await orderService.getUserByEmail(formData.email);
      if (!user?.id) {
        setError('Error al procesar el pedido. Intenta nuevamente.');
        return;
      }

      const orderItems: OrderItem[] = cart.items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        category: item.product.category,
        quantity: item.quantity,
        unitPrice: item.product.pricing.unitPrice,
      }));

      const order = await orderService.createOrder(
        user.id,
        orderItems,
        deliveryData.meetingPoint,
        deliveryData.deliveryDate,
        deliveryData.notes
      );

      if (order?.order_number) {
        setOrderNumber(order.order_number);
        setStep('confirmation');

        const message = `SOLICITUD DE COMPRA ECOFEST%0A%0A📦 Número de Pedido: ${order.order_number}%0A%0ACliente:%0ANombre: ${formData.full_name}%0AEmail: ${formData.email}%0ATeléfono: ${formData.phone}%0ADirección: ${formData.address}%0ACiudad: ${formData.city}%0A${geolocation ? `Ubicación: https://maps.google.com/?q=${geolocation.lat},${geolocation.lng}%0A` : ''}%0AProductos:%0A${orderItems.map((item) => `- ${item.productName} (${item.category}): ${item.quantity} unidades`).join('%0A')}%0A%0ADetalles de Entrega:%0A${deliveryData.meetingPoint ? `Punto de encuentro: ${deliveryData.meetingPoint}%0A` : ''}${deliveryData.deliveryDate ? `Fecha deseada: ${deliveryData.deliveryDate}%0A` : ''}${deliveryData.notes ? `Notas: ${deliveryData.notes}%0A` : ''}%0AEl vendedor se contactará pronto para confirmar.`;

        window.open(`https://wa.me/18492491951?text=${message}`, '_blank');

        setTimeout(() => {
          onOrderSubmitted();
          onClose();
        }, 2000);
      } else {
        setError('Error al crear el pedido. Intenta nuevamente.');
      }
    } catch (err) {
      setError('Error al procesar el pedido. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'info' && (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Información de Contacto</h2>
            <p className="text-gray-600 mb-6">
              Por favor, proporciona tus datos para procesar la solicitud de compra
            </p>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => handleInfoChange('full_name', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInfoChange('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInfoChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  placeholder="+1 (809) XXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInfoChange('address', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  placeholder="Calle y número"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ciudad *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInfoChange('city', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  placeholder="Tu ciudad"
                />
              </div>

              <div>
                <button
                  onClick={handleGetLocation}
                  disabled={loading}
                  className="w-full py-3 border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                >
                  <MapPinIcon className="w-5 h-5" />
                  {loading ? 'Obteniendo ubicación...' : 'Usar Geolocalización'}
                </button>
                {geolocation && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Ubicación capturada: {geolocation.lat.toFixed(4)}, {geolocation.lng.toFixed(4)}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              {loading ? 'Procesando...' : 'Siguiente: Entrega'}
            </button>
          </div>
        )}

        {step === 'delivery' && (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Detalles de Entrega</h2>
            <p className="text-gray-600 mb-6">
              Especifica cómo prefieres recibir tu pedido
            </p>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Punto de Encuentro o Dirección de Entrega
                </label>
                <input
                  type="text"
                  value={deliveryData.meetingPoint}
                  onChange={(e) => handleDeliveryChange('meetingPoint', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  placeholder="Ej: Frente a Parque Central, Oficina en Avenida Principal"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha Deseada de Entrega
                </label>
                <input
                  type="date"
                  value={deliveryData.deliveryDate}
                  onChange={(e) => handleDeliveryChange('deliveryDate', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notas Adicionales
                </label>
                <textarea
                  value={deliveryData.notes}
                  onChange={(e) => handleDeliveryChange('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none resize-none"
                  placeholder="Instrucciones especiales, horarios preferidos, etc."
                ></textarea>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm text-blue-700">
                  <strong>Nota importante:</strong> Este es un formulario de solicitud de compra. El vendedor se pondrá en contacto contigo para confirmar disponibilidad, precios finales y detalles de entrega.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('info')}
                className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                Atrás
              </button>
              <button
                onClick={handleSubmitOrder}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all"
              >
                {loading ? 'Enviando...' : 'Enviar Solicitud de Compra'}
              </button>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Solicitud Enviada!</h2>
            <p className="text-gray-600 mb-4">
              Tu número de pedido es: <span className="font-bold text-green-700">{orderNumber}</span>
            </p>
            <p className="text-gray-600 mb-6">
              Nos pondremos en contacto contigo pronto por WhatsApp o correo para confirmar disponibilidad, precios finales y detalles de entrega.
            </p>
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-6">
              <p className="text-sm text-green-700">
                También hemos enviado un mensaje a nuestro equipo de ventas. Esperamos tu confirmación en los próximos 24-48 horas.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
