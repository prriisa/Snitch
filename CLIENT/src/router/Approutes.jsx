import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import { refreshTokens } from "../api/authApi";
import { authChecked, authenticate } from "../redux/Slice/authSlice";
import PublicRoute from "./PublicRoute";
import SellerRoute from "./SellerRoute";

const Login = lazy(() => import("../components/Auth/Login"));
const Register = lazy(() => import("../components/Auth/Register"));
const MainPage = lazy(() => import("../pages/MainPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const WishListPage = lazy(() => import("../pages/WishListPage"));
const ShopPage = lazy(() => import("../pages/ShopPage"));
const SingleProductPage = lazy(() => import("../pages/SingleProductPage"));
const Me = lazy(() => import("../components/Main/Me"));
const SellerProductsPage = lazy(() => import("../pages/SellerProductsPage"));
const SellerNotificationsPage = lazy(() => import("../pages/SellerNotificationsPage"));
const SellerOrderDetailPage = lazy(() => import("../pages/SellerOrderDetailPage"));
const ProductFormPage = lazy(() => import("../pages/ProductFormPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const OrdersPage = lazy(() => import("../pages/OrdersPage"));
const OrderDetailPage = lazy(() => import("../pages/OrderDetailPage"));
const PersonalInformationPage = lazy(() => import("../pages/PersonalInformationPage"));
const SavedAddressesPage = lazy(() => import("../pages/SavedAddressesPage"));

const renderPage = (Page) => (
  <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center bg-white text-xs uppercase tracking-[0.2em] text-neutral-500">Loading...</div>}>
    <Page />
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: renderPage(MainPage) },
      { path: "/cart", element: renderPage(CartPage) },
      { path: "/wishlist", element: renderPage(WishListPage) },
      { path: "shop", element: renderPage(ShopPage) },
      { path: "product/:id", element: renderPage(SingleProductPage) },

      // private route
      {
        element: <PrivateRoute />,
        children: [
          { path: "me", element: renderPage(Me) },
          { path: "account/profile", element: renderPage(PersonalInformationPage) },
          { path: "account/addresses", element: renderPage(SavedAddressesPage) },
          { path: "checkout", element: renderPage(CheckoutPage) },
          { path: "orders", element: renderPage(OrdersPage) },
          { path: "orders/:orderId", element: renderPage(OrderDetailPage) },
          { path: "order", element: renderPage(OrdersPage) },
          {
            element: <SellerRoute />,
            children: [
              { path: "seller/products", element: renderPage(SellerProductsPage) },
              { path: "seller/notifications", element: renderPage(SellerNotificationsPage) },
              { path: "seller/orders/:orderId", element: renderPage(SellerOrderDetailPage) },
              { path: "seller/create-product", element: renderPage(ProductFormPage) },
              { path: "seller/products/:id/edit", element: renderPage(ProductFormPage) }
            ]
          }
        ],
      },
    ],
  },

  {
    element: <PublicRoute />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          { path: "login", element: renderPage(Login) },
          { path: "register", element: renderPage(Register) }
        ],
      },
    ]
  }

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
        if (error.response?.status !== 401) {
          console.error("Could not restore the signed-in session:", error.response?.data?.message || error.message)
        }
      } finally {
        dispatch(authChecked())
      }
    }
    restoreSession()
  }, [dispatch])

  return <RouterProvider router={router} />;
}

export default AppRoutes;