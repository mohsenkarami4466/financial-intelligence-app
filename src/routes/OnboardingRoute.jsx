import { Navigate, useSearchParams } from 'react-router-dom';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import OnboardingPage from './OnboardingPage';
import { isOnboarded } from '../utils/onboarding';

/**
 * مسیر onboarding:
 * - کاربر جدید: interests خالی
 * - حالت ویرایش (?edit=true): مقادیر فعلی preferences
 * - اگر onboarded و بدون edit → redirect به dashboard
 */
export default function OnboardingRoute() {
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const { preferences } = useUserPreferences();

  if (isOnboarded() && !isEdit) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <OnboardingPage
      initialInterests={isEdit ? preferences.interests : []}
      initialNotification={isEdit ? preferences.notificationLevel : 'important'}
      isEdit={isEdit}
    />
  );
}
