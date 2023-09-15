import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home />,
        // loader: teamLoader,
      },
      {
        path: "/about-us",
        element: <p>about us</p>,
        // loader: teamLoader,
      },
      {
        path: "/services",
        element: <p>services</p>,
        // loader: teamLoader,
      },
      {
        path: "/contact-us",
        element: <p>contact us</p>,
        // loader: teamLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
