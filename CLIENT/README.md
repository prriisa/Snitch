# Snitch client

The client is a React application built with Vite. It includes the storefront, customer authentication, and seller product management.

## Local development

```bash
npm install
npm run dev
```

By default, Vite proxies `/api` requests to `http://127.0.0.1:3000`. Keep the backend `PORT` set to `3000` and restart both development servers after changing the proxy or server port.

## Vercel deployment

1. Import the repository into Vercel and set **Root Directory** to `CLIENT`.
2. Use `npm run build` as the build command and `dist` as the output directory.
3. Configure `VITE_API_URL` as the public backend API URL, including `/api` (for example, `https://your-api.example.com/api`).
4. Configure the backend's `CLIENT_URL` to the exact deployed frontend origin (for example, `https://your-store.vercel.app`). For preview deployments, add the preview origin to the comma-separated `CLIENT_URL` list when needed.
5. Deploy the backend separately with `NODE_ENV=production` and valid database, JWT, and image-storage credentials. The backend must support credentialed CORS and HTTPS so its refresh-token cookie can be used by the client.

`vercel.json` rewrites client-side routes to the Vite entry point so direct navigation and refresh work on seller and product routes.
