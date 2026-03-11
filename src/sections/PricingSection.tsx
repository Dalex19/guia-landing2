import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const donationRef = useRef<HTMLDivElement>(null);

  // selected pre-defined amount (e.g. "$5")
  const [selectedAmount, setSelectedAmount] = React.useState<string | null>(null);
  // custom amount entered by the user as a string so we can filter characters
  const [customAmount, setCustomAmount] = React.useState<string>('');
  // error message for validation
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // no need to load stripe-js for redirect; server returns checkout URL

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const donation = donationRef.current;

    if (!section || !header || !donation) return;

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

      // Donation container animation
      gsap.fromTo(donation,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: donation,
            start: 'top 85%',
            end: 'top 55%',
            scrub: true
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="donation"
      className="relative bg-parchment py-24 lg:py-32 z-[70]"
    >
      <div className="px-6 lg:px-[8vw] max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-serif text-espresso text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
            Tu apoyo hace la diferencia
          </h2>
          <p className="font-sans text-taupe text-lg max-w-xl mx-auto">
            Tu contribución nos permite seguir compartiendo fe y esperanza con miles de personas alrededor del mundo.
          </p>
        </div>

        {/* Donation container */}
        <div ref={donationRef} className="bg-white rounded-4xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Left column */}
          <div className="w-full md:w-1/2 p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-semibold mb-6 text-espresso">
              Elige tu contribución
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {['$5', '$10', '$25', '$50'].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={
                    `py-3 rounded-lg border-2 font-medium transition ` +
                    (selectedAmount === amt
                      ? 'bg-terracotta text-parchment border-terracotta'
                      : 'border-terracotta text-espresso hover:bg-terracotta hover:text-parchment')
                  }
                >
                  {amt}
                </button>
              ))}
            </div>
            <div className="mb-6">
              <label htmlFor="custom-amount" className="sr-only">Otra cantidad</label>
              <input
                id="custom-amount"
                type="text"
                value={customAmount}
                onChange={(e) => {
                  // allow only digits and optional decimal point
                  const filtered = e.target.value.replace(/[^0-9.]/g, '');
                  setCustomAmount(filtered);
                  // clear selected pre-defined if user starts typing
                  if (selectedAmount) setSelectedAmount(null);
                }}
                placeholder="$ 0.00"
                className="w-full px-4 py-3 border border-taupe rounded-lg focus:ring-2 focus:ring-terracotta focus:outline-none"
              />
            </div>
            <button
              onClick={async () => {
                // validation
                if (!selectedAmount && customAmount.trim() === '') {
                  setErrorMessage('Por favor selecciona o ingresa una cantidad');
                  return;
                }
                setErrorMessage(null);
                const amountNumber = selectedAmount
                  ? parseFloat(selectedAmount.replace(/\$/g, ''))
                  : parseFloat(customAmount);

                // create checkout session on backend and redirect via returned URL
               try {
  console.log('[donation] Enviando amount:', amountNumber);

  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amountNumber }),
  });

  console.log('[donation] Status de respuesta:', response.status);

  // Leer como texto primero para ver qué devuelve el server
  const rawText = await response.text();
  console.log('[donation] Respuesta raw del server:', rawText);

  const data = JSON.parse(rawText);
  console.log('[donation] Data parseada:', data);

  if (data.url) {
    window.location.href = data.url;
  } else {
    throw new Error(data.error || 'No checkout URL returned');
  }
} catch (err) {
  console.error('[donation] Error completo:', err);
  setErrorMessage('Ocurrió un error al iniciar el pago');
}

              }}
              className="w-full py-4 rounded-full bg-terracotta text-parchment font-semibold hover:shadow-lg transition"
            >
              Donar ahora
            </button>
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>

          {/* Right column */}
          <div className="w-full md:w-1/2 bg-terracotta text-parchment p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-semibold mb-6">
              Tu impacto
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-wheat">✓</span>
                <span>Mantenimiento y mejora continua de la plataforma.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-wheat">✓</span>
                <span>Producción de nuevos contenidos espirituales y guías.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-wheat">✓</span>
                <span>Expansión del alcance global para llegar a más comunidades.</span>
              </li>
            
            </ul>
            <p className="text-sm">
              "Cada contribución, por pequeña que sea, ayuda a mantener viva nuestra misión."
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-taupe">
          Todas las transacciones son seguras y están encriptadas.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
