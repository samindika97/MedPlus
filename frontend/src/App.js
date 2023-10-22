import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import AboutUs  from "./pages/Aboutus";
import ContactUs from "./pages/Contactus";

import FeaturesLayout from "./layouts/FeaturesLayout";

import SymptomChecker from "./pages/features/SymptomChecker";
import LabReportAnalyser from "./pages/features/LabReportAnalyzer";
import HospitalDetails from "./pages/features/HospitalDetails";
import ContactDoctor from "./pages/features/ContactDoctor";

import AdminDashboardLayout from "./layouts/AdminDashboardLayout";

import Symptoms from "./pages/adminDashboard/Symptoms";
import Diseases from "./pages/adminDashboard/Diseases";
import Messages from "./pages/adminDashboard/Messages";
import Clinic from "./pages/adminDashboard/Clinic";

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
        element: <AboutUs />,
        // loader: teamLoader,
      },
      {
        path: "/services",
        element: <p>services</p>,
        // loader: teamLoader,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
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
      {
        path: "/admin-dashboard",
        element: <AdminDashboardLayout />,
        children: [
          {
            path: "/admin-dashboard/",
            element: <div>admin dashboard page</div>,
          },
          {
            path: "/admin-dashboard/symptoms",
            element: <Symptoms />,
          },
          {
            path: "/admin-dashboard/diseases",
            element: <Diseases />,
          },
          {
            path: "/admin-dashboard/messages",
            element: <Messages />,
          },
          {
            path: "/admin-dashboard/clinic",
            element: <Clinic />,
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
