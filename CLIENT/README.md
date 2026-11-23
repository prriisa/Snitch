# Snitch client

The client is a React application built with Vite. It includes the storefront, customer authentication, and seller product management.

## Local development

```bash
npm install
npm run dev
```

By default, Vite proxies `/api` requests to `http://127.0.0.1:3000`. Keep the backend `PORT` set to `3000` and restart both development servers after changing the proxy or server port.

## Vercel multi-service deployment

1. Import the repository into Vercel with the repository root as the **Root Directory**. The root `vercel.json` builds the Vite client and Express server as separate services.
2. The public `/api/*` rewrite sends API requests to the server; other paths go to the client. Client-side routes are rewritten to the Vite entry point.
3. Configure the server's `MONGO_URI`, `ACCESS_JWT`, `REFRESH_JWT`, and `IMAGEKIT_PRIVATE_KEY` in Vercel's environment settings. Do not commit `.env` files.
4. The client uses the same-origin `/api` path, so no `VITE_API_URL` is needed for this routing setup.

Vercel Services are currently in beta. The server is a public API service; there are no internal service-to-service calls or bindings in this application.
