import { useNavigate } from 'react-router-dom';
import Settings from '../components/Settings/Settings';
import { useUpdatePreferences } from '../store/useAppStore';
import { setOnboarded } from '../utils/onboarding';

export default function SettingsPage() {
  const navigate = useNavigate();
  const updatePreferences = useUpdatePreferences();

  const handleEditSetup = () => {
    navigate('/onboarding?edit=true');
  };

  const handleResetAll = () => {
    setOnboarded(false);
    updatePreferences({ interests: [], notificationLevel: 'important' });
    navigate('/onboarding', { replace: true });
  };

  return (
    <Settings
      onEditSetup={handleEditSetup}
      onResetAll={handleResetAll}
    />
  );
}
