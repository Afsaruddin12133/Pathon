import React from "react";
import LegalPage from "../../../Component/LegalPage/LegalPage";
import contactUsContent from "../../../data/legalPages/contactUs.json";

const ContactUs = () => {
  return <LegalPage pageData={contactUsContent} />;
};

export default ContactUs;
