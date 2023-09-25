import SymptomCheckerImg from "../assets/SymptomChecker.png";
import LabReportAnalyzerImg from "../assets/LabReportAnalyzer.png";
import HospitalDetailsImg from "../assets/HospitalDetails.png";
import ContactDoctorImg from "../assets/ContactDoctor.png";

export const featuresTabs = [
  {
    name: "symptom checker",
    img: SymptomCheckerImg,
    link: "/features/symptom-checker",
  },
  {
    name: "lab report analyzer",
    img: LabReportAnalyzerImg,
    link: "/features/lab-report-analyzer",
  },
  {
    name: "Hospital Details",
    img: HospitalDetailsImg,
    link: "/features/hospital-details",
  },
  {
    name: "contact Doctor",
    img: ContactDoctorImg,
    link: "/features/contact-doctor",
  },
];

export const adminDashboardTabs = [
  { name: "symptoms", link: "/admin-dashboard/symptoms" },
  { name: "diseases", link: "/admin-dashboard/diseases" },
];
