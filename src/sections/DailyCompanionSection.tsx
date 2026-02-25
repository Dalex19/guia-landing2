import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const DailyCompanionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const phoneARef = useRef<HTMLDivElement>(null);
  const phoneBRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const phoneA = phoneARef.current;
    const phoneB = phoneBRef.current;
    const label = labelRef.current;
    const title = titleRef.current;
    const body = bodyRef.current;

    if (!section || !header || !phoneA || !phoneB || !label || !title || !body) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      // Header block slides in from left
      scrollTl
        .fromTo(label,
          { x: '-12vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(title,
          { x: '-12vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.03
        )
        .fromTo(body,
          { x: '-12vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.06
        )
        // Phone A slides in from right with 3D rotation
        .fromTo(phoneA,
          { x: '55vw', rotateY: 25, opacity: 0 },
          { x: 0, rotateY: -5, opacity: 1, ease: 'power2.out' },
          0.06
        )
        // Phone B slides in from right with 3D rotation
        .fromTo(phoneB,
          { x: '55vw', rotateY: -25, opacity: 0 },
          { x: 0, rotateY: 5, opacity: 1, ease: 'power2.out' },
          0.12
        );

      // SETTLE (30% - 70%): elements hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(header,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(phoneA,
          { x: 0, opacity: 1, rotateY: -5 },
          { x: '18vw', opacity: 0, rotateY: 25, ease: 'power2.in' },
          0.72
        )
        .fromTo(phoneB,
          { x: 0, opacity: 1, rotateY: 5 },
          { x: '18vw', opacity: 0, rotateY: -25, ease: 'power2.in' },
          0.74
        )
        .fromTo(section,
          { y: 0 },
          { y: '-6vh', ease: 'none' },
          0.70
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="daily-companion"
      className="section-pinned bg-parchment flex items-center z-20"
    >
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[8vw] py-20 lg:py-0">
        
        {/* Header Block - Left Side */}
        <div ref={headerRef} className="lg:w-[40%] mb-10 lg:mb-0 text-center lg:text-left">
          <span 
            ref={labelRef}
            className="label-mono block mb-4"
          >
            TU DÍA
          </span>
          <h2 
            ref={titleRef}
            className="font-serif text-espresso text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight"
          >
            Tu guía de hoy
          </h2>
          <p 
            ref={bodyRef}
            className="font-sans text-taupe text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
          >
            Evangelio, oración y Rosario… en un solo lugar. Todo lo que necesitas para nutrir tu fe, cada día.
          </p>
        </div>

        {/* Phone Mockups - Right Side */}
        <div className="lg:w-[55%] flex items-center justify-center gap-4 lg:gap-8" style={{ perspective: '1200px' }}>
          
          {/* Phone A - Evangelio */}
          <div 
            ref={phoneARef}
            className="relative w-[160px] h-[320px] lg:w-[200px] lg:h-[400px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 bg-espresso rounded-[28px] lg:rounded-[36px] p-1.5 lg:p-2 shadow-card">
              <div className="w-full h-full bg-black rounded-[22px] lg:rounded-[28px] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 lg:w-24 h-4 lg:h-5 bg-black rounded-b-xl z-10" />
                {/* App Screen */}
                <img 
                  src="/images/app-screen-4.png" 
                  alt="Evangelio del día"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Label */}
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center w-full">
              <p className="font-serif text-espresso font-semibold text-sm lg:text-base">Evangelio del día</p>
              <p className="font-sans text-taupe text-xs">Lectura + homilía con IA</p>
            </div>
          </div>

          {/* Phone B - Rosario */}
          <div 
            ref={phoneBRef}
            className="relative w-[160px] h-[320px] lg:w-[200px] lg:h-[400px] mt-8 lg:mt-12"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 bg-espresso rounded-[28px] lg:rounded-[36px] p-1.5 lg:p-2 shadow-card">
              <div className="w-full h-full bg-black rounded-[22px] lg:rounded-[28px] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 lg:w-24 h-4 lg:h-5 bg-black rounded-b-xl z-10" />
                {/* App Screen */}
                <img 
                  src="/images/app-screen-3.png" 
                  alt="Rosario"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Label */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
              <p className="font-serif text-espresso font-semibold text-sm lg:text-base">Rosario</p>
              <p className="font-sans text-taupe text-xs">Misterios del día con audio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyCompanionSection;
