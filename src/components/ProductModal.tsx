import { useEffect, useState } from 'react';
import { Product } from '../types';
import { X, Mail, MessageCircle, Leaf, CheckCircle, Minus, Plus, Package, Ruler, Droplet, ShoppingCart } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

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

  if (!product) return null;

  const handleSendEmail = () => {
    if (!customerEmail || !customerWhatsApp) {
      alert('Por favor ingresa tu correo y WhatsApp para continuar');
      return;
    }

    const subject = `Solicitud de información - ${product.name}`;
    const body = `Hola,%0D%0A%0D%0AEstoy interesado en obtener información y precios para:%0D%0A%0D%0AProducto: ${product.name}%0D%0ACantidad estimada: ${quantity}%0D%0A%0D%0AMis datos de contacto:%0D%0ACorreo: ${customerEmail}%0D%0AWhatsApp: ${customerWhatsApp}%0D%0A%0D%0APor favor, envíenme más información sobre precios y disponibilidad.%0D%0A%0D%0AGracias.`;

    window.location.href = `mailto:ecofestdom@gmail.com,semillerodarlyn@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  const handleSendWhatsApp = () => {
    if (!customerEmail || !customerWhatsApp) {
      alert('Por favor ingresa tu correo y WhatsApp para continuar');
      return;
    }

    const message = `Hola, estoy interesado en obtener información y precios para:\n\nProducto: ${product.name}\nCantidad estimada: ${quantity}\n\nMis datos de contacto:\nCorreo: ${customerEmail}\nWhatsApp: ${customerWhatsApp}\n\nPor favor, envíenme más información sobre precios y disponibilidad.`;
    const whatsappUrl = `https://wa.me/18492491951?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleAddToCartClick = () => {
    if (product) {
      onAddToCart(product, quantity);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${
        showAnimation ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ transition: 'backdrop-filter 0.3s ease' }}
      ></div>

      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="relative h-96 md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg"
                >
                  {badge === '100% Natural' ? (
                    <Leaf className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-green-700 font-semibold text-sm mb-4">{product.category}</p>

            <p className="text-gray-700 leading-relaxed mb-6">{product.fullDescription}</p>

            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Especificaciones Técnicas
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <span className="text-sm text-gray-600">Material:</span>
                    <p className="font-semibold text-gray-800">{product.specifications.material}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <span className="text-sm text-gray-600">Tamaño:</span>
                    <p className="font-semibold text-gray-800">{product.specifications.size}</p>
                  </div>
                </div>
                {product.specifications.capacity && (
                  <div className="flex items-start gap-3">
                    <Droplet className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <span className="text-sm text-gray-600">Capacidad:</span>
                      <p className="font-semibold text-gray-800">{product.specifications.capacity}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <span className="text-sm text-gray-600">Uso:</span>
                    <p className="font-semibold text-gray-800">{product.specifications.use}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Solicitar Información y Precios</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ingresa tus datos de contacto para recibir información detallada sobre precios y disponibilidad.
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cantidad estimada
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 text-center text-lg font-bold border-2 border-gray-300 rounded-lg py-2"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCartClick}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">o solicita información</span>
                </div>
              </div>

              <button
                onClick={handleSendEmail}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Consultar por Correo
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="w-full bg-white border-2 border-green-600 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
