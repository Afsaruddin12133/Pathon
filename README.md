# Pathon

**Live Demo:** https://magnificent-narwhal-2b2003.netlify.app/

# Pathon — Learning & Classes Platform 
This repository is a React + Vite front-end scaffold for a learning/class marketplace application. It includes pages and components for live classes, recorded classes, problem-solving workflows, authentication (including OTP), and a small API/service layer.

## Tech stack
- React 
- Tawlind CSS
- Vite (dev server + build)
- ESLint (basic rules)
- Netlify deployment (demo)

## Features (current)
- Minimal React + Vite app scaffold
- Opinionated ESLint config (lightweight)


## Install & Run (developer)
```bash
# Clone
git clone https://github.com/Afsaruddin12133/Pathon.git
cd Pathon

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

```

## Features

Core functionality implemented or scaffolded in this repo:

- **Routing & Page Structure:** Organized pages under `src/Pages/` (Home, Lives, Records, Problems, Profile, Static/legal pages).
- **Public Layout:** `src/layouts/PublicLayout.jsx` for consistent header/footer and layout across public pages.
- **Authentication:** Signup/Signin pages and OTP verification flow located in `src/Component/Shared/auth/OtpManager/` (`OtpSend.jsx`, `OtpVerify.jsx`, `otpApi.js`).
- **User Profiles & Transactions:** Profile pages, transaction history and related components (`Profile.jsx`, `Transaction.jsx`, `UserProfile.jsx`, `Interested.jsx`, `WithdrawHistory.jsx`).
- **Live Classes:** Create, list and manage live classes (`CreateLiveClass.jsx`, `LiveClass.jsx`, `LiveClasses.jsx`, `MyLiveClass.jsx`) with enrollment components.
- **Recorded Classes (Records):** Create and view recorded classes and episodes (`CreateRecordClass.jsx`, `MyRecordClasses.jsx`, `RecordClass.jsx`, `RecordClasses.jsx`, `Episodes.jsx`).
- **Problem Solving / Q&A:** Problem submission, solving and class-based problem workflows (`AddAProblem.jsx`, `ProblemSolving.jsx`, `ProblemSolvingClass.jsx`, `MyProblemSolving.jsx`, plus detail/solution components).
- **Course Catalog:** Course listing pages (`AllCourse.jsx`, `FreeCourse.jsx`) and class listing UI using `ClassCard.jsx` and `Pagination.jsx`.
- **Shared UI Components:** Header, Footer, Hero Slider, Testimonials, SearchPopup, ScrollToTop, Pagination, and other reusable UI parts located in `src/Component/` and `src/Component/Shared/`.
- **API Layer & Services:** `src/api/` contains `api.js`, `apiClient.js` and `services/classService.js` to encapsulate HTTP and domain logic.
- **Local Static Data:** `src/data/legalPages/` stores JSON documents for About, Blogs, Careers, Contact, Privacy, Terms and similar static content.
- **Custom Hooks & Utilities:** `useClasses.jsx` and `src/utils/auth.js` (and `AuthUtils`) provide shared logic and auth helpers.
- **OTP & Verification:** Dedicated OTP manager and API integration for verification flows (`otpApi.js`).
- **Tooling & Quality:** Vite dev server, build and preview scripts; ESLint configuration present (`eslint.config.js`) with recommended linting workflows.

