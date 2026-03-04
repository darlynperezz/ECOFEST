import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Leaf, Globe, Heart, Users, Droplet, Recycle } from 'lucide-react';

export const About = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const values = [
    {
      icon: Droplet,
      title: 'Mar Caribe',
      description: 'Protegemos nuestras aguas y ecosistemas marinos de la contaminación plástica',
    },
    {
      icon: Globe,
      title: 'Aire Puro',
      description: 'Reducimos emisiones de carbono con productos 100% biodegradables',
    },
    {
      icon: Heart,
      title: 'Educación Ambiental',
      description: 'Comprometidos con educar y concienciar sobre prácticas sostenibles',
    },
    {
      icon: Users,
      title: 'Programa PLAYA LIMPIA',
      description: 'Iniciativas activas para limpiar y preservar nuestras playas',
    },
    {
      icon: Recycle,
      title: 'Economía Circular 3R',
      description: 'Reducir, Reutilizar, Reciclar: el corazón de nuestra operación',
    },
    {
      icon: Leaf,
      title: 'Diversificación de Residuos',
      description: 'Gestión integral de residuos para minimizar impacto ambiental',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#F2E8CF' }}
    >
      <div
        className="absolute top-20 right-20 w-72 h-72 opacity-5"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400)',
          backgroundSize: 'cover',
          borderRadius: '50%',
        }}
      ></div>

      <div
        ref={elementRef}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Sobre ECOFEST
          </h2>
          <div className="w-24 h-1 bg-green-700 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Somos una empresa dedicada a crear soluciones ecológicas premium que protegen nuestro planeta sin comprometer la calidad ni la funcionalidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Nuestra Misión</h3>
            <p className="text-gray-700 leading-relaxed">
              Proveer desechables naturales de alta calidad que reemplacen completamente el plástico en la industria alimentaria y de eventos, garantizando que cada producto sea 100% biodegradable, compostable y respetuoso con el medio ambiente.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Nuestro Compromiso</h3>
            <p className="text-gray-700 leading-relaxed">
              Estamos comprometidos con la protección del Mar Caribe, la purificación del aire, la educación ambiental y la implementación de programas activos como PLAYA LIMPIA. Creemos en la economía circular y la diversificación responsable de residuos.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-green-900 text-center mb-12">
            Nuestros Valores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <Heart className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Impacto Ambiental</h3>
          </div>
          <p className="text-lg leading-relaxed">
            Cada producto ECOFEST reemplaza plástico que tardaría más de 400 años en descomponerse. Trabajamos con materiales 100% naturales que se degradan en semanas o meses. Nuestro objetivo es reducir la contaminación oceánica, preservar la biodiversidad del Caribe y crear un futuro más limpio y sostenible para las próximas generaciones.
          </p>
        </div>
      </div>
    </section>
  );
};
