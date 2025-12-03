import { useEffect, useRef, useState } from "react";

const OtpVerify = ({
  phoneMasked,
  otpLength = 4,
  durationSec = 300,
  onVerify,
  onVerifySuccess,
  onResend,
}) => {
  const [values, setValues] = useState(Array(otpLength).fill(""));
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  const handleChange = (idx, v) => {
    const d = v.replace(/\D/g, "");
    if (!d) return;

    setError("");
    setValues((prev) => {
      const next = [...prev];
      next[idx] = d.slice(-1);
      return next;
    });

    if (idx < otpLength - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setValues((prev) => {
        const next = [...prev];
        if (next[idx]) next[idx] = "";
        else if (idx > 0) {
          inputsRef.current[idx - 1]?.focus();
          next[idx - 1] = "";
        }
        return next;
      });
    }
  };

  const filled = values.every((v) => v !== "");
  const code = values.join("");

  const verify = async (e) => {
    e.preventDefault();
    if (!filled || timeLeft <= 0 || loading) return;

    try {
      setLoading(true);
      setError("");

      await onVerify(code);
      onVerifySuccess?.(code);

    } catch (err) {
      setError(err.message || "Invalid OTP. Try again.");
      setValues(Array(otpLength).fill(""));
      setTimeout(() => inputsRef.current[0]?.focus(), 0);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setValues(Array(otpLength).fill(""));
    setError("");
    setTimeLeft(durationSec);
    await onResend();
    setTimeout(() => inputsRef.current[0]?.focus(), 0);
  };

  return (
    <div className="min-h-[60vh] w-full flex items-start justify-center px-4 sm:px-6 pt-24">
      <form onSubmit={verify} className="w-full max-w-md text-center">
        <h1 className="text-2xl font-extrabold text-purple-700">OTP VERIFICATION</h1>

        <p className="mt-4 text-lg text-gray-700">
          OTP has been sent to <span className="font-semibold">{phoneMasked}</span>
        </p>

        <div className="mt-3 text-2xl font-extrabold">{`00 : ${mm} : ${ss}`}</div>

        <div className="mt-6 flex items-center justify-center gap-4">
          {values.map((v, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              className="w-12 h-12 text-center rounded-md border-2 text-xl font-bold"
              maxLength={1}
            />
          ))}
        </div>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

        {timeLeft > 0 ? (
          <button
            type="submit"
            disabled={!filled || loading}
            className="mt-6 px-6 py-2.5 rounded-md bg-purple-700 text-white font-bold"
          >
            {loading ? "VERIFYING..." : "VERIFY OTP"}
          </button>
        ) : (
          <button
            type="button"
            onClick={resendOtp}
            className="mt-6 px-6 py-2.5 rounded-md bg-purple-700 text-white font-bold"
          >
            RESEND OTP
          </button>
        )}
      </form>
    </div>
  );
};

export default OtpVerify;
