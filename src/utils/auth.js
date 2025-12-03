const AUTH_STORAGE_KEY = "auth";
const AUTH_META_KEY = "authMeta";

const canUseStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const getString = (v) => {
  if (typeof v === "string") return v.trim() || null;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return null;
};

const findInObject = (obj, keys = []) => {
  if (!obj || typeof obj !== "object") return null;

  for (const key of keys) {
    const value = key.split(".").reduce((acc, part) => acc?.[part], obj);
    const str = getString(value);
    if (str) return str;
  }
  return null;
};

/* -------------------------------
   TOKEN + USER ID PICKERS
--------------------------------- */
const pickToken = (auth) =>
  findInObject(auth, [
    "token",
    "accessToken",
    "authToken",
    "user.token",
    "user.accessToken",
    "data.token",
    "data.accessToken",
    "data.user.token",
    "data.user.accessToken",
  ]);

const pickUserId = (auth) =>
  findInObject(auth, [
    "user.id",
    "user.user_id",
    "uid",
    "id",
    "user_id",
    "data.user.id",
    "data.id",
    "data.user.user_id",
  ]);

/* -------------------------------
   REFRESH SNAPSHOT
--------------------------------- */
export const refreshAuthSnapshot = () => {
  if (!canUseStorage()) return { token: null, userId: null };

  const auth = safeParse(localStorage.getItem(AUTH_STORAGE_KEY)) || {};

  const snapshot = {
    token: pickToken(auth),
    userId: pickUserId(auth),
  };

  if (snapshot.token || snapshot.userId) {
    localStorage.setItem(AUTH_META_KEY, JSON.stringify(snapshot));
  } else {
    localStorage.removeItem(AUTH_META_KEY);
  }

  return snapshot;
};

const readMeta = () =>
  safeParse(localStorage?.getItem(AUTH_META_KEY)) || {
    token: null,
    userId: null,
  };

/* -------------------------------
   PUBLIC HELPERS
--------------------------------- */
export const getUserToken = () => {
  const { token } = readMeta();
  return token || refreshAuthSnapshot().token;
};

export const getUserId = () => {
  const { userId } = readMeta();
  return userId || refreshAuthSnapshot().userId;
};

function safeJsonParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

export function saveAuthToLocalStorage({ token, user, phone }) {
  try {
    const payload = {
      token,
      user,
      phone,
      ts: Date.now(),
    };

    localStorage.setItem("auth", JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error("Failed to save auth:", err);
    return false;
  }
}

export function getAuthRaw() {
  const raw = localStorage.getItem("auth");
  if (!raw) return null;

  return safeJsonParse(raw, null);
}

export function getUserID() {
  const data = getAuthRaw();
  return data?.user?.id ?? null;
}

export function clearAuth() {
  try {
    localStorage.removeItem("auth");
    return true;
  } catch (err) {
    console.error(" Failed to clear auth:", err);
    return false;
  }
}

