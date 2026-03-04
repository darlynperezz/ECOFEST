import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Leaf, Trash2, Truck } from 'lucide-react';

export const Benefits = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const benefits = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'Productos fabricados con materiales completamente naturales y sin químicos sintéticos',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      icon: Trash2,
      title: 'Cero Plástico',
      description: 'Totalmente biodegradables y compostables en semanas, no en siglos',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      icon: Truck,
      title: '4–6 Semanas de Entrega',
      description: 'Desde tu primer contacto hasta tu puerta, con envíos sostenibles',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <section
      id="benefits"
      className="py-16 px-4"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div
        ref={elementRef}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${benefit.color}`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6 mx-auto">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{benefit.title}</h3>
                <p className="text-center text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
