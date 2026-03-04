import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Benefits } from './components/Benefits';
import { Catalog } from './components/Catalog';
import { ProductModal } from './components/ProductModal';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { CustomOrders } from './components/CustomOrders';
import { Footer } from './components/Footer';
import { Product } from './types';
import { useCart } from './hooks/useCart';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, generateQuoteMessage } = useCart();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F1E8' }}>
      <Navbar cartItemCount={cart.totalItems} onCartClick={() => setIsCartOpen(true)} />

      <Hero />
      <Benefits />
      <About />
      <Catalog onProductClick={handleProductClick} />
      <CustomOrders />
      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onGenerateQuote={generateQuoteMessage}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Checkout
        cart={cart}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSubmitted={() => {
          clearCart();
        }}
      />
    </div>
  );
}

export default App;
