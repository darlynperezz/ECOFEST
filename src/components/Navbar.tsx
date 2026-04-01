import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Leaf, Instagram, Facebook, Mail } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Navbar = ({ cartItemCount, onCartClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Nosotros', id: 'about' },
    { label: 'Catálogo', id: 'catalog' },
    { label: 'Pedidos', id: 'custom-orders' },
  ];

  const socialLinks = [
    { icon: Instagram, url: 'https://www.instagram.com/ecofestdom2026/', title: 'Instagram' },
    { icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61576546331624', title: 'Facebook' },
    { icon: Mail, url: '#custom-orders', title: 'Pedidos personalizados', sectionId: 'custom-orders' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Leaf className={`w-8 h-8 transition-colors ${scrolled ? 'text-green-700' : 'text-white'}`} />
            <span className={`text-2xl font-bold transition-colors ${scrolled ? 'text-green-800' : 'text-white'}`}>
              ECOFEST
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors hover:text-green-600 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                const isExternal = link.url.startsWith('http');
                return (
                  <a
                    key={link.title}
                    href={link.url}
                    title={link.title}
                    onClick={(e) => {
                      if (link.sectionId) {
                        e.preventDefault();
                        scrollToSection(link.sectionId);
                      }
                    }}
                    className={`p-2 rounded-full transition-all hover:scale-110 ${
                      scrolled
                        ? 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                        : 'text-white/70 hover:text-white'
                    }`}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full bg-green-600 text-white"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
