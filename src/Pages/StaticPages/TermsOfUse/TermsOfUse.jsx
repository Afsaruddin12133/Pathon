import React from "react";
import LegalPage from "../../../Component/LegalPage/LegalPage";
import termsOfUseContent from "../../../data/legalPages/termsOfUse.json";

const TermsOfUse = () => {
  return <LegalPage pageData={termsOfUseContent} />;
};

export default TermsOfUse;
