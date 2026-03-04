import { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface CatalogProps {
  onProductClick: (product: Product) => void;
}

export const Catalog = ({ onProductClick }: CatalogProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('Birchwood');
  const { elementRef, isVisible } = useScrollAnimation();

  const categories = ['Birchwood', 'Caña de Azúcar', 'Hojas de Palma', 'Biocups'];

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <section
      id="catalog"
      className="py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#F5F1E8' }}
    >
      <div
        className="absolute bottom-10 left-10 w-48 h-48 opacity-20 transform rotate-45"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400)',
          backgroundSize: 'cover',
        }}
      ></div>

      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Nuestro Catálogo
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Productos 100% naturales y biodegradables para tu negocio
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-green-700 text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ProductCard
                product={product}
                onViewMore={onProductClick}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No hay productos disponibles en esta categoría.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
