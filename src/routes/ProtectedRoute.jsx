import { Navigate, useLocation } from 'react-router-dom';
import { isOnboarded } from '../utils/onboarding';

/**
 * مسیرهای محافظت‌شده: اگر کاربر onboarding را کامل نکرده باشد
 * به /onboarding هدایت می‌شود.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isOnboarded()) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />;
  }

  return children;
}
