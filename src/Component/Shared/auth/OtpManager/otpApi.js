import { Base_url } from "../../../../api/Api";


export const defaultHeaders = {
  "Content-Type": "application/json",
};

export async function sendOtpToApi(phoneE164) {
  const localNumber = phoneE164.replace(/^\+\d{2}/, "");

  const response = await fetch(`${Base_url}sendOtp`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ phone: localNumber }),
  });

  const data = await response.json();

  if (!response.ok || data.code !== 200) {
    throw new Error(data?.message || "Failed to send OTP");
  }

  return {
    success: true,
    message: data.message,
    raw: data,
  };
}

export async function verifyOtpWithApi({ phoneE164, code }) {
  const localNumber = phoneE164.replace(/^\+\d{2}/, "");

  const response = await fetch(`${Base_url}verifyOTP`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ phone: localNumber, code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "OTP verification failed");
  }

  return {
    success: true,
    message: data.message,
    raw: data,
  };
}
