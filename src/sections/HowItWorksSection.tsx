import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DownloadIcon, BookIcon, RosaryIcon } from '../components/icons/FeatureIcons';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: DownloadIcon,
    title: 'Descarga la app',
    description: 'Crea tu perfil en segundos. Rápido y sencillo.'
  },
  {
    number: '02',
    icon: BookIcon,
    title: 'Elige tu momento',
    description: 'Mañana, tarde o noche. La fe se adapta a tu ritmo.'
  },
  {
    number: '03',
    icon: RosaryIcon,
    title: 'Reza con GUÍA',
    description: 'Rosario, letanías o lectio. Tu compañía espiritual.'
  }
];

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const path = pathRef.current;
    const stepsContainer = stepsRef.current;

    if (!section || !header || !path || !stepsContainer) return;

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

      // Path line draw animation
      const pathLength = path.getTotalLength();
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: stepsContainer,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true
        }
      });

      // Steps animation
      const stepElements = stepsContainer.querySelectorAll('.step-item');
      stepElements.forEach((step) => {
        gsap.fromTo(step,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
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
      className="relative bg-parchment py-24 lg:py-32 z-40"
    >
      <div className="px-6 lg:px-[8vw] max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <h2 className="font-serif text-espresso text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
            Empieza en minutos
          </h2>
          <p className="font-sans text-taupe text-lg max-w-xl mx-auto">
            Tres pasos simples para comenzar tu camino de fe diaria.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting Line - Desktop */}
          <svg 
            className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 hidden lg:block"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 100 1 L 500 1 L 900 1"
              stroke="#D8A25F"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="opacity-40"
            />
          </svg>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="step-item relative flex flex-col items-center text-center"
              >
                {/* Step Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-terracotta flex items-center justify-center shadow-card">
                    <step.icon className="w-8 h-8 text-parchment" strokeWidth={1.5} />
                  </div>
                  {/* Step Number */}
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-wheat text-espresso font-mono text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-serif text-espresso text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-taupe leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
