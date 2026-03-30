import type { AuthStep } from "@/components/Auth/shared/shared";

export const GetRemainingCooldown = (expiresAt: string) => {
  const expiryTime = new Date(expiresAt).getTime();
  const now = Date.now();

  const diff = expiryTime - now;

  // Check if the current time has passed the expiration date
  if (diff <= 0) {
    return { totalSeconds: 0, formatted: "0:00", isExpired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    totalSeconds,
    formatted: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    isExpired: false,
  };
};

/**
 * Protects PII by masking the middle of an email string.
 * Example: "alexander@gmail.com" -> "alexxxxxer@gmail.com"
 */
export const MaskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  // Safety check: don't mask if we can't preserve at least 3 start and 2 end chars
  if (local.length <= 5) return email;

  const start = local.slice(0, 2);
  const end = local.slice(-4);
  const masked = start + "x".repeat(local.length - 7) + end;
  return `${masked}@${domain}`;
};

/**
 * Returns a localized greeting based on the user's system clock.
 */
export const GreetUser = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning, ";
  if (hour >= 12 && hour < 17) return "Good Afternoon, ";
  if (hour >= 17 && hour < 21) return "Good Evening, ";
  return "Nights, "; // Late night/Early morning fallback
};

/**
 * Formats numbers into UGX currency strings.
 * Note: Uganda Shillings usually don't use decimals (maximumFractionDigits: 0).
 */
export const FormatUGXCurrency = (value: number) => {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * API Body Formatters
 * Useful for converting Frontend (camelCase) to Database (snake_case) payloads.
 */
export const CamelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const ObjectKeysToSnakeCase = <T extends Record<string, any>>(
  obj: T,
): Record<string, any> => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[CamelToSnakeCase(key)] = value;
      return acc;
    },
    {} as Record<string, any>,
  );
};

export const ValidateIdentifier = (
  input: string,
  authWith: "mobile" | "email",
): boolean => {
  input = input.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Validates basic international formats (e.g., +1234567890 or 1234567890)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  if (authWith === "mobile") {
    // Remove common formatting characters before testing phone regex
    const cleanPhone = input.replace(/[\s\-\(\)]/g, "");
    return phoneRegex.test(cleanPhone);
  }
  return emailRegex.test(input);
};
