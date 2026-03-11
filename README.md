# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

## Stripe integration

A minimal backend/server and frontend support have been added for Stripe Checkout.

1. **Dependencies**
   ```bash
   npm install stripe express @stripe/stripe-js
   ```

2. **Environment variables**
   - Add your publishable key to `.env`:
     ```env
     VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
     ```
   - Set your secret key when starting the server:
     ```bash
     STRIPE_SECRET_KEY=sk_test_... node server.js
     ```

3. **Backend**
   - A simple `server.js` at project root handles `/create-checkout-session`.
   - The Vite dev server proxies that path to `http://localhost:4242` (configured in `vite.config.ts`).

4. **Frontend**
   - The donate button validates the amount and posts it to the backend.
   - The server responds with a `url` property; the client simply navigates there
     (`window.location.href = url`).  This avoids using the deprecated
     `stripe.redirectToCheckout` method and lets us cancel the `@stripe/stripe-js`
     dependency entirely if desired.

5. **Running**
   - Start backend: `npm run start-server` (or manually with `STRIPE_SECRET_KEY=… node server.js`)
   - In another terminal run `npm run dev` to start the Vite app.

Once the validation passes, your browser is redirected to the Stripe-hosted
checkout page (the URL is generated server‑side with your secret key).  You can
customize line items, currency, success/cancel URLs, etc. as needed.

### Why is there a server?

Stripe requires that sensitive operations – like creating a Checkout Session – be
performed using your **secret key**, which must never be exposed in client-side
JavaScript. The small Express server defined in `server.cjs` exists purely to
accept the donation amount, create the session with Stripe using the secret key,
and return the session URL. This keeps your credentials safe and allows the
frontend to remain a static bundle served by Vite.

