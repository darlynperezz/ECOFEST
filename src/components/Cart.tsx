import { useEffect, useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Mail, ShoppingBag, ArrowRight } from 'lucide-react';
import { Cart as CartType } from '../types';

interface CartProps {
  cart: CartType;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onGenerateQuote: () => string;
  onCheckout?: () => void;
}

export const Cart = ({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGenerateQuote,
  onCheckout,
}: CartProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email' | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
      document.body.style.overflow = 'hidden';
    } else {
      setShowAnimation(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleRequestContact = (method: 'whatsapp' | 'email') => {
    setContactMethod(method);
    setShowContactForm(true);
  };

  const handleSendRequest = () => {
    if (!customerEmail || !customerWhatsApp) {
      alert('Por favor ingresa tu correo y WhatsApp para continuar');
      return;
    }

    const items = cart.items
      .map((item) => `${item.product.name} - Cantidad: ${item.quantity}`)
      .join(contactMethod === 'email' ? '%0D%0A' : '\n');

    if (contactMethod === 'whatsapp') {
      const message = `Hola, estoy interesado en obtener información y precios para los siguientes productos:\n\n${items}\n\nMis datos de contacto:\nCorreo: ${customerEmail}\nWhatsApp: ${customerWhatsApp}\n\nPor favor, envíenme más información sobre precios y disponibilidad.`;
      window.open(`https://wa.me/18492491951?text=${encodeURIComponent(message)}`, '_blank');
    } else if (contactMethod === 'email') {
      const subject = 'Solicitud de información - Productos ECOFEST';
      const body = `Hola,%0D%0A%0D%0AEstoy interesado en obtener información y precios para los siguientes productos:%0D%0A%0D%0A${items}%0D%0A%0D%0AMis datos de contacto:%0D%0ACorreo: ${customerEmail}%0D%0AWhatsApp: ${customerWhatsApp}%0D%0A%0D%0APor favor, envíenme más información sobre precios y disponibilidad.%0D%0A%0D%0AGracias.`;
      window.location.href = `mailto:ecofestdom@gmail.com,semillerodarlyn@gmail.com?subject=${subject}&body=${body}`;
    }

    setShowContactForm(false);
    setCustomerEmail('');
    setCustomerWhatsApp('');
    setContactMethod(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        showAnimation ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-500 overflow-y-auto ${
          showAnimation ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-green-700 text-white p-6 shadow-lg z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Tu Carrito</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-green-600 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-green-100 text-sm mt-2">
            {cart.totalItems} {cart.totalItems === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        <div className="p-6">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-gray-500 text-sm">
                Agrega productos desde nuestro catálogo
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {item.product.category}
                        </p>
                        <p className="text-sm text-green-700 font-semibold">
                          {item.product.pricing.unitPrice.split(' ')[0]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 p-1 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-700" />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 p-1 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {!showContactForm ? (
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <button
                    onClick={() => handleRequestContact('whatsapp')}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Consultar por WhatsApp
                  </button>

                  <button
                    onClick={() => handleRequestContact('email')}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Consultar por Correo
                  </button>

                  <button
                    onClick={onClearCart}
                    className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Vaciar carrito
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-blue-50 rounded-xl p-6 mb-4 border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">Información de Contacto</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Ingresa tus datos para que podamos enviarte la información sobre precios y disponibilidad.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tu correo electrónico
                        </label>
                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="ejemplo@correo.com"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tu número de WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={customerWhatsApp}
                          onChange={(e) => setCustomerWhatsApp(e.target.value)}
                          placeholder="+1 809-123-4567"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleSendRequest}
                      className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                    >
                      {contactMethod === 'whatsapp' ? (
                        <>
                          <MessageCircle className="w-5 h-5" />
                          Enviar por WhatsApp
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Enviar por Correo
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowContactForm(false)}
                      className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 bg-green-50 rounded-xl p-4">
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  Ingresa tus datos de contacto para recibir información detallada sobre precios y disponibilidad.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
