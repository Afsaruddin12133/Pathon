import React from "react";
import LegalPage from "../../../Component/LegalPage/LegalPage";
import blogsContent from "../../../data/legalPages/blogs.json";

const Blogs = () => {
  return <LegalPage pageData={blogsContent} />;
};

export default Blogs;
