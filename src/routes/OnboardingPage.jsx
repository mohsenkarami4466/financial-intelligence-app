import { useNavigate } from 'react-router-dom';
import Onboarding from '../components/Onboarding/Onboarding';
import { useUpdatePreferences } from '../store/useAppStore';
import { setOnboarded } from '../utils/onboarding';

export default function OnboardingPage({ initialInterests, initialNotification, isEdit }) {
  const navigate = useNavigate();
  const updatePreferences = useUpdatePreferences();

  const handleComplete = (selections) => {
    updatePreferences({
      interests: selections.interests,
      notificationLevel: selections.notification,
    });
    setOnboarded(true);
    navigate('/dashboard', { replace: true });
  };

  return (
    <Onboarding
      onComplete={handleComplete}
      initialInterests={initialInterests}
      initialNotification={initialNotification}
      isEdit={isEdit}
    />
  );
}
