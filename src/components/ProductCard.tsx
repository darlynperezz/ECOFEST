import { Product } from '../types';
import { Eye, Leaf, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ProductCardProps {
  product: Product;
  onViewMore: (product: Product) => void;
}

export const ProductCard = ({ product, onViewMore }: ProductCardProps) => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div
      ref={elementRef}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badges.map((badge, index) => (
            <div
              key={index}
              className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
            >
              {badge === '100% Natural' ? (
                <Leaf className="w-3 h-3" />
              ) : (
                <CheckCircle className="w-3 h-3" />
              )}
              {badge}
            </div>
          ))}
        </div>

        <button
          onClick={() => onViewMore(product)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-green-700 shadow-xl"
        >
          <Eye className="w-4 h-4" />
          Ver más
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {product.shortDescription}
        </p>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-700">Material:</span> {product.specifications.material.split(' ').slice(0, 3).join(' ')}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-semibold text-gray-700">Tamaño:</span> {product.specifications.size}
          </p>
        </div>
      </div>
    </div>
  );
};
