import { createContext, useContext, useState, useEffect } from 'react';

const UserPreferencesContext = createContext();

const defaultPreferences = {
  interests: ['USD', 'Gold', 'Crypto', 'Stocks', 'Economic News'], // همه انتخاب شده در ابتدا
  notificationLevel: 'important', // important, daily, realtime
};

export function UserPreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('fi_preferences');
    return saved ? JSON.parse(saved) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('fi_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (newPrefs) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export const useUserPreferences = () => useContext(UserPreferencesContext);