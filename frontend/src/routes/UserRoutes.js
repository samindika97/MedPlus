import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { urlSlug } from "../utils/urlSlug";

// Layout
const RootLayout = React.lazy(() => import("../layouts/RootLayout"));
const FeaturesLayout = React.lazy(() => import("../layouts/FeaturesLayout"));

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
const HealthDirectoryPage = React.lazy(() =>
  import("../pages/features/HealthDirectory"),
);
const HealthConditionDetailsPage = React.lazy(() =>
  import("../pages/features/HealthConditionDetails"),
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

const UserRoutes = () =>
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
              path: urlSlug.FEATURE.HEALTH_DIRECTORY,
              element: <HealthDirectoryPage />,
            },
            {
              path: urlSlug.FEATURE.HEALTH_CONDITION_DETAILS,
              element: <HealthConditionDetailsPage />,
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
      ],
    },
    { path: "*", element: <Navigate to={urlSlug.HOME} /> },
  ]);

export default UserRoutes;
