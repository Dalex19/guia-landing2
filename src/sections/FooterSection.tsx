import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DoveLogo from '../components/icons/DoveLogo';

gsap.registerPlugin(ScrollTrigger);

const FooterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cta = ctaRef.current;
    const badges = badgesRef.current;

    if (!section || !cta || !badges) return;

    const ctx = gsap.context(() => {
      // CTA block animation
      gsap.fromTo(cta,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true
          }
        }
      );

      // Badges stagger animation
      const badgeElements = badges.querySelectorAll('.store-badge');
      badgeElements.forEach((badge) => {
        gsap.fromTo(badge,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: badges,
              start: 'top 85%',
              end: 'top 65%',
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
      className="relative bg-terracotta z-[80]"
    >
      {/* CTA Area */}
      <div className="py-24 lg:py-32 px-6">
        <div ref={ctaRef} className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
             <img src='https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/a-i-art-app-flutter-flowx-replicate-qxhyh7/assets/wt26kq9p8bkc/Vector_98.png'/>

          </div>

          {/* Headline */}
          <h2 className="font-serif text-parchment text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
            Descarga <span className="italic">GUÍA</span> hoy
          </h2>

          {/* Subheadline */}
          <p className="font-sans text-parchment/80 text-lg mb-10">
            Tu compañía diaria de fe, en el bolsillo.
          </p>

          {/* Store Badges */}
          <div ref={badgesRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* App Store Badge */}
            <a 
              href="#"
              className="store-badge group flex items-center gap-3 bg-parchment text-espresso px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-xs font-medium opacity-70">Descargar en</p>
                <p className="font-semibold">App Store</p>
              </div>
            </a>

            {/* Google Play Badge */}
            <a 
              href="#"
              className="store-badge group flex items-center gap-3 bg-parchment text-espresso px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z"/>
              </svg>
              <div className="text-left">
                <p className="text-xs font-medium opacity-70">Descargar en</p>
                <p className="font-semibold">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-parchment/20 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-sm text-parchment/70 hover:text-parchment transition-colors">
              Contacto
            </a>
            <a href="#" className="font-sans text-sm text-parchment/70 hover:text-parchment transition-colors">
              Privacidad
            </a>
            <a href="#" className="font-sans text-sm text-parchment/70 hover:text-parchment transition-colors">
              Términos
            </a>
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-parchment/50">
            © 2026 GUÍA. Hecho con fe.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default FooterSection;
