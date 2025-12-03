import { Outlet } from "react-router-dom";
import ScrollToTop from "../Component/ScrollToTop";
import Footer from "../Component/Footer";
import Header from "../Component/Header";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
