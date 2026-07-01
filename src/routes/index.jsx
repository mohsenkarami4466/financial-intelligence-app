import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import OnboardingRoute from './OnboardingRoute';
import MainLayout from '../layouts/MainLayout';
import SettingsPage from './SettingsPage';
import MarketsPage from './MarketsPage';
import ErrorBoundary from '../components/ErrorBoundary';
import Dashboard from '../features/Dashboard/Dashboard';
import Alerts from '../features/Alerts/Alerts';
import Assets from '../features/Assets/Assets';
import { isOnboarded } from '../utils/onboarding';

function RootRedirect() {
  return <Navigate to={isOnboarded() ? '/dashboard' : '/onboarding'} replace />;
}

function Page({ children }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route
        path="/onboarding"
        element={
          <Page>
            <OnboardingRoute />
          </Page>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <Page>
              <Dashboard />
            </Page>
          }
        />
        <Route
          path="/alerts"
          element={
            <Page>
              <Alerts />
            </Page>
          }
        />
        <Route
          path="/assets"
          element={
            <Page>
              <Assets />
            </Page>
          }
        />
        <Route
          path="/settings"
          element={
            <Page>
              <SettingsPage />
            </Page>
          }
        />
      </Route>
      <Route
        path="/markets"
        element={
          <ProtectedRoute>
            <Page>
              <MarketsPage />
            </Page>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