## Folder structure (recommended)
```
/ (project root)
├─ eslint.config.js
├─ index.html
├─ package.json
├─ README.md
├─ vite.config.js
├─ public/
└─ src/
   ├─ index.css
   ├─ main.jsx
   ├─ api/
   │  ├─ api.js
   │  ├─ apiClient.js
   │  └─ services/
   │     └─ classService.js
   ├─ assets/
   │  └─ images/
   ├─ Component/
   │  ├─ Footer.jsx
   │  ├─ Header.jsx
   │  ├─ HeroSlider.jsx
   │  ├─ HeroTestimonials.jsx
   │  ├─ ScrollToTop.jsx
   │  ├─ SearchPopup.jsx
   │  ├─ Details/
   │  │  ├─ Buyer.jsx
   │  │  ├─ Problem.jsx
   │  │  ├─ Reviews.jsx
   │  │  ├─ Solution.jsx
   │  │  └─ solver.jsx
   │  ├─ Home/
   │  │  ├─ HeroResources.jsx
   │  │  ├─ LiveClassesSection.jsx
   │  │  ├─ ProblemClassesSection.jsx
   │  │  └─ RecordClassesSection.jsx
   │  ├─ LegalPage/
   │  │  └─ LegalPage.jsx
   │  ├─ Live/
   │  │  ├─ ClassMe.jsx
   │  │  └─ MyEnrolmentLive.jsx
   │  ├─ Problem/
   │  │  └─ ClassMe.jsx
   │  ├─ Profile.jsx/
   │  │  ├─ Interested.jsx
   │  │  └─ WithdrawHistory.jsx
   │  ├─ Shared/
   │  │  ├─ auth/
   │  │  │  └─ OtpManager/
   │  │  │     ├─ otpApi.js
   │  │  │     ├─ OtpSend.jsx
   │  │  │     └─ OtpVerify.jsx
   │  │  ├─ ClassCard/
   │  │  │  └─ ClassCard.jsx
   │  │  └─ Pagination/
   │  │     └─ Pagination.jsx
   ├─ data/
   │  └─ legalPages/
   │     ├─ aboutUs.json
   │     ├─ blogs.json
   │     ├─ careers.json
   │     ├─ contactUs.json
   │     ├─ helpSupport.json
   │     ├─ index.js
   │     ├─ privacyPolicy.json
   │     ├─ returnRefund.json
   │     └─ termsOfUse.json
   ├─ hooks/
   │  └─ useClasses.jsx
   ├─ layouts/
   │  └─ PublicLayout.jsx
   ├─ Pages/
   │  ├─ Authentication/
   │  │  ├─ AuthPage.jsx
   │  │  ├─ OtpManager.jsx
   │  │  └─ Signup.jsx
   │  ├─ Details/
   │  │  ├─ DetailProblem.jsx
   │  │  ├─ DetailRecord.jsx
   │  │  ├─ DetailsLive.jsx
   │  │  └─ Episodes.jsx
   │  ├─ Home/
   │  │  └─ Home.jsx
   │  ├─ Lives/
   │  │  ├─ CreateLiveClass.jsx
   │  │  ├─ LiveClass.jsx
   │  │  ├─ LiveClasses.jsx
   │  │  └─ MyLiveClass.jsx
   │  ├─ Problems/
   │  │  ├─ AddAProblem.jsx
   │  │  ├─ MyProblemSolving.jsx
   │  │  ├─ ProblemSolving.jsx
   │  │  └─ ProblemSolvingClass.jsx
   │  ├─ Profile/
   │  │  ├─ Profile.jsx
   │  │  ├─ Transaction.jsx
   │  │  └─ UserProfile.jsx
   │  ├─ Records/
   │  │  ├─ CreateRecordClass.jsx
   │  │  ├─ MyRecordClasses.jsx
   │  │  ├─ RecordClass.jsx
   │  │  └─ RecordClasses.jsx
   │  ├─ StaticPages/
   │  │  ├─ AboutUs/AboutUs.jsx
   │  │  ├─ Blogs/Blogs.jsx
   │  │  ├─ Careers/Careers.jsx
   │  │  ├─ ContactUs/ContactUs.jsx
   │  │  ├─ HelpAndSupport/HelpAndSupport.jsx
   │  │  ├─ PrivacyPolicy/PrivacyPolicy.jsx
   │  │  ├─ ReturnAndRefund/ReturnAndRefund.jsx
   │  │  └─ TermsOfUse/TermsOfUse.jsx
   │  └─ UpdateClass/
   │     ├─ UpdateClass.jsx
   │     ├─ UpdateProblemClassPage.jsx
   │     └─ UpdateRecordClassPage.jsx
   └─ utils/
      ├─ auth.js
      └─ AuthUtils/
         └─ authutils.jsx
```
