import React from "react";
import ContactingDoctor from "../../assets/ContactingDoctor.jpg";
import HospitalDetail from "../../assets/HospitalDetail.jpg";
import LabReport from "../../assets/LabReport.jpg";
import SymptomChecking from "../../assets/SymptomChecking.png";
import { Link } from "react-router-dom";

const FeaturesHomePage = () => {
  const featuresData = [
    {
      topic: "Symptom Checker",
      description:
        "Quickly assess your health by entering your symptoms. Receive instant insights into potential health conditions, empowering you to make informed decisions about your well-being.",
      image: SymptomChecking,
      link: "/features/symptom-checker",
    },
    {
      topic: "Lab Report Analyzer",
      description:
        "Upload your lab reports and receive detailed analysis. Understand your health metrics, track changes over time, and stay proactive in managing your health.",
      image: LabReport,
      link: "/features/lab-report-analyzer",
    },
    {
      topic: "Hospital Details",
      description:
        "Find hospitals and clinics near you with ease. Access crucial information, including location, services, and contact details. Ensure you're prepared in case of any medical emergency.",
      image: HospitalDetail,
      link: "/features/hospital-details",
    },
    {
      topic: "Contact Doctor",
      description:
        "Connect with healthcare professionals from the comfort of your home. Schedule appointments, discuss health concerns, and receive expert guidance without leaving your residence.",
      image: ContactingDoctor,
      link: "/features/contact-doctor",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5">
      {featuresData.map((feature, index) => (
        <Link
          className="w-full rounded-lg bg-lightGrey p-4"
          key={index}
          to={feature.link}
        >
          <img
            src={feature.image}
            alt={feature.topic}
            className="h-64 w-full object-cover"
          />
          <h3 className="my-5 text-xl font-semibold">{feature.topic}</h3>
          <p className="text-justify">{feature.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default FeaturesHomePage;
