import { Navigate, useSearchParams } from 'react-router-dom';
import { usePreferences } from '../store/useAppStore';
import OnboardingPage from './OnboardingPage';
import { isOnboarded } from '../utils/onboarding';

export default function OnboardingRoute() {
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const preferences = usePreferences();

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
