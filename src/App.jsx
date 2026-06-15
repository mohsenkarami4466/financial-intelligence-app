import { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding/Onboarding';
import Dashboard from './components/Dashboard/Dashboard';
import Alerts from './components/Alerts/Alerts';
import Assets from './components/Assets/Assets';
import MarketGlobe from './components/MarketGlobe/MarketGlobe';
import Settings from './components/Settings/Settings';
import BottomNav from './components/BottomNav';
import FloatingThemeButton from './components/FloatingThemeButton';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { UserPreferencesProvider, useUserPreferences } from './contexts/UserPreferencesContext';
import './App.css';

const SCREENS = {
  ONBOARDING: 'onboarding',
  DASHBOARD: 'dashboard',
  ALERTS: 'alerts',
  ASSETS: 'assets',
  MARKETS: 'markets',
  SETTINGS: 'settings',
};

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.ONBOARDING);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { preferences, updatePreferences } = useUserPreferences();

  useEffect(() => {
    const onboarded = localStorage.getItem('fi_onboarded');
    if (onboarded === 'true') {
      setIsOnboarded(true);
      setCurrentScreen(SCREENS.DASHBOARD);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  const handleOnboardingComplete = (selections) => {
    updatePreferences({
      interests: selections.interests,
      notificationLevel: selections.notification,
    });
    localStorage.setItem('fi_onboarded', 'true');
    setIsOnboarded(true);
    setCurrentScreen(SCREENS.DASHBOARD);
  };

  const getScreen = () => {
    if (!isOnboarded) return <Onboarding onComplete={handleOnboardingComplete} />;
    switch (currentScreen) {
      case SCREENS.DASHBOARD: return <Dashboard />;
      case SCREENS.ALERTS: return <Alerts />;
      case SCREENS.ASSETS: return <Assets />;
      case SCREENS.MARKETS: return <MarketGlobe onClose={() => setCurrentScreen(SCREENS.DASHBOARD)} />;
      case SCREENS.SETTINGS: return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className="screen-content">
        {getScreen()}
      </div>
      {isOnboarded && currentScreen !== SCREENS.MARKETS && (
        <>
          <BottomNav current={currentScreen} onNavigate={setCurrentScreen} />
          <FloatingThemeButton />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserPreferencesProvider>
          <AppContent />
        </UserPreferencesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}