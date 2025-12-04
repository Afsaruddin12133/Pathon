import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Base_url } from "../../api/api";
import { saveAuthToLocalStorage } from "../../utils/auth";
import { api } from "../../api/apiClient";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const phoneFromOtp = location.state?.phone || "";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- interest logic ---
  const addInterest = (value) => {
    const val = (value || interestInput).trim();
    if (!val) return;
    if (!interests.includes(val)) {
      setInterests((prev) => [...prev, val]);
    }
    setInterestInput("");
  };

  const removeInterest = (value) => {
    setInterests((prev) => prev.filter((i) => i !== value));
  };

  const onInterestKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addInterest();
    }
  };

  // --- submit handler ---
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("phone", phoneFromOtp);
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("tagList", JSON.stringify(interests));

      const endpoint  = "signUp";

      const response = await api.post(endpoint, formData);

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server error: Invalid JSON response.");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Signup failed.");
      }

      // Extract user + token
      const token =
        data?.token ||
        data?.accessToken ||
        data?.data?.token ||
        data?.data?.accessToken ||
        null;

      const user = data?.user ||
        data?.data?.user || {
          full_name: fullName,
          email,
          phone: phoneFromOtp,
        };

      saveAuthToLocalStorage({ token, user, phone: phoneFromOtp });

      navigate("/");
      toast.success("Signup successful!");
    } catch (err) {
      toast.error(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 grid place-items-center bg-white font-sans text-neutral-900">
      <h1 className="text-center text-3xl font-bold text-purple-700 mb-2">
        Create an Account
      </h1>

      <form
        onSubmit={onSubmit}
        className="w-[400px] max-w-[60vw] flex flex-col gap-4"
      >
        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full h-12 rounded-lg border-2 border-slate-200 px-4"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-12 rounded-lg border-2 border-slate-200 px-4"
        />

        {/* Interests */}
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Your Interested Area"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={onInterestKeyDown}
              className="w-full h-12 rounded-lg border-2 border-slate-200 pr-12 px-4"
            />
            <button
              type="button"
              aria-label="Add interest"
              onClick={() => addInterest()}
              className="absolute right-3 top-3 text-purple-700"
            >
              +
            </button>
          </div>

          {interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {interests.map((it) => (
                <span
                  key={it}
                  className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs"
                >
                  {it}
                  <button
                    type="button"
                    onClick={() => removeInterest(it)}
                    className="h-4 w-4 grid place-items-center rounded-sm border border-blue-300 bg-white leading-none"
                  >
                    –
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="py-2 rounded-lg bg-purple-700 text-white font-bold hover:bg-purple-800 disabled:opacity-70"
        >
          {loading ? "Creating..." : "CREATE AN ACCOUNT"}
        </button>

        <p className="text-center text-sm text-neutral-600 mt-2">
          By selecting <strong>“CREATE AN ACCOUNT”</strong> you accept our{" "}
          <a href="/terms" className="text-purple-700 font-semibold">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="text-purple-700 font-semibold">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default Signup;
