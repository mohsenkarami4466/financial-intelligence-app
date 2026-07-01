import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('fi_lang') || 'fa');

  useEffect(() => {
    localStorage.setItem('fi_lang', language);
  }, [language]);

  const toggleLanguage = () => setLanguage(prev => prev === 'fa' ? 'en' : 'fa');

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);