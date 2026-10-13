
# SNITCH — Full-Stack E-commerce Platform

A modern full-stack e-commerce web application inspired by SNITCH, built to deliver a smooth online shopping experience with product browsing, authentication, cart management, and wishlist functionality.

## 🚀 Features

### 🛍️ Shopping Experience
- Browse products with a clean, responsive UI.
- Explore trending categories and shop by price.
- View detailed product information.
- Select product sizes and check stock availability.
- Add products to the cart and wishlist.

### 🔐 Authentication
- User registration and login.
- JWT-based authentication.
- Access token and refresh token handling.
- Protected routes and role-based authorization.

### 🛒 Cart Management
- Add products to the cart with selected sizes.
- Automatically increase quantity for duplicate products of the same size.
- Add the same product in different sizes as separate cart items.
- Update product quantities.
- Validate stock availability.
- Remove items and calculate the cart total.

### ❤️ Wishlist
- Manage your wishlist.
- Keep track of products you want to purchase.

### ⚙️ Backend & Product Management
- RESTful APIs using Express.js.
- MongoDB database integration.
- Product and user management.
- Image uploads using ImageKit.
- Request validation and error handling.

### 📱 Responsive UI
- Mobile-first layout.
- Responsive product grids.
- Smooth navigation and interactive UI components.

## 🧰 Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Redux Toolkit
- Axios
- React Hook Form
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Multer
- ImageKit

## 📁 Project Structure

```text
SNITCH/
├── CLIENT/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── redux/
│       ├── routes/
│       └── api/
│
└── SERVER/
    └── src/
        ├── controllers/
        ├── routes/
        ├── model/
        ├── middleware/
        ├── validators/
        └── config/
```

*The folder structure may vary depending on the latest project implementation.*

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd SNITCH
```

### 2. Set Up the Backend

```bash
cd SERVER
npm install
```

Create a `.env` file inside the `SERVER` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Add any additional environment variables required by your ImageKit configuration.

Start the backend:

```bash
npm run dev
```

### 3. Set Up the Frontend

Open another terminal:

```bash
cd CLIENT
npm install
npm run dev
```

Open the local URL provided by Vite in your terminal.

## 🔒 Environment Variables

Never commit your `.env` file or expose your secret keys.

Add `.env` to `.gitignore` and use environment variables for database credentials, JWT secrets, and third-party service credentials.

## 🌱 Future Improvements

- Integrate a secure payment gateway.
- Add order placement and order tracking.
- Build an admin dashboard for product management.
- Implement product search, sorting, and filtering.
- Add product reviews and ratings.
- Improve automated testing and API documentation.

## 👨‍💻 Author

**Priya**

Full-Stack Developer | MERN Stack

## 📄 Disclaimer

This project is developed for educational and portfolio purposes. It is inspired by the SNITCH brand and is not an official SNITCH application.
