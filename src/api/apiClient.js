import { getToken } from "../utils/auth";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

async function apiClient(endpoint, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Request failed");
    }

    return await res.json();
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
}

export const api = {
  get: (endpoint) => apiClient(endpoint),
  post: (endpoint, body) => apiClient(endpoint, { method: "POST", body }),
  put: (endpoint, body) => apiClient(endpoint, { method: "PUT", body }),
  del: (endpoint) => apiClient(endpoint, { method: "DELETE" }),
};
