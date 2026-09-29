import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "/main",
        element: <MainLayout />,
        children:[
            {
                path:"/",
                element:<
            }
        ]
    }
])

export default router