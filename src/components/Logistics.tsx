import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Truck, DollarSign, Clock, Package } from 'lucide-react';

export const Logistics = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const logisticsFeatures = [
    {
      icon: Package,
      title: 'Suministro Anual',
      description: 'Contratos anuales con entregas programadas para asegurar tu inventario',
      highlight: 'Disponibilidad garantizada',
    },
    {
      icon: DollarSign,
      title: 'Descuentos por Contenedor',
      description: 'Precios especiales al ordenar contenedores completos',
      highlight: 'Hasta 30% de descuento',
    },
    {
      icon: Clock,
      title: 'Entrega 4-6 Semanas',
      description: 'Tiempo estimado de entrega desde la confirmación del pedido',
      highlight: 'Tracking incluido',
    },
    {
      icon: Truck,
      title: 'Logística Internacional',
      description: 'Coordinamos el envío puerta a puerta a cualquier destino del Caribe',
      highlight: 'Servicio completo',
    },
  ];

  return (
    <section
      id="logistics"
      className="py-20 px-4 bg-white relative overflow-hidden"
    >
      <div
        className="absolute top-20 left-20 w-40 h-40 opacity-5"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400)',
          backgroundSize: 'cover',
        }}
      ></div>

      <div
        ref={elementRef}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Logística y Envíos
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Facilitamos el proceso de importación con soluciones logísticas completas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {logisticsFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-green-100"
              >
                <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {feature.highlight}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              ¿Necesitas información sobre envíos?
            </h3>
            <p className="text-green-100 text-lg mb-8">
              Nuestro equipo de logística te ayudará a planificar tus importaciones
              y optimizar costos de envío.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  '¡Hola! Me gustaría obtener más información sobre la logística y envíos de productos ECOFEST.'
                );
                window.open(`https://wa.me/18095551234?text=${message}`, '_blank');
              }}
              className="bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Contactar Equipo de Logística
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
