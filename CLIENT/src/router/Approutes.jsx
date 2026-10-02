import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import MainPage from "../pages/MainPage";
import CartPage from "../pages/CartPage";
import WishListPage from "../pages/WishListPage";
import ShopPage from "../pages/ShopPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "wishlist",
        element: <WishListPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },

  {
    path: "/register",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
]);

export default router;