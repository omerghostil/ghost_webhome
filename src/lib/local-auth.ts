const AUTH_STORAGE_KEY = "ghost_vision_auth";
const VALID_USERNAME = "ghostcosts";
const VALID_PASSWORD = "ghostcosts1";

export function verifyCredentials(username: string, password: string): boolean {
  return username === VALID_USERNAME && password === VALID_PASSWORD;
}

export function setAuthSession(): void {
  if (typeof window === "undefined") return;
  const token = btoa(`${VALID_USERNAME}:${Date.now()}`);
  localStorage.setItem(AUTH_STORAGE_KEY, token);
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(AUTH_STORAGE_KEY);
}
