// src/components/auth/OtpSend.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { sendOtpToApi } from "./otpApi";
import { COUNTRIES } from './../../../../utils/AuthUtils/authutils';

const OtpSend = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [local, setLocal] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const wrapRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const fullNumber = useMemo(() => `${country.dial}${local}`, [country, local]);

  const onLocalChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setLocal(onlyDigits.slice(0, country.maxLocal));
  };

  const onSelectCountry = (c) => {
    setCountry(c);
    setLocal((prev) => prev.slice(0, c.maxLocal));
    setIsOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (local.length < country.maxLocal || sending) return;

    try {
      setSending(true);
      setError("");

      await sendOtpToApi(fullNumber);
      toast.success("OTP sent successfully");

      onContinue({
        e164: fullNumber,
        display: `${local}`,
        country,
      });

    } catch (err) {
      setError(err.message || "Could not send OTP");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-[60vh] w-full flex items-start justify-center px-4 sm:px-6 pt-24">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <label className="block text-gray-800 font-medium text-xl mb-2">
          Enter your mobile number
        </label>

        {/* UI kept exactly same */}
        <div ref={wrapRef} className="relative group rounded-lg border-2 border-purple-500 focus-within:ring-2 focus-within:ring-purple-300 transition">
          <div className="flex items-center px-3 py-2">
            <button
              type="button"
              onClick={() => setIsOpen((p) => !p)}
              className="flex items-center gap-2 px-2 py-1 rounded-md border border-purple-200 hover:bg-blue-50"
            >
              <country.Flag />
              <span className="font-semibold text-gray-900">{country.dial}</span>
            </button>

            <input
              type="tel"
              inputMode="numeric"
              value={local}
              onChange={onLocalChange}
              placeholder={country.placeholder}
              className="ml-3 flex-1 outline-none text-gray-900 text-[18px]"
            />
          </div>

          {isOpen && (
            <ul className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-72 max-h-64 overflow-auto">
              {COUNTRIES.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCountry(c)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50"
                  >
                    <c.Flag />
                    <div className="flex flex-col items-start">
                      <span className="text-gray-900 font-medium">{c.name}</span>
                      <span className="text-gray-600 text-sm">{c.dial}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={local.length !== country.maxLocal || sending}
          className="mt-8 w-full rounded-md bg-purple-700 text-white font-extrabold py-3"
        >
          {sending ? "SENDING..." : "CONTINUE"}
        </button>
        <p className="mt-4 text-md text-gray-600">
          By tapping <span className="font-semibold">“continue”</span> you
          acknowledge your acceptance of our{" "}
          <a
            href="/terms"
            className="text-purple-700 font-semibold hover:underline"
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            href="privacy-policy"
            className="text-purple-700 font-semibold hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default OtpSend;
