# SNITCH

SNITCH is a responsive, full-stack fashion e-commerce application built as an educational project. It demonstrates a complete shopping flow—from browsing and filtering products to placing a cash-on-delivery order—alongside seller tools for managing products and reviewing orders.

> **Educational use only.** This project is not a production-ready store. It does not process online payments, and the sample seller credentials below must only be used with an isolated demo database. Do not reuse the sample password or put real customer or payment data into this application.

## What the app can do

### Shopping

- Browse the storefront and shop pages on desktop or mobile.
- Search product names and filter by category, gender, and price.
- Open product details, view images, choose a size, and check availability.
- Add items to a cart or wishlist, then update cart quantities and sizes.
- Use **Buy Now** to check out a single selected product.
- Save and manage delivery addresses, including a default address.
- Place **cash-on-delivery (COD)** orders, view order details, and request cancellations.

### Seller tools

- Create, edit, and remove product listings.
- Add product images and set product details, category, gender, price, sizes, and stock.
- Review order notifications, including order and delivery information.
- Open a seller order's full details and view product sales information.

### Product categories

The product form and product filters share these categories:

`Shirt`, `Top`, `T-Shirt`, `Jean`, `Trouser`, `Footwear`, `Cargo pant`, `Jogger`, `Short`, `Overshirt`, `Luggage`, `Perfume`, `Accessory`, `Bag`, `Belt`, `Dress`, `Sunglass`, `Sweater`, `Jacket`, and `Other`.

Products can be classified as `male`, `female`, or `unisex`.

## Demo seller account

| Field | Value |
|---|---|
| Email | `seller@gmail.com` |
| Password | `Test001@` |
| Account type | Seller |

The repository does not automatically seed this account. The credentials work only in a demo environment where the account has been created in the connected database. If it is not present, register a demo account using this email and password and select **Seller**.

Treat these credentials as public. Anyone who can access the demo environment may be able to use them. Change or disable the account before deploying anywhere that contains non-demo data.

## Technology

- **Client:** React, Vite, React Router, Redux Toolkit, Tailwind CSS, Axios
- **Server:** Node.js, Express, Mongoose, MongoDB
- **Authentication:** JWT access tokens and a rotating, HTTP-only refresh-token cookie
- **Product images:** ImageKit

## Project layout

```text
Snitch/
├── CLIENT/   React storefront, account pages, seller screens, and client-side state
├── SERVER/   Express API, authentication, business logic, and MongoDB models
└── README.md
```

The API is organized under `/api/auth`, `/api/product`, `/api/cart`, `/api/wishlist`, and `/api/order`.

## Run locally

### Requirements

- Node.js and npm
- A MongoDB database
- An ImageKit account and private key for seller product-image uploads

### 1. Configure the server

Create `SERVER/.env` with the following variables:

```dotenv
PORT=3000
MONGO_URI=your_mongodb_connection_string
ACCESS_JWT=your_long_random_access_token_secret
REFRESH_JWT=your_different_long_random_refresh_token_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Use unique, strong secret values for the JWT variables. Keep this file private; `.env` files are ignored by Git and must never be committed.

### 2. Install and start the API

In a terminal from the repository root:

```powershell
cd SERVER
npm install
npm run dev
```

The API connects to MongoDB before it starts listening. The client’s Vite development proxy targets `http://127.0.0.1:3000`, so keep the server `PORT` at `3000` for local development.

### 3. Install and start the client

In a second terminal from the repository root:

```powershell
cd CLIENT
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). The client sends `/api` requests through its development proxy to the local server.

## Deployment

The repository includes a root `vercel.json` configured to deploy the client and Express API as separate Vercel services. Configure `MONGO_URI`, `ACCESS_JWT`, `REFRESH_JWT`, and `IMAGEKIT_PRIVATE_KEY` in the server service's environment settings. Never put secrets in client-side environment variables or commit them to the repository.

## Important limitations

- Checkout currently supports COD only; no online payment provider is integrated.
- Seller registration is available in the demo UI. This is convenient for evaluation, but it is not a production seller-verification or onboarding process.
- Use a separate demo database and demo credentials. Do not use real customer information or treat the application as a production commerce or security system without further review and hardening.

## License

No license is currently specified in this repository. Contact the project owner before reusing or redistributing it.
