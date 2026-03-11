import Stripe from 'stripe';

console.log('[stripe-api] Function loaded');
console.log('[stripe-api] STRIPE_SECRET_KEY present:', !!process.env.STRIPE_SECRET_KEY);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  console.log('[stripe-api] Body recibido:', req.body);

  try {
    const { amount } = req.body;
    const unit_amount = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Donación' },
          unit_amount,
        },
        quantity: 1,
      }],
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });

    console.log('[stripe-api] Sesión creada:', session.id);
    res.json({ url: session.url });

  } catch (err) {
    console.error('[stripe-api] ERROR COMPLETO:', err);
    res.status(500).json({ error: err.message });
  }
}
