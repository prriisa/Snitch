# Snitch – E-Commerce Platform

Snitch is a full-stack e-commerce application designed to provide a smooth online shopping experience with product browsing, cart management, wishlist functionality, and seller-side product management.

The platform follows a **single-seller model**, meaning there is only one seller who manages the store. Customers can explore products and shop through the application, while the seller has access to the seller dashboard and all available seller functionalities.

## ✨ Features

### 🛍️ Customer Features

- **Product Browsing:** Explore the products available in the store.
- **Product Details:** View detailed information about individual products.
- **Shopping Cart:** Add products to the cart and manage cart items.
- **Wishlist:** Save favourite products for later.
- **Authentication:** Secure login and registration functionality.
- **Responsive UI:** Enjoy the application across different screen sizes.

### 👨‍💼 Seller Features

Snitch follows a single-seller architecture. There are no multiple seller registrations or separate seller accounts.

The application has one dedicated seller account. Once logged in with the seller credentials, you can access all the seller-side features available in the application.

Depending on the implemented functionality, these include:

- Accessing the seller dashboard.
- Managing store products.
- Adding new products.
- Updating existing product information.
- Managing product listings.
- Accessing seller-specific functionality.

**Note:** The seller account has access to all seller features; customers do not need a separate seller registration.

## 🔐 Seller Login Credentials

Use the following demo credentials to access the seller side of the application:

| Field | Credentials |
|---|---|
| Account Type | Seller |
| Email | `priya@gmail.com` |
| Password | `Test001@` |

**How to access seller features:**

1. Open the Snitch application.
2. Navigate to the Login page.
3. Enter the seller email address.
4. Enter the seller password.
5. Log in to access the seller-side features.

> **Important:** These are demo credentials. Do not use real or sensitive account credentials in a publicly accessible repository.

## 🧑‍💻 Technology Stack

### Frontend
- React.js
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- ImageKit

## 📁 Project Structure

The project is organized into two main directories:

```text
Snitch/
│
├── CLIENT/
│   └── React frontend application
│
├── SERVER/
│   └── Express backend application
│
└── README.md
```

### CLIENT

Contains the frontend application, including the user interface, pages, reusable components, routing, and state management.

### SERVER

Contains the backend application, including API routes, controllers, database models, authentication, and server-side logic.

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/prriisa/Snitch.git
```

### 2. Navigate to the Project

```bash
cd Snitch
```

### 3. Install Frontend Dependencies

```bash
cd CLIENT
npm install
```

### 4. Install Backend Dependencies

Open another terminal:

```bash
cd SERVER
npm install
```

### 5. Configure Environment Variables

Create the required `.env` files for the frontend and backend.

Configure the environment variables required by the application, such as:

- MongoDB connection string.
- JWT secret.
- ImageKit credentials.
- Backend API URL.

Use the variable names expected by the existing source code. Never commit real `.env` files or secrets to GitHub.

### 6. Run the Application

Start the backend:

```bash
cd SERVER
npm run dev
```

Start the frontend in another terminal:

```bash
cd CLIENT
npm run dev
```

The exact commands may vary depending on the scripts defined in each `package.json`.

## 🔒 Authentication and Seller Architecture

Snitch uses a single-seller approach.

Unlike multi-vendor marketplaces, this application does not allow multiple sellers to register and independently manage their stores.

Instead:

- There is one seller account.
- The seller can access all available seller-side functionality.
- Customers can browse products and use shopping features.
- Seller functionality is intended to be restricted to the authenticated seller.

## 🚀 Future Improvements

Potential enhancements for the application include:

- Order management and order tracking.
- Payment gateway integration.
- Improved seller analytics.
- Product inventory management.
- Customer reviews and ratings.
- Enhanced search and filtering.
- Order notifications.

## 👩‍💻 Author

**Priya Sharma**

GitHub: [@prriisa](https://github.com/prriisa)

---

⭐ If you find this project interesting, feel free to explore the repository and its implementation.

**Snitch – A Single-Seller E-Commerce Platform.**