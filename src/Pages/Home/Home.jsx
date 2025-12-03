import { useState, useEffect } from "react";
import LiveClassesSection from "../../Component/Home/LiveClassesSection";
import RecordClassesSection from "../../Component/Home/RecordClassesSection";
import ProblemClassesSection from "../../Component/Home/ProblemClassesSection";
import HeroSlider from "../../Component/HeroSlider";
import HeroResources from "../../Component/Home/HeroResources";
import RecommendedSection from "../../Component/Home/RecommendedSection";

const Home = () => {
  const [active, setActive] = useState("live");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Detect login from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth");
      if (!raw) return;

      const parsed = JSON.parse(raw);

      const token =
        parsed?.token ||
        parsed?.accessToken ||
        parsed?.data?.token ||
        parsed?.data?.accessToken ||
        parsed?.user?.token;

      if (token) setIsLoggedIn(true);
    } catch (err) {
      console.error("Auth read error:", err);
    }
  }, []);

  const tabs = [
    { id: "live", label: "Live Class", node: <LiveClassesSection /> },
    { id: "record", label: "Recorded Class", node: <RecordClassesSection /> },
    {
      id: "problem",
      label: "Problem Solving",
      node: <ProblemClassesSection />,
    },
  ];

  return (
    <div>
      <HeroSlider />

      {/* Show Hero1 ONLY for logged-in users */}
      {isLoggedIn && <HeroResources />}

      {/* Tabs Section */}
      <section className="w-full bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-3">
            {tabs.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={
                    "rounded-md px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold transition " +
                    (isActive
                      ? "bg-purple-700 text-white shadow"
                      : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200")
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="mt-6">{tabs.find((t) => t.id === active)?.node}</div>
        </div>
      </section>

      {/* Recommended Section */}
      <RecommendedSection />
    </div>
  );
};

export default Home;
