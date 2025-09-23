import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white shadow-inner mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-400">
            © {currentYear} Plataforma Imobiliária. Todos os direitos reservados.
          </p>
          <div className="flex mt-4 sm:mt-0">
            <a href="#" className="px-3 text-sm text-gray-400 hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="px-3 text-sm text-gray-400 hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="px-3 text-sm text-gray-400 hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

