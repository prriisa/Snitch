import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import MainPage from "../pages/MainPage";
import CartPage from "../pages/CartPage";
import WishListPage from "../pages/WishListPage";
import ShopPage from "../pages/ShopPage";
import SingleProductPage from "../pages/SingleProductPage";
import Me from "../components/Main/Me";
import PrivateRoute from "./PrivateRoute";
import { refreshTokens } from "../api/api";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import { authenticate } from "../redux/Slice/authSlice";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: "/", element: <MainPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/wishlist", element: <WishListPage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "product/:id", element: <SingleProductPage /> },

      // private route
      {
        element: <PrivateRoute />,
        children: [
          { path: "me", element: <Me />, },
          { path: "createNewProduct", element: <></> }
        ],
      },
    ],
  },

  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "/register", element: <Register /> }
    ],
  },

]);

const AppRoutes = () => {
  let dispatch = useDispatch()
  const hasRestoredSession = useRef(false)


  useEffect(() => {
    if (hasRestoredSession.current) return
    hasRestoredSession.current = true


    const restoreSession = async () => {
      try {
        let response = await refreshTokens()
        dispatch(authenticate({
          user: response.data.data.userData,
          accessToken: response.data.data.accessToken
        }))

      } catch (error) {
        console.log(error)
      }
    }
    restoreSession()
  }, [dispatch])

  return <RouterProvider router={router} />;
}

export default AppRoutes;