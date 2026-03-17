import { Leaf } from 'lucide-react';

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-green-50/20 to-white/30"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center mb-8 animate-bounce">
          <Leaf className="w-16 h-16 text-green-300" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-green-900 mb-6 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          Desechables Naturales que protegen la Madre Tierra
        </h1>

        <p className="text-xl md:text-2xl text-green-800 mb-8 font-light" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Artículos estándar y pedidos personalizados
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold text-lg hover:bg-green-700 transform hover:scale-105 transition-all shadow-2xl"
          >
            Explorar Catálogo
          </button>
          <button
            onClick={() => document.getElementById('custom-orders')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white/30 transform hover:scale-105 transition-all"
          >
            Pedidos Personalizados
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-green-900">
          <div className="bg-white/60 backdrop-blur-md rounded-lg p-4 border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700">100%</div>
            <div className="text-sm mt-1">Natural</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-lg p-4 border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700">0%</div>
            <div className="text-sm mt-1">Plástico</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-lg p-4 border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700">4-6</div>
            <div className="text-sm mt-1">Semanas Entrega</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-lg p-4 border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700">B2B</div>
            <div className="text-sm mt-1">Mayorista</div>
          </div>
        </div>
      </div>
    </section>
  );
};
