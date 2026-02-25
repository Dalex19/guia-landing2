import React, { useState, useEffect } from 'react';
import { MenuIcon, CloseIcon } from './icons/FeatureIcons';

interface NavigationProps {
  isHero?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isHero = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Características', id: 'features' },
    { label: 'Testimonios', id: 'testimonials' },
    { label: 'Precios', id: 'pricing' },
  ];

  const textColor = isHero && !isScrolled ? 'text-parchment' : 'text-espresso';
  const bgColor = isScrolled ? 'bg-parchment/95 backdrop-blur-md shadow-sm' : 'bg-transparent';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgColor}`}
      >
        <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`font-serif text-2xl font-semibold ${textColor} transition-colors duration-300 hover:opacity-80`}
          >
            guía<span className="italic"> tu</span> fe.
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-sans text-sm font-medium ${textColor} transition-all duration-300 hover:opacity-70 relative group`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isHero && !isScrolled ? 'bg-parchment' : 'bg-terracotta'} transition-all duration-300 group-hover:w-full`} />
              </button>
            ))}
            <button 
              className="btn-primary text-sm py-3 px-6"
              onClick={() => scrollToSection('pricing')}
            >
              Descargar la app
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${textColor} transition-colors duration-300`}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-terracotta transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-serif text-3xl text-parchment hover:text-wheat transition-colors duration-300"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${index * 100}ms`
              }}
            >
              {link.label}
            </button>
          ))}
          <button 
            className="btn-primary mt-8"
            onClick={() => scrollToSection('pricing')}
          >
            Descargar la app
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
