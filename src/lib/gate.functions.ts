const ADMIN_AUTH_KEY = "mnmf2k26-admin";
const CUSTOM_PASSWORD_KEY = "mnmf2k26-admin-custom-password";
export const DEFAULT_FEST_PASSWORD = "MNMF2K26";

export function getAdminPassword(): string {
  if (typeof window === "undefined") return DEFAULT_FEST_PASSWORD;
  try {
    const custom = window.localStorage.getItem(CUSTOM_PASSWORD_KEY);
    return custom && custom.trim() ? custom.trim() : DEFAULT_FEST_PASSWORD;
  } catch {
    return DEFAULT_FEST_PASSWORD;
  }
}

export function setCustomAdminPassword(newPassword: string): void {
  if (typeof window === "undefined") return;
  try {
    if (!newPassword || newPassword.trim() === DEFAULT_FEST_PASSWORD) {
      window.localStorage.removeItem(CUSTOM_PASSWORD_KEY);
    } else {
      window.localStorage.setItem(CUSTOM_PASSWORD_KEY, newPassword.trim());
    }
  } catch {
    // Ignore storage issues
  }
}

export function checkAdminPassword(input: string): boolean {
  const clean = input.trim();
  if (!clean) return false;

  const current = getAdminPassword();
  return (
    clean === current ||
    clean.toUpperCase() === current.toUpperCase() ||
    clean.toLowerCase() === current.toLowerCase() ||
    clean === DEFAULT_FEST_PASSWORD ||
    clean.toUpperCase() === DEFAULT_FEST_PASSWORD ||
    clean.toLowerCase() === DEFAULT_FEST_PASSWORD.toLowerCase()
  );
}

export function isAdminUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      window.sessionStorage.getItem(ADMIN_AUTH_KEY) === "1" ||
      window.localStorage.getItem(ADMIN_AUTH_KEY) === "1"
    );
  } catch {
    return false;
  }
}

export function setAdminUnlocked(unlocked: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (unlocked) {
      window.sessionStorage.setItem(ADMIN_AUTH_KEY, "1");
      window.localStorage.setItem(ADMIN_AUTH_KEY, "1");
    } else {
      window.sessionStorage.removeItem(ADMIN_AUTH_KEY);
      window.localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch {
    // Ignore storage issues
  }
}

export async function unlockSite(data: { password: string }) {
  const ok = checkAdminPassword(data.password);
  return { ok };
}

export async function getAdminDashboard() {
  return { title: "Festival administration", unlocked: isAdminUnlocked() };
}

export async function lockSite() {
  setAdminUnlocked(false);
  return { ok: true as const };
}
