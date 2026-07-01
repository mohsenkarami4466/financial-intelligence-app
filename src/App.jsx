import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import './App.css';

/** basename مطابق vite.config.js برای GitHub Pages */
const BASENAME = '/financial-intelligence-app';

function AppShell() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <div className={`app-container ${theme}`}>
      <div className="screen-content">
        <AppRoutes />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter basename={BASENAME}>
          <AppShell />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
