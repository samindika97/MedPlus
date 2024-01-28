import SymptomCheckerImg from "../assets/SymptomChecker.png";
import LabReportAnalyzerImg from "../assets/LabReportAnalyzer.png";
import HospitalDetailsImg from "../assets/HospitalDetails.png";
import ContactDoctorImg from "../assets/ContactDoctor.png";

import { urlSlug } from "../utils/urlSlug";

export const navbarTabs = [
  { name: "home", link: urlSlug.HOME },
  { name: "about us", link: urlSlug.ABOUT_US },
  { name: "features", link: urlSlug.FEATURE.BASE },
  { name: "contact us", link: urlSlug.CONTACT_US },
  { name: "admin dashboard", link: urlSlug.ADMIN_DASHBOARD.BASE },
];

export const featuresTabs = [
  {
    name: "symptom checker",
    img: SymptomCheckerImg,
    link: urlSlug.FEATURE.SYMPTOM_CHECKER,
  },
  {
    name: "lab report analyzer",
    img: LabReportAnalyzerImg,
    link: urlSlug.FEATURE.LAB_REPORT_ANALYSER,
  },
  {
    name: "Hospital Details",
    img: HospitalDetailsImg,
    link: urlSlug.FEATURE.HOSPITAL_DETAILS,
  },
  {
    name: "contact Doctor",
    img: ContactDoctorImg,
    link: urlSlug.FEATURE.CONTACT_DOCTOR,
  },
];

export const specialization = [
  {
    choices: [
      { value: "Cardiologist", label: "Cardiologist" },
      { value: "Dermatologist", label: "Dermatologist" },
      // Add more options in the same format
    ],
  },
];

export const adminDashboardTabs = [
  { name: "symptoms", link: urlSlug.ADMIN_DASHBOARD.SYMPTOMS },
  { name: "diseases", link: urlSlug.ADMIN_DASHBOARD.DISEASES },
  { name: "clinic", link: urlSlug.ADMIN_DASHBOARD.CLINIC },
  { name: "messages", link: urlSlug.ADMIN_DASHBOARD.MESSAGES },
  { name: "doctors", link: urlSlug.ADMIN_DASHBOARD.DOCTORS },
];
