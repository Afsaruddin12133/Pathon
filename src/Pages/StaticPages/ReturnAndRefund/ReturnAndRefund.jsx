import React from "react";
import LegalPage from "../../../Component/LegalPage/LegalPage";
import returnRefundContent from "../../../data/legalPages/returnRefund.json";

const ReturnAndRefund = () => {
  return <LegalPage pageData={returnRefundContent} />;
};

export default ReturnAndRefund;
