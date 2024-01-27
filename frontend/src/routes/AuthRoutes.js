import React from "react"
import { Navigate, useRoutes } from "react-router-dom"
import { urlSlug } from "../utils/urlSlug"

// Layout
const AuthLayout = React.lazy(() => import("../layouts/AuthLayout"))

// pages
const LoginPage = React.lazy(() => import("../pages/SignIn"))
const RegisterPage = React.lazy(() => import("../pages/Register"))
// const ForgotPasswordPage = React.lazy(
//   () => import("../pages/public/ForgotPassword"),
// )

const AuthRoutes = () =>
  useRoutes([
    {
      element: <AuthLayout />,
      children: [
        { path: urlSlug.LOGIN, element: <LoginPage /> },
        { path: urlSlug.REGISTER, element: <RegisterPage /> },
      ],
    },
    { path: "*", element: <Navigate to={urlSlug.LOGIN} /> },
  ])

export default AuthRoutes
