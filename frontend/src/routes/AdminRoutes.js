import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { urlSlug } from "../utils/urlSlug";

// Layout
const RootLayout = React.lazy(() => import("../layouts/RootLayout"));
const FeaturesLayout = React.lazy(() => import("../layouts/FeaturesLayout"));
const AdminDashboardLayout = React.lazy(() =>
  import("../layouts/AdminDashboardLayout"),
);

// pages
const HomePage = React.lazy(() => import("../pages/Home"));
const AboutUsPage = React.lazy(() => import("../pages/AboutUs"));
const ProfilePage = React.lazy(() => import("../pages/Profile"));
const ContactUsPage = React.lazy(() => import("../pages/ContactUs"));
const DoctorDetailsPage = React.lazy(() =>
  import("../pages/doctor/DoctorDetails"),
);
const ChatPage = React.lazy(() => import("../pages/ChatPage/UserChat"));

// features pages
const FeaturesHomePage = React.lazy(() =>
  import("../pages/features/FeaturesHomePage"),
);
const SymptomCheckerPage = React.lazy(() =>
  import("../pages/features/SymptomChecker"),
);
const LabReportAnalyzerPage = React.lazy(() =>
  import("../pages/features/LabReportAnalyzer"),
);
const HospitalDetailsPage = React.lazy(() =>
  import("../pages/features/HospitalDetails"),
);
const ContactDoctorPage = React.lazy(() =>
  import("../pages/features/ContactDoctor"),
);

// Admin Dashboard
const AdminDashboardHomePage = React.lazy(() =>
  import("../pages/adminDashboard/DashboardHomePage"),
);
const AdminDashboardSymptomsPage = React.lazy(() =>
  import("../pages/adminDashboard/Symptoms"),
);
const AdminDashboardDiseasesPage = React.lazy(() =>
  import("../pages/adminDashboard/Diseases"),
);
const AdminDashboardMessagesPage = React.lazy(() =>
  import("../pages/adminDashboard/Messages"),
);
const AdminDashboardDoctorsPage = React.lazy(() =>
  import("../pages/adminDashboard/Doctors"),
);
const AdminDashboardClinicPage = React.lazy(() =>
  import("../pages/adminDashboard/Clinic"),
);
const AdminDashboardHospitalPage = React.lazy(() =>
  import("../pages/adminDashboard/Hospital"),
);
const AdminDashboardHealthReportsPage = React.lazy(() =>
  import("../pages/adminDashboard/HealthReport"),
);

const AdminRoutes = () =>
  useRoutes([
    {
      element: <RootLayout />,
      children: [
        {
          path: urlSlug.HOME,
          element: <HomePage />,
        },
        {
          path: urlSlug.ABOUT_US,
          element: <AboutUsPage />,
        },
        {
          path: urlSlug.PROFILE,
          element: <ProfilePage />,
        },
        {
          path: urlSlug.CONTACT_US,
          element: <ContactUsPage />,
        },
        {
          path: urlSlug.DOCTOR_DETAILS,
          element: <DoctorDetailsPage />,
        },

        {
          path: urlSlug.CHAT,
          element: <ChatPage />,
        },

        {
          path: urlSlug.FEATURE.BASE,
          element: <FeaturesLayout />,
          children: [
            {
              path: urlSlug.FEATURE.BASE,
              element: <FeaturesHomePage />,
            },
            {
              path: urlSlug.FEATURE.SYMPTOM_CHECKER,
              element: <SymptomCheckerPage />,
            },
            {
              path: urlSlug.FEATURE.LAB_REPORT_ANALYSER,
              element: <LabReportAnalyzerPage />,
            },
            {
              path: urlSlug.FEATURE.HOSPITAL_DETAILS,
              element: <HospitalDetailsPage />,
            },
            {
              path: urlSlug.FEATURE.CONTACT_DOCTOR,
              element: <ContactDoctorPage />,
            },
          ],
        },
        {
          path: urlSlug.ADMIN_DASHBOARD.BASE,
          element: <AdminDashboardLayout />,
          children: [
            {
              path: urlSlug.ADMIN_DASHBOARD.BASE,
              element: <AdminDashboardHomePage />,
            },
            {
              path: urlSlug.ADMIN_DASHBOARD.SYMPTOMS,
              element: <AdminDashboardSymptomsPage />,
            },
            {
              path: urlSlug.ADMIN_DASHBOARD.DISEASES,
              element: <AdminDashboardDiseasesPage />,
            },
            {
              path: urlSlug.ADMIN_DASHBOARD.MESSAGES,
              element: <AdminDashboardMessagesPage />,
            },
            {
              path: urlSlug.ADMIN_DASHBOARD.DOCTORS,
              element: <AdminDashboardDoctorsPage />,
            },
            {
              path: urlSlug.ADMIN_DASHBOARD.CLINIC,
              element: <AdminDashboardClinicPage />,
            },
            {
              path: urlSlug.ADMIN_DASHBOARD.HOSPITAL,
              element: <AdminDashboardHospitalPage />,
            },
            {
              path: urlSlug.ADMIN_DASHBOARD.HEALTH_REPORTS,
              element: <AdminDashboardHealthReportsPage />,
            },
          ],
        },
      ],
    },
    { path: "*", element: <Navigate to={urlSlug.HOME} /> },
  ]);

export default AdminRoutes;
