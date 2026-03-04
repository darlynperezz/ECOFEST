import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter/X' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-green-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-8 h-8 text-green-300" />
              <span className="text-2xl font-bold">ECOFEST</span>
            </div>
            <p className="text-green-200 leading-relaxed text-sm">
              Soluciones ecológicas premium para empresas comprometidas con el planeta.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-green-300">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-green-200 hover:text-white transition-colors text-sm"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-green-200 hover:text-white transition-colors text-sm"
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('catalog')}
                  className="text-green-200 hover:text-white transition-colors text-sm"
                >
                  Catálogo
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('custom-orders')}
                  className="text-green-200 hover:text-white transition-colors text-sm"
                >
                  Pedidos Personalizados
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-green-300">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-green-300 flex-shrink-0" />
                <a href="mailto:ecofestdom@gmail.com" className="text-green-200 hover:text-white transition-colors text-sm">
                  ecofestdom@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-green-200 text-sm">+1 (849) 249-1951</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-green-200 text-sm">República Dominicana</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-green-300">Síguenos</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    className="p-3 bg-green-800 rounded-full hover:bg-green-700 transition-colors hover:scale-110 transform"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 pt-8 text-center">
          <p className="text-2xl font-bold text-green-300 mb-2">
            En ECOFEST, ¡la vida es buena! ¡Sigamos así!
          </p>
          <p className="text-green-200 text-sm">
            © {new Date().getFullYear()} ECOFEST. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
