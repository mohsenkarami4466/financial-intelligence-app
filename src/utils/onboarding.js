/** کلید localStorage برای وضعیت تکمیل راهنمای اولیه */
export const ONBOARDING_KEY = 'fi_onboarded';

export function isOnboarded() {
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
}

export function setOnboarded(value = true) {
  if (value) {
    localStorage.setItem(ONBOARDING_KEY, 'true');
  } else {
    localStorage.removeItem(ONBOARDING_KEY);
  }
}
