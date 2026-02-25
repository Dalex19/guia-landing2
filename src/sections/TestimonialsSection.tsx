import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StarIcon } from '../components/icons/FeatureIcons';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Por fin una app que respeta la tradición y acompaña mi día. La homilía con IA es profunda y accesible.',
    name: 'María',
    age: '34',
    avatar: '/images/avatar-01.jpg',
    rating: 5
  },
  {
    quote: 'El Rosario guiado me ayuda a concentrarme. El audio es calmado y la experiencia es verdaderamente espiritual.',
    name: 'Carlos',
    age: '41',
    avatar: '/images/avatar-02.jpg',
    rating: 5
  },
  {
    quote: 'La homilía con IA es clara y profunda. Me ha ayudado a entender mejor el Evangelio cada día.',
    name: 'Ana',
    age: '29',
    avatar: '/images/avatar-03.jpg',
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
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

      // Cards stagger animation with parallax
      const cardElements = cards.querySelectorAll('.testimonial-card');
      cardElements.forEach((card) => {
        // Entrance animation
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true
            }
          }
        );

        // Subtle parallax
        gsap.fromTo(card,
          { y: 0 },
          {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
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
      id="testimonials"
      className="relative bg-terracotta py-24 lg:py-32 z-50"
    >
      <div className="px-6 lg:px-[8vw] max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-serif text-parchment text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Lo que dicen nuestras guías
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card bg-parchment rounded-4xl p-8 transition-all duration-300 hover:shadow-xl"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-wheat" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-sans text-espresso leading-relaxed mb-8 text-lg">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-serif text-espresso font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="font-sans text-taupe text-sm">
                    {testimonial.age} años
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
