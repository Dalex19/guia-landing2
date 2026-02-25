import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Gratis',
    price: null,
    description: 'Empieza tu camino de fe hoy mismo.',
    features: [
      'Evangelio del día',
      'Rosario básico',
      '1 oración diaria',
      'Reflexiones semanales'
    ],
    cta: 'Descargar',
    highlighted: false
  },
  {
    name: 'Premium',
    price: '€4.99',
    period: '/mes',
    description: 'Desbloquea todo el potencial de GUÍA.',
    features: [
      'Todo el contenido gratuito',
      'Audio guía completo',
      'Modo offline',
      'Sin distracciones',
      'Homilías extendidas',
      'Contenido exclusivo'
    ],
    cta: 'Prueba 7 días gratis',
    highlighted: true
  }
];

// Check icon component
const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true
          }
        }
      );

      // Cards animation
      const cardElements = cards.querySelectorAll('.pricing-card');
      cardElements.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: index === 1 ? 0.98 : 1 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="pricing"
      className="relative bg-parchment py-24 lg:py-32 z-[70]"
    >
      <div className="px-6 lg:px-[8vw] max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-serif text-espresso text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
            Elige tu camino
          </h2>
          <p className="font-sans text-taupe text-lg max-w-xl mx-auto">
            Empieza gratis. Cuando quieras, desbloquea todo.
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`pricing-card rounded-4xl p-8 lg:p-10 transition-all duration-300 hover:shadow-xl ${
                plan.highlighted 
                  ? 'bg-terracotta text-parchment' 
                  : 'bg-white border-2 border-terracotta/10 text-espresso'
              }`}
            >
              {/* Plan Name */}
              <h3 className={`font-serif text-2xl font-semibold mb-2 ${
                plan.highlighted ? 'text-parchment' : 'text-espresso'
              }`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                {plan.price ? (
                  <div className="flex items-baseline gap-1">
                    <span className={`font-serif text-4xl font-bold ${
                      plan.highlighted ? 'text-wheat' : 'text-terracotta'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${
                      plan.highlighted ? 'text-parchment/70' : 'text-taupe'
                    }`}>
                      {plan.period}
                    </span>
                  </div>
                ) : (
                  <span className={`font-serif text-4xl font-bold ${
                    plan.highlighted ? 'text-wheat' : 'text-terracotta'
                  }`}>
                    Gratis
                  </span>
                )}
              </div>

              {/* Description */}
              <p className={`mb-8 ${
                plan.highlighted ? 'text-parchment/80' : 'text-taupe'
              }`}>
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'text-wheat' : 'text-terracotta'
                    }`} />
                    <span className={`text-sm ${
                      plan.highlighted ? 'text-parchment/90' : 'text-taupe'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-4 rounded-full font-sans font-medium transition-all duration-300 ${
                plan.highlighted 
                  ? 'bg-wheat text-espresso hover:shadow-lg hover:scale-[1.02]' 
                  : 'bg-terracotta text-parchment hover:shadow-lg hover:scale-[1.02]'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
