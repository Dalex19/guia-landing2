import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud1, Cloud2 } from '../components/icons/CloudShapes';
import { ChevronRight } from '../components/icons/FeatureIcons';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const microcopy = microcopyRef.current;
    const clouds = cloudsRef.current;
    const phone = phoneRef.current;

    if (!section || !content || !logo || !headline || !subheadline || !cta || !microcopy || !clouds || !phone) return;

    const ctx = gsap.context(() => {
      // Initial state (hidden)
      gsap.set([logo, headline, subheadline, cta, microcopy], { 
        opacity: 0, 
        y: 30 
      });
      gsap.set(logo, { scale: 0.92 });
      gsap.set(phone, { opacity: 0, y: 60, rotateY: -15 });

      // Auto-play entrance animation on page load
      const loadTl = gsap.timeline({ delay: 0.3 });
      
      loadTl
        .to(logo, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.7, 
          ease: 'power2.out' 
        })
        .to(headline, { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: 'power2.out' 
        }, '-=0.4')
        .to(subheadline, { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: 'power2.out' 
        }, '-=0.5')
        .to(cta, { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: 'power2.out' 
        }, '-=0.5')
        .to(microcopy, { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power2.out' 
        }, '-=0.5')
        .to(phone, {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.8');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.to([logo, headline, subheadline, cta, microcopy], {
              opacity: 1,
              y: 0,
              duration: 0.3
            });
            gsap.to(phone, {
              opacity: 1,
              y: 0,
              rotateY: 0,
              duration: 0.3
            });
          }
        }
      });

      // SETTLE phase (0% - 70%): hold visible
      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(headline, 
          { y: 0, opacity: 1 },
          { y: '-22vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo([subheadline, logo], 
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(cta, 
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(microcopy, 
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.78
        )
        .fromTo(phone,
          { y: 0, opacity: 1, rotateY: 0 },
          { y: '20vh', opacity: 0, rotateY: 15, ease: 'power2.in' },
          0.70
        )
        .fromTo(clouds,
          { scale: 1, opacity: 0.18 },
          { scale: 1.1, opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(section,
          { backgroundPosition: 'center center' },
          { scale: 1.04, ease: 'none' },
          0.70
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToFeatures = () => {
    const element = document.getElementById('daily-companion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="section-pinned bg-terracotta flex items-center justify-center z-10"
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />
      
      {/* Clouds background */}
      <div ref={cloudsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] text-parchment/20 animate-drift">
          <Cloud1 className="w-64 h-32" />
        </div>
        <div className="absolute top-[60%] right-[15%] text-parchment/15 animate-drift" style={{ animationDelay: '-5s' }}>
          <Cloud2 className="w-48 h-24" />
        </div>
        <div className="absolute bottom-[20%] left-[20%] text-parchment/10 animate-drift" style={{ animationDelay: '-10s' }}>
          <Cloud1 className="w-40 h-20" />
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-[8vw] py-20 lg:py-0">
        
        {/* Left Side - Text Content */}
        <div 
          ref={contentRef}
          className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl lg:mr-12"
        >
          {/* Logo */}
          <div ref={logoRef} className="mb-6">

             <img src='https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/a-i-art-app-flutter-flowx-replicate-qxhyh7/assets/wt26kq9p8bkc/Vector_98.png'/>

          </div>

          {/* Headline */}
          <h1 
            ref={headlineRef}
            className="font-serif text-parchment text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight"
          >
            Bienvenido a <span className="italic">GUÍA</span>
          </h1>

          {/* Subheadline */}
          <p 
            ref={subheadlineRef}
            className="font-sans text-parchment/90 text-base md:text-lg leading-relaxed mb-8 max-w-md"
          >
            Un espacio donde la fuerza del Rosario se convierten en tu compañía diaria.
          </p>

          {/* CTA Button */}
          <button 
            ref={ctaRef}
            onClick={scrollToFeatures}
            className="group bg-parchment text-terracotta font-sans font-medium px-8 py-4 rounded-full 
                       transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95
                       flex items-center gap-2 text-base"
          >
            Descubrir
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Microcopy */}
          <p 
            ref={microcopyRef}
            className="font-mono text-parchment/60 text-xs uppercase tracking-widest mt-6"
          >
            Disponible en iOS y Android
          </p>
        </div>

        {/* Right Side - Phone Mockup */}
        <div 
          ref={phoneRef}
          className="hidden lg:block relative mt-8 lg:mt-0"
          style={{ perspective: '1000px' }}
        >
          <div className="relative w-[280px] h-[570px]">
            {/* Phone Frame */}
            <div className="absolute inset-0 bg-espresso rounded-[40px] p-2 shadow-2xl">
              <div className="w-full h-full bg-black rounded-[32px] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
                {/* App Screen */}
                <img 
                  src="/images/app-screen-1.png" 
                  alt="guía tu fe. app"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-wheat/20 rounded-[50px] blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
