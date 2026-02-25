import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from '../components/icons/FeatureIcons';

gsap.registerPlugin(ScrollTrigger);

const mysteries = [
  {
    title: 'Misterios Gozosos',
    days: 'Lunes y sábado',
    description: 'La Anunciación, la Visitación, el Nacimiento...'
  },
  {
    title: 'Misterios Dolorosos',
    days: 'Martes y viernes',
    description: 'La agonía, la flagelación, la coronación...'
  },
  {
    title: 'Misterios Gloriosos',
    days: 'Miércoles y domingo',
    description: 'La Resurrección, la Ascensión, Pentecostés...',
    highlighted: true
  },
  {
    title: 'Misterios Luminosos',
    days: 'Jueves',
    description: 'El Bautismo, las bodas de Caná, el Sermón...'
  }
];

const RosarySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const illustration = illustrationRef.current;
    const title = titleRef.current;
    const rows = rowsRef.current;

    if (!section || !illustration || !title || !rows) return;

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
      // Illustration rises from bottom
      scrollTl
        .fromTo(illustration,
          { y: '40vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
          0
        )
        // Title + prompt fade in
        .fromTo(title,
          { y: '-6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.10
        );

      // Rows stagger in from left
      const rowElements = rows.querySelectorAll('.mystery-row');
      rowElements.forEach((row, index) => {
        scrollTl.fromTo(row,
          { x: '-10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.14 + (index * 0.04)
        );
      });

      // SETTLE (30% - 70%): hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(illustration,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(title,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.72
        );

      rowElements.forEach((row, index) => {
        scrollTl.fromTo(row,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.74 + (index * 0.02)
        );
      });

      scrollTl.fromTo(section,
        { scale: 1 },
        { scale: 1.03, ease: 'none' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-pinned bg-terracotta flex flex-col items-center justify-center z-[60] overflow-hidden"
    >
      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">
        
        {/* Illustration */}
        <div 
          ref={illustrationRef}
          className="w-full max-w-md mb-8"
        >
          <img 
            src="/images/mary-illustration.jpg" 
            alt="Virgen María"
            className="w-full h-auto rounded-3xl shadow-2xl"
          />
        </div>

        {/* Title & Prompt */}
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="font-serif text-parchment text-3xl md:text-4xl font-semibold mb-2">
            Rosario
          </h2>
          <p className="font-sans text-parchment/80 text-lg">
            ¿Qué misterio quieres rezar hoy?
          </p>
        </div>

        {/* Mystery Rows */}
        <div ref={rowsRef} className="w-full max-w-xl space-y-3">
          {mysteries.map((mystery, index) => (
            <div 
              key={index}
              className={`mystery-row group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                mystery.highlighted 
                  ? 'bg-wheat text-espresso' 
                  : 'bg-parchment/10 text-parchment hover:bg-parchment/20'
              }`}
            >
              <div className="flex-1">
                <h3 className={`font-serif text-lg font-semibold mb-0.5 ${
                  mystery.highlighted ? 'text-espresso' : 'text-parchment'
                }`}>
                  {mystery.title}
                </h3>
                <p className={`text-sm ${
                  mystery.highlighted ? 'text-espresso/70' : 'text-parchment/70'
                }`}>
                  {mystery.days}
                </p>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                mystery.highlighted ? 'text-espresso' : 'text-parchment'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RosarySection;
