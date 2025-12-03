import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Base_url } from "../../api/Api";
import { defaultHeaders, sendOtpToApi, verifyOtpWithApi } from "../../Component/Shared/auth/OtpManager/otpApi";
import OtpSend from "../../Component/Shared/auth/OtpManager/OtpSend";
import OtpVerify from "../../Component/Shared/auth/OtpManager/OtpVerify";
import { toast } from "react-toastify";

const OtpManager = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState("phone");
  const [phone, setPhone] = useState(null);

  const handleContinue = async ({ e164, display, country }) => {
    setPhone({ e164, display, country });
    setStage("otp");
  };

  const handleResend = async () => {
    if (!phone?.e164) return;
    await sendOtpToApi(phone.e164);
  };

  const handleVerify = async (code) => {
    const result = await verifyOtpWithApi({
      phoneE164: phone.e164,
      code,
    });

    const localNumber = phone.e164.replace(/^\+\d{2}/, "");

    if (result?.message === "user not found") {
      navigate("/signup", { state: { phone: phone.e164 } });
      return;
    }

    if (result?.message === "user found") {
      const loginRes = await fetch(`${Base_url}login`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify({ phone: localNumber }),
      });

      const loginData = await loginRes.json();

      toast.success("Login successful!");

      if (!loginRes.ok) {
        throw new Error(loginData?.message || "Login failed");
      }

      const token =
        loginData?.token ??
        loginData?.accessToken ??
        loginData?.data?.token ??
        null;

      const user =
        loginData?.user ??
        loginData?.data?.user ??
        null;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token,
          user,
          phone: localNumber,
          ts: Date.now(),
        })
      );

      navigate("/", { state: { phone: localNumber } });
    }
  };

  return (
    <>
      {stage === "phone" && <OtpSend onContinue={handleContinue} />}

      {stage === "otp" && (
        <OtpVerify
          phoneMasked={phone?.display ? `0${phone.display}` : ""}
          durationSec={300}
          onResend={handleResend}
          onVerify={handleVerify}
          onVerifySuccess={() => {}}
        />
      )}
    </>
  );
};

export default OtpManager;
