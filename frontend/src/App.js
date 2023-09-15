import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";

import FeaturesLayout from "./layouts/FeaturesLayout";

import SymptomChecker from "./features/SymptomChecker";
import LabReportAnalyser from "./features/LabReportAnalyzer";
import HospitalDetails from "./features/ContactDoctor";
import ContactDoctor from "./features/ContactDoctor";

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
      {
        path: "/features",
        element: <FeaturesLayout />,
        children: [
          {
            path: "/features/",
            element: <div>all features page</div>,
          },
          {
            path: "/features/symptom-checker",
            element: <SymptomChecker />,
          },
          {
            path: "/features/lab-report-analyzer",
            element: <LabReportAnalyser />,
          },
          {
            path: "/features/hospital-details",
            element: <HospitalDetails />,
          },
          {
            path: "/features/contact-doctor",
            element: <ContactDoctor />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
