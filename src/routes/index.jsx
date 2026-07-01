import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import OnboardingRoute from './OnboardingRoute';
import MainLayout from './MainLayout';
import SettingsPage from './SettingsPage';
import MarketsPage from './MarketsPage';
import Dashboard from '../components/Dashboard/Dashboard';
import Alerts from '../components/Alerts/Alerts';
import Assets from '../components/Assets/Assets';
import { isOnboarded } from '../utils/onboarding';

function RootRedirect() {
  return <Navigate to={isOnboarded() ? '/dashboard' : '/onboarding'} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      {/* راهنمای اولیه – بدون ناوبری پایین */}
      <Route path="/onboarding" element={<OnboardingRoute />} />

      {/* مسیرهای محافظت‌شده با ناوبری پایین */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* بازارها – تمام‌صفحه، بدون BottomNav */}
      <Route
        path="/markets"
        element={
          <ProtectedRoute>
            <MarketsPage />
          </ProtectedRoute>
        }
      />

      {/* مسیر نامعتبر */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
