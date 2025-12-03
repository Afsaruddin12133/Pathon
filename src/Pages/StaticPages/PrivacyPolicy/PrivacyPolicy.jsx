import React from "react";
import LegalPage from "../../../Component/LegalPage/LegalPage";
import privacyPolicyContent from "../../../data/legalPages/privacyPolicy.json";

const PrivacyPolicy = () => {
  return <LegalPage pageData={privacyPolicyContent} />;
};

export default PrivacyPolicy;
