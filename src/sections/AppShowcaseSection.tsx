import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const screens = [
  { src: '/images/app-screen-1.png', alt: 'Pantalla de inicio' },
  { src: '/images/app-screen-2.png', alt: 'Bienvenida' },
  { src: '/images/app-screen-3.png', alt: 'Rosario' },
  { src: '/images/app-screen-4.png', alt: 'Home' },
  { src: '/images/app-screen-5.png', alt: 'Evangelio' },
];

const AppShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const gallery = galleryRef.current;

    if (!section || !header || !gallery) return;

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

      // Phone gallery stagger animation
      const phoneElements = gallery.querySelectorAll('.showcase-phone');
      phoneElements.forEach((phone, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        gsap.fromTo(phone,
          { y: 80, rotateY: direction * 20, opacity: 0 },
          {
            y: 0,
            rotateY: direction * 5,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: phone,
              start: 'top 90%',
              end: 'top 50%',
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
      className="relative bg-terracotta py-24 lg:py-32 z-[25] overflow-hidden"
    >
      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="relative z-10 px-6 lg:px-[8vw]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="label-mono text-parchment/70 block mb-4">
            LA APP
          </span>
          <h2 className="font-serif text-parchment text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mx-auto">
            Diseñada para acompañar tu camino de fe
          </h2>
        </div>

        {/* Phone Gallery */}
        <div 
          ref={galleryRef}
          className="flex items-end justify-center gap-4 lg:gap-8 flex-wrap lg:flex-nowrap"
          style={{ perspective: '1500px' }}
        >
          {screens.map((screen, index) => (
            <div 
              key={index}
              className={`showcase-phone relative ${
                index === 2 ? 'w-[160px] h-[320px] lg:w-[220px] lg:h-[440px] z-10' 
                : 'w-[130px] h-[260px] lg:w-[180px] lg:h-[360px] opacity-80'
              }`}
              style={{ 
                transformStyle: 'preserve-3d',
                marginTop: index === 1 || index === 3 ? '2rem' : '0'
              }}
            >
              <div className={`absolute inset-0 bg-espresso rounded-[24px] lg:rounded-[32px] p-1.5 lg:p-2 shadow-2xl ${
                index === 2 ? 'ring-4 ring-wheat/30' : ''
              }`}>
                <div className="w-full h-full bg-black rounded-[18px] lg:rounded-[24px] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 lg:w-20 h-3.5 lg:h-4 bg-black rounded-b-lg z-10" />
                  {/* App Screen */}
                  <img 
                    src={screen.src} 
                    alt={screen.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Glow for center phone */}
              {index === 2 && (
                <div className="absolute -inset-6 bg-wheat/15 rounded-[40px] blur-3xl -z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {['Evangelio diario', 'Rosario guiado', 'Homilía con IA', 'Audio calmado', 'Modo offline'].map((tag, index) => (
            <span 
              key={index}
              className="px-5 py-2.5 bg-parchment/10 text-parchment rounded-full text-sm font-medium border border-parchment/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
