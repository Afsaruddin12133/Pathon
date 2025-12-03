import React from "react";
import LegalPage from "../../../Component/LegalPage/LegalPage";
import aboutUsContent from "../../../data/legalPages/aboutUs.json";

const AboutUs = () => {
  return <LegalPage pageData={aboutUsContent} />;
};

export default AboutUs;
