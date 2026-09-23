import { createServerFn } from "@tanstack/react-start";

const LOVABLE_AUTH_KEY = "mnmf2k26-admin";
const STALE_LEGACY_KEY = "noorun_admin_unlocked";
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
    clean === DEFAULT_FEST_PASSWORD ||
    clean.toUpperCase() === DEFAULT_FEST_PASSWORD
  );
}

export function isAdminUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // Clean up any stale permanent bypass from earlier development
    window.localStorage.removeItem(STALE_LEGACY_KEY);
    return window.sessionStorage.getItem(LOVABLE_AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAdminUnlocked(unlocked: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STALE_LEGACY_KEY);
    if (unlocked) {
      window.sessionStorage.setItem(LOVABLE_AUTH_KEY, "1");
    } else {
      window.sessionStorage.removeItem(LOVABLE_AUTH_KEY);
    }
  } catch {
    // Ignore storage issues
  }
}

export const unlockSite = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const ok = checkAdminPassword(data.password);
    return { ok };
  });

export const getAdminDashboard = createServerFn({ method: "GET" }).handler(async () => {
  return { title: "Festival administration", unlocked: false };
});

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  return { ok: true as const };
});
