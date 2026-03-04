import { useState, useEffect } from 'react';
import { Cart, CartItem, Product } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({ items: [], totalItems: 0 });

  useEffect(() => {
    const savedCart = localStorage.getItem('ecofest-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart: Cart) => {
    setCart(newCart);
    localStorage.setItem('ecofest-cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number) => {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.id === product.id
    );

    let newItems: CartItem[];
    if (existingItemIndex > -1) {
      newItems = [...cart.items];
      newItems[existingItemIndex].quantity += quantity;
    } else {
      newItems = [...cart.items, { product, quantity }];
    }

    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    saveCart({ items: newItems, totalItems });
  };

  const removeFromCart = (productId: string) => {
    const newItems = cart.items.filter((item) => item.product.id !== productId);
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    saveCart({ items: newItems, totalItems });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const newItems = cart.items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
    saveCart({ items: newItems, totalItems });
  };

  const clearCart = () => {
    saveCart({ items: [], totalItems: 0 });
  };

  const generateQuoteMessage = () => {
    let message = '¡Hola! Me gustaría solicitar una cotización para:\n\n';
    cart.items.forEach((item) => {
      message += `• ${item.product.name} - Cantidad: ${item.quantity}\n`;
    });
    message += '\n¿Podrían enviarme información sobre precios y disponibilidad?';
    return encodeURIComponent(message);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    generateQuoteMessage,
  };
};
