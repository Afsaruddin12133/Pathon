// -----------------------------
// React & Router Setup
// -----------------------------
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// -----------------------------
// Layouts
// -----------------------------
import PublicLayout from "./layouts/PublicLayout.jsx";

// -----------------------------
// Public Pages
// -----------------------------
import Home from "./Pages/Home/Home.jsx";
import Recom from "./Pages/Reco/Recom.jsx";

// Static Info Pages
import AboutUs from "./Pages/StaticPages/AboutUs/AboutUs.jsx";
import ContactUs from "./Pages/StaticPages/ContactUs/ContactUs.jsx";
import PrivacyPolicy from "./Pages/StaticPages/PrivacyPolicy/PrivacyPolicy.jsx";
import Careers from "./Pages/StaticPages/Careers/Careers.jsx";
import Blogs from "./Pages/StaticPages/Blogs/Blogs.jsx";
import HelpAndSupport from "./Pages/StaticPages/HelpAndSupport/HelpAndSupport.jsx";
import TermsOfUse from "./Pages/StaticPages/TermsOfUse/TermsOfUse.jsx";
import ReturnAndRefund from "./Pages/StaticPages/ReturnAndRefund/ReturnAndRefund.jsx";

// Authentication Pages
import Signup from "./Pages/Authentication/Signup.jsx";
import OtpManager from "./Pages/Authentication/OtpManager.jsx";

// -----------------------------
// Profile & User Actions
// -----------------------------
import Profiles from "./Pages/Profile/Profile.jsx";
import Transactions from "./Pages/Profile/Transaction.jsx";
import UserProfiles from "./Pages/Profile/UserProfile";
import Negotiation from "./Component/Profile.jsx/Interested.jsx";

// -----------------------------
// Live Classes
// -----------------------------
import LiveClasses from "./Pages/Lives/LiveClasses.jsx";
import LiveClass from "./Pages/Lives/LiveClass.jsx";
import CreateLiveClass from "./Pages/Lives/CreateLiveClass.jsx";
import MyLiveClass from "./Pages/Lives/MyLiveClass.jsx";
import MyEnrolment from "./Component/Live/MyEnrolmentLive.jsx";

// -----------------------------
// Recorded Classes
// -----------------------------
import RecordClasses from "./Pages/Records/RecordClasses.jsx";
import RecordClass from "./Pages/Records/RecordClass.jsx";
import MyRecordClasses from "./Pages/Records/MyRecordClasses.jsx";
import CreateRecordClass from "./Pages/Records/CreateRecordClass.jsx";

// -----------------------------
// Problem Solving
// -----------------------------
import ProblemSolving from "./Pages/Problems/ProblemSolving.jsx";
import MyProblemSolving from "./Pages/Problems/MyProblemSolving.jsx";
import AddAProblem from "./Pages/Problems/AddAProblem.jsx";
import ProblemSolvingClass from "./Pages/Problems/ProblemSolvingClass.jsx";

// -----------------------------
// Details & Episodes
// -----------------------------
import DetailsLive from "./Pages/Details/DetailsLive.jsx";
import DetailRecord from "./Pages/Details/DetailRecord.jsx";
import DetailProblem from "./Pages/Details/DetailProblem.jsx";
import Episodes from "./Pages/Details/Episodes.jsx";

// -----------------------------
// Update Classes
// -----------------------------
import UpdateClass from "./Pages/UpdateClass/UpdateClass.jsx";
import UpdateRecordClassPage from "./Pages/UpdateClass/UpdateRecordClassPage.jsx";
import UpdateProblemClassPage from "./Pages/UpdateClass/UpdateProblemClassPage.jsx";
import { ToastContainer } from "react-toastify";



// ======================================================================
// ROUTER CONFIGURATION
// ======================================================================

const router = createBrowserRouter([
  {
    element: <PublicLayout />,

    // -----------------------------
    // All public routes
    // -----------------------------
    children: [
      // Auth Routes
      { path: "/signin", element: <OtpManager /> },
      { path: "/signup", element: <Signup /> },

      // Static Pages
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/careers", element: <Careers /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/help-and-support", element: <HelpAndSupport /> },
      { path: "/terms-of-use", element: <TermsOfUse /> },
      { path: "/return-and-refund-policy", element: <ReturnAndRefund /> },

      // Home / For You
      { path: "/", element: <Home /> },
      { path: "/for-you", element: <Recom /> },

      // Profile & User Routes
      { path: "/profile", element: <Profiles /> },
      { path: "/user-profile/:user_id?", element: <UserProfiles /> },
      { path: "/transaction", element: <Transactions /> },
      { path: "/negotiation", element: <Negotiation /> },

      // -----------------------------
      // LIVE CLASSES
      // -----------------------------
      { path: "/live-classes", element: <LiveClasses /> },
      { path: "/live-class", element: <LiveClass /> },
      { path: "/my-live-class", element: <MyLiveClass /> },
      { path: "/my-enrolment", element: <MyEnrolment /> },
      { path: "/create-live-class", element: <CreateLiveClass /> },

      // -----------------------------
      // RECORDED CLASSES
      // -----------------------------
      { path: "/record-classes", element: <RecordClasses /> },
      { path: "/record-class", element: <RecordClass /> },
      { path: "/my-record-classes", element: <MyRecordClasses /> },
      { path: "/create-record-class", element: <CreateRecordClass /> },

      // -----------------------------
      // PROBLEM SOLVING
      // -----------------------------
      { path: "/problem-solving", element: <ProblemSolving /> },
      { path: "/problem-solving-class", element: <ProblemSolvingClass /> },
      { path: "/my-problem-solving", element: <MyProblemSolving /> },
      { path: "/add-a-problem", element: <AddAProblem /> },

      // -----------------------------
      // DETAILS & EPISODES
      // -----------------------------
      { path: "/details-live/:subject_id", element: <DetailsLive /> },
      { path: "/details-record/:subject_id", element: <DetailRecord /> },
      { path: "/details-problem/:subject_id", element: <DetailProblem /> },
      { path: "/add-episode/:subject_id", element: <Episodes /> },

      // -----------------------------
      // UPDATE CLASS ROUTES
      // -----------------------------
      { path: "/update-class/:subject_id", element: <UpdateClass /> },
      {
        path: "/update-record-class/:subject_id",
        element: <UpdateRecordClassPage />,
      },
      {
        path: "/update-problem-class/:subject_id",
        element: <UpdateProblemClassPage />,
      },
    ],
  },
]);

// ======================================================================
// APP RENDER
// ======================================================================

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
     <ToastContainer  />
  </StrictMode>
);
