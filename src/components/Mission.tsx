import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Waves, Wind, GraduationCap, Recycle, Trash2 } from 'lucide-react';

export const Mission = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const missionPoints = [
    {
      icon: Waves,
      title: 'Mar Caribe',
      description: 'Protegemos nuestras aguas cristalinas reduciendo la contaminación por plásticos',
    },
    {
      icon: Wind,
      title: 'Aire Puro',
      description: 'Productos naturales que no generan emisiones tóxicas al descomponerse',
    },
    {
      icon: GraduationCap,
      title: 'Educación Ambiental',
      description: 'Promovemos la conciencia ecológica en comunidades y empresas',
    },
    {
      icon: Recycle,
      title: 'Filosofía 3R',
      description: 'Reducir, Reutilizar, Reciclar: nuestro compromiso con el planeta',
    },
    {
      icon: Trash2,
      title: 'Diversificación de Residuos',
      description: 'Gestión inteligente de residuos orgánicos y compostables',
    },
  ];

  return (
    <section
      id="mission"
      className="py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#F5F1E8' }}
    >

      <div
        ref={elementRef}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Nuestra Misión
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            En ECOFEST, nos comprometemos a proteger la Madre Tierra a través de soluciones
            sostenibles que benefician a nuestro Mar Caribe, el aire que respiramos, y las
            futuras generaciones.
          </p>
          <div className="mt-8 inline-block bg-green-700 text-white px-8 py-3 rounded-full font-bold text-lg">
            PLAYA LIMPIA
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">{point.title}</h3>
                <p className="text-gray-600 leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
