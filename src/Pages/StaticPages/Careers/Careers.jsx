import React from "react";
import LegalPage from "../../../Component/LegalPage/LegalPage";
import careersContent from "../../../data/legalPages/careers.json";

const Careers = () => {
  return <LegalPage pageData={careersContent} />;
};

export default Careers;
