import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookIcon, RosaryIcon, PrayerIcon, ChevronRight } from '../components/icons/FeatureIcons';
import { Cloud2 } from '../components/icons/CloudShapes';

gsap.registerPlugin(ScrollTrigger);

const features = [
   {
    icon: RosaryIcon,
    title: 'Rosario guiado',
    description: 'Reza con audio calmado que acompaña cada misterio. Una experiencia inmersiva y espiritual.',
    color: 'bg-wheat/20',
    screen: '/images/app-screen-3.png'
  },
  {
    icon: BookIcon,
    title: 'Letanías',
    description: 'Reza las letanías tradicionales con una lectura clara y pausada. Ideal para acompañar tu momento de oración.',
    color: 'bg-terracotta/10',
    screen: '/images/app-screen-7.jpeg'
  },
 
  {
    icon: PrayerIcon,
    title: 'Rosario interactivo',
    description: 'Vive el rosario de manera única: escucha la oración con una imagen inspiradora, sigue un modo interactivo donde el rosario se construye paso a paso, o reza acompañado de un hermoso video.',
    color: 'bg-terracotta/10',
    screen: '/images/app-screen-6.jpeg'
  }
];

const FeaturesSection: React.FC = () => {
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

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.feature-card');
      cardElements.forEach((card) => {
        gsap.fromTo(card,
          { y: 60, scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
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
      });

      // Cloud drift animation
      const clouds = section.querySelectorAll('.cloud-drift');
      clouds.forEach((cloud) => {
        gsap.fromTo(cloud,
          { y: 0 },
          {
            y: -20,
            duration: 1,
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
      id="features"
      className="relative bg-parchment py-24 lg:py-32 z-30 overflow-hidden"
    >
      {/* Background clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cloud-drift absolute top-[10%] left-[5%] text-terracotta/5">
          <Cloud2 className="w-56 h-28" />
        </div>
        <div className="cloud-drift absolute bottom-[15%] right-[10%] text-terracotta/5">
          <Cloud2 className="w-40 h-20" />
        </div>
      </div>

      <div className="relative z-10 px-6 lg:px-[8vw] max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="label-mono text-taupe block mb-4">
            CARACTERÍSTICAS
          </span>
          <h2 className="font-serif text-espresso text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mx-auto">
            Todo lo que necesitas para crecer en fe
          </h2>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group bg-white rounded-4xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Phone Mockup */}
              <div className="relative h-48 lg:h-56 bg-gradient-to-b from-terracotta/5 to-transparent flex items-center justify-center p-4">
                <div className="relative w-[100px] h-[200px] lg:w-[120px] lg:h-[240px] mt-8">
                  <div className="absolute inset-0 bg-espresso rounded-[20px] p-1 shadow-lg">
                    <div className="w-full h-full bg-black rounded-[14px] overflow-hidden relative">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-black rounded-b-md z-10" />
                      {/* App Screen */}
                      <img 
                        src={feature.screen} 
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <feature.icon className="w-6 h-6 text-terracotta" strokeWidth={1.5} />
                </div>

                <h3 className="font-serif text-espresso text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-taupe leading-relaxed mb-4 text-sm">
                  {feature.description}
                </p>

                {/* Link */}
                <button className="flex items-center gap-2 font-sans text-sm font-medium text-terracotta group/link">
                  Saber más
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
